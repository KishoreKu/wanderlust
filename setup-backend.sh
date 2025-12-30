#!/bin/bash

# Gubbu API Quick Setup Script
# This script creates the backend API structure automatically

echo "🚀 Setting up Gubbu API Backend..."
echo ""

# Navigate to CascadeProjects
cd /Users/kishorekumar/CascadeProjects

# Create directory
echo "📁 Creating gubbu-api directory..."
mkdir -p gubbu-api/src
mkdir -p gubbu-api/.github/workflows
cd gubbu-api

# Initialize git
echo "🔧 Initializing Git repository..."
git init
git branch -M main

# Create package.json
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
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
EOF

# Create server.js
echo "🖥️  Creating server.js..."
cat > src/server.js << 'EOF'
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
EOF

# Create .env template
echo "🔐 Creating .env template..."
cat > .env.example << 'EOF'
# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# Server Port
PORT=3000

# Node Environment
NODE_ENV=production
EOF

# Create .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
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
EOF

# Create GitHub Actions workflow
echo "⚙️  Creating GitHub Actions workflow..."
cat > .github/workflows/deploy.yml << 'EOF'
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
EOF

# Create README
echo "📝 Creating README.md..."
cat > README.md << 'EOF'
# Gubbu API

Backend API for Gubbu travel chat assistant powered by OpenAI.

## Quick Start

1. Copy `.env.example` to `.env` and add your OpenAI API key
2. Run `npm install`
3. Run `npm run dev`
4. Test at http://localhost:3000/health

## Documentation

See BACKEND_SETUP_GUIDE.md for complete setup instructions.
EOF

echo ""
echo "✅ Backend structure created successfully!"
echo ""
echo "📍 Location: /Users/kishorekumar/CascadeProjects/gubbu-api"
echo ""
echo "🎯 Next steps:"
echo "  1. cd gubbu-api"
echo "  2. cp .env.example .env"
echo "  3. Edit .env and add your OpenAI API key"
echo "  4. npm install"
echo "  5. npm run dev"
echo ""
echo "📖 Full guide: BACKEND_SETUP_GUIDE.md"
echo ""
