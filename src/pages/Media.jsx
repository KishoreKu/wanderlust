import { Download, Mail, ExternalLink } from 'lucide-react';

export function Media() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Media Kit</h1>
                    <p className="text-2xl text-primary-100">
                        Press resources and brand information
                    </p>
                </div>
            </section>

            {/* About Gubbu Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Gubbu</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6 leading-relaxed">
                            Gubbu is an intelligent travel companion designed to help modern travelers navigate the complexities of trip planning and decision-making. Named after a real-life bond, Gubbu represents the kind of guide you'd want by your side—curious, friendly, and always ready to explore.
                        </p>
                        <p className="text-xl leading-relaxed">
                            We operate as a Decision-as-a-Service (DaaS) platform, combining technology, content, and intelligent systems to guide travel and modern lifestyle decisions. Gubbu brings together digital bookings, financial tools, wellness considerations, and sustainability choices into one cohesive platform. We use intelligent systems to understand what you're trying to decide, surface relevant guides and experiences, and adapt recommendations to different needs and styles—all while focusing on decision clarity over one-size-fits-all answers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Audience</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6 leading-relaxed">
                            Gubbu serves modern travelers and digital nomads who value thoughtful decision-making over rushed bookings. Our audience includes:
                        </p>
                        <ul className="text-xl space-y-3 mb-6">
                            <li><strong>Remote workers and digital nomads</strong> seeking flexible travel solutions and work-from-anywhere insights</li>
                            <li><strong>Conscious travelers</strong> who prioritize sustainability, wellness, and meaningful experiences</li>
                            <li><strong>Tech-savvy explorers</strong> looking for intelligent tools that simplify complex travel decisions</li>
                            <li><strong>Experience seekers</strong> who want personalized recommendations beyond generic travel advice</li>
                            <li><strong>Lifestyle optimizers</strong> navigating the modern intersection of travel, technology, and personal growth</li>
                        </ul>
                        <p className="text-xl leading-relaxed">
                            Our community values trust over hype, guidance over selling, and platforms designed for people, not algorithms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brand Assets Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Brand Assets</h2>

                    {/* Logo Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Primary Logo */}
                        <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center min-h-[200px]">
                                <img
                                    src="/gubbu-final-logo.png"
                                    alt="Gubbu Primary Logo"
                                    className="max-w-full h-auto max-h-[180px] object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Primary Logo</h3>
                            <p className="text-gray-600 mb-4">Full color logo with text</p>
                            <a
                                href="/gubbu-final-logo.png"
                                download
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download PNG
                            </a>
                        </div>

                        {/* Icon Logo */}
                        <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center min-h-[200px]">
                                <img
                                    src="/gubbu-icon.png"
                                    alt="Gubbu Icon"
                                    className="max-w-full h-auto max-h-[180px] object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Icon Logo</h3>
                            <p className="text-gray-600 mb-4">Gubbu icon for social media</p>
                            <a
                                href="/gubbu-icon.png"
                                download
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download PNG
                            </a>
                        </div>

                        {/* Text Logo */}
                        <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center min-h-[200px]">
                                <img
                                    src="/gubbu-text-logo.png"
                                    alt="Gubbu Text Logo"
                                    className="max-w-full h-auto max-h-[180px] object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Text Logo</h3>
                            <p className="text-gray-600 mb-4">Gubbu wordmark</p>
                            <a
                                href="/gubbu-text-logo.png"
                                download
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download PNG
                            </a>
                        </div>

                        {/* Complete Logo */}
                        <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
                            <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center min-h-[200px]">
                                <img
                                    src="/gubbu-complete-logo.jpg"
                                    alt="Gubbu Complete Logo"
                                    className="max-w-full h-auto max-h-[180px] object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Logo</h3>
                            <p className="text-gray-600 mb-4">Full brand presentation</p>
                            <a
                                href="/gubbu-complete-logo.jpg"
                                download
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download JPG
                            </a>
                        </div>
                    </div>

                    {/* Brand Guidelines */}
                    <div className="bg-primary-50 rounded-xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand Guidelines</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Please maintain adequate spacing around the logo</li>
                            <li>• Do not alter the logo colors or proportions</li>
                            <li>• Use the appropriate logo variant for your background</li>
                            <li>• The Gubbu paw emoji 🐾 is part of our brand identity</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Media Contact</h2>

                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <Mail className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                            <p className="text-xl text-gray-700 mb-6">
                                For press inquiries, partnership opportunities, or media requests, please contact us at:
                            </p>
                            <a
                                href="mailto:hello@gubbu.io"
                                className="inline-flex items-center text-3xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                hello@gubbu.io
                                <ExternalLink className="h-6 w-6 ml-2" />
                            </a>
                        </div>

                        <div className="border-t border-gray-200 pt-8">
                            <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Website</h3>
                                    <a
                                        href="https://gubbu.io"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:text-primary-700"
                                    >
                                        gubbu.io
                                    </a>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Tagline</h3>
                                    <p className="text-gray-700">Navigate the Modern World</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-gray-600">
                            <p className="text-sm">
                                We typically respond to media inquiries within 24-48 hours
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Facts */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Quick Facts</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Founded</h3>
                            <p className="text-gray-700">2025</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Category</h3>
                            <p className="text-gray-700">Technology Solutions</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Focus</h3>
                            <p className="text-gray-700">AI-assisted decision guidance for travel & modern lifestyle planning</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
