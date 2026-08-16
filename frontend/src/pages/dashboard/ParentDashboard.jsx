import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api.js';
import { useAuth } from '../../AuthContext.jsx';

const BAND_LABELS = { A: 'Ages 7–9 · Primary 2–4', B: 'Ages 10–12 · Primary 5–6 / JSS1', C: 'Ages 13–15 · JSS2–SS1', D: 'Ages 16–17 · SS1–SS3' };

export default function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [justCreated, setJustCreated] = useState('');

  async function loadChildren() {
    try { setChildren(await api.getChildren()); }
    catch (err) { setError(err.message); }
  }

  useEffect(() => { loadChildren(); }, []);

  async function handleAddChild(e) {
    e.preventDefault();
    setError('');
    try {
      const child = await api.addChild({ ...form, age: Number(form.age) });
      setForm({ name: '', age: '', username: '', password: '' });
      setShowForm(false);
      setJustCreated(child.username);
      loadChildren();
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 10 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Welcome, {user.name}</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Manage your children's learning and stay informed.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/curriculum" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 16px' }}>Browse Curriculum</Link>
        </div>
      </div>

      {/* Welcome banner when empty */}
      {children.length === 0 && !showForm && (
        <div className="card" style={{ background: 'var(--indigo)', border: 'none', marginBottom: 24, padding: '28px 30px', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <span className="eyebrow" style={{ color: 'var(--marigold)' }}>Getting started</span>
            <h2 style={{ color: 'var(--paper)', fontSize: 20, margin: '8px 0 8px' }}>Add your first child to begin</h2>
            <p style={{ color: 'rgba(251,246,236,0.78)', fontSize: 14.5, margin: 0 }}>
              You'll set their username and password. They log in at <strong style={{ color: 'var(--marigold)' }}>/kid-login</strong> with those credentials.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add a Child</button>
        </div>
      )}

      {/* Success notice */}
      {justCreated && (
        <div className="card" style={{ background: '#f0f9f4', border: '1.5px solid rgba(63,143,95,0.3)', marginBottom: 20, padding: 16 }}>
          <p style={{ fontSize: 14.5, margin: 0 }}>
            <span style={{ color: 'var(--leaf)', fontWeight: 700 }}>✓ Done!</span> Account <strong>@{justCreated}</strong> created. Write down the username and password - your child uses these to log in at <strong>/kid-login</strong>.
          </p>
        </div>
      )}

      {/* Children grid */}
      {(children.length > 0 || showForm) && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18 }}>Your Children</h2>
            {children.length > 0 && !showForm && (
              <button className="btn btn-outline" style={{ fontSize: 13, padding: '8px 16px' }} onClick={() => setShowForm(true)}>+ Add Another</button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18, marginBottom: 24 }}>
            {children.map(child => (
              <div className="card" key={child.id} style={{ padding: '22px 24px' }}>
                {/* Avatar row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--marigold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--indigo-deep)', flexShrink: 0 }}>
                    {child.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, margin: '0 0 2px' }}>{child.name}</h3>
                    <span style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", color: 'var(--ink-soft)' }}>@{child.username} · Age {child.age}</span>
                  </div>
                </div>

                {/* Band info */}
                <div style={{ background: 'var(--paper-dim)', borderRadius: 10, padding: '10px 14px', marginBottom: 14 }}>
                  <p style={{ fontSize: 12, fontFamily: "'IBM Plex Mono',monospace", color: 'var(--leaf-deep)', fontWeight: 700, margin: '0 0 2px' }}>CURRICULUM BAND {child.trackBBand}</p>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: 0 }}>{BAND_LABELS[child.trackBBand]}</p>
                </div>

                {/* This week placeholder */}
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>THIS WEEK</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>No sessions recorded yet - activity will appear here after their first session.</p>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link to="/curriculum" className="btn btn-outline" style={{ fontSize: 12.5, padding: '7px 12px', flex: 1, justifyContent: 'center' }}>Curriculum</Link>
                  <Link to={`/chat-history?child=${child.id}`} className="btn btn-outline" style={{ fontSize: 12.5, padding: '7px 12px', flex: 1, justifyContent: 'center' }}>Chat History</Link>
                </div>
              </div>
            ))}

            {/* Add child form card */}
            {showForm && (
              <div className="card" style={{ padding: '22px 24px' }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Add a Child</h3>
                <form onSubmit={handleAddChild}>
                  <div className="input-group">
                    <label>Child's name</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <label>Age</label>
                    <input required type="number" min="7" max="17" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                  </div>
                  <div className="input-group">
                    <label>Child's username</label>
                    <input required placeholder="e.g. bluemonkey128" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                    <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Letters and numbers only - avoid their real name.</span>
                  </div>
                  <div className="input-group">
                    <label>Child's password</label>
                    <input required type="password" minLength={8} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  </div>
                  {error && <p className="error-text" style={{ marginBottom: 10 }}>{error}</p>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="btn btn-outline" style={{ fontSize: 13 }} onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>Create Profile</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </>
      )}

      {/* Info strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 8 }}>
        <div className="card" style={{ background: 'var(--paper-dim)' }}>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>How the child login works</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
            Your child logs in at <strong>/kid-login</strong> - not the regular login page. They use the username and password you created for them. They can't sign up themselves.
          </p>
        </div>
        <div className="card" style={{ background: 'var(--paper-dim)' }}>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Chat visibility</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
            Every conversation your child has with the AI tutor is visible to you from their chat history link. Nothing is hidden.
          </p>
        </div>
        <div className="card" style={{ background: 'var(--paper-dim)' }}>
          <h3 style={{ fontSize: 15, marginBottom: 6 }}>Kid Innovator showcase</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
            Every term ends with a showcase where children present a project. Beginner level is a drawing and description - no coding needed.
          </p>
        </div>
      </div>
    </div>
  );
}
