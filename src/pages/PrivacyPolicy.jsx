import { Shield, Lock, Eye, Database, Cookie, Mail } from 'lucide-react';

export function PrivacyPolicy() {
    const lastUpdated = 'December 19, 2024';

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
                            <p className="text-lg text-gray-700 mb-8">
                                At Gubbu, we take your privacy seriously. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you visit our website.
                            </p>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Database className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Information We Collect</h2>
                                </div>
                                <div className="ml-9 space-y-4 text-gray-700">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                                        <p>
                                            We may collect personal information that you voluntarily provide to us when you:
                                        </p>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li>Subscribe to our newsletter</li>
                                            <li>Fill out a contact form</li>
                                            <li>Leave comments on our blog posts</li>
                                            <li>Participate in surveys or promotions</li>
                                        </ul>
                                        <p className="mt-3">
                                            This information may include your name, email address, and any other information you choose to provide.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                                        <p>
                                            When you visit our website, we automatically collect certain information about your device, including:
                                        </p>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li>IP address</li>
                                            <li>Browser type and version</li>
                                            <li>Operating system</li>
                                            <li>Referring website</li>
                                            <li>Pages viewed and time spent on pages</li>
                                            <li>Date and time of visits</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Eye className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">How We Use Your Information</h2>
                                </div>
                                <div className="ml-9 text-gray-700">
                                    <p>We use the information we collect to:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Provide, operate, and maintain our website</li>
                                        <li>Improve, personalize, and expand our website</li>
                                        <li>Understand and analyze how you use our website</li>
                                        <li>Develop new products, services, features, and functionality</li>
                                        <li>Send you newsletters and marketing communications (with your consent)</li>
                                        <li>Respond to your comments, questions, and customer service requests</li>
                                        <li>Detect, prevent, and address technical issues and security concerns</li>
                                        <li>Comply with legal obligations</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Cookie className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Cookies and Tracking Technologies</h2>
                                </div>
                                <div className="ml-9 space-y-4 text-gray-700">
                                    <p>
                                        We use cookies and similar tracking technologies to track activity on our website and store certain information.
                                        Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (e.g., Google Analytics)</li>
                                            <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track campaign performance</li>
                                            <li><strong>Preference Cookies:</strong> Remember your preferences and settings</li>
                                        </ul>
                                    </div>

                                    <p>
                                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                        However, if you do not accept cookies, you may not be able to use some portions of our website.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Lock className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Third-Party Services</h2>
                                </div>
                                <div className="ml-9 space-y-4 text-gray-700">
                                    <p>
                                        We may use third-party service providers to help us operate our website and administer activities on our behalf.
                                        These third parties have access to your information only to perform specific tasks and are obligated not to disclose or use it for other purposes.
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Services Include:</h3>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li><strong>Analytics:</strong> Google Analytics (to understand website usage)</li>
                                            <li><strong>Affiliate Programs:</strong> Travelpayouts, Booking.com, Aviasales (for travel booking services)</li>
                                            <li><strong>Email Marketing:</strong> Newsletter service providers (if applicable)</li>
                                            <li><strong>Hosting:</strong> Website hosting services</li>
                                        </ul>
                                    </div>

                                    <p>
                                        When you click on affiliate links and make bookings through our partner sites, you will be subject to their
                                        privacy policies. We encourage you to review their policies before providing any personal information.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Shield className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Data Security</h2>
                                </div>
                                <div className="ml-9 text-gray-700">
                                    <p>
                                        We implement appropriate technical and organizational security measures to protect your personal information
                                        against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of
                                        transmission over the Internet or electronic storage is 100% secure.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Mail className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">Your Rights</h2>
                                </div>
                                <div className="ml-9 text-gray-700">
                                    <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li><strong>Access:</strong> Request access to your personal information</li>
                                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                        <li><strong>Objection:</strong> Object to processing of your personal information</li>
                                        <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                                        <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                                    </ul>
                                    <p className="mt-3">
                                        To exercise these rights, please contact us at contact@gubbu.io.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                                <p className="text-gray-700">
                                    Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                                    information from children under 13. If you are a parent or guardian and believe your child has provided
                                    us with personal information, please contact us so we can delete it.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                                <p className="text-gray-700">
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                                    Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
                                    Policy periodically for any changes.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                                <p className="text-gray-700">
                                    If you have any questions about this Privacy Policy, please contact us:
                                </p>
                                <ul className="list-none ml-0 space-y-2 text-gray-700">
                                    <li>Email: contact@gubbu.io</li>
                                    <li>Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Visit our Contact Page</a></li>
                                </ul>
                            </div>

                            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded">
                                <p className="text-sm text-gray-700 m-0">
                                    <strong>Note:</strong> This privacy policy is a template and should be reviewed by a legal professional
                                    to ensure compliance with applicable laws in your jurisdiction, including GDPR (EU), CCPA (California),
                                    and other privacy regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
