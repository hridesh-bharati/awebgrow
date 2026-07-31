"use client";

import React, { useEffect, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function PaletteQueriesManager() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queriesRef = ref(rtdb, 'palette_queries');
    const unsubscribe = onValue(queriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setQueries(list);
      } else {
        setQueries([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-theme-secondary p-4">Loading Color Palette Requests...</div>;
  }

  return (
    <div className="rounded-4 p-4 border mb-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', boxShadow: '0 10px 30px var(--shadow-color)' }}>
      <h5 className="fw-black text-theme-primary mb-3" style={{ fontWeight: 800 }}>Client Color Preferences Queries</h5>
      
      {queries.length === 0 ? (
        <p className="text-theme-secondary small m-0">No color preferences submitted yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle m-0 border-0 text-theme-primary">
            <thead>
              <tr className="text-theme-secondary small border-bottom" style={{ fontSize: '12px', borderColor: 'var(--border-subtle)' }}>
                <th className="pb-3 fw-bold border-0 ps-0 text-theme-secondary">CLIENT</th>
                <th className="pb-3 fw-bold border-0 text-theme-secondary">CONTACT</th>
                <th className="pb-3 fw-bold border-0 text-theme-secondary">SELECTED COMBO</th>
                <th className="pb-3 fw-bold border-0 text-end pe-0 text-theme-secondary">PREVIEW</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q.id} className="border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                  <td className="py-3 ps-0 fw-bold text-theme-primary">{q.clientName || 'Anonymous'}</td>
                  <td className="py-3 text-theme-secondary small">{q.clientPhone || 'N/A'}</td>
                  <td className="py-3">
                    <span className="fw-bold text-theme-primary">{q.selectedPalette?.title}</span>
                    <div className="text-theme-secondary font-monospace" style={{ fontSize: '11px' }}>
                      {q.selectedPalette?.color1?.hex} / {q.selectedPalette?.color2?.hex}
                    </div>
                  </td>
                  <td className="py-3 text-end pe-0">
                    <div className="d-inline-flex rounded overflow-hidden border border-secondary">
                      <div 
                        style={{ backgroundColor: q.selectedPalette?.color1?.hex, width: '28px', height: '28px' }} 
                        title={q.selectedPalette?.color1?.name} 
                      />
                      <div 
                        style={{ backgroundColor: q.selectedPalette?.color2?.hex, width: '28px', height: '28px' }} 
                        title={q.selectedPalette?.color2?.name} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}