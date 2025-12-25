import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const measurementId = 'G-77JB64XNQ8'; // Gubbu Analytics

export function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Load Google Analytics script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script1);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', measurementId, {
            page_path: window.location.pathname + window.location.search,
            page_title: document.title,
            page_location: window.location.href,
        });

        return () => {
            // Cleanup
            if (document.head.contains(script1)) {
                document.head.removeChild(script1);
            }
        };
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag) {
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
