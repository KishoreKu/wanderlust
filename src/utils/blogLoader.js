// Blog post loader utility
// This dynamically loads blog posts from markdown files instead of hardcoding them

// Import all markdown files from the content directory
const contentModules = import.meta.glob('../content/*.md', {
    eager: true,
    as: 'raw'
});

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: content };
    }

    const frontmatterText = match[1];
    const markdownContent = match[2];

    const frontmatter = {};
    const lines = frontmatterText.split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // Parse arrays (tags)
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
            }

            // Parse booleans
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            frontmatter[key] = value;
        }
    });

    return { frontmatter, content: markdownContent };
}

// Convert markdown content to HTML (basic conversion)
function markdownToHtml(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-6">$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline">$1</a>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6 mb-6 space-y-2">$1</ul>');

    // Paragraphs
    const lines = html.split('\n');
    const processedLines = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('<h') || line.startsWith('<ul') || line.startsWith('<div') ||
            line.startsWith('</') || line.startsWith('<li') || line === '---' || line === '') {
            processedLines.push(line);
        } else if (!line.match(/^<.*>$/)) {
            // Check if it's the first paragraph after a heading
            const prevLine = i > 0 ? lines[i - 1].trim() : '';
            if (prevLine.startsWith('<h1') || prevLine.startsWith('<h2')) {
                processedLines.push(`<p class="text-lg mb-6">${line}</p>`);
            } else {
                processedLines.push(`<p class="mb-4">${line}</p>`);
            }
        } else {
            processedLines.push(line);
        }
    }

    html = processedLines.join('\n');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr class="my-8"/>');

    return html;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'Recent';

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get default image based on category
function getDefaultImage(category) {
    const images = {
        'Destinations': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
        'Tips': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
        'Planning': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop',
        'Safety': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
        'Pet Care': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop',
    };

    return images[category] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop';
}

// Load all blog posts
export function getAllBlogPosts() {
    const posts = [];

    Object.entries(contentModules).forEach(([path, content]) => {
        const filename = path.split('/').pop().replace('.md', '');
        const { frontmatter, content: markdownContent } = parseFrontmatter(content);

        const post = {
            id: filename,
            title: frontmatter.title || 'Untitled',
            excerpt: frontmatter.description || frontmatter.excerpt || markdownContent.substring(0, 160) + '...',
            image: frontmatter.image || getDefaultImage(frontmatter.category),
            date: formatDate(frontmatter.date),
            rawDate: frontmatter.date, // Keep raw date for sorting
            category: frontmatter.category || 'Uncategorized',
            readTime: frontmatter.readTime || calculateReadTime(markdownContent),
            featured: frontmatter.featured || false,
            author: frontmatter.author || 'Gubbu Team',
            tags: frontmatter.tags || [],
        };

        posts.push(post);
    });

    // Sort by raw date (newest first)
    posts.sort((a, b) => {
        const dateA = new Date(a.rawDate || a.date);
        const dateB = new Date(b.rawDate || b.date);
        return dateB - dateA;
    });

    return posts;
}

// Get a single blog post by ID
export function getBlogPost(id) {
    const path = `../content/${id}.md`;
    const content = contentModules[path];

    if (!content) {
        return null;
    }

    const { frontmatter, content: markdownContent } = parseFrontmatter(content);
    const htmlContent = markdownToHtml(markdownContent);

    return {
        id,
        title: frontmatter.title || 'Untitled',
        author: frontmatter.author || 'Gubbu Team',
        date: formatDate(frontmatter.date),
        readTime: frontmatter.readTime || calculateReadTime(markdownContent),
        category: frontmatter.category || 'Uncategorized',
        image: frontmatter.image || getDefaultImage(frontmatter.category),
        content: htmlContent,
    };
}

// Calculate estimated read time
function calculateReadTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Get all unique categories
export function getAllCategories() {
    const posts = getAllBlogPosts();
    const categories = new Set(['All']);

    posts.forEach(post => {
        if (post.category) {
            categories.add(post.category);
        }
    });

    return Array.from(categories);
}
