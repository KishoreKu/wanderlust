import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { NewsletterSignup } from '../components/NewsletterSignup';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(9);

  const blogPosts = [
    // Pet Care Guide - Featured
    {
      id: 'best-dog-food-busy-traveling-pet-parents-2026',
      title: '🐾 Best Dog Food for Busy & Traveling Pet Parents (2026 Guide)',
      excerpt: 'A practical guide to choosing the right dog food when you travel often, work long hours, or juggle multiple responsibilities. Make decisions based on your lifestyle, not just brand names.',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop',
      date: 'Jan 5, 2026',
      category: 'Tips',
      readTime: '9 min read',
      featured: true,
    },
    // New GetYourGuide Destination Guides - Featured at Top
    {
      id: 'barcelona-activities-guide',
      title: '🇪🇸 Best Things to Do in Barcelona',
      excerpt: 'Experience the best of Barcelona! From skip-the-line Sagrada Familia tickets to Montserrat day trips and 3-country tours. Complete guide with prices starting from $25.',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '12 min read',
      featured: true,
    },
    {
      id: 'las-vegas-activities-guide',
      title: '🎰 Best Las Vegas Activities & Tours',
      excerpt: 'Entertainment Capital of the World! From Grand Canyon tours to Cirque du Soleil shows, helicopter flights, and desert adventures. Complete guide with prices starting from $30.',
      image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '11 min read',
      featured: true,
    },
    {
      id: 'rome-colosseum-tours-guide',
      title: '🏛️ Best Rome Colosseum Tours',
      excerpt: 'Skip the 2-3 hour lines! From underground chambers to arena floor access. Complete guide to the best Colosseum tours with prices starting from $20.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 'budapest-activities-guide',
      title: '🇭🇺 Top Budapest Activities & Experiences',
      excerpt: 'Experience the Pearl of the Danube! From river cruises to famous ruin bars, thermal spas, and food tours. Complete guide with prices starting from $11.',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 'marrakech-activities-guide',
      title: '🇲🇦 Top Marrakech Activities & Day Trips',
      excerpt: 'Discover the best things to do in Marrakech! From Agafay Desert adventures to Atlas Mountains day trips and hot air balloon rides. Complete guide with prices starting from $15.',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '11 min read',
      featured: true,
    },
    {
      id: 'dubai-desert-safari-guide',
      title: '🏜️ Top 10 Dubai Desert Safari Adventures',
      excerpt: 'Experience the magic of Dubai\'s desert! From thrilling dune bashing to cultural BBQ dinners under the stars. Complete guide to the top 10 desert safaris with prices, ratings, and insider tips.',
      image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 'istanbul-activities-guide',
      title: '🕌 Top 11 Must-Do Activities in Istanbul',
      excerpt: 'Discover the best tours and activities in Istanbul! From magical Bosphorus cruises to historic landmarks and traditional Turkish baths. Complete guide with prices, ratings, and insider tips.',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '9 min read',
      featured: true,
    },
    {
      id: 'getyourguide-tours-activities',
      title: '🎯 Discover Amazing Tours & Activities with GetYourGuide',
      excerpt: 'Skip the planning stress and discover unforgettable experiences! Learn how GetYourGuide helps you find the best tours, activities, and attractions worldwide with skip-the-line access, expert guides, and flexible booking.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Tips',
      readTime: '7 min read',
      featured: true,
    },
    {
      id: 'auschwitz-birkenau-visit-guide',
      title: 'Visiting Auschwitz-Birkenau: Complete Guide from Krakow',
      excerpt: 'A respectful guide to visiting Auschwitz-Birkenau Memorial and Museum. Essential information about tours, transportation, and what to expect at this important historical site.',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop',
      date: 'Jan 4, 2026',
      category: 'Destinations',
      readTime: '12 min read',
      featured: true,
    },
    // Original Blog Posts
    {
      id: 'christmas-2025',
      title: '🎄 The Ultimate Christmas Travel Guide 2025: 10 Magical Destinations',
      excerpt: 'Discover the world\'s most enchanting Christmas destinations! From snowy Lapland to festive New York City, find your perfect holiday escape. Complete with budget tips, packing lists, and insider secrets.',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Destinations',
      readTime: '8 min read',
      featured: true,
    },
    {
      id: 'new-years-eve-usa-2025',
      title: '🎉 New Year\'s Eve in the USA (2025): Best Ways to Celebrate Across the Country',
      excerpt: 'Discover the best ways to celebrate New Year\'s Eve across the USA — from fireworks and crowds to family-friendly events and late-night parties.',
      image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Destinations',
      readTime: '8 min read',
      featured: true,
    },
    {
      id: 'southeast-asia-hidden-gems',
      title: '10 Hidden Gems in Southeast Asia',
      excerpt: 'Discover the most beautiful off-the-beaten-path destinations that most tourists miss. From secret beaches to mountain villages.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Destinations',
      readTime: '8 min read',
    },
    {
      id: 'budget-travel-tips-2024',
      title: 'Budget Travel Tips for 2025',
      excerpt: 'Learn how to travel the world without breaking the bank with these expert tips. Save money on flights, accommodation, and activities.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Tips',
      readTime: '6 min read',
    },
    {
      id: 'best-time-visit-europe',
      title: 'Best Time to Visit European Cities',
      excerpt: 'A comprehensive guide to planning your European adventure at the perfect time. Weather, crowds, and prices explained.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Planning',
      readTime: '10 min read',
    },
    {
      id: 'solo-travel-safety-guide',
      title: 'Solo Travel Safety Guide',
      excerpt: 'Essential safety tips for solo travelers. Learn how to stay safe while exploring the world on your own.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
      date: 'Dec 31, 2025',
      category: 'Safety',
      readTime: '7 min read',
    },
  ];

  const categories = ['All', 'Destinations', 'Tips', 'Planning', 'Safety'];

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get posts to display based on visible count
  const displayedPosts = filteredPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < filteredPosts.length;

  // Handler for load more
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 9);
  };

  // Handler for search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisiblePosts(9); // Reset visible posts when searching
  };

  // Handler for category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisiblePosts(9); // Reset visible posts when changing category
  };



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
                value={searchQuery}
                onChange={handleSearchChange}
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
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-medium shadow-sm transition-colors ${selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-600 hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {displayedPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
            </div>
          )}

          {hasMorePosts && (
            <div className="text-center mt-12">
              <Button size="lg" onClick={handleLoadMore}>Load More Articles</Button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
