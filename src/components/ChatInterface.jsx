import { useState, useRef, useEffect } from 'react';
import Linkify from 'react-linkify';
import { Send, X, Loader2, Mic, VolumeX, Repeat } from 'lucide-react';

const suggestions = [
  'Best time to visit Japan',
  'Affordable weekend trips from NYC',
  'Dog flea and tick prevention',
  'Work-from-anywhere essentials',
  'Quiet beaches in Europe'
];

export function ChatInterface({ initialQuery = '', onClose }) {
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
      className="text-primary-600 hover:text-primary-700 underline"
    >
      {text}
    </a>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-xl">
              🐾
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Gubbu</h2>
              <p className="text-sm text-gray-500">Ask a question. Get clarity.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hi! I'm Gubbu</h3>
              <p className="text-gray-600">Ask anything about travel, decisions, or everyday choices.</p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-gray-300 hover:text-gray-900 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
                  }`}
              >
                <Linkify componentDecorator={linkDecorator}>
                  <div className="prose prose-sm max-w-none">
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={message.role === 'user' ? 'text-white' : 'text-gray-900'}>
                        {line}
                      </p>
                    ))}
                  </div>
                </Linkify>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              onClick={toggleListening}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition ${isListening
                ? 'border-primary-500 text-primary-600'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <Mic className="h-3.5 w-3.5" />
              {isListening ? 'Listening' : 'Voice input'}
            </button>
            <button
              type="button"
              onClick={() => setContinuousMode((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 transition ${continuousMode
                ? 'border-primary-500 text-primary-600'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
            >
              <Repeat className="h-3.5 w-3.5" />
              {continuousMode ? 'Continuous on' : 'Continuous off'}
            </button>
            <button
              type="button"
              onClick={stopSpeaking}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300 transition"
            >
              <VolumeX className="h-3.5 w-3.5" />
              Stop voice
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gubbu anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
