import { DollarSign } from 'lucide-react';

export function AffiliateDisclosure() {
    const lastUpdated = 'January 1, 2026';

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <DollarSign className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Affiliate Disclosure</h1>
                    <p className="text-xl text-primary-100">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 mb-8">
                                Some links on Gubbu are affiliate links.
                            </p>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">This means:</h2>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>We may earn a small commission if you choose to explore or book through those links</li>
                                    <li>There is no additional cost to you</li>
                                    <li>We only recommend experiences, tools, or services we believe are genuinely useful</li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate earnings help support:</h2>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>content creation</li>
                                    <li>platform maintenance</li>
                                    <li>ongoing improvements to Gubbu</li>
                                </ul>
                            </div>

                            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
                                <p className="text-gray-900 font-semibold text-lg m-0">
                                    Our goal is always clarity first — commissions second.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
