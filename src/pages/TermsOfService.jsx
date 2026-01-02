import { FileText } from 'lucide-react';

export function TermsOfService() {
    const lastUpdated = 'January 1, 2026';

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Terms of Use</h1>
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
                                By using Gubbu.io, you agree to the following:
                            </p>

                            <ul className="list-disc ml-6 space-y-3 text-gray-700 mb-8">
                                <li>Content is provided for informational purposes</li>
                                <li>We aim to help you make better decisions, not replace professional advice</li>
                                <li>Travel availability, pricing, and experiences may change</li>
                                <li>You are responsible for decisions you make based on the information provided</li>
                            </ul>

                            <p className="text-gray-700 mb-8">
                                Gubbu may update content or features at any time to improve the experience.
                            </p>

                            <p className="text-gray-900 font-semibold text-lg">
                                Use Gubbu responsibly, and enjoy exploring.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
