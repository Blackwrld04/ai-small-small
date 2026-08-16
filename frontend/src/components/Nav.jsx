import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const PUBLIC_NAV = [
  { label: 'For Parents', to: '/for-parents' },
  { label: 'For Schools', to: '/for-schools' },
  { label: 'For Sponsors', to: '/for-sponsors' },
  { label: 'About', to: '/about' },
];

// Role display config - colour + label per role so the user always knows who they're signed in as
const ROLE_CONFIG = {
  parent:  { label: 'Parent',  bg: '#3F8F5F', text: '#fff' },   // leaf green
  child:   { label: 'Student', bg: '#F2A230', text: '#1E3554' }, // marigold
  learner: { label: 'Learner', bg: '#3b82d4', text: '#fff' },   // blue
  school:  { label: 'School',  bg: '#E8613D', text: '#fff' },   // coral
};

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Landing page owns its own full-page header; suppress the global nav there.
  if (location.pathname === '/') return null;

  function handleLogout() {
    logout();
    navigate('/');
  }

  const role = ROLE_CONFIG[user?.role];

  function isActive(path) {
    return location.pathname === path;
  }

  const linkStyle = (path) => ({
    fontSize: 14.5,
    fontWeight: 500,
    color: isActive(path) ? 'var(--indigo)' : 'var(--ink-soft)',
    textDecoration: 'none',
    borderBottom: isActive(path) ? '2px solid var(--marigold)' : '2px solid transparent',
    paddingBottom: 2,
    transition: 'color .15s',
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(251,246,236,0.96)',
      borderBottom: user ? `2px solid ${role?.bg || 'var(--line)'}` : '1px solid var(--line)',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Role identity bar - only when logged in */}
      {user && role && (
        <div style={{
          background: role.bg, color: role.text,
          textAlign: 'center', fontSize: 12,
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700, letterSpacing: '0.06em',
          padding: '4px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <span style={{ opacity: 0.75 }}>Signed in as</span>
          <span>{user.name}</span>
          <span style={{
            background: 'rgba(255,255,255,0.22)', borderRadius: 999,
            padding: '1px 10px', fontSize: 11,
          }}>
            {role.label}
          </span>
          {user.role === 'child' && (
            <span style={{ opacity: 0.75, fontSize: 11 }}>· Your parent can see this session</span>
          )}
        </div>
      )}

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 48px', gap: 16, width: '100%',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 18,
          color: 'var(--indigo)', textDecoration: 'none', flexShrink: 0,
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 9, background: 'var(--indigo)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" fill="#F2A230"/>
            </svg>
          </span>
          AI Small Small
        </Link>

        {/* ── Public nav (logged out) ── */}
        {!user && (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {PUBLIC_NAV.map(n => (
              <Link key={n.to} to={n.to} style={linkStyle(n.to)}>
                {n.label}
              </Link>
            ))}
          </div>
        )}

        {/* ── Authenticated nav - role-specific links ── */}
        {user && (
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Link to="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>

            {/* Child / Learner */}
            {(user.role === 'learner' || user.role === 'child') && (
              <>
                <Link to="/curriculum" style={linkStyle('/curriculum')}>Curriculum</Link>
                <Link to="/chat"       style={linkStyle('/chat')}>AI Tutor</Link>
                <Link to="/progress"   style={linkStyle('/progress')}>Progress</Link>
                <Link to="/chat-history" style={linkStyle('/chat-history')}>Chat History</Link>
              </>
            )}

            {/* Parent */}
            {user.role === 'parent' && (
              <>
                <Link to="/curriculum"   style={linkStyle('/curriculum')}>Curriculum</Link>
                <Link to="/chat-history" style={linkStyle('/chat-history')}>Chat History</Link>
              </>
            )}

            {/* School */}
            {user.role === 'school' && (
              <Link to="/curriculum" style={linkStyle('/curriculum')}>Curriculum</Link>
            )}
          </div>
        )}

        {/* ── Right side: CTA / user menu ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {!user && (
            <>
              <Link to="/login"  className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>Log In</Link>
              <Link to="/signup" className="btn btn-primary"  style={{ fontSize: 13.5, padding: '9px 18px' }}>Get Started</Link>
            </>
          )}

          {user && (
            <>
              {/* Avatar → profile */}
              <Link to="/profile" title="My profile" style={{ textDecoration: 'none' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: role?.bg || 'var(--marigold)',
                  border: `2px solid ${role?.bg || 'var(--marigold)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 14,
                  color: role?.text || 'var(--indigo-deep)',
                  cursor: 'pointer',
                }}>
                  {user.name?.[0]?.toUpperCase()}
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={{ fontSize: 13, padding: '8px 16px' }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
