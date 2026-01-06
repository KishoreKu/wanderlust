import { Link } from 'react-router-dom';
import { Wifi, DollarSign, Clock, Briefcase, Users, Rocket, Palmtree, Coffee, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function WorkFromAnywhere() {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const scenarios = [
        {
            icon: <Briefcase className="h-8 w-8" />,
            title: 'Solo Remote Worker',
            description: 'Find the perfect city and setup for focused, independent work',
            link: '/blog/solo-travel-safety-guide',
            emoji: '👩‍💻'
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Working While Traveling With Family',
            description: 'Balance work and family time in remote-friendly destinations',
            link: '/blog/best-time-visit-europe',
            emoji: '👨‍👩‍👧'
        },
        {
            icon: <Rocket className="h-8 w-8" />,
            title: 'Founder / Startup Operator',
            description: 'Cities with strong startup ecosystems and coworking spaces',
            link: '/blog/budget-travel-tips-2024',
            emoji: '🚀'
        },
        {
            icon: <Coffee className="h-8 w-8" />,
            title: 'Short Workation (3–7 days)',
            description: 'Quick escapes that combine productivity and exploration',
            link: '/blog/southeast-asia-hidden-gems',
            emoji: '🧳'
        },
        {
            icon: <Palmtree className="h-8 w-8" />,
            title: 'Long Stay / Digital Nomad',
            description: 'Establish a base in affordable, well-connected cities',
            link: '/blog/christmas-2025',
            emoji: '🌴'
        }
    ];

    const cities = [
        {
            name: 'Lisbon',
            country: 'Portugal',
            image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&auto=format&fit=crop',
            internet: 'Excellent',
            cost: 'Mid',
            timezone: 'EU-friendly',
            lifestyle: 'Culture + Beach',
            link: '/blog/best-time-visit-europe'
        },
        {
            name: 'Barcelona',
            country: 'Spain',
            image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
            internet: 'Excellent',
            cost: 'Mid',
            timezone: 'EU-friendly',
            lifestyle: 'City + Beach',
            link: '/blog/barcelona-activities-guide'
        },
        {
            name: 'Dubai',
            country: 'UAE',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
            internet: 'Excellent',
            cost: 'Premium',
            timezone: 'Asia-friendly',
            lifestyle: 'Luxury + Modern',
            link: '/blog/dubai-desert-safari-guide'
        },
        {
            name: 'Istanbul',
            country: 'Turkey',
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop',
            internet: 'Good',
            cost: 'Budget',
            timezone: 'EU + Asia bridge',
            lifestyle: 'Culture + History',
            link: '/blog/istanbul-activities-guide'
        },
        {
            name: 'Budapest',
            country: 'Hungary',
            image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
            internet: 'Excellent',
            cost: 'Budget',
            timezone: 'EU-friendly',
            lifestyle: 'Culture + Thermal Spas',
            link: '/blog/budapest-activities-guide'
        },
        {
            name: 'New York',
            country: 'USA',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
            internet: 'Excellent',
            cost: 'Premium',
            timezone: 'US-friendly',
            lifestyle: 'City + Business',
            link: '/blog/new-years-eve-usa-2025'
        }
    ];

    const workFriendlyFeatures = [
        { icon: <Wifi className="h-6 w-6" />, title: 'Reliable Wi-Fi', description: 'High-speed internet for video calls and uploads' },
        { icon: <Briefcase className="h-6 w-6" />, title: 'Dedicated Workspace', description: 'Desk, ergonomic chair, and good lighting' },
        { icon: <MapPin className="h-6 w-6" />, title: 'Central Location', description: 'Close to cafes, coworking spaces, and amenities' },
        { icon: <Coffee className="h-6 w-6" />, title: 'Quiet Environment', description: 'Soundproofing and peaceful surroundings' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Work From Anywhere, With Clarity
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
                        Guides, cities, and stays designed for remote work, lifestyle balance, and smarter travel decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#cities">
                            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                                🔍 Explore Remote-Friendly Cities
                            </Button>
                        </a>
                        <Link to="/hotels">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                                🏨 Find Work-Friendly Stays
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Choose Your Path */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-4">Choose Your Path</h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Every remote worker has different needs. Find guidance tailored to your situation.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scenarios.map((scenario, index) => (
                            <Link
                                key={index}
                                to={scenario.link}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                            >
                                <div className="text-4xl mb-4">{scenario.emoji}</div>
                                <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
                                <p className="text-gray-600 mb-4">{scenario.description}</p>
                                <span className="text-primary-600 font-semibold flex items-center">
                                    Learn more <ArrowRight className="h-4 w-4 ml-2" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Cities */}
            <section id="cities" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-4">Popular Cities for Remote Work</h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Discover destinations with great internet, affordable living, and vibrant communities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cities.map((city, index) => (
                            <Link
                                key={index}
                                to={city.link}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {city.cost}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                                    <p className="text-gray-600 mb-4">{city.country}</p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <Wifi className="h-4 w-4 mr-2 text-primary-600" />
                                            <span className="text-gray-600">Internet:</span>
                                            <span className="ml-auto font-semibold">{city.internet}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="h-4 w-4 mr-2 text-primary-600" />
                                            <span className="text-gray-600">Cost:</span>
                                            <span className="ml-auto font-semibold">{city.cost}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-primary-600" />
                                            <span className="text-gray-600">Time Zone:</span>
                                            <span className="ml-auto font-semibold text-xs">{city.timezone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                                            <span className="text-gray-600">Lifestyle:</span>
                                            <span className="ml-auto font-semibold text-xs">{city.lifestyle}</span>
                                        </div>
                                    </div>

                                    <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                                        Explore {city.name}
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work-Friendly Stays */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-4">Stays That Actually Work for Work</h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Not all hotels are created equal. Here's what makes a stay work-friendly.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {workFriendlyFeatures.map((feature, index) => (
                            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/hotels">
                            <Button size="lg">
                                🏨 Search Work-Friendly Hotels
                            </Button>
                        </Link>
                        <Link to="/blog/budget-travel-tips-2024">
                            <Button size="lg" variant="outline">
                                🧭 How to Choose a Hotel for Remote Work
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* After-Work Experiences */}
            <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-4">What to Do After You Log Off</h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Remote work isn't just about productivity—it's about lifestyle balance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-3">🍜</div>
                            <h3 className="font-bold mb-2">Evening Food Tours</h3>
                            <p className="text-sm text-gray-600">Taste local cuisine after work</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-3">🌅</div>
                            <h3 className="font-bold mb-2">Sunset Cruises</h3>
                            <p className="text-sm text-gray-600">Unwind with scenic views</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-3">🏛️</div>
                            <h3 className="font-bold mb-2">Cultural Walks</h3>
                            <p className="text-sm text-gray-600">Explore history and architecture</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="text-4xl mb-3">🧘</div>
                            <h3 className="font-bold mb-2">Wellness & Relaxation</h3>
                            <p className="text-sm text-gray-600">Spa, yoga, and self-care</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <a href="https://www.getyourguide.com/s?partner_id=NEGURHX&et=694395&lc=29" target="_blank" rel="nofollow noopener">
                            <Button size="lg">
                                🎟️ Explore Experiences Near You
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Gubbu */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-8">Why Use Gubbu?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">We don't overwhelm you with listings</h3>
                                <p className="text-gray-600">Curated recommendations, not endless scrolling</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">We help you decide first</h3>
                                <p className="text-gray-600">Understand your needs before booking</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">We combine travel + lifestyle + clarity</h3>
                                <p className="text-gray-600">More than just bookings—holistic guidance</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                                ✓
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Bookings through trusted partners</h3>
                                <p className="text-gray-600">Secure, reliable, and well-reviewed options</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Soft Conversion */}
            <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Not Sure Where to Go Yet?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Tell Gubbu what you need — internet, budget, time zone, vibe — and we'll guide you.
                    </p>
                    <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        💬 Ask Gubbu
                    </Button>
                </div>
            </section>

            {/* SEO Links */}
            <section className="py-8 bg-gray-50 border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
                        <Link to="/blog/best-time-visit-europe" className="hover:text-primary-600">Best cities to work remotely in Europe</Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/blog/new-years-eve-usa-2025" className="hover:text-primary-600">Best US cities for remote workers</Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/blog/budget-travel-tips-2024" className="hover:text-primary-600">Work-friendly hotels guide</Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/blog/southeast-asia-hidden-gems" className="hover:text-primary-600">Short workation ideas</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
