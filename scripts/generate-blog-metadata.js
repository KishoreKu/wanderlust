import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content');
const outputDir = path.join(__dirname, '../public');
const outputFile = path.join(outputDir, 'blog-metadata.json');

// Ensure public directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const metadata = {};

function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return {};
    }

    const frontmatterText = match[1];
    const frontmatter = {};
    const lines = frontmatterText.split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes if present
            if (value.length > 1 && (value[0] === '"' || value[0] === "'") && value[0] === value[value.length - 1]) {
                value = value.slice(1, -1);
            }

            frontmatter[key] = value;
        }
    });

    return frontmatter;
}

try {
    const files = fs.readdirSync(contentDir);

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(contentDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const frontmatter = parseFrontmatter(content);
            const slug = path.basename(file, '.md');

            // Construct description from frontmatter or content
            let description = frontmatter.description || frontmatter.excerpt || '';
            if (!description) {
                // Remove frontmatter
                const cleanContent = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
                // Remove markdown syntax roughly
                const plainText = cleanContent
                    .replace(/#+\s/g, '')
                    .replace(/.*\[([^\\\]]+)\].*\([^)]+\)/g, '$1')
                    .replace(/[*_`]/g, '')
                    .replace(/\n+/g, ' ')
                    .trim();
                description = plainText.substring(0, 160) + '...';
            }

            metadata[slug] = {
                title: frontmatter.title || 'Gubbu Blog',
                description: description,
                image: frontmatter.image || 'https://gubbu.io/og-image.jpg', // Fallback image
                date: frontmatter.date,
                author: frontmatter.author,
                category: frontmatter.category
            };
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
    console.log(`Successfully generated metadata for ${Object.keys(metadata).length} posts to ${outputFile}`);

} catch (error) {
    console.error('Error generating metadata:', error);
    process.exit(1);
}
