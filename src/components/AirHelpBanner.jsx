import { Gift, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function AirHelpBanner({ compact = false }) {
    const affiliateLink = 'https://airhelp.tpx.li/h8JMCBhl';

    if (compact) {
        return (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 my-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <Gift className="h-5 w-5" />
                            <span className="font-bold">Flight Delayed?</span>
                        </div>
                        <p className="text-blue-100 text-sm">
                            Get up to $700 compensation! Use code <strong>COZY15</strong> for 15% off
                        </p>
                    </div>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap">
                            Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 my-12 shadow-xl">
            <div className="max-w-4xl mx-auto text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <Gift className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                    Flight Delayed or Cancelled? Get Compensated!
                </h3>
                <p className="text-xl text-blue-100 mb-6">
                    Claim up to $700 for flight disruptions. AirHelp makes it easy - no win, no fee!
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block">
                    <p className="text-sm mb-2">Limited Time Offer:</p>
                    <p className="text-2xl font-bold">
                        15% OFF with code <span className="bg-white text-blue-600 px-3 py-1 rounded">COZY15</span>
                    </p>
                    <p className="text-xs text-blue-200 mt-2">Valid until January 4, 2026</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                            Check My Flight <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                    <a href="/airhelp">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            Learn More
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
