import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function CanonicalTag() {
    const location = useLocation();

    useEffect(() => {
        // Remove any existing canonical tags
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }

        // Create new canonical tag with current URL
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = `https://gubbu.io${location.pathname}`;
        document.head.appendChild(canonical);

        // Cleanup function
        return () => {
            const canonicalToRemove = document.querySelector('link[rel="canonical"]');
            if (canonicalToRemove) {
                canonicalToRemove.remove();
            }
        };
    }, [location.pathname]);

    return null; // This component doesn't render anything
}
