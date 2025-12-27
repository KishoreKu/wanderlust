import { useState } from 'react';
import { Button } from '../components/Button';
import { Search, MapPin, Star, Wifi, Coffee, Dumbbell, ExternalLink } from 'lucide-react';
import { buildAffiliateUrl, getHotelAffiliateLink } from '../config/affiliate';

export function Hotels() {
  const [searchQuery, setSearchQuery] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });

  const featuredHotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
      rating: 4.8,
      reviews: 1250,
      price: 189,
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Pool'],
      affiliateLink: 'https://booking.com',
    },
    {
      id: 2,
      name: 'Beachfront Resort & Spa',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
      rating: 4.9,
      reviews: 2100,
      price: 145,
      amenities: ['WiFi', 'Spa', 'Beach Access', 'Pool'],
      city: 'Bali',
    },
    {
      id: 3,
      name: 'City Center Boutique Hotel',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
      rating: 4.7,
      reviews: 890,
      price: 210,
      amenities: ['WiFi', 'Restaurant', 'Bar', 'Gym'],
      city: 'Tokyo',
    },
    {
      id: 4,
      name: 'Mountain View Lodge',
      location: 'Swiss Alps, Switzerland',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
      rating: 4.9,
      reviews: 1560,
      price: 275,
      amenities: ['WiFi', 'Spa', 'Restaurant', 'Ski Access'],
      city: 'Interlaken',
    },
    {
      id: 5,
      name: 'Historic Downtown Inn',
      location: 'Rome, Italy',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop',
      rating: 4.6,
      reviews: 720,
      price: 165,
      amenities: ['WiFi', 'Breakfast', 'Terrace', 'Bar'],
      city: 'Rome',
    },
    {
      id: 6,
      name: 'Luxury Oceanfront Hotel',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
      rating: 5.0,
      reviews: 3200,
      price: 450,
      amenities: ['WiFi', 'Private Beach', 'Spa', 'Water Sports'],
      city: 'Male',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Build Travelpayouts affiliate URL with search parameters
    const affiliateUrl = buildAffiliateUrl('hotel', {
      destination: searchQuery.destination,
      checkIn: searchQuery.checkIn,
      checkOut: searchQuery.checkOut,
      adults: searchQuery.guests,
    });
    // Open in new tab
    window.open(affiliateUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-center">Find Your Perfect Hotel</h1>
          <p className="text-xl text-primary-100 mb-8 text-center">
            Compare prices and book the best hotels worldwide
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-xl p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchQuery.destination}
                    onChange={(e) => setSearchQuery({ ...searchQuery, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  value={searchQuery.checkIn}
                  onChange={(e) => setSearchQuery({ ...searchQuery, checkIn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  value={searchQuery.checkOut}
                  onChange={(e) => setSearchQuery({ ...searchQuery, checkOut: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <select
                  value={searchQuery.guests}
                  onChange={(e) => setSearchQuery({ ...searchQuery, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Hotels</h2>
            <p className="text-gray-600">Hand-picked accommodations with the best deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold text-gray-900">{hotel.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600">{hotel.reviews} reviews</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-3xl font-bold text-primary-600">
                        ${hotel.price}
                        <span className="text-sm text-gray-600 font-normal">/night</span>
                      </div>
                    </div>
                    <a
                      href={getHotelAffiliateLink(hotel.name, hotel.city)}
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
            <h2 className="text-3xl font-bold mb-4">Why Book Hotels Through Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with the world's leading hotel booking platforms to bring you the best deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">Find the lowest prices on hotels worldwide with our trusted partners</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Wifi className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
              <p className="text-gray-600">Read authentic reviews from real travelers to make informed decisions</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Coffee className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help anytime with our partner's round-the-clock customer service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
