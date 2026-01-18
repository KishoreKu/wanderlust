import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Compass, Lightbulb, CheckCircle, Heart, Shield, Sparkles, MessageCircle, Mic } from 'lucide-react';
import { Button } from '../components/Button';
import { ChatInterface } from '../components/ChatInterface';
import { Snowfall } from '../components/Snowfall';

export function Home() {
  const [showChat, setShowChat] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [autoListen, setAutoListen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('gubbu-theme') !== 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('gubbu-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleSearchSubmit = (query) => {
    setChatQuery(query);
    setAutoListen(false);
    setShowChat(true);
  };

  const openChat = () => {
    setShowChat(true);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100 text-gray-900'
      }`}
    >
      <Snowfall density={isDark ? 60 : 40} />
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.28),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.3),transparent_55%)]'
        }`}
      />
      {!isDark && <div className="absolute inset-0 bg-black/10 pointer-events-none" />}

      <button
        type="button"
        onClick={() => setIsDark((prev) => !prev)}
        className={`fixed top-20 right-6 z-40 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
          isDark
            ? 'border-white/20 bg-white/10 text-white hover:border-white/40'
            : 'border-gray-300 bg-white/80 text-gray-800 hover:border-gray-400'
        }`}
        aria-label="Toggle theme"
      >
        <span>{isDark ? 'Dark' : 'Light'}</span>
        <span
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
            isDark ? 'bg-white/20' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition ${
              isDark ? 'translate-x-5 bg-white' : 'translate-x-1 bg-gray-700'
            }`}
          />
        </span>
      </button>

      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">

        <div className="w-full max-w-3xl text-center">
          <div className="mb-10">
            <h1
              className={`text-6xl md:text-7xl tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ fontFamily: 'Genos, sans-serif', fontWeight: 200 }}
            >
              GUBBU
            </h1>
            <p className={`mt-3 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Clear decisions for travel, life, and everything in between.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector('input');
              if (input && input.value.trim()) {
                handleSearchSubmit(input.value.trim());
                input.value = '';
              }
            }}
            className="relative"
          >
            <div
              className={`flex items-center gap-3 rounded-full px-5 py-3 shadow-sm focus-within:shadow-md transition ${
                isDark
                  ? 'bg-white/10 border border-white/15 focus-within:border-white/30'
                  : 'bg-gray-100 border border-gray-300 focus-within:border-primary-500'
              }`}
            >
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Ask Gubbu anything..."
                className={`flex-1 bg-transparent text-lg focus:outline-none ${
                  isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => {
                  setAutoListen(true);
                  setShowChat(true);
                }}
                className={`hidden sm:inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? 'border-white/15 text-gray-200 hover:border-white/40 hover:text-white'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}
                aria-label="Open voice input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold transition ${
                  isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
                aria-label="AI mode"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/destinations"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? 'border-white/15 bg-white/5 text-gray-200 hover:border-white/40 hover:text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Destinations
            </Link>
            <Link
              to="/blog"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? 'border-white/15 bg-white/5 text-gray-200 hover:border-white/40 hover:text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Guides & Blogs
            </Link>
            <Link
              to="/lifestyle-picks"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? 'border-white/15 bg-white/5 text-gray-200 hover:border-white/40 hover:text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Lifestyle Picks
            </Link>
            <Link
              to="/work-from-anywhere"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? 'border-white/15 bg-white/5 text-gray-200 hover:border-white/40 hover:text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Work From Anywhere
            </Link>
            <Link
              to="/deals"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? 'border-white/15 bg-white/5 text-gray-200 hover:border-white/40 hover:text-white'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              Deals
            </Link>
          </div>

          <p className={`mt-10 text-xs uppercase tracking-[0.3em] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Decide first. Book later.
          </p>
        </div>
      </section>

      {showChat && (
        <ChatInterface
          initialQuery={chatQuery}
          autoListen={autoListen}
          onClose={() => {
            setShowChat(false);
            setChatQuery('');
            setAutoListen(false);
          }}
        />
      )}

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
                  <span className="text-4xl">🐾</span>
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
            <Link to="/blog">
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
            Meet Gubbu 🐾
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
              onClick={openChat}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Gubbu 🐾
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
