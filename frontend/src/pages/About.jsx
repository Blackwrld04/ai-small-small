import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const css = `
  .about-page { background: var(--paper); color: var(--ink); font-family: 'Work Sans', sans-serif; }

  .about-hero {
    background: var(--indigo-deep); color: var(--paper);
    padding: 88px 0 76px; position: relative; overflow: hidden;
  }
  .about-hero .adire {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10px 10px, rgba(251,246,236,0.1) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(251,246,236,0.03) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px;
  }
  .about-hero-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; padding: 0 24px; }
  .about-hero h1 { color: var(--paper); font-size: clamp(30px,4vw,50px); line-height: 1.1; margin-bottom: 18px; }
  .about-hero h1 em { color: var(--marigold); font-style: normal; }
  .about-hero .lead { font-size: clamp(16px,1.6vw,19px); color: rgba(251,246,236,0.84); max-width: 58ch; }

  .about-body { width: 100%; padding: 72px 48px; }
  .about-body h2 { font-size: clamp(22px,2.5vw,30px); margin: 48px 0 14px; }
  .about-body h2:first-child { margin-top: 0; }
  .about-body p { color: var(--ink-soft); font-size: 16px; line-height: 1.72; margin: 0 0 16px; }
  .about-body p strong { color: var(--ink); }
  .about-body blockquote {
    border-left: 3px solid var(--marigold); padding: 14px 20px; margin: 28px 0;
    background: var(--paper-dim); border-radius: 0 12px 12px 0;
  }
  .about-body blockquote p { color: var(--ink); font-size: 16.5px; font-style: italic; margin: 0; }

  .about-team { margin-top: 60px; }
  .about-team h2 { font-size: clamp(22px,2.4vw,30px); margin-bottom: 28px; }
  .about-team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .team-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 24px; }
  .team-card h3 { font-size: 17px; margin-bottom: 4px; }
  .team-card .role { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--leaf-deep); font-weight: 600; margin-bottom: 10px; display: block; }
  .team-card p { font-size: 14px; color: var(--ink-soft); margin: 0; }

  .about-cta { background: var(--marigold); border-radius: 22px; padding: 44px; text-align: center; margin-top: 64px; }
  .about-cta h2 { font-size: clamp(22px,2.8vw,34px); color: var(--indigo-deep); margin-bottom: 12px; }
  .about-cta p { color: var(--indigo-deep); font-size: 15.5px; opacity: 0.85; margin-bottom: 24px; }

  @media(max-width:640px){ .about-team-grid { grid-template-columns: 1fr; } }
`;

export default function About() {
  const navigate = useNavigate();
  const styleRef = useRef(null);
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.setAttribute('data-about', '1');
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); styleRef.current = null; };
  }, []);

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="adire" />
        <div className="about-hero-inner">
          <span className="eyebrow" style={{ color: 'var(--marigold)', marginBottom: 14, display: 'block' }}>Why This Matters</span>
          <h1>The gap nobody is talking about - <em>yet</em>.</h1>
          <p className="lead">
            Nigerian children are already using ChatGPT to do their homework. Nobody is teaching them how to use it well, how to catch it when it lies, or how to use it to think better rather than think less.
          </p>
        </div>
      </section>

      {/* BODY */}
      <div className="about-body">
        <h2>What's actually happening</h2>
        <p>
          Walk into any secondary school in Lagos, Abuja, or Port Harcourt and ask students whether they use AI tools. Most will say yes. Ask their teachers whether they've had any training on how to handle this. Most will say no.
        </p>
        <p>
          The gap isn't about access - it's about capability and critical thinking. <strong>Kids who learn to use AI as a thinking partner will consistently outperform kids who use it as an answer machine.</strong> And right now, almost nobody is teaching the difference.
        </p>

        <blockquote>
          <p>"Prompt engineering is to the 2030s what basic computer literacy was to the 2000s - except the window to teach it well is closing faster."</p>
        </blockquote>

        <h2>Why AI literacy is different from general tech skills</h2>
        <p>
          Teaching a child to type, use a spreadsheet, or browse safely is important. But AI literacy is a fundamentally different skill - it requires understanding when to trust AI, how to verify what it says, how to prompt it effectively to get useful outputs, and how to resist the temptation to just copy what it produces.
        </p>
        <p>
          These skills don't come from using AI more. They come from structured, deliberate practice with someone who can explain why the AI behaved the way it did - which is exactly what AI Small Small is built to provide.
        </p>

        <h2>Why Nigerian children specifically</h2>
        <p>
          Nigeria has the world's largest youth population proportionally. By 2035, one in five people on earth under 25 will be African - and Nigeria leads that cohort. <strong>The economic and social consequence of that generation being unprepared for an AI-integrated world is enormous.</strong>
        </p>
        <p>
          At the same time, the Nigerian school curriculum is strong in the fundamentals - Mathematics, English, the sciences - but hasn't yet integrated AI literacy at scale. AI Small Small doesn't try to replace that curriculum. It runs alongside it, using AI to reinforce what students already study while teaching them to understand the tool itself.
        </p>

        <h2>What we're actually building</h2>
        <p>
          Not an app, not a screen-time product, not another subscription that parents forget about. A structured program with real in-person sessions, WhatsApp-based practice that works on low-data connections, and parent visibility built in by design - because a parent who can see what their child is doing is a parent who trusts the program.
        </p>
        <p>
          Every term ends with a Kid Innovator showcase - children pitching and demonstrating something they actually built. Because the best way to know a child has learned is to watch them build something with what they know.
        </p>

        {/* TEAM */}
        <div className="about-team">
          <h2>Who's building this</h2>
          <div className="about-team-grid">
            <div className="team-card">
              <h3>Founder</h3>
              <span className="role">CEO &amp; Program Director</span>
              <p>Building AI Small Small because Nigerian children deserve structured AI education, not just unfiltered access to AI tools.</p>
            </div>
            <div className="team-card">
              <h3>We're hiring</h3>
              <span className="role">Open roles</span>
              <p>Curriculum lead, facilitators across Lagos and Abuja, and a part-time school partnerships manager. Get in touch if that's you.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Help us reach more children.</h2>
          <p>Whether you're a parent, a school, or a potential sponsor - there's a way to get involved.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-dark" style={{ background: 'var(--indigo)', color: 'var(--paper)', boxShadow: '0 4px 0 var(--indigo-deep)' }}
              onClick={() => navigate('/signup')}>
              Sign Up as a Parent
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/for-schools')}>For Schools</button>
            <button className="btn btn-outline" onClick={() => navigate('/for-sponsors')}>For Sponsors</button>
          </div>
        </div>
      </div>
    </div>
  );
}
