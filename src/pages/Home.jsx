import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Compass, Lightbulb, CheckCircle, Heart, Shield, Sparkles, MessageCircle, Mic, X, Sun, Moon } from 'lucide-react';
import { Button } from '../components/Button';
import { Snowfall } from '../components/Snowfall';
import { ChatInterface } from '../components/ChatInterface';
import { getAllBlogPosts } from '../utils/blogLoader';

export function Home() {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Chat Modal State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('gubbu-theme') === 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('gubbu-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Content search function
  const performContentSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search blog posts
    const blogPosts = getAllBlogPosts();
    blogPosts.forEach(post => {
      const score =
        (post.title.toLowerCase().includes(lowerQuery) ? 3 : 0) +
        (post.excerpt.toLowerCase().includes(lowerQuery) ? 2 : 0) +
        (post.category.toLowerCase().includes(lowerQuery) ? 1 : 0) +
        (post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ? 1 : 0);

      if (score > 0) {
        results.push({
          type: 'blog',
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          link: `/blog/${post.id}`,
          image: post.image,
          score
        });
      }
    });

    // Search static pages
    const staticPages = [
      { title: 'Destinations', excerpt: 'Explore amazing travel destinations worldwide', category: 'Travel', link: '/destinations' },
      { title: 'Hotels', excerpt: 'Find and compare the best hotels for your trip', category: 'Booking', link: '/hotels' },
      { title: 'Flights', excerpt: 'Search and book flights to your destination', category: 'Booking', link: '/flights' },
      { title: 'Work From Anywhere', excerpt: 'Remote work guides and digital nomad resources', category: 'Lifestyle', link: '/work-from-anywhere' },
      { title: 'Lifestyle Picks', excerpt: 'Curated lifestyle recommendations for modern travelers', category: 'Lifestyle', link: '/lifestyle-picks' },
      { title: 'About Gubbu', excerpt: 'Learn about our mission and approach to travel planning', category: 'About', link: '/about' },
    ];

    staticPages.forEach(page => {
      const score =
        (page.title.toLowerCase().includes(lowerQuery) ? 3 : 0) +
        (page.excerpt.toLowerCase().includes(lowerQuery) ? 2 : 0) +
        (page.category.toLowerCase().includes(lowerQuery) ? 1 : 0);

      if (score > 0) {
        results.push({ ...page, type: 'page', score });
      }
    });

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    setSearchResults(results.slice(0, 6)); // Limit to 6 results
  };

  const handleSearchInput = (query) => {
    setSearchQuery(query);
    performContentSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Open chat modal with the query
    setInitialChatQuery(searchQuery);
    setIsChatOpen(true);
    setSearchQuery(''); // Optional: clear input after submitting
    setSearchResults([]);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      performContentSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-primary-600 to-primary-800 text-white'
        }`}
    >
      <Snowfall density={isDark ? 50 : 30} />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDark
          ? 'bg-[radial-gradient(circle_at_top,rgba(120,130,180,0.15),transparent_60%)]'
          : 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.05),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.05),transparent_50%)]'
          }`}
      />
      {!isDark && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}

      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className={`fixed top-24 right-6 z-40 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none ${isDark
          ? 'bg-gray-800 text-yellow-400 border border-gray-700'
          : 'bg-white text-orange-500 border border-gray-200'
          }`}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="w-5 h-5 fill-current" />
        ) : (
          <Sun className="w-5 h-5 fill-current" />
        )}
      </button>

      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">

        <div className="w-full max-w-3xl text-center relative">
          <div className="mb-8">
            <h1
              className="text-6xl md:text-7xl tracking-wide text-white"
              style={{ fontFamily: 'Genos, sans-serif', fontWeight: 200 }}
            >
              GUBBU
            </h1>
          </div>

          {/* Universal Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative z-50"
          >
            <div
              className={`flex items-center gap-3 rounded-full px-5 py-3 shadow-lg focus-within:shadow-xl transition-all duration-300 ${isDark
                ? 'bg-white/10 border border-white/10 focus-within:border-white/20 backdrop-blur-md'
                : 'bg-white border border-slate-200 focus-within:border-slate-300'
                }`}
            >
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 bg-transparent text-lg focus:outline-none ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                autoComplete="off"
                ref={searchInputRef}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className={`p-1 rounded-full hover:bg-gray-200/20 transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${isListening
                  ? 'bg-red-500 border-red-500 text-white animate-pulse'
                  : isDark
                    ? 'border-white/15 text-gray-200 hover:border-white/40 hover:text-white'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900'
                  }`}
                aria-label="Voice input"
                title="Voice input"
              >
                <Mic className={`h-4 w-4 ${isListening ? 'animate-bounce' : ''}`} />
              </button>
            </div>
          </form>

          {/* Floating Search Results - Absolute Positioned */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-4 z-40 animate-fadeIn text-left">
              <div className={`rounded-xl p-4 max-h-[60vh] overflow-y-auto ${isDark ? 'bg-gray-900/95 border border-white/10 backdrop-blur-md' : 'bg-white/95 border border-gray-200 shadow-xl backdrop-blur-md'}`}>
                <h3 className={`text-sm font-semibold mb-3 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Suggestions
                </h3>
                <div className="space-y-2">
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.link}-${index}`}
                      to={result.link}
                      className={`block p-3 rounded-lg transition-all duration-200 ${isDark
                        ? 'hover:bg-white/10'
                        : 'hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {result.image && (
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {result.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
                              {result.category}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className={`h-4 w-4 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100/10 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className={`text-sm font-medium ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
                  >
                    Ask AI: "{searchQuery}"
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Tagline - Preserves layout space */}
          <div className={`mt-8 transition-opacity duration-300 relative z-0 ${!isFocused && searchQuery === '' ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm md:text-base tracking-[0.2em] text-gray-200 uppercase font-light">
              Don't Just Search. Decide.
            </p>
          </div>

          {/* Quick Suggestions (Only when focused and empty) */}
          {isFocused && searchQuery === '' && (
            <div className="absolute top-full left-0 right-0 mt-4 animate-fadeIn z-30">
               <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    'Best time to visit Japan',
                    'Weekend trips from NYC',
                    'Work-from-anywhere tips'
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur
                        setSearchQuery(suggestion);
                        setInitialChatQuery(suggestion);
                        setIsChatOpen(true);
                      }}
                      className={`px-4 py-2 rounded-full text-sm backdrop-blur-md transition ${isDark
                        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        : 'bg-white/80 text-gray-800 hover:bg-white border border-white/40 shadow-sm'
                        }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
            </div>
          )}

        </div>
      </section >

      <section className="py-20 bg-white text-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Make Better Decisions — Wherever Life Takes You
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl mb-4">
              The modern world moves fast. Travel, technology, tools, and lifestyle choices are more connected than ever — and more confusing than they should be.
            </p>
            <p className="text-xl mb-4">
              Gubbu helps you cut through the noise by guiding you toward options that fit how you live, move, and decide.
            </p>
            <p className="text-xl font-semibold text-gray-900">
              No pressure. No overwhelm. Just clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-50 text-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">How Gubbu Works</h2>
            <p className="text-gray-600">Navigate decisions with clarity — from question to action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-12">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <span className="text-4xl">💡</span>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
                    Step 1
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Ask Gubbu</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tell Gubbu what you're trying to decide — a trip, an experience, a tool, or what to do next.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-300 to-blue-300"></div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                  <Lightbulb className="h-10 w-10 text-blue-600" />
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
                    Step 2
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Explore Your Options</h3>
                <p className="text-gray-700 leading-relaxed">
                  Gubbu brings together relevant guides, ideas, and experiences — shaped around how you travel, live, and decide.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center h-full">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-purple-600" />
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-3">
                    Step 3
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Move Forward with Clarity</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you're ready, explore trusted options or simply use the guidance to make your own choice.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900">
              Gubbu guides first. You decide always.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore the World — and the Tools That Shape It
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Travel & Experiences</h3>
              <p className="text-gray-700 mb-4">
                Trips, events, activities, and destinations
              </p>
              <Link to="/destinations" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Tech for Modern Life</h3>
              <p className="text-gray-700 mb-4">
                Tools, apps, and platforms that support how you travel and work
              </p>
              <Link to="/blog" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Lifestyle & Sustainability</h3>
              <p className="text-gray-700 mb-4">
                Smarter choices for health, balance, and impact
              </p>
              <Link to="/blog" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Guides & Ideas</h3>
              <p className="text-gray-700 mb-4">
                Curated insights to help you plan, compare, and decide
              </p>
              <Link to="/blog" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50 text-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                ✨ NEW TODAY
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Destination Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fresh guides to help you discover amazing experiences in the world's most exciting cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/blog/barcelona-activities-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop"
                    alt="Barcelona"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🇪🇸 Best of Barcelona
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $25 • Sagrada Familia, Montserrat & Costa Brava
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/blog/las-vegas-activities-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&auto=format&fit=crop"
                    alt="Las Vegas"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🎰 Best Las Vegas Activities
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $30 • Grand Canyon, Cirque du Soleil & Desert Adventures
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/blog/rome-colosseum-tours-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop"
                    alt="Rome Colosseum"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🏛️ Rome Colosseum Tours
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $20 • Skip-the-line, underground & arena floor access
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/blog/budapest-activities-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop"
                    alt="Budapest"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🇭🇺 Budapest Activities
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $11 • Ruin bars, river cruises & thermal spas
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/blog/marrakech-activities-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&auto=format&fit=crop"
                    alt="Marrakech"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🇲🇦 Marrakech Adventures
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $15 • Desert safaris, Atlas Mountains & hot air balloons
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/blog/dubai-desert-safari-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&auto=format&fit=crop"
                    alt="Dubai"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🏜️ Dubai Desert Safaris
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $27 • Dune bashing, camel rides & BBQ dinners
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/blog/istanbul-activities-guide" className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop"
                    alt="Istanbul"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🕌 Istanbul Experiences
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    From $8 • Bosphorus cruises, palaces & Turkish baths
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/blog/getyourguide-tours-activities" className="group md:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                    alt="GetYourGuide"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      NEW
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    🎯 GetYourGuide Guide
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    How to find & book the best tours worldwide
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm">
                    Explore Guide <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link to="/destinations">
              <Button size="lg" className="group">
                View All Destination Guides
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 text-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why People Choose Gubbu</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Compass className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg text-gray-900 font-semibold">We focus on decisions, not just destinations</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg text-gray-900 font-semibold">We guide — we don't push</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg text-gray-900 font-semibold">We respect your time, budget, and preferences</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg text-gray-900 font-semibold">We design for people, not algorithms</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Technology powers the platform, but the goal is always human:<br />
              <span className="font-semibold text-gray-900">to make choices feel easier and more thoughtful.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Meet Gubbu
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl mb-4">
              Gubbu is your friendly guide through modern decisions.
            </p>
            <p className="text-xl mb-4">
              Curious. Calm. Always ready to explore.
            </p>
            <p className="text-xl mb-4">
              Inspired by a real-life bond, Gubbu represents how guidance should feel — approachable, trustworthy, and on your side.
            </p>
            <p className="text-xl font-semibold text-gray-900">
              When things feel complex, Gubbu helps you pause, explore, and move forward.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-50 text-gray-900 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary-600" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built on Trust</h2>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <p className="text-xl text-gray-700 mb-4">
              Gubbu is free to use.
            </p>
            <p className="text-xl text-gray-700 mb-4">
              Some recommendations may include links to trusted partners. If you choose to explore through those links, it helps support Gubbu — at no extra cost to you.
            </p>
            <p className="text-xl font-semibold text-gray-900">
              Clarity always comes first.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Navigate What's Next?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Compass className="mr-2 h-5 w-5" />
                Explore What You Can Do Next
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={() => {
                setIsChatOpen(true);
                // Wait for modal transition then focus? ChatInterface handles auto focus usually.
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Gubbu
            </Button>
          </div>
        </div>
      </section>

      {/* Full Chat Modal */}
      {isChatOpen && (
        <ChatInterface
          initialQuery={initialChatQuery}
          autoListen={false}
          onClose={() => {
            setIsChatOpen(false);
            setInitialChatQuery('');
          }}
        />
      )}
    </div >
  );
}