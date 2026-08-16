import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';
import OnboardingModal from '../components/OnboardingModal.jsx';

const ROLES = [
  { id: 'parent',  title: 'Parent',           desc: "Supporting my child's learning - I'll manage their account" },
  { id: 'learner', title: 'Learner (16+)',     desc: 'Learning on my own - independent account' },
  { id: 'school',  title: 'School / Educator', desc: 'Setting up a class or pilot programme' },
];

const QUOTES = [
  { text: "The kids who learn to use AI well now will be the engineers of 2040.", attr: "AI Small Small" },
  { text: "Prompt engineering is to the 2030s what computer literacy was to the 2000s.", attr: "AI Small Small" },
  { text: "Teaching kids to think with AI - not just get answers from it.", attr: "AI Small Small" },
];

export default function SignUp() {
  const [step, setStep]         = useState(1);
  const [role, setRole]         = useState('');
  const [form, setForm]         = useState({ name: '', email: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [quoteIdx]              = useState(() => Math.floor(Math.random() * QUOTES.length));
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.signup({ ...form, role });
      login(data.token, data.user);
      setShowOnboarding(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (showOnboarding) {
    return <OnboardingModal role={role} onComplete={() => { setShowOnboarding(false); navigate('/dashboard'); }} />;
  }

  const q = QUOTES[quoteIdx];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)', width: '100%' }}>

      {/* ── Left panel - image ── */}
      <div style={{
        flex: '1 1 45%',
        background: '#c9a87c',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: 500,
      }}>
        <img
          src="/images/sign2.jpg"
          alt="Learning with technology illustration"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.9,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(21,38,64,0.9) 0%, rgba(21,38,64,0.15) 55%, transparent 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '40px 48px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 24,
          }}>
            <p style={{ color: '#fff', fontSize: 15.5, fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.55 }}>
              "{q.text}"
            </p>
            <p style={{ color: 'var(--marigold)', fontSize: 12.5, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, margin: 0 }}>
              - {q.attr}
            </p>
          </div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(20px,2vw,26px)', margin: '0 0 8px', lineHeight: 1.25 }}>
            Join <span style={{ color: 'var(--marigold)' }}>AI Small Small</span>
          </h2>
          <p style={{ color: 'rgba(251,246,236,0.72)', fontSize: 14, margin: 0 }}>
            Ages 7–17 · AI literacy + Nigerian curriculum
          </p>
        </div>
      </div>

      {/* ── Right panel - form ── */}
      <div style={{
        flex: '1 1 55%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--paper)',
        padding: '48px 32px',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 460 }}>
          <h1 style={{ fontSize: 26, marginBottom: 6 }}>
            {step === 1 ? 'Create your account' : `Sign up as a ${ROLES.find(r => r.id === role)?.title.toLowerCase()}`}
          </h1>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 26, fontSize: 14.5 }}>
            {step === 1 ? 'Choose what best describes you.' : 'Just a few details to get started.'}
          </p>

          {step === 1 && (
            <div>
              {ROLES.map(r => (
                <div key={r.id} className={`role-card ${role === r.id ? 'selected' : ''}`}
                  onClick={() => setRole(r.id)}>
                  <div>
                    <h4>{r.title}</h4>
                    <p>{r.desc}</p>
                  </div>
                  <span style={{ color: 'var(--indigo)', opacity: role === r.id ? 1 : 0.3, fontSize: 18 }}>✓</span>
                </div>
              ))}
              <button className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
                disabled={!role}
                onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Full name</label>
                <input required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input required type="password" minLength={8} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="8+ characters" />
              </div>
              {error && <p className="error-text" style={{ marginBottom: 14 }}>{error}</p>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Creating account…' : 'Create account'}
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
            <p style={{ fontSize: 14, margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--indigo)', fontWeight: 600 }}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
