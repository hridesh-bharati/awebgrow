"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const FEATURES_DATA = [
  {
    id: 1,
    key: 'satisfaction',
    icon: 'bi-star-fill',
    title: '5/5 Client Satisfied',
    badge: '100% Satisfaction Rate',
    headline: 'Exceeding Client Expectations with Premium Delivery',
    desc: 'Delivering exceptional quality that exceeds expectations every single time.',
    overview: 'Hum har project par client-first perspective ke saath kaam karte hain. High-quality code, clean UI/UX, aur transparent communication ke saath hum ensure karte hain ki aapko 100% satisfactory result mile.',
    highlights: [
      'Dedicated post-delivery support & maintenance.',
      'Regular progress updates & continuous feedback loops.',
      'Tailor-made solution tailored specifically for your target audience.',
      'Proven track record with 45+ happy global clients.'
    ],
    ctaText: 'Start Project With Us',
    ctaLink: '/contact',
    colorGradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', 
    glowColor: 'rgba(249, 115, 22, 0.4)',
    themeColor: '#f97316'
  },
  {
    id: 2,
    key: 'fast-delivery',
    icon: 'bi-lightning-charge-fill',
    title: 'Fast Delivery',
    badge: 'Rapid Turnaround',
    headline: 'Lightning-Fast Development Without Compromise',
    desc: 'Quick turnaround times without compromising on code quality or performance.',
    overview: 'Time-to-market aapke business ke liye crucial hai. Agile methodology aur efficient workflow ka use karke hum fast delivery guarantee karte hain taaki aapka project on-time launch ho sakay.',
    highlights: [
      'Agile development sprints for quick milestone releases.',
      'Pre-built robust component libraries for rapid execution.',
      'Zero compromise on code cleanability or site performance.',
      'Strict adherence to promised project timelines.'
    ],
    ctaText: 'Get Fast Quote',
    ctaLink: '/contact',
    colorGradient: 'linear-gradient(135deg, #ff0080 0%, #f43f5e 100%)',
    glowColor: 'rgba(255, 0, 128, 0.4)',
    themeColor: '#ff0080'
  },
  {
    id: 3,
    key: 'secure',
    icon: 'bi-shield-lock-fill',
    title: 'Secure Website',
    badge: 'Bank-Grade Security',
    headline: 'Enterprise-Grade Web & App Security Standards',
    desc: 'Implementation of top-tier security practices to keep your data safe.',
    overview: 'Aapka aur aapke users ka data humari pehli priority hai. Cyber threats aur data breaches se bachne ke liye hum advanced encryption, SSL setup, aur secure database integration implement karte hain.',
    highlights: [
      'End-to-End SSL/TLS Encryption & Data Protection.',
      'Protection against SQL Injections, XSS & CSRF Attacks.',
      'Secure Authentication & Role-Based Access Controls.',
      'Automated back-up setup & real-time monitoring.'
    ],
    ctaText: 'Secure My Site',
    ctaLink: '/contact',
    colorGradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    themeColor: '#10b981'
  },
  {
    id: 4,
    key: 'mobile-responsive',
    icon: 'bi-phone-fill',
    title: 'Mobile Responsive',
    badge: 'Cross-Device Ready',
    headline: 'Seamless Performance Across All Screen Sizes',
    desc: 'Flawless performance and beautiful layouts across all screen sizes.',
    overview: 'Aaj 70%+ traffic mobile devices se aata hai. Humari responsive engineering ensure karti hai ki aapki website smartphone, tablet, laptop, aur desktop har screen size par pixel-perfect aur fast dikhe.',
    highlights: [
      'Fluid-responsive CSS layouts with breakpoint tuning.',
      'Touch-optimized UI elements for effortless mobile navigation.',
      'Fast loading mobile image & asset compression.',
      'Cross-browser compatibility (Chrome, Safari, Edge, Firefox).'
    ],
    ctaText: 'Build Mobile Web',
    ctaLink: '/contact',
    colorGradient: 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    themeColor: '#3b82f6'
  }
];

export default function FeaturesCard() {
  const [activeFeature, setActiveFeature] = useState(null);

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
          {/* BOLDER BADGE */}
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

        {/* FLUID RESPONSIVE GRID (CLICKABLE CARDS) */}
        <div className="row g-4 justify-content-center">
          {FEATURES_DATA.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3">
              <div
                onClick={() => setActiveFeature(item)}
                role="button"
                className="h-100 p-4 text-center text-md-start position-relative overflow-hidden rounded-4 border feature-card-hover"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: `0 10px 30px var(--shadow-color)`,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
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
                  <h5 className="text-theme-primary mb-2 fs-6 fw-black d-flex align-items-center justify-content-between" style={{ fontWeight: 800 }}>
                    <span>{item.title}</span>
                    <i className="bi bi-arrow-up-right-short text-secondary fs-5"></i>
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

      {/* --- FEATURE DETAILS MODAL --- */}
      {activeFeature && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1055 }}
          onClick={() => setActiveFeature(null)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="modal-content text-white p-3 p-md-4" 
              style={{ 
                background: '#0d0d15', 
                border: `1px solid ${activeFeature.themeColor}`,
                borderRadius: '16px',
                boxShadow: `0 0 25px ${activeFeature.themeColor}40`
              }}
            >
              {/* Modal Header */}
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${activeFeature.icon} fs-4`} style={{ color: activeFeature.themeColor }}></i>
                  <span className="badge rounded-pill px-3 py-1" style={{ backgroundColor: `${activeFeature.themeColor}20`, color: activeFeature.themeColor, border: `1px solid ${activeFeature.themeColor}50` }}>
                    {activeFeature.badge}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setActiveFeature(null)}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body my-2">
                <h3 className="fw-bold mb-2 text-white" style={{ fontSize: '1.4rem' }}>
                  {activeFeature.headline}
                </h3>

                <div className="p-3 my-3 rounded-3" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${activeFeature.themeColor}` }}>
                  <p className="mb-0" style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#d1d5db' }}>
                    {activeFeature.overview}
                  </p>
                </div>

                <h6 className="fw-bold mb-2 text-white" style={{ fontSize: '0.88rem', letterSpacing: '0.5px' }}>
                  KEY ADVANTAGES:
                </h6>
                <ul className="list-unstyled mb-0">
                  {activeFeature.highlights.map((highlight, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: activeFeature.themeColor, minWidth: '16px' }}></i>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 pt-2 d-flex justify-content-between align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                  onClick={() => setActiveFeature(null)}
                >
                  Close
                </button>
                <Link 
                  href={activeFeature.ctaLink} 
                  className="btn rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: activeFeature.themeColor, color: '#fff', border: 'none', boxShadow: `0 0 15px ${activeFeature.themeColor}80` }}
                >
                  {activeFeature.ctaText} <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Subtle hover effect for cards */}
      <style jsx>{`
        .feature-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 0, 128, 0.4) !important;
          box-shadow: 0 15px 35px rgba(255, 0, 128, 0.15) !important;
        }
      `}</style>

    </section>
  );
}