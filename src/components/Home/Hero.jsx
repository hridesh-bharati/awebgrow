'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import './Hero.css';

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* BACKGROUND GLOWING LIGHT SPHERES */}
      <div className="glow-sphere-1" />
      <div className="glow-sphere-2" />

      <div className="container position-relative z-2">
        <div className="row align-items-center gy-4">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            
            {/* WE BUILD. YOU GROW BADGE */}
            <div className="hero-badge mb-3" data-aos="fade-down" data-aos-delay="100">
              <span className="badge-dot-pink" />
              <span className="badge-text-glow">WE BUILD. YOU GROW.</span>
            </div>

            {/* MAIN HERO TITLE */}
            <h1
              className="fw-extrabold text-white mb-3"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 3.8rem)',
                lineHeight: '1.12',
                letterSpacing: '-0.03em',
                fontWeight: 800,
              }}
            >
              Building Digital{' '}
              <span className="text-gradient-purple-blue">Experiences</span>
              <br />
              That Drive Real{' '}
              <span className="text-gradient-pink-orange">Business Growth.</span>
            </h1>

            {/* SUBTITLE */}
            <p
              className="mb-4 mx-auto mx-lg-0"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                color: '#9ca3af',
                fontSize: 'clamp(0.9rem, 1.05vw, 1.08rem)',
                maxWidth: '540px',
                lineHeight: '1.55',
              }}
            >
              AWebGrow helps brands and businesses transform ideas into powerful digital products that attract, engage, and convert.
            </p>

            {/* ACTION BUTTONS */}
            <div
              className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link href="/services" className="btn-neon-cta">
                <span>Explore Our Services</span>
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link href="#portfolio" className="btn-secondary-glow">
                <i className="bi bi-play-circle-fill" style={{ color: '#a855f7' }}></i>
                <span>View Our Work</span>
              </Link>
            </div>

            {/* RATING & REVIEWS FOOTER */}
            <div
              className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <span className="fw-bold text-white ms-1">4.9/5</span>
              </div>
              <div style={{ height: '14px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <span className="text-secondary" style={{ fontSize: '0.78rem' }}>
                Trusted by 150+ Clients Worldwide
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D ROCKET LOGO + CONTINUOUS CIRCULAR ORBIT */}
          <div className="col-12 col-lg-5 text-center" data-aos="zoom-in" data-aos-delay="300">
            <div className="orbit-wrapper">
              
              {/* CENTER ROCKET LOGO */}
              <div className="center-rocket-box">
                <i className="bi bi-rocket-takeoff-fill text-white fs-1"></i>
              </div>

              {/* ROTATING CIRCLE ORBIT */}
              <div className="orbit-circle-path">
                
                {/* Node 1: Web Dev */}
                <div className="orbit-node-item node-pos-1" style={{ border: '1px solid rgba(59,130,246,0.6)', boxShadow: '0 0 10px rgba(59,130,246,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-code-slash text-info" style={{ fontSize: '0.9rem' }}></i>
                    <span style={{ fontSize: '0.5rem', color: '#e4e4e7', fontWeight: 600 }}>Web Dev</span>
                  </div>
                </div>

                {/* Node 2: SEO */}
                <div className="orbit-node-item node-pos-2" style={{ border: '1px solid rgba(168,85,247,0.6)', boxShadow: '0 0 10px rgba(168,85,247,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-search-heart" style={{ color: '#a855f7', fontSize: '0.88rem' }}></i>
                    <span style={{ fontSize: '0.5rem', color: '#e4e4e7', fontWeight: 600 }}>SEO</span>
                  </div>
                </div>

                {/* Node 3: Mobile App */}
                <div className="orbit-node-item node-pos-3" style={{ border: '1px solid rgba(16,185,129,0.6)', boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-phone-fill text-success" style={{ fontSize: '0.88rem' }}></i>
                    <span style={{ fontSize: '0.48rem', color: '#e4e4e7', fontWeight: 600 }}>App Dev</span>
                  </div>
                </div>

                {/* Node 4: Google Ads */}
                <div className="orbit-node-item node-pos-4" style={{ border: '1px solid rgba(249,115,22,0.6)', boxShadow: '0 0 10px rgba(249,115,22,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-google text-warning" style={{ fontSize: '0.88rem' }}></i>
                    <span style={{ fontSize: '0.48rem', color: '#e4e4e7', fontWeight: 600 }}>Google Ads</span>
                  </div>
                </div>

                {/* Node 5: Meta Ads */}
                <div className="orbit-node-item node-pos-5" style={{ border: '1px solid rgba(236,72,153,0.6)', boxShadow: '0 0 10px rgba(236,72,153,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-infinity" style={{ color: '#ec4899', fontSize: '0.95rem' }}></i>
                    <span style={{ fontSize: '0.48rem', color: '#e4e4e7', fontWeight: 600 }}>Meta Ads</span>
                  </div>
                </div>

                {/* Node 6: AI Solutions */}
                <div className="orbit-node-item node-pos-6" style={{ border: '1px solid rgba(239,68,68,0.6)', boxShadow: '0 0 10px rgba(239,68,68,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-cpu-fill text-danger" style={{ fontSize: '0.88rem' }}></i>
                    <span style={{ fontSize: '0.48rem', color: '#e4e4e7', fontWeight: 600 }}>AI Solutions</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* COLORFUL GLOWING STATS STRIP */}
        <div className="row g-2 g-md-3 mt-4 pt-2">
          
          {/* STAT 1: Websites Built */}
          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #3b82f6' }}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i className="bi bi-globe fs-5 text-info"></i>
                <h2 className="stat-number text-gradient-purple-blue">150+</h2>
              </div>
              <p className="text-secondary small fw-medium mb-0" style={{ fontSize: '0.75rem' }}>Websites Built</p>
            </div>
          </div>

          {/* STAT 2: Happy Clients */}
          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #a855f7' }}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i className="bi bi-emoji-smile fs-5" style={{ color: '#c084fc' }}></i>
                <h2 className="stat-number" style={{ background: 'linear-gradient(135deg, #c084fc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  250+
                </h2>
              </div>
              <p className="text-secondary small fw-medium mb-0" style={{ fontSize: '0.75rem' }}>Happy Clients</p>
            </div>
          </div>

          {/* STAT 3: Leads Generated */}
          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #f97316' }}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i className="bi bi-graph-up-arrow fs-5 text-warning"></i>
                <h2 className="stat-number" style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  1M+
                </h2>
              </div>
              <p className="text-secondary small fw-medium mb-0" style={{ fontSize: '0.75rem' }}>Leads Generated</p>
            </div>
          </div>

          {/* STAT 4: Client Retention */}
          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="500">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #ec4899' }}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <i className="bi bi-trophy fs-5" style={{ color: '#f472b6' }}></i>
                <h2 className="stat-number text-gradient-pink-orange">98%</h2>
              </div>
              <p className="text-secondary small fw-medium mb-0" style={{ fontSize: '0.75rem' }}>Client Retention</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}