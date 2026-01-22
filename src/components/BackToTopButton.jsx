
import { useState, useEffect } from 'react';
import { ArrowUp, Home } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const { isDark } = useTheme();
    const navigate = useNavigate();

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

    const goHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    };

    if (!isVisible) {
        return null;
    }

    const buttonClass = `p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark
            ? 'bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500'
            : 'bg-white text-primary-600 border border-gray-200 hover:bg-gray-50 focus:ring-primary-500'
        }`;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
            <button
                onClick={goHome}
                className={buttonClass}
                aria-label="Go to Home"
                title="Go to Home"
            >
                <Home className="w-6 h-6" />
            </button>

            <button
                onClick={scrollToTop}
                className={buttonClass}
                aria-label="Scroll to top"
                title="Scroll to Top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}
