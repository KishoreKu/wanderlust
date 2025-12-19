import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '../components/Button';

export function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: '10 Hidden Gems in Southeast Asia',
      excerpt: 'Discover the most beautiful off-the-beaten-path destinations that most tourists miss. From secret beaches to mountain villages.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
      date: 'Dec 15, 2024',
      category: 'Destinations',
      readTime: '8 min read',
    },
    {
      id: 2,
      title: 'Budget Travel Tips for 2024',
      excerpt: 'Learn how to travel the world without breaking the bank with these expert tips. Save money on flights, accommodation, and activities.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      date: 'Dec 12, 2024',
      category: 'Tips',
      readTime: '6 min read',
    },
    {
      id: 3,
      title: 'Best Time to Visit European Cities',
      excerpt: 'A comprehensive guide to planning your European adventure at the perfect time. Weather, crowds, and prices explained.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop',
      date: 'Dec 10, 2024',
      category: 'Planning',
      readTime: '10 min read',
    },
    {
      id: 4,
      title: 'Solo Travel Safety Guide',
      excerpt: 'Essential safety tips for solo travelers. Learn how to stay safe while exploring the world on your own.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
      date: 'Dec 8, 2024',
      category: 'Safety',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Ultimate Packing List for Long-Term Travel',
      excerpt: 'Everything you need to pack for extended trips. Minimize your luggage while maximizing your preparedness.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
      date: 'Dec 5, 2024',
      category: 'Tips',
      readTime: '5 min read',
    },
    {
      id: 6,
      title: 'Top 15 Instagram-Worthy Destinations',
      excerpt: 'The most photogenic places on Earth that will make your Instagram feed pop. Perfect spots for travel photography.',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop',
      date: 'Dec 3, 2024',
      category: 'Destinations',
      readTime: '9 min read',
    },
  ];

  const categories = ['All', 'Destinations', 'Tips', 'Planning', 'Safety', 'Food'];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl text-primary-100 mb-8">
            Expert tips, destination guides, and travel inspiration
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white text-gray-700 hover:bg-primary-600 hover:text-white transition-colors font-medium shadow-sm"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center group"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">Load More Articles</Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get the latest travel tips, destination guides, and exclusive deals delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary-600"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
