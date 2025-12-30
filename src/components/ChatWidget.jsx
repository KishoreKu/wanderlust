import { useState, useRef, useEffect } from "react";
import Linkify from "react-linkify";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('small'); // 'small', 'quarter', 'half'
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! Where do you want to travel? Share dates and budget if you have them.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [continuousMode, setContinuousMode] = useState(false);
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);
    const continuousModeRef = useRef(false);

    useEffect(() => {
        continuousModeRef.current = continuousMode;
    }, [continuousMode]);

    const messagesEndRef = useRef(null);
    const scrollToEnd = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToEnd();
    }, [messages, loading]);

    const suggestions = [
        "Find cheap flights",
        "Best hotels in Paris",
        "Budget travel tips",
        "Solo travel safety",
        "New Year's in NYC"
    ];

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onresult = (event) => {
                    let transcript = event.results[0][0].transcript;

                    // Auto-correct common misheard words for "Gubbu"
                    const gubuVariations = [
                        /\bgoogle\b/gi,
                        /\bgoo boo\b/gi,
                        /\bgu bu\b/gi,
                        /\bgoo bu\b/gi,
                        /\bgooboo\b/gi,
                        /\bgubu\b/gi,
                        /\bgoobu\b/gi,
                        /\bguboo\b/gi,
                        /\bgo boo\b/gi,
                        /\bgoo buu\b/gi,
                    ];

                    gubuVariations.forEach(pattern => {
                        transcript = transcript.replace(pattern, 'Gubbu');
                    });

                    setInput(transcript);
                    setIsListening(false);

                    // If in continuous mode, auto-send
                    if (continuousModeRef.current) {
                        send(transcript);
                    }
                };

                recognitionRef.current.onerror = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            }

            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition not supported in your browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const speakText = (text) => {
        if (!synthRef.current) return;

        // Stop any ongoing speech
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            // In continuous mode, auto-start listening after AI finishes speaking
            if (continuousModeRef.current && recognitionRef.current) {
                setTimeout(() => {
                    try {
                        recognitionRef.current.start();
                        setIsListening(true);
                    } catch (e) {
                        // Recognition might already be running
                        console.log('Recognition already active');
                    }
                }, 500); // Small delay for better UX
            }
        };
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    };

    const stopSpeaking = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    const cycleSize = () => {
        setSize(current => {
            if (current === 'small') return 'quarter';
            if (current === 'quarter') return 'half';
            return 'small';
        });
    };

    const getSizeConfig = () => {
        switch (size) {
            case 'quarter':
                return {
                    width: '25%',
                    height: '100%',
                    right: 0,
                    bottom: 0,
                    top: 0,
                    minWidth: 400,
                    borderRadius: 0,
                    padding: 24,
                    maxWidth: 600,
                };
            case 'half':
                return {
                    width: '50%',
                    height: '100%',
                    right: 0,
                    bottom: 0,
                    top: 0,
                    minWidth: 500,
                    borderRadius: 0,
                    padding: 24,
                    maxWidth: 800,
                };
            default: // 'small'
                return {
                    width: 360,
                    height: 480,
                    right: 18,
                    bottom: 18,
                    top: 'auto',
                    minWidth: 360,
                    borderRadius: 14,
                    padding: 12,
                    maxWidth: 360,
                };
        }
    };

    const config = getSizeConfig();

    async function send(overrideText = null) {
        const text = (overrideText || input).trim();
        if (!text || loading) return;

        const next = [...messages, { role: "user", content: text }];
        setMessages(next);
        setInput("");
        setLoading(true);

        try {
            const resp = await fetch("https://api.gubbu.io/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: next }),
            });

            const responseText = await resp.text();
            let data;
            try {
                data = JSON.parse(responseText);
            } catch {
                data = { error: responseText };
            }

            if (!resp.ok) {
                throw new Error(data.error || `Request failed: ${resp.status}`);
            }

            const answerContent = data.answer || "No answer returned.";

            setMessages([
                ...next,
                {
                    role: "assistant",
                    content: answerContent,
                },
            ]);

            // Auto-speak the response if user used voice input or in continuous mode
            if (isListening || isSpeaking || continuousMode) {
                speakText(answerContent);
            }
        } catch (err) {
            setMessages([
                ...next,
                {
                    role: "assistant",
                    content: `Error: ${err.message || "Network error. Please try again."}`,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: "fixed",
                        right: 18,
                        bottom: 18,
                        padding: "12px 14px",
                        borderRadius: 999,
                        border: "1px solid #e5e7eb",
                        background: "#0f172a",
                        color: "white",
                        cursor: "pointer",
                        zIndex: 9999,
                    }}
                >
                    Chat with Gubbu AI
                </button>
            )}

            {open && (
                <div
                    style={{
                        position: "fixed",
                        right: config.right,
                        bottom: config.bottom,
                        top: config.top,
                        left: "auto",
                        width: config.width,
                        height: config.height,
                        minWidth: config.minWidth,
                        background: "white",
                        border: size === 'small' ? "1px solid #e5e7eb" : "none",
                        borderRadius: config.borderRadius,
                        boxShadow: size === 'small' ? "0 10px 30px rgba(0,0,0,0.12)" : "0 -2px 10px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 9999,
                        transition: "all 0.3s ease",
                    }}
                >
                    <div
                        style={{
                            padding: 12,
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#0f172a",
                            color: "white",
                        }}
                    >
                        <strong>Gubbu AI Travel Assistant</strong>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button
                                onClick={cycleSize}
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: "none",
                                    color: "white",
                                    fontSize: 16,
                                    padding: "0 8px",
                                }}
                                title={size === 'small' ? '1/4 Screen' : size === 'quarter' ? '1/2 Screen' : 'Small'}
                            >
                                {size === 'small' ? '◧' : size === 'quarter' ? '▬' : '▭'}
                            </button>
                            <button
                                onClick={() => {
                                    const next = !continuousMode;
                                    setContinuousMode(next);
                                    if (next && !isListening && !isSpeaking) {
                                        toggleListening();
                                    }
                                }}
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: continuousMode ? "#3b82f6" : "none",
                                    color: "white",
                                    fontSize: 14,
                                    padding: "4px 8px",
                                    borderRadius: 4,
                                }}
                                title={continuousMode ? "Disable Hands-free Mode" : "Enable Hands-free Mode"}
                            >
                                {continuousMode ? "ON" : "OFF"} 🎧
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setSize('small');
                                    setContinuousMode(false);
                                }}
                                style={{
                                    cursor: "pointer",
                                    border: "none",
                                    background: "none",
                                    color: "white",
                                    fontSize: 18,
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: config.padding,
                            overflowY: "auto",
                            fontSize: 14,
                            maxWidth: size !== 'small' ? config.maxWidth : "none",
                            margin: size !== 'small' ? "0 auto" : 0,
                            width: "100%",
                            scrollBehavior: "smooth",
                        }}
                    >
                        {messages.map((m, i) => {
                            // Detect if the message has a booking link
                            const hasLink = m.content.includes("https://gubbu.io/");
                            const linkMatch = m.content.match(/https:\/\/gubbu.io\/[a-z]+/);
                            const link = linkMatch ? linkMatch[0] : null;

                            return (
                                <div
                                    key={i}
                                    style={{
                                        marginBottom: 16,
                                        textAlign: m.role === "user" ? "right" : "left",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "inline-block",
                                            padding: "12px 16px",
                                            borderRadius: 16,
                                            maxWidth: "85%",
                                            background: m.role === "user" ? "#0f172a" : "#f8fafc",
                                            color: m.role === "user" ? "white" : "#0f172a",
                                            boxShadow: m.role === "assistant" ? "0 2px 5px rgba(0,0,0,0.05)" : "none",
                                            border: m.role === "assistant" ? "1px solid #f1f5f9" : "none",
                                            whiteSpace: "pre-wrap",
                                            position: "relative",
                                        }}
                                    >
                                        <Linkify
                                            componentDecorator={(href, text, key) => (
                                                <a href={href} key={key} target="_blank" rel="noopener noreferrer" style={{ color: m.role === "user" ? "#93c5fd" : "#2563eb", textDecoration: "underline" }}>
                                                    {text}
                                                </a>
                                            )}
                                        >
                                            {m.content}
                                        </Linkify>

                                        {/* Interactive Booking Button */}
                                        {m.role === "assistant" && link && (
                                            <div style={{ marginTop: 12 }}>
                                                <a
                                                    href={link}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 6,
                                                        background: "#2563eb",
                                                        color: "white",
                                                        padding: "8px 16px",
                                                        borderRadius: 8,
                                                        textDecoration: "none",
                                                        fontWeight: "600",
                                                        fontSize: 13,
                                                        transition: "transform 0.2s",
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                                                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                                >
                                                    🚀 Book Now on Gubbu
                                                </a>
                                            </div>
                                        )}

                                        {m.role === "assistant" && (
                                            <button
                                                onClick={() => speakText(m.content)}
                                                style={{
                                                    marginLeft: 8,
                                                    padding: "4px",
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    verticalAlign: "middle",
                                                    opacity: 0.6
                                                }}
                                                title="Listen to response"
                                            >
                                                🔊
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Interactive Suggestion Chips */}
                        {!loading && messages.length === 1 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => send(s)}
                                        style={{
                                            padding: "8px 12px",
                                            borderRadius: 16,
                                            background: "white",
                                            border: "1px solid #e2e8f0",
                                            color: "#334155",
                                            fontSize: 12,
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                        onMouseEnter={(e) => Object.assign(e.target.style, { background: "#f1f5f9", borderColor: "#cbd5e1" })}
                                        onMouseLeave={(e) => Object.assign(e.target.style, { background: "white", borderColor: "#e2e8f0" })}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {loading && (
                            <div style={{ padding: 8, display: "flex", gap: 4, alignItems: "center" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1", animation: "bounce 1.4s infinite ease-in-out both" }}></div>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1", animation: "bounce 1.4s infinite 0.2s ease-in-out both" }}></div>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1", animation: "bounce 1.4s infinite 0.4s ease-in-out both" }}></div>
                                <style>{`
                                    @keyframes bounce {
                                        0%, 80%, 100% { transform: scale(0); }
                                        40% { transform: scale(1.0); }
                                    }
                                `}</style>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div
                        style={{
                            padding: size !== 'small' ? `16px ${config.padding}px` : config.padding,
                            borderTop: "1px solid #e5e7eb",
                            display: "flex",
                            gap: 8,
                            maxWidth: size !== 'small' ? config.maxWidth : "none",
                            margin: size !== 'small' ? "0 auto" : 0,
                            width: "100%",
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder={isListening ? "Listening..." : "e.g., 5 days in NYC under $1500"}
                            style={{
                                flex: 1,
                                padding: 10,
                                borderRadius: 10,
                                border: isListening ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                            }}
                        />
                        <button
                            onClick={toggleListening}
                            style={{
                                padding: "10px 14px",
                                borderRadius: 10,
                                border: "1px solid #e5e7eb",
                                background: isListening ? "#3b82f6" : "white",
                                color: isListening ? "white" : "#0f172a",
                                cursor: "pointer",
                                fontSize: 18,
                                animation: isListening ? "pulse 1.5s infinite" : "none",
                            }}
                            title={isListening ? "Stop listening" : "Voice input"}
                        >
                            🎤
                        </button>
                        <style>{`
                            @keyframes pulse {
                                0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
                                70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                                100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                            }
                        `}</style>
                        {isSpeaking && (
                            <button
                                onClick={stopSpeaking}
                                style={{
                                    padding: "10px 14px",
                                    borderRadius: 10,
                                    border: "1px solid #e5e7eb",
                                    background: "#ef4444",
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: 18,
                                }}
                                title="Stop speaking"
                            >
                                🔇
                            </button>
                        )}
                        <button
                            onClick={() => send()}
                            disabled={loading}
                            style={{
                                padding: "10px 20px",
                                borderRadius: 10,
                                border: "none",
                                background: loading ? "#94a3b8" : "#0f172a",
                                color: "white",
                                fontWeight: "600",
                                cursor: loading ? "not-allowed" : "pointer",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => !loading && (e.target.style.background = "#1e293b")}
                            onMouseLeave={(e) => !loading && (e.target.style.background = "#0f172a")}
                        >
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
