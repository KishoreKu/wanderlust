import { useEffect, useRef } from 'react';

export function AviasalesWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?currency=usd&trs=483263&shmarker=692183&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100';
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
