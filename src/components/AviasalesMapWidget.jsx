import { useEffect, useRef } from 'react';

export function AviasalesMapWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&lat=&lng=&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';
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

    return <div ref={containerRef} className="min-h-[500px]"></div>;
}
