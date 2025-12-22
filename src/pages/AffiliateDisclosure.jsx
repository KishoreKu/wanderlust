import { DollarSign, ExternalLink, CheckCircle, Info } from 'lucide-react';

export function AffiliateDisclosure() {
    const lastUpdated = 'December 19, 2024';

    const partners = [
        { name: 'Travelpayouts', service: 'Travel affiliate network' },
        { name: 'Booking.com', service: 'Hotel bookings' },
        { name: 'Aviasales', service: 'Flight bookings' },
        { name: 'Agoda', service: 'Hotel bookings' },
        { name: 'GetYourGuide', service: 'Tours and activities' },
        { name: 'Viator', service: 'Tours and experiences' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <DollarSign className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Affiliate Disclosure</h1>
                    <p className="text-xl text-primary-100">
                        Transparency in Our Partnerships
                    </p>
                    <p className="text-sm text-primary-200 mt-2">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
                        <div className="flex items-start">
                            <Info className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">FTC Disclosure Requirement</h3>
                                <p className="text-blue-800">
                                    In accordance with the Federal Trade Commission's (FTC) guidelines, we are required to disclose
                                    that Gubbu participates in affiliate marketing programs and may earn commissions from
                                    qualifying purchases made through links on this website.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Affiliate Links?</h2>
                                <p className="text-gray-700">
                                    Affiliate links are special tracking links that allow us to earn a commission when you make a
                                    purchase or booking through them. When you click on an affiliate link on our website and complete
                                    a transaction, the company pays us a small percentage of the sale as a referral fee.
                                </p>
                                <p className="text-gray-700 mt-4">
                                    <strong>Important:</strong> Using our affiliate links does not cost you anything extra. The price
                                    you pay is exactly the same whether you use our link or go directly to the website. In many cases,
                                    you may even get exclusive deals or discounts through our partnerships.
                                </p>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <ExternalLink className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Our Affiliate Partners</h2>
                                </div>
                                <div className="ml-9">
                                    <p className="text-gray-700 mb-4">
                                        We partner with reputable travel companies and booking platforms to provide you with the best
                                        deals and services. Our current affiliate partners include:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {partners.map((partner, index) => (
                                            <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                                                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-semibold text-gray-900">{partner.name}</div>
                                                    <div className="text-sm text-gray-600">{partner.service}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-4">
                                        This list may be updated periodically as we add or remove partnerships.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Affiliate Links</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        Throughout our website, you'll find affiliate links in various places:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li><strong>Hotel Booking Buttons:</strong> "Book Now" and "Find Hotels" buttons link to our hotel booking partners</li>
                                        <li><strong>Flight Search Tools:</strong> Flight search and booking links connect to airline booking platforms</li>
                                        <li><strong>Destination Guides:</strong> Recommendations for accommodations and activities may include affiliate links</li>
                                        <li><strong>Blog Posts:</strong> Product recommendations, hotel reviews, and travel service mentions may contain affiliate links</li>
                                        <li><strong>Banner Advertisements:</strong> Some display ads on our site may be affiliate promotions</li>
                                    </ul>
                                    <p className="mt-4">
                                        We strive to clearly identify affiliate links where possible, but please assume that any link to
                                        a booking platform, travel service, or product recommendation may be an affiliate link.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Honest Recommendations</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        While we do earn commissions from affiliate partnerships, our recommendations are always based on:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li><strong>Personal Experience:</strong> We only recommend destinations, hotels, and services we have personally used or thoroughly researched</li>
                                        <li><strong>Quality and Value:</strong> We prioritize quality and value for our readers over commission rates</li>
                                        <li><strong>Honest Reviews:</strong> Our reviews and opinions are never influenced by affiliate relationships</li>
                                        <li><strong>Reader Trust:</strong> We value your trust above all else and will never compromise it for financial gain</li>
                                    </ul>
                                    <p className="mt-4 font-semibold">
                                        If we wouldn't recommend something to our own family and friends, we won't recommend it to you.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Affiliate Commissions Work</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        When you click on an affiliate link and make a purchase or booking:
                                    </p>
                                    <ol className="list-decimal ml-6 space-y-2">
                                        <li>You click on a link or button on our website</li>
                                        <li>You're redirected to the partner's website (e.g., Booking.com, Aviasales)</li>
                                        <li>A tracking cookie is placed in your browser to identify you as coming from our site</li>
                                        <li>If you complete a booking or purchase, the partner pays us a commission</li>
                                        <li>The commission is typically a percentage of the sale (usually 3-10% for travel bookings)</li>
                                    </ol>
                                    <p className="mt-4">
                                        <strong>Remember:</strong> You pay the same price whether you use our link or not. The commission
                                        comes from the company's marketing budget, not from your pocket.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Use Affiliate Marketing</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        Creating high-quality travel content requires significant time, effort, and resources. Affiliate
                                        marketing allows us to:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Keep our content free for all readers</li>
                                        <li>Invest in better research and more comprehensive guides</li>
                                        <li>Travel to new destinations to provide first-hand information</li>
                                        <li>Maintain and improve our website</li>
                                        <li>Continue creating valuable travel resources</li>
                                    </ul>
                                    <p className="mt-4">
                                        Your support through affiliate links helps us continue our mission of inspiring and enabling
                                        people to explore the world.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Choice</h2>
                                <p className="text-gray-700">
                                    Using our affiliate links is entirely optional. If you prefer not to use them, you can:
                                </p>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>Navigate directly to booking websites by typing their URL</li>
                                    <li>Use search engines to find the services independently</li>
                                    <li>Disable cookies in your browser (though this may affect website functionality)</li>
                                </ul>
                                <p className="text-gray-700 mt-4">
                                    We'll still be here providing free travel content and advice regardless of whether you use our
                                    affiliate links. However, if you find our content valuable and plan to book travel anyway, using
                                    our links is a great way to support our work at no cost to you.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
                                <p className="text-gray-700">
                                    If you have any questions about our affiliate relationships or how we use affiliate links,
                                    please don't hesitate to contact us:
                                </p>
                                <ul className="list-none ml-0 space-y-2 text-gray-700 mt-4">
                                    <li>Email: info@westley-group.com</li>
                                    <li>Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Visit our Contact Page</a></li>
                                </ul>
                            </div>

                            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">Thank You for Your Support!</h3>
                                <p className="text-green-800 m-0">
                                    We appreciate your trust in our recommendations and your support through affiliate links.
                                    Your bookings help us continue creating free, high-quality travel content for the community.
                                    Happy travels! ✈️
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
