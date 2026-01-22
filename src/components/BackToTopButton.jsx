
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark
                    ? 'bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500'
                    : 'bg-white text-primary-600 border border-gray-200 hover:bg-gray-50 focus:ring-primary-500'
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
}
