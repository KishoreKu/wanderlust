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
        gtag('config', measurementId);

        return () => {
            // Cleanup
            document.head.removeChild(script1);
        };
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', measurementId, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}
