import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import { Link } from 'react-router-dom';

function SaveFeedback({ id, saved }) {
  if (saved !== id) return null;
  return <span style={{ fontSize: 13.5, color: 'var(--leaf)', fontWeight: 600 }}>✓ Saved</span>;
}

/* ─────────────────────────────────────────────
   Child / Student view - display name + language only
───────────────────────────────────────────── */
function ChildSettings({ user }) {
  const [saved, setSaved] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [language, setLanguage] = useState('en');

  function save(id) {
    setSaved(id);
    setTimeout(() => setSaved(''), 2500);
  }

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Settings</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Change your display name or language.</p>
        </div>
        <Link to="/profile" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>← Profile</Link>
      </div>

      {/* Display name */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, marginBottom: 16 }}>Display Name</h2>
        <div className="input-group">
          <label>Your name</label>
          <input value={name} onChange={e => setName(e.target.value)} maxLength={40} />
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
            This is what shows on your profile and badges. Keep it appropriate - your parent can see it.
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => save('name')}>Save</button>
          <SaveFeedback id="name" saved={saved} />
        </div>
      </div>

      {/* Language */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, marginBottom: 16 }}>Language</h2>
        <div className="input-group">
          <label>Platform language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="yo">Yoruba</option>
            <option value="ig">Igbo</option>
            <option value="ha">Hausa</option>
            <option value="pcm">Nigerian Pidgin</option>
          </select>
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
            Yoruba, Igbo, Hausa, and Pidgin translations are coming soon. English is the full version right now.
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => save('lang')}>Save</button>
          <SaveFeedback id="lang" saved={saved} />
        </div>
      </div>

      {/* Info note - password is managed by parent */}
      <div style={{ background: 'var(--paper-dim)', border: '1px solid var(--line)', borderRadius: 14, padding: '16px 18px' }}>
        <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
          <strong style={{ color: 'var(--ink)' }}>Need to change your password?</strong> Ask your parent - they set it and can update it from their account.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Adult view - full settings (parent / learner / school)
───────────────────────────────────────────── */
function AdultSettings({ user }) {
  const [saved, setSaved] = useState('');
  const [prefs, setPrefs] = useState({
    language: 'en',
    emailNotifs: true,
    progressEmails: true,
    sessionReminders: false,
    dataRetention: true,
  });
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });

  function save(id) {
    setSaved(id);
    setTimeout(() => setSaved(''), 2500);
  }

  return (
    <div className="wrap-narrow" style={{ padding: 'var(--page-py) var(--page-px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Settings</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Manage your account preferences.</p>
        </div>
        <Link to="/profile" className="btn btn-outline" style={{ fontSize: 13.5, padding: '9px 18px' }}>← Profile</Link>
      </div>

      {/* Profile */}
      <section style={{ marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 16 }}>Profile Information</h2>
          <div className="input-group">
            <label>Display name</label>
            <input value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Email address</label>
            <input type="email" value={profileForm.email} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} />
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Changing email requires re-verification - coming in next build.</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={() => save('profile')}>Save Changes</button>
            <SaveFeedback id="profile" saved={saved} />
          </div>
        </div>
      </section>

      {/* Password */}
      <section style={{ marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 6 }}>Change Password</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 16 }}>Leave blank to keep your current password.</p>
          <div className="input-group">
            <label>Current password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="input-group">
            <label>New password</label>
            <input type="password" placeholder="8+ characters" minLength={8} />
          </div>
          <div className="input-group">
            <label>Confirm new password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={() => save('password')}>Update Password</button>
            <SaveFeedback id="password" saved={saved} />
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 10 }}>
            Full implementation in the next build phase.
          </p>
        </div>
      </section>

      {/* Language */}
      <section style={{ marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 16 }}>Language &amp; Accessibility</h2>
          <div className="input-group">
            <label>Platform language</label>
            <select value={prefs.language} onChange={e => setPrefs({ ...prefs, language: e.target.value })}>
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
              <option value="pcm">Nigerian Pidgin</option>
            </select>
            <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              Yoruba, Igbo, Hausa, and Pidgin translations are in progress. English is the current full version.
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="btn btn-primary" onClick={() => save('lang')}>Save</button>
            <SaveFeedback id="lang" saved={saved} />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section style={{ marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 16 }}>Email Notifications</h2>
          {[
            { key: 'emailNotifs',      label: 'Account emails',           desc: 'Security notices, receipts, and important updates' },
            { key: 'progressEmails',   label: 'Weekly progress summary',  desc: "A weekly summary of your child's or your own learning" },
            { key: 'sessionReminders', label: 'Session reminders',        desc: 'Reminders before scheduled in-person sessions' },
          ].map(item => (
            <label key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={prefs[item.key]}
                onChange={e => setPrefs({ ...prefs, [item.key]: e.target.checked })}
                style={{ width: 18, height: 18, accentColor: 'var(--leaf)', cursor: 'pointer', marginTop: 2, flexShrink: 0 }}
              />
              <div>
                <p style={{ fontWeight: 600, fontSize: 14.5, margin: '0 0 2px' }}>{item.label}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>{item.desc}</p>
              </div>
            </label>
          ))}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6 }}>
            <button className="btn btn-primary" onClick={() => save('notifs')}>Save Preferences</button>
            <SaveFeedback id="notifs" saved={saved} />
          </div>
        </div>
      </section>

      {/* Data & Privacy */}
      <section style={{ marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: 17, marginBottom: 8 }}>Data &amp; Privacy</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 16 }}>
            Chat conversations with the AI tutor are retained for up to 12 months so parents can review them at any time. No data is sold to third parties.
          </p>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={prefs.dataRetention}
              onChange={e => setPrefs({ ...prefs, dataRetention: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: 'var(--leaf)', marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
            />
            <div>
              <p style={{ fontWeight: 600, fontSize: 14.5, margin: '0 0 2px' }}>I understand chat history is retained for up to 12 months</p>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                Required for parent visibility. You can request deletion at any time by contacting us.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <div className="card" style={{ border: '1.5px solid rgba(232,97,61,0.3)', background: '#fff9f8' }}>
          <h2 style={{ fontSize: 17, marginBottom: 6, color: 'var(--coral)' }}>Danger Zone</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 16 }}>
            Deleting your account removes all data including child profiles and chat history. This cannot be undone. Account deletion requires a confirmation email - full implementation in the next build phase.
          </p>
          <button className="btn" style={{ background: 'none', color: 'var(--coral)', border: '1.5px solid var(--coral)', fontSize: 13.5 }}>
            Request Account Deletion
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Entry point - branches on role
───────────────────────────────────────────── */
export default function Settings() {
  const { user } = useAuth();
  if (user?.role === 'child') return <ChildSettings user={user} />;
  return <AdultSettings user={user} />;
}
