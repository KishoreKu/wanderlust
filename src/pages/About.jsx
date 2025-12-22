import { Button } from '../components/Button';
import { MapPin, Users, Award, Heart, Globe, Camera } from 'lucide-react';

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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-xl mb-8 text-primary-100">
                        Connect with fellow travelers, share your experiences, and get inspired for your next adventure
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary">
                            Subscribe to Newsletter
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                            Follow on Social Media
                        </Button>
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
