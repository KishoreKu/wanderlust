import { GetYourGuideSection } from '../components/GetYourGuideWidget';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Globe } from 'lucide-react';

export function EuropeDestinations() {
    const europeanCities = [
        {
            name: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
            description: 'The City of Light - Eiffel Tower, world-class museums, exquisite cuisine, and romantic atmosphere',
            highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
            hotelLink: 'https://www.dpbolvw.net/click-101618526-10438016',
            travelGuideLink: 'https://www.kqzyfj.com/click-101618526-13627311',
            location: 'Paris',
            bestTime: 'April - June, September - October',
        },
        {
            name: 'London, United Kingdom',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
            description: 'Historic capital with royal palaces, world-class museums, and vibrant culture',
            highlights: ['Big Ben', 'Buckingham Palace', 'Tower Bridge', 'British Museum'],
            hotelLink: 'https://www.jdoqocy.com/click-101618526-10437075',
            travelGuideLink: null,
            location: 'London',
            bestTime: 'May - September',
        },
        {
            name: 'Rome, Italy',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop',
            description: 'The Eternal City - Ancient ruins, Renaissance art, and incredible Italian cuisine',
            highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum'],
            hotelLink: 'https://www.tkqlhce.com/click-101618526-10438021',
            travelGuideLink: 'https://www.anrdoezrs.net/click-101618526-10650548',
            location: 'Rome',
            bestTime: 'April - June, September - October',
        },
        {
            name: 'Barcelona, Spain',
            image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&auto=format&fit=crop',
            description: 'Vibrant coastal city with stunning Gaudí architecture, beaches, and tapas culture',
            highlights: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'La Rambla'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            travelGuideLink: 'https://www.kqzyfj.com/click-101618526-13627313',
            location: 'Barcelona',
            bestTime: 'May - September',
        },
        {
            name: 'Amsterdam, Netherlands',
            image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop',
            description: 'Charming canal city with world-class museums, cycling culture, and tulip gardens',
            highlights: ['Anne Frank House', 'Van Gogh Museum', 'Canal Cruises', 'Tulip Fields'],
            hotelLink: 'https://www.kqzyfj.com/click-101618526-10438143',
            travelGuideLink: null,
            location: 'Amsterdam',
            bestTime: 'April - May, September - November',
        },
        {
            name: 'Prague, Czech Republic',
            image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&auto=format&fit=crop',
            description: 'Fairy-tale city with medieval architecture, historic castles, and famous beer culture',
            highlights: ['Prague Castle', 'Charles Bridge', 'Old Town Square', 'Astronomical Clock'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            travelGuideLink: null,
            location: 'Prague',
            bestTime: 'April - June, September - October',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Globe className="h-5 w-5 mr-2" />
                        <span className="font-medium">European Destinations</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover Europe's Most Beautiful Cities
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        From the romantic streets of Paris to the historic landmarks of Rome - explore the best destinations in Europe
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/blog">
                            <Button size="lg" variant="secondary">
                                Read Travel Guides
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/flights">
                            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white text-white">
                                Find Flights to Europe
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Why Visit Europe?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Europe offers an incredible diversity of cultures, cuisines, and experiences. From world-famous museums
                        and historic landmarks to stunning architecture and beautiful landscapes - there's something for every traveler.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                                <Star className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Rich History</h3>
                            <p className="text-sm text-gray-600">Thousands of years of culture and heritage</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                                <MapPin className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Easy to Travel</h3>
                            <p className="text-sm text-gray-600">Excellent trains and flights between cities</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                                <Globe className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Diverse Experiences</h3>
                            <p className="text-sm text-gray-600">Each city offers unique culture and cuisine</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* European Cities */}
            {europeanCities.map((city, index) => (
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
                                <div className="flex items-center text-blue-600 mb-3">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Best Time: {city.bestTime}</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">{city.name}</h2>
                                <p className="text-lg text-gray-600 mb-4">{city.description}</p>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Top Attractions:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {city.highlights.map((highlight, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
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
                                    {city.travelGuideLink && (
                                        <a href={city.travelGuideLink} target="_blank" rel="nofollow noopener">
                                            <Button variant="outline">Travel Guide</Button>
                                        </a>
                                    )}
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

            {/* Planning Tips */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Europe Travel Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">🎫 Schengen Visa</h3>
                            <p className="text-gray-600">Check if you need a Schengen visa to visit Europe. One visa covers 27 countries!</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">🚄 Eurail Pass</h3>
                            <p className="text-gray-600">Consider a Eurail pass if visiting multiple cities - unlimited train travel!</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">💶 Currency</h3>
                            <p className="text-gray-600">Most EU countries use the Euro, but UK uses Pounds and Switzerland uses Francs.</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="font-bold text-lg mb-2">📱 Stay Connected</h3>
                            <p className="text-gray-600">Get a European SIM card or eSIM for data across multiple countries.</p>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSignup />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore Europe?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Start planning your European adventure today with our travel guides and booking tools
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                            <Button size="lg" variant="secondary">
                                Find Flights to Europe
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
