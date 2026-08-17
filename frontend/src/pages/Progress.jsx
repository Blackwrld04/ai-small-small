import { useAuth } from '../AuthContext.jsx';
import { Link } from 'react-router-dom';

const ALL_BADGES = [
  { id: 'first_steps', name: 'First Steps',       desc: 'Completed your first module',          emoji: '👟', earned: true,  xp: 50  },
  { id: 'prompter',    name: 'Prompter',           desc: 'Wrote 3 great prompts',                emoji: '💬', earned: true,  xp: 50  },
  { id: 'fact_checker',name: 'Fact Checker',       desc: 'Caught an AI hallucination',           emoji: '🔍', earned: false, xp: 75  },
  { id: 'builder',     name: 'Builder',            desc: 'Completed your first no-code project', emoji: '🔨', earned: false, xp: 100 },
  { id: 'ethicist',    name: 'Ethicist',           desc: 'Completed the AI Ethics module',       emoji: '⚖️', earned: false, xp: 75  },
  { id: 'streak_7',    name: '7-Day Streak',       desc: 'Learned 7 days in a row',              emoji: '🔥', earned: false, xp: 100 },
  { id: 'innovator',   name: 'Kid Innovator',      desc: 'Submitted a showcase project',         emoji: '🌟', earned: false, xp: 200 },
  { id: 'graduate',    name: 'Level 1 Graduate',   desc: 'Completed all Level 1 modules',        emoji: '🎓', earned: false, xp: 150 },
];

const MODULES = [
  { id: 1, title: 'What Is AI?',                    track: 'Track A · Level 1', done: true,  xp: 50,  date: 'Jan 12, 2026' },
  { id: 2, title: 'Talking to AI Nicely',           track: 'Track A · Level 1', done: true,  xp: 50,  date: 'Jan 14, 2026' },
  { id: 3, title: 'AI Can Get Things Wrong',        track: 'Track A · Level 1', done: false, xp: 75,  current: true },
  { id: 4, title: 'My AI Safety Rules',             track: 'Track A · Level 1', done: false, xp: 75  },
  { id: 5, title: 'How AI Actually Works',          track: 'Track A · Level 2', done: false, xp: 100 },
  { id: 6, title: 'The AI Tools I Already Use',     track: 'Track A · Level 2', done: false, xp: 100 },
  { id: 7, title: 'The Art of Prompting',           track: 'Track A · Level 2', done: false, xp: 125 },
];

