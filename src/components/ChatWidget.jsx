import { useState, useRef, useEffect } from "react";

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
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);

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
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    setIsListening(false);
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
        utterance.onend = () => setIsSpeaking(false);
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

    async function send() {
        const text = input.trim();
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

            // Auto-speak the response if user used voice input
            if (isListening || isSpeaking) {
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
                                    setOpen(false);
                                    setSize('small');
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
                        }}
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    marginBottom: 10,
                                    textAlign: m.role === "user" ? "right" : "left",
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "10px 12px",
                                        borderRadius: 12,
                                        maxWidth: "90%",
                                        background:
                                            m.role === "user" ? "#0f172a" : "#f1f5f9",
                                        color:
                                            m.role === "user" ? "white" : "#0f172a",
                                        whiteSpace: "pre-wrap",
                                        position: "relative",
                                    }}
                                >
                                    {m.content}
                                    {m.role === "assistant" && (
                                        <button
                                            onClick={() => speakText(m.content)}
                                            style={{
                                                marginLeft: 8,
                                                padding: "2px 6px",
                                                border: "none",
                                                background: "transparent",
                                                cursor: "pointer",
                                                fontSize: 16,
                                            }}
                                            title="Listen to response"
                                        >
                                            🔊
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ color: "#64748b" }}>Thinking…</div>
                        )}
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
                            }}
                            title={isListening ? "Stop listening" : "Voice input"}
                        >
                            🎤
                        </button>
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
                            onClick={send}
                            disabled={loading}
                            style={{
                                padding: "10px 14px",
                                borderRadius: 10,
                                border: "1px solid #e5e7eb",
                                background: loading ? "#e2e8f0" : "white",
                                cursor: loading ? "not-allowed" : "pointer",
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
