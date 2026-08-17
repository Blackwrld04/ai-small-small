import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(form);
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

      {/* ── Left panel - image ── */}
      <div className="split-panel-image" style={{ background: 'var(--indigo)' }}>
        <img
          src="/images/sign1.jpg"
          alt="Online learning illustration"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.88,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(21,38,64,0.92) 0%, rgba(21,38,64,0.3) 60%, transparent 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '40px 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--marigold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" fill="#1E3554"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 18, color: '#fff' }}>AI Small Small</span>
          </div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: 10, lineHeight: 1.2 }}>
            Help your child use AI to<br /><span style={{ color: 'var(--marigold)' }}>think better</span>.
          </h2>
          <p style={{ color: 'rgba(251,246,236,0.75)', fontSize: 15, margin: 0 }}>
            AI literacy + Nigerian curriculum support for kids 7–17.
          </p>
        </div>
      </div>

      {/* ── Right panel - form ── */}
      <div className="split-panel-form">
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: 28, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 28, fontSize: 14.5 }}>
            Log in to your AI Small Small account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input required type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input required type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}
            <button type="submit" className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 14 }}
              disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 14, margin: 0 }}>
              No account yet?{' '}
              <Link to="/signup" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Sign up</Link>
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              Logging in as a kid?{' '}
              <Link to="/kid-login" style={{ color: 'var(--leaf-deep)', fontWeight: 600 }}>Kid login →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
