# 🔍 Troubleshooting: No Rows in Supabase

## ✅ Workflow Succeeded, But No Data?

This usually means one of these issues:

### **1. Check GitHub Actions Logs**

Go to: https://github.com/KishoreKu/wanderlust/actions

Click on the latest "Auto-Embed Blog Posts" run, then:
- Click "embed" job
- Look for the embedding output
- Should show: "Found 2 markdown files", "Processing...", "Stored chunk X/Y"

**What to look for:**
- ✅ "Found 2 markdown files" - Good!
- ❌ "Found 0 markdown files" - Problem: files not in right place
- ❌ Error messages - Check what failed

---

### **2. Possible Issues:**

#### **Issue A: Files Not Found**
The workflow might not see the .md files.

**Check:**
```bash
# Verify files exist in repo
ls -la src/content/
# Should show:
# christmas-2025.md
# southeast-asia-hidden-gems.md
```

#### **Issue B: Supabase Connection Failed**
Secrets might be wrong or Supabase is blocking.

**Check:**
- GitHub Secrets are correct
- Supabase project is active
- SERVICE_KEY has write permissions

#### **Issue C: Silent Failure**
Script ran but errors were caught.

---

### **3. Manual Test (Recommended)**

Let's test locally to see the actual error:

```bash
cd /Users/kishorekumar/CascadeProjects/travel-blog-website

# Run embedding manually
./run-embedding.sh
```

**This will:**
- Ask for your API keys
- Run the embedding script
- Show you exactly what's happening
- Display any errors

---

### **4. Quick SQL Check**

Run this in Supabase SQL Editor:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'documents';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'documents';

-- Check if ANY rows exist
SELECT COUNT(*) FROM documents;

-- Check recent inserts
SELECT * FROM documents 
ORDER BY created_at DESC 
LIMIT 5;
```

---

### **5. Check Workflow Permissions**

The SERVICE_KEY might not have INSERT permissions.

**Test in Supabase:**
1. Go to **Settings** → **API**
2. Copy your **service_role** key
3. Make sure it's the one in GitHub Secrets
4. Try manual insert:

```sql
INSERT INTO documents (url, title, chunk, embedding)
VALUES (
  '/test',
  'Test',
  'Test chunk',
  array_fill(0, ARRAY[1536])::vector
);
```

If this fails, there's a permissions issue.

---

### **6. Enable RLS (Row Level Security)**

Your table might have RLS enabled without policies.

**Check:**
```sql
-- See if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'documents';
```

**If rowsecurity = true, disable it:**
```sql
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
```

---

## 🎯 Recommended Next Steps:

### **Step 1: Check GitHub Actions Logs**
Look for error messages or "Found 0 markdown files"

### **Step 2: Run Manual Test**
```bash
./run-embedding.sh
```

This will show you the exact error!

### **Step 3: Check Supabase Table**
```sql
SELECT COUNT(*) FROM documents;
```

### **Step 4: Verify Secrets**
Make sure GitHub Secrets match your Supabase keys exactly

---

## 📋 Quick Diagnostic:

**Run these commands and share the output:**

```bash
# 1. Check files exist
ls -la src/content/*.md

# 2. Check Supabase connection (replace with your values)
curl -X POST "YOUR_SUPABASE_URL/rest/v1/documents" \
  -H "apikey: YOUR_SERVICE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "/test",
    "title": "Test",
    "chunk": "Test",
    "embedding": "'$(python3 -c "print([0.0]*1536)")'"
  }'
```

---

**What do the GitHub Actions logs show?** 

Let me know and I can help debug! 🔍
