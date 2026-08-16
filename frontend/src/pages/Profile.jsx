import { useAuth } from '../AuthContext.jsx';
import { Link } from 'react-router-dom';

const BADGES = [
  { id: 'first_steps', name: 'First Steps', emoji: '👟', earned: true },
  { id: 'prompter', name: 'Prompter', emoji: '💬', earned: true },
  { id: 'fact_checker', name: 'Fact Checker', emoji: '🔍', earned: false },
  { id: 'builder', name: 'Builder', emoji: '🔨', earned: false },
];

export default function Profile() {
  const { user } = useAuth();
  const xp = 100;
  const level = 1;
  const streak = 1;

  const roleLabel = { parent: 'Parent', learner: 'Learner (16+)', school: 'School / Educator', child: 'Student' };

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <h1 style={{ fontSize: 28 }}>My Profile</h1>
        <Link to="/settings" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>Settings</Link>
      </div>

      {/* Avatar + name card */}
      <div className="card" style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18, padding: '22px 24px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 28, color: 'var(--marigold)', flexShrink: 0 }}>
          {user?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>{user?.name}</h2>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '0 0 6px' }}>{user?.email}</p>
          <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", background: 'var(--paper-dim)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 8, color: 'var(--indigo)', fontWeight: 600 }}>
            {roleLabel[user?.role] || user?.role}
          </span>
        </div>
      </div>

      {/* Stats - only show for learner/child */}
      {(user?.role === 'learner' || user?.role === 'child') && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 18 }}>
          <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
            <p style={{ fontSize: 24, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--marigold-deep)', margin: 0 }}>{xp}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '2px 0 0' }}>XP</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
            <p style={{ fontSize: 24, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--indigo)', margin: 0 }}>Lv.{level}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '2px 0 0' }}>Level</p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
            <p style={{ fontSize: 24, fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, color: 'var(--coral)', margin: 0 }}>{streak}🔥</p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '2px 0 0' }}>Streak</p>
          </div>
        </div>
      )}

      {/* Badges - only for learner/child */}
      {(user?.role === 'learner' || user?.role === 'child') && (
        <div className="card" style={{ marginBottom: 18, padding: '20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 16 }}>Badges</h3>
            <Link to="/progress" style={{ fontSize: 13, color: 'var(--leaf-deep)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {BADGES.map(b => (
              <div key={b.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                opacity: b.earned ? 1 : 0.3, filter: b.earned ? 'none' : 'grayscale(100%)',
              }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: b.earned ? 'var(--paper-dim)' : '#f0f0f0', border: `2px solid ${b.earned ? 'var(--marigold)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {b.emoji}
                </div>
                <span style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', maxWidth: 60 }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account info */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: 16, marginBottom: 14 }}>Account Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <span className="eyebrow">Name</span>
            <p style={{ fontSize: 15, marginTop: 4, marginBottom: 0 }}>{user?.name}</p>
          </div>
          <div>
            <span className="eyebrow">Email</span>
            <p style={{ fontSize: 15, marginTop: 4, marginBottom: 0 }}>{user?.email || '-'}</p>
          </div>
          <div>
            <span className="eyebrow">Account type</span>
            <p style={{ fontSize: 15, marginTop: 4, marginBottom: 0, textTransform: 'capitalize' }}>{roleLabel[user?.role] || user?.role}</p>
          </div>
        </div>
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          <Link to="/settings" className="btn btn-outline" style={{ fontSize: 14 }}>Manage Settings</Link>
        </div>
      </div>
    </div>
  );
}
