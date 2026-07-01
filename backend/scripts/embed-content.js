const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Load env vars if dotenv is available (optional but helpful for local runs)
try { require('dotenv').config(); } catch (e) {}

const contentDirFromArg = process.argv[2];
const contentDirFromEnv = process.env.CONTENT_DIR;
const fallbackDir = path.join(process.cwd(), '..', 'travel-blog-website', 'src', 'content');
const contentDir = contentDirFromArg || contentDirFromEnv || (fs.existsSync(fallbackDir) ? fallbackDir : null);

if (!contentDir) {
  console.error('❌ Content directory not provided.');
  console.error('   Usage: node scripts/embed-content.js /path/to/content');
  console.error('   Or set CONTENT_DIR=/path/to/content');
  process.exit(1);
}

if (!fs.existsSync(contentDir)) {
  console.error('❌ Content directory not found:', contentDir);
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
);

// Initialize Google AI Client
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;

if (!genAI) {
    console.error("❌ No Google API Key found. Set GOOGLE_API_KEY.");
    process.exit(1);
}

function splitIntoChunks(text, maxTokens = 500) {
  const sentences = text.split(/[.!?]+/);
  const chunks = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

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

async function getEmbedding(text) {
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

async function deleteExistingEmbeddings(url) {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('url', url);

  if (error) {
    console.error(`  ⚠️ Error clearing old embeddings for ${url}:`, error.message);
  } else {
    // console.log(`  Cleared old embeddings for ${url}`);
  }
}

async function embedDocument(filePath) {
  console.log(`Processing: ${path.basename(filePath)}`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  const url = `/blog/${frontmatter.id}`;
  
  // Clean up previous version of this document to prevent duplicates
  await deleteExistingEmbeddings(url);

  const chunks = splitIntoChunks(content);
  console.log(`  Split into ${chunks.length} chunks`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    try {
        const embedding = await getEmbedding(chunk);

        const { error } = await supabase
          .from('documents')
          .insert({
            url: url,
            title: frontmatter.title || 'Untitled',
            chunk,
            embedding,
          });

        if (error) {
          console.error(`  Error storing chunk ${i}:`, error);
          console.error(`  Error details:`, JSON.stringify(error, null, 2));
        } else {
          console.log(`  ✓ Stored chunk ${i + 1}/${chunks.length}`);
        }
    } catch (e) {
        console.error(`  Error generating/storing chunk ${i}:`, e.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

async function main() {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  No markdown files found in content directory.');
    process.exit(0);
  }

  console.log(`Found ${files.length} markdown files in ${contentDir}\n`);

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    await embedDocument(filePath);
    console.log('');
  }

  console.log('✅ All documents embedded and stored!');
  console.log('\n📊 Summary:');
  console.log(`   Files processed: ${files.length}`);
  console.log('   Check Supabase dashboard to verify');
}

main().catch(console.error);
