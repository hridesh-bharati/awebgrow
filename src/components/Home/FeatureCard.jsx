"use client";

import React from 'react';

// CLEAN DATA MATRIX
const FEATURES_DATA = [
  {
    id: 1,
    icon: 'bi-star-fill',
    title: '5/5 Client Satisfied',
    desc: 'Delivering exceptional quality that exceeds expectations every single time.',
    colorGradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', 
    glowColor: 'rgba(249, 115, 22, 0.35)'
  },
  {
    id: 2,
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Delivery',
    desc: 'Quick turnaround times without compromising on code quality or performance.',
    colorGradient: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',
    glowColor: 'rgba(244, 63, 94, 0.35)'
  },
  {
    id: 3,
    icon: 'bi-shield-lock-fill',
    title: 'Secure Website',
    desc: 'Implementation of top-tier security practices to keep your data safe.',
    colorGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  },
  {
    id: 4,
    icon: 'bi-phone-fill',
    title: 'Mobile Responsive',
    desc: 'Flawless performance and beautiful layouts across all screen sizes.',
    colorGradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
    glowColor: 'rgba(37, 99, 235, 0.35)'
  }
];

export default function FeaturesCard() {
  return (
    <section className="py-5 position-relative overflow-hidden" id="why-choose-us" style={{ backgroundColor: '#090a0f' }}>
      
      {/* Ambient Radial Background Glow */}
      <div 
        className="position-absolute rounded-circle" 
        style={{ 
          width: '500px', 
          height: '500px', 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)', 
          filter: 'blur(80px)', 
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} 
      />

      <div className="container py-4 position-relative z-1">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          <div className="neon-badge-pill px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 mb-3">
            <span className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
            <span>✦ Why Choose Us</span>
          </div>

          <h2 className="display-5 fw-extrabold text-white mb-3">
            Built for <span className="text-gradient-purple-blue">Performance</span> &amp; <span className="text-gradient-pink-orange">Trust</span>
          </h2>

          <p className="text-secondary fs-6 mx-auto" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
            We combine cutting-edge design with robust engineering to deliver digital experiences that truly stand out.
          </p>
        </div>

        {/* FLUID RESPONSIVE GRID */}
        <div className="row g-4 justify-content-center">
          {FEATURES_DATA.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3">
              <div
                className="dark-glass-card h-100 p-4 p-lg-4 text-center text-md-start position-relative overflow-hidden"
                style={{
                  '--shadow-glow': item.glowColor
                }}
              >
                {/* Micro Ambient Glow Aura */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none"
                  style={{
                    background: item.colorGradient,
                    transform: 'scale(1.4) translate(-20%, -20%)',
                    filter: 'blur(50px)'
                  }}
                />

                {/* Floating Icon Box */}
                <div
                  className="animated-icon-wrapper d-inline-flex align-items-center justify-content-center rounded-4 mb-3 text-white fs-4"
                  style={{
                    width: '52px',
                    height: '52px',
                    background: item.colorGradient,
                    boxShadow: `0 8px 20px ${item.glowColor}`
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>

                {/* Typography */}
                <div className="position-relative z-2">
                  <h5 className="text-white mb-2 fs-6 fw-bold">
                    {item.title}
                  </h5>
                  <p className="text-secondary small mb-0 lh-base" style={{ fontSize: '0.82rem' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Neon Accent Line on Hover */}
                <div 
                  className="card-hover-line" 
                  style={{ background: item.colorGradient }} 
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}