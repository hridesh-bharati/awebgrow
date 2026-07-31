"use client";

import React, { useState, useRef } from 'react';
import { colorPalettes } from '@/data/colorPalettes';
import { rtdb } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { toast } from 'sonner';

const getContrastingColor = (hexColor) => {
  if (!hexColor) return '#FFFFFF';
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return ((r * 299 + g * 587 + b * 114) / 1000) > 128 ? '#000000' : '#FFFFFF';
};

export default function ColorPaletteSelector() {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [websiteRequirements, setWebsiteRequirements] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeModalPalette, setActiveModalPalette] = useState(null);

  const formRef = useRef(null);
  const [customColors, setCustomColors] = useState({});

  const handleCustomColorChange = (paletteId, colorKey, newColor) => {
    setCustomColors((prev) => ({
      ...prev,
      [paletteId]: { ...prev[paletteId], [colorKey]: newColor },
    }));
  };

  const handleSelectPalette = (item) => {
    setSelectedPalette(item);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPalette) return toast.error("Kripya ek color palette select karein!");

    setLoading(true);
    try {
      const activeCustomColors = customColors[selectedPalette.id] || null;
      await push(ref(rtdb, 'palette_queries'), {
        clientName,
        clientPhone,
        websiteRequirements,
        estimatedBudget: selectedBudget || 'Not Specified',
        selectedPalette: {
          ...selectedPalette,
          color1: { ...selectedPalette.color1, hex: activeCustomColors?.color1 || selectedPalette.color1.hex },
          color2: { ...selectedPalette.color2, hex: activeCustomColors?.color2 || selectedPalette.color2.hex },
        },
        createdAt: serverTimestamp(),
        status: 'Pending',
      });

      toast.success("Requirements sent successfully!");
      setSelectedPalette(null);
      setClientName('');
      setClientPhone('');
      setWebsiteRequirements('');
      setSelectedBudget('');
      setCustomColors({});
    } catch (error) {
      toast.error("Failed to submit choice!");
    } finally {
      setLoading(false);
    }
  };

  const displayedPalettes = showAll ? colorPalettes : colorPalettes.slice(0, 8);

  return (
    <div className="container px-2 px-md-3 py-4">
      <h3 className="fw-black text-theme-primary mb-3 text-center text-md-start">
        Select Color Theme For Your Website
      </h3>

      <div className="row g-2 g-md-3 mb-4">
        {displayedPalettes.map((item) => {
          const isSelected = selectedPalette?.id === item.id;
          const custom = customColors[item.id] || {};
          const currentHex1 = custom.color1 || item.color1.hex;
          const currentHex2 = custom.color2 || item.color2.hex;

          return (
            <div key={item.id} className="col-6 col-md-3 px-1 px-sm-2">
              <div
                className={`rounded-4 overflow-hidden position-relative transition-all ${isSelected ? 'shadow-lg' : ''}`}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '3px solid #ff0080' : '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                }}
                onClick={() => handleSelectPalette(item)}
              >
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-0 end-0 m-1.5 rounded-circle border-0 d-flex align-items-center justify-content-center shadow"
                  style={{ width: '26px', height: '26px', backgroundColor: 'rgba(0,0,0,0.65)', color: '#fff', zIndex: 10, fontSize: '11px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalPalette(item);
                  }}
                  title="Customize both colors"
                >
                  <i className="bi bi-palette-fill"></i>
                </button>

                <div className="p-2 p-sm-3 text-center position-relative d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: currentHex1, height: '85px' }}>
                  <span className="badge font-monospace" style={{ fontSize: '9.5px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}>{currentHex1}</span>
                  <div className="fw-bold text-uppercase mt-1.5 text-truncate w-100" style={{ fontSize: '10.5px', color: getContrastingColor(currentHex1) }}>{item.color1.name}</div>
                </div>

                <div className="bg-dark text-white text-center fw-bold py-0.5" style={{ fontSize: '8.5px', letterSpacing: '0.8px' }}>
                  {item.id.toUpperCase()}
                </div>

                <div className="p-2 p-sm-3 text-center position-relative d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: currentHex2, height: '85px' }}>
                  <div className="fw-bold text-uppercase mb-1.5 text-truncate w-100" style={{ fontSize: '10.5px', color: getContrastingColor(currentHex2) }}>{item.color2.name}</div>
                  <span className="badge font-monospace" style={{ fontSize: '9.5px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}>{currentHex2}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {colorPalettes.length > 8 && (
        <div className="text-center mb-4">
          <button type="button" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', fontSize: '0.85rem' }} onClick={() => setShowAll(!showAll)}>
            {showAll ? '⬆ Show Less Palettes' : `⬇ Explore All Palettes (${colorPalettes.length})`}
          </button>
        </div>
      )}

      {/* STANDARD BOOTSTRAP MODAL FOR COLOR PICKER */}
      {activeModalPalette && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }} onClick={() => setActiveModalPalette(null)}>
          <div className="modal-dialog modal-dialog-centered modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white border border-secondary rounded-4 shadow">
              <div className="modal-header border-secondary pb-2">
                <h6 className="modal-title fw-bold">🎨 Customize Colors</h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setActiveModalPalette(null)}></button>
              </div>

              <div className="modal-body py-3">
                <div className="d-flex align-items-center justify-content-between p-2 mb-2 bg-black bg-opacity-50 rounded-3 border border-secondary">
                  <div>
                    <small className="fw-bold text-uppercase d-block">{activeModalPalette.color1.name}</small>
                    <span className="badge bg-secondary font-monospace">{customColors[activeModalPalette.id]?.color1 || activeModalPalette.color1.hex}</span>
                  </div>
                  <input
                    type="color"
                    className="form-control form-control-color border-0 bg-transparent cursor-pointer p-0"
                    style={{ width: '40px', height: '35px' }}
                    value={customColors[activeModalPalette.id]?.color1 || activeModalPalette.color1.hex}
                    onChange={(e) => handleCustomColorChange(activeModalPalette.id, 'color1', e.target.value)}
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between p-2 bg-black bg-opacity-50 rounded-3 border border-secondary">
                  <div>
                    <small className="fw-bold text-uppercase d-block">{activeModalPalette.color2.name}</small>
                    <span className="badge bg-secondary font-monospace">{customColors[activeModalPalette.id]?.color2 || activeModalPalette.color2.hex}</span>
                  </div>
                  <input
                    type="color"
                    className="form-control form-control-color border-0 bg-transparent cursor-pointer p-0"
                    style={{ width: '40px', height: '35px' }}
                    value={customColors[activeModalPalette.id]?.color2 || activeModalPalette.color2.hex}
                    onChange={(e) => handleCustomColorChange(activeModalPalette.id, 'color2', e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-primary w-100 fw-bold rounded-3 py-2"
                  onClick={() => {
                    handleSelectPalette(activeModalPalette);
                    setActiveModalPalette(null);
                  }}
                >
                  Apply & Select Theme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MINIMAL FORM */}
      <div ref={formRef} className="pt-2">
        {selectedPalette && (
          <form onSubmit={handleSubmit} className="p-3 p-sm-4 rounded-4 border mx-auto transition-all" style={{ maxWidth: '520px', backgroundColor: '#0b0e14', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary px-2.5 py-1 text-uppercase fw-bold" style={{ fontSize: '11px', borderRadius: '6px' }}>Selected</span>
                <span className="fw-bold text-white text-uppercase font-monospace" style={{ fontSize: '0.92rem' }}>{selectedPalette.title}</span>
              </div>
              <div className="d-flex gap-1.5">
                <span className="d-inline-block rounded-circle" style={{ width: '18px', height: '18px', backgroundColor: customColors[selectedPalette.id]?.color1 || selectedPalette.color1.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
                <span className="d-inline-block rounded-circle" style={{ width: '18px', height: '18px', backgroundColor: customColors[selectedPalette.id]?.color2 || selectedPalette.color2.hex, border: '1px solid rgba(255,255,255,0.3)' }} />
              </div>
            </div>

            <div className="mb-3">
              <input type="text" className="form-control text-white bg-dark bg-opacity-50 border-secondary border-opacity-50 py-2.5 px-3" placeholder="Enter your name *" style={{ fontSize: '0.9rem', borderRadius: '8px' }} value={clientName} onChange={(e) => setClientName(e.target.value)} required />
            </div>

            <div className="mb-3">
              <input type="text" className="form-control text-white bg-dark bg-opacity-50 border-secondary border-opacity-50 py-2.5 px-3" placeholder="Enter your Number / Email *" style={{ fontSize: '0.9rem', borderRadius: '8px' }} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required />
            </div>

            <div className="mb-3">
              <textarea className="form-control text-white bg-dark bg-opacity-50 border-secondary border-opacity-50 p-3" rows="3" placeholder="Describe your website requirement (e.g., Business website, E-commerce, Portfolio, Blog, etc.)" style={{ fontSize: '0.88rem', borderRadius: '8px', resize: 'none' }} value={websiteRequirements} onChange={(e) => setWebsiteRequirements(e.target.value)}></textarea>
            </div>

            <div className="mb-4">
              <div className="text-secondary small mb-1.5 d-flex align-items-center gap-1" style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                <span>💰</span> <span>Your Budget Range</span>
              </div>
              <select className="form-select text-white bg-dark bg-opacity-50 border-secondary border-opacity-50 py-2.5 px-3" style={{ fontSize: '0.88rem', borderRadius: '8px' }} value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
                <option value="">-- Select your budget --</option>
                <option value="₹5,000">₹5,000</option>
                <option value="₹10,000">₹10,000</option>
                <option value="₹15,000">₹15,000</option>
                <option value="₹20,000">₹20,000</option>
                <option value="₹45,000">₹45,000</option>
                <option value="₹1,00,000+">₹1,00,000+</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="btn w-100 fw-bold py-2.5 text-white d-flex align-items-center justify-content-center gap-2" style={{ background: 'linear-gradient(135deg, #ff0080 0%, #7928ca 100%)', border: 'none', borderRadius: '8px', fontSize: '0.95rem' }}>
              🚀 {loading ? 'Sending...' : 'Send Requirements to Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}