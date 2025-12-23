import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('');

    useEffect(() => {
        // Check if user has already seen or closed the popup
        const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen');
        const hasClosedPopup = localStorage.getItem('newsletterPopupClosed');

        if (hasSeenPopup || hasClosedPopup) {
            return; // Don't show popup
        }

        // Show popup after 15 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
            sessionStorage.setItem('newsletterPopupSeen', 'true');
        }, 15000); // 15 seconds

        // Exit-intent detection (desktop only)
        const handleMouseLeave = (e) => {
            if (e.clientY <= 0 && !hasSeenPopup && !hasClosedPopup) {
                setIsVisible(true);
                sessionStorage.setItem('newsletterPopupSeen', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('newsletterPopupClosed', 'true');
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            setSubscribeStatus('error');
            return;
        }

        setSubscribeStatus('loading');

        try {
            const response = await fetch('/api/subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setSubscribeStatus('success');
                setEmail('');

                // Close popup after 3 seconds on success
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                setSubscribeStatus('error');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            setSubscribeStatus('error');
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
                onClick={handleClose}
            />

            {/* Popup Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close popup"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Content */}
                    <div className="p-8">
                        {/* Icon/Image */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <span className="text-3xl">✈️</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Get Travel Tips & Deals!
                            </h2>
                            <p className="text-gray-600">
                                Join 1,000+ travelers and get exclusive tips, destination guides, and special deals delivered to your inbox.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={subscribeStatus === 'loading'}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary-600 disabled:opacity-50"
                            />

                            <Button
                                type="submit"
                                disabled={subscribeStatus === 'loading'}
                                className="w-full"
                                size="lg"
                            >
                                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Get Free Travel Tips'}
                            </Button>

                            {subscribeStatus === 'success' && (
                                <p className="text-green-600 font-medium text-center text-sm">
                                    🎉 Success! Check your email for confirmation.
                                </p>
                            )}

                            {subscribeStatus === 'error' && (
                                <p className="text-red-600 font-medium text-center text-sm">
                                    ⚠️ Please enter a valid email address.
                                </p>
                            )}

                            <p className="text-xs text-gray-500 text-center">
                                No spam, unsubscribe anytime. We respect your privacy.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
