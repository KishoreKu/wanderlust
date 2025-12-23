import { Ticket, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function KlookBanner({ compact = false }) {
    const affiliateLink = 'https://klook.tpx.li/HbJ3wvlk';

    if (compact) {
        return (
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg p-6 my-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <Ticket className="h-5 w-5" />
                            <span className="font-bold">Book Activities & Tours</span>
                        </div>
                        <p className="text-orange-100 text-sm">
                            400,000+ experiences worldwide with best price guarantee!
                        </p>
                    </div>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 whitespace-nowrap">
                            Explore on Klook <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl p-8 my-12 shadow-xl">
            <div className="max-w-4xl mx-auto text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Ticket className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                    Book Amazing Travel Experiences
                </h3>
                <p className="text-xl text-orange-100 mb-6">
                    Discover 400,000+ activities, tours, and attractions worldwide. Best prices guaranteed!
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
                    <p className="text-sm mb-2">Popular Categories:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Theme Parks</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">City Tours</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Water Activities</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Cultural Experiences</span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                            Explore Activities <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                    <a href="/klook">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            Learn More
                        </Button>
                    </a>
                </div>
                <p className="text-xs text-orange-100 mt-4">
                    ⭐ Rated 4.6/5 from 100M+ reviews | 💰 Best Price Guarantee
                </p>
            </div>
        </div>
    );
}
