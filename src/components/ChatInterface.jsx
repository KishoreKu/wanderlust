import { useState, useRef, useEffect } from 'react';
import Linkify from 'react-linkify';
import { Send, X, Loader2, Mic, VolumeX, Repeat } from 'lucide-react';
import { Snowfall } from '../components/Snowfall';

const suggestions = [
  'Best time to visit Japan',
  'Affordable weekend trips from NYC',
  'Dog flea and tick prevention',
  'Work-from-anywhere essentials',
  'Quiet beaches in Europe'
];

export function ChatInterface({ initialQuery = '', autoListen = false, onClose, inline = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [continuousMode, setContinuousMode] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const continuousModeRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    continuousModeRef.current = continuousMode;
  }, [continuousMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let transcript = event.results[0][0].transcript;
          const gubbuVariations = [
            /\bgoogle\b/gi,
            /\bgoo boo\b/gi,
            /\bgu bu\b/gi,
            /\bgoo bu\b/gi,
            /\bgooboo\b/gi,
            /\bgubu\b/gi,
            /\bgoobu\b/gi,
            /\bguboo\b/gi,
            /\bgo boo\b/gi,
            /\bgoo buu\b/gi,
          ];

          gubbuVariations.forEach((pattern) => {
            transcript = transcript.replace(pattern, 'Gubbu');
          });

          setInput(transcript);
          setIsListening(false);

          if (continuousModeRef.current) {
            handleSend(transcript);
          }
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (!autoListen) return;
    const startListening = () => {
      if (!recognitionRef.current || isListening) return;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // recognition may already be active
      }
    };
    const timer = setTimeout(startListening, 300);
    return () => clearTimeout(timer);
  }, [autoListen, isListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (continuousModeRef.current && recognitionRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
          } catch {
            // recognition may already be active
          }
        }, 500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSend = async (queryText = input) => {
    if (!queryText.trim()) return;

    const userMessage = { role: 'user', content: queryText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.gubbu.io/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { error: responseText };
      }

      if (!response.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`);
      }

      const answerContent = data.answer || 'No answer returned.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: answerContent,
        },
      ]);

      if (isListening || isSpeaking || continuousModeRef.current) {
        speakText(answerContent);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${error.message || 'Network error. Please try again.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const linkDecorator = (href, text, key) => (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-300 hover:text-primary-200 underline"
    >
      {text}
    </a>
  );

  // Inline version for homepage
  if (inline) {
    return (
      <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/gubbu-icon.png" alt="Gubbu AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Genos, sans-serif', fontWeight: 300 }}>
                Gubbu AI
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close AI chat"
          >
            <X className="h-4 w-4 text-gray-300" />
          </button>
        </div>

        <div className="h-[400px] overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <h3 className="text-lg font-bold text-white mb-2">Ask Gubbu anything</h3>
                <p className="text-sm text-gray-400">Travel, lifestyle, pets, or planning — start with a question.</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 rounded-full border border-white/15 text-xs text-gray-200 hover:border-white/40 hover:text-white transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className="flex">
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${message.role === 'user'
                    ? 'ml-auto bg-primary-600 text-white'
                    : 'bg-white/10 text-gray-100'
                    }`}
                >
                  <Linkify componentDecorator={linkDecorator}>
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={message.role === 'user' ? 'text-white' : 'text-gray-100'}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </Linkify>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex">
                <div className="bg-white/10 rounded-2xl px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Gubbu..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`inline-flex items-center justify-center rounded-full border p-2 transition ${isListening
                ? 'border-primary-400 text-primary-200'
                : 'border-white/15 text-gray-300 hover:border-white/40'
                }`}
              aria-label={isListening ? 'Stop listening' : 'Start voice input'}
            >
              <Mic className="h-3.5 w-3.5" />
            </button>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Original fullscreen modal version
  return (
    <div className="fixed inset-0 z-50 bg-[#0b0b0b]">
      <Snowfall density={18} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 flex h-full flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/gubbu-icon.png" alt="Gubbu AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: 'Genos, sans-serif', fontWeight: 300 }}>
                Gubbu
              </h2>
              <p className="text-xs text-gray-400">AI mode for decisions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto w-full max-w-3xl space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <h3 className="text-2xl font-bold text-white mb-2">Ask Gubbu anything</h3>
                <p className="text-gray-400">Travel, lifestyle, pets, or planning — start with a question.</p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-4 py-2 rounded-full border border-white/15 text-sm text-gray-200 hover:border-white/40 hover:text-white transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className="flex">
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user'
                    ? 'ml-auto bg-primary-600 text-white'
                    : 'bg-white/10 text-gray-100'
                    }`}
                >
                  <Linkify componentDecorator={linkDecorator}>
                    <div className="prose prose-sm max-w-none">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={message.role === 'user' ? 'text-white' : 'text-gray-100'}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </Linkify>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex">
                <div className="bg-white/10 rounded-2xl px-4 py-3" >
                  <Loader2 className="h-5 w-5 animate-spin text-primary-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="border-t border-white/10 px-4 py-4">
          <div className="mx-auto w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Gubbu..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleListening}
                className={`inline-flex items-center justify-center rounded-full border px-3 py-2 transition ${isListening
                  ? 'border-primary-400 text-primary-200'
                  : 'border-white/15 text-gray-300 hover:border-white/40'
                  }`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setContinuousMode((prev) => !prev)}
                className={`inline-flex items-center justify-center rounded-full border px-3 py-2 transition ${continuousMode
                  ? 'border-primary-400 text-primary-200'
                  : 'border-white/15 text-gray-300 hover:border-white/40'
                  }`}
                aria-label={continuousMode ? 'Disable continuous mode' : 'Enable continuous mode'}
              >
                <Repeat className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={stopSpeaking}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-3 py-2 text-gray-300 hover:border-white/40 transition"
                aria-label="Stop voice output"
              >
                <VolumeX className="h-3.5 w-3.5" />
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  );
}
