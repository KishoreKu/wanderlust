# 🚀 Gubbu API Auto-Deployment - Quick Start

## ✅ What You Have

- ✅ Working backend API (`server.js`)
- ✅ Running on `api.gubbu.io`
- ✅ Zero dependencies (native Node.js)
- ✅ OpenAI integration working

## 🎯 What We're Setting Up

**Auto-deployment:** Every time you push code to GitHub, it automatically deploys to `api.gubbu.io`

---

## 📝 Step-by-Step Commands

### 1. Navigate to Your API Directory

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api
```

### 2. Run the Auto-Deploy Setup Script

```bash
# Make script executable
chmod +x ../travel-blog-website/setup-api-autodeploy.sh

# Run it
../travel-blog-website/setup-api-autodeploy.sh
```

This creates:
- `.github/workflows/deploy-api.yml` (GitHub Actions workflow)
- `.gitignore` (what not to commit)
- `.env.example` (environment variables template)
- `README.md` (documentation)

### 3. Update server.js with Better CORS

Replace your current `server.js` with the updated version from `BACKEND_AUTO_DEPLOY_GUIDE.md`

Or manually update these two functions:

**Function 1: `send()`**
```javascript
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

  // Set CORS origin dynamically (do NOT use *)
  if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}
```

**Function 2: OPTIONS handler**
```javascript
// Inside server.createServer, update the OPTIONS handler:
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
```

### 4. Initialize Git Repository

```bash
# Initialize git (if not already done)
git init
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit: Auto-deploy setup"
```

### 5. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `gubbu-api`
3. Description: "Backend API for Gubbu travel chat"
4. **Private** ✅ (recommended)
5. Click "Create repository"

### 6. Add GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/gubbu-api/settings/secrets/actions`

Click "New repository secret" and add:

**Secret 1: FTP_SERVER**
- Name: `FTP_SERVER`
- Value: Your cPanel FTP server (e.g., `ftp.gubbu.io`)

**Secret 2: API_FTP_USERNAME**
- Name: `API_FTP_USERNAME`
- Value: Your FTP username

**Secret 3: API_FTP_PASSWORD**
- Name: `API_FTP_PASSWORD`
- Value: Your FTP password

### 7. Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/gubbu-api.git

# Push
git push -u origin main
```

### 8. Watch Auto-Deployment

1. Go to: `https://github.com/YOUR_USERNAME/gubbu-api/actions`
2. You should see "Deploy API to cPanel" workflow running
3. Wait for it to complete (green checkmark ✅)

### 9. Test the Deployment

```bash
# Test health endpoint
curl https://api.gubbu.io/health

# Test chat endpoint
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

---

## 🎉 You're Done!

Now every time you make changes:

```bash
# Make changes to server.js
nano server.js

# Commit and push
git add server.js
git commit -m "Update API"
git push origin main

# GitHub Actions automatically deploys to api.gubbu.io!
```

---

## 📊 Workflow Diagram

```
Local Changes
    ↓
git push origin main
    ↓
GitHub Actions Triggered
    ↓
FTP Deploy to cPanel
    ↓
Files uploaded to /api.gubbu.io/
    ↓
Passenger restarts server
    ↓
API live at https://api.gubbu.io
```

---

## 🔧 Troubleshooting

### Deployment fails:
```bash
# Check GitHub Actions logs
# Go to: https://github.com/YOUR_USERNAME/gubbu-api/actions
# Click on the failed workflow
# Check error messages
```

### API not responding after deploy:
```bash
# Check if files were uploaded
# Login to cPanel → File Manager
# Navigate to /api.gubbu.io/
# Verify server.js exists

# Check Passenger app
# cPanel → Setup Node.js App
# Verify app is running
# Click "Restart" if needed
```

### CORS errors:
```bash
# Verify allowedOrigins in server.js includes your domain
# Check both:
# - https://gubbu.io
# - https://www.gubbu.io
```

---

## 📚 Reference Files

- **Full Guide:** `BACKEND_AUTO_DEPLOY_GUIDE.md`
- **Setup Script:** `setup-api-autodeploy.sh`
- **Workflow File:** `.github/workflows/deploy-api.yml`

---

## ✅ Checklist

- [ ] Run setup script
- [ ] Update server.js with new CORS code
- [ ] Create GitHub repository
- [ ] Add GitHub Secrets (FTP_SERVER, API_FTP_USERNAME, API_FTP_PASSWORD)
- [ ] Push to GitHub
- [ ] Verify deployment in GitHub Actions
- [ ] Test API endpoints
- [ ] Test chat widget on gubbu.io

---

**Happy deploying!** 🚀
