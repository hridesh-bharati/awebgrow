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
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export default function ColorPaletteSelector() {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [activeModalPalette, setActiveModalPalette] = useState(null);

  const formRef = useRef(null);
  const [customColors, setCustomColors] = useState({});

  const handleCustomColorChange = (paletteId, colorKey, newColor) => {
    setCustomColors((prev) => ({
      ...prev,
      [paletteId]: {
        ...prev[paletteId],
        [colorKey]: newColor,
      },
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
    if (!selectedPalette) {
      toast.error("Kripya ek color palette select karein!");
      return;
    }

    setLoading(true);
    try {
      const queriesRef = ref(rtdb, 'palette_queries');
      const activeCustomColors = customColors[selectedPalette.id] || null;

      await push(queriesRef, {
        clientName,
        clientPhone,
        selectedPalette: {
          ...selectedPalette,
          color1: {
            ...selectedPalette.color1,
            hex: activeCustomColors?.color1 || selectedPalette.color1.hex,
          },
          color2: {
            ...selectedPalette.color2,
            hex: activeCustomColors?.color2 || selectedPalette.color2.hex,
          },
        },
        createdAt: serverTimestamp(),
        status: 'Pending',
      });

      toast.success("Color choice admin tak pahunch gayi hai!");
      setSelectedPalette(null);
      setClientName('');
      setClientPhone('');
      setCustomColors({});
    } catch (error) {
      console.error("Submit error:", error);
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
                className={`rounded-4 overflow-hidden position-relative transition-all ${
                  isSelected ? 'shadow-lg' : ''
                }`}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '3px solid #ff0080' : '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                }}
                onClick={() => handleSelectPalette(item)}
              >
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-0 end-0 m-1.5 rounded-circle border-0 d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: '26px',
                    height: '26px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    color: '#fff',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10,
                    fontSize: '11px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalPalette(item);
                  }}
                  title="Customize both colors"
                >
                  <i className="bi bi-palette-fill"></i>
                </button>

                <div
                  className="p-2 p-sm-3 text-center position-relative d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: currentHex1,
                    height: '85px',
                  }}
                >
                  <span
                    className="badge font-monospace"
                    style={{
                      fontSize: '9.5px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      padding: '3px 6px',
                    }}
                  >
                    {currentHex1}
                  </span>

                  <div
                    className="fw-bold text-uppercase mt-1.5 text-truncate w-100"
                    style={{ fontSize: '10.5px', color: getContrastingColor(currentHex1) }}
                  >
                    {item.color1.name}
                  </div>
                </div>

                <div
                  className="bg-dark text-white text-center fw-bold py-0.5"
                  style={{ fontSize: '8.5px', letterSpacing: '0.8px' }}
                >
                  {item.id.toUpperCase()}
                </div>

                <div
                  className="p-2 p-sm-3 text-center position-relative d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: currentHex2,
                    height: '85px',
                  }}
                >
                  <div
                    className="fw-bold text-uppercase mb-1.5 text-truncate w-100"
                    style={{ fontSize: '10.5px', color: getContrastingColor(currentHex2) }}
                  >
                    {item.color2.name}
                  </div>

                  <span
                    className="badge font-monospace"
                    style={{
                      fontSize: '9.5px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      padding: '3px 6px',
                    }}
                  >
                    {currentHex2}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {colorPalettes.length > 8 && (
        <div className="text-center mb-4">
          <button
            type="button"
            className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)', fontSize: '0.85rem' }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? '⬆ Show Less Palettes' : `⬇ Explore All Palettes (${colorPalettes.length})`}
          </button>
        </div>
      )}

      {activeModalPalette && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 1055 }}
          onClick={() => setActiveModalPalette(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered px-3"
            style={{ maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content text-white p-3 p-sm-4"
              style={{
                backgroundColor: '#0d0e15',
                border: '1px solid #ff0080',
                borderRadius: '16px',
                boxShadow: '0 0 30px rgba(255, 0, 128, 0.3)',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ fontSize: '1.1rem' }}>🎨 Customize Colors</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setActiveModalPalette(null)}
                ></button>
              </div>

              <p className="text-secondary small mb-3">
                Change primary and secondary colors for <strong>{activeModalPalette.title}</strong>:
              </p>

              <div className="d-flex align-items-center justify-content-between bg-dark p-2.5 p-sm-3 rounded-3 mb-3 border border-secondary">
                <div>
                  <div className="small fw-bold text-uppercase">{activeModalPalette.color1.name}</div>
                  <span className="badge bg-secondary font-monospace mt-1">
                    {customColors[activeModalPalette.id]?.color1 || activeModalPalette.color1.hex}
                  </span>
                </div>
                <input
                  type="color"
                  className="form-control form-control-color border-0 bg-transparent cursor-pointer"
                  style={{ width: '45px', height: '40px' }}
                  value={customColors[activeModalPalette.id]?.color1 || activeModalPalette.color1.hex}
                  onChange={(e) => handleCustomColorChange(activeModalPalette.id, 'color1', e.target.value)}
                />
              </div>

              <div className="d-flex align-items-center justify-content-between bg-dark p-2.5 p-sm-3 rounded-3 mb-4 border border-secondary">
                <div>
                  <div className="small fw-bold text-uppercase">{activeModalPalette.color2.name}</div>
                  <span className="badge bg-secondary font-monospace mt-1">
                    {customColors[activeModalPalette.id]?.color2 || activeModalPalette.color2.hex}
                  </span>
                </div>
                <input
                  type="color"
                  className="form-control form-control-color border-0 bg-transparent cursor-pointer"
                  style={{ width: '45px', height: '40px' }}
                  value={customColors[activeModalPalette.id]?.color2 || activeModalPalette.color2.hex}
                  onChange={(e) => handleCustomColorChange(activeModalPalette.id, 'color2', e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn w-100 fw-bold py-2 text-white"
                style={{ background: 'linear-gradient(135deg, #ff0080, #7928ca)', border: 'none' }}
                onClick={() => {
                  handleSelectPalette(activeModalPalette);
                  setActiveModalPalette(null);
                }}
              >
                Apply & Select This Theme
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={formRef} className="pt-2">
        {selectedPalette && (
          <form
            onSubmit={handleSubmit}
            className="p-3 p-sm-4 rounded-4 border mx-auto transition-all"
            style={{
              maxWidth: '520px',
              backgroundColor: 'var(--bg-card, #0d0e15)',
              borderColor: '#ff0080',
              boxShadow: '0 0 25px rgba(255, 0, 128, 0.2)',
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <div>
                <span className="badge bg-primary me-2">Selected</span>
                <span className="fw-bold text-white" style={{ fontSize: '0.95rem' }}>
                  {selectedPalette.title}
                </span>
              </div>
              <div className="d-flex gap-1">
                <span
                  className="d-inline-block rounded-circle border"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: customColors[selectedPalette.id]?.color1 || selectedPalette.color1.hex,
                  }}
                />
                <span
                  className="d-inline-block rounded-circle border"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: customColors[selectedPalette.id]?.color2 || selectedPalette.color2.hex,
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter your name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                placeholder="Enter your Number / Email"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 fw-bold py-2 text-white"
              style={{ background: 'linear-gradient(135deg, #ff0080, #7928ca)', border: 'none' }}
            >
              {loading ? 'Submitting...' : 'Send Color Preference to Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}