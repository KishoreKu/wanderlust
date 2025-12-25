import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const measurementId = 'G-77JB64XNQ8'; // Gubbu Analytics

export function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Initialize dataLayer FIRST, before loading the script
        window.dataLayer = window.dataLayer || [];

        // Define gtag function
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

        // Initialize with timestamp
        gtag('js', new Date());

        // Load Google Analytics script AFTER dataLayer is ready
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

        // Configure after script loads
        script.onload = () => {
            if (window.gtag) {
                window.gtag('config', measurementId, {
                    page_path: window.location.pathname + window.location.search,
                    page_title: document.title,
                    page_location: window.location.href,
                    send_page_view: true,
                });
            }
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag && window.dataLayer) {
            // Send pageview event with proper parameters
            window.gtag('event', 'page_view', {
                page_path: location.pathname + location.search,
                page_title: document.title,
                page_location: window.location.origin + location.pathname + location.search,
            });

            // Also update config
            window.gtag('config', measurementId, {
                page_path: location.pathname + location.search,
                page_title: document.title,
                page_location: window.location.origin + location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}
