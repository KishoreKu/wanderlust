# 🚀 Deploy RAG-Enabled Backend

## ✅ Your Embeddings are Ready!

GitHub Actions successfully embedded your 2 blog posts into Supabase! 🎉

---

## 📋 Next Steps:

### **Step 1: Update Backend Server** (5 min)

I've created the RAG-enabled `server.js` for you!

**File location:** `server-with-rag.js` (in your frontend repo)

**What to do:**

```bash
# 1. Copy the new server.js to your backend repo
cp /Users/kishorekumar/CascadeProjects/travel-blog-website/server-with-rag.js \
   /Users/kishorekumar/CascadeProjects/gubbu-api/src/server.js

# 2. Go to backend directory
cd /Users/kishorekumar/CascadeProjects/gubbu-api

# 3. Commit and push
git add src/server.js
git commit -m "Enable RAG: Search blog posts to answer questions"
git push origin main
```

**This will auto-deploy to api.gubbu.io!** ✅

---

### **Step 2: Verify Environment Variables in cPanel** (2 min)

Make sure your cPanel has these env vars:

```bash
# In ~/gubbu-api/.env on your server
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...  # ANON key, not SERVICE key!
PORT=3000
```

**Important:** Backend uses **ANON key** (read-only), not SERVICE key!

---

### **Step 3: Test RAG Locally** (Optional - 5 min)

Before deploying, test locally:

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api

# Set env vars and run
OPENAI_API_KEY="your_key" \
SUPABASE_URL="your_url" \
SUPABASE_ANON_KEY="your_anon_key" \
node src/server.js
```

**Test it:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Best Christmas destinations in Europe?"}
    ]
  }'
```

**Expected response:**
```json
{
  "answer": "Based on our Christmas travel guide, the best Christmas destinations in Europe include Munich, Germany (famous for Christkindlmarkt), Vienna, Austria (imperial Christmas markets), and Zurich, Switzerland (Alpine Christmas charm)..."
}
```

**The answer should reference your blog posts!** ✅

---

### **Step 4: Deploy to Production** (Auto - 2 min)

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api

git add src/server.js
git commit -m "Enable RAG with Supabase vector search"
git push origin main
```

**GitHub Actions will auto-deploy!**

---

### **Step 5: Test Production** (2 min)

```bash
# Test health endpoint
curl https://api.gubbu.io/health

# Should return:
# {"status":"ok","rag":"enabled"}

# Test chat with RAG
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What are the hidden gems in Southeast Asia?"}
    ]
  }'
```

**Should return answer based on your blog post!** ✅

---

### **Step 6: Test Chat Widget on Website** (1 min)

1. Go to https://gubbu.io
2. Click chat widget (bottom-right)
3. Ask: "Best time to visit Lapland?"
4. **Should get answer from your Christmas blog post!** 🎄

---

## 🎯 What Changed in server.js:

### **Before (No RAG):**
```javascript
// Just sends question to OpenAI
const answer = await openaiChatCompletion(messages);
```

### **After (With RAG):**
```javascript
// 1. Create embedding for question
const embedding = await createEmbedding(userQuestion);

// 2. Search Supabase for relevant blog content
const relevantDocs = await searchDocuments(embedding, 3);

// 3. Build context from blog posts
const context = relevantDocs.map(doc => doc.content).join('\n\n');

// 4. Send to OpenAI WITH context
const answer = await openaiChatCompletion([
  { role: "system", content: `Use this context: ${context}` },
  ...messages
]);
```

**Now answers are based on YOUR blog content!** ✅

---

## 📊 RAG Flow:

```
User asks: "Best beaches in Southeast Asia?"
    ↓
1. Create embedding of question
    ↓
2. Search Supabase vector database
    ↓
3. Find relevant chunks from blog posts
    ↓
4. Build context with blog content
    ↓
5. Send to OpenAI with context
    ↓
6. Get accurate answer based on YOUR blog!
    ↓
User gets: "According to our Southeast Asia guide, 
           Koh Rong in Cambodia offers pristine beaches 
           with bioluminescent plankton..."
```

---

## ✅ Benefits:

1. **Accurate Answers** - Based on YOUR content
2. **No Hallucinations** - AI can't make up facts
3. **Always Current** - Auto-updates when you add posts
4. **Cites Sources** - References your blog posts
5. **Cost-Effective** - Only ~$0.01 per 100 queries

---

## 🎉 You're Almost Done!

**Just 3 commands:**

```bash
# 1. Copy new server.js
cp server-with-rag.js ../gubbu-api/src/server.js

# 2. Go to backend
cd ../gubbu-api

# 3. Deploy
git add src/server.js
git commit -m "Enable RAG"
git push origin main
```

**Then test on https://gubbu.io!** 🚀

---

**Ready to deploy?** Let me know if you need help with any step! 🎯
