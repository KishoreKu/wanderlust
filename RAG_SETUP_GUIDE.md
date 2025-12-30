# 🤖 RAG Pipeline Setup Guide - Markdown + Supabase

Complete guide to implement Retrieval-Augmented Generation for your travel blog.

---

## 🎯 What We're Building

**RAG System Architecture:**
```
User Question
    ↓
Embed question (OpenAI)
    ↓
Search Supabase (pgvector)
    ↓
Retrieve top 3 relevant chunks
    ↓
Build context from blog posts
    ↓
Send to OpenAI GPT-4o-mini
    ↓
Return accurate answer
```

---

## 📦 Step 1: Set Up Supabase (15 minutes)

### 1.1 Create Supabase Account

1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create new project:
   - Name: `gubbu-rag`
   - Database Password: (save this!)
   - Region: Choose closest to your users
   - Plan: Free tier (25GB database, 500MB storage)

### 1.2 Enable pgvector Extension

1. In Supabase dashboard → **SQL Editor**
2. Run this SQL:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536)  -- OpenAI embeddings are 1536 dimensions
);

-- Create index for faster similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create function for similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
$$;
```

### 1.3 Get API Keys

1. **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGc...` (safe for frontend)
   - **service_role key:** `eyJhbGc...` (secret, backend only!)

---

## 📝 Step 2: Convert Blog Posts to Markdown (30 minutes)

### 2.1 Create Content Directory

```bash
cd /Users/kishorekumar/CascadeProjects/travel-blog-website
mkdir -p src/content
```

### 2.2 Markdown Format

Each post should have frontmatter + content:

```markdown
---
id: christmas-2025
title: "🎄 The Ultimate Christmas Travel Guide 2025"
author: "Gubbu Team"
date: "2024-12-24"
category: "Destinations"
excerpt: "Discover the world's most enchanting Christmas destinations..."
---

# Main content here

Your blog post content in markdown format...
```

**I've already created `christmas-2025.md` for you!**

### 2.3 Convert Remaining Posts

You need to convert these 5 more posts:
- `new-years-eve-usa-2025.md`
- `southeast-asia-hidden-gems.md`
- `budget-travel-tips-2024.md`
- `best-time-visit-europe.md`
- `solo-travel-safety-guide.md`

---

## 🔧 Step 3: Create Embedding Pipeline (30 minutes)

### 3.1 Install Dependencies

```bash
cd /Users/kishorekumar/CascadeProjects/travel-blog-website

npm install @supabase/supabase-js openai gray-matter
```

### 3.2 Create Embedding Script

Create `scripts/embed-content.js`:

```javascript
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to split text into chunks
function splitIntoChunks(text, maxTokens = 500) {
  const sentences = text.split(/[.!?]+/);
  const chunks = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    
    // Rough token estimate: ~4 chars per token
    if ((currentChunk + trimmed).length / 4 > maxTokens) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + trimmed;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// Function to embed and store a document
async function embedDocument(filePath) {
  console.log(`Processing: ${filePath}`);
  
  // Read markdown file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  
  // Split content into chunks
  const chunks = splitIntoChunks(content);
  console.log(`  Split into ${chunks.length} chunks`);
  
  // Process each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk
    });
    
    const embedding = embeddingResponse.data[0].embedding;
    
    // Store in Supabase
    const { error } = await supabase
      .from('documents')
      .insert({
        content: chunk,
        metadata: {
          ...frontmatter,
          chunk_index: i,
          total_chunks: chunks.length,
          file_path: filePath
        },
        embedding
      });
    
    if (error) {
      console.error(`  Error storing chunk ${i}:`, error);
    } else {
      console.log(`  ✓ Stored chunk ${i}/${chunks.length}`);
    }
    
    // Rate limiting: wait 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Main function
async function main() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  console.log(`Found ${files.length} markdown files\n`);
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    await embedDocument(filePath);
    console.log('');
  }
  
  console.log('✅ All documents embedded and stored!');
}

main().catch(console.error);
```

### 3.3 Create .env File

```bash
# In your project root
cat > .env << 'EOF'
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here

# OpenAI
OPENAI_API_KEY=your_openai_key_here
EOF
```

