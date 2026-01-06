import { useState, useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { MapPin, MessageCircle, Compass, Handshake, Brain, Search } from 'lucide-react';

export function Hotels() {
  const [city, setCity] = useState('');
  const [adults, setAdults] = useState('2');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Comprehensive list of popular cities
  const allCities = [
    { name: 'New York City', country: 'USA' },
    { name: 'Las Vegas', country: 'USA' },
    { name: 'Los Angeles', country: 'USA' },
    { name: 'Miami', country: 'USA' },
    { name: 'Chicago', country: 'USA' },
    { name: 'San Francisco', country: 'USA' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Abu Dhabi', country: 'UAE' },
    { name: 'Marrakech', country: 'Morocco' },
    { name: 'Bangkok', country: 'Thailand' },
    { name: 'Phuket', country: 'Thailand' },
    { name: 'Barcelona', country: 'Spain' },
    { name: 'Madrid', country: 'Spain' },
    { name: 'Paris', country: 'France' },
    { name: 'Nice', country: 'France' },
    { name: 'Istanbul', country: 'Turkey' },
    { name: 'London', country: 'UK' },
    { name: 'Rome', country: 'Italy' },
    { name: 'Venice', country: 'Italy' },
    { name: 'Milan', country: 'Italy' },
    { name: 'Amsterdam', country: 'Netherlands' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Munich', country: 'Germany' },
    { name: 'Vienna', country: 'Austria' },
    { name: 'Prague', country: 'Czech Republic' },
    { name: 'Budapest', country: 'Hungary' },
    { name: 'Lisbon', country: 'Portugal' },
    { name: 'Athens', country: 'Greece' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Osaka', country: 'Japan' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'Hong Kong', country: 'Hong Kong' },
    { name: 'Seoul', country: 'South Korea' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Melbourne', country: 'Australia' },
    { name: 'Toronto', country: 'Canada' },
    { name: 'Vancouver', country: 'Canada' },
    { name: 'Montreal', country: 'Canada' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Cancun', country: 'Mexico' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Lima', country: 'Peru' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Cape Town', country: 'South Africa' },
    { name: 'Nairobi', country: 'Kenya' }
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityChange = (value) => {
    setCity(value);

    if (value.length > 0) {
      const filtered = allCities.filter(destination =>
        destination.name.toLowerCase().includes(value.toLowerCase()) ||
        destination.country.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (destination) => {
    setCity(destination.name);
    setShowSuggestions(false);
  };

  const handleSearch = (cityName = '', countryName = '') => {
    const searchCity = cityName || city;
    const searchCountry = countryName || '';

    if (!searchCity) {
      alert('Please enter a city or destination');
      return;
    }

    const params = new URLSearchParams({
      city: searchCity,
      ...(searchCountry && { country: searchCountry }),
      adults: adults,
      src: cityName ? 'web_hotels_city' : 'web_hotels'
    });

    window.open(`https://api.gubbu.io/go/hotels?${params.toString()}`, '_blank');
  };

  const popularCities = [
    { name: 'New York City', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop' },
    { name: 'Las Vegas', country: 'USA', image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&auto=format&fit=crop' },
    { name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop' },
    { name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&auto=format&fit=crop' },
    { name: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&auto=format&fit=crop' },
    { name: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop' },
    { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop' },
    { name: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&auto=format&fit=crop' }
  ];

  const faqs = [
    {
      q: 'Can I book directly on Gubbu?',
      a: 'Gubbu helps you decide. Booking happens securely on partner sites.'
    },
    {
      q: "Why don't you ask for dates here?",
      a: 'Dates and pricing change quickly — we let partners handle that in real time.'
    },
    {
      q: 'Will my booking be tracked?',
      a: 'Yes. When you continue via Gubbu, your booking is attributed to us.'
    },
    {
      q: 'Why do I sometimes see a previous search?',
      a: 'Some partners restore recent searches. You can always update the fields before searching.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find the right place to stay — without the overwhelm
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Search hotels by city, compare options, and book via trusted partners — all guided by Gubbu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="#search">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Search Hotels
              </Button>
            </a>
          </div>

          <button className="text-primary-100 hover:text-white transition-colors flex items-center mx-auto">
            <MessageCircle className="h-5 w-5 mr-2" />
            💬 Need help choosing a city or area? Talk to Gubbu
          </button>
        </div>
      </section>

      {/* Search Card */}
      <section id="search" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Where do you want to stay?</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City / Destination <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    onFocus={() => city.length > 0 && setShowSuggestions(true)}
                    placeholder="Edison, NJ · Dubai · Barcelona"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />

                  {/* Autocomplete Dropdown */}
                  {showSuggestions && filteredCities.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      {filteredCities.map((destination, index) => (
                        <button
                          key={index}
                          onClick={() => selectCity(destination)}
                          className="w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-b-0"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{destination.name}</div>
                            <div className="text-sm text-gray-500">{destination.country}</div>
                          </div>
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adults (optional)
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5+ Adults</option>
                </select>
              </div>

              <button
                onClick={() => handleSearch()}
                className="w-full bg-primary-600 text-white py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                See Available Hotels
              </button>

              <p className="text-sm text-gray-500 text-center">
                You'll select dates and room options on our booking partner's site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Quick shortcuts to find hotels in top cities
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularCities.map((destination, index) => (
              <button
                key={index}
                onClick={() => handleSearch(destination.name, destination.country)}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.country}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How Gubbu Helps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How Gubbu Helps You Choose</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Compass className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🧭 Clarity before booking</h3>
              <p className="text-gray-600">We help you decide where to stay before you compare prices.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Handshake className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🤝 Book via trusted partners</h3>
              <p className="text-gray-600">We don't sell rooms — we guide you to reliable booking platforms.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🧠 AI-assisted recommendations</h3>
              <p className="text-gray-600">Ask Gubbu about neighborhoods, safety, or trip style.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">🔍 No hidden bias</h3>
              <p className="text-gray-600">No fake urgency. No "last room" pressure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How Hotel Booking Works on Gubbu</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-2">Search by city on Gubbu</h3>
              <p className="text-gray-600 text-sm">Enter your destination above</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-2">Choose what fits your trip</h3>
              <p className="text-gray-600 text-sm">Browse options on partner site</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-2">Continue to our booking partner</h3>
              <p className="text-gray-600 text-sm">Secure, trusted platforms</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-bold mb-2">Select dates & complete booking</h3>
              <p className="text-gray-600 text-sm">Real-time pricing and availability</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center mt-8">
            Prices, availability, and booking are handled by our partners.
          </p>
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
          <h2 className="text-4xl font-bold mb-6">Ready to find the right place to stay?</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="#search">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                Search Hotels Now
              </Button>
            </a>
          </div>

          <button className="text-gray-300 hover:text-white transition-colors flex items-center mx-auto">
            <MessageCircle className="h-5 w-5 mr-2" />
            💬 Not sure which city or area? Ask Gubbu
          </button>
        </div>
      </section>

      {/* Footer Trust Line */}
      <section className="py-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Gubbu is a Decision-as-a-Service (DaaS) platform for travel and modern lifestyle planning.
          </p>
        </div>
      </section>
    </div>
  );
}
