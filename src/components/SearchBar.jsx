import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const staticPages = [
  { title: 'Home', path: '/', description: 'Start your decision journey with Gubbu.', category: 'Pages' },
  { title: 'Blog', path: '/blog', description: 'All guides and articles.', category: 'Pages' },
  { title: 'Destinations', path: '/destinations', description: 'Explore destinations and experiences.', category: 'Pages' },
  { title: 'Hotels', path: '/hotels', description: 'Search hotels and stay ideas.', category: 'Pages' },
  { title: 'Flights', path: '/flights', description: 'Find flight options and planning tips.', category: 'Pages' },
  { title: 'Work From Anywhere', path: '/work-from-anywhere', description: 'Remote work and lifestyle guidance.', category: 'Pages' },
  { title: 'Lifestyle Picks', path: '/lifestyle-picks', description: 'Tools and picks for modern life.', category: 'Pages' },
  { title: 'Deals', path: '/deals', description: 'Latest deals and offers.', category: 'Pages' },
  { title: 'About', path: '/about', description: 'Learn how Gubbu works.', category: 'Pages' },
  { title: 'Contact', path: '/contact', description: 'Get in touch with the Gubbu team.', category: 'Pages' },
];

export function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    let active = true;
    fetch('/blog-metadata.json')
      .then((resp) => resp.json())
      .then((data) => {
        if (!active) return;
        const normalized = Object.entries(data || {}).map(([id, meta]) => ({
          title: meta.title || id,
          path: `/blog/${id}`,
          description: meta.description || '',
          category: meta.category || 'Blog',
        }));
        setPosts(normalized);
      })
      .catch(() => {
        if (active) setPosts([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const inText = (item) =>
      `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(q);
    return [...staticPages, ...posts].filter(inText).slice(0, 12);
  }, [query, posts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, destinations, and pages..."
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
            type="text"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-500">
              Start typing to search across guides, destinations, and pages.
            </div>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="px-6 py-8 text-sm text-gray-500">
              No matches found. Try a different phrase.
            </div>
          )}

          {results.map((result) => (
            <Link
              key={result.path}
              to={result.path}
              onClick={onClose}
              className="block px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <div className="text-xs uppercase tracking-wide text-primary-600 mb-1">{result.category}</div>
              <div className="text-base font-semibold text-gray-900">{result.title}</div>
              {result.description && (
                <div className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
