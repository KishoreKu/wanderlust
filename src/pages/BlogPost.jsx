import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '../components/Button';
import { getBlogPost, getAllBlogPosts } from '../utils/blogLoader';

export function BlogPost() {
  const { id } = useParams();

  // Load blog post dynamically from markdown file
  const post = getBlogPost(id);

  // Redirect to blog list if post not found
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Update meta tags and scroll to top when navigating to a new blog post
  useEffect(() => {
    if (post) {
      // 1. Update page title (CRITICAL for SEO and Analytics)
      document.title = `${post.title} | Gubbu`;

      // 2. Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }

      // Extract plain text from HTML content for description
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const description = textContent.replace(/\s+/g, ' ').trim().substring(0, 160) + '...';
      metaDescription.content = description;

      // 3. Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `https://gubbu.io/blog/${id}`;

      // Helper function to create or update meta tags
      const updateMetaTag = (attribute, attributeValue, content) => {
        let tag = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attribute, attributeValue);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      // 4. Update Open Graph meta tags (Facebook, LinkedIn, WhatsApp)
      updateMetaTag('property', 'og:type', 'article');
      updateMetaTag('property', 'og:title', post.title);
      updateMetaTag('property', 'og:description', description);
      updateMetaTag('property', 'og:url', `https://gubbu.io/blog/${id}`);
      updateMetaTag('property', 'og:image', post.image);
      updateMetaTag('property', 'og:image:width', '1200');
      updateMetaTag('property', 'og:image:height', '630');
      updateMetaTag('property', 'og:site_name', 'Gubbu');
      updateMetaTag('property', 'article:published_time', post.date);
      updateMetaTag('property', 'article:author', post.author);
      updateMetaTag('property', 'article:section', post.category);

      // 5. Update Twitter Card meta tags
      updateMetaTag('name', 'twitter:card', 'summary_large_image');
      updateMetaTag('name', 'twitter:title', post.title);
      updateMetaTag('name', 'twitter:description', description);
      updateMetaTag('name', 'twitter:image', post.image);
      updateMetaTag('name', 'twitter:site', '@gubbu');
      updateMetaTag('name', 'twitter:creator', '@gubbu');
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, [id, post]);

  // Get all blog posts for related articles
  const allBlogPosts = getAllBlogPosts();

  // Filter out the current post and limit to 3 related articles from the same category
  let relatedPosts = allBlogPosts
    .filter((relatedPost) => relatedPost.id !== id && relatedPost.category === post.category)
    .slice(0, 3);

  // If we don't have enough related posts from the same category, fill with other posts
  if (relatedPosts.length < 3) {
    const additionalPosts = allBlogPosts
      .filter((relatedPost) => relatedPost.id !== id && !relatedPosts.find(p => p.id === relatedPost.id))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
              <div className="ml-auto flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Share this article"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    alert('Bookmark feature coming soon!');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Bookmark this article"
                >
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Planning Your Trip?</h3>
                <p className="text-gray-700 mb-6">
                  Find the best deals on hotels and flights for your next adventure
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/hotels">
                    <Button>Browse Hotels</Button>
                  </Link>
                  <Link to="/flights">
                    <Button variant="outline">Search Flights</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              to={`/blog/${relatedPost.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {relatedPost.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold hover:text-primary-600 transition-colors">
                  {relatedPost.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