export default function Progress() {
  const { user } = useAuth();
  const earnedBadges  = ALL_BADGES.filter(b => b.earned);
  const totalXp       = MODULES.filter(m => m.done).reduce((s, m) => s + m.xp, 0);
  const doneModules   = MODULES.filter(m => m.done).length;
  const pct           = Math.round((doneModules / MODULES.length) * 100);
  const xpToNext      = 500;

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>My Progress</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Your learning journey at a glance.</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>← Dashboard</Link>
      </div>

      {/* ── XP level card ── */}
      <div className="card" style={{ background: 'var(--indigo)', border: 'none', padding: '28px 28px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--marigold)' }}>Level 1 · AI Explorers</span>
            <h2 style={{ color: 'var(--paper)', fontSize: 24, margin: '8px 0 4px' }}>{totalXp} Energy Points</h2>
            <p style={{ color: 'rgba(251,246,236,0.65)', fontSize: 13.5, margin: 0 }}>
              {xpToNext - totalXp} XP to Level 2
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 40, lineHeight: 1 }}>🔥</div>
            <p style={{ color: 'var(--marigold)', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, margin: '4px 0 0', fontWeight: 700 }}>
              1 day streak
            </p>
          </div>
        </div>
        {/* XP bar */}
        <div style={{ height: 10, background: 'rgba(255,255,255,0.15)', borderRadius: 99 }}>
          <div style={{
            height: '100%',
            width: `${Math.min((totalXp / xpToNext) * 100, 100)}%`,
            background: 'var(--marigold)',
            borderRadius: 99,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11.5, color: 'rgba(251,246,236,0.5)', fontFamily: "'IBM Plex Mono',monospace" }}>0 XP</span>
          <span style={{ fontSize: 11.5, color: 'rgba(251,246,236,0.5)', fontFamily: "'IBM Plex Mono',monospace" }}>{xpToNext} XP</span>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Modules done',   value: `${doneModules}/${MODULES.length}`, color: 'var(--leaf)' },
          { label: 'Badges earned',  value: `${earnedBadges.length}/${ALL_BADGES.length}`, color: 'var(--marigold-deep)' },
          { label: 'Day streak',     value: '1 🔥',  color: 'var(--coral)' },
          { label: 'Energy Points',  value: `${totalXp} XP`, color: 'var(--indigo)' },
        ].map(s => (
          <div className="card" key={s.label} style={{ padding: '14px 12px', textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: s.color, margin: 0, lineHeight: 1.2 }}>
              {s.value}
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '4px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Module list ── */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 18 }}>Module Progress</h2>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontFamily: "'IBM Plex Mono',monospace" }}>
            {pct}% complete
          </span>
        </div>

        {/* progress bar */}
        <div style={{ height: 7, background: 'var(--paper-dim)', borderRadius: 99, marginBottom: 16, border: '1px solid var(--line)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--leaf)', borderRadius: 99 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MODULES.map(m => (
            <div key={m.id} style={{
              background: m.done ? 'var(--paper-dim)' : '#fff',
              border: m.current ? '2px solid var(--marigold)' : '1px solid var(--line)',
              borderRadius: 12,
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              {/* Status circle */}
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: m.done ? 'var(--leaf)' : m.current ? 'var(--marigold)' : 'var(--paper-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {m.done ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <span style={{ fontSize: 12, fontWeight: 700, color: m.current ? 'var(--indigo-deep)' : 'var(--ink-soft)' }}>
                    {m.id}
                  </span>
                )}
              </div>

              {/* Title + meta */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: '0 0 2px', fontWeight: 600, fontSize: 14,
                  color: m.done ? 'var(--ink-soft)' : 'var(--ink)',
                  textDecoration: m.done ? 'line-through' : 'none',
                }}>
                  {m.title}
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'var(--ink-soft)', fontFamily: "'IBM Plex Mono',monospace" }}>
                  {m.track}{m.date ? ` · ${m.date}` : ''}
                </p>
              </div>

              {/* XP pill + optional Start button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{
                  fontSize: 12, fontWeight: 700,
                  color: m.done ? 'var(--leaf-deep)' : 'var(--marigold-deep)',
                  fontFamily: "'IBM Plex Mono',monospace",
                  background: m.done ? 'rgba(63,143,95,0.1)' : 'rgba(242,162,48,0.12)',
                  padding: '3px 10px', borderRadius: 999,
                }}>
                  {m.done ? '✓' : '+'}{m.xp} XP
                </span>
                {m.current && (
                  <Link to="/chat" className="btn btn-primary" style={{ fontSize: 12.5, padding: '6px 14px' }}>
                    Start
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Badges ── */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18 }}>Badges</h2>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
            {earnedBadges.length} of {ALL_BADGES.length} earned
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {ALL_BADGES.map(b => (
            <div key={b.id} style={{
              background: b.earned ? '#fff' : 'var(--paper-dim)',
              border: `1.5px solid ${b.earned ? 'var(--marigold)' : 'var(--line)'}`,
              borderRadius: 16,
              padding: '20px 16px',
              textAlign: 'center',
              opacity: b.earned ? 1 : 0.45,
              filter: b.earned ? 'none' : 'grayscale(80%)',
            }}>
              <div style={{ fontSize: 34, marginBottom: 8, lineHeight: 1 }}>{b.emoji}</div>
              <p style={{ fontWeight: 700, fontSize: 13.5, margin: '0 0 4px', color: 'var(--ink)' }}>{b.name}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '0 0 8px', lineHeight: 1.4 }}>{b.desc}</p>
              <span style={{
                fontSize: 11.5, fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700,
                color: b.earned ? 'var(--leaf-deep)' : 'var(--ink-soft)',
                background: b.earned ? 'rgba(63,143,95,0.1)' : 'rgba(0,0,0,0.04)',
                padding: '3px 10px', borderRadius: 999, display: 'inline-block',
              }}>
                +{b.xp} XP
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
