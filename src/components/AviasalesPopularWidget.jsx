import { useEffect, useRef } from 'react';

export function AviasalesPopularWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100';
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
