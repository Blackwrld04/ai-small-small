import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── Inline styles scoped to Landing only ─── */
const css = `
  .landing-page {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Work Sans', sans-serif;
  }

  /* adire patterns */
  .adire-pattern {
    background-image:
      radial-gradient(circle at 10px 10px, rgba(251,246,236,0.35) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(251,246,236,0.06) 0 2px, transparent 2px 22px),
      repeating-linear-gradient(-45deg, rgba(251,246,236,0.06) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px, 44px 44px;
  }
  .adire-pattern-dark {
    background-image:
      radial-gradient(circle at 10px 10px, rgba(30,53,84,0.16) 1.6px, transparent 1.7px),
      repeating-linear-gradient(45deg, rgba(30,53,84,0.05) 0 2px, transparent 2px 22px),
      repeating-linear-gradient(-45deg, rgba(30,53,84,0.05) 0 2px, transparent 2px 22px);
    background-size: 22px 22px, 44px 44px, 44px 44px;
  }

  /* ── landing header ── */
  .l-header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(251,246,236,0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--line);
  }
  .l-nav {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 16px 48px;
  }
  .l-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 19px;
    color: var(--indigo); text-decoration: none;
  }
  .l-logo-mark {
    width: 34px; height: 34px; border-radius: 10px; background: var(--indigo);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .l-nav-links {
    display: flex; align-items: center; gap: 30px;
    list-style: none; margin: 0; padding: 0;
  }
  .l-nav-links a {
    text-decoration: none; color: var(--ink); font-weight: 500; font-size: 15px;
    padding: 6px 2px; border-bottom: 2px solid transparent;
  }
  .l-nav-links a:hover { border-bottom-color: var(--marigold); }
  .l-nav-cta { display: flex; align-items: center; gap: 14px; }
  .l-burger {
    display: none; background: none; border: none; cursor: pointer; padding: 6px;
  }
  .btn-ghost {
    background: transparent; color: var(--paper); border: 2px solid rgba(251,246,236,0.4);
  }
  .btn-ghost:hover { border-color: var(--paper); }
  .btn-dark {
    background: var(--indigo); color: var(--paper);
    box-shadow: 0 4px 0 var(--indigo-deep);
  }
  .btn-dark:hover { box-shadow: 0 6px 0 var(--indigo-deep); }
  .btn-dark:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--indigo-deep); }

  @media (max-width: 880px) {
    .l-nav-links {
      position: fixed; top: 67px; left: 0; right: 0;
      flex-direction: column; align-items: flex-start; gap: 0;
      background: var(--paper); border-bottom: 1px solid var(--line);
      padding: 8px 24px 18px;
      transform: translateY(-8px); opacity: 0; pointer-events: none;
      transition: all .2s ease;
    }
    .l-nav-links.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
    .l-nav-links li { width: 100%; }
    .l-nav-links a { display: block; padding: 12px 0; border-bottom: 1px solid var(--line); width: 100%; }
    .l-burger { display: block; }
    .l-nav-cta .hide-mobile { display: none; }
  }

  /* ── hero ── */
  .l-hero {
    background: var(--indigo); color: var(--paper);
    position: relative; overflow: hidden; padding: 64px 0 0;
  }
  .l-hero-inner {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center;
    width: 100%; padding: 0 48px 70px;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(251,246,236,0.12); border: 1px solid rgba(251,246,236,0.25);
    padding: 7px 14px; border-radius: 999px; margin-bottom: 22px;
  }
  .hero-tag .eyebrow { color: var(--marigold); }
  .l-hero h1 {
    color: var(--paper); font-size: clamp(34px, 5vw, 56px); line-height: 1.06; margin-bottom: 20px;
  }
  .l-hero h1 em { font-style: normal; color: var(--marigold); }
  .l-hero .lead {
    font-size: clamp(16px, 1.6vw, 19px); color: rgba(251,246,236,0.82);
    max-width: 46ch; margin-bottom: 30px;
  }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
  .hero-meta {
    display: flex; gap: 26px; flex-wrap: wrap;
    font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: rgba(251,246,236,0.65);
  }
  .hero-meta span { display: flex; align-items: center; gap: 7px; }
  .hero-meta svg { width: 14px; height: 14px; flex-shrink: 0; }

  /* mascot / chat */
  .mascot-box {
    position: relative;
    background: linear-gradient(160deg, #2A4A70, #1E3554);
    border-radius: 24px; padding: 30px;
    border: 1px solid rgba(251,246,236,0.15);
  }
  .mascot-box .adire-pattern { position: absolute; inset: 0; border-radius: 24px; opacity: 0.5; }
  .chat-card {
    position: relative; z-index: 2;
    background: var(--paper); border-radius: 16px; padding: 18px 18px 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  }
  .chat-row { display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; }
  .chat-bubble {
    background: var(--paper-dim); border-radius: 14px 14px 14px 4px; padding: 10px 14px;
    font-size: 14px; color: var(--ink); max-width: 80%;
  }
  .chat-row.me { justify-content: flex-end; }
  .chat-row.me .chat-bubble { background: var(--marigold); color: var(--indigo-deep); border-radius: 14px 14px 4px 14px; }
  .bot-avatar {
    width: 30px; height: 30px; border-radius: 8px; background: var(--leaf); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .bot-avatar svg { width: 17px; height: 17px; }

  /* ── sections ── */
  .l-section { padding: 88px 0; }
  .l-section-dark { background: var(--indigo-deep); color: var(--paper); }
  .section-head { max-width: 640px; margin-bottom: 52px; }
  .section-head .eyebrow { margin-bottom: 12px; display: block; }
  .section-head h2 { font-size: clamp(28px, 3.4vw, 40px); line-height: 1.12; margin-bottom: 16px; }
  .section-head p { color: var(--ink-soft); font-size: 17px; }
  .l-section-dark .section-head h2 { color: var(--paper); }
  .l-section-dark .section-head p { color: rgba(251,246,236,0.72); }
  .l-section-dark .eyebrow { color: var(--marigold); }

  /* tracks */
  .tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
  .track-card {
    background: #fff; border: 1px solid var(--line); border-radius: var(--radius);
    padding: 34px 30px; position: relative; overflow: hidden;
  }
  .track-card.b { background: var(--paper-dim); }
  .track-num {
    font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 600;
    color: var(--leaf-deep); margin-bottom: 16px; display: block;
  }
  .track-card h3 { font-size: 22px; margin-bottom: 10px; }
  .track-card p { color: var(--ink-soft); font-size: 15px; margin-bottom: 20px; }
  .track-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; font-weight: 500;
    background: var(--paper-dim); border: 1px solid var(--line); padding: 5px 10px;
    border-radius: 8px; color: var(--ink-soft);
  }
  .track-card.a .tag { background: rgba(63,143,95,0.1); border-color: rgba(63,143,95,0.25); color: var(--leaf-deep); }
  .track-card.b .tag { background: rgba(30,53,84,0.06); border-color: rgba(30,53,84,0.15); color: var(--indigo); }

  /* cycle / how it works */
  .cycle { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
  .cycle-step {
    background: rgba(251,246,236,0.05); border: 1px solid rgba(251,246,236,0.14);
    border-radius: var(--radius); padding: 28px 24px;
  }
  .cycle-step .step-no {
    font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--marigold);
    margin-bottom: 14px; display: block;
  }
  .cycle-step h3 { color: var(--paper); font-size: 19px; margin-bottom: 10px; }
  .cycle-step p { color: rgba(251,246,236,0.7); font-size: 14.5px; }

  /* doorways */
  .doorways { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .door {
    border-radius: var(--radius); padding: 32px 28px; color: var(--paper);
    display: flex; flex-direction: column; min-height: 260px;
    text-decoration: none; cursor: pointer;
    transition: transform .18s ease;
  }
  .door:hover { transform: translateY(-4px); }
  .door.parents { background: var(--leaf); }
  .door.schools { background: var(--coral); }
  .door.sponsors { background: var(--indigo); }
  .door .eyebrow { color: rgba(251,246,236,0.75); margin-bottom: 14px; }
  .door h3 { color: var(--paper); font-size: 23px; margin-bottom: 12px; }
  .door p { color: rgba(251,246,236,0.85); font-size: 14.5px; flex-grow: 1; margin: 0; }
  .door .door-link {
    margin-top: 18px; display: flex; align-items: center; gap: 8px;
    font-weight: 600; font-size: 14.5px; color: var(--paper);
  }
  .door .door-link svg { width: 16px; height: 16px; }

  /* innovator */
  .innovator-grid {
    display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 48px; align-items: center;
  }
  .innovator-badge {
    width: 64px; height: 64px; border-radius: 16px; background: var(--marigold);
    display: flex; align-items: center; justify-content: center; margin-bottom: 22px;
  }
  .innovator-badge svg { width: 32px; height: 32px; color: var(--indigo-deep); }
  .innovator-grid h2 { font-size: clamp(26px,3vw,36px); margin-bottom: 16px; }
  .innovator-grid p { color: var(--ink-soft); font-size: 16.5px; margin-bottom: 14px; }
  .innovator-visual {
    background: var(--paper-dim); border-radius: var(--radius); padding: 26px;
    border: 1px solid var(--line);
  }
  .badge-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 18px; }
  .badge-pill {
    display: flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px;
    font-size: 13px; font-weight: 600; color: var(--indigo);
  }
  .badge-pill .dot { width: 8px; height: 8px; border-radius: 50%; }

  /* FAQ */
  .faq-list { border-top: 1px solid var(--line); }
  .faq-item { border-bottom: 1px solid var(--line); }
  .faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 22px 4px; display: flex; justify-content: space-between; align-items: center;
    font-family: 'Work Sans', sans-serif; font-size: 16.5px; font-weight: 600; color: var(--indigo);
  }
  .faq-q svg { width: 18px; height: 18px; flex-shrink: 0; transition: transform .2s ease; }
  .faq-item.open .faq-q svg { transform: rotate(45deg); }
  .faq-a { max-height: 0; overflow: hidden; transition: max-height .25s ease; }
  .faq-a p { padding: 0 4px 22px; color: var(--ink-soft); font-size: 15px; max-width: 70ch; }

  /* final CTA */
  .final-cta-wrap { padding: 0 48px; }
  .final-cta-box {
    background: var(--marigold); border-radius: 28px;
    padding: 56px 40px; text-align: center; position: relative; overflow: hidden;
  }
  .final-cta-box .adire-pattern-dark { position: absolute; inset: 0; border-radius: 28px; }
  .final-cta-inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
  .final-cta-inner h2 { font-size: clamp(26px,3.4vw,38px); margin-bottom: 14px; }
  .final-cta-inner p { color: var(--indigo-deep); font-size: 16px; margin-bottom: 28px; opacity: 0.85; }
  .btn-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* footer */
  .l-footer {
    background: var(--indigo-deep); color: rgba(251,246,236,0.6);
    padding: 56px 0 26px; margin-top: 90px;
  }
  .footer-grid {
    display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 36px;
    padding-bottom: 40px; border-bottom: 1px solid rgba(251,246,236,0.1);
  }
  .footer-brand .l-logo { color: var(--paper); }
  .footer-brand p { margin-top: 14px; font-size: 14px; max-width: 32ch; color: rgba(251,246,236,0.55); }
  .footer-col h4 {
    color: var(--paper); font-size: 14px; font-family: 'Work Sans', sans-serif;
    font-weight: 600; margin-bottom: 14px;
  }
  .footer-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .footer-col a { color: rgba(251,246,236,0.6); text-decoration: none; font-size: 14.5px; }
  .footer-col a:hover { color: var(--marigold); }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    padding-top: 24px; font-size: 13px; font-family: 'IBM Plex Mono', monospace;
  }

  /* responsive */
  @media (max-width: 980px) {
    .l-hero-inner { grid-template-columns: 1fr; padding: 0 24px 50px; }
    .mascot-box { order: -1; max-width: 520px; }
    .tracks { grid-template-columns: 1fr; }
    .cycle { grid-template-columns: 1fr; }
    .doorways { grid-template-columns: 1fr; }
    .innovator-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; row-gap: 30px; }
  }
  @media (max-width: 560px) {
    .footer-grid { grid-template-columns: 1fr; }
    .l-section { padding: 60px 0; }
    .final-cta-box { padding: 40px 22px; }
    .final-cta-wrap { padding: 0 16px; }
    .l-hero-inner { padding: 0 16px 40px; }
  }
`;

