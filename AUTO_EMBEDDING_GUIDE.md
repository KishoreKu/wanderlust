# 🤖 Automated RAG Embedding

## ✅ What I've Set Up:

**GitHub Actions workflow** that automatically embeds blog posts whenever you:
1. Add a new `.md` file to `src/content/`
2. Update an existing `.md` file
3. Push to GitHub

**Location:** `.github/workflows/embed-content.yml`

---

## 🔑 Setup GitHub Secrets (One-Time)

Go to: `https://github.com/KishoreKu/wanderlust/settings/secrets/actions`

Add these 3 secrets:

### **1. SUPABASE_URL**
- Name: `SUPABASE_URL`
- Value: `https://xxxxx.supabase.co`
- Get from: Supabase dashboard → Settings → API

### **2. SUPABASE_SERVICE_KEY**
- Name: `SUPABASE_SERVICE_KEY`
- Value: `eyJhbGc...` (long string)
- Get from: Supabase dashboard → Settings → API → service_role key

### **3. OPENAI_API_KEY**
- Name: `OPENAI_API_KEY`
- Value: `sk-...`
- Get from: https://platform.openai.com/api-keys

---

## 🚀 How It Works:

### **Automated Workflow:**

```
You create new blog post
    ↓
Save as src/content/new-post.md
    ↓
git add src/content/new-post.md
git commit -m "Add new blog post"
git push origin main
    ↓
GitHub Actions detects .md file change
    ↓
Automatically runs embedding script
    ↓
New post embedded in Supabase
    ↓
✅ RAG updated! No manual work!
```

---

## 📝 Your Workflow (After Setup):

### **Adding a New Blog Post:**

```bash
# 1. Create markdown file
cat > src/content/my-new-post.md << 'EOF'
---
id: my-new-post
title: "My Amazing Travel Guide"
date: "2025-01-01"
category: "Destinations"
---

Your content here...
EOF

# 2. Commit and push
git add src/content/my-new-post.md
git commit -m "Add new travel guide"
git push origin main

# 3. That's it! 
# GitHub Actions will automatically:
# - Detect the new .md file
# - Run embedding script
# - Update Supabase
# - Your RAG is updated!
```

**No manual embedding needed!** 🎉

---

## 🔍 Monitor Workflow:

**Check workflow status:**
1. Go to: `https://github.com/KishoreKu/wanderlust/actions`
2. Look for "Auto-Embed Blog Posts" workflow
3. Green ✅ = Success
4. Red ❌ = Check logs

---

## 💰 Cost:

**Per blog post:**
- Embedding: ~$0.002 (very cheap!)
- GitHub Actions: Free (2000 minutes/month)

**Total:** Essentially free! 🎁

---

## ⚡ Smart Triggers:

The workflow **only runs** when:
- ✅ You change files in `src/content/*.md`
- ✅ You push to `main` branch

**Won't run** when:
- ❌ You change other files (CSS, JS, etc.)
- ❌ You push to other branches

This saves GitHub Actions minutes and OpenAI costs!

---

## 🧪 First-Time Setup:

### **Step 1: Add GitHub Secrets** (5 min)
Add the 3 secrets listed above

### **Step 2: Initial Embedding** (5 min)
For your existing 2 posts, run once manually:
```bash
./run-embedding.sh
```

### **Step 3: Push Workflow** (1 min)
```bash
git add .github/workflows/embed-content.yml
git commit -m "Add auto-embedding workflow"
git push origin main
```

### **Step 4: Test It** (2 min)
```bash
# Make a small change to a markdown file
echo "" >> src/content/christmas-2025.md
git add src/content/christmas-2025.md
git commit -m "Test auto-embedding"
git push origin main

# Check GitHub Actions to see it run!
```

---

## ✅ Benefits:

1. **Fully Automated** - No manual embedding
2. **Always Up-to-Date** - RAG updates automatically
3. **Cost-Effective** - Only runs when needed
4. **Error Handling** - GitHub shows if something fails
5. **Audit Trail** - See when each post was embedded

---

## 🎯 Complete Workflow Example:

### **Scenario: You write a new blog post**

```bash
# Monday: Write new post
vim src/content/paris-guide-2025.md

# Add frontmatter and content
# Save and exit

# Commit
git add src/content/paris-guide-2025.md
git commit -m "Add Paris travel guide 2025"
git push origin main

# GitHub Actions automatically:
# 1. Detects new .md file ✅
# 2. Runs embedding script ✅
# 3. Stores in Supabase ✅
# 4. Sends you email notification ✅

# Tuesday: User asks chatbot "Best time to visit Paris?"
# Chatbot: Uses your NEW blog post to answer! ✅
```

**Everything happens automatically!** 🚀

---

## 🔧 Troubleshooting:

### **Workflow fails?**
1. Check GitHub Actions logs
2. Verify secrets are correct
3. Check Supabase is accessible

### **Want to re-embed all posts?**
```bash
# Delete all from Supabase
# Then push a change to trigger workflow
git commit --allow-empty -m "Re-embed all posts"
git push origin main
```

### **Want to skip embedding for a commit?**
```bash
git commit -m "Update README [skip ci]"
# [skip ci] tells GitHub Actions to skip
```

---

## 📊 Summary:

**Before automation:**
```
Write post → Save → Run embedding script → Wait → Push to GitHub
```

**After automation:**
```
Write post → Save → Push to GitHub → ✅ Done!
```

**Time saved:** ~5 minutes per blog post  
**Errors prevented:** No more forgetting to embed  
**Cost:** Free (GitHub Actions free tier)

---

## 🎉 Next Steps:

1. ✅ Add GitHub Secrets (3 keys)
2. ✅ Run initial embedding for existing posts
3. ✅ Push workflow to GitHub
4. ✅ Test with a small change
5. ✅ Enjoy automated RAG updates!

---

**Ready to set up GitHub Secrets?** Let me know when you've added them! 🚀
