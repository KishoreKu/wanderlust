# Gubbu API - Auto-Deployment Setup Guide

## 🎯 Complete Auto-Deployment Setup for Backend API

This guide sets up automatic deployment from GitHub to cPanel for your `gubbu-api` backend.

---

## 📁 Step 1: Updated server.js with Better CORS

Save this as `server.js` in your `gubbu-api` directory:

```javascript
const http = require("http");
const https = require("https");

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

function openaiChatCompletion(messages) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Gubbu.io AI Travel Assistant. Ask clarifying questions if dates/budget/start city are missing. Do not claim live prices or availability.",
        },
        ...messages,
      ],
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
        },
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
      return send(req, res, 200, { status: "ok" });
    }

    if (req.url === "/chat" && req.method === "POST") {
      const body = await readJson(req);
      const messages = body.messages || [];

      if (!Array.isArray(messages) || messages.length === 0) {
        return send(req, res, 400, { error: "messages required" });
      }

      if (!process.env.OPENAI_API_KEY) {
        return send(req, res, 500, { error: "OPENAI_API_KEY missing in .env" });
      }

      const answer = await openaiChatCompletion(messages);
      return send(req, res, 200, { answer });
    }

    return send(req, res, 404, { error: "Not found" });
  } catch (e) {
    return send(req, res, 500, { error: e.message || "Server error" });
  }
});

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, () => console.log("Listening on", port));
```

---

## 🚀 Step 2: GitHub Actions Workflow

Create `.github/workflows/deploy-api.yml`:

```yaml
name: Deploy API to cPanel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.API_FTP_USERNAME }}
          password: ${{ secrets.API_FTP_PASSWORD }}
          local-dir: ./
          server-dir: /api.gubbu.io/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/.env.example
            **/README.md
            **/.github/**
```

---

## 🔑 Step 3: GitHub Repository Setup

### Create New Repository:

1. Go to https://github.com/new
2. Repository name: `gubbu-api`
3. Description: "Backend API for Gubbu travel chat assistant"
4. **Private** (recommended - contains sensitive code)
5. Click "Create repository"

---

## 📦 Step 4: Add GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/gubbu-api/settings/secrets/actions`

Add these secrets:

### **FTP_SERVER**
- Your cPanel FTP server (e.g., `ftp.gubbu.io` or your server IP)

### **API_FTP_USERNAME**
- Your FTP username for the API subdomain

### **API_FTP_PASSWORD**
- Your FTP password

---

## 🗂️ Step 5: Project Structure

Your `gubbu-api` directory should look like this:

```
gubbu-api/
├── .github/
│   └── workflows/
│       └── deploy-api.yml
├── .gitignore
├── server.js
├── .env.example
├── package.json (optional - for documentation)
└── README.md
```

---

## 🚫 Step 6: Create .gitignore

Create `.gitignore`:

```
# Environment variables
.env
.env.local
.env.production

# Dependencies (if you add any later)
node_modules/
package-lock.json

# Logs
logs/
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# cPanel files
.cpanel.yml
.htaccess
```

---

## 📝 Step 7: Create .env.example

Create `.env.example` (template for environment variables):

```env
# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-...

# OpenAI Model (optional, defaults to gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Server Port (optional, defaults to 3000)
PORT=3000
```

---

## 📄 Step 8: Create package.json (Optional)

Even though you don't use npm, this helps document the project:

```json
{
  "name": "gubbu-api",
  "version": "1.0.0",
  "description": "Backend API for Gubbu travel chat assistant - Native Node.js",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "keywords": ["travel", "api", "openai", "chat", "nodejs"],
  "author": "Gubbu",
  "license": "MIT",
  "engines": {
    "node": ">=14.0.0"
  }
}
```

---

## 📋 Step 9: Create README.md