/* ─── SVG helpers ─── */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" fill="#F2A230" />
  </svg>
);
const StarOutline = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L14.5 9H21L15.5 13.2L17.5 20L12 16L6.5 20L8.5 13.2L3 9H9.5L12 2Z" />
  </svg>
);
const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FBF6EC" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const BurgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const FAQ_ITEMS = [
  {
    q: 'Does my child need to download an app?',
    a: 'No. The program runs through WhatsApp, which most Nigerian families already use daily, plus short in-person sessions. No new app, no extra data burden.',
  },
  {
    q: 'Will I be able to see what my child is learning?',
    a: "Yes - parents get visibility into sessions and progress by design. This isn't a black box; you'll know exactly what your child is being taught and asking.",
  },
  {
    q: 'Is this only for kids who are already good with computers?',
    a: 'Not at all. AI literacy is grouped by skill level - Beginner through Expert - not age, so a first-timer of any age starts from the basics.',
  },
  {
    q: "Does this replace my child's regular schoolwork?",
    a: 'No - it runs alongside it. The curriculum track follows the Nigerian school syllabus your child already studies, using AI to support it, not replace it.',
  },
  {
    q: 'What ages does AI Small Small cover?',
    a: '7 to 17, from early primary through the WASSCE years - grouped so every child, regardless of age, is taught at the right level for them.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const navLinksRef = useRef(null);
  const styleRef = useRef(null);

  /* Inject scoped styles once */
  useEffect(() => {
    if (styleRef.current) return;
    const el = document.createElement('style');
    el.setAttribute('data-landing', '1');
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      el.remove();
      styleRef.current = null;
    };
  }, []);

  /* Burger toggle */
  function toggleNav() {
    navLinksRef.current?.classList.toggle('open');
  }
  function closeNav() {
    navLinksRef.current?.classList.remove('open');
  }

  /* FAQ accordion */
  function handleFaqClick(e) {
    const item = e.currentTarget.closest('.faq-item');
    if (!item) return;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

  /* Smooth-scroll to on-page anchor */
  function scrollTo(id) {
    closeNav();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="landing-page">
      {/* ── HEADER ── */}
      <header className="l-header">
        <nav className="l-nav">
          <a href="#top" className="l-logo" onClick={e => { e.preventDefault(); scrollTo('top'); }}>
            <span className="l-logo-mark"><StarIcon /></span>
            AI Small Small
          </a>

          <ul className="l-nav-links" ref={navLinksRef}>
            <li><a href="#tracks" onClick={e => { e.preventDefault(); scrollTo('tracks'); }}>What They Learn</a></li>
            <li><a href="#how" onClick={e => { e.preventDefault(); scrollTo('how'); }}>How It Works</a></li>
            <li><a href="#parents" onClick={e => { e.preventDefault(); scrollTo('parents'); }}>For Parents</a></li>
            <li><a href="#schools" onClick={e => { e.preventDefault(); scrollTo('schools'); }}>For Schools</a></li>
            <li><a href="#faq" onClick={e => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a></li>
          </ul>

          <div className="l-nav-cta">
            <button className="btn btn-outline hide-mobile" onClick={() => navigate('/signup?role=school')}>
              For Schools
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            <button className="l-burger" aria-label="Toggle menu" onClick={toggleNav}>
              <BurgerIcon />
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ── HERO ── */}
        <section className="l-hero">
          <div className="adire-pattern" style={{ position: 'absolute', inset: 0 }} />
          <div className="l-hero-inner">
            <div>
              <div className="hero-tag">
                <span className="eyebrow">Ages 7–17 · WhatsApp + In-Person</span>
              </div>
              <h1>
                Help your child use AI to <em>think better</em>, not just get answers faster.
              </h1>
              <p className="lead">
                AI Small Small teaches Nigerian kids how to use AI critically and confidently - alongside real Nigerian school curriculum - through short in-person sessions and a WhatsApp-based program parents can actually see inside.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => { closeNav(); navigate('/signup'); }}>
                  I'm a Parent
                </button>
                <button className="btn btn-ghost" onClick={() => navigate('/signup?role=school')}>
                  I'm a School
                </button>
              </div>
              <div className="hero-meta">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                    <path d="M12 18h.01" />
                  </svg>
                  No app download
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Low data cost
                </span>
                <span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20V10M18 20V4M6 20v-4" />
                  </svg>
                  Nigerian curriculum aligned
                </span>
              </div>
            </div>

            {/* Chat card */}
            <div className="mascot-box">
              <div className="adire-pattern" />
              <div className="chat-card">
                <div className="chat-row">
                  <div className="bot-avatar"><BotIcon /></div>
                  <div className="chat-bubble">Hi! Want help with your homework, or want to practice spotting a fake AI image today?</div>
                </div>
                <div className="chat-row me">
                  <div className="chat-bubble">Can you just write my essay for me?</div>
                </div>
                <div className="chat-row">
                  <div className="bot-avatar"><BotIcon /></div>
                  <div className="chat-bubble">Not quite - let's build your argument together instead. What's your essay about?</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TWO TRACKS ── */}
        <section id="tracks" className="l-section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">What They Learn</span>
              <h2>Two tracks, one program.</h2>
              <p>
                AI literacy is taught by skill level, not age - a beginner is a beginner at 8 or at 16.
                School curriculum stays grade-aligned, with AI woven in as a study partner.
              </p>
            </div>
            <div className="tracks">
              <div className="track-card a">
                <span className="track-num">TRACK A</span>
                <h3>AI Literacy</h3>
                <p>
                  Prompting well, spotting fakes and deepfakes, building simple no-code tools, and thinking
                  critically about AI - taught through play, levelled Beginner to Expert.
                </p>
                <div className="track-tags">
                  <span className="tag">Prompting</span>
                  <span className="tag">Spotting Fakes</span>
                  <span className="tag">No-Code Building</span>
                  <span className="tag">AI Ethics</span>
                </div>
              </div>
              <div className="track-card b">
                <span className="track-num">TRACK B</span>
                <h3>Curriculum + AI</h3>
                <p>
                  Real Nigerian school subjects - Mathematics, English, Basic Science and Technology, through
                  to WASSCE - with AI as a step-by-step study partner, never a shortcut.
                </p>
                <div className="track-tags">
                  <span className="tag">Mathematics</span>
                  <span className="tag">English Studies</span>
                  <span className="tag">Basic Science &amp; Tech</span>
                  <span className="tag">WASSCE Prep</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INNOVATION IMAGE STRIP ── */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img
            src="/images/sign4.jpg"
            alt="Innovation and technology"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(21,38,64,0.75) 0%, rgba(21,38,64,0.3) 50%, rgba(21,38,64,0.75) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{
              fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
              fontSize: 'clamp(22px,3.5vw,42px)',
              color: '#fff', letterSpacing: '-0.01em', textAlign: 'center',
              margin: 0, padding: '0 24px',
            }}>
              Building tomorrow's <span style={{ color: 'var(--marigold)' }}>AI-ready</span> generation. Today.
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="l-section l-section-dark">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">The Rhythm, Every Term</span>
              <h2>Built around how Nigerian families actually learn.</h2>
              <p>No new app to install. The program runs on WhatsApp, where parents already are, with real sessions in between.</p>
            </div>
            <div className="cycle">
              <div className="cycle-step">
                <span className="step-no">01</span>
                <h3>In-person sessions</h3>
                <p>Short, hands-on sessions where kids build, play, and practice with a facilitator - this is where trust and real skill-building happen.</p>
              </div>
              <div className="cycle-step">
                <span className="step-no">02</span>
                <h3>WhatsApp practice</h3>
                <p>Between sessions, kids continue guided lessons on WhatsApp - no download, low data - with parents able to see what's covered.</p>
              </div>
              <div className="cycle-step">
                <span className="step-no">03</span>
                <h3>Kid Innovator showcase</h3>
                <p>Each term ends with kids pitching a small AI-assisted idea of their own - scaled to their age and level.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DOORWAYS ── */}
        <section id="parents" className="l-section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Find Your Door</span>
              <h2>Whoever you're here for, start here.</h2>
            </div>
            <div className="doorways">
              <div className="door parents" role="button" tabIndex={0}
                onClick={() => navigate('/signup')}
                onKeyDown={e => e.key === 'Enter' && navigate('/signup')}>
                <span className="eyebrow">For Parents</span>
                <h3>Give your child a head start on AI, safely.</h3>
                <p>Termly subscription. See exactly what your child is learning, every week.</p>
                <span className="door-link">Explore for parents <ArrowRight /></span>
              </div>

              <div id="schools" className="door schools" role="button" tabIndex={0}
                onClick={() => navigate('/signup?role=school')}
                onKeyDown={e => e.key === 'Enter' && navigate('/signup?role=school')}>
                <span className="eyebrow">For Schools</span>
                <h3>An extracurricular add-on your students will look forward to.</h3>
                <p>Pilot with one class, one term - no disruption to your existing curriculum.</p>
                <span className="door-link">Explore for schools <ArrowRight /></span>
              </div>

              <div className="door sponsors" role="button" tabIndex={0}
                onClick={() => navigate('/signup?role=sponsor')}
                onKeyDown={e => e.key === 'Enter' && navigate('/signup?role=sponsor')}>
                <span className="eyebrow">For Sponsors</span>
                <h3>Back the next generation of future-ready Nigerian kids.</h3>
                <p>Sponsor a termly Kid Innovator showcase in your brand's name.</p>
                <span className="door-link">Explore partnerships <ArrowRight /></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── KID INNOVATOR ── */}
        <section className="l-section">
          <div className="wrap innovator-grid">
            <div>
              <div className="innovator-badge"><StarOutline /></div>
              <h2>Every term ends with an idea kids are proud of.</h2>
              <p>
                From "an app that reminds me to feed my dog" at age 8, to a working chatbot prototype at 16 -
                Kid Innovator is where AI literacy becomes something a child actually made.
              </p>
              <p>
                Judged, celebrated, and shareable - a real portfolio piece by the time they reach secondary school.
              </p>
            </div>
            <div className="innovator-visual">
              <span className="eyebrow">Showcase format scales with level</span>
              <div className="badge-row">
                <span className="badge-pill">
                  <span className="dot" style={{ background: 'var(--leaf)' }} /> Idea + drawing (Beginner)
                </span>
                <span className="badge-pill">
                  <span className="dot" style={{ background: 'var(--marigold)' }} /> Project + pitch (Intermediate)
                </span>
                <span className="badge-pill">
                  <span className="dot" style={{ background: 'var(--coral)' }} /> Full pitch + Q&amp;A (Advanced)
                </span>
                <span className="badge-pill">
                  <span className="dot" style={{ background: 'var(--indigo)' }} /> Capstone portfolio (Expert)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="l-section">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Questions</span>
              <h2>Frequently asked.</h2>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map(({ q, a }) => (
                <div className="faq-item" key={q}>
                  <button className="faq-q" onClick={handleFaqClick}>
                    {q} <PlusIcon />
                  </button>
                  <div className="faq-a">
                    <p>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section id="final-cta" className="l-section" style={{ paddingTop: 0 }}>
          <div className="final-cta-wrap">
            <div className="final-cta-box">
              <div className="adire-pattern-dark" />
              <div className="final-cta-inner">
                <h2>Small small, every child becomes AI-ready.</h2>
                <p>Join the first cohort of parents and schools shaping how Nigerian kids learn AI.</p>
                <div className="btn-actions">
                  <button className="btn btn-dark" onClick={() => navigate('/signup')}>
                    Get Started as a Parent
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                    onClick={() => navigate('/signup?role=school')}
                  >
                    Partner as a School
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="l-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#top" className="l-logo" onClick={e => { e.preventDefault(); scrollTo('top'); }}>
                <span className="l-logo-mark"><StarIcon /></span>
                AI Small Small
              </a>
              <p>AI literacy and Nigerian curriculum support for kids 7–17, delivered where families already are.</p>
            </div>
            <div className="footer-col">
              <h4>Program</h4>
              <ul>
                <li><a href="#tracks" onClick={e => { e.preventDefault(); scrollTo('tracks'); }}>AI Literacy Track</a></li>
                <li><a href="#tracks" onClick={e => { e.preventDefault(); scrollTo('tracks'); }}>Curriculum Track</a></li>
                <li><a href="#how" onClick={e => { e.preventDefault(); scrollTo('how'); }}>How It Works</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Involved</h4>
              <ul>
                <li><Link to="/for-parents" style={{ color: 'rgba(251,246,236,0.6)', textDecoration: 'none', fontSize: 14.5 }}>For Parents</Link></li>
                <li><Link to="/for-schools" style={{ color: 'rgba(251,246,236,0.6)', textDecoration: 'none', fontSize: 14.5 }}>For Schools</Link></li>
                <li><Link to="/for-sponsors" style={{ color: 'rgba(251,246,236,0.6)', textDecoration: 'none', fontSize: 14.5 }}>For Sponsors</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about" style={{ color: 'rgba(251,246,236,0.6)', textDecoration: 'none', fontSize: 14.5 }}>About / Why This Matters</Link></li>
                <li><a href="#faq" onClick={e => { e.preventDefault(); scrollTo('faq'); }} style={{ color: 'rgba(251,246,236,0.6)' }}>FAQ</a></li>
                <li><Link to="/login" style={{ color: 'rgba(251,246,236,0.6)', textDecoration: 'none', fontSize: 14.5 }}>Log In</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 AI Small Small, Nigeria</span>
            <span>Made for Nigerian families</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
