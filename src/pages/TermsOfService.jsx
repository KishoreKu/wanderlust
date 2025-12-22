import { FileText, AlertCircle, Scale, Ban } from 'lucide-react';

export function TermsOfService() {
    const lastUpdated = 'December 19, 2024';

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
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
                                Welcome to Gubbu. By accessing or using our website, you agree to be bound by these Terms of Service.
                                Please read them carefully before using our services.
                            </p>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-700">
                                    By accessing and using Gubbu ("the Website"), you accept and agree to be bound by the terms and
                                    provisions of this agreement. If you do not agree to these terms, please do not use this Website.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of the Website</h2>
                                <div className="text-gray-700 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">2.1 Permitted Use</h3>
                                        <p>
                                            You may use this Website for lawful purposes only. You agree to use the Website in accordance with
                                            all applicable local, state, national, and international laws and regulations.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">2.2 Prohibited Activities</h3>
                                        <p>You agree not to:</p>
                                        <ul className="list-disc ml-6 space-y-2">
                                            <li>Use the Website for any illegal or unauthorized purpose</li>
                                            <li>Violate any laws in your jurisdiction</li>
                                            <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
                                            <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                                            <li>Submit false or misleading information</li>
                                            <li>Upload or transmit viruses or any other type of malicious code</li>
                                            <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                                            <li>Interfere with or circumvent the security features of the Website</li>
                                            <li>Use any automated system to access the Website</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Scale className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">3. Intellectual Property Rights</h2>
                                </div>
                                <div className="ml-9 text-gray-700 space-y-4">
                                    <p>
                                        The Website and its original content, features, and functionality are owned by Gubbu and are
                                        protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">3.1 Content Ownership</h3>
                                        <p>
                                            All text, graphics, logos, images, audio clips, digital downloads, data compilations, and software
                                            on this Website are the property of Gubbu or its content suppliers.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">3.2 Limited License</h3>
                                        <p>
                                            You are granted a limited, non-exclusive, non-transferable license to access and use the Website
                                            for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative
                                            works of, publicly display, or exploit any content without our prior written permission.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User-Generated Content</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        If you submit comments, reviews, or other content to the Website, you grant us a worldwide,
                                        non-exclusive, royalty-free license to use, reproduce, modify, and display such content.
                                    </p>
                                    <p>
                                        You represent and warrant that you own or have the necessary rights to the content you submit and
                                        that such content does not violate any third-party rights.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Affiliate Links and Third-Party Services</h2>
                                <div className="text-gray-700 space-y-4">
                                    <p>
                                        Our Website contains affiliate links to third-party websites and services, including but not limited
                                        to Travelpayouts, Booking.com, Aviasales, and other travel booking platforms.
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">5.1 No Endorsement</h3>
                                        <p>
                                            The inclusion of any link does not imply endorsement by Gubbu. We have no control over the
                                            content, privacy policies, or practices of third-party sites.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">5.2 Third-Party Terms</h3>
                                        <p>
                                            When you make bookings through our affiliate links, you are subject to the terms and conditions
                                            of those third-party services. We are not responsible for any transactions between you and third parties.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">5.3 Affiliate Commissions</h3>
                                        <p>
                                            We may earn commissions from bookings made through our affiliate links at no additional cost to you.
                                            See our <a href="/affiliate-disclosure" className="text-primary-600 hover:underline">Affiliate Disclosure</a> for more information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <AlertCircle className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">6. Disclaimer of Warranties</h2>
                                </div>
                                <div className="ml-9 text-gray-700 space-y-4">
                                    <p>
                                        THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND,
                                        EITHER EXPRESS OR IMPLIED.
                                    </p>
                                    <p>
                                        We do not warrant that:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>The Website will be available at all times or uninterrupted</li>
                                        <li>The information on the Website is accurate, complete, or current</li>
                                        <li>The Website will be free from errors, viruses, or other harmful components</li>
                                        <li>Any travel information, prices, or availability is accurate or up-to-date</li>
                                    </ul>
                                    <p>
                                        Travel information, including prices, availability, and recommendations, may change without notice.
                                        Always verify information directly with service providers before making travel decisions.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <div className="flex items-center mb-4">
                                    <Ban className="h-6 w-6 text-primary-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900 m-0">7. Limitation of Liability</h2>
                                </div>
                                <div className="ml-9 text-gray-700 space-y-4">
                                    <p>
                                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WANDERLUST CHRONICLES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                                        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                                        DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                                    </p>
                                    <p>
                                        We are not responsible for:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Any travel arrangements, bookings, or transactions made through third-party services</li>
                                        <li>Any losses or damages resulting from reliance on information provided on the Website</li>
                                        <li>Any issues with travel services, accommodations, flights, or other bookings</li>
                                        <li>Any actions or omissions of third-party service providers</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
                                <p className="text-gray-700">
                                    You agree to indemnify, defend, and hold harmless Gubbu and its officers, directors, employees,
                                    and agents from any claims, liabilities, damages, losses, and expenses arising from your use of the
                                    Website or violation of these Terms.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
                                <p className="text-gray-700">
                                    We reserve the right to modify these Terms at any time. We will notify you of any changes by posting
                                    the new Terms on this page and updating the "Last Updated" date. Your continued use of the Website
                                    after changes constitutes acceptance of the modified Terms.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                                <p className="text-gray-700">
                                    These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                                    which Gubbu operates, without regard to its conflict of law provisions.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                                <p className="text-gray-700">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <ul className="list-none ml-0 space-y-2 text-gray-700">
                                    <li>Email: info@westley-group.com</li>
                                    <li>Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Visit our Contact Page</a></li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
                                <p className="text-sm text-gray-700 m-0">
                                    <strong>Legal Notice:</strong> This Terms of Service is a template and should be reviewed by a legal
                                    professional to ensure compliance with applicable laws in your jurisdiction and to address your specific
                                    business needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
