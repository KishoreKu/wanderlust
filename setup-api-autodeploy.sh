#!/bin/bash

# Quick Auto-Deploy Setup for Gubbu API
# Run this from /Users/kishorekumar/CascadeProjects/gubbu-api

echo "🚀 Setting up auto-deployment for Gubbu API..."
echo ""

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
  echo "❌ Error: server.js not found!"
  echo "Please run this script from the gubbu-api directory"
  exit 1
fi

# Create .github/workflows directory
echo "📁 Creating GitHub Actions workflow directory..."
mkdir -p .github/workflows

# Create deploy workflow
echo "⚙️  Creating deployment workflow..."
cat > .github/workflows/deploy-api.yml << 'EOF'
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
EOF

# Create/update .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Environment variables
.env
.env.local
.env.production

# Dependencies
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
EOF

# Create .env.example
echo "🔐 Creating .env.example..."
cat > .env.example << 'EOF'
# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-...

# OpenAI Model (optional, defaults to gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Server Port (optional, defaults to 3000)
PORT=3000
EOF

# Create README if it doesn't exist
if [ ! -f "README.md" ]; then
  echo "📝 Creating README.md..."
  cat > README.md << 'EOF'
# Gubbu API

Backend API for Gubbu travel chat assistant powered by OpenAI.

## Stack

- **Runtime:** Node.js 14.21.2 (native http/https)
- **Dependencies:** ZERO
- **Deployment:** Auto-deploy via GitHub Actions
- **AI:** OpenAI GPT-4o-mini

## Endpoints

- `GET /health` - Health check
- `POST /chat` - Chat with AI assistant

## Setup

1. Copy `.env.example` to `.env`
2. Add your `OPENAI_API_KEY`
3. Push to GitHub - auto-deploys to `api.gubbu.io`

See `BACKEND_AUTO_DEPLOY_GUIDE.md` for full setup instructions.
EOF
fi

echo ""
echo "✅ Auto-deployment setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create GitHub repository:"
echo "   https://github.com/new"
echo "   Name: gubbu-api"
echo "   Private: Yes"
echo ""
echo "2. Add GitHub Secrets:"
echo "   Go to: Settings → Secrets and variables → Actions"
echo "   Add:"
echo "   - FTP_SERVER (your cPanel FTP server)"
echo "   - API_FTP_USERNAME (your FTP username)"
echo "   - API_FTP_PASSWORD (your FTP password)"
echo ""
echo "3. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Setup auto-deployment'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/gubbu-api.git"
echo "   git push -u origin main"
echo ""
echo "4. Watch deployment:"
echo "   https://github.com/YOUR_USERNAME/gubbu-api/actions"
echo ""
echo "📖 Full guide: BACKEND_AUTO_DEPLOY_GUIDE.md"
echo ""
