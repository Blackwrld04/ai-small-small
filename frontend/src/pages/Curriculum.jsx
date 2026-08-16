import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Curriculum() {
  const [trackA, setTrackA] = useState([]);
  const [trackB, setTrackB] = useState([]);
  const [tab, setTab] = useState('a');

  useEffect(() => {
    api.getTrackA().then(setTrackA);
    api.getTrackB().then(setTrackB);
  }, []);

  return (
    <div className="page">
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>Curriculum</h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: 26 }}>Track A is by skill level. Track B follows Nigerian school curriculum by age band.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 26 }}>
        <button className={tab === 'a' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('a')}>Track A · AI Literacy</button>
        <button className={tab === 'b' ? 'btn btn-primary' : 'btn btn-outline'} onClick={() => setTab('b')}>Track B · Curriculum</button>
      </div>

      {tab === 'a' && (
        <div style={{ display: 'grid', gap: 16 }}>
          {trackA.map(level => (
            <div className="card" key={level.level}>
              <span className="eyebrow">Level {level.level}</span>
              <h3 style={{ fontSize: 20, margin: '8px 0 4px' }}>{level.name} - {level.subtitle}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', marginBottom: 14 }}>{level.description}</p>
              {level.terms.map(term => (
                <div key={term.term} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>Term {term.term}: {term.title}</strong>
                  <ul style={{ margin: '6px 0 0', paddingLeft: 20, fontSize: 13.5, color: 'var(--ink-soft)' }}>
                    {term.modules.map(m => <li key={m.title}>{m.title}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'b' && (
        <div style={{ display: 'grid', gap: 16 }}>
          {trackB.map(band => (
            <div className="card" key={band.band}>
              <span className="eyebrow">Band {band.band} · Ages {band.ages}</span>
              <h3 style={{ fontSize: 20, margin: '8px 0 10px' }}>{band.equivalent}</h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {band.subjects.map(s => (
                  <span key={s} style={{ fontSize: 12.5, fontFamily: "'IBM Plex Mono', monospace", background: 'var(--paper-dim)', border: '1px solid var(--line)', padding: '5px 10px', borderRadius: 8, color: 'var(--ink-soft)' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
