import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const css = `
  .fp-page { background: var(--paper); color: var(--ink); font-family: 'Work Sans', sans-serif; }

  /* hero */
  .fp-hero {
    background: var(--leaf); color: var(--paper);
    padding: 80px 0 72px; position: relative; overflow: hidden;
  }
  .fp-hero .adire {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10px 10px, rgba(251,246,236,0.18) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(251,246,236,0.05) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px;
  }
  .fp-hero-inner {
    position: relative; z-index: 2;
    width: 100%; padding: 0 48px;
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center;
  }
  .fp-hero h1 { color: var(--paper); font-size: clamp(32px,4.5vw,52px); line-height:1.08; margin-bottom:18px; }
  .fp-hero h1 em { font-style:normal; color: var(--marigold); }
  .fp-hero .lead { font-size: clamp(15px,1.6vw,18px); color: rgba(251,246,236,0.88); margin-bottom: 28px; max-width: 46ch; }
  .fp-actions { display: flex; gap: 12px; flex-wrap: wrap; }

  /* preview card */
  .fp-preview-card {
    background: rgba(251,246,236,0.12); border: 1px solid rgba(251,246,236,0.22);
    border-radius: 20px; padding: 26px; backdrop-filter: blur(4px);
  }
  .fp-preview-card .eyebrow { color: var(--marigold); margin-bottom: 14px; display:block; }
  .fp-preview-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(251,246,236,0.14); }
  .fp-preview-row:last-child { border-bottom: none; padding-bottom: 0; }
  .fp-preview-icon { width:36px; height:36px; border-radius:9px; background:rgba(251,246,236,0.15); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .fp-preview-row strong { display:block; color:var(--paper); font-size:14px; }
  .fp-preview-row span { font-size:12.5px; color:rgba(251,246,236,0.7); }

  /* feature strip */
  .fp-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px; }
  .fp-feat { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 28px 24px; }
  .fp-feat .feat-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
  .fp-feat h3 { font-size: 18px; margin-bottom: 8px; }
  .fp-feat p { font-size: 14.5px; color: var(--ink-soft); }

  /* age bands */
  .fp-bands { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 36px; }
  .fp-band { border-radius: 16px; padding: 26px; }
  .fp-band.b1 { background: rgba(63,143,95,0.08); border: 1.5px solid rgba(63,143,95,0.22); }
  .fp-band.b2 { background: rgba(30,53,84,0.06); border: 1.5px solid rgba(30,53,84,0.14); }
  .fp-band .age-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 700; color: var(--leaf-deep); margin-bottom: 6px; display:block; }
  .fp-band h3 { font-size: 18px; margin-bottom: 8px; }
  .fp-band p { font-size: 14px; color: var(--ink-soft); }

  /* pricing */
  .fp-pricing-box {
    background: var(--paper-dim); border: 1.5px solid var(--line); border-radius: 22px;
    padding: 36px; max-width: 580px; margin: 36px auto 0;
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start;
  }
  .fp-price { font-family: 'Baloo 2', sans-serif; font-size: 44px; font-weight: 800; color: var(--indigo); }
  .fp-price sub { font-size: 18px; font-weight: 600; }
  .fp-checklist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .fp-checklist li { font-size: 14.5px; display: flex; align-items: flex-start; gap: 10px; }
  .fp-checklist li::before { content: '✓'; color: var(--leaf); font-weight: 700; flex-shrink: 0; margin-top:1px; }

  /* safety */
  .fp-safety { background: var(--indigo); color: var(--paper); border-radius: 22px; padding: 40px; }
  .fp-safety h2 { color: var(--paper); font-size: 26px; margin-bottom: 14px; }
  .fp-safety p { color: rgba(251,246,236,0.78); font-size: 15px; }
  .fp-safety-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-top: 24px; }
  .fp-safety-item { background: rgba(251,246,236,0.07); border-radius: 14px; padding: 20px; }
  .fp-safety-item h4 { color: var(--marigold); font-size: 15px; margin-bottom: 6px; }
  .fp-safety-item p { font-size: 14px; color: rgba(251,246,236,0.72); margin: 0; }

  @media(max-width:900px){
    .fp-hero-inner { grid-template-columns: 1fr; }
    .fp-features { grid-template-columns: 1fr; }
    .fp-bands { grid-template-columns: 1fr; }
    .fp-pricing-box { grid-template-columns: 1fr; max-width: 100%; }
    .fp-safety-grid { grid-template-columns: 1fr; }
  }
`;

