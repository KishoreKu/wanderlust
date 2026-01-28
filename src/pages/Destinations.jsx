import { Link } from 'react-router-dom';
import { MapPin, Plane, Hotel, Ticket, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function Destinations() {
  const travelStyles = [
    { icon: '🌆', title: 'City Breaks', description: 'Urban exploration and culture' },
    { icon: '🏖️', title: 'Beach Getaways', description: 'Sun, sand, and relaxation' },
    { icon: '🏜️', title: 'Desert & Adventure', description: 'Thrilling outdoor experiences' },
    { icon: '🎭', title: 'Culture & History', description: 'Museums, landmarks, and heritage' },
    { icon: '🎉', title: 'Nightlife & Entertainment', description: 'Vibrant cities that never sleep' },
    { icon: '👨‍👩‍👧', title: 'Family-Friendly Trips', description: 'Fun for all ages' },
    { icon: '💻', title: 'Work From Anywhere', description: 'Remote work destinations', link: '/work-from-anywhere' }
  ];

  const popularDestinations = [
    {
      city: 'Istanbul',
      country: 'Turkey',
      hook: 'East meets West — history, food, and culture',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop',
      blogLink: '/blog/istanbul-activities-guide'
    },
    {
      city: 'Barcelona',
      country: 'Spain',
      hook: 'Gaudí, beaches, and Mediterranean vibes',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
      blogLink: '/blog/barcelona-activities-guide'
    },
    {
      city: 'Dubai',
      country: 'UAE',
      hook: 'Futuristic skyline meets Arabian heritage',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      blogLink: '/blog/dubai-desert-safari-guide'
    },
    {
      city: 'Budapest',
      country: 'Hungary',
      hook: 'Thermal baths, ruin bars, and Danube views',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
      blogLink: '/blog/budapest-activities-guide'
    },
    {
      city: 'Marrakech',
      country: 'Morocco',
      hook: 'Souks, palaces, and Sahara adventures',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&auto=format&fit=crop',
      blogLink: '/blog/marrakech-activities-guide'
    },
    {
      city: 'Las Vegas',
      country: 'USA',
      hook: 'Entertainment capital of the world',
      image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&auto=format&fit=crop',
      blogLink: '/blog/las-vegas-activities-guide'
    }
  ];

  const featuredHubs = [
    {
      city: 'Dubai',
      title: 'Dubai Travel Guide',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop',
      link: '/blog/dubai-desert-safari-guide'
    },
    {
      city: 'Barcelona',
      title: 'Barcelona Activities Guide',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop',
      link: '/blog/barcelona-activities-guide'
    },
    {
      city: 'Las Vegas',
      title: 'Las Vegas Things To Do',
      image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=600&auto=format&fit=crop',
      link: '/blog/las-vegas-activities-guide'
    },
    {
      city: 'Istanbul',
      title: 'Istanbul Experiences Guide',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&auto=format&fit=crop',
      link: '/blog/istanbul-activities-guide'
    },
    {
      city: 'Marrakech',
      title: 'Marrakech Adventure Guide',
      image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&auto=format&fit=crop',
      link: '/blog/marrakech-activities-guide'
    },
    {
      city: 'Budapest',
      title: 'Budapest Experiences Guide',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&auto=format&fit=crop',
      link: '/blog/budapest-activities-guide'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 pt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore Top Travel Destinations Around the World
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Discover what to do, when to go, and how to plan your trip — then search and book through our travel partners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#destinations">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Explore Destinations ↓
              </Button>
            </a>
            <Link to="/flights">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                Find Flights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Travel Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">How do you want to travel?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose your travel style and discover destinations that match your vibe
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {travelStyles.map((style, index) => (
              style.link ? (
                <Link
                  key={index}
                  to={style.link}
                  className="bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center"
                >
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{style.title}</h3>
                  <p className="text-xs text-gray-500">{style.description}</p>
                </Link>
              ) : (
                <div
                  key={index}
                  className="bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg text-center cursor-pointer"
                >
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{style.title}</h3>
                  <p className="text-xs text-gray-500">{style.description}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Right Now</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Trending destinations travelers are exploring this season
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56">
                  <Link to={destination.blogLink}>
                    <img
                      src={destination.image}
                      alt={destination.city}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <h3 className="text-2xl font-bold mb-1">{destination.city}</h3>
                    <p className="text-sm text-gray-200">{destination.country}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 mb-6 italic">"{destination.hook}"</p>

                  <div className="flex gap-3">
                    <Link to={destination.blogLink} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Explore Activities
                      </Button>
                    </Link>
                    <Link to="/flights" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Plan Your Trip
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination Hubs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Destination Guides</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            In-depth travel guides with activities, tips, and insider recommendations
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {featuredHubs.map((hub, index) => (
              <Link
                key={index}
                to={hub.link}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={hub.image}
                    alt={hub.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{hub.title}</h3>
                    <div className="flex items-center text-sm text-gray-200">
                      <span>Read Guide</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Plan & Book */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Trip?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Once you've picked a destination, you can search and book flights, hotels, and experiences through our trusted booking partners — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://gubbu-api-612568200950.us-central1.run.app/go/flights?src=destinations_plan" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                <Plane className="h-5 w-5 mr-2" />
                ✈️ Search Flights
              </Button>
            </a>
            <a href="https://gubbu-api-612568200950.us-central1.run.app/go/hotels?src=destinations_plan" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                <Hotel className="h-5 w-5 mr-2" />
                🏨 Find Hotels
              </Button>
            </a>
            <a href="https://www.getyourguide.com/s?partner_id=NEGURHX&et=694395&lc=29" target="_blank" rel="nofollow noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                <Ticket className="h-5 w-5 mr-2" />
                🎟️ Explore Activities
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Work From Anywhere */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-6">
            <Briefcase className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Travel. Work. Live Anywhere.</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore destinations popular with digital nomads, remote workers, and long-term travelers — with great connectivity, lifestyle, and cost of living.
          </p>

          <Link to="/work-from-anywhere">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              💻 Explore Work From Anywhere Destinations
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Line */}
      <section className="py-6 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Gubbu helps you discover destinations and compare travel options. You'll complete bookings securely on our partner sites at no extra cost.
          </p>
        </div>
      </section>
    </div>
  );
}
