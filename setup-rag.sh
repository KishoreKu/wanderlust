#!/bin/bash

# Gubbu RAG Setup - Quick Start Script
# This script helps you set up the RAG pipeline step by step

echo "🤖 Gubbu RAG Pipeline Setup"
echo "============================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this from your project root"
  exit 1
fi

echo "📋 This script will help you set up RAG for your travel blog"
echo ""
echo "What we'll do:"
echo "  1. Create content directory"
echo "  2. Install dependencies"
echo "  3. Create embedding script"
echo "  4. Set up environment variables"
echo ""

read -p "Ready to start? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi

# Step 1: Create directories
echo ""
echo "📁 Step 1: Creating directories..."
mkdir -p src/content
mkdir -p scripts
echo "✅ Created src/content/ and scripts/"

# Step 2: Install dependencies
echo ""
echo "📦 Step 2: Installing dependencies..."
echo "This will install: @supabase/supabase-js, openai, gray-matter"
read -p "Install now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npm install @supabase/supabase-js openai gray-matter
  echo "✅ Dependencies installed"
else
  echo "⏭️  Skipped - install manually later with:"
  echo "   npm install @supabase/supabase-js openai gray-matter"
fi

# Step 3: Create embedding script
echo ""
echo "🔧 Step 3: Creating embedding script..."
cat > scripts/embed-content.js << 'EOF'
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to split text into chunks
function splitIntoChunks(text, maxTokens = 500) {
  const sentences = text.split(/[.!?]+/);
  const chunks = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    
    // Rough token estimate: ~4 chars per token
    if ((currentChunk + trimmed).length / 4 > maxTokens) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + trimmed;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// Function to embed and store a document
async function embedDocument(filePath) {
  console.log(`Processing: ${path.basename(filePath)}`);
  
  // Read markdown file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);
  
  // Split content into chunks
  const chunks = splitIntoChunks(content);
  console.log(`  Split into ${chunks.length} chunks`);
  
  // Process each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk
    });
    
    const embedding = embeddingResponse.data[0].embedding;
    
    // Store in Supabase
    const { error } = await supabase
      .from('documents')
      .insert({
        content: chunk,
        metadata: {
          ...frontmatter,
          chunk_index: i,
          total_chunks: chunks.length,
          file_path: path.basename(filePath)
        },
        embedding
      });
    
    if (error) {
      console.error(`  Error storing chunk ${i}:`, error);
    } else {
      console.log(`  ✓ Stored chunk ${i + 1}/${chunks.length}`);
    }
    
    // Rate limiting: wait 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Main function
async function main() {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  
  if (!fs.existsSync(contentDir)) {
    console.error('❌ Content directory not found:', contentDir);
    process.exit(1);
  }
  
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('⚠️  No markdown files found in src/content/');
    console.log('   Add your blog posts as .md files first');
    process.exit(0);
  }
  
  console.log(`Found ${files.length} markdown files\n`);
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    await embedDocument(filePath);
    console.log('');
  }
  
  console.log('✅ All documents embedded and stored!');
  console.log('\n📊 Summary:');
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Check Supabase dashboard to verify`);
}

main().catch(console.error);
EOF

echo "✅ Created scripts/embed-content.js"

# Step 4: Update package.json
echo ""
echo "📝 Step 4: Updating package.json..."

# Check if package.json has "type": "module"
if ! grep -q '"type": "module"' package.json; then
  echo "Adding 'type': 'module' to package.json..."
  # This is a simple approach - you might want to do this manually
  echo "⚠️  Please manually add '\"type\": \"module\"' to your package.json"
fi

# Add embed script
if ! grep -q '"embed"' package.json; then
  echo "⚠️  Please manually add this to your package.json scripts:"
  echo '    "embed": "node scripts/embed-content.js"'
fi

# Step 5: Environment variables
echo ""
echo "🔐 Step 5: Environment Variables"
echo ""
echo "You need to set up these environment variables:"
echo ""
echo "1. SUPABASE_URL - Your Supabase project URL"
echo "2. SUPABASE_SERVICE_KEY - Your Supabase service role key"
echo "3. OPENAI_API_KEY - Your OpenAI API key"
echo ""
echo "Create a .env file? (y/n)"
read -p "> " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing up to .env.backup"
    cp .env .env.backup
  fi
  
  cat > .env << 'EOF'
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_key_here

# Optional: OpenAI Model
OPENAI_MODEL=gpt-4o-mini
EOF
  
  echo "✅ Created .env file"
  echo "⚠️  IMPORTANT: Edit .env and add your actual keys!"
else
  echo "⏭️  Skipped - create .env manually"
fi

# Summary
echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Set up Supabase:"
echo "   - Go to https://supabase.com"
echo "   - Create a new project"
echo "   - Run the SQL from RAG_SETUP_GUIDE.md"
echo "   - Get your API keys"
echo ""
echo "2. Update .env with your keys"
echo ""
echo "3. Add your blog posts as .md files to src/content/"
echo "   (One file already created: christmas-2025.md)"
echo ""
echo "4. Run the embedding script:"
echo "   npm run embed"
echo ""
echo "5. Update your backend API (see RAG_SETUP_GUIDE.md)"
echo ""
echo "📖 Full guide: RAG_SETUP_GUIDE.md"
echo ""
