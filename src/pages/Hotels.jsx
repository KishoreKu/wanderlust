import { Button } from '../components/Button';
import { MapPin, Star, Wifi, ExternalLink } from 'lucide-react';
import { getHotelAffiliateLink } from '../config/affiliate';

export function Hotels() {
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
      city: 'Paris',
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Stunning Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Perfect Hotel
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover hand-picked hotels worldwide with exclusive deals and verified reviews
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-primary-100">Hotels Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">Best</div>
              <div className="text-primary-100">Price Guarantee</div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
                <p className="text-primary-100 text-sm">Real reviews from real travelers</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Prime Locations</h3>
                <p className="text-primary-100 text-sm">Hotels in the best neighborhoods</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Wifi className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Top Amenities</h3>
                <p className="text-primary-100 text-sm">WiFi, pools, gyms & more</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#featured-hotels">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Browse Featured Hotels
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16" id="featured-hotels">
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

      {/* Why Book Section */}
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
                <MapPin className="h-8 w-8 text-primary-600" />
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
