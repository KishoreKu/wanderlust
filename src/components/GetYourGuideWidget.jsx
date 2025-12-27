import { useEffect } from 'react';

/**
 * GetYourGuide Widget Component
 * 
 * Displays tours and activities from GetYourGuide affiliate program
 * Partner ID: NEGURHX
 * 
 * @param {string} location - City or destination name (e.g., "New York", "Paris")
 * @param {number} limit - Number of activities to show (default: 6)
 * @param {string} widget - Widget type: "auto", "activities", "tours" (default: "auto")
 */
export function GetYourGuideWidget({
    location = '',
    limit = 6,
    widget = 'auto',
    className = ''
}) {
    useEffect(() => {
        // Trigger widget initialization after component mounts
        if (window.GetYourGuide) {
            window.GetYourGuide.Widget.init();
        }
    }, [location]);

    return (
        <div className={`getyourguide-widget-container ${className}`}>
            <div
                data-gyg-widget={widget}
                data-gyg-partner-id="NEGURHX"
                data-gyg-q={location}
                data-gyg-number-of-items={limit}
                data-gyg-currency="USD"
                data-gyg-locale-code="en-US"
            />
        </div>
    );
}

/**
 * GetYourGuide Activities Section
 * Pre-styled section with heading for blog posts
 */
export function GetYourGuideSection({ location, title, limit = 6 }) {
    return (
        <div className="my-12 bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">
                {title || `Things to Do in ${location}`}
            </h3>
            <p className="text-gray-600 mb-6">
                Book tours, activities, and experiences with our trusted partner GetYourGuide:
            </p>
            <GetYourGuideWidget location={location} limit={limit} />
        </div>
    );
}
