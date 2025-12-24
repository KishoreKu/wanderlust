import { useEffect } from 'react';
import './Snowfall.css';

export function Snowfall({ density = 50 }) {
    useEffect(() => {
        const snowflakesContainer = document.querySelector('.snowflakes');
        if (!snowflakesContainer) return;

        // Clear existing snowflakes
        snowflakesContainer.innerHTML = '';

        // Create snowflakes with more realistic properties
        for (let i = 0; i < density; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            // Use different snowflake characters for variety
            const snowflakeChars = ['❄', '❅', '❆', '•', '·'];
            snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];

            // More realistic size distribution (most small, few large)
            const sizeRandom = Math.random();
            let size;
            if (sizeRandom < 0.6) {
                size = Math.random() * 0.3 + 0.3; // 60% small (0.3-0.6)
            } else if (sizeRandom < 0.9) {
                size = Math.random() * 0.4 + 0.6; // 30% medium (0.6-1.0)
            } else {
                size = Math.random() * 0.5 + 1.0; // 10% large (1.0-1.5)
            }

            const left = Math.random() * 100; // 0 to 100%

            // Larger flakes fall faster (realistic physics)
            const animationDuration = (20 - size * 5) + Math.random() * 10; // 15-30s based on size
            const animationDelay = Math.random() * 10; // 0 to 10s

            // Opacity based on size (larger = more visible)
            const opacity = 0.3 + (size * 0.4); // 0.3 to 0.9

            // Horizontal sway distance
            const swayDistance = 20 + Math.random() * 30; // 20-50px

            snowflake.style.left = `${left}%`;
            snowflake.style.fontSize = `${size}rem`;
            snowflake.style.opacity = opacity;
            snowflake.style.animationDuration = `${animationDuration}s`;
            snowflake.style.animationDelay = `${animationDelay}s`;
            snowflake.style.setProperty('--sway-distance', `${swayDistance}px`);

            // Add blur to smaller, distant flakes
            if (size < 0.5) {
                snowflake.style.filter = 'blur(1px)';
            }

            // Assign animation type (straight, drift left, drift right)
            const animationType = Math.floor(Math.random() * 3);
            if (animationType === 0) {
                snowflake.style.animationName = 'fall';
            } else if (animationType === 1) {
                snowflake.style.animationName = 'fall-drift';
            } else {
                snowflake.style.animationName = 'fall-drift-reverse';
            }

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
