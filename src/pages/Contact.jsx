import { Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Mail className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Contact Gubbu</h1>
                    <p className="text-xl text-primary-100">
                        We'd love to hear from you
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-900 mb-8">
                                Have a question, suggestion, or feedback?
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-primary-50 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <Mail className="h-8 w-8 text-primary-600 mr-3" />
                                        <h2 className="text-2xl font-bold text-gray-900 m-0">Email Us</h2>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        Send us an email and we'll get back to you soon.
                                    </p>
                                    <a
                                        href="mailto:hello@gubbu.io"
                                        className="text-primary-600 hover:text-primary-700 font-semibold text-lg"
                                    >
                                        hello@gubbu.io
                                    </a>
                                </div>

                                <div className="bg-primary-50 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <MessageCircle className="h-8 w-8 text-primary-600 mr-3" />
                                        <h2 className="text-2xl font-bold text-gray-900 m-0">Chat with Gubbu</h2>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        Get instant help from our AI assistant.
                                    </p>
                                    <Link
                                        to="/"
                                        className="text-primary-600 hover:text-primary-700 font-semibold text-lg inline-block"
                                    >
                                        Talk to Gubbu →
                                    </Link>
                                </div>
                            </div>

                            <div className="text-center text-gray-600">
                                <p className="text-sm">
                                    We typically respond within 24-48 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
