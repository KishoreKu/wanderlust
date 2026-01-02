export function Deals() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Special Offers & Deals</h1>
                    <p className="text-xl text-primary-100">
                        Exclusive discounts and partner offers to help you save
                    </p>
                </div>
            </section>

            {/* Teacher Discount Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🎓</div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Teacher Discount</h2>
                                <p className="text-lg text-gray-700 mb-4">
                                    Save 10% off with verified teacher ID through our partner.
                                </p>
                                <p className="text-gray-600 mb-6">
                                    This exclusive offer is available for verified teachers, educators, and school staff.
                                    Simply verify your status to unlock your discount.
                                </p>
                                <a
                                    href="https://www.kqzyfj.com/click-101618526-13799333"
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                                >
                                    Claim Teacher Discount
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transparency Note */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About These Offers</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Gubbu may earn a commission when you use partner links on this page. These offers are
                            provided by trusted partners and are available for specific situations. We only share
                            deals we believe offer genuine value. For more information, see our{' '}
                            <a href="/affiliate-disclosure" className="text-primary-600 hover:underline">
                                Affiliate Disclosure
                            </a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
