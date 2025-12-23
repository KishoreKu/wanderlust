import { useEffect, useRef, useState } from 'react';

export function AviasalesPopularWidget() {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (containerRef.current) {
            // Clear any existing content
            containerRef.current.innerHTML = '';

            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100';
            script.async = true;
            script.charset = 'utf-8';

            // Add load event listener
            script.onload = () => {
                setIsLoading(false);
            };

            script.onerror = () => {
                setIsLoading(false);
                console.error('Failed to load Aviasales widget');
            };

            containerRef.current.appendChild(script);

            return () => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            };
        }
    }, []);

    return (
        <div className="w-full flex justify-center">
            {isLoading && (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-gray-500">Loading flight destinations...</div>
                </div>
            )}
            <div
                ref={containerRef}
                className="min-h-[400px]"
                style={{
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 1
                }}
            ></div>
        </div>
    );
}
