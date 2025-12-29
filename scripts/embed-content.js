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

    // Store in Supabase (matching your existing schema)
    const { error } = await supabase
      .from('documents')
      .insert({
        url: `/blog/${frontmatter.id}`,
        title: frontmatter.title || 'Untitled',
        chunk: chunk,
        embedding: embedding
      });

    if (error) {
      console.error(`  Error storing chunk ${i}:`, error);
      console.error(`  Error details:`, JSON.stringify(error, null, 2));
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
