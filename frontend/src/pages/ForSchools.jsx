import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const css = `
  .fs-page { background: var(--paper); color: var(--ink); font-family: 'Work Sans', sans-serif; }

  .fs-hero {
    background: var(--coral); color: var(--paper);
    padding: 80px 0 72px; position: relative; overflow: hidden;
  }
  .fs-hero .adire {
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10px 10px, rgba(251,246,236,0.14) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(251,246,236,0.04) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px;
  }
  .fs-hero-inner {
    position: relative; z-index: 2;
    width: 100%; padding: 0 48px;
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center;
  }
  .fs-hero h1 { color: var(--paper); font-size: clamp(30px,4.2vw,50px); line-height:1.1; margin-bottom:16px; }
  .fs-hero h1 em { font-style:normal; color: var(--marigold); }
  .fs-hero .lead { font-size: clamp(15px,1.5vw,17.5px); color: rgba(251,246,236,0.88); margin-bottom: 26px; max-width:46ch; }

  /* tools grid */
  .fs-tools-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
  .fs-tool-card {
    background: rgba(251,246,236,0.12); border: 1px solid rgba(251,246,236,0.2);
    border-radius: 12px; padding: 16px;
  }
  .fs-tool-card h4 { color: var(--paper); font-size: 13.5px; margin-bottom: 4px; }
  .fs-tool-card p { font-size: 12px; color: rgba(251,246,236,0.68); margin: 0; }

  /* what a school gets */
  .fs-gets { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; margin-top: 40px; }
  .fs-get-item { border-radius: 16px; padding: 28px 24px; background: #fff; border: 1px solid var(--line); }
  .fs-get-item .get-num { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 700; color: var(--leaf-deep); margin-bottom: 10px; display: block; }
  .fs-get-item h3 { font-size: 18px; margin-bottom: 8px; }
  .fs-get-item p { font-size: 14.5px; color: var(--ink-soft); }

  /* pilot offer */
  .fs-pilot {
    background: var(--indigo); border-radius: 22px; padding: 44px;
    display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; align-items: center;
  }
  .fs-pilot h2 { color: var(--paper); font-size: clamp(22px,2.8vw,32px); margin-bottom: 14px; }
  .fs-pilot p { color: rgba(251,246,236,0.78); font-size: 15px; margin-bottom: 0; }
  .fs-pilot-checks { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .fs-pilot-checks li { font-size: 14.5px; color: rgba(251,246,236,0.85); display: flex; align-items: flex-start; gap: 10px; }
  .fs-pilot-checks li::before { content: '✓'; color: var(--marigold); font-weight: 700; flex-shrink: 0; }
  .fs-pilot-cta { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
  .fs-pilot-cta p { font-size: 14px; color: rgba(251,246,236,0.65); }

  /* WAEC alignment */
  .fs-waec { background: var(--paper-dim); border-radius: 22px; padding: 40px; margin-top: 60px; }
  .fs-waec h2 { font-size: clamp(22px,2.6vw,30px); margin-bottom: 12px; }
  .fs-waec p { color: var(--ink-soft); font-size: 15px; }
  .fs-subj-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .fs-subj-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; padding: 6px 12px; border-radius: 8px; background: rgba(30,53,84,0.07); border: 1px solid rgba(30,53,84,0.14); color: var(--indigo); font-weight: 600; }

  @media(max-width:900px){
    .fs-hero-inner { grid-template-columns: 1fr; }
    .fs-tools-grid { grid-template-columns: 1fr 1fr; }
    .fs-gets { grid-template-columns: 1fr; }
    .fs-pilot { grid-template-columns: 1fr; }
  }
  @media(max-width:540px){ .fs-tools-grid { grid-template-columns: 1fr; } }
`;

const TOOLS = [
  { name: 'Lesson Plan', desc: 'AI-aligned lesson plans in minutes' },
  { name: 'Rubric Generator', desc: 'Custom assessment rubrics' },
  { name: 'Exit Ticket', desc: 'Quick end-of-class checks' },
  { name: 'Learning Objectives', desc: 'Measurable, standards-aligned goals' },
  { name: 'Chunk Text', desc: 'Break complex texts for easier reading' },
  { name: 'Questions Generator', desc: 'Practice questions on any topic' },
  { name: 'Progress Snapshot', desc: 'Which students completed what' },
  { name: 'Class Summary', desc: 'Weekly cohort progress at a glance' },
  { name: 'Prompting Workshop', desc: 'In-class AI literacy activities' },
];

