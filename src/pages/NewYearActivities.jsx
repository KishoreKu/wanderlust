import { GetYourGuideSection } from '../components/GetYourGuideWidget';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';

export function NewYearActivities() {
    const destinations = [
        {
            name: 'New York City',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
            description: 'Times Square Ball Drop, rooftop parties, and iconic NYC experiences',
            location: 'New York',
        },
        {
            name: 'Las Vegas',
            image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=800&auto=format&fit=crop',
            description: 'Strip fireworks, nightclub parties, and casino celebrations',
            location: 'Las Vegas',
        },
        {
            name: 'Paris',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
            description: 'Eiffel Tower views, Seine cruises, and champagne celebrations',
            location: 'Paris',
        },
        {
            name: 'San Francisco',
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop',
            description: 'Waterfront fireworks, bay cruises, and Golden Gate celebrations',
            location: 'San Francisco',
        },
        {
            name: 'Miami',
            image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800&auto=format&fit=crop',
            description: 'Beach parties, South Beach nightlife, and tropical NYE',
            location: 'Miami',
        },
        {
            name: 'London',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
            description: 'Thames fireworks, Big Ben countdown, and British celebrations',
            location: 'London',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-medium">New Year's Eve 2025-2026</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        New Year's Eve Tours & Activities
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                        Book unforgettable experiences for New Year's Eve 2025-2026 in the world's most exciting cities
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/blog/new-years-eve-usa-2025">
                            <Button size="lg" variant="secondary">
                                Read NYE Travel Guide
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/hotels">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Book Hotels
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ring in 2026 with Amazing Experiences!</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Make your New Year's Eve unforgettable with exclusive tours, activities, and experiences.
                        From rooftop parties in NYC to fireworks cruises in San Francisco, we've curated the best
                        ways to celebrate the arrival of 2026.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                                <Star className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Top-Rated Activities</h3>
                            <p className="text-sm text-gray-600">Verified reviews from real travelers</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                                <Calendar className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Book in Advance</h3>
                            <p className="text-sm text-gray-600">NYE activities sell out fast - reserve now!</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-3">
                                <MapPin className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Multiple Cities</h3>
                            <p className="text-sm text-gray-600">Experiences in top NYE destinations worldwide</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destination Activities */}
            {destinations.map((destination, index) => (
                <section
                    key={destination.name}
                    className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                            <div className={index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}>
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="rounded-xl shadow-lg w-full h-80 object-cover"
                                />
                            </div>
                            <div className={index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}>
                                <div className="flex items-center text-primary-600 mb-3">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="font-medium">New Year's Eve 2025-2026</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">{destination.name}</h2>
                                <p className="text-lg text-gray-600 mb-6">{destination.description}</p>
                                <div className="flex gap-4">
                                    {destination.name === 'New York City' && (
                                        <>
                                            <a href="https://www.jdoqocy.com/click-101618526-10430139" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                    {destination.name === 'Las Vegas' && (
                                        <>
                                            <a href="https://www.tkqlhce.com/click-101618526-10437077" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                    {destination.name === 'Paris' && (
                                        <>
                                            <a href="https://www.dpbolvw.net/click-101618526-10438016" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                    {destination.name === 'San Francisco' && (
                                        <>
                                            <a href="https://www.anrdoezrs.net/click-101618526-10438018" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                    {destination.name === 'Miami' && (
                                        <>
                                            <a href="https://www.jdoqocy.com/click-101618526-10537406" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                    {destination.name === 'London' && (
                                        <>
                                            <a href="https://www.jdoqocy.com/click-101618526-10437075" target="_blank" rel="nofollow noopener">
                                                <Button variant="primary">Find Hotels</Button>
                                            </a>
                                            <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                                <Button variant="outline">Book Flights</Button>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <GetYourGuideSection
                            location={destination.location}
                            title={`New Year's Eve Activities in ${destination.name}`}
                            limit={6}
                        />
                    </div>
                </section>
            ))}

            {/* Why Book with GetYourGuide */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Why Book Your NYE Activities Now?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">✅ Best Availability</h3>
                            <p className="text-gray-600">Popular NYE activities sell out weeks in advance. Book now to secure your spot!</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">💰 Best Prices</h3>
                            <p className="text-gray-600">Early bird pricing and special NYE packages available now.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">⭐ Verified Reviews</h3>
                            <p className="text-gray-600">Read real reviews from travelers who celebrated NYE with these experiences.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">🎫 Skip the Lines</h3>
                            <p className="text-gray-600">Pre-booked tickets mean no waiting - just celebrating!</p>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSignup />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Plan Your NYE 2025-2026?</h2>
                    <p className="text-xl mb-8 text-primary-100">
                        Don't miss out on the celebration of a lifetime. Book your hotels, flights, and activities today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/hotels">
                            <Button size="lg" variant="secondary">
                                Browse Hotels
                            </Button>
                        </Link>
                        <Link to="/flights">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Search Flights
                            </Button>
                        </Link>
                        <Link to="/blog/new-years-eve-usa-2025">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Read Travel Guide
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
