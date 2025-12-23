import { useState } from 'react';
import { Button } from './Button';

export function NewsletterSignup({ variant = 'default' }) {
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState(''); // 'success', 'error', 'loading', or ''

    const handleSubscribe = async (e) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setSubscribeStatus('error');
            return;
        }

        if (!emailRegex.test(email)) {
            setSubscribeStatus('error');
            return;
        }

        setSubscribeStatus('loading');

        try {
            // Send to Mailchimp via PHP backend
            const response = await fetch('/api/subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubscribeStatus('success');
                setEmail('');

                // Reset status after 5 seconds
                setTimeout(() => {
                    setSubscribeStatus('');
                }, 5000);
            } else {
                setSubscribeStatus('error');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setSubscribeStatus('error');
        }
    };

    // Compact variant for footer or sidebar
    if (variant === 'compact') {
        return (
            <div className="w-full">
                <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Get travel tips and deals delivered to your inbox
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={subscribeStatus === 'loading'}
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary-600 disabled:opacity-50 text-sm"
                    />
                    <Button type="submit" disabled={subscribeStatus === 'loading'} className="w-full">
                        {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                    {subscribeStatus === 'success' && (
                        <p className="text-green-600 font-medium text-sm">
                            🎉 Thanks for subscribing!
                        </p>
                    )}
                    {subscribeStatus === 'error' && (
                        <p className="text-red-600 font-medium text-sm">
                            ⚠️ Please check your email and try again.
                        </p>
                    )}
                </form>
            </div>
        );
    }

    // Default variant - full section
    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 mb-8">
                    Get the latest travel tips, destination guides, and exclusive deals delivered to your inbox
                </p>
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={subscribeStatus === 'loading'}
                            className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary-600 disabled:opacity-50"
                        />
                        <Button type="submit" disabled={subscribeStatus === 'loading'}>
                            {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                    </div>
                    {subscribeStatus === 'success' && (
                        <p className="mt-4 text-green-600 font-medium">
                            🎉 Thanks for subscribing! You're now part of our travel community.
                        </p>
                    )}
                    {subscribeStatus === 'error' && (
                        <p className="mt-4 text-red-600 font-medium">
                            ⚠️ Something went wrong. Please check your email and try again.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
