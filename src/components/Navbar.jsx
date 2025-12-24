import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plane } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Flights', path: '/flights' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/gubbu-icon.png" alt="Gubbu Mascot" className="h-14 w-14 object-contain drop-shadow-xl" />
            <div className="flex flex-col relative px-6 py-3" style={{
              background: 'linear-gradient(135deg, rgba(0, 206, 209, 0.15) 0%, rgba(64, 224, 208, 0.08) 50%, rgba(0, 206, 209, 0.12) 100%)',
              boxShadow: '0 2px 8px rgba(0, 206, 209, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
              borderRadius: '60% 40% 40% 60% / 60% 50% 50% 40%',
            }}>
              <span
                className="text-2xl font-bold leading-tight"
                style={{
                  color: '#FF6B35',
                  textShadow: '0 0 1px rgba(0, 0, 0, 0.8), 1px 1px 0 rgba(0, 0, 0, 0.4), 2px 2px 6px rgba(0, 206, 209, 0.5), -1px -1px 3px rgba(255, 107, 53, 0.3), 3px 3px 8px rgba(0, 206, 209, 0.3)',
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                  letterSpacing: '1px',
                  filter: 'drop-shadow(0 1px 2px rgba(0, 206, 209, 0.4))'
                }}
              >
                Gubbu
              </span>
              <span
                className="text-xs -mt-1 italic font-light"
                style={{
                  color: '#2D3748',
                  textShadow: '0 0 1px rgba(0, 0, 0, 0.3), 1px 1px 3px rgba(0, 206, 209, 0.3), 0 1px 2px rgba(255, 255, 255, 0.8)',
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                  letterSpacing: '0.5px'
                }}
              >
                Your Travel Companion
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
