import { useState, useRef, useEffect } from 'react';
import Linkify from 'react-linkify';
import { Send, X, Loader2, Mic, VolumeX, Repeat, Sparkles, ShieldCheck } from 'lucide-react';

const suggestions = [
  'Best time to visit Japan?',
  'Affordable weekend trips from NYC',
  'Dog flea and tick prevention',
  'Work-from-anywhere essentials',
  'Quiet beaches in Europe'
];

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  const linkDecorator = (href, text, key) => (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 font-semibold"
    >
      {text}
    </a>
  );

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 animate-fadeIn`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-[#1e2128] border border-white/5 shadow-md mt-1">
          <img src="/subject-icon.png" alt="Gubbu" className="w-full h-full object-contain p-2" />
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-3xl px-6 py-4 shadow-xl text-[15px] leading-relaxed relative ${isUser
          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none'
          : 'bg-[#1e2128] border border-white/[0.03] text-slate-200 rounded-tl-none'
          }`}
      >
        <Linkify componentDecorator={isUser ? undefined : linkDecorator}>
          <div className={`prose prose-sm max-w-none ${isUser ? 'text-white' : 'text-slate-200'}`}>
            {message.content.split('\n').map((line, i) => (
              <p key={i} className={`mb-2 last:mb-0 ${isUser ? 'text-white/95' : 'text-slate-200'}`}>
                {line}
              </p>
            ))}
          </div>
        </Linkify>
        <div className={`text-[10px] mt-2 opacity-30 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

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
  const hasSentInitialRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
          transcript = transcript.replace(/\b(google|goo boo|gu bu)\b/gi, 'Gubbu');
          setInput(transcript);
          setIsListening(false);
          if (continuousModeRef.current) handleSend(transcript);
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (initialQuery && !hasSentInitialRef.current) {
      hasSentInitialRef.current = true;
      handleSend(initialQuery);
    }
  }, [initialQuery]);

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
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (continuousModeRef.current && recognitionRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); setIsListening(true); } catch { }
        }, 500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const handleSend = async (queryText = input) => {
    if (!queryText.trim()) return;

    const userMessage = { role: 'user', content: queryText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.DEV ? '/api-proxy/chat' : 'https://api.gubbu.io/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const responseText = await response.text();
      let data;
      try { data = JSON.parse(responseText); } catch { data = { error: responseText }; }

      if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);

      const answerContent = data.answer || 'No answer returned.';
      setMessages((prev) => [...prev, { role: 'assistant', content: answerContent }]);

      if (isListening || isSpeaking || continuousModeRef.current) {
        speakText(answerContent);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Network error.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col h-[100dvh] w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-200">
      {/* Modern Gradient Background with Animated Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none transform-gpu">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-[120px] animate-pulse duration-[20s]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-full blur-[100px] animate-pulse duration-[15s] [animation-delay:3s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[140px] animate-pulse duration-[25s] [animation-delay:7s]"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      </div>

      {/* Header - Enhanced Glassmorphic */}
      <header className="flex-none bg-white/5 backdrop-blur-2xl border-b border-white/10 px-6 py-4 flex items-center justify-between z-20 shadow-lg shadow-black/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <img src="/subject-icon.png" alt="Gubbu AI" className="w-7 h-7 object-contain brightness-0 invert" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#12141a] rounded-full shadow-sm"></div>
          </div>
          <div>
            <h2 className="font-bold text-white tracking-tight text-lg">Gubbu AI</h2>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Active Thinking</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all active:scale-95"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-4 py-8 scroll-smooth scrollbar-hide">
        <div className="max-w-3xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4 animate-fadeIn">
              <div className="w-24 h-24 bg-[#1e2128] rounded-3xl shadow-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-all duration-500 border border-white/5">
                <img src="/subject-icon.png" alt="Gubbu" className="w-16 h-14 object-contain" />
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                Ready to decide?
              </h3>
              <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed mb-10">
                I'm Gubbu, your modern AI guide for travel, lifestyle, and pet care decisions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-left p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/40 hover:bg-white/[0.06] transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{s}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2 pb-10">
              {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}

              {isLoading && (
                <div className="flex w-full justify-start mb-8 animate-fadeIn">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-[#1e2128] border border-white/5 shadow-md mt-1">
                    <img src="/subject-icon.png" alt="Gubbu" className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="bg-[#1e2128] border border-white/[0.03] rounded-3xl rounded-tl-none px-6 py-5 shadow-lg flex items-center gap-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area - Modern Glassmorphic */}
      <footer className="flex-none pb-8 px-4 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-2 shadow-2xl shadow-black/20 focus-within:border-purple-400/50 focus-within:bg-white/[0.12] transition-all duration-500">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3.5 rounded-2xl transition-all duration-300 ${isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                title="Voice Input"
              >
                <Mic className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gubbu a question..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-400 text-[16px] py-3 px-2"
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-3.5 rounded-[22px] transition-all duration-300 flex-shrink-0 ${input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 ml-0.5" />}
              </button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 opacity-70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-300">Decision Assistant</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            <p className="text-[10px] text-slate-400 font-medium">
              Gubbu AI provides grounded recommendations based on guides.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArrowRight({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
