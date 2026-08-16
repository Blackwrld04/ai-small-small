import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const css = `
  .fsp-page { background: var(--paper); color: var(--ink); font-family: 'Work Sans', sans-serif; }

  .fsp-hero {
    background: var(--indigo); color: var(--paper);
    padding: 80px 0 72px; position: relative; overflow: hidden;
  }
  .fsp-hero .adire {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10px 10px, rgba(251,246,236,0.12) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(251,246,236,0.04) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px;
  }
  .fsp-hero-inner { position: relative; z-index: 2; width: 100%; padding: 0 48px; }
  .fsp-hero h1 { color: var(--paper); font-size: clamp(30px,4vw,50px); line-height: 1.1; margin-bottom: 16px; }
  .fsp-hero h1 em { color: var(--marigold); font-style: normal; }
  .fsp-hero .lead { font-size: clamp(15px,1.6vw,18px); color: rgba(251,246,236,0.85); max-width: 52ch; margin-bottom: 28px; }

  .fsp-impact { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 52px; }
  .fsp-impact-item { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 30px 24px; }
  .fsp-impact-item .impact-num { font-family: 'Baloo 2', sans-serif; font-size: 36px; font-weight: 800; color: var(--indigo); margin-bottom: 4px; }
  .fsp-impact-item p { color: var(--ink-soft); font-size: 14.5px; margin: 0; }

  .fsp-opps { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 36px; }
  .fsp-opp { border-radius: 18px; padding: 28px; border: 1.5px solid var(--line); background: #fff; }
  .fsp-opp .tier { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 10px; display: block; }
  .fsp-opp h3 { font-size: 18px; margin-bottom: 10px; }
  .fsp-opp p { color: var(--ink-soft); font-size: 14.5px; }
  .fsp-opp ul { list-style: none; margin: 12px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .fsp-opp ul li { font-size: 14px; display: flex; align-items: flex-start; gap: 8px; }
  .fsp-opp ul li::before { content: '→'; color: var(--leaf); font-weight: 700; flex-shrink: 0; }

  .fsp-pitch { background: var(--marigold); border-radius: 22px; padding: 44px; text-align: center; position: relative; overflow: hidden; }
  .fsp-pitch .adire2 {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10px 10px, rgba(30,53,84,0.1) 1.6px, transparent 1.7px);
    background-size: 22px 22px;
  }
  .fsp-pitch-inner { position: relative; z-index: 2; max-width: 580px; margin: 0 auto; }
  .fsp-pitch h2 { font-size: clamp(24px,3vw,36px); margin-bottom: 14px; color: var(--indigo-deep); }
  .fsp-pitch p { color: var(--indigo-deep); font-size: 16px; margin-bottom: 28px; opacity: 0.85; }

  @media(max-width:860px){
    .fsp-impact { grid-template-columns: 1fr 1fr; }
    .fsp-opps { grid-template-columns: 1fr; }
  }
  @media(max-width:560px){ .fsp-impact { grid-template-columns: 1fr; } }
`;

export default function ForSponsors() {
  const navigate = useNavigate();
  const styleRef = useRef(null);
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.setAttribute('data-fsp', '1');
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); styleRef.current = null; };
  }, []);

  return (
    <div className="fsp-page">
      {/* HERO */}
      <section className="fsp-hero">
        <div className="adire" />
        <div className="fsp-hero-inner">
          <span className="eyebrow" style={{ color: 'var(--marigold)', marginBottom: 14, display: 'block' }}>For Sponsors & Partners</span>
          <h1>Back the next generation of <em>future-ready</em> Nigerian children.</h1>
          <p className="lead">
            Nigeria has the youngest population on earth. The kids who learn to use AI well now will be the engineers, writers, and leaders of 2040. Your brand puts them there.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>Talk to Us</button>
            <Link to="/about" className="btn" style={{ background: 'rgba(251,246,236,0.14)', color: 'var(--paper)', border: '2px solid rgba(251,246,236,0.3)' }}>
              Why This Matters
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section style={{ padding: '72px 0' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>The opportunity</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,34px)', marginBottom: 8 }}>Why Nigeria. Why now.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, maxWidth: '56ch', marginBottom: 0 }}>
            These numbers are from population data and independent research - they tell you why the timing of this program matters.
          </p>
          <div className="fsp-impact">
            <div className="fsp-impact-item">
              <div className="impact-num">80M+</div>
              <p>Nigerians under 18 - the world's largest youth population in a single country</p>
            </div>
            <div className="fsp-impact-item">
              <div className="impact-num">Est. 2030</div>
              <p>When AI fluency will be a baseline job requirement across most professional sectors</p>
            </div>
            <div className="fsp-impact-item">
              <div className="impact-num">Today</div>
              <p>When children can be taught to use AI as a tool to think better - not just to get answers faster</p>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section style={{ padding: '0 0 72px' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>Partnership tiers</span>
          <h2 style={{ fontSize: 'clamp(22px,2.6vw,32px)', marginBottom: 8 }}>Two ways to get involved.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, maxWidth: '52ch', marginBottom: 0 }}>
            We're still at cohort-one stage - sponsorship asks grow as the pilot cohort delivers measurable outcomes.
          </p>
          <div className="fsp-opps">
            <div className="fsp-opp">
              <span className="tier" style={{ color: 'var(--marigold-deep)' }}>Showcase Sponsor</span>
              <h3>Sponsor the Kid Innovator Showcase</h3>
              <p>Each term ends with children pitching their AI-assisted projects to a panel. Put your brand at the centre of a real, celebratory event that families attend.</p>
              <ul>
                <li>Brand name on all showcase materials</li>
                <li>Speaking slot at the event</li>
                <li>Coverage across our parent community</li>
                <li>Impact report post-event with student outcomes</li>
              </ul>
            </div>
            <div className="fsp-opp">
              <span className="tier" style={{ color: 'var(--leaf-deep)' }}>Program Partner</span>
              <h3>Co-fund a school cohort</h3>
              <p>Sponsor one or more school cohorts directly - funding the in-person sessions, platform access, and facilitators for a term or full year.</p>
              <ul>
                <li>Direct attribution: "This cohort is supported by [Brand]"</li>
                <li>Detailed impact data across student cohort</li>
                <li>Invitation to end-of-year showcase</li>
                <li>Co-branding across platform and materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH CTA */}
      <section style={{ padding: '0 0 88px' }}>
        <div className="wrap">
          <div className="fsp-pitch">
            <div className="adire2" />
            <div className="fsp-pitch-inner">
              <h2>This is early-stage. That's the point.</h2>
              <p>
                Get in early, shape the program, and be the brand that backed Nigerian children's AI education before it was obvious. We're talking to first-cohort partners now.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn" style={{ background: 'var(--indigo)', color: 'var(--paper)', boxShadow: '0 4px 0 var(--indigo-deep)' }}
                  onClick={() => navigate('/contact')}>
                  Start a Conversation
                </button>
                <Link to="/about" className="btn btn-outline">Read Why This Matters</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