```markdown
# Gubbu API

Backend API for Gubbu travel chat assistant powered by OpenAI.

## Stack

- **Runtime:** Node.js 14.21.2
- **Dependencies:** ZERO (native http/https only)
- **Deployment:** cPanel/Passenger via GitHub Actions
- **AI:** OpenAI GPT-4o-mini

## Endpoints

### GET /health
Health check endpoint.

**Response:**
\`\`\`json
{"status": "ok"}
\`\`\`

### POST /chat
Chat with AI travel assistant.

**Request:**
\`\`\`json
{
  "messages": [
    {"role": "user", "content": "Best time to visit Paris?"}
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "answer": "The best time to visit Paris..."
}
\`\`\`

## Environment Variables

Copy \`.env.example\` to \`.env\` and configure:

- \`OPENAI_API_KEY\` - Your OpenAI API key
- \`OPENAI_MODEL\` - Model to use (default: gpt-4o-mini)
- \`PORT\` - Server port (default: 3000)

## Deployment

Automatically deploys to \`api.gubbu.io\` on push to \`main\` branch via GitHub Actions.

## CORS

Allows requests from:
- \`https://gubbu.io\`
- \`https://www.gubbu.io\`

## License

MIT
```

---

## 🚀 Step 10: Initialize Git and Push

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api

# Initialize git (if not already done)
git init
git branch -M main

# Add all files
git add .

# Commit
git commit -m "Initial commit: Native Node.js API with auto-deploy"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gubbu-api.git

# Push
git push -u origin main
```

---

## ⚙️ Step 11: cPanel Setup

### Create Subdomain (if not already done):

1. **cPanel** → **Domains** → **Subdomains**
2. Subdomain: `api`
3. Document Root: `/api.gubbu.io`
4. Click **Create**

### Set Environment Variables:

1. **cPanel** → **Terminal** or **File Manager**
2. Navigate to `/api.gubbu.io`
3. Create `.env` file:
   ```bash
   nano .env
   ```
4. Add:
   ```env
   OPENAI_API_KEY=your_actual_key_here
   OPENAI_MODEL=gpt-4o-mini
   PORT=3000
   ```
5. Save and exit

### Start the Server:

If using Passenger (cPanel Node.js app):
1. **cPanel** → **Setup Node.js App**
2. Create new application:
   - Node.js version: 14.21.2
   - Application root: `/api.gubbu.io`
   - Application URL: `api.gubbu.io`
   - Application startup file: `server.js`
3. Click **Create**

---

## ✅ Step 12: Test Auto-Deployment

1. Make a small change to `server.js` (e.g., add a comment)
2. Commit and push:
   ```bash
   git add server.js
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Check GitHub Actions:
   - Go to `https://github.com/YOUR_USERNAME/gubbu-api/actions`
   - Watch the deployment progress
4. Test the API:
   ```bash
   curl https://api.gubbu.io/health
   ```

---

## 🎯 Expected Workflow

```
Developer
    ↓
git push to main
    ↓
GitHub Actions triggered
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
- Check GitHub Secrets are correct
- Verify FTP credentials
- Check cPanel FTP access is enabled

### API not responding:
- Check Passenger app is running in cPanel
- Verify `.env` file exists with OPENAI_API_KEY
- Check cPanel error logs

### CORS errors:
- Verify domain is in `allowedOrigins` array
- Check Cloudflare proxy settings (if using)

---

## 📊 Monitoring

### Check API Status:
```bash
curl https://api.gubbu.io/health
```

### Test Chat Endpoint:
```bash
curl -X POST https://api.gubbu.io/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### View Logs:
- cPanel → Error Logs
- Or check Passenger logs in cPanel

---

## 🎉 You're Done!

Your backend API now has:
- ✅ Improved CORS handling (www support)
- ✅ Auto-deployment from GitHub
- ✅ Zero dependencies
- ✅ Production-ready setup
- ✅ Proper error handling

**Every push to `main` automatically deploys to `api.gubbu.io`!** 🚀
