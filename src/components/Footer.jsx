import { Link } from 'react-router-dom';
import { Plane, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">TravelHub</span>
            </div>
            <p className="text-sm mb-4">
              Your ultimate destination for travel inspiration, tips, and the best deals on hotels and flights.
            </p>
            <p className="text-xs text-gray-400">
              We may earn commissions from qualifying purchases made through affiliate links at no extra cost to you.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/destinations" className="hover:text-primary-400 transition-colors">Destinations</Link></li>
              <li><Link to="/hotels" className="hover:text-primary-400 transition-colors">Hotels</Link></li>
              <li><Link to="/flights" className="hover:text-primary-400 transition-colors">Flights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/affiliate-disclosure" className="hover:text-primary-400 transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
            </ul>
            <h3 className="text-white font-semibold mb-4 mt-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-2">Add your social links above</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TravelHub. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2">
            Made with ❤️ for travelers around the world
          </p>
        </div>
      </div>
    </footer>
  );
}
