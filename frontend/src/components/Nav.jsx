import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const PUBLIC_NAV = [
  { label: 'For Parents', to: '/for-parents' },
  { label: 'For Schools', to: '/for-schools' },
  { label: 'For Sponsors', to: '/for-sponsors' },
  { label: 'About', to: '/about' },
];

const ROLE_CONFIG = {
  parent:  { label: 'Parent',  bg: '#3F8F5F', text: '#fff' },
  child:   { label: 'Student', bg: '#F2A230', text: '#1E3554' },
  learner: { label: 'Learner', bg: '#3b82d4', text: '#fff' },
  school:  { label: 'School',  bg: '#E8613D', text: '#fff' },
};

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === '/') return null;

  function handleLogout() {
    logout();
    setMenuOpen(false);
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
    whiteSpace: 'nowrap',
  });

  const authLinks = user
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        ...(user.role === 'learner' || user.role === 'child'
          ? [
              { label: 'Curriculum', to: '/curriculum' },
              { label: 'AI Tutor', to: '/chat' },
              { label: 'Progress', to: '/progress' },
              { label: 'Chat History', to: '/chat-history' },
            ]
          : []),
        ...(user.role === 'parent'
          ? [
              { label: 'Curriculum', to: '/curriculum' },
              { label: 'Chat History', to: '/chat-history' },
            ]
          : []),
        ...(user.role === 'school' ? [{ label: 'Curriculum', to: '/curriculum' }] : []),
      ]
    : [];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(251,246,236,0.96)',
      borderBottom: user ? `2px solid ${role?.bg || 'var(--line)'}` : '1px solid var(--line)',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Role identity bar */}
      {user && role && (
        <div style={{
          background: role.bg, color: role.text,
          textAlign: 'center', fontSize: 12,
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700, letterSpacing: '0.06em',
          padding: '4px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 8, flexWrap: 'wrap',
        }}>
          <span style={{ opacity: 0.75 }}>Signed in as</span>
          <span>{user.name}</span>
          <span style={{ background: 'rgba(255,255,255,0.22)', borderRadius: 999, padding: '1px 10px', fontSize: 11 }}>
            {role.label}
          </span>
          {user.role === 'child' && (
            <span style={{ opacity: 0.75, fontSize: 11 }}>· Parent can see this session</span>
          )}
        </div>
      )}

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', gap: 12, width: '100%',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 17,
          color: 'var(--indigo)', textDecoration: 'none', flexShrink: 0,
        }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" fill="#F2A230"/>
            </svg>
          </span>
          <span className="nav-wordmark">AI Small Small</span>
        </Link>

        {/* Desktop centre links — hidden via overflow on small screens */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1, justifyContent: 'center', overflow: 'hidden' }}>
          {!user && PUBLIC_NAV.map(n => (
            <Link key={n.to} to={n.to} style={{ ...linkStyle(n.to), display: 'none' }} className="nav-desktop-link">{n.label}</Link>
          ))}
          {user && authLinks.map(n => (
            <Link key={n.to} to={n.to} style={{ ...linkStyle(n.to), display: 'none' }} className="nav-desktop-link">{n.label}</Link>
          ))}
        </div>

        {/* Right: CTA / avatar / burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {!user && (
            <>
              <Link to="/login"  className="btn btn-outline nav-desktop-link" style={{ fontSize: 13, padding: '8px 14px' }}>Log In</Link>
              <Link to="/signup" className="btn btn-primary"  style={{ fontSize: 13, padding: '8px 14px' }}>Get Started</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/profile" title="My profile" style={{ textDecoration: 'none' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: role?.bg || 'var(--marigold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 13,
                  color: role?.text || 'var(--indigo-deep)', cursor: 'pointer', flexShrink: 0,
                }}>
                  {user.name?.[0]?.toUpperCase()}
                </div>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline nav-desktop-link" style={{ fontSize: 13, padding: '7px 14px' }}>
                Log Out
              </button>
            </>
          )}

          {/* Burger — only on mobile */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="nav-burger"
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexShrink: 0, display: 'none' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="2.2">
              {menuOpen
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          padding: '12px 20px 18px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {(!user ? PUBLIC_NAV : authLinks).map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '11px 4px',
                borderBottom: '1px solid var(--line)',
                fontSize: 15, fontWeight: 500,
                color: isActive(n.to) ? 'var(--indigo)' : 'var(--ink)',
                textDecoration: 'none',
              }}
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              style={{
                marginTop: 10, width: '100%', textAlign: 'center',
                background: 'none', border: '1.5px solid var(--indigo)',
                borderRadius: 999, padding: '10px 0',
                fontSize: 14, fontWeight: 600, color: 'var(--indigo)', cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          )}
          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{ display: 'block', marginTop: 10, textAlign: 'center', padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'var(--indigo)', textDecoration: 'none' }}>
              Log In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
