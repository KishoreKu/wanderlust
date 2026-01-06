import { Button } from '../components/Button';
import { Plane, MessageCircle, Shield, Globe, Smartphone, Search } from 'lucide-react';

export function Flights() {
  const handleSearch = () => {
    window.open('https://api.gubbu.io/go/flights?src=web_flights', '_blank');
  };

  const popularRoutes = [
    { from: 'New York', to: 'London', route: 'JFK-LHR', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop' },
    { from: 'Los Angeles', to: 'Tokyo', route: 'LAX-NRT', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop' },
    { from: 'Newark', to: 'Bangkok', route: 'EWR-BKK', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop' },
    { from: 'Paris', to: 'Barcelona', route: 'CDG-BCN', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop' },
    { from: 'Chicago', to: 'London', route: 'ORD-LHR', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop' },
    { from: 'Miami', to: 'Madrid', route: 'MIA-MAD', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&auto=format&fit=crop' }
  ];

  const faqs = [
    {
      q: 'Do I book flights directly on Gubbu?',
      a: 'No. You\'ll search on Gubbu and complete your booking securely on our trusted partner\'s website.'
    },
    {
      q: 'Are flight prices higher on Gubbu?',
      a: 'No. Prices are the same — or sometimes better. Gubbu never adds booking fees.'
    },
    {
      q: 'Can I use Gubbu to book international flights?',
      a: 'Yes. Gubbu supports both domestic and international flight searches worldwide.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'No account required. Just search, compare, and book.'
    },
    {
      q: 'Is Gubbu free to use?',
      a: 'Yes. Using Gubbu is completely free for travelers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ✈️ Find and Book Cheap Flights Worldwide
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Compare flight prices from trusted airlines and booking partners — no hidden fees, no extra cost.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" onClick={handleSearch} className="bg-white text-primary-600 hover:bg-gray-100">
              🔵 Search Flights Now
            </Button>
          </div>

          <p className="text-sm text-primary-100">
            You'll complete your booking securely on our partner's site.
          </p>
        </div>
      </section>

      {/* Why Book with Gubbu */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book Flights with Gubbu?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the right flight shouldn't be complicated. Gubbu helps you compare flight prices across multiple airlines and booking partners in one place — so you can focus on planning your trip, not hunting for deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">✔ No extra booking fees</h3>
              <p className="text-gray-600 text-sm">Same price as booking direct</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">✔ Global flight coverage</h3>
              <p className="text-gray-600 text-sm">Domestic and international routes</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">✔ Secure checkout</h3>
              <p className="text-gray-600 text-sm">With trusted partners</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">✔ Works everywhere</h3>
              <p className="text-gray-600 text-sm">Desktop and mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Gubbu Flights Works</h2>
            <p className="text-gray-600">✈️ Simple. Fast. Transparent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Search your route</h3>
              <p className="text-gray-600 text-sm">Tell us where you're flying from and where you're headed.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Compare prices</h3>
              <p className="text-gray-600 text-sm">We show you flight options from airlines and trusted booking partners.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Book securely</h3>
              <p className="text-gray-600 text-sm">You'll complete your booking on our partner's site — at the same price you see here.</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center mt-8">
            Gubbu earns a commission only if you book. This never affects the price you pay.
          </p>
        </div>
      </section>

      {/* Popular Flight Searches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Flight Searches</h2>
          <p className="text-gray-600 text-center mb-12">
            Explore flights for popular routes and destinations
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => window.open('https://api.gubbu.io/go/flights?src=web_flights_popular', '_blank')}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">{route.from}</span>
                      <Plane className="h-5 w-5" />
                      <span className="font-bold text-lg">{route.to}</span>
                    </div>
                    <p className="text-sm text-gray-200">{route.route}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => window.open('https://api.gubbu.io/go/flights?src=web_flights_popular', '_blank')}>
              🔵 Search Flights
            </Button>
          </div>
        </div>
      </section>

      {/* Book with Confidence */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Book Flights with Confidence</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🔐 Secure bookings</h3>
              <p className="text-gray-600">All bookings are completed on verified partner platforms.</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🌍 Worldwide coverage</h3>
              <p className="text-gray-600">Domestic and international routes across major and regional airlines.</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">📱 Mobile-friendly</h3>
              <p className="text-gray-600">Search and book flights easily on your phone or tablet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Flight?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're planning a quick weekend getaway or a long international trip, Gubbu helps you find the best flight options in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" onClick={() => window.open('https://api.gubbu.io/go/flights?src=web_flights_cta', '_blank')} className="bg-primary-600 hover:bg-primary-700">
              🔵 Search Flights Now
            </Button>
          </div>

          <p className="text-sm text-gray-400">
            You'll be redirected to our booking partner to complete your reservation.
          </p>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <section className="py-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Prices and availability are provided by our booking partners and may change. Gubbu does not sell flights directly.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Gubbu is a Decision-as-a-Service (DaaS) platform for travel and modern lifestyle planning.
          </p>
        </div>
      </section>
    </div>
  );
}
