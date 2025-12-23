import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { Button } from '../components/Button';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(9);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(''); // 'success', 'error', or ''

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
      title: 'Budget Travel Tips for 2025',
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
    {
      id: 7,
      title: 'Complete Guide to Backpacking Through South America',
      excerpt: 'From Patagonia to the Amazon, discover how to plan an epic South American backpacking adventure on any budget.',
      image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&auto=format&fit=crop',
      date: 'Nov 28, 2024',
      category: 'Destinations',
      readTime: '12 min read',
    },
    {
      id: 8,
      title: 'Street Food Guide: Bangkok Edition',
      excerpt: 'Navigate Bangkok\'s incredible street food scene like a local. The best dishes, where to find them, and what to pay.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop',
      date: 'Nov 25, 2024',
      category: 'Food',
      readTime: '8 min read',
    },
    {
      id: 9,
      title: 'How to Find Cheap Flights: Insider Secrets',
      excerpt: 'Learn the tricks travel agents use to find the cheapest flights. Timing, tools, and strategies that actually work.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop',
      date: 'Nov 22, 2024',
      category: 'Tips',
      readTime: '7 min read',
    },
    {
      id: 10,
      title: 'Digital Nomad Guide: Best Cities for Remote Work',
      excerpt: 'Top destinations for digital nomads with great wifi, affordable living, and vibrant communities. Complete with cost breakdowns.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      date: 'Nov 20, 2024',
      category: 'Planning',
      readTime: '11 min read',
    },
    {
      id: 11,
      title: 'African Safari: First-Timer\'s Complete Guide',
      excerpt: 'Everything you need to know for your first African safari. Best parks, when to go, what to pack, and how to choose a tour.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop',
      date: 'Nov 18, 2024',
      category: 'Destinations',
      readTime: '10 min read',
    },
    {
      id: 12,
      title: 'Travel Photography Tips for Beginners',
      excerpt: 'Capture stunning travel photos with just your smartphone. Composition, lighting, and editing tips from professional photographers.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop',
      date: 'Nov 15, 2024',
      category: 'Tips',
      readTime: '6 min read',
    },
    {
      id: 13,
      title: 'Island Hopping in Greece: 2-Week Itinerary',
      excerpt: 'The perfect Greek island hopping route. Santorini, Mykonos, Crete, and hidden gems with ferry schedules and hotel recommendations.',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
      date: 'Nov 12, 2024',
      category: 'Destinations',
      readTime: '9 min read',
    },
    {
      id: 14,
      title: 'Travel Insurance: What You Really Need',
      excerpt: 'Cut through the confusion about travel insurance. What\'s essential, what\'s optional, and how to choose the right policy.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      date: 'Nov 10, 2024',
      category: 'Planning',
      readTime: '8 min read',
    },
    {
      id: 15,
      title: 'Best Hostels in Europe for Solo Travelers',
      excerpt: 'Top-rated hostels across Europe that are perfect for meeting other travelers. Clean, safe, and social.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop',
      date: 'Nov 8, 2024',
      category: 'Tips',
      readTime: '7 min read',
    },
    {
      id: 16,
      title: 'Japanese Food Culture: Beyond Sushi',
      excerpt: 'Explore Japan\'s incredible food culture. From ramen to kaiseki, discover dishes you must try and dining etiquette.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop',
      date: 'Nov 5, 2024',
      category: 'Food',
      readTime: '10 min read',
    },
    {
      id: 17,
      title: 'Hiking the Inca Trail: Complete Preparation Guide',
      excerpt: 'Everything you need to prepare for hiking the Inca Trail to Machu Picchu. Training, permits, packing, and what to expect.',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop',
      date: 'Nov 2, 2024',
      category: 'Adventure',
      readTime: '12 min read',
    },
    {
      id: 18,
      title: 'Working Holiday Visa Guide',
      excerpt: 'How to get a working holiday visa and travel while earning money. Countries, requirements, and job opportunities.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop',
      date: 'Oct 30, 2024',
      category: 'Planning',
      readTime: '9 min read',
    },
    {
      id: 19,
      title: 'New Zealand Road Trip: Ultimate 3-Week Route',
      excerpt: 'The perfect New Zealand road trip itinerary covering both islands. Stunning drives, must-see spots, and camping tips.',
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop',
      date: 'Oct 28, 2024',
      category: 'Destinations',
      readTime: '11 min read',
    },
    {
      id: 20,
      title: 'Sustainable Travel: How to Travel Responsibly',
      excerpt: 'Reduce your environmental impact while traveling. Practical tips for eco-friendly accommodation, transport, and activities.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
      date: 'Oct 25, 2024',
      category: 'Tips',
      readTime: '8 min read',
    },
    {
      id: 21,
      title: 'Scuba Diving for Beginners: Getting Certified',
      excerpt: 'Your guide to getting scuba certified. Best places to learn, what it costs, and amazing dive sites for beginners.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
      date: 'Oct 22, 2024',
      category: 'Adventure',
      readTime: '7 min read',
    },
    {
      id: 22,
      title: 'Morocco Travel Guide: Marrakech to the Sahara',
      excerpt: 'Experience the magic of Morocco. From bustling souks to desert camps, plan your perfect Moroccan adventure.',
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&auto=format&fit=crop',
      date: 'Oct 20, 2024',
      category: 'Destinations',
      readTime: '10 min read',
    },
    {
      id: 23,
      title: 'Travel Apps You Actually Need in 2025',
      excerpt: 'The essential travel apps that will make your trip easier. Navigation, translation, budgeting, and booking tools.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
      date: 'Oct 18, 2024',
      category: 'Tips',
      readTime: '6 min read',
    },
    {
      id: 24,
      title: 'Italian Cuisine by Region: A Food Lover\'s Guide',
      excerpt: 'Discover Italy\'s diverse regional cuisines. What to eat in each region and the best local restaurants.',
      image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&auto=format&fit=crop',
      date: 'Oct 15, 2024',
      category: 'Food',
      readTime: '11 min read',
    },
    {
      id: 25,
      title: 'Northern Lights: Best Places and Times to See Them',
      excerpt: 'Chase the aurora borealis with our guide to the best locations, optimal timing, and photography tips.',
      image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&auto=format&fit=crop',
      date: 'Oct 12, 2024',
      category: 'Destinations',
      readTime: '8 min read',
    },
    {
      id: 26,
      title: 'Overcoming Language Barriers While Traveling',
      excerpt: 'Practical strategies for communicating in countries where you don\'t speak the language. Apps, phrases, and cultural tips.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop',
      date: 'Oct 10, 2024',
      category: 'Tips',
      readTime: '7 min read',
    },
    {
      id: 27,
      title: 'Camping in National Parks: USA Edition',
      excerpt: 'The ultimate guide to camping in America\'s most beautiful national parks. Permits, best campsites, and what to bring.',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop',
      date: 'Oct 8, 2024',
      category: 'Adventure',
      readTime: '10 min read',
    },
    {
      id: 28,
      title: 'Cultural Etiquette: Avoiding Faux Pas Abroad',
      excerpt: 'Navigate cultural differences with confidence. Essential etiquette tips for popular travel destinations around the world.',
      image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&auto=format&fit=crop',
      date: 'Oct 5, 2024',
      category: 'Planning',
      readTime: '9 min read',
    },
  ];

  const categories = ['All', 'Destinations', 'Tips', 'Planning', 'Safety', 'Food', 'Adventure'];

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

  // Handler for newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setSubscribeStatus('error');
      return;
    }

    if (!emailRegex.test(email)) {
      setSubscribeStatus('error');
      return;
    }

    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mlgrooaq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          _subject: 'New Newsletter Subscription - Gubbu',
          message: `New newsletter subscription from: ${email}`,
        }),
      });

      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');

        // Reset status after 5 seconds
        setTimeout(() => {
          setSubscribeStatus('');
        }, 5000);
      } else {
        setSubscribeStatus('error');
      }
    } catch (error) {
      setSubscribeStatus('error');
    }
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

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get the latest travel tips, destination guides, and exclusive deals delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary-600"
              />
              <Button type="submit">Subscribe</Button>
            </div>
            {subscribeStatus === 'success' && (
              <p className="mt-4 text-green-600 font-medium">
                🎉 Thanks for subscribing! Check your email for confirmation.
              </p>
            )}
            {subscribeStatus === 'error' && (
              <p className="mt-4 text-red-600 font-medium">
                ⚠️ Please enter a valid email address.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
