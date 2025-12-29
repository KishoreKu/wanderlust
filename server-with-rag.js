const http = require("http");
const https = require("https");

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

function send(req, res, status, body, extraHeaders) {
    const allowedOrigins = [
        "https://gubbu.io",
        "https://www.gubbu.io",
    ];

    const origin = req.headers.origin;

    const headers = Object.assign(
        {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
        extraHeaders || {}
    );

    // Set CORS origin dynamically
    if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
    }

    res.writeHead(status, headers);
    res.end(JSON.stringify(body));
}

function readJson(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
            try {
                resolve(data ? JSON.parse(data) : {});
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });
        req.on("error", reject);
    });
}

// Function to create embedding for user question
function createEmbedding(text) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model: "text-embedding-3-small",
            input: text
        });

        const req = https.request(
            "https://api.openai.com/v1/embeddings",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(payload)
                }
            },
            (resp) => {
                let data = "";
                resp.on("data", (chunk) => (data += chunk));
                resp.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (resp.statusCode >= 400) {
                            return reject(new Error(json?.error?.message || "Embedding failed"));
                        }
                        resolve(json.data[0].embedding);
                    } catch {
                        reject(new Error("Failed to parse embedding response"));
                    }
                });
            }
        );

        req.on("error", reject);
        req.write(payload);
        req.end();
    });
}

// Function to search Supabase for relevant documents
function searchDocuments(embedding, matchCount = 3) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            query_embedding: embedding,
            match_count: matchCount
        });

        const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/match_documents`);

        const req = https.request(
            url,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(payload)
                }
            },
            (resp) => {
                let data = "";
                resp.on("data", (chunk) => (data += chunk));
                resp.on("end", () => {
                    try {
                        const json = JSON.parse(data);
                        if (resp.statusCode >= 400) {
                            return reject(new Error(`Supabase error: ${resp.statusCode}`));
                        }
                        resolve(json);
                    } catch {
                        reject(new Error("Failed to parse search response"));
                    }
                });
            }
        );

        req.on("error", reject);
        req.write(payload);
        req.end();
    });
}

// Function to call OpenAI with context
function openaiChatCompletion(messages) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: messages,
            temperature: 0.4,
        });

        const req = https.request(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(payload),
                }
            },
            (resp) => {
                let data = "";
                resp.on("data", (chunk) => (data += chunk));
                resp.on("end", () => {
                    try {
                        const json = JSON.parse(data);

                        if (resp.statusCode >= 400) {
                            return reject(
                                new Error(json?.error?.message || `OpenAI error ${resp.statusCode}`)
                            );
                        }

                        const answer = json?.choices?.[0]?.message?.content || "";
                        resolve(answer);
                    } catch {
                        reject(new Error("Failed to parse OpenAI response"));
                    }
                });
            }
        );

        req.on("error", reject);
        req.write(payload);
        req.end();
    });
}

const server = http.createServer(async (req, res) => {
    try {
        // CORS preflight
        if (req.method === "OPTIONS") {
            const origin = req.headers.origin;
            const allowedOrigins = ["https://gubbu.io", "https://www.gubbu.io"];

            if (allowedOrigins.includes(origin)) {
                res.setHeader("Access-Control-Allow-Origin", origin);
            }

            res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.writeHead(204);
            return res.end();
        }

        if (req.url === "/health" && req.method === "GET") {
            return send(req, res, 200, { status: "ok", rag: "enabled" });
        }

        if (req.url === "/chat" && req.method === "POST") {
            const body = await readJson(req);
            const messages = body.messages || [];

            if (!Array.isArray(messages) || messages.length === 0) {
                return send(req, res, 400, { error: "messages required" });
            }

            if (!process.env.OPENAI_API_KEY) {
                return send(req, res, 500, { error: "OPENAI_API_KEY missing" });
            }

            try {
                // Get user's question
                const userQuestion = messages[messages.length - 1].content;

                // 1. Create embedding for the question
                const questionEmbedding = await createEmbedding(userQuestion);

                // 2. Search for relevant documents in Supabase
                const relevantDocs = await searchDocuments(questionEmbedding, 3);

                // 3. Build context from retrieved documents
                let context = "";
                if (relevantDocs && relevantDocs.length > 0) {
                    context = relevantDocs
                        .map((doc, i) => {
                            const title = doc.title || "Unknown";
                            return `[Source ${i + 1}: ${title}]\n${doc.chunk}`;
                        })
                        .join("\n\n");
                }

                // 4. Build enhanced system message with context
                const systemMessage = {
                    role: "system",
                    content: context
                        ? `You are Gubbu.io AI Travel Assistant. Use the following information from our travel blog to answer questions accurately.

Context from Gubbu.io blog:
${context}

Guidelines:
- Answer based on the context above when relevant
- Be specific and cite information from the sources
- If the answer isn't in the context, provide general travel advice
- Ask clarifying questions if needed (dates, budget, preferences)
- Be friendly, helpful, and concise`
                        : `You are Gubbu.io AI Travel Assistant. Help users plan trips, suggest destinations, estimate budgets, and provide travel tips. Be concise but informative.`
                };

                // 5. Send to OpenAI with context
                const answer = await openaiChatCompletion([systemMessage, ...messages]);

                return send(req, res, 200, { answer });

            } catch (error) {
                console.error("RAG error:", error);
                return send(req, res, 500, { error: "Failed to process request" });
            }
        }

        return send(req, res, 404, { error: "Not found" });
    } catch (e) {
        return send(req, res, 500, { error: e.message || "Server error" });
    }
});

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, () => console.log("Listening on", port));
