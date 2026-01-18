import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ChatInterface } from '../components/ChatInterface';

export function Home() {
  const [showChat, setShowChat] = useState(false);
  const [chatQuery, setChatQuery] = useState('');

  const handleSearchSubmit = (query) => {
    setChatQuery(query);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#f2e6d6]" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#e7efe2]" />

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl text-center">
          <div className="mb-10">
            <h1
              className="text-6xl md:text-7xl text-gray-900 tracking-wide"
              style={{ fontFamily: 'Genos, sans-serif', fontWeight: 200 }}
            >
              GUBBU
            </h1>
            <p className="mt-3 text-gray-600 text-lg">
              Clear decisions for travel, life, and everything in between.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector('input');
              if (input && input.value.trim()) {
                handleSearchSubmit(input.value.trim());
                input.value = '';
              }
            }}
            className="relative"
          >
            <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-5 py-3 shadow-sm focus-within:shadow-md focus-within:border-gray-400 transition">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ask a question..."
                className="flex-1 bg-transparent text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-5 py-2 text-sm font-semibold hover:bg-gray-800 transition"
              >
                Ask Gubbu anything
              </button>
            </div>
            <button
              type="submit"
              className="sm:hidden mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-6 py-2 text-sm font-semibold hover:bg-gray-800 transition"
            >
              Ask Gubbu anything
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/destinations"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              Destinations
            </Link>
            <Link
              to="/blog"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              Guides & Blogs
            </Link>
            <Link
              to="/lifestyle-picks"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              Lifestyle Picks
            </Link>
            <Link
              to="/work-from-anywhere"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              Work From Anywhere
            </Link>
            <Link
              to="/deals"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              Deals
            </Link>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Decide first. Book later.
          </p>
        </div>
      </section>

      {showChat && (
        <ChatInterface
          initialQuery={chatQuery}
          onClose={() => {
            setShowChat(false);
            setChatQuery('');
          }}
        />
      )}
    </div>
  );
}
