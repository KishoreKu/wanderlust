import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Compass, MessageCircle } from 'lucide-react';

export function About() {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">About Gubbu</h1>
                    <p className="text-2xl text-primary-100">
                        Navigate the Modern World
                    </p>
                </div>
            </section>

            {/* The World Today */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6">
                            The world today is full of choices.
                        </p>
                        <ul className="text-xl space-y-2 mb-6 list-none">
                            <li>Where to travel.</li>
                            <li>What to book.</li>
                            <li>Which tools to use.</li>
                            <li>How to live, work, and move smarter.</li>
                        </ul>
                        <p className="text-xl mb-6">
                            But more choices don't always mean better decisions.
                        </p>
                        <p className="text-xl font-semibold text-gray-900">
                            Gubbu exists to change that.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet Gubbu */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Meet Gubbu 🐾</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6">
                            Gubbu isn't just a brand name.
                        </p>
                        <p className="text-xl mb-6">
                            Gubbu is a companion — curious, friendly, and always ready to explore.
                            The kind of guide you'd want by your side when you're trying to decide what's next.
                        </p>
                        <p className="text-xl mb-4">
                            Inspired by a real-life bond, Gubbu represents how we believe decisions should feel:
                        </p>
                        <ul className="text-xl space-y-2 mb-6">
                            <li>calm, not overwhelming</li>
                            <li>helpful, not pushy</li>
                            <li>thoughtful, not rushed</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why We Built Gubbu */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Why We Built Gubbu</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6">
                            Modern life sits at the intersection of travel, technology, and lifestyle.
                        </p>
                        <p className="text-xl mb-4">
                            Planning a trip today involves:
                        </p>
                        <ul className="text-xl space-y-2 mb-6">
                            <li>digital bookings</li>
                            <li>financial tools</li>
                            <li>apps and platforms</li>
                            <li>wellness considerations</li>
                            <li>sustainability choices</li>
                            <li>remote work and learning</li>
                        </ul>
                        <p className="text-xl mb-6">
                            Yet most platforms treat these as separate worlds.
                        </p>
                        <p className="text-xl font-semibold text-gray-900 mb-6">
                            Gubbu brings them together.
                        </p>
                        <p className="text-xl">
                            We help you navigate the modern world by making complex choices simpler — whether you're planning a trip, choosing tools, or exploring new ways to live and work.
                        </p>
                    </div>
                </div>
            </section>

            {/* How Gubbu Helps */}
            <section className="py-20 bg-primary-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">How Gubbu Helps</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-4">
                            Gubbu uses intelligent systems to:
                        </p>
                        <ul className="text-xl space-y-2 mb-6">
                            <li>understand what you're trying to decide</li>
                            <li>surface relevant guides, experiences, and tools</li>
                            <li>adapt recommendations to different needs and styles</li>
                        </ul>
                        <p className="text-xl mb-6">
                            We don't believe in one-size-fits-all answers.
                        </p>
                        <p className="text-xl">
                            Instead, Gubbu focuses on decision clarity — helping you explore options, understand trade-offs, and move forward with confidence.
                        </p>
                    </div>
                </div>
            </section>

            {/* What Makes Gubbu Different */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">What Makes Gubbu Different</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <ul className="text-xl space-y-3 mb-6">
                            <li>We focus on decisions, not just destinations</li>
                            <li>We guide, not sell</li>
                            <li>We value trust over hype</li>
                            <li>We design for people, not algorithms</li>
                        </ul>
                        <p className="text-xl">
                            Behind the scenes, technology helps power the experience — but the goal is always human:
                            <span className="font-semibold text-gray-900"> to make choices feel easier, clearer, and more personal.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Vision */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Vision</h2>
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p className="text-xl mb-6">
                            We believe the future belongs to platforms that help people think better, not just click faster.
                        </p>
                        <p className="text-xl mb-4">
                            Gubbu is evolving into a place where:
                        </p>
                        <ul className="text-xl space-y-2 mb-6">
                            <li>travel meets technology</li>
                            <li>tools meet real-world needs</li>
                            <li>guidance feels natural, not automated</li>
                        </ul>
                        <p className="text-xl">
                            A place to pause, explore, and decide — with a little help from a friendly guide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Navigate What's Next */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Navigate What's Next</h2>
                    <p className="text-xl mb-8 text-primary-100">
                        Whether you're planning a journey, exploring new tools, or figuring out your next move, Gubbu is here to help.
                    </p>
                    <p className="text-2xl font-semibold mb-8">
                        Navigate the modern world — one better decision at a time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/destinations">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                <Compass className="mr-2 h-5 w-5" />
                                Explore What You Can Do Next
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto"
                            onClick={() => {
                                const chatButton = document.querySelector('[data-chat-widget-toggle]');
                                if (chatButton) chatButton.click();
                            }}
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Talk to Gubbu 🐾
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
