# 🚀 Manual Backend Deployment Guide

## ✅ Current Status:
- Supabase: 22 embedded chunks ✅
- GitHub: RAG-enabled server.js ✅  
- cPanel: OLD server.js still running ❌

---

## 🎯 Quick Fix: Deploy via cPanel File Manager

### **Step 1: Get the RAG-Enabled Server File**

The file is already on your local machine:
```
/Users/kishorekumar/CascadeProjects/travel-blog-website/server-with-rag.js
```

### **Step 2: Upload to cPanel**

**Option A: cPanel File Manager (Easiest)**

1. Log into cPanel
2. Open **File Manager**
3. Navigate to: `~/gubbu-api/src/`
4. **Delete or rename** the old `server.js`:
   - Right-click `server.js`
   - Rename to `server.js.old`
5. **Upload** the new file:
   - Click "Upload" button
   - Select: `/Users/kishorekumar/CascadeProjects/travel-blog-website/server-with-rag.js`
   - After upload, rename it to `server.js`

**Option B: Via FTP (FileZilla)**

1. Connect to your server via FTP
2. Navigate to: `/home/your_username/gubbu-api/src/`
3. Upload `server-with-rag.js` as `server.js`

**Option C: Via SSH**

```bash
# 1. SSH into server
ssh your_username@your_server

# 2. Navigate to app directory
cd ~/gubbu-api

# 3. Pull latest from GitHub
git pull origin main

# 4. Verify the file has RAG code
grep "rag.*enabled" src/server.js
# Should show: { status: "ok", rag: "enabled" }
```

### **Step 3: Verify Environment Variables**

Make sure these are set in cPanel:

**Go to:** cPanel → **Setup Node.js App** → Your app → **Environment Variables**

Add if missing:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...  (ANON key, not SERVICE!)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

### **Step 4: Restart the App**

**In cPanel:**
1. Go to **Setup Node.js App**
2. Find your `gubbu-api` application
3. Click **Restart** button
4. Wait 30 seconds

---

## 🧪 Test It Works:

### **Test 1: Health Check**
```bash
curl https://api.gubbu.io/health
```

**Should return:**
```json
{"status":"ok","rag":"enabled"}
```

If you still see just `{"status":"ok"}`, the old file is still running.

### **Test 2: RAG Query**
```bash
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Best time to visit Lapland for Northern Lights?"}]}'
```

**Should mention:** 
- "December 15-30"
- "$2,000-3,500 per person"
- "9 PM - 2 AM for best viewing"

These are specific details from YOUR blog post!

### **Test 3: Chat Widget**
1. Go to https://gubbu.io
2. Open chat widget (bottom right)
3. Ask: "Hidden gems in Southeast Asia?"
4. Should reference Koh Rong, Luang Prabang, etc. from your blog!

---

## 🔍 Troubleshooting:

### **Issue: Still shows `{"status":"ok"}` without "rag"**

**Cause:** Old server.js is still running

**Fix:**
1. Check the file on server: `cat ~/gubbu-api/src/server.js | grep rag`
2. If no "rag" found → file wasn't uploaded
3. Manually upload via File Manager
4. Restart app

### **Issue: Error about SUPABASE_ANON_KEY**

**Cause:** Environment variable not set

**Fix:**
1. cPanel → Setup Node.js App → Environment Variables
2. Add `SUPABASE_ANON_KEY` (NOT SERVICE_KEY!)
3. Get from Supabase → Settings → API → anon/public key
4. Restart app

### **Issue: Answers don't use blog content**

**Cause:** Supabase connection failing

**Fix:**
1. Verify `SUPABASE_URL` is correct
2. Verify `SUPABASE_ANON_KEY` is correct (not SERVICE_KEY!)
3. Test Supabase connection:
```bash
curl -X POST "YOUR_SUPABASE_URL/rest/v1/rpc/match_documents" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query_embedding":[0.1,0.2,...], "match_count":3}'
```

---

## 📊 Expected Behavior After Fix:

### **Before (Current):**
```
User: "Best Christmas destinations?"
AI: Generic list of European cities
```

### **After (With RAG):**
```
User: "Best Christmas destinations?"
AI: "According to our Christmas travel guide, the best destinations include:
     - Lapland, Finland (Dec 15-30, $2,000-3,500)
     - Munich, Germany (Christmas Market Capital)
     - Vienna, Austria (Imperial Christmas)
     [Specific details from YOUR blog!]"
```

---

## 🎯 Quick Checklist:

- [ ] Upload `server-with-rag.js` to cPanel as `server.js`
- [ ] Verify environment variables in cPanel
- [ ] Restart Node.js app
- [ ] Test: `curl https://api.gubbu.io/health` shows "rag":"enabled"
- [ ] Test: Chat answers use blog content
- [ ] Test: Chat widget on gubbu.io works

---

**Start with Option A (cPanel File Manager) - it's the easiest!** 🚀

Let me know which step you're on and I'll help! 🎯
