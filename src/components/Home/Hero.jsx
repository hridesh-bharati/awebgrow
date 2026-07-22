'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
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
      {/* BACKGROUND GLOW SPHERES */}
      <div className="glow-sphere-1" />
      <div className="glow-sphere-2" />

      <div className="container position-relative z-2">
        <div className="row align-items-center gy-3">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            
            {/* BADGE */}
            <div className="hero-badge mb-2" data-aos="fade-down" data-aos-delay="100">
              <span className="badge-dot-pink" />
              <span className="badge-text-glow">WE BUILD. YOU GROW.</span>
            </div>

            {/* MAIN TITLE */}
            <h1
              className="fw-extrabold text-white mb-2"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 3.4rem)',
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
              className="mb-3 mx-auto mx-lg-0 text-secondary"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                fontSize: 'clamp(0.85rem, 0.95vw, 1rem)',
                maxWidth: '520px',
                lineHeight: '1.5',
              }}
            >
              AWebGrow helps brands and businesses transform ideas into powerful digital products that attract, engage, and convert.
            </p>

            {/* BUTTONS */}
            <div
              className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-2.5 mb-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link href="/services" className="btn-neon-cta" style={{ padding: '9px 22px', fontSize: '0.82rem' }}>
                <span>Explore Our Services</span>
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link href="#portfolio" className="btn-secondary-glow">
                <i className="bi bi-play-circle-fill" style={{ color: '#a855f7' }}></i>
                <span>View Our Work</span>
              </Link>
            </div>

            {/* RATING */}
            <div
              className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2.5"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.8rem' }}>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <span className="fw-bold text-white ms-1">4.9/5</span>
              </div>
              <div style={{ height: '12px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <span className="text-secondary" style={{ fontSize: '0.75rem' }}>
                Trusted by 150+ Clients Worldwide
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: BRAND "A" LOGO IMAGE + CIRCULAR ORBIT */}
          <div className="col-12 col-lg-5 text-center" data-aos="zoom-in" data-aos-delay="300">
            <div className="orbit-wrapper">
              
              {/* CENTER BRAND LOGO IMAGE ("A" LETTER LOGO) */}
              <div className="center-brand-box">
                <Image
                  src="/images/home-circle-image.png"
                  alt="AWebGrow Brand Logo"
                  width={135}
                  height={135}
                  className="brand-image-fit"
                  priority
                />
              </div>

              {/* ORBIT PATH & NODES */}
              <div className="orbit-circle-path">
                
                <div className="orbit-node-item node-pos-1" style={{ border: '1px solid rgba(59,130,246,0.6)', boxShadow: '0 0 10px rgba(59,130,246,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-code-slash text-info" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.45rem', color: '#e4e4e7', fontWeight: 600 }}>Web Dev</span>
                  </div>
                </div>

                <div className="orbit-node-item node-pos-2" style={{ border: '1px solid rgba(168,85,247,0.6)', boxShadow: '0 0 10px rgba(168,85,247,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-search-heart" style={{ color: '#a855f7', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.45rem', color: '#e4e4e7', fontWeight: 600 }}>SEO</span>
                  </div>
                </div>

                <div className="orbit-node-item node-pos-3" style={{ border: '1px solid rgba(16,185,129,0.6)', boxShadow: '0 0 10px rgba(16,185,129,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-phone-fill text-success" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.45rem', color: '#e4e4e7', fontWeight: 600 }}>App Dev</span>
                  </div>
                </div>

                <div className="orbit-node-item node-pos-4" style={{ border: '1px solid rgba(249,115,22,0.6)', boxShadow: '0 0 10px rgba(249,115,22,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-google text-warning" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>Google Ads</span>
                  </div>
                </div>

                <div className="orbit-node-item node-pos-5" style={{ border: '1px solid rgba(236,72,153,0.6)', boxShadow: '0 0 10px rgba(236,72,153,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-infinity" style={{ color: '#ec4899', fontSize: '0.85rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>Meta Ads</span>
                  </div>
                </div>

                <div className="orbit-node-item node-pos-6" style={{ border: '1px solid rgba(239,68,68,0.6)', boxShadow: '0 0 10px rgba(239,68,68,0.4)' }}>
                  <div className="orbit-node-inner">
                    <i className="bi bi-cpu-fill text-danger" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>AI Solutions</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* STATS STRIP */}
        <div className="row g-2 mt-3 pt-1">
          
          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #3b82f6' }}>
              <div className="d-flex align-items-center justify-content-center gap-1.5 mb-0.5">
                <i className="bi bi-globe fs-6 text-info"></i>
                <h2 className="stat-number text-gradient-purple-blue">150+</h2>
              </div>
              <p className="text-secondary fw-medium mb-0" style={{ fontSize: '0.7rem' }}>Websites Built</p>
            </div>
          </div>

          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #a855f7' }}>
              <div className="d-flex align-items-center justify-content-center gap-1.5 mb-0.5">
                <i className="bi bi-emoji-smile fs-6" style={{ color: '#c084fc' }}></i>
                <h2 className="stat-number" style={{ background: 'linear-gradient(135deg, #c084fc, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  250+
                </h2>
              </div>
              <p className="text-secondary fw-medium mb-0" style={{ fontSize: '0.7rem' }}>Happy Clients</p>
            </div>
          </div>

          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #f97316' }}>
              <div className="d-flex align-items-center justify-content-center gap-1.5 mb-0.5">
                <i className="bi bi-graph-up-arrow fs-6 text-warning"></i>
                <h2 className="stat-number" style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  1M+
                </h2>
              </div>
              <p className="text-secondary fw-medium mb-0" style={{ fontSize: '0.7rem' }}>Leads Generated</p>
            </div>
          </div>

          <div className="col-6 col-md-3" data-aos="fade-up" data-aos-delay="500">
            <div className="stat-card-glow text-center" style={{ borderBottom: '3px solid #ec4899' }}>
              <div className="d-flex align-items-center justify-content-center gap-1.5 mb-0.5">
                <i className="bi bi-trophy fs-6" style={{ color: '#f472b6' }}></i>
                <h2 className="stat-number text-gradient-pink-orange">98%</h2>
              </div>
              <p className="text-secondary fw-medium mb-0" style={{ fontSize: '0.7rem' }}>Client Retention</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}