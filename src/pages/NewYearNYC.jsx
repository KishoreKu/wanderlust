import { useEffect } from 'react';

export function NewYearNYC() {
    useEffect(() => {
        // Set page title and meta tags
        document.title = "New Year's Eve 2026 in New York City - Events & Activities | Gubbu";

        // Update or create meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = "Celebrate New Year's Eve 2026 in NYC! Discover the best events, parties, fireworks, and activities to ring in the new year in the city that never sleeps.";

        // Load GetYourGuide widget script
        const script = document.createElement('script');
        script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
        script.async = true;
        script.setAttribute('data-gyg-partner-id', 'NEGURHX');
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-4 text-center">🎆 New Year's Eve 2026 in New York City</h1>
                    <p className="text-xl text-primary-100 mb-8 text-center max-w-3xl mx-auto">
                        Ring in 2026 in the most iconic city in the world! From Times Square ball drop to exclusive rooftop parties, discover the ultimate New Year's Eve experience in NYC.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Celebrate New Year's Eve in NYC?</h2>
                        <p className="text-gray-700 mb-4">
                            New York City is THE place to be on New Year's Eve! With the world-famous Times Square ball drop, spectacular fireworks over Central Park, exclusive rooftop parties, and countless events across all five boroughs, NYC offers an unforgettable way to welcome the new year.
                        </p>
                        <p className="text-gray-700 mb-6">
                            Whether you're looking for a family-friendly celebration, a romantic evening, or an all-night party, New York City has something for everyone. Book your New Year's Eve activities early - they sell out fast!
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">🎉 Top New Year's Eve Events & Activities in NYC</h2>
                        <p className="text-gray-700 mb-6">
                            Explore the best New Year's Eve experiences in New York City. From dinner cruises to rooftop parties, Broadway shows to exclusive galas, find the perfect way to celebrate!
                        </p>
                    </div>
                </div>
            </section>

            {/* GetYourGuide Widget */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Book Your New Year's Eve Experience</h2>
                        <p className="text-gray-600 text-center mb-8">
                            Browse and book the best New Year's Eve activities, tours, and events in New York City
                        </p>

                        {/* GetYourGuide Widget */}
                        <div
                            data-gyg-href="https://widget.getyourguide.com/default/city.frame"
                            data-gyg-location-id="59"
                            data-gyg-locale-code="en-US"
                            data-gyg-widget="city"
                            data-gyg-partner-id="NEGURHX"
                            className="min-h-[600px]"
                        ></div>
                    </div>
                </div>
            </section>

            {/* Event Highlights */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">🌟 Must-Do New Year's Eve Experiences</h2>

                    <div className="space-y-8">
                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Times Square Ball Drop</h3>
                            <p className="text-gray-700 mb-2">
                                The most iconic New Year's Eve celebration in the world! Watch the famous ball drop at midnight in Times Square. Arrive early (by 3 PM) to secure a good spot, as over a million people attend this free event.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Tip:</strong> No bathrooms available once you're in the viewing area, and you can't leave and come back!
                            </p>
                        </div>

                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">2. New Year's Eve Dinner Cruises</h3>
                            <p className="text-gray-700 mb-2">
                                Enjoy a luxurious dinner cruise around Manhattan with stunning views of the NYC skyline and fireworks. These cruises typically include gourmet dining, live entertainment, and champagne toasts at midnight.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Popular options:</strong> Spirit Cruises, Bateaux New York, Hornblower Cruises
                            </p>
                        </div>

                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Rooftop Parties & Bars</h3>
                            <p className="text-gray-700 mb-2">
                                Experience New Year's Eve from above at one of NYC's many rooftop venues. Enjoy cocktails, DJ sets, and panoramic views of the city's fireworks displays.
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Top spots:</strong> 230 Fifth, The Press Lounge, Westlight, Magic Hour Rooftop
                            </p>
                        </div>

                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Central Park Fireworks</h3>
                            <p className="text-gray-700 mb-2">
                                Watch spectacular fireworks light up the sky over Central Park at midnight. Find a spot along Central Park South or book a room with a park view for the best experience.
                            </p>
                        </div>

                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">5. Broadway Shows</h3>
                            <p className="text-gray-700 mb-2">
                                Many Broadway theaters offer special New Year's Eve performances. Enjoy a world-class show before heading out to celebrate at midnight.
                            </p>
                        </div>

                        <div className="border-l-4 border-primary-600 pl-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">6. Brooklyn Bridge Fireworks</h3>
                            <p className="text-gray-700 mb-2">
                                Head to Brooklyn for a different perspective! Watch fireworks from Brooklyn Bridge Park or DUMBO with stunning views of Manhattan's skyline.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Planning Tips */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">📋 Planning Your NYC New Year's Eve</h2>

                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Book</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>September-October:</strong> Book hotels and major events (cruises, galas, rooftop parties)</li>
                            <li><strong>November:</strong> Last chance for good hotel rates and popular events</li>
                            <li><strong>December:</strong> Limited availability, premium prices</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Crowds:</strong> NYC is PACKED on New Year's Eve - expect massive crowds everywhere</li>
                            <li><strong>Weather:</strong> December in NYC is cold (30-40°F). Dress in warm layers!</li>
                            <li><strong>Prices:</strong> Hotels, restaurants, and events charge premium NYE prices</li>
                            <li><strong>Transportation:</strong> Subway runs 24/7, but expect delays. Uber/Lyft surge pricing is extreme</li>
                            <li><strong>Street Closures:</strong> Times Square area closes to traffic early afternoon</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Essential Tips</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Book everything in advance - hotels, restaurants, events sell out months ahead</li>
                            <li>Dress warmly in layers - you'll be outside for hours</li>
                            <li>Bring snacks and water if attending Times Square ball drop</li>
                            <li>Charge your phone fully - you'll want photos and to contact friends</li>
                            <li>Have a backup plan in case your first choice is too crowded</li>
                            <li>Consider staying in Manhattan to avoid bridge/tunnel traffic</li>
                            <li>Make restaurant reservations for dinner before midnight celebrations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Where to Stay */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">🏨 Where to Stay for New Year's Eve</h2>
                    <p className="text-gray-700 mb-6">
                        Book your hotel early for the best rates and availability. Hotels near Times Square, Central Park, and with rooftop views book out months in advance.
                    </p>

                    <div className="bg-primary-50 rounded-lg p-6 mb-6">
                        <p className="mb-3"><strong>Best Areas to Stay:</strong></p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Midtown Manhattan:</strong> Close to Times Square and Central Park</li>
                            <li><strong>Upper West Side:</strong> Near Central Park fireworks, quieter than Midtown</li>
                            <li><strong>Brooklyn (DUMBO/Williamsburg):</strong> Great views, less crowded, more affordable</li>
                            <li><strong>Lower Manhattan:</strong> Access to Brooklyn Bridge fireworks</li>
                        </ul>

                        <a
                            href="https://www.jdoqocy.com/click-101618526-10430139"
                            target="_blank"
                            rel="nofollow noopener"
                            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors mt-6"
                        >
                            Find Hotels in New York →
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">❓ Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Is Times Square worth it?</h3>
                            <p className="text-gray-700">
                                It's a once-in-a-lifetime experience, but be prepared: you'll stand for 8+ hours in the cold with no bathroom access. If you're not up for that, consider watching from a nearby restaurant or hotel, or choose an alternative celebration.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">How much does New Year's Eve in NYC cost?</h3>
                            <p className="text-gray-700">
                                Budget $500-2,000+ per person depending on your choices. Hotels: $300-1,000/night. Dinner cruises: $200-500. Rooftop parties: $100-300. Restaurant dinners: $150-500. Times Square is free but requires extreme patience!
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">What time should I arrive at Times Square?</h3>
                            <p className="text-gray-700">
                                Arrive by 2-3 PM to get a decent viewing spot. The earlier, the better. Security checkpoints open around noon. Once you're in the viewing area, you cannot leave and return.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Are there family-friendly New Year's Eve events?</h3>
                            <p className="text-gray-700">
                                Yes! Check out the New Year's Eve celebration at the Children's Museum of Manhattan, early countdowns at Grand Central Terminal, or family-friendly dinner cruises. Many hotels also offer special family packages.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">What's the weather like on New Year's Eve in NYC?</h3>
                            <p className="text-gray-700">
                                Expect temperatures between 25-40°F (-4 to 4°C). It can be very cold, especially if you're standing outside for hours. Dress in warm layers, wear a winter coat, hat, gloves, and insulated boots.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Ring in 2026 in NYC?</h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Start planning your unforgettable New Year's Eve in the city that never sleeps!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://www.jdoqocy.com/click-101618526-10430139"
                            target="_blank"
                            rel="nofollow noopener"
                            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Book Your Hotel
                        </a>
                        <a
                            href="/flights"
                            className="inline-block bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
                        >
                            Find Flights to NYC
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
