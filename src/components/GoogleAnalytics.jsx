import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-VNY9DWFD4B';

export function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Load Google Analytics script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        return () => {
            // Cleanup
            document.head.removeChild(script1);
        };
    }, []);

    // Track page views on route change
    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}
