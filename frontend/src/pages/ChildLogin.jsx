import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

const FUN_FACTS = [
  "Did you know? AI can write poetry, but it still can't feel proud of it. You can! 🎉",
  "Today's skill: A good prompt is like a good question - be specific and curious. 💡",
  "Fun fact: The word 'robot' comes from a Czech word meaning 'hard work'. 🤖",
  "AI learns from patterns - just like your brain does when you practise something. 🧠",
  "You're learning something most adults haven't been taught yet. Keep going! ⭐",
];

export default function ChildLogin() {
  const [form, setForm]       = useState({ username: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [factIdx]             = useState(() => Math.floor(Math.random() * FUN_FACTS.length));
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.childLogin(form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="split-page">

      {/* ── Left panel - image + fun fact ── */}
      <div className="split-panel-image" style={{
        background: '#f0ece3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        gap: 20,
      }}>
        {/* Brain-bulb card */}
        <div style={{
          width: '100%', maxWidth: 300,
          background: '#fff',
          borderRadius: 28,
          padding: '32px 28px 24px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.09)',
          textAlign: 'center',
        }}>
          <img
            src="/images/sign3.jpg"
            alt="Brain lightbulb - think big!"
            style={{ width: '70%', maxWidth: 180, display: 'block', margin: '0 auto 16px' }}
          />
          <h2 style={{ fontSize: 18, color: 'var(--indigo)', marginBottom: 6 }}>
            Ready to learn something cool?
          </h2>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
            Your AI Small Small session is waiting.
          </p>
        </div>

        {/* Fun fact card */}
        <div style={{
          width: '100%', maxWidth: 300,
          background: 'var(--indigo)',
          borderRadius: 18,
          padding: '18px 22px',
        }}>
          <p style={{ fontSize: 11.5, fontFamily: "'IBM Plex Mono', monospace", color: 'var(--marigold)', fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Did you know?
          </p>
          <p style={{ fontSize: 13.5, color: 'rgba(251,246,236,0.88)', margin: 0, lineHeight: 1.55 }}>
            {FUN_FACTS[factIdx]}
          </p>
        </div>
      </div>

      {/* ── Right panel - form ── */}
      <div className="split-panel-form">
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'var(--marigold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, flexShrink: 0,
            }}>
              ⭐
            </div>
            <div>
              <h1 style={{ fontSize: 24, marginBottom: 2 }}>Kid Login</h1>
              <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, margin: 0 }}>
                Use the username and password your parent created.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                required
                autoCapitalize="none"
                autoCorrect="off"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="e.g. bluemonkey128"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}
              disabled={loading}>
              {loading ? 'Logging in…' : "Let's go! 🚀"}
            </button>
          </form>

          <div style={{
            marginTop: 20,
            background: 'var(--paper-dim)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            padding: '14px 16px',
          }}>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Forgotten your username or password?</strong><br />
              Ask your parent - they set it and can update it from their account.
            </p>
          </div>

          <p style={{ marginTop: 16, fontSize: 13.5, color: 'var(--ink-soft)' }}>
            Parent or school?{' '}
            <Link to="/login" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
