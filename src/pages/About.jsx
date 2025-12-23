import { Button } from '../components/Button';
import { MapPin, Users, Award, Heart, Globe, Camera, Facebook, Instagram } from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';

export function About() {
    const stats = [
        { label: 'Countries Visited', value: '50+' },
        { label: 'Articles Published', value: '200+' },
        { label: 'Happy Readers', value: '100K+' },
        { label: 'Years of Experience', value: '8+' },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Passion for Travel',
            description: 'We believe travel transforms lives and broadens perspectives. Our mission is to inspire and enable more people to explore the world.',
        },
        {
            icon: Award,
            title: 'Expert Knowledge',
            description: 'Our team consists of experienced travelers, travel writers, and destination experts who provide authentic, tested advice.',
        },
        {
            icon: Users,
            title: 'Community First',
            description: 'We build a community of travelers who share experiences, tips, and support each other on their journeys.',
        },
        {
            icon: Globe,
            title: 'Sustainable Travel',
            description: 'We promote responsible tourism that respects local cultures, supports communities, and protects our planet.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">About Gubbu</h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Your trusted companion for discovering the world's most amazing destinations
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Gubbu was born from a simple idea: everyone deserves to experience the joy of travel.
                                    Founded in 2016 by a group of passionate travelers, we started as a small blog sharing our
                                    adventures and tips with friends and family.
                                </p>
                                <p>
                                    Today, we've grown into a comprehensive travel resource trusted by hundreds of thousands of
                                    travelers worldwide. Our team has explored over 50 countries across six continents, staying
                                    in everything from luxury resorts to budget hostels, and experiencing cultures from bustling
                                    cities to remote villages.
                                </p>
                                <p>
                                    What sets us apart is our commitment to authentic, practical advice. We don't just write about
                                    places we've read about—we write about places we've lived, explored, and fallen in love with.
                                    Every recommendation, every tip, and every guide comes from real experience.
                                </p>
                                <p>
                                    We also believe in making travel accessible to everyone. That's why we partner with trusted
                                    booking platforms to help you find the best deals on hotels, flights, and experiences. When
                                    you book through our affiliate links, you get great prices, and we earn a small commission
                                    that helps us keep creating free content for you.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                                alt="Travel adventure"
                                className="rounded-xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-lg shadow-xl max-w-xs">
                                <Camera className="h-8 w-8 mb-2" />
                                <p className="font-semibold">Capturing moments, sharing stories, inspiring journeys</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600">What drives us to create the best travel content</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className="text-center p-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-xl mb-8 text-primary-100">
                            Connect with fellow travelers, share your experiences, and get inspired for your next adventure
                        </p>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h3>
                            <p className="text-primary-100 mb-6 text-center">
                                Get weekly travel tips, destination guides, and exclusive deals
                            </p>
                            <NewsletterSignup variant="compact" />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-6">Follow Us on Social Media</h3>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://www.facebook.com/profile.php?id=61585608988393"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                                Facebook
                            </a>
                            <a
                                href="https://www.instagram.com/mygubbu9/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                                Instagram
                            </a>
                            <a
                                href="https://www.pinterest.com/gubbuna/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                </svg>
                                Pinterest
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                <strong>Honest Reviews:</strong> We provide unbiased, honest reviews and recommendations.
                                Our opinions are our own and are never influenced by affiliate partnerships.
                            </p>
                            <p>
                                <strong>Transparency:</strong> We clearly disclose our affiliate relationships. When you
                                book through our links, you support our work at no extra cost to you.
                            </p>
                            <p>
                                <strong>Quality Content:</strong> Every article is thoroughly researched, fact-checked,
                                and based on real travel experiences.
                            </p>
                            <p>
                                <strong>Your Privacy:</strong> We respect your privacy and handle your data responsibly.
                                Read our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a> for details.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
