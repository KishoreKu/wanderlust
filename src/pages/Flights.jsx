import { useState } from 'react';
import { Button } from '../components/Button';
import { Search, Plane, Calendar, Users, ExternalLink, Clock, TrendingDown } from 'lucide-react';
import { buildAffiliateUrl, getFlightAffiliateLink } from '../config/affiliate';

export function Flights() {
  const [searchQuery, setSearchQuery] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'roundtrip',
  });

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

  const handleSearch = (e) => {
    e.preventDefault();
    // Build Travelpayouts affiliate URL with search parameters
    const affiliateUrl = buildAffiliateUrl('flight', {
      origin: searchQuery.from,
      destination: searchQuery.to,
      departDate: searchQuery.departure,
      returnDate: searchQuery.return,
    });
    // Open in new tab
    window.open(affiliateUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-center">Find Cheap Flights</h1>
          <p className="text-xl text-primary-100 mb-8 text-center">
            Compare prices from hundreds of airlines and travel agents
          </p>
          
          <form onSubmit={handleSearch} className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="flex gap-4 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={searchQuery.tripType === 'roundtrip'}
                  onChange={(e) => setSearchQuery({...searchQuery, tripType: e.target.value})}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 font-medium">Round Trip</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={searchQuery.tripType === 'oneway'}
                  onChange={(e) => setSearchQuery({...searchQuery, tripType: e.target.value})}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 font-medium">One Way</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure city"
                    value={searchQuery.from}
                    onChange={(e) => setSearchQuery({...searchQuery, from: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
                  <input
                    type="text"
                    placeholder="Arrival city"
                    value={searchQuery.to}
                    onChange={(e) => setSearchQuery({...searchQuery, to: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure
                </label>
                <input
                  type="date"
                  value={searchQuery.departure}
                  onChange={(e) => setSearchQuery({...searchQuery, departure: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>
              
              {searchQuery.tripType === 'roundtrip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return
                  </label>
                  <input
                    type="date"
                    value={searchQuery.return}
                    onChange={(e) => setSearchQuery({...searchQuery, return: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <select
                  value={searchQuery.passengers}
                  onChange={(e) => setSearchQuery({...searchQuery, passengers: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Search Flights
              </Button>
            </div>
          </form>
        </div>
      </section>

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
    </div>
  );
}
