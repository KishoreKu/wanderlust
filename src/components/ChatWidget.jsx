import { useState } from "react";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! Where do you want to travel? Share dates and budget if you have them.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

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

            const data = await resp.json();

            setMessages([
                ...next,
                {
                    role: "assistant",
                    content:
                        data.answer ||
                        "Sorry, I couldn't answer that. Please try again.",
                },
            ]);
        } catch (err) {
            setMessages([
                ...next,
                {
                    role: "assistant",
                    content: "Network error. Please try again.",
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
                        right: 18,
                        bottom: 18,
                        width: 360,
                        height: 480,
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 14,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            padding: 12,
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <strong>Gubbu AI</strong>
                        <button
                            onClick={() => setOpen(false)}
                            style={{ cursor: "pointer", border: "none", background: "none" }}
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: 12,
                            overflowY: "auto",
                            fontSize: 14,
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
                                    }}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div style={{ color: "#64748b" }}>Thinking…</div>
                        )}
                    </div>

                    <div
                        style={{
                            padding: 12,
                            borderTop: "1px solid #e5e7eb",
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder="e.g., 5 days in NYC under $1500"
                            style={{
                                flex: 1,
                                padding: 10,
                                borderRadius: 10,
                                border: "1px solid #e5e7eb",
                            }}
                        />
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
