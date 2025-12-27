import { Button } from '../components/Button';
import { Plane, Calendar, Users, ExternalLink, Clock, TrendingDown } from 'lucide-react';
import { getFlightAffiliateLink } from '../config/affiliate';
import { KiwiWidget } from '../components/KiwiWidget';
import { AviasalesWidget } from '../components/AviasalesWidget';
import { AviasalesMapWidget } from '../components/AviasalesMapWidget';

export function Flights() {
  const popularRoutes = [
    {
      id: 1,
      from: 'New York',
      to: 'London',
      fromCode: 'JFK',
      toCode: 'LHR',
      price: 389,
      duration: '7h 30m',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
      savings: 25,
    },
    {
      id: 2,
      from: 'Los Angeles',
      to: 'Tokyo',
      fromCode: 'LAX',
      toCode: 'NRT',
      price: 645,
      duration: '11h 45m',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
      savings: 30,
    },
    {
      id: 3,
      from: 'Paris',
      to: 'Dubai',
      fromCode: 'CDG',
      toCode: 'DXB',
      price: 425,
      duration: '6h 50m',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      savings: 20,
    },
    {
      id: 4,
      from: 'London',
      to: 'Singapore',
      fromCode: 'LHR',
      toCode: 'SIN',
      price: 589,
      duration: '13h 15m',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop',
      savings: 35,
    },
    {
      id: 5,
      from: 'Sydney',
      to: 'Bali',
      fromCode: 'SYD',
      toCode: 'DPS',
      price: 295,
      duration: '6h 20m',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      savings: 15,
    },
    {
      id: 6,
      from: 'Miami',
      to: 'Barcelona',
      fromCode: 'MIA',
      toCode: 'BCN',
      price: 475,
      duration: '9h 40m',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
      savings: 28,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Stunning Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Cheap Flights
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Compare prices from hundreds of airlines and travel agents to find the best deals
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Airlines</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">Save</div>
              <div className="text-blue-100">Up to 40%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">Free</div>
              <div className="text-blue-100">Price Alerts</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <TrendingDown className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lowest Prices</h3>
                <p className="text-blue-100 text-sm">Compare 500+ airlines instantly</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Flexible Dates</h3>
                <p className="text-blue-100 text-sm">Find the cheapest days to fly</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Plane className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Multi-City Options</h3>
                <p className="text-blue-100 text-sm">Complex routes made simple</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#search-flights">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Search Flights Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Kiwi.com Flight Search Widget */}
      <section className="py-12 bg-white" id="search-flights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Multi-City Flights</h2>
            <p className="text-gray-600">Find the best flight combinations with Kiwi.com's unique virtual interlining</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <KiwiWidget />
          </div>
        </div>
      </section>

      {/* Aviasales Flight Search Widget */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Alternative Flight Search</h2>
            <p className="text-gray-600">Compare prices across hundreds of airlines with Aviasales</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <AviasalesWidget />
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Routes</h2>
            <p className="text-gray-600">Best deals on the most traveled routes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <img
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover"
                  />
                  {route.savings > 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      Save {route.savings}%
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{route.fromCode}</div>
                      <div className="text-sm text-gray-600">{route.from}</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="border-t-2 border-dashed border-gray-300 relative">
                        <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-primary-600 bg-white" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{route.toCode}</div>
                      <div className="text-sm text-gray-600">{route.to}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{route.duration}</span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-3xl font-bold text-primary-600">
                        ${route.price}
                      </div>
                    </div>
                    <a
                      href={getFlightAffiliateLink(route.fromCode, route.toCode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="primary" size="sm">
                        Book Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book Flights With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We compare prices from top airlines and travel sites to find you the best deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <TrendingDown className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lowest Prices</h3>
              <p className="text-gray-600">We search hundreds of sites to find you the cheapest flights available</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Dates</h3>
              <p className="text-gray-600">Find the best prices by comparing different dates and times</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Partners</h3>
              <p className="text-gray-600">Book with confidence through our verified airline and travel partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Aviasales Interactive Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Destinations on Map</h2>
            <p className="text-gray-600">Discover flight prices to destinations around the world</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <AviasalesMapWidget />
          </div>
        </div>
      </section>
    </div>
  );
}
