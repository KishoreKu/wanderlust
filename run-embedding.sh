#!/bin/bash

# Quick Embedding Script - No .env file needed
# Run this to embed your blog posts into Supabase

echo "🤖 Gubbu RAG Embedding"
echo "====================="
echo ""
echo "This script will embed your 2 blog posts into Supabase"
echo ""

# Prompt for environment variables
echo "📋 Please enter your API keys:"
echo ""

read -p "SUPABASE_URL (https://xxxxx.supabase.co): " SUPABASE_URL
read -p "SUPABASE_SERVICE_KEY: " SUPABASE_SERVICE_KEY
read -p "OPENAI_API_KEY: " OPENAI_API_KEY

echo ""
echo "🚀 Starting embedding process..."
echo ""

# Export variables and run embedding
export SUPABASE_URL="$SUPABASE_URL"
export SUPABASE_SERVICE_KEY="$SUPABASE_SERVICE_KEY"
export OPENAI_API_KEY="$OPENAI_API_KEY"

# Run the embedding script
node scripts/embed-content.js

echo ""
echo "✅ Done!"
echo ""
echo "Check your Supabase dashboard → Table Editor → documents"
echo "You should see ~27 rows with your blog content"
echo ""
