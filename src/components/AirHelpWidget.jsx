import { useEffect, useRef } from 'react';

export function AirHelpWidget() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://tpscr.com/content?trs=483263&shmarker=692183&lang=en&powered_by=true&campaign_id=120&promo_id=8679';
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

    return <div ref={containerRef} className="min-h-[300px]"></div>;
}
