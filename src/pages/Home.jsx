import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { MapPin, Calendar, Users, Star, ArrowRight, Plane, Hotel, Globe } from 'lucide-react';
import { AviasalesPopularWidget } from '../components/AviasalesPopularWidget';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Snowfall } from '../components/Snowfall';

export function Home() {
  const featuredDestinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      description: 'Tropical paradise with stunning beaches and rich culture',
      price: 'From $899',
    },
    {
      id: 2,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      description: 'The city of love, art, and exquisite cuisine',
      price: 'From $1,299',
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
      description: 'Where ancient traditions meet modern innovation',
      price: 'From $1,499',
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: '10 Hidden Gems in Southeast Asia',
      excerpt: 'Discover the most beautiful off-the-beaten-path destinations that most tourists miss.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop',
      date: 'Dec 15, 2024',
      category: 'Destinations',
    },
    {
      id: 2,
      title: 'Budget Travel Tips for 2024',
      excerpt: 'Learn how to travel the world without breaking the bank with these expert tips.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
      date: 'Dec 12, 2024',
      category: 'Tips',
    },
    {
      id: 3,
      title: 'Best Time to Visit European Cities',
      excerpt: 'A comprehensive guide to planning your European adventure at the perfect time.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop',
      date: 'Dec 10, 2024',
      category: 'Planning',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'Gubbu helped me find amazing deals on my dream vacation to Bali. The blog posts were incredibly helpful!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'London, UK',
      text: 'The travel tips and destination guides are top-notch. I saved over $500 on my last trip using their recommendations.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      text: 'Best travel resource I\'ve found online. The affiliate deals for hotels and flights are genuinely good.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Snowfall density={30} />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&auto=format&fit=crop)',
            mixBlendMode: 'overlay',
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Explore the World with Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover amazing destinations, get expert travel tips, and find the best deals on hotels and flights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations">
              <Button size="lg" className="w-full sm:w-auto">
                <Globe className="mr-2 h-5 w-5" />
                Explore Destinations
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Read Travel Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Hotel className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Hotel Deals</h3>
              <p className="text-gray-600">Find exclusive discounts on hotels worldwide with our trusted partners</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Plane className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cheap Flights</h3>
              <p className="text-gray-600">Compare prices and book the cheapest flights to your dream destination</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">Get insider tips and comprehensive guides for every destination</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600">Discover the most popular travel destinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                    {destination.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <Link to="/destinations">
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">Travel tips, guides, and inspiration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog">
              <Button size="lg">View All Posts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Flight Destinations */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Flight Destinations</h2>
            <p className="text-xl text-gray-600">Discover the best flight deals to top destinations</p>
          </div>
          <AviasalesPopularWidget />
        </div>
      </section>

      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-primary-100">Real experiences from real travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white text-gray-900 rounded-xl p-6 shadow-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Find the best deals on hotels and flights for your next trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hotels">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Hotel className="mr-2 h-5 w-5" />
                Browse Hotels
              </Button>
            </Link>
            <Link to="/flights">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Plane className="mr-2 h-5 w-5" />
                Search Flights
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
