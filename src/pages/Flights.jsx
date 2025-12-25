import { useState } from 'react';
import { Button } from '../components/Button';
import { Search, Plane, Calendar, Users, ExternalLink, Clock, TrendingDown } from 'lucide-react';
import { buildAffiliateUrl, getFlightAffiliateLink } from '../config/affiliate';
import { KiwiWidget } from '../components/KiwiWidget';
import { AviasalesWidget } from '../components/AviasalesWidget';
import { AviasalesMapWidget } from '../components/AviasalesMapWidget';

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
                  onChange={(e) => setSearchQuery({ ...searchQuery, tripType: e.target.value })}
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
                  onChange={(e) => setSearchQuery({ ...searchQuery, tripType: e.target.value })}
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
                    onChange={(e) => setSearchQuery({ ...searchQuery, from: e.target.value })}
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
                    onChange={(e) => setSearchQuery({ ...searchQuery, to: e.target.value })}
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
                  onChange={(e) => setSearchQuery({ ...searchQuery, departure: e.target.value })}
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
                    onChange={(e) => setSearchQuery({ ...searchQuery, return: e.target.value })}
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
                  onChange={(e) => setSearchQuery({ ...searchQuery, passengers: parseInt(e.target.value) })}
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

      {/* Kiwi.com Flight Search Widget */}
      <section className="py-12 bg-white">
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

      {/* Flight Booking Tips - SEO Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Find Cheap Flights: The Ultimate Guide</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              Finding cheap flights doesn't have to be complicated. With the right strategies and tools, you can save hundreds of dollars on your next trip. Here's everything you need to know about booking affordable flights.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Book Flights for the Best Prices</h3>
            <p className="text-gray-700 mb-4">
              Timing is everything when it comes to finding cheap flights. Here's when you should book:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Domestic Flights:</strong> Book 1-3 months in advance for the best prices</li>
              <li><strong>International Flights:</strong> Book 2-8 months ahead, depending on destination</li>
              <li><strong>Best Day to Book:</strong> Tuesday and Wednesday often have lower prices</li>
              <li><strong>Best Time to Fly:</strong> Mid-week flights (Tuesday-Thursday) are usually cheaper</li>
              <li><strong>Avoid Peak Seasons:</strong> Skip holidays, school breaks, and summer if possible</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Flight Comparison Tools That Actually Work</h3>
            <p className="text-gray-700 mb-4">
              Don't rely on just one search engine. Compare prices across multiple platforms to ensure you're getting the best deal:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Kiwi.com:</strong> Great for multi-city trips and unique route combinations</li>
              <li><strong>Aviasales:</strong> Compares prices from hundreds of airlines and booking sites</li>
              <li><strong>Google Flights:</strong> Excellent calendar view to find the cheapest dates</li>
              <li><strong>Skyscanner:</strong> "Everywhere" search feature for inspiration</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Money-Saving Flight Booking Strategies</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Be Flexible with Your Dates</h4>
            <p className="text-gray-700 mb-4">
              Flying just one day earlier or later can save you $100-300. Use flexible date search tools to compare prices across different days. Mid-week flights are typically 20-30% cheaper than weekend departures.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Consider Nearby Airports</h4>
            <p className="text-gray-700 mb-4">
              Major cities often have multiple airports. For example, flying into Oakland instead of San Francisco, or Stansted instead of Heathrow, can save significant money. Factor in ground transportation costs when comparing.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Book One-Way Tickets Separately</h4>
            <p className="text-gray-700 mb-4">
              Sometimes booking two one-way tickets (even on different airlines) is cheaper than a round-trip ticket. This is especially true for international flights and when mixing budget and traditional carriers.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Use Incognito Mode</h4>
            <p className="text-gray-700 mb-4">
              Airlines and booking sites may track your searches and raise prices. Always search in incognito/private browsing mode to see the true lowest prices.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Set Price Alerts</h4>
            <p className="text-gray-700 mb-4">
              Most flight search engines offer price alerts. Set them up for your desired routes and get notified when prices drop. This is perfect for flexible travelers who can book quickly when deals appear.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Times to Travel by Destination</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Europe:</strong> Cheapest in November-March (except holidays), most expensive June-August</li>
              <li><strong>Asia:</strong> Best prices in shoulder seasons (April-May, September-October)</li>
              <li><strong>Caribbean:</strong> Lowest prices in May-June and September-November (hurricane season)</li>
              <li><strong>South America:</strong> Cheapest during their winter (June-August)</li>
              <li><strong>Australia:</strong> Best deals in their winter (June-August)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hidden Fees to Watch Out For</h3>
            <p className="text-gray-700 mb-4">
              That cheap ticket price might not be so cheap once you add:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Baggage Fees:</strong> Check airline policies - some charge for carry-ons!</li>
              <li><strong>Seat Selection:</strong> Budget airlines charge extra for seat assignments</li>
              <li><strong>Payment Fees:</strong> Credit card processing fees can add $10-30</li>
              <li><strong>Booking Fees:</strong> Third-party sites may charge service fees</li>
              <li><strong>Change/Cancellation Fees:</strong> Read the fine print before booking</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Mistake Fares and Flash Sales</h3>
            <p className="text-gray-700 mb-4">
              Occasionally, airlines make pricing errors or offer flash sales with incredible discounts. Follow these tips to catch them:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Follow airline social media accounts for flash sale announcements</li>
              <li>Subscribe to deal alert newsletters (Scott's Cheap Flights, Secret Flying)</li>
              <li>Be ready to book immediately - these deals disappear fast</li>
              <li>Have your passport and payment info ready</li>
              <li>Be flexible with destinations - mistake fares are often to random locations</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h3>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What day of the week are flights cheapest?</h4>
            <p className="text-gray-700 mb-4">
              Tuesday, Wednesday, and Saturday flights are typically cheapest. Tuesday and Wednesday afternoons are often the best times to book, as airlines release deals early in the week.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How far in advance should I book international flights?</h4>
            <p className="text-gray-700 mb-4">
              For international flights, the sweet spot is 2-8 months in advance. Booking too early (more than 11 months) or too late (less than 3 weeks) usually results in higher prices.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Are budget airlines worth it?</h4>
            <p className="text-gray-700 mb-4">
              Budget airlines can save you money, but factor in all costs. Add up baggage fees, seat selection, food, and transportation to/from secondary airports. Sometimes traditional airlines offer better overall value.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Should I book directly with the airline or through a third party?</h4>
            <p className="text-gray-700 mb-4">
              While third-party sites can sometimes offer lower prices, booking directly with airlines gives you better customer service, easier changes/cancellations, and loyalty program benefits. Compare both options before deciding.
            </p>
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
