# Gubbu API Backend Setup Guide

## 🚀 Complete Backend Setup Instructions

This guide will help you create a separate backend API repository for your Gubbu chat widget.

---

## 📁 Step 1: Create New Repository

### On GitHub:
1. Go to https://github.com/new
2. Repository name: `gubbu-api`
3. Description: "Backend API for Gubbu travel chat assistant"
4. **Private** (recommended - contains API keys)
5. Click "Create repository"

### On Your Computer:
```bash
cd /Users/kishorekumar/CascadeProjects
mkdir gubbu-api
cd gubbu-api
git init
git branch -M main
```

---

## 📦 Step 2: Create package.json

Create `package.json`:

```json
{
  "name": "gubbu-api",
  "version": "1.0.0",
  "description": "Backend API for Gubbu travel chat assistant",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "keywords": ["travel", "api", "openai", "chat"],
  "author": "Gubbu",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "openai": "^4.20.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🔧 Step 3: Create Server Code

Create `src/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors({
  origin: ['https://gubbu.io', 'http://localhost:5173'],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gubbu API is running' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    // Add system message for travel context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful travel assistant for Gubbu.io. 
      Help users plan trips, suggest destinations, estimate budgets, 
      and provide travel tips. Be concise but informative. 
      Include practical advice about flights, hotels, and activities.
      When suggesting destinations, mention booking options available on Gubbu.io.`
    };

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = completion.choices[0].message.content;

    res.json({ answer });

  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        error: 'OpenAI API quota exceeded. Please check your billing.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to process chat request. Please try again.' 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Gubbu API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
```

---

## 🔐 Step 4: Create Environment Variables

Create `.env`:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Server Port
PORT=3000

# Node Environment
NODE_ENV=production
```

**Get your OpenAI API key:**
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy and paste into `.env`

---

## 🚫 Step 5: Create .gitignore

Create `.gitignore`:

```
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

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
```

---

## 📝 Step 6: Create README

Create `README.md`:

```markdown
# Gubbu API

Backend API for Gubbu travel chat assistant powered by OpenAI.

## Features

- 🤖 AI-powered travel advice using GPT-3.5
- ✈️ Trip planning and budget estimation
- 🏨 Destination recommendations
- 🔒 Secure API with CORS protection

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create \`.env\` file:
   \`\`\`env
   OPENAI_API_KEY=your_key_here
   PORT=3000
   \`\`\`

3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Test the API:
   \`\`\`bash
   curl http://localhost:3000/health
   \`\`\`

## API Endpoints

### POST /chat
Send chat messages and get AI responses.

**Request:**
\`\`\`json
{
  "messages": [
    { "role": "user", "content": "5 days in NYC under $1500" }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "answer": "Here's a great 5-day NYC itinerary..."
}
\`\`\`

### GET /health
Check API status.

## Deployment

See \`.github/workflows/deploy.yml\` for auto-deployment setup.

## License

MIT
```

---

## 🚀 Step 7: GitHub Actions Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to cPanel

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

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./
          server-dir: /api.gubbu.io/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/.env
```

---

## ⚙️ Step 8: Install Dependencies

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api
npm install
```

---

## 🧪 Step 9: Test Locally

```bash
# Start development server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/health

# Test chat endpoint
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Best time to visit Paris?"}
    ]
  }'
```

---

## 🌐 Step 10: Set Up Subdomain

### In cPanel:
1. Go to **Domains** → **Subdomains**
2. Create subdomain: `api`
3. Document root: `/api.gubbu.io`
4. Click **Create**

### In Cloudflare (if using):
1. Go to **DNS** → **Records**
2. Add **A record**:
   - Name: `api`
   - IPv4: Your server IP
   - Proxy: ON (orange cloud)
3. Save

---

## 🔑 Step 11: GitHub Secrets

Add these secrets to your GitHub repository:

1. Go to: `https://github.com/KishoreKu/gubbu-api/settings/secrets/actions`
2. Add:
   - `FTP_SERVER` - Your cPanel FTP server
   - `FTP_USERNAME` - Your FTP username
   - `FTP_PASSWORD` - Your FTP password
   - `OPENAI_API_KEY` - Your OpenAI API key

---

## 📤 Step 12: Push to GitHub

```bash
cd /Users/kishorekumar/CascadeProjects/gubbu-api

# Add all files
git add .

# Commit
git commit -m "Initial backend API setup with OpenAI integration"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/KishoreKu/gubbu-api.git

# Push
git push -u origin main
```

---

## ✅ Step 13: Verify Deployment

1. **Check GitHub Actions:**
   - Go to `https://github.com/KishoreKu/gubbu-api/actions`
   - Verify deployment succeeded

2. **Test live API:**
   ```bash
   curl https://api.gubbu.io/health
   ```

3. **Test from frontend:**
   - Open `https://gubbu.io`
   - Click chat widget
   - Send a message
   - Should get AI response!

---

## 🎯 Project Structure

```
gubbu-api/
├── src/
│   └── server.js          # Main Express server
├── .github/
│   └── workflows/
│       └── deploy.yml     # Auto-deployment
├── .env                   # Environment variables (not in git)
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
└── README.md             # Documentation
```

---

## 🔧 Troubleshooting

### API not responding:
- Check if Node.js is running on server
- Verify subdomain DNS is configured
- Check cPanel error logs

### OpenAI errors:
- Verify API key is correct
- Check OpenAI account has credits
- Review rate limits

### CORS errors:
- Verify `gubbu.io` is in allowed origins
- Check Cloudflare proxy settings

---

## 📊 Cost Estimate

**OpenAI API (GPT-3.5-turbo):**
- ~$0.002 per chat message
- 1000 messages = ~$2
- Very affordable for starting out!

**Hosting:**
- Included in your existing cPanel hosting
- No additional cost!

---

## 🎉 You're Done!

Your backend API is now:
- ✅ Set up with Express
- ✅ Integrated with OpenAI
- ✅ Auto-deploying from GitHub
- ✅ Running on api.gubbu.io
- ✅ Powering your chat widget!

**Happy coding!** 🚀
