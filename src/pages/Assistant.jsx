import { createElement, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowUp, ArrowUpRight, CalendarDays, Check, CheckSquare, Compass, FileText, Globe, Layers, Link2, Mail, MessageSquare, Mic, Paperclip, Plus, Search, Sparkles, Trash2, X } from 'lucide-react';
import './Assistant.css';

const modes = [ ['Ask', Sparkles], ['Web', Globe], ['Write', FileText], ['Plan', CheckSquare] ];
const ideas = [
  { icon: Compass, title: 'A little less planning.', text: 'Plan a three-day escape from New York on a $600 budget.', mode: 'Plan', label: 'Make room for a getaway' },
  { icon: FileText, title: 'Get past the blank page.', text: 'Help me write a clear project proposal. Ask me what you need to know first.', mode: 'Write', label: 'Create something good' },
  { icon: CheckSquare, title: 'Untangle your to-do list.', text: 'Help me prioritize my week. Ask about my deadlines and commitments.', mode: 'Plan', label: 'Bring your week into focus' },
];
const connections = [ ['Email', Mail, 'Draft messages here. Gmail and Outlook account access is not connected.'], ['Calendar', CalendarDays, 'Plan your schedule here. Reading and updating your calendar requires an integration.'], ['Cloud files', FileText, 'Attach local text files now. Drive and Dropbox connections are coming later.'], ['Travel & booking', Compass, 'Explore Gubbu’s travel tools. Purchases happen on booking partner sites.'] ];
function loadHistory() {
  try { const value = JSON.parse(localStorage.getItem('gubbu-conversations') || '[]'); return Array.isArray(value) ? value.filter(c => c.id && typeof c.title === 'string' && Array.isArray(c.messages)).slice(0, 20) : []; } catch { return []; }
}
export function Assistant() {
  const [history, setHistory] = useState(loadHistory);
  const [active, setActive] = useState(null);
  const [view, setView] = useState('Assistant');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('Ask');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const fileInput = useRef(null);
  const textInput = useRef(null);
  const recognition = useRef(null);
  const request = useRef(null);
  const end = useRef(null);
  const conversation = history.find(c => c.id === active);
  const messages = conversation?.messages || [];
  useEffect(() => { try { localStorage.setItem('gubbu-conversations', JSON.stringify(history)); } catch { /* Storage may be disabled or full. */ } }, [history]);
  useEffect(() => { end.current?.scrollIntoView?.({ behavior: 'smooth' }); }, [history, busy]);
  useEffect(() => () => { recognition.current?.abort(); request.current?.abort(); }, []);
  function newChat() { if (busy) return; setActive(null); setView('Assistant'); setInput(''); setFile(null); setError(''); }
  async function attach(event) {
    const chosen = event.target.files?.[0]; event.target.value = '';
    if (!chosen) return;
    if (!/\.(txt|md|csv)$/i.test(chosen.name) || chosen.size > 50000) { setError('Choose a .txt, .md, or .csv file smaller than 50 KB.'); return; }
    try { setFile({ name: chosen.name, content: await chosen.text() }); setError(''); } catch { setError('This file could not be read. Try another file.'); }
  }
  function dictate() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) { setError('Voice input is unavailable in this browser. You can type your request instead.'); return; }
    if (listening) { recognition.current?.stop(); return; }
    const session = new Speech(); recognition.current = session;
    session.lang = 'en-US';
    session.onresult = e => setInput(previous => `${previous} ${e.results[0][0].transcript}`.trim());
    session.onend = () => setListening(false);
    session.onerror = () => { setListening(false); setError('Microphone unavailable. Check your browser microphone permission.'); };
    try { session.start(); setListening(true); setError(''); } catch { setError('Voice input could not start. Please try again.'); }
  }
  async function submit(event) {
    event.preventDefault();
    if (!input.trim() || busy) return;
    recognition.current?.stop();
    const id = active || crypto.randomUUID();
    const userMessage = { role: 'user', content: input.trim(), ...(file ? { attachment: file } : {}) };
    const next = [...messages, userMessage];
    setHistory(previous => [{ id, title: conversation?.title || input.trim().slice(0, 65), messages: next }, ...previous.filter(c => c.id !== id)].slice(0, 20));
    setActive(id); setInput(''); setFile(null); setBusy(true); setError('');
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 60000);
    try {
      const base = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api-proxy' : 'https://gubbu-api.proudwater-f3417084.eastus2.azurecontainerapps.io');
      const response = await fetch(`${base}/assistant`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ mode, messages: next.map(m => ({ role: m.role, content: m.content + (m.attachment ? `\n\nAttached document (${m.attachment.name}):\n${m.attachment.content}` : '') })) }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.answer) throw new Error(data.error || 'The assistant is unavailable. Check the API configuration and try again.');
      setHistory(previous => previous.map(c => c.id === id ? { ...c, messages: [...next, { role: 'assistant', content: data.answer, capabilities: data.capabilities }] } : c));
    } catch (failure) { setError(failure.name === 'AbortError' ? 'The request timed out. Please try again.' : failure.message); setInput(userMessage.content); setFile(userMessage.attachment || null); setHistory(previous => previous.map(c => c.id === id ? { ...c, messages } : c)); }
    finally { clearTimeout(timeout); setBusy(false); request.current = null; }
  }
  return <div className="gubbu-workspace">
    <aside className="assistant-sidebar">
      <Link className="assistant-brand" to="/" aria-label="Gubbu home"><span className="brand-symbol"><Layers size={23} /></span>gubbu<span className="brand-dot">.</span></Link>
      <button className="new-chat" onClick={newChat} disabled={busy}><Plus size={18} /> New conversation</button>
      <nav aria-label="Workspace">{[['Assistant', Sparkles], ['Library', FileText], ['Connections', Link2]].map(([label, Icon]) => <button key={label} className={view === label ? 'selected' : ''} onClick={() => setView(label)}>{createElement(Icon, { size: 18 })}{label}{label === 'Connections' && <span className="nav-count">4</span>}</button>)}</nav>
      <div className="recent-heading">Recent conversations</div>
      <div className="recent-list">{history.length === 0 ? <p>Your next idea starts here.</p> : history.map(c => <button disabled={busy} key={c.id} className={active === c.id ? 'active-conversation' : ''} onClick={() => { setActive(c.id); setView('Assistant'); setError(''); }}><MessageSquare size={15} /><span>{c.title}</span></button>)}</div>
      <div className="sidebar-bottom"><Link to="/travel"><Compass size={18} /> Explore Gubbu travel<ArrowUpRight size={14} /></Link><div className="local-profile"><span>Y</span><div>Your workspace<small>Saved on this device</small></div></div></div>
    </aside>
    <div className="assistant-main">
      <header className="workspace-header"><span>{view}<span className="header-divider">/</span><span className="header-muted">Your everyday AI</span></span><span className="preview-badge">Early access</span></header>
      {view === 'Assistant' ? <main className={`assistant-content ${messages.length ? 'has-messages' : ''}`}>
        {!messages.length ? <><div className="welcome-mark"><Sparkles size={30} strokeWidth={1.4} /></div><p className="welcome-intro">Big ideas. Everyday things.</p><h1>What can we make<br />happen today?</h1><p className="welcome-description">Think, write, and plan in one place.<br className="mobile-break" /> Start with whatever’s on your mind.</p></> : <div className="conversation" aria-live="polite">{messages.map((message, index) => <article key={index} className={`conversation-message ${message.role}`}><div className="message-author">{message.role === 'user' ? 'You' : <><Sparkles size={16} /> Gubbu</>}</div>{message.attachment && <div className="attachment-label"><Paperclip size={14} />{message.attachment.name}</div>}<ReactMarkdown>{message.content}</ReactMarkdown>{message.capabilities?.length > 0 && <div className="route-label">Working with: {message.capabilities.join(', ')}</div>}</article>)}</div>}
        {busy && <p className="thinking" role="status"><Sparkles size={16} /> Gubbu is thinking…</p>}
        <form className="universal-composer" onSubmit={submit}>
          {file && <div className="attachment-label"><FileText size={14} />{file.name}<button type="button" aria-label="Remove attachment" onClick={() => setFile(null)}><X size={14} /></button></div>}
          <textarea ref={textInput} aria-label="Ask Gubbu" placeholder="Ask anything, or give me something to do…" value={input} maxLength={12000} disabled={busy} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); if (input.trim() && !busy) e.currentTarget.form.requestSubmit(); } }} />
          <div className="composer-toolbar"><div className="mode-picker">{modes.map(([label, Icon]) => <button type="button" key={label} disabled={busy} aria-pressed={mode === label} onClick={() => setMode(label)} className={mode === label ? 'chosen-mode' : ''}>{createElement(Icon, { size: 15 })}{label}</button>)}</div><div className="composer-actions"><input ref={fileInput} type="file" accept=".txt,.md,.csv" hidden onChange={attach} /><button type="button" disabled={busy} aria-label="Attach text file" title="Attach text file (up to 50 KB)" onClick={() => fileInput.current.click()}><Paperclip size={18} /></button><button type="button" disabled={busy} aria-label={listening ? 'Stop listening' : 'Voice input'} aria-pressed={listening} onClick={dictate}><Mic size={18} /></button><button className="send-request" aria-label="Send request" disabled={busy || !input.trim()}><ArrowUp size={20} /></button></div></div>
        </form>
        {error && <p className="assistant-error" role="alert">{error}</p>}
        <p className="composer-note">{mode === 'Web' ? 'Web mode helps prepare searches. Live browsing is not connected yet.' : 'Attachments are sent to your AI provider. Gubbu cannot send, book, or pay yet.'}</p>
        {!messages.length && <><div className="idea-heading">A few places to start<span>No perfect prompts needed</span></div><div className="starter-ideas">{ideas.map(({ icon: Icon, title, text, mode: ideaMode, label }) => <button key={title} onClick={() => { setInput(text); setMode(ideaMode); textInput.current.focus(); }}><span className="idea-icon">{createElement(Icon, { size: 22, strokeWidth: 1.5 })}</span><h2>{title}</h2><p>{label}</p><ArrowUpRight className="idea-arrow" size={17} /></button>)}</div><div className="connection-teaser"><span className="connection-icons"><Mail size={17} /><CalendarDays size={17} /><FileText size={17} /></span><span>A home for your tools, too.<small>Email, calendar, and cloud files are on the roadmap.</small></span><button onClick={() => setView('Connections')}>Explore connections<ArrowUpRight size={15} /></button></div></>}
        <div ref={end} />
      </main> : <main className="workspace-panel"><h1>{view === 'Connections' ? 'Bring your world together.' : 'Pick up where you left off.'}</h1><p>{view === 'Connections' ? 'See what works today and what’s coming next.' : 'Conversations and attached text files are stored in this browser. Clear a conversation to remove its local copy.'}</p>{view === 'Connections' ? <div className="connections-list">{connections.map(([name, Icon, description]) => <article key={name}>{createElement(Icon, { size: 24 })}<div><h2>{name}</h2><p>{description}</p></div>{name === 'Travel & booking' ? <Link to="/travel">Explore<ArrowUpRight size={15} /></Link> : <span className="connection-status">Not connected</span>}</article>)}<div className="available-tools"><Check size={18} /> Available now: AI conversation, writing, planning, and local text attachments.</div></div> : <div className="library-list">{history.length ? history.map(c => <article key={c.id}><button disabled={busy} onClick={() => { setActive(c.id); setView('Assistant'); }}><MessageSquare size={20} /><span>{c.title}<small>{c.messages.length} messages · {c.messages.filter(m => m.attachment).length} attachments</small></span></button><button disabled={busy} aria-label={`Delete ${c.title}`} onClick={() => { setHistory(previous => previous.filter(item => item.id !== c.id)); if (active === c.id) setActive(null); }}><Trash2 size={17} /></button></article>) : <div className="library-empty"><Search size={30} /><h2>Your ideas will live here.</h2><p>Start a conversation or attach a text file to get going.</p><button className="new-chat" onClick={newChat}><Plus size={16} /> Start a conversation</button></div>}</div>}</main>}
      <footer className="workspace-footer"><span>One place. More possibilities.</span><Link to="/privacy-policy">Privacy</Link></footer>
    </div>
  </div>;
}
