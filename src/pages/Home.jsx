import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MessageCircle, ArrowRight, Compass, Lightbulb, CheckCircle, Heart, Shield, Sparkles } from 'lucide-react';
import { Snowfall } from '../components/Snowfall';

export function Home() {
  return (
    <div className="min-h-screen">
      <Snowfall density={30} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop)',
            mixBlendMode: 'overlay',
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Navigate the Modern World
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Make better decisions — wherever life takes you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations">
              <Button size="lg" className="w-full sm:w-auto">
                <Compass className="mr-2 h-5 w-5" />
                Explore What You Can Do Next
              </Button>
            </Link>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                const chatButton = document.querySelector('[data-chat-widget-toggle]');
                if (chatButton) chatButton.click();
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to Gubbu 🐾
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1: What Gubbu Helps You Do */}
      <section className="py-20 bg-white">
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

      {/* Section 2: How Gubbu Works */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">How Gubbu Works</h2>
            <p className="text-gray-600">Navigate decisions with clarity — from question to action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-12">
            {/* Step 1 */}
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
              {/* Connector - hidden on mobile */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-0.5 bg-gradient-to-r from-green-300 to-blue-300"></div>
              </div>
            </div>

            {/* Step 2 */}
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
              {/* Connector - hidden on mobile */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
              </div>
            </div>

            {/* Step 3 */}
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

      {/* Section 3: What You Can Explore */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore the World — and the Tools That Shape It
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Travel & Experiences */}
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

            {/* Tech for Modern Life */}
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

            {/* Lifestyle & Sustainability */}
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

            {/* Guides & Ideas */}
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

      {/* Section 4: Why Gubbu Is Different */}
      <section className="py-20 bg-gray-50">
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

      {/* Section 5: Meet Your Guide */}
      <section className="py-20 bg-white">
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

      {/* Section 6: Trust & Transparency */}
      <section className="py-20 bg-primary-50">
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

      {/* Section 7: Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
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
                const chatButton = document.querySelector('[data-chat-widget-toggle]');
                if (chatButton) chatButton.click();
              }}
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
