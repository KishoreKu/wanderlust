import { Shield, Mail } from 'lucide-react';

export function PrivacyPolicy() {
    const lastUpdated = 'January 1, 2026';

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Shield className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-primary-100">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-900 font-semibold mb-6">
                                Your privacy matters.
                            </p>

                            <p className="text-gray-700 mb-8">
                                Gubbu is built to help you navigate decisions — not to sell your personal data.
                            </p>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">What we collect</h2>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>Basic usage data (pages visited, interactions)</li>
                                    <li>Anonymous analytics to improve the experience</li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">We do not collect</h2>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>sensitive personal information</li>
                                    <li>payment information</li>
                                    <li>private communications outside the site</li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How we use data</h2>
                                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                    <li>Improve content and recommendations</li>
                                    <li>Understand what people are trying to decide</li>
                                    <li>Keep the platform secure and reliable</li>
                                </ul>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-party services</h2>
                                <p className="text-gray-700">
                                    We may use trusted third-party tools (analytics, hosting, affiliate partners) that follow standard privacy practices.
                                </p>
                            </div>

                            <div className="mb-10">
                                <p className="text-gray-700">
                                    By using Gubbu, you agree to this policy.
                                </p>
                            </div>

                            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
                                <div className="flex items-start">
                                    <Mail className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-900 font-semibold mb-1">Questions?</p>
                                        <p className="text-gray-700 text-sm">
                                            Contact us anytime at <a href="mailto:hello@gubbu.io" className="text-primary-600 hover:underline">hello@gubbu.io</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