export default function ForSchools() {
  const navigate = useNavigate();
  const styleRef = useRef(null);
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.setAttribute('data-fs', '1');
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => { el.remove(); styleRef.current = null; };
  }, []);

  return (
    <div className="fs-page">
      {/* HERO */}
      <section className="fs-hero">
        <div className="adire" />
        <div className="fs-hero-inner">
          <div>
            <span className="eyebrow" style={{ color: 'var(--marigold)', marginBottom: 16, display: 'block' }}>For Schools</span>
            <h1>An extracurricular add-on<br />your students will <em>look forward to</em>.</h1>
            <p className="lead">
              AI Small Small runs alongside your existing curriculum - not against it. Pilot with one class, one term. No disruption, no heavy IT setup.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('/signup?role=school')}>Request a Pilot</button>
              <button className="btn" style={{ background: 'rgba(251,246,236,0.15)', color: 'var(--paper)', border: '2px solid rgba(251,246,236,0.3)' }}
                onClick={() => navigate('/login')}>Existing school login</button>
            </div>
          </div>

          <div>
            <p style={{ color: 'rgba(251,246,236,0.75)', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tools for your teachers</p>
            <div className="fs-tools-grid">
              {TOOLS.map(t => (
                <div className="fs-tool-card" key={t.name}>
                  <h4>{t.name}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT A SCHOOL GETS */}
      <section style={{ padding: '72px 0' }}>
        <div className="wrap">
          <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>What you get</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,34px)', marginBottom: 8 }}>Everything your school needs, nothing you don't.</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15.5, maxWidth: '52ch' }}>
            Positioned as an extracurricular add-on, not a full curriculum replacement. Designed for how Nigerian schools actually buy.
          </p>
          <div className="fs-gets">
            <div className="fs-get-item">
              <span className="get-num">01</span>
              <h3>In-person sessions</h3>
              <p>Facilitated sessions delivered at your school - we bring the curriculum, you provide the space and students. Typically one 90-minute session per fortnight per class.</p>
            </div>
            <div className="fs-get-item">
              <span className="get-num">02</span>
              <h3>Platform access for students</h3>
              <p>Every student in the class gets a login. Their AI tutor sessions are visible to their assigned teacher or school coordinator.</p>
            </div>
            <div className="fs-get-item">
              <span className="get-num">03</span>
              <h3>Teacher tools dashboard</h3>
              <p>Lesson plans, rubrics, exit tickets, and progress snapshots - built for Nigerian school contexts, with WAEC/BECE-aligned content where relevant.</p>
            </div>
            <div className="fs-get-item">
              <span className="get-num">04</span>
              <h3>Kid Innovator showcase</h3>
              <p>Each term ends with a student showcase your school can host or attend - a real external event that students build toward and are proud of.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WAEC ALIGNMENT */}
      <section style={{ padding: '0 0 72px' }}>
        <div className="wrap">
          <div className="fs-waec">
            <span className="eyebrow" style={{ marginBottom: 12, display: 'block' }}>Curriculum alignment</span>
            <h2>Fits around WAEC and BECE - not against them.</h2>
            <p>
              We know schools buy things that help their students pass exams. AI Small Small's curriculum track follows the Nigerian school syllabus, using AI as a study partner to reinforce what students already learn in class - not to replace it.
            </p>
            <p style={{ marginTop: 10 }}>
              Teachers can use the AI tools to generate practice questions, explanations, and revision materials aligned to the subjects below.
            </p>
            <div className="fs-subj-tags">
              {['Mathematics', 'English Language', 'Basic Science & Technology', 'Civic Education', 'Computer Studies', 'Biology', 'Chemistry', 'Physics', 'Literature in English', 'Economics'].map(s => (
                <span className="fs-subj-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PILOT OFFER */}
      <section style={{ padding: '0 0 88px' }}>
        <div className="wrap">
          <div className="fs-pilot">
            <div>
              <h2>Start with one class. One term. No long commitment.</h2>
              <p>Schools buy in small trial commitments before full rollout - that's the reality. We built our pilot offer around that.</p>
              <ul className="fs-pilot-checks">
                <li>One class, one term - evaluate before expanding</li>
                <li>Dedicated onboarding for your coordinator</li>
                <li>Progress report at end of term for your principal</li>
                <li>Teacher dashboard active from day one</li>
                <li>No minimum student count for the pilot</li>
              </ul>
            </div>
            <div className="fs-pilot-cta">
              <p>Request a pilot conversation. We'll schedule a call with your school coordinator within 48 hours.</p>
              <button className="btn btn-primary" onClick={() => navigate('/signup?role=school')}>Request Pilot Setup</button>
              <Link to="/about" className="btn btn-outline" style={{ color: 'var(--paper)', borderColor: 'rgba(251,246,236,0.35)', background: 'transparent' }}>Why This Matters</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