export default function ForParents() {
  const navigate = useNavigate();
  const styleRef = useRef(null);
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.setAttribute('data-fp', '1');
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); styleRef.current = null; };
  }, []);

  return (
    <div className="fp-page">
      {/* HERO */}
      <section className="fp-hero">
        <div className="adire" />
        <div className="fp-hero-inner">
          <div>
            <span className="eyebrow" style={{ color: 'var(--marigold)', marginBottom: 16, display: 'block' }}>For Parents</span>
            <h1>Your child is already using AI.<br />Let's make sure they're <em>doing it right</em>.</h1>
            <p className="lead">
              AI Small Small teaches children 7–17 to use AI critically and confidently - alongside their real Nigerian school curriculum. You see everything, every week.
            </p>
            <div className="fp-actions">
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>Get Started - Sign Up</button>
              <button className="btn" style={{ background: 'rgba(251,246,236,0.15)', color: 'var(--paper)', border: '2px solid rgba(251,246,236,0.3)' }}
                onClick={() => navigate('/login')}>Already have an account</button>
            </div>
          </div>

          <div className="fp-preview-card">
            <span className="eyebrow">What you see in your dashboard</span>
            <div className="fp-preview-row">
              <div className="fp-preview-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>
              </div>
              <div><strong>This week's progress</strong><span>3 modules completed · AI Ethics unit</span></div>
            </div>
            <div className="fp-preview-row">
              <div className="fp-preview-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <div><strong>Full chat history</strong><span>Every AI conversation, in full</span></div>
            </div>
            <div className="fp-preview-row">
              <div className="fp-preview-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <div><strong>Next session date</strong><span>In-person · Saturday 10am</span></div>
            </div>
            <div className="fp-preview-row">
              <div className="fp-preview-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--paper)" strokeWidth="2"><path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" /></svg>
              </div>
              <div><strong>Kid Innovator status</strong><span>Project submitted · Term 1</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '72px 0' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>What you get</span>
          <h2 style={{ fontSize: 'clamp(26px,3vw,36px)', marginBottom: 8 }}>Everything a parent needs to feel confident.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginBottom: 0, maxWidth: '55ch' }}>
            Not a black box. Not a screen-time worry. A structured program with parent visibility built in by design.
          </p>
          <div className="fp-features">
            <div className="fp-feat">
              <div className="feat-icon" style={{ background: 'rgba(63,143,95,0.12)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--leaf)" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              </div>
              <h3>Full parent visibility</h3>
              <p>You can see your child's full chat history with the AI tutor at any time - nothing is hidden. The AI is built to teach, not to answer for your child.</p>
            </div>
            <div className="fp-feat">
              <div className="feat-icon" style={{ background: 'rgba(242,162,48,0.12)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--marigold-deep)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>One account, all your children</h3>
              <p>Add all your children under a single parent login. You create their username and password - children log in separately with exactly those credentials.</p>
            </div>
            <div className="fp-feat">
              <div className="feat-icon" style={{ background: 'rgba(30,53,84,0.08)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="2"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>
              </div>
              <h3>Nigerian curriculum aligned</h3>
              <p>The program works alongside your child's existing school subjects - Mathematics, English, Basic Science - not against them. No disruption to schoolwork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AGE BANDS */}
      <section style={{ padding: '0 0 72px' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>Age bands</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,34px)', marginBottom: 8 }}>Built for every age, 7–17.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, maxWidth: '52ch' }}>
            Your child's curriculum band is set by age, but AI literacy is grouped by skill level - a beginner is a beginner at 9 or 15.
          </p>
          <div className="fp-bands">
            <div className="fp-band b1">
              <span className="age-label">AGES 8–11 · PRIMARY SCHOOL</span>
              <h3>Building curiosity</h3>
              <p>Short activities focused on what AI is, how to talk to it nicely, and spotting when it gets things wrong. No technical knowledge needed.</p>
            </div>
            <div className="fp-band b2">
              <span className="age-label" style={{ color: 'var(--indigo)' }}>AGES 12–15 · JUNIOR SECONDARY</span>
              <h3>Building skill</h3>
              <p>Deeper prompting practice, understanding how AI actually works, ethics, and starting to build simple AI-assisted projects of their own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="wrap" style={{ maxWidth: 700 }}>
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block', textAlign: 'center' }}>Subscription</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,34px)', marginBottom: 6, textAlign: 'center' }}>Simple, termly pricing.</h2>
          <p style={{ color: 'var(--ink-soft)', textAlign: 'center', marginBottom: 0 }}>One subscription covers all children in your household.</p>
          <div className="fp-pricing-box">
            <div>
              <div className="fp-price"><sub>₦</sub>TBD<sub style={{ fontSize: 14, fontWeight: 400 }}>/term</sub></div>
              <p style={{ color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 6 }}>Pricing finalised before the first cohort launches. Register now to be notified first.</p>
              <button className="btn btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }} onClick={() => navigate('/signup')}>
                Sign Up Free
              </button>
            </div>
            <ul className="fp-checklist">
              <li>All children in your household</li>
              <li>Weekly progress summary</li>
              <li>Full AI chat history access</li>
              <li>In-person sessions included</li>
              <li>Kid Innovator showcase entry</li>
              <li>WhatsApp curriculum delivery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section style={{ padding: '0 0 88px' }}>
        <div className="wrap">
          <div className="fp-safety">
            <h2>Safety isn't an afterthought here.</h2>
            <p>The AI is scoped to teaching - it can't write essays for your child, it won't go off-topic, and you can see every word of every conversation.</p>
            <div className="fp-safety-grid">
              <div className="fp-safety-item">
                <h4>Guardrailed AI</h4>
                <p>When a child asks the AI to "just do my homework," it redirects them to think it through. Built by design, not as a filter.</p>
              </div>
              <div className="fp-safety-item">
                <h4>Parent-visible chats</h4>
                <p>Every message is logged and accessible to the parent. No hidden conversations, no private sessions.</p>
              </div>
              <div className="fp-safety-item">
                <h4>Parent-created credentials</h4>
                <p>You set your child's username and password - they never self-register. This keeps account management firmly in your hands.</p>
              </div>
              <div className="fp-safety-item">
                <h4>Structured, not open-ended</h4>
                <p>The AI lives inside lessons, not as a freestanding chatbot. Every conversation is tied to a specific learning exercise.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--paper-dim)', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', marginBottom: 12 }}>Ready to get started?</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginBottom: 28, maxWidth: '44ch', margin: '0 auto 28px' }}>
          Sign up as a parent, add your child's profile, and they can start learning today.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/signup')}>Sign Up as a Parent</button>
          <Link to="/about" className="btn btn-outline">Why This Matters</Link>
        </div>
      </section>
    </div>
  );
}
