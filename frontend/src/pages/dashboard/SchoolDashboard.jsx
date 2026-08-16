import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

const TOOLS = {
  Plan: [
    { name: 'Lesson Plan', desc: "Structured plans tailored to your curriculum and students' needs", icon: '📋', color: '#E8F4FD' },
    { name: 'Learning Objectives', desc: 'Develop clear, measurable objectives to guide instruction', icon: '🎯', color: '#F0F8EE' },
    { name: 'Lesson Hook', desc: 'Plan compelling lesson starters to engage students', icon: '🪝', color: '#FFF4E6' },
    { name: 'Exit Ticket', desc: 'Create quick end-of-lesson assessments to check understanding', icon: '🎟', color: '#FDE8F0' },
    { name: 'Multiple Choice Assessment', desc: 'Generate graded multiple-choice questions on any topic', icon: '✅', color: '#F0F8EE' },
    { name: 'Rubric Generator', desc: 'Build clear, fair assessment rubrics in seconds', icon: '📊', color: '#E8F4FD' },
  ],
  Create: [
    { name: 'Informational Text', desc: 'Create informational text for a variety of topics', icon: '📄', color: '#FFF4E6' },
    { name: 'Clear Directions', desc: 'Generate concise, easy-to-follow instructions for activities', icon: '🗺', color: '#FDE8F0' },
    { name: 'Leveler', desc: 'Adjust the reading complexity of any text', icon: '⚖️', color: '#F0F8EE' },
    { name: 'Chunk Text', desc: 'Break complex texts into manageable sections for easier comprehension', icon: '🧩', color: '#E8F4FD' },
  ],
  Support: [
    { name: 'Real World Context Generator', desc: 'Connect lesson topics to engaging real-world examples', icon: '🌍', color: '#F0F8EE' },
    { name: 'Make It Relevant', desc: "Link lesson content to students' lives and interests to boost engagement", icon: '🔗', color: '#FFF4E6' },
    { name: 'Questions Generator', desc: 'Generate discussion questions for any piece of content', icon: '❓', color: '#FDE8F0' },
    { name: 'Discussion Prompts', desc: 'Craft engaging prompts to stimulate meaningful classroom discussions', icon: '💬', color: '#E8F4FD' },
  ],
  Students: [
    { name: 'Progress Snapshot', desc: "Review your students' performance and identify areas for support", icon: '📈', color: '#F0F8EE' },
    { name: 'Class Summary Poem', desc: 'Transform memorable class moments into a creative poetic recap', icon: '✨', color: '#FFF4E6' },
    { name: 'Writing Coach', desc: 'Help students improve their writing with structured feedback', icon: '✏️', color: '#FDE8F0' },
    { name: 'WASSCE Prep Pack', desc: 'Generate practice materials aligned to the WASSCE syllabus', icon: '🏫', color: '#E8F4FD' },
  ],
};

export default function SchoolDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTool, setActiveTool] = useState(null);

  const allTools = Object.entries(TOOLS).flatMap(([cat, tools]) => tools.map(t => ({ ...t, category: cat })));
  const tabs = ['All', 'Plan', 'Create', 'Support', 'Students'];

  const filtered = allTools.filter(t => {
    const matchTab = activeTab === 'All' || t.category === activeTab;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 6 }}>Welcome, {user.name}</h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: 14.5 }}>Your AI-powered teaching assistant. Free tools to save prep time and improve instruction.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/curriculum" className="btn btn-outline" style={{ fontSize: 14, padding: '10px 18px' }}>Curriculum Browser</Link>
          <Link to="/chat-history" className="btn btn-outline" style={{ fontSize: 14, padding: '10px 18px' }}>Student Chats</Link>
        </div>
      </div>

      {/* Stat strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 16, marginBottom: 36 }}>
        {[
          { label: 'Students enrolled', value: '-', note: 'Add students to start' },
          { label: 'Active this week', value: '-', note: 'After first sessions' },
          { label: 'Modules completed', value: '-', note: 'Tracking starts live' },
          { label: 'Term progress', value: 'Term 1', note: 'Pilot cohort' },
        ].map(s => (
          <div className="card" key={s.label} style={{ padding: '18px 20px' }}>
            <p style={{ fontSize: 22, fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, color: 'var(--indigo)', margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px', color: 'var(--ink)' }}>{s.label}</p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: 0 }}>{s.note}</p>
          </div>
        ))}
      </div>

      {/* Tools section */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>AI Small Small Tools</h2>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>AI-powered tools to save time and improve instruction</p>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tools…"
            style={{ padding: '9px 14px', borderRadius: 10, border: '1.5px solid var(--line)', fontSize: 14, width: 200, fontFamily: "'Work Sans', sans-serif" }}
          />
        </div>

        {/* Tab strip */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearch(''); }}
              style={{
                padding: '7px 18px', borderRadius: 999, border: '1.5px solid',
                borderColor: activeTab === tab ? 'var(--indigo)' : 'var(--line)',
                background: activeTab === tab ? 'var(--indigo)' : '#fff',
                color: activeTab === tab ? 'var(--paper)' : 'var(--ink)',
                fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tool grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
          {filtered.map(tool => (
            <button
              key={tool.name}
              onClick={() => setActiveTool(tool)}
              style={{
                background: tool.color, border: '1.5px solid var(--line)', borderRadius: 14,
                padding: '18px 16px', textAlign: 'left', cursor: 'pointer',
                transition: 'transform .15s, box-shadow .15s',
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{tool.icon}</span>
              <div>
                <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 14.5, margin: '0 0 4px', color: 'var(--indigo)' }}>{tool.name}</p>
                <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.45 }}>{tool.desc}</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, gridColumn: '1/-1', padding: '20px 0' }}>No tools match "{search}"</p>
          )}
        </div>
      </div>

      {/* Tool modal */}
      {activeTool && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setActiveTool(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(27,27,24,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div style={{ background: '#fff', borderRadius: 22, padding: 36, maxWidth: 520, width: '100%', position: 'relative' }}>
            <button onClick={() => setActiveTool(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--ink-soft)' }}>×</button>
            <span style={{ fontSize: 40 }}>{activeTool.icon}</span>
            <h2 style={{ fontSize: 22, margin: '12px 0 8px' }}>{activeTool.name}</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 22 }}>{activeTool.desc}</p>
            <div style={{ background: 'var(--paper-dim)', borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: 0 }}>
                This tool uses AI to generate first drafts tailored to Nigerian school contexts. Full implementation - where you type your requirements and the AI generates the output - is coming in the next build phase.
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setActiveTool(null)}>Got It</button>
          </div>
        </div>
      )}

      {/* Pilot CTA */}
      <div className="card" style={{ marginTop: 28, background: 'var(--paper-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h3 style={{ fontSize: 17, marginBottom: 4 }}>Setting up your first class</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: 0 }}>Student roster management and bulk-invite are next on the build list. Contact us to start your pilot now.</p>
        </div>
        <button className="btn btn-primary" onClick={() => window.open('mailto:hello@aismallsmall.ng', '_blank')}>Contact Us</button>
      </div>
    </div>
  );
}
