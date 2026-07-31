"use client";

import React, { useState } from 'react';
import { colorPalettes } from '@/data/colorPalettes';
import { rtdb } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';
import { toast } from 'sonner';

export default function ColorPaletteSelector() {
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPalette) {
      toast.error("Kripya ek color palette select karein!");
      return;
    }

    setLoading(true);
    try {
      const queriesRef = ref(rtdb, 'palette_queries');
      await push(queriesRef, {
        clientName,
        clientPhone,
        selectedPalette,
        createdAt: serverTimestamp(),
        status: 'Pending'
      });

      toast.success("Color choice admin tak pahunch gayi hai!");
      setSelectedPalette(null);
      setClientName('');
      setClientPhone('');
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to submit choice!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-black text-theme-primary mb-3">Select Color Theme For Your Website</h3>

      <div className="row g-3 mb-4">
        {colorPalettes.map((item) => {
          const isSelected = selectedPalette?.id === item.id;
          return (
            <div key={item.id} className="col-6 col-md-3">
              <div
                onClick={() => setSelectedPalette(item)}
                className={`rounded-4 overflow-hidden border cursor-pointer position-relative transition-all ${
                  isSelected ? 'border-primary ring-2' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer', border: isSelected ? '3px solid #ff0080' : '1px solid var(--border-subtle)' }}
              >
                {/* Top Segment */}
                <div className="p-3 text-center" style={{ backgroundColor: item.color1.hex, height: '90px' }}>
                  <span className="badge bg-dark bg-opacity-50 text-white font-monospace" style={{ fontSize: '10px' }}>
                    {item.color1.hex}
                  </span>
                  <div className="fw-bold text-dark text-uppercase mt-1" style={{ fontSize: '11px' }}>
                    {item.color1.name}
                  </div>
                </div>

                {/* Divider Badge */}
                <div className="bg-dark text-white text-center fw-bold py-0.5" style={{ fontSize: '9px', letterSpacing: '1px' }}>
                  {item.id.toUpperCase()}
                </div>

                {/* Bottom Segment */}
                <div className="p-3 text-center" style={{ backgroundColor: item.color2.hex, height: '90px' }}>
                  <div className="fw-bold text-white text-uppercase mb-1" style={{ fontSize: '11px' }}>
                    {item.color2.name}
                  </div>
                  <span className="badge bg-dark bg-opacity-50 text-white font-monospace" style={{ fontSize: '10px' }}>
                    {item.color2.hex}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPalette && (
        <form onSubmit={handleSubmit} className="p-4 rounded-4 border max-w-lg mx-auto" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <h5 className="fw-bold text-theme-primary mb-3">Selected: {selectedPalette.title}</h5>
          
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Aapka Naam"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Aapka Mobile Number / Email"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full fw-bold">
            {loading ? 'Submitting...' : 'Send Color Preference to Admin'}
          </button>
        </form>
      )}
    </div>
  );
}