import { GetYourGuideSection } from '../components/GetYourGuideWidget';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Globe } from 'lucide-react';

export function AmericasDestinations() {
    const americasCities = [
        {
            name: 'New York City, USA',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
            description: 'The city that never sleeps - iconic landmarks, world-class museums, and diverse culture',
            highlights: ['Statue of Liberty', 'Times Square', 'Central Park', 'Broadway'],
            hotelLink: 'https://www.jdoqocy.com/click-101618526-10430139',
            location: 'New York',
            bestTime: 'April - June, September - November',
        },
        {
            name: 'Rio de Janeiro, Brazil',
            image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&auto=format&fit=crop',
            description: 'Stunning beaches, vibrant carnival culture, and iconic Christ the Redeemer',
            highlights: ['Beaches', 'Christ Statue', 'Carnival', 'Sugarloaf Mountain'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Rio de Janeiro',
            bestTime: 'December - March',
        },
        {
            name: 'San Francisco, USA',
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop',
            description: 'Golden Gate Bridge, cable cars, and tech innovation hub',
            highlights: ['Golden Gate', 'Cable Cars', 'Alcatraz', 'Tech Scene'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'San Francisco',
            bestTime: 'September - November',
        },
        {
            name: 'Cancún, Mexico',
            image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&auto=format&fit=crop',
            description: 'Caribbean beaches, Mayan ruins, and vibrant nightlife',
            highlights: ['Beaches', 'Mayan Ruins', 'Snorkeling', 'Nightlife'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Cancun',
            bestTime: 'December - April',
        },
        {
            name: 'Buenos Aires, Argentina',
            image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&auto=format&fit=crop',
            description: 'European-style architecture, tango culture, and world-class steakhouses',
            highlights: ['Tango', 'Steakhouses', 'Architecture', 'Wine'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Buenos Aires',
            bestTime: 'March - May, September - November',
        },
        {
            name: 'Toronto, Canada',
            image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop',
            description: 'Multicultural metropolis with CN Tower, diverse neighborhoods, and Niagara Falls nearby',
            highlights: ['CN Tower', 'Niagara Falls', 'Museums', 'Food Scene'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Toronto',
            bestTime: 'May - October',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-green-600 to-teal-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Globe className="h-5 w-5 mr-2" />
                        <span className="font-medium">Americas Destinations</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover the Best of North & South America
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                        From vibrant cities to stunning natural wonders - explore the diverse Americas
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/blog">
                            <Button size="lg" variant="secondary">
                                Read Travel Guides
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Find Flights
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Why Visit the Americas?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        The Americas offer incredible diversity - from cosmopolitan cities and ancient ruins to pristine beaches
                        and dramatic landscapes. Experience world-class culture, cuisine, and natural beauty.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                                <Star className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Diverse Landscapes</h3>
                            <p className="text-sm text-gray-600">Mountains, beaches, cities, and rainforests</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                                <MapPin className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Rich Culture</h3>
                            <p className="text-sm text-gray-600">Indigenous, colonial, and modern influences</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                                <Globe className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Adventure Awaits</h3>
                            <p className="text-sm text-gray-600">Endless outdoor activities and experiences</p>
                        </div>
                    </div>
                </div>
            </section>

            {americasCities.map((city, index) => (
                <section
                    key={city.name}
                    className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                            <div className={index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}>
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="rounded-xl shadow-lg w-full h-80 object-cover"
                                />
                            </div>
                            <div className={index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}>
                                <div className="flex items-center text-green-600 mb-3">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Best Time: {city.bestTime}</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">{city.name}</h2>
                                <p className="text-lg text-gray-600 mb-4">{city.description}</p>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Top Attractions:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {city.highlights.map((highlight, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <a href={city.hotelLink} target="_blank" rel="nofollow noopener">
                                        <Button variant="primary">Find Hotels</Button>
                                    </a>
                                    <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                                        <Button variant="outline">Book Flights</Button>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <GetYourGuideSection
                            location={city.location}
                            title={`Top Things to Do in ${city.name.split(',')[0]}`}
                            limit={6}
                        />
                    </div>
                </section>
            ))}

            <NewsletterSignup />

            <section className="py-20 bg-gradient-to-r from-green-600 to-teal-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore the Americas?</h2>
                    <p className="text-xl mb-8 text-green-100">
                        Start planning your American adventure today with our travel guides and booking tools
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                            <Button size="lg" variant="secondary">
                                Find Flights
                            </Button>
                        </a>
                        <Link to="/blog">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Read Travel Guides
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