### 3.4 Add to package.json

```json
{
  "scripts": {
    "embed": "node scripts/embed-content.js"
  },
  "type": "module"
}
```

### 3.5 Run Embedding

```bash
npm run embed
```

**This will:**
- Read all .md files
- Split into chunks
- Create embeddings
- Store in Supabase

**Cost:** ~$0.01 for 6 blog posts

---

## 🤖 Step 4: Update Chat API with RAG (30 minutes)

### 4.1 Update Backend Dependencies

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api

# Add to package.json (for documentation)
```

### 4.2 Update server.js

Replace the chat endpoint with RAG-enabled version:

```javascript
const https = require("https");
const http = require("http");

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

// Function to create embedding
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

// Function to search Supabase
function searchDocuments(embedding, matchCount = 3) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: matchCount
    });

    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/match_documents`);
    
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
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

// Updated chat endpoint with RAG
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

    // 2. Search for relevant documents
    const relevantDocs = await searchDocuments(questionEmbedding, 3);

    // 3. Build context from retrieved documents
    const context = relevantDocs
      .map((doc, i) => `[Source ${i + 1}]: ${doc.content}`)
      .join("\n\n");

    // 4. Build enhanced system message with context
    const systemMessage = {
      role: "system",
      content: `You are Gubbu.io AI Travel Assistant. Use the following information from our travel blog to answer questions. If the answer isn't in the provided context, say so and provide general travel advice.

Context from Gubbu.io blog:
${context}

Guidelines:
- Answer based on the context above when possible
- Be specific and cite information from the sources
- If not in context, provide general travel advice
- Ask clarifying questions if needed (dates, budget, preferences)
- Be friendly and helpful`
    };

    // 5. Send to OpenAI with context
    const answer = await openaiChatCompletion([systemMessage, ...messages]);

    return send(req, res, 200, { answer });

  } catch (error) {
    console.error("RAG error:", error);
    return send(req, res, 500, { error: "Failed to process request" });
  }
}
```

### 4.3 Add Environment Variables to cPanel

1. SSH/Terminal in cPanel
2. Navigate to `/home/username/gubbu-api`
3. Edit `.env`:

```bash
OPENAI_API_KEY=your_key
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

---

## 🧪 Step 5: Test the RAG System (15 minutes)

### 5.1 Test Locally

```bash
# Test embedding search
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What are the best Christmas destinations in Europe?"}
    ]
  }'
```

**Expected response:**
```json
{
  "answer": "Based on our Christmas travel guide, the best Christmas destinations in Europe include:\n\n1. **Munich, Germany** - Known as the Christmas Market Capital with the famous Christkindlmarkt...\n\n[Answer will include specific details from your blog posts]"
}
```

### 5.2 Test on Production

```bash
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Best time to visit Lapland for Northern Lights?"}
    ]
  }'
```

---

## 📊 Cost Analysis

### One-Time Setup:
- Embedding 6 posts (~30,000 tokens): **$0.01**

### Monthly Costs:
| Component | Usage | Cost |
|-----------|-------|------|
| Supabase | Free tier | $0 |
| OpenAI Embeddings | 1000 queries/month | $0.10 |
| OpenAI GPT-4o-mini | 1000 responses | $5-10 |
| **Total** | | **$5-10/month** |

---

## ✅ Benefits of RAG

1. **Accurate Answers** - Based on YOUR blog content
2. **No Hallucinations** - AI can't make up facts
3. **Cites Sources** - Can link back to blog posts
4. **Always Up-to-Date** - Re-embed when you add posts
5. **Cost-Effective** - ~$5-10/month
6. **Scalable** - Works for 10 or 10,000 posts

---

## 🔄 Updating Content

When you add a new blog post:

```bash
# 1. Create new markdown file
src/content/new-post.md

# 2. Re-run embedding
npm run embed

# 3. Done! RAG will use new content
```

---

## 🎯 Next Steps

1. ✅ Convert remaining 5 blog posts to Markdown
2. ✅ Set up Supabase account
3. ✅ Run embedding script
4. ✅ Update backend API
5. ✅ Test RAG system
6. ✅ Deploy to production

---

**Ready to start? Let me know which step you want to tackle first!** 🚀
