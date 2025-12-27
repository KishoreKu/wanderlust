import { GetYourGuideSection } from '../components/GetYourGuideWidget';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Globe } from 'lucide-react';

export function AsiaDestinations() {
    const asianCities = [
        {
            name: 'Tokyo, Japan',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
            description: 'Where ancient traditions meet cutting-edge technology and innovation',
            highlights: ['Temples', 'Technology', 'Food', 'Cherry Blossoms'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            travelGuideLink: 'https://www.tkqlhce.com/click-101618526-13627287',
            location: 'Tokyo',
            bestTime: 'March - May, September - November',
        },
        {
            name: 'Bali, Indonesia',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
            description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture',
            highlights: ['Beaches', 'Temples', 'Rice Terraces', 'Surfing'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Bali',
            bestTime: 'April - October',
        },
        {
            name: 'Dubai, UAE',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
            description: 'Luxury shopping, ultramodern architecture, and desert adventures',
            highlights: ['Shopping', 'Skyscrapers', 'Desert Safari', 'Luxury'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Dubai',
            bestTime: 'November - March',
        },
        {
            name: 'Bangkok, Thailand',
            image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&auto=format&fit=crop',
            description: 'Bustling metropolis with ornate temples, street food, and vibrant nightlife',
            highlights: ['Temples', 'Street Food', 'Markets', 'Nightlife'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Bangkok',
            bestTime: 'November - February',
        },
        {
            name: 'Singapore',
            image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop',
            description: 'Modern city-state with futuristic architecture, gardens, and diverse cuisine',
            highlights: ['Gardens', 'Food', 'Shopping', 'Architecture'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Singapore',
            bestTime: 'February - April',
        },
        {
            name: 'Petra, Jordan',
            image: 'https://images.unsplash.com/photo-1578070181910-f1e514afdd08?w=800&auto=format&fit=crop',
            description: 'Ancient city carved into rose-red cliffs, one of the New Seven Wonders',
            highlights: ['Ancient Ruins', 'History', 'Desert', 'Architecture'],
            hotelLink: 'https://www.anrdoezrs.net/click-101618526-10438018',
            location: 'Petra',
            bestTime: 'March - May, September - November',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-orange-600 to-red-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Globe className="h-5 w-5 mr-2" />
                        <span className="font-medium">Asian Destinations</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover Asia's Most Incredible Cities
                    </h1>
                    <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
                        From ancient temples to futuristic skylines - explore the diverse wonders of Asia
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
                                Find Flights to Asia
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Why Visit Asia?</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Asia offers incredible diversity - from ancient temples and rich traditions to cutting-edge technology
                        and modern cities. Experience world-class cuisine, stunning landscapes, and warm hospitality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
                                <Star className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Rich Culture</h3>
                            <p className="text-sm text-gray-600">Ancient traditions and modern innovation</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
                                <MapPin className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Affordable Travel</h3>
                            <p className="text-sm text-gray-600">Great value for money in most countries</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
                                <Globe className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="font-semibold mb-2">Amazing Food</h3>
                            <p className="text-sm text-gray-600">World-renowned cuisines and street food</p>
                        </div>
                    </div>
                </div>
            </section>

            {asianCities.map((city, index) => (
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
                                <div className="flex items-center text-orange-600 mb-3">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span className="font-medium">Best Time: {city.bestTime}</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">{city.name}</h2>
                                <p className="text-lg text-gray-600 mb-4">{city.description}</p>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Top Attractions:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {city.highlights.map((highlight, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
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

            <NewsletterSignup />

            <section className="py-20 bg-gradient-to-r from-orange-600 to-red-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore Asia?</h2>
                    <p className="text-xl mb-8 text-orange-100">
                        Start planning your Asian adventure today with our travel guides and booking tools
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://www.aviasales.com/?marker=692183" target="_blank" rel="nofollow noopener">
                            <Button size="lg" variant="secondary">
                                Find Flights to Asia
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
