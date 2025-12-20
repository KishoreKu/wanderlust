import { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, MessageSquare, Send, MapPin, Clock, Phone } from 'lucide-react';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual form submission
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'info@westley-group.com',
            description: 'We typically respond within 24-48 hours',
        },
        {
            icon: Clock,
            title: 'Response Time',
            content: '24-48 hours',
            description: 'Monday to Friday, 9 AM - 6 PM EST',
        },
        {
            icon: MessageSquare,
            title: 'Social Media',
            content: 'Follow us on social',
            description: 'Quick responses on Twitter and Instagram',
        },
    ];

    const faqs = [
        {
            question: 'How do I submit a guest post?',
            answer: 'We love featuring guest writers! Please email us at info@westley-group.com with your article pitch, including the topic, outline, and a brief bio. We\'ll review and get back to you within a week.',
        },
        {
            question: 'Can you help plan my trip?',
            answer: 'While we don\'t offer personalized trip planning services, our blog contains comprehensive destination guides, itineraries, and tips that can help you plan your perfect trip. Use our search feature to find relevant articles.',
        },
        {
            question: 'How do your affiliate links work?',
            answer: 'When you book hotels or flights through our affiliate links, we earn a small commission at no extra cost to you. This helps us keep creating free content. Read our Affiliate Disclosure for more details.',
        },
        {
            question: 'Do you accept advertising or sponsorships?',
            answer: 'Yes, we work with select travel brands that align with our values. For advertising inquiries, please email us with details about your brand and campaign.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you!
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                                    <p className="text-primary-600 font-medium mb-2">{info.content}</p>
                                    <p className="text-gray-600 text-sm">{info.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full">
                                    <Send className="mr-2 h-5 w-5" />
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Connect</h2>
                    <p className="text-gray-600 mb-8">
                        Join our community on social media for daily travel inspiration, tips, and exclusive content
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="outline">Facebook</Button>
                        <Button variant="outline">Twitter</Button>
                        <Button variant="outline">Instagram</Button>
                        <Button variant="outline">YouTube</Button>
                        <Button variant="outline">Pinterest</Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-6">
                        Note: Add your social media links in the footer once your accounts are set up
                    </p>
                </div>
            </section>
        </div>
    );
}
