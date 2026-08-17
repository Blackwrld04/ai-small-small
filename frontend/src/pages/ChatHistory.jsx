import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

export default function ChatHistory() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(searchParams.get('child') || '');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user.role === 'parent') {
      api.getChildren().then(kids => {
        setChildren(kids);
        if (!selectedChild && kids.length) setSelectedChild(kids[0].id);
      });
    } else if (user.role === 'child') {
      setSelectedChild(user.id);
    }
  }, []);

  useEffect(() => {
    if (!selectedChild) return;
    setLoading(true);
    setError('');
    api.getChatHistory(selectedChild)
      .then(data => setLogs(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedChild]);

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Chat History</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 24, fontSize: 14.5 }}>
        Every conversation with the AI tutor, in full - nothing hidden.
      </p>

      {user.role === 'parent' && children.length > 0 && (
        <div className="input-group" style={{ maxWidth: 260, marginBottom: 20 }}>
          <label>Viewing chats for</label>
          <select value={selectedChild} onChange={e => setSelectedChild(e.target.value)}>
            {children.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      )}

      {user.role === 'parent' && children.length === 0 && (
        <div className="card"><p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>Add a child profile from your dashboard to see chat history here.</p></div>
      )}

      {loading && <p style={{ color: 'var(--ink-soft)' }}>Loading…</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && selectedChild && logs.length === 0 && (
        <div className="card"><p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}>No conversations yet.</p></div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {logs.map(log => (
          <div className="card" key={log.id} style={{ padding: 18 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
              {new Date(log.createdAt).toLocaleString()}
              {log.flagged && <span style={{ color: 'var(--coral)', marginLeft: 10, fontWeight: 600 }}>⚠ Flagged</span>}
            </div>
            <p style={{ fontSize: 14.5, marginBottom: 8 }}><strong>Message:</strong> {log.message}</p>
            <p style={{ fontSize: 14.5, color: 'var(--ink-soft)' }}><strong>Tutor:</strong> {log.reply}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
