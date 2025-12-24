import { useEffect } from 'react';
import './Snowfall.css';

export function Snowfall({ density = 50 }) {
    useEffect(() => {
        const snowflakesContainer = document.querySelector('.snowflakes');
        if (!snowflakesContainer) return;

        // Clear existing snowflakes
        snowflakesContainer.innerHTML = '';

        // Create snowflakes
        for (let i = 0; i < density; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';

            // Random properties for natural look
            const size = Math.random() * 0.5 + 0.5; // 0.5 to 1
            const left = Math.random() * 100; // 0 to 100%
            const animationDuration = Math.random() * 10 + 10; // 10 to 20s
            const animationDelay = Math.random() * 10; // 0 to 10s
            const opacity = Math.random() * 0.6 + 0.3; // 0.3 to 0.9

            snowflake.style.left = `${left}%`;
            snowflake.style.fontSize = `${size}rem`;
            snowflake.style.opacity = opacity;
            snowflake.style.animationDuration = `${animationDuration}s`;
            snowflake.style.animationDelay = `${animationDelay}s`;

            snowflakesContainer.appendChild(snowflake);
        }

        // Cleanup
        return () => {
            if (snowflakesContainer) {
                snowflakesContainer.innerHTML = '';
            }
        };
    }, [density]);

    return <div className="snowflakes" aria-hidden="true"></div>;
}
