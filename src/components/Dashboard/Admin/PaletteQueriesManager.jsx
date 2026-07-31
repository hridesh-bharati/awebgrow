"use client";

import React, { useEffect, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { toast } from 'sonner';

export default function PaletteQueriesManager() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    const queriesRef = ref(rtdb, 'palette_queries');
    return onValue(queriesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setQueries(list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
      } else {
        setQueries([]);
      }
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this query?")) return;
    try {
      await remove(ref(rtdb, `palette_queries/${id}`));
      toast.success("Query deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return <div className="p-4 text-secondary">Loading Queries...</div>;
  }

  return (
    <div className="container-fluid py-3">
      {/* HEADER */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <h4 className="fw-bold text-white mb-0">Client Queries</h4>
        <span className="hero-badge">
          <span className="badge-dot-pink"></span>
          <span className="badge-text-glow">{queries.length} TOTAL</span>
        </span>
      </div>

      {/* CARDS GRID */}
      {queries.length === 0 ? (
        <p className="text-secondary small">No queries found.</p>
      ) : (
        <div className="row g-3">
          {queries.map((q, index) => {
            const hex1 = q.selectedPalette?.color1?.hex || '#ff0080';
            const hex2 = q.selectedPalette?.color2?.hex || '#a855f7';
            
            // Alternating Neon Themes: Pink vs Dark Blue / Cyan
            const isBlue = index % 2 !== 0;
            const accentColor = isBlue ? '#3b82f6' : '#ff0080';
            const shadowGlow = isBlue ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 0, 128, 0.15)';

            return (
              <div key={q.id} className="col-12 col-md-6 col-xl-4">
                <div 
                  className="stat-card-glow p-3 d-flex flex-column justify-content-between h-100"
                  style={{
                    border: `1px solid ${isBlue ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 0, 128, 0.3)'}`,
                    boxShadow: `0 0 20px ${shadowGlow}`
                  }}
                >
                  
                  {/* TOP HEADER */}
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="hero-badge" style={{ borderColor: isBlue ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 0, 128, 0.4)' }}>
                        <span className="badge-text-glow" style={{ color: isBlue ? '#93c5fd' : '#fce7f3' }}>
                          {q.selectedPalette?.id || 'COMBO'}
                        </span>
                      </span>

                      {/* Swatches */}
                      <div className="d-flex align-items-center p-1 rounded-pill bg-black border border-secondary border-opacity-25">
                        <div className="rounded-circle" style={{ width: '16px', height: '16px', backgroundColor: hex1 }} />
                        <div className="rounded-circle ms-1" style={{ width: '16px', height: '16px', backgroundColor: hex2 }} />
                      </div>
                    </div>

                    <h6 className="fw-bold text-white text-uppercase mb-2 text-truncate">
                      {q.selectedPalette?.title || 'Custom Theme'}
                    </h6>

                    <div className="text-white small fw-medium d-flex align-items-center gap-2 mb-1">
                      <i className="bi bi-person-fill" style={{ color: accentColor }}></i>
                      <span className="text-truncate">{q.clientName || 'N/A'}</span>
                    </div>

                    <div className="text-secondary small d-flex align-items-center gap-2 mb-3">
                      <i className="bi bi-telephone-fill" style={{ color: accentColor, fontSize: '12px' }}></i>
                      <span>{q.clientPhone || 'N/A'}</span>
                    </div>
                  </div>

                  {/* BOTTOM ACTIONS */}
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-10">
                    <button
                      onClick={() => setSelectedQuery(q)}
                      className="btn btn-secondary-glow btn-sm"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#queryDetailsOffcanvas"
                      style={{
                        borderColor: isBlue ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 0, 128, 0.4)'
                      }}
                    >
                      <i className="bi bi-eye-fill me-1" style={{ color: accentColor }}></i> View Details
                    </button>

                    <button
                      onClick={() => handleDelete(q.id)}
                      className="btn btn-sm text-danger opacity-75"
                      title="Delete"
                    >
                      <i className="bi bi-trash-fill fs-6"></i>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BOOTSTRAP NATIVE BOTTOM OFFCANVAS WITH TOP PADDING & DRAG HANDLE */}
      <div 
        className="offcanvas offcanvas-bottom bg-dark text-white rounded-top-4" 
        tabIndex="-1" 
        id="queryDetailsOffcanvas"
        style={{ 
          height: 'auto', 
          maxHeight: '85vh', 
          borderTop: '2px solid #ff0080',
          zIndex:2,
          boxShadow: '0 -10px 40px rgba(255, 0, 128, 0.25)' 
        }}
      >
        {/* DRAG HANDLE BAR & TOP PADDING */}
        <div className="pt-3 pb-1 d-flex justify-content-center">
          <div className="rounded-pill" style={{ width: '42px', height: '4px', backgroundColor: '#ff0080', opacity: 0.8 }}></div>
        </div>

        <div className="offcanvas-header pt-4 pb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="hero-badge">
              <span className="badge-text-glow">{selectedQuery?.selectedPalette?.id || 'COMBO'}</span>
            </span>
            <h5 className="offcanvas-title fw-bold text-white mb-0">
              {selectedQuery?.selectedPalette?.title || 'Custom Theme'}
            </h5>
          </div>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        {selectedQuery && (
          <div className="offcanvas-body pt-2 pb-4">
            {/* CLIENT INFO */}
            <div className="stat-card-glow p-3 mb-3">
              <div className="row g-3">
                <div className="col-6">
                  <small className="d-block font-monospace fw-bold mb-1" style={{ fontSize: '11px', color: '#ff77c2' }}>CLIENT NAME</small>
                  <span className="text-white fw-semibold">{selectedQuery.clientName || 'N/A'}</span>
                </div>
                <div className="col-6">
                  <small className="d-block font-monospace fw-bold mb-1" style={{ fontSize: '11px', color: '#ff77c2' }}>CONTACT</small>
                  <span className="text-white fw-semibold">{selectedQuery.clientPhone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* REQUIREMENTS */}
            {selectedQuery.websiteRequirements && (
              <div className="stat-card-glow p-3 mb-3">
                <small className="d-block font-monospace fw-bold mb-1" style={{ fontSize: '11px', color: '#ff77c2' }}>REQUIREMENTS</small>
                <p className="mb-0 text-white-50 small" style={{ lineHeight: '1.6' }}>{selectedQuery.websiteRequirements}</p>
              </div>
            )}

            {/* COLOR PALETTE */}
            <div className="stat-card-glow p-3 mb-3">
              <small className="d-block font-monospace fw-bold mb-2" style={{ fontSize: '11px', color: '#ff77c2' }}>COLOR PALETTE</small>
              <div className="d-flex align-items-center gap-3 font-monospace small">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle border border-secondary" style={{ width: '18px', height: '18px', backgroundColor: selectedQuery.selectedPalette?.color1?.hex || '#ff0080' }} />
                  <span className="text-white">{selectedQuery.selectedPalette?.color1?.hex || '#ff0080'}</span>
                </div>
                <span className="text-secondary opacity-50">|</span>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle border border-secondary" style={{ width: '18px', height: '18px', backgroundColor: selectedQuery.selectedPalette?.color2?.hex || '#7928ca' }} />
                  <span className="text-white">{selectedQuery.selectedPalette?.color2?.hex || '#7928ca'}</span>
                </div>
              </div>
            </div>

            {/* TIMESTAMP */}
            <div className="text-secondary small mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-clock" style={{ color: '#ff0080' }}></i>
              <span>Submitted: {formatDate(selectedQuery.createdAt)}</span>
            </div>

            {/* QUICK ACTIONS */}
            <div className="d-flex gap-2">
              {selectedQuery.clientPhone && (
                <a
                  href={`https://wa.me/${selectedQuery.clientPhone.replace(/[^0-9]/g, '').length === 10 ? '91' + selectedQuery.clientPhone.replace(/[^0-9]/g, '') : selectedQuery.clientPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success flex-fill rounded-pill py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <i className="bi bi-whatsapp"></i> WhatsApp
                </a>
              )}
              <a
                href={`tel:${selectedQuery.clientPhone}`}
                className="btn btn-secondary-glow flex-fill rounded-pill py-2.5 justify-content-center d-flex align-items-center gap-2"
                style={{ borderColor: '#ff0080' }}
              >
                <i className="bi bi-telephone" style={{ color: '#ff0080' }}></i> Call
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}