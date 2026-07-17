"use client";

import React from 'react';

// ==========================================
// CLEAN REUSABLE DATA MATRIX (DRY METRICS)
// ==========================================
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
    colorGradient: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',
    glowColor: 'rgba(244, 63, 94, 0.4)'
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
    colorGradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
    glowColor: 'rgba(37, 99, 235, 0.4)'
  }
];

export default function FeaturesCard() {
  return (
    <div className="features-wrapper min-vh-100 d-flex align-items-center py-5 w-100">
      <div className="container-fluid px-4 px-md-5 mx-auto" style={{ maxWidth: '1440px' }}>
        
        {/* --------------------------------------------------------
            SECTION HEADER
            -------------------------------------------------------- */}
        <div className="text-center mb-5">
          <span className="badge-modern px-4 py-2 mb-3 d-inline-block rounded-pill">
            ✦ Why Choose Us
          </span>
          <h2 className="display-5 fw-bold mb-3 heading-gradient">
            Built for <span className="text-gradient">Performance</span> &amp; <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '580px' }}>
            We combine cutting-edge design with robust engineering to deliver digital experiences that truly stand out.
          </p>
        </div>

        {/* --------------------------------------------------------
            FLUID RESPONSIVE FEATURES GRID
            -------------------------------------------------------- */}
        <div className="row g-4 justify-content-center">
          {FEATURES_DATA.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3">
              <div
                className="feature-card h-100 p-4 p-lg-5 rounded-4 text-center text-md-start position-relative overflow-hidden transition-all"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))',
                  backdropFilter: 'blur(16px) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                  '--card-glow': item.colorGradient, 
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

                {/* Top Floating Badge Icon */}
                <div
                  className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-4 mb-4 position-relative text-white fs-4"
                  style={{
                    width: '54px',
                    height: '54px',
                    background: item.colorGradient,
                    boxShadow: `0 8px 20px ${item.glowColor}`
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>

                {/* Core Typography */}
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <h5 className="text-dark mb-2 fs-6 tracking-tight" style={{ fontWeight: '800' }}>
                    {item.title}
                  </h5>
                  {/* Fixed Text Visibility: Direct Hex styling for perfect reading contrast */}
                  <p className="small mb-0 lh-base text-card-paragraph" style={{ color: '#000000', fontSize: '0.88rem', fontWeight: '400' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Hover line indicator */}
                <div className="hover-line position-absolute bottom-0 start-0 w-100" style={{ background: item.colorGradient }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------
          PERFORMANCE CSS MATRIX
          -------------------------------------------------------- */}
      <style jsx>{`
        .features-wrapper {
          background: linear-gradient(180deg, #fafaff 0%, #f3f7ff 100%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .badge-modern {
          background: #ffffff;
          color: #4f46e5;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 1px solid rgba(79, 70, 229, 0.12);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .heading-gradient {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-gradient {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .feature-card {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px var(--shadow-glow) !important;
          border-color: rgba(255, 255, 255, 1);
          background: #ffffff !important;
        }

        .hover-line {
          height: 3px;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 0 0 12px 12px;
        }

        .feature-card:hover .hover-line {
          opacity: 1;
        }

        .icon-wrapper {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover .icon-wrapper {
          transform: scale(1.06) rotate(-3deg);
        }

        @media (max-width: 768px) {
          .feature-card {
            text-align: center !important;
            padding: 2rem !important;
          }
          .heading-gradient {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}