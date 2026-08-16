import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

const MODULES = [
  { id: 1, title: 'What Is AI?', track: 'Track A · Level 1', done: true, xp: 50 },
  { id: 2, title: 'Talking to AI Nicely', track: 'Track A · Level 1', done: true, xp: 50 },
  { id: 3, title: 'AI Can Get Things Wrong', track: 'Track A · Level 1', done: false, xp: 75, current: true },
  { id: 4, title: 'My AI Safety Rules', track: 'Track A · Level 1', done: false, xp: 75 },
  { id: 5, title: 'How AI Actually Works', track: 'Track A · Level 2', done: false, xp: 100 },
];

export default function LearnerDashboard() {
  const { user } = useAuth();
  const completed = MODULES.filter(m => m.done).length;
  const pct = Math.round((completed / MODULES.length) * 100);
  const xp = MODULES.filter(m => m.done).reduce((s, m) => s + m.xp, 0);

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Welcome back, {user.name}</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Pick up where you left off.</p>
        </div>
        <Link to="/progress" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>My Progress</Link>
      </div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 14, marginBottom: 32 }}>
        <div className="card" style={{ padding: '16px 18px', textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--marigold-deep)', margin: 0 }}>{xp}</p>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '2px 0 0' }}>Energy Points</p>
        </div>
        <div className="card" style={{ padding: '16px 18px', textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--leaf)', margin: 0 }}>{completed}</p>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '2px 0 0' }}>Modules done</p>
        </div>
        <div className="card" style={{ padding: '16px 18px', textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--indigo)', margin: 0 }}>1</p>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '2px 0 0' }}>Day streak 🔥</p>
        </div>
        <div className="card" style={{ padding: '16px 18px', textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--coral)', margin: 0 }}>Lv.1</p>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '2px 0 0' }}>AI Literacy level</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,0.6fr)', gap: 22 }}>
        {/* Left: modules */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 18 }}>Your Modules</h2>
            <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>{completed}/{MODULES.length} complete</span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 8, background: 'var(--paper-dim)', borderRadius: 99, marginBottom: 18, border: '1px solid var(--line)' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--leaf)', borderRadius: 99, transition: 'width .4s' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODULES.map(m => (
              <div key={m.id} className="card" style={{
                padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                border: m.current ? '2px solid var(--marigold)' : '1px solid var(--line)',
                background: m.done ? 'var(--paper-dim)' : '#fff',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: m.done ? 'var(--leaf)' : m.current ? 'var(--marigold)' : 'var(--paper-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {m.done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 700, color: m.current ? 'var(--indigo)' : 'var(--ink-soft)' }}>{m.id}</span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: 14.5, color: m.done ? 'var(--ink-soft)' : 'var(--ink)', textDecoration: m.done ? 'line-through' : 'none' }}>{m.title}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-soft)', fontFamily: "'IBM Plex Mono',monospace" }}>{m.track}</p>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--marigold-deep)', fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace" }}>+{m.xp} XP</span>
                  {m.current && (
                    <Link to="/chat" className="btn btn-primary" style={{ fontSize: 12.5, padding: '7px 14px' }}>Start</Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <Link to="/curriculum" className="btn btn-outline" style={{ fontSize: 14 }}>Browse Full Curriculum</Link>
            <Link to="/chat" className="btn btn-primary" style={{ fontSize: 14 }}>Talk to AI Tutor</Link>
          </div>
        </div>

        {/* Right: Kid Innovator + quick links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Kid Innovator */}
          <div className="card" style={{ background: 'var(--indigo)', border: 'none', padding: '24px' }}>
            <span className="eyebrow" style={{ color: 'var(--marigold)' }}>Kid Innovator</span>
            <h3 style={{ color: 'var(--paper)', fontSize: 17, margin: '8px 0 10px' }}>Term 1 Showcase</h3>
            <p style={{ color: 'rgba(251,246,236,0.75)', fontSize: 13.5, marginBottom: 14 }}>Build an AI-assisted idea to present at the end-of-term showcase. Beginner level: a drawing + description of your idea.</p>
            <button className="btn" style={{ background: 'var(--marigold)', color: 'var(--indigo-deep)', fontSize: 13, padding: '9px 16px', width: '100%', justifyContent: 'center' }}>
              Start My Project
            </button>
          </div>

          {/* Badges */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: 16, marginBottom: 14 }}>Badges</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { name: 'First Steps', earned: true, emoji: '👟' },
                { name: 'Prompter', earned: true, emoji: '💬' },
                { name: 'Fact Checker', earned: false, emoji: '🔍' },
                { name: 'Builder', earned: false, emoji: '🔨' },
              ].map(b => (
                <div key={b.name} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  opacity: b.earned ? 1 : 0.35, filter: b.earned ? 'none' : 'grayscale(100%)',
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: b.earned ? 'var(--paper-dim)' : '#f0f0f0', border: `2px solid ${b.earned ? 'var(--marigold)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {b.emoji}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 54 }}>{b.name}</span>
                </div>
              ))}
            </div>
            <Link to="/progress" style={{ display: 'block', marginTop: 14, fontSize: 13, color: 'var(--leaf-deep)', fontWeight: 600 }}>View all badges →</Link>
          </div>

          {/* Chat history */}
          <Link to="/chat-history" className="card" style={{ display: 'block', padding: '18px 20px', textDecoration: 'none' }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>Chat History</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>Review all your AI tutor conversations.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
