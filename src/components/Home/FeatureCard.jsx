"use client";

import React from 'react';

const FEATURES_DATA = [
  {
    id: 1,
    icon: 'bi-star-fill',
    title: '5/5 Client Satisfied',
    desc: 'Delivering exceptional quality that exceeds expectations every single time.',
    colorGradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', 
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  {
    id: 2,
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Delivery',
    desc: 'Quick turnaround times without compromising on code quality or performance.',
    colorGradient: 'linear-gradient(135deg, #ff0080 0%, #f43f5e 100%)',
    glowColor: 'rgba(255, 0, 128, 0.4)'
  },
  {
    id: 3,
    icon: 'bi-shield-lock-fill',
    title: 'Secure Website',
    desc: 'Implementation of top-tier security practices to keep your data safe.',
    colorGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    glowColor: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 4,
    icon: 'bi-phone-fill',
    title: 'Mobile Responsive',
    desc: 'Flawless performance and beautiful layouts across all screen sizes.',
    colorGradient: 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)',
    glowColor: 'rgba(0, 242, 254, 0.4)'
  }
];

export default function FeaturesCard() {
  return (
    <section className="py-5 position-relative overflow-hidden bg-theme-main border-top" id="features" style={{ borderColor: 'var(--border-subtle)' }}>
      
      {/* AMBIENT NEON GLOW ORBS */}
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-1" 
        style={{ 
          width: '500px', 
          height: '500px', 
          top: '10%',
          left: '20%'
        }} 
      />
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-2" 
        style={{ 
          width: '500px', 
          height: '500px', 
          bottom: '10%',
          right: '20%'
        }} 
      />

      <div className="container py-4 position-relative z-1">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          {/* EXTRA BOLD BADGE */}
          <div 
            className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(255, 0, 128, 0.08)',
              border: '1.5px solid rgba(255, 0, 128, 0.35)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080, 0 0 20px #ff0080' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#ff77bc', fontWeight: 800 }}>
              ✦ WHY CHOOSE US
            </span>
          </div>

          {/* MAXIMUM BOLDER HEADING */}
          <h2 
            className="display-5 fw-black text-theme-primary mb-3"
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Built for{' '}
            <span className="text-gradient-purple-blue" style={{ fontWeight: 900 }}>Performance</span>
            {' '}&amp;{' '}
            <span 
              className="text-gradient-pink-orange" 
              style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}
            >
              Trust
            </span>
          </h2>

          <p className="text-theme-secondary fs-6 mx-auto" style={{ maxWidth: '580px', lineHeight: '1.65', fontWeight: 500 }}>
            We combine cutting-edge design with robust engineering to deliver digital experiences that truly stand out.
          </p>
        </div>

        {/* FLUID RESPONSIVE GRID */}
        <div className="row g-4 justify-content-center">
          {FEATURES_DATA.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3">
              <div
                className="h-100 p-4 text-center text-md-start position-relative overflow-hidden rounded-4 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: `0 10px 30px var(--shadow-color)`,
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Micro Ambient Glow Aura inside card */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-20"
                  style={{
                    background: item.colorGradient,
                    transform: 'scale(1.4) translate(-25%, -25%)',
                    filter: 'blur(50px)'
                  }}
                />

                {/* Floating Icon Box with Intense Neon Glow */}
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3 text-white fs-4 position-relative z-2"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: item.colorGradient,
                    boxShadow: `0 0 20px ${item.glowColor}`
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>

                {/* Typography */}
                <div className="position-relative z-2">
                  <h5 className="text-theme-primary mb-2 fs-6 fw-black" style={{ fontWeight: 800 }}>
                    {item.title}
                  </h5>
                  <p className="text-theme-secondary small mb-0 lh-base" style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}