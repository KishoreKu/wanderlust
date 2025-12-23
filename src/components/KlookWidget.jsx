import { useEffect, useRef } from 'react';

export function KlookWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&locale=en&powered_by=true&limit=4&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111';
            script.async = true;
            script.charset = 'utf-8';

            containerRef.current.appendChild(script);

            return () => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            };
        }
    }, []);

    return <div ref={containerRef} className="min-h-[400px]"></div>;
}
