import { NewsletterSignup } from '../components/NewsletterSignup';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';

export function OceaniaDestinations() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-cyan-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Globe className="h-5 w-5 mr-2" />
                        <span className="font-medium">Oceania Destinations</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover Oceania's Paradise
                    </h1>
                    <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto">
                        Stunning beaches, unique wildlife, and island adventures
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
                                Find Flights to Oceania
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Coming Soon!</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We're currently building comprehensive guides for Oceania destinations including Sydney,
                        Auckland, Fiji, Bali, and more. Check back soon for detailed travel information!
                    </p>
                    <Link to="/destinations">
                        <Button variant="primary">Browse All Destinations</Button>
                    </Link>
                </div>
            </section>

            <NewsletterSignup />
        </div>
    );
}
