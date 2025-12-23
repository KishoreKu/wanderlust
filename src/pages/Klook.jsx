import { useState } from 'react';
import { Button } from '../components/Button';
import { MapPin, Star, Ticket, Camera, Shield, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export function Klook() {
    const affiliateLink = 'https://klook.tpx.li/HbJ3wvlk';

    const benefits = [
        {
            icon: Ticket,
            title: 'Best Price Guarantee',
            description: 'Find a lower price? We\'ll refund the difference plus give you a $5 coupon'
        },
        {
            icon: Star,
            title: 'Verified Reviews',
            description: 'Over 100 million reviews from real travelers to help you choose'
        },
        {
            icon: Shield,
            title: 'Instant Confirmation',
            description: 'Book now, receive confirmation instantly - no waiting around'
        },
        {
            icon: MapPin,
            title: '400,000+ Activities',
            description: 'Discover experiences in 2,700+ destinations worldwide'
        }
    ];

    const categories = [
        {
            title: 'Theme Parks & Attractions',
            description: 'Skip the lines at Disney, Universal Studios, and more',
            icon: '🎢',
            popular: ['Disneyland', 'Universal Studios', 'Legoland']
        },
        {
            title: 'Tours & Sightseeing',
            description: 'Guided tours, hop-on-hop-off buses, and city passes',
            icon: '🚌',
            popular: ['City Tours', 'Food Tours', 'Walking Tours']
        },
        {
            title: 'Water Activities',
            description: 'Diving, snorkeling, boat tours, and water sports',
            icon: '🏊',
            popular: ['Scuba Diving', 'Island Hopping', 'Boat Tours']
        },
        {
            title: 'Adventure & Outdoor',
            description: 'Hiking, zip-lining, ATV rides, and extreme sports',
            icon: '🏔️',
            popular: ['Zip-lining', 'Hiking', 'Paragliding']
        },
        {
            title: 'Cultural Experiences',
            description: 'Museums, cooking classes, traditional shows',
            icon: '🎭',
            popular: ['Cooking Classes', 'Museums', 'Cultural Shows']
        },
        {
            title: 'Airport & Transport',
            description: 'Airport transfers, WiFi, SIM cards, and rail passes',
            icon: '✈️',
            popular: ['Airport Transfer', 'WiFi', 'Train Passes']
        }
    ];

    const topDestinations = [
        { name: 'Tokyo', activities: '2,500+', image: '🗼' },
        { name: 'Singapore', activities: '1,800+', image: '🏙️' },
        { name: 'Bangkok', activities: '2,200+', image: '🛕' },
        { name: 'Hong Kong', activities: '1,500+', image: '🌃' },
        { name: 'Seoul', activities: '1,900+', image: '🏯' },
        { name: 'Dubai', activities: '1,200+', image: '🕌' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Sparkles className="h-16 w-16 mx-auto mb-6 animate-pulse" />
                        <h1 className="text-5xl font-bold mb-4">Book Amazing Travel Experiences</h1>
                        <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
                            Discover and book 400,000+ activities, tours, and attractions worldwide.
                            Best prices guaranteed with instant confirmation!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                                    Explore Activities <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                        <p className="text-sm text-orange-100 mt-4">
                            ⭐ Rated 4.6/5 from over 100 million reviews
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Book with Klook?</h2>
                        <p className="text-xl text-gray-600">The world's leading travel activities platform</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
                        <p className="text-xl text-gray-600">Find the perfect experience for your trip</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-4xl mb-4">{category.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.popular.map((item, idx) => (
                                        <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                Browse All Categories <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Top Destinations */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Destinations</h2>
                        <p className="text-xl text-gray-600">Explore the most popular cities</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {topDestinations.map((dest, index) => (
                            <a
                                key={index}
                                href={affiliateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="text-5xl mb-3">{dest.image}</div>
                                <h3 className="font-semibold text-gray-900 mb-1">{dest.name}</h3>
                                <p className="text-sm text-gray-600">{dest.activities}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Book your perfect experience in 3 easy steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Search & Compare</h3>
                            <p className="text-gray-600">Browse 400,000+ activities and read verified reviews</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
                            <p className="text-gray-600">Secure booking with instant confirmation via email</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Enjoy Your Trip</h3>
                            <p className="text-gray-600">Show your mobile voucher and enjoy your experience!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Klook Activities Search Widget */}
            <section className="py-12 bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Activities</h2>
                        <p className="text-gray-600">Find and book your perfect experience</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <script async src="https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111" charset="utf-8"></script>
                    </div>
                </div>
            </section>

            {/* Why Travelers Love Klook */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Travelers Love Klook</h2>

                    <div className="space-y-6">
                        <div className="bg-orange-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-600" />
                                Best Prices
                            </h3>
                            <p className="text-gray-600">
                                Exclusive deals and discounts you won't find anywhere else. Plus, best price guarantee
                                means if you find it cheaper, we'll refund the difference.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Camera className="h-5 w-5 text-orange-600" />
                                Skip the Lines
                            </h3>
                            <p className="text-gray-600">
                                Many attractions offer skip-the-line access, so you spend less time waiting and
                                more time enjoying your vacation.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-orange-600" />
                                Flexible Cancellation
                            </h3>
                            <p className="text-gray-600">
                                Plans change? Many activities offer free cancellation up to 24 hours before your
                                scheduled time.
                            </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Star className="h-5 w-5 text-orange-600" />
                                Verified Reviews
                            </h3>
                            <p className="text-gray-600">
                                Read honest reviews from over 100 million travelers who've actually experienced
                                the activities you're considering.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
                    <p className="text-xl text-orange-100 mb-8">
                        Join millions of travelers discovering amazing experiences worldwide
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                    <p className="text-sm text-orange-100 mt-6">
                        💰 Best Price Guarantee | ⚡ Instant Confirmation | ⭐ 100M+ Reviews
                    </p>
                </div>
            </section>
        </div>
    );
}
