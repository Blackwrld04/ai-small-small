import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BANDS = [
  { band: 'A', label: 'Ages 7–9', sub: 'Primary 2–4', desc: 'Early exploration - activities are short, visual, and play-based.' },
  { band: 'B', label: 'Ages 10–12', sub: 'Primary 5–6 / JSS1', desc: 'Building curiosity into skill - prompting practice and AI tools.' },
  { band: 'C', label: 'Ages 13–15', sub: 'JSS2–SS1', desc: 'Deeper AI literacy and curriculum support for growing independence.' },
  { band: 'D', label: 'Ages 16–17', sub: 'SS1–SS3 · WASSCE track', desc: 'Advanced prompting, ethics, and WASSCE exam preparation.' },
];

const AI_LEVELS = [
  { level: 1, name: 'Beginner - AI Explorers', desc: 'Brand new to AI. Start here if your child has never used AI tools purposefully.' },
  { level: 2, name: 'Intermediate - AI Builders', desc: 'Comfortable chatting with AI but wants to learn to use it properly.' },
  { level: 3, name: 'Advanced - AI Thinkers', desc: 'Already using AI regularly and ready to go deeper on ethics and technique.' },
  { level: 4, name: 'Expert - AI Innovators', desc: 'Building with AI and ready for capstone projects and WASSCE prep.' },
];

/**
 * OnboardingModal
 * Props:
 *   role: 'parent' | 'learner' | 'child' | 'school'
 *   onComplete: () => void  - called when the user finishes or skips
 */
export default function OnboardingModal({ role, onComplete }) {
  const [step, setStep] = useState(1);
  const [childAge, setChildAge] = useState('');
  const [aiLevel, setAiLevel] = useState(null);
  const navigate = useNavigate();

  const totalSteps = role === 'parent' ? 2 : role === 'school' ? 1 : 2;

  function handleFinish() {
    onComplete();
    navigate('/dashboard');
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(27,27,24,0.6)', zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '36px 32px', maxWidth: 540, width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              height: 4, flex: 1, borderRadius: 99,
              background: i < step ? 'var(--indigo)' : 'var(--paper-dim)',
            }} />
          ))}
        </div>

        {/* STEP 1 - for parent: child's age band; for learner/child: AI level */}
        {step === 1 && (role === 'parent') && (
          <>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Set up your children</span>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>What age is your first child?</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginBottom: 22 }}>This sets their curriculum band. You can add more children later from your dashboard.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {BANDS.map(b => (
                <div key={b.band}
                  className={`role-card ${childAge === b.band ? 'selected' : ''}`}
                  onClick={() => setChildAge(b.band)}
                >
                  <div>
                    <h4>{b.label}</h4>
                    <p>{b.sub} - {b.desc}</p>
                  </div>
                  {childAge === b.band && <span style={{ color: 'var(--indigo)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline" style={{ fontSize: 14 }} onClick={handleFinish}>Skip for now</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!childAge} onClick={() => setStep(2)}>Continue</button>
            </div>
          </>
        )}

        {/* STEP 1 - for learner/child: AI level */}
        {step === 1 && (role === 'learner' || role === 'child') && (
          <>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Personalise your learning</span>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>What's your AI experience?</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginBottom: 22 }}>Don't worry - there's no wrong answer. You can change this anytime.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {AI_LEVELS.map(l => (
                <div key={l.level}
                  className={`role-card ${aiLevel === l.level ? 'selected' : ''}`}
                  onClick={() => setAiLevel(l.level)}
                >
                  <div>
                    <h4>{l.name}</h4>
                    <p>{l.desc}</p>
                  </div>
                  {aiLevel === l.level && <span style={{ color: 'var(--indigo)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline" style={{ fontSize: 14 }} onClick={handleFinish}>Skip for now</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={!aiLevel} onClick={() => setStep(2)}>Continue</button>
            </div>
          </>
        )}

        {/* STEP 1 - school */}
        {step === 1 && role === 'school' && (
          <>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>School setup</span>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>Welcome to AI Small Small for Schools</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginBottom: 18 }}>
              Your teacher dashboard is ready. You have access to all AI teaching tools immediately - no setup required to start exploring.
            </p>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14.5, marginBottom: 24 }}>
              Student roster management and bulk student invites are coming in the next build phase. To discuss your pilot setup, contact us and we'll get you started.
            </p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleFinish}>
              Go to my dashboard
            </button>
          </>
        )}

        {/* STEP 2 - parent: brief platform explainer */}
        {step === 2 && role === 'parent' && (
          <>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>One last thing</span>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>How the child login works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {[
                { n: '1', title: 'You add your child', body: "From your dashboard, you create a username and password for your child. They never self-register." },
                { n: '2', title: 'They log in separately', body: "Your child logs in at /kid-login using the credentials you created - not the regular login page." },
                { n: '3', title: 'You see everything', body: "Every AI conversation is visible from your dashboard. Nothing is hidden from you." },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--indigo)', color: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, margin: '0 0 3px' }}>{s.title}</p>
                    <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: 0 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleFinish}>
              Got it - take me to my dashboard
            </button>
          </>
        )}

        {/* STEP 2 - learner: curriculum intro */}
        {step === 2 && (role === 'learner' || role === 'child') && (
          <>
            <span className="eyebrow" style={{ marginBottom: 8, display: 'block' }}>Your learning path</span>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>Here's what's waiting for you</h2>
            <div style={{ background: 'var(--paper-dim)', borderRadius: 14, padding: '20px 18px', marginBottom: 20 }}>
              <span className="eyebrow" style={{ color: 'var(--leaf-deep)', marginBottom: 8, display: 'block' }}>Track A · AI Literacy - {AI_LEVELS.find(l => l.level === aiLevel)?.name}</span>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: 0 }}>
                You'll start with four modules, each with a short assessment at the end. The AI tutor is your practice partner - not a homework machine.
              </p>
            </div>
            <div style={{ background: 'var(--paper-dim)', borderRadius: 14, padding: '20px 18px', marginBottom: 24 }}>
              <span className="eyebrow" style={{ color: 'var(--leaf-deep)', marginBottom: 8, display: 'block' }}>Track B · Curriculum support</span>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: 0 }}>
                Maths, English, Science - with AI as a study partner that asks you questions instead of giving you answers.
              </p>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleFinish}>
              Start learning
            </button>
          </>
        )}
      </div>
    </div>
  );
}
