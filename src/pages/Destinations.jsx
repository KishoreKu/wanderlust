import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';

export function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      country: 'Indonesia',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture',
      bestTime: 'Apr - Oct',
      highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Surfing'],
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Paris, France',
      country: 'France',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      description: 'The city of love, art, and exquisite cuisine with iconic landmarks',
      bestTime: 'Apr - Jun, Sep - Oct',
      highlights: ['Eiffel Tower', 'Museums', 'Cuisine', 'Architecture'],
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      country: 'Japan',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
      description: 'Where ancient traditions meet cutting-edge technology and innovation',
      bestTime: 'Mar - May, Sep - Nov',
      highlights: ['Temples', 'Technology', 'Food', 'Cherry Blossoms'],
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Santorini, Greece',
      country: 'Greece',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
      description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters',
      bestTime: 'Apr - Nov',
      highlights: ['Sunsets', 'Beaches', 'Wine', 'Architecture'],
      rating: 4.8,
    },
    {
      id: 5,
      name: 'New York City, USA',
      country: 'United States',
      region: 'Americas',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
      description: 'The city that never sleeps, filled with culture, entertainment, and diversity',
      bestTime: 'Apr - Jun, Sep - Nov',
      highlights: ['Skyline', 'Museums', 'Broadway', 'Food Scene'],
      rating: 4.7,
    },
    {
      id: 6,
      name: 'Dubai, UAE',
      country: 'United Arab Emirates',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      description: 'Luxury shopping, ultramodern architecture, and desert adventures',
      bestTime: 'Nov - Mar',
      highlights: ['Shopping', 'Skyscrapers', 'Desert Safari', 'Luxury'],
      rating: 4.7,
    },
    {
      id: 7,
      name: 'Machu Picchu, Peru',
      country: 'Peru',
      region: 'Americas',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop',
      description: 'Ancient Incan citadel set high in the Andes Mountains',
      bestTime: 'Apr - Oct',
      highlights: ['History', 'Hiking', 'Mountains', 'Culture'],
      rating: 4.9,
    },
    {
      id: 8,
      name: 'Maldives',
      country: 'Maldives',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
      description: 'Tropical paradise with overwater bungalows and pristine beaches',
      bestTime: 'Nov - Apr',
      highlights: ['Beaches', 'Diving', 'Luxury Resorts', 'Marine Life'],
      rating: 5.0,
    },
    {
      id: 9,
      name: 'Rome, Italy',
      country: 'Italy',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
      description: 'The Eternal City with ancient ruins, art, and incredible cuisine',
      bestTime: 'Apr - Jun, Sep - Oct',
      highlights: ['History', 'Art', 'Food', 'Architecture'],
      rating: 4.8,
    },
    {
      id: 10,
      name: 'Barcelona, Spain',
      country: 'Spain',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
      description: 'Vibrant city with stunning architecture, beautiful beaches, and world-class cuisine',
      bestTime: 'May - Sep',
      highlights: ['Gaudi', 'Beaches', 'Food', 'Nightlife'],
      rating: 4.8,
    },
  ];

  const regions = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

  // Filter destinations based on selected region
  const filteredDestinations = selectedRegion === 'All'
    ? destinations
    : destinations.filter(dest => dest.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-xl text-primary-100 mb-8">
            Discover amazing places around the world
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full font-medium shadow-sm transition-colors ${
                  selectedRegion === region
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-600 hover:text-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-64">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-gray-900">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="font-medium">Best Time:</span>
                      <span className="ml-1">{destination.bestTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights.slice(0, 4).map((highlight, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to="/hotels" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Find Hotels
                      </Button>
                    </Link>
                    <Link to="/flights" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Book Flights
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip</h2>
            <p className="text-xl text-gray-600">Everything you need for an unforgettable journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Comprehensive destination guides written by travel experts</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Time to Visit</h3>
              <p className="text-gray-600">Find out when to visit for the best weather and experiences</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Insights</h3>
              <p className="text-gray-600">Get insider tips from locals and experienced travelers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Start planning your next adventure with our travel guides and booking tools
          </p>
          <Link to="/blog">
            <Button size="lg" variant="secondary">
              Read Travel Guides
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
