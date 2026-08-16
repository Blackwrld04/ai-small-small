import { useState, useRef, useEffect } from 'react';
import { api } from '../api.js';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Want help with your homework, or want to practice a skill today?" },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(m => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setSending(true);
    try {
      const { reply } = await api.sendChat({ message: userMsg });
      setMessages(m => [...m, { from: 'bot', text: reply }]);
    } catch {
      setMessages(m => [...m, { from: 'bot', text: "Something went wrong - try again in a moment." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>AI Tutor</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 20, fontSize: 14 }}>
        Parents can see this whole conversation - nothing here is hidden.
      </p>
      <div className="card" style={{ height: 420, display: 'flex', flexDirection: 'column', padding: 20 }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <div style={{
                background: m.from === 'user' ? 'var(--marigold)' : 'var(--paper-dim)',
                color: m.from === 'user' ? 'var(--indigo-deep)' : 'var(--ink)',
                borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                padding: '10px 14px', fontSize: 14.5,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message…"
            style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--line)' }}
          />
          <button className="btn btn-primary" disabled={sending}>{sending ? '…' : 'Send'}</button>
        </form>
      </div>
    </div>
  );
}
