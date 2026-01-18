import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Gubbu */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Genos, sans-serif', fontWeight: 300 }}>Gubbu</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">How Gubbu Works</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Guides</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/media" className="hover:text-primary-400 transition-colors">Media Kit</Link></li>
            </ul>
          </div>

          {/* Column 2 - Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/destinations" className="hover:text-primary-400 transition-colors">Travel Experiences</Link></li>
              <li><Link to="/new-year-activities" className="hover:text-primary-400 transition-colors">Things to Do</Link></li>
              <li><Link to="/destinations" className="hover:text-primary-400 transition-colors">Destinations</Link></li>
              <li><Link to="/work-from-anywhere" className="hover:text-primary-400 transition-colors">Work From Anywhere</Link></li>
              <li><Link to="/lifestyle-picks" className="hover:text-primary-400 transition-colors">Lifestyle Picks</Link></li>
            </ul>
          </div>

          {/* Column 3 - Trust & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Trust & Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary-400 transition-colors">Terms of Use</Link></li>
              <li><Link to="/affiliate-disclosure" className="hover:text-primary-400 transition-colors">Affiliate Disclosure</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
              <li><Link to="/deals" className="hover:text-primary-400 transition-colors">Deals</Link></li>
            </ul>
          </div>

          {/* Column 4 - Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/gubbu-icon.png" alt="Gubbu" className="h-8 w-8 object-contain" />
              <span className="text-2xl text-white" style={{ fontFamily: 'Genos, sans-serif', fontWeight: 300 }}>Gubbu</span>
              <span className="text-2xl">🐾</span>
            </div>
            <p className="text-sm mb-3">Navigate the Modern World</p>
            <p className="text-xs text-gray-400 mb-4">Thoughtful intelligence behind the scenes.</p>
            <p className="text-2xl mb-6">🐾</p>

            {/* Social Media */}
            <div className="flex space-x-3 flex-wrap gap-2">
              <a href="https://www.facebook.com/profile.php?id=61585608988393" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mygubbu9/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Gubbu on Instagram" title="Gubbu on Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://x.com/gubbuo" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Gubbu on X" title="Gubbu on X">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@Gubbu-1" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://www.pinterest.com/gubbuna/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Gubbu on Pinterest" title="Gubbu on Pinterest">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://bsky.app/profile/gubbu.io" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors" aria-label="Gubbu on Bluesky" title="Gubbu on Bluesky">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Gubbu.io — Navigate the Modern World.</p>
          <p className="text-xs text-gray-400 mt-2">
            Some links on this site may earn us a commission. This helps keep Gubbu running — at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
