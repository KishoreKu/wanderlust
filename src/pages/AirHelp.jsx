import { useState } from 'react';
import { Button } from '../components/Button';
import { Plane, CheckCircle, DollarSign, Clock, Shield, ArrowRight, Gift, Calendar } from 'lucide-react';
import { AirHelpWidget } from '../components/AirHelpWidget';

export function AirHelp() {
    const [copiedCode, setCopiedCode] = useState('');

    const affiliateLink = 'https://airhelp.tpx.li/h8JMCBhl';

    const copyPromoCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(''), 2000);
    };

    const benefits = [
        {
            icon: DollarSign,
            title: 'Up to $700 Compensation',
            description: 'Get money back for flight delays, cancellations, and denied boarding'
        },
        {
            icon: Clock,
            title: '3-Minute Claim',
            description: 'Quick and easy online claim process - no paperwork hassle'
        },
        {
            icon: Shield,
            title: 'No Win, No Fee',
            description: 'Only pay if your claim is successful - zero risk to you'
        },
        {
            icon: CheckCircle,
            title: '98% Success Rate',
            description: 'Industry-leading success rate with over 16 million passengers helped'
        }
    ];

    const promos = [
        {
            code: 'COZY15',
            discount: '15% OFF',
            product: 'AirHelp+ Global PRO',
            validUntil: 'January 4, 2026',
            featured: true
        },
        {
            code: 'AHTPO9',
            discount: '9% OFF',
            product: 'AirHelp+ Services',
            validUntil: 'February 28, 2026',
            featured: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Plane className="h-16 w-16 mx-auto mb-6 animate-bounce" />
                        <h1 className="text-5xl font-bold mb-4">Flight Delayed? Get Compensated!</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Claim up to $700 for flight delays, cancellations, or denied boarding.
                            AirHelp makes it easy - no win, no fee guarantee!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                    Check My Flight <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Limited Time Offers */}
            <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Gift className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Limited-Time Offers</h2>
                        <p className="text-xl text-gray-600">Save on AirHelp+ protection plans</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {promos.map((promo, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl p-8 shadow-lg ${promo.featured ? 'ring-4 ring-orange-400' : ''} relative`}
                            >
                                {promo.featured && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                            BEST OFFER
                                        </span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-600 mb-2">{promo.discount}</div>
                                    <div className="text-xl font-semibold text-gray-900 mb-2">{promo.product}</div>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">Valid until {promo.validUntil}</span>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                        <div className="text-sm text-gray-600 mb-2">Promo Code:</div>
                                        <div className="flex items-center justify-center gap-2">
                                            <code className="text-2xl font-bold text-gray-900">{promo.code}</code>
                                            <button
                                                onClick={() => copyPromoCode(promo.code)}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                {copiedCode === promo.code ? '✓ Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>
                                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full">
                                            Claim Offer <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AirHelp?</h2>
                        <p className="text-xl text-gray-600">The world's leading flight compensation service</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get compensated in 3 simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Enter Flight Details</h3>
                            <p className="text-gray-600">Provide your flight information - takes just 3 minutes</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">We Handle Everything</h3>
                            <p className="text-gray-600">Our experts deal with the airline on your behalf</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Get Your Money</h3>
                            <p className="text-gray-600">Receive up to $700 compensation directly to your account</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                                Start My Claim Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* AirHelp Compensation Checker Widget */}
            <section className="py-12 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check Your Eligibility</h2>
                        <p className="text-gray-600">Enter your flight details to see if you're entitled to compensation</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <AirHelpWidget />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">How much can I claim?</h3>
                            <p className="text-gray-600">
                                You can claim up to $700 (€600) depending on your flight distance and delay duration.
                                EU regulations protect passengers on flights to/from EU airports.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">How long does it take?</h3>
                            <p className="text-gray-600">
                                Most claims are processed within 8-12 weeks. AirHelp handles all communication with
                                the airline, so you don't have to do anything after submitting your claim.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">What if my claim is rejected?</h3>
                            <p className="text-gray-600">
                                With the "no win, no fee" guarantee, you pay nothing if your claim is unsuccessful.
                                AirHelp only charges a fee (typically 25-35%) if they successfully recover compensation for you.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Can I claim for old flights?</h3>
                            <p className="text-gray-600">
                                Yes! You can claim for flights up to 3 years old (6 years in some countries).
                                Check your eligibility on AirHelp's website.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Your Compensation?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join over 16 million passengers who've successfully claimed with AirHelp
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                                Check My Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </a>
                    </div>
                    <p className="text-sm text-blue-200 mt-6">
                        Use code <strong>COZY15</strong> for 15% off AirHelp+ Global PRO (valid until Jan 4, 2026)
                    </p>
                </div>
            </section>
        </div>
    );
}
