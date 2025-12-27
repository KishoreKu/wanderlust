import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MapPin, Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { GetYourGuideSection } from '../components/GetYourGuideWidget';

export function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const navigate = useNavigate();

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
    {
      id: 11,
      name: 'Cape Town, South Africa',
      country: 'South Africa',
      region: 'Africa',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&auto=format&fit=crop',
      description: 'Stunning natural beauty with Table Mountain, beaches, and vibrant culture',
      bestTime: 'Nov - Mar',
      highlights: ['Table Mountain', 'Beaches', 'Wine', 'Wildlife'],
      rating: 4.8,
    },
    {
      id: 12,
      name: 'Sydney, Australia',
      country: 'Australia',
      region: 'Oceania',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop',
      description: 'Iconic harbor city with world-famous opera house and beautiful beaches',
      bestTime: 'Sep - Nov, Mar - May',
      highlights: ['Opera House', 'Beaches', 'Harbor', 'Surfing'],
      rating: 4.7,
    },
    {
      id: 13,
      name: 'Iceland',
      country: 'Iceland',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&auto=format&fit=crop',
      description: 'Land of fire and ice with glaciers, volcanoes, and northern lights',
      bestTime: 'Jun - Aug (summer), Sep - Mar (northern lights)',
      highlights: ['Northern Lights', 'Glaciers', 'Waterfalls', 'Hot Springs'],
      rating: 4.9,
    },
    {
      id: 14,
      name: 'Bangkok, Thailand',
      country: 'Thailand',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&auto=format&fit=crop',
      description: 'Bustling metropolis with ornate temples, street food, and vibrant nightlife',
      bestTime: 'Nov - Feb',
      highlights: ['Temples', 'Street Food', 'Markets', 'Nightlife'],
      rating: 4.7,
    },
    {
      id: 15,
      name: 'Queenstown, New Zealand',
      country: 'New Zealand',
      region: 'Oceania',
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop',
      description: 'Adventure capital with stunning alpine scenery and outdoor activities',
      bestTime: 'Dec - Feb (summer), Jun - Aug (skiing)',
      highlights: ['Adventure Sports', 'Mountains', 'Lakes', 'Wine'],
      rating: 4.9,
    },
    {
      id: 16,
      name: 'Marrakech, Morocco',
      country: 'Morocco',
      region: 'Africa',
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&auto=format&fit=crop',
      description: 'Exotic city with colorful souks, palaces, and gateway to the Sahara',
      bestTime: 'Mar - May, Sep - Nov',
      highlights: ['Souks', 'Palaces', 'Desert', 'Culture'],
      rating: 4.7,
    },
    {
      id: 17,
      name: 'Rio de Janeiro, Brazil',
      country: 'Brazil',
      region: 'Americas',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&auto=format&fit=crop',
      description: 'Vibrant beach city with Christ the Redeemer, carnival, and samba',
      bestTime: 'Dec - Mar',
      highlights: ['Beaches', 'Christ Statue', 'Carnival', 'Sugarloaf'],
      rating: 4.6,
    },
    {
      id: 18,
      name: 'Amsterdam, Netherlands',
      country: 'Netherlands',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop',
      description: 'Charming canal city with museums, cycling culture, and liberal atmosphere',
      bestTime: 'Apr - May, Sep - Nov',
      highlights: ['Canals', 'Museums', 'Cycling', 'Tulips'],
      rating: 4.7,
    },
    {
      id: 19,
      name: 'Singapore',
      country: 'Singapore',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop',
      description: 'Modern city-state with futuristic architecture, gardens, and diverse cuisine',
      bestTime: 'Feb - Apr',
      highlights: ['Gardens', 'Food', 'Shopping', 'Architecture'],
      rating: 4.7,
    },
    {
      id: 20,
      name: 'Cairo, Egypt',
      country: 'Egypt',
      region: 'Africa',
      image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&auto=format&fit=crop',
      description: 'Ancient city home to the pyramids, Sphinx, and Egyptian Museum',
      bestTime: 'Oct - Apr',
      highlights: ['Pyramids', 'Sphinx', 'Museums', 'Nile River'],
      rating: 4.6,
    },
    {
      id: 21,
      name: 'Prague, Czech Republic',
      country: 'Czech Republic',
      region: 'Europe',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
      description: 'Fairy-tale city with medieval architecture, castles, and beer culture',
      bestTime: 'Apr - Jun, Sep - Oct',
      highlights: ['Castle', 'Old Town', 'Beer', 'Architecture'],
      rating: 4.8,
    },
    {
      id: 22,
      name: 'Vancouver, Canada',
      country: 'Canada',
      region: 'Americas',
      image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?w=800&auto=format&fit=crop',
      description: 'Coastal city surrounded by mountains with outdoor activities and diverse culture',
      bestTime: 'Jun - Aug',
      highlights: ['Mountains', 'Ocean', 'Parks', 'Food Scene'],
      rating: 4.7,
    },
    {
      id: 23,
      name: 'Bora Bora, French Polynesia',
      country: 'French Polynesia',
      region: 'Oceania',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
      description: 'Ultimate tropical paradise with turquoise lagoons and luxury overwater bungalows',
      bestTime: 'May - Oct',
      highlights: ['Lagoons', 'Diving', 'Luxury', 'Romance'],
      rating: 5.0,
    },
    {
      id: 24,
      name: 'Petra, Jordan',
      country: 'Jordan',
      region: 'Asia',
      image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=800&auto=format&fit=crop',
      description: 'Ancient city carved into rose-red cliffs, one of the New Seven Wonders',
      bestTime: 'Mar - May, Sep - Nov',
      highlights: ['Ancient Ruins', 'History', 'Desert', 'Architecture'],
      rating: 4.9,
    },
    {
      id: 25,
      name: 'Serengeti, Tanzania',
      country: 'Tanzania',
      region: 'Africa',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop',
      description: 'Vast savanna famous for the Great Migration and incredible wildlife',
      bestTime: 'Jun - Oct (dry season)',
      highlights: ['Safari', 'Wildlife', 'Migration', 'Nature'],
      rating: 5.0,
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
                onClick={() => {
                  if (region === 'Europe') {
                    navigate('/europe-destinations');
                  } else {
                    setSelectedRegion(region);
                  }
                }}
                className={`px-6 py-2 rounded-full font-medium shadow-sm transition-colors ${selectedRegion === region
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Tours & Activities</h2>
            <p className="text-xl text-gray-600">Book unforgettable experiences at your destination</p>
          </div>

          <GetYourGuideSection
            location="Paris"
            title="Top Experiences in Paris"
            limit={6}
          />
        </div>
      </section>

      <NewsletterSignup />

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
