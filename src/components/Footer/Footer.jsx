"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section position-relative overflow-hidden bg-theme-main border-top">
      
      {/* ─── NEON DUAL-TONE AMBIENT GLOWS ─── */}
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-1" 
        style={{ 
          width: '400px', 
          height: '400px', 
          bottom: '-10%',
          left: '-5%',
          zIndex: 1
        }}
      />
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-2" 
        style={{ 
          width: '400px', 
          height: '400px', 
          top: '-10%',
          right: '-5%',
          zIndex: 1
        }}
      />

      <div className="container pt-5 pb-4 position-relative z-2">
        <div className="row g-4 justify-content-between">
          
          {/* COLUMN 1: Brand & Identity */}
          <div className="col-lg-4 col-md-6">
            <h2 className="fw-extrabold text-gradient-pink-orange mb-3" style={{ fontSize: '1.75rem', fontWeight: 900 }}>
              WebGrow
            </h2>
            <p className="small mb-4 text-theme-secondary" style={{ maxWidth: '320px', lineHeight: '1.65', fontSize: '0.88rem' }}>
              High-performance custom web applications built with modern engineering standards and optimized for ultra-fast performance.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-2">
              <a href="#" className="btn-secondary-glow rounded-circle p-0 justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn-secondary-glow rounded-circle p-0 justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="btn-secondary-glow rounded-circle p-0 justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/2webdeveloper" className="btn-secondary-glow rounded-circle p-0 justify-content-center" style={{ width: '38px', height: '38px' }} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Quick Navigation Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-theme-primary" style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              Company
            </h4>
            <nav className="d-flex flex-column gap-2">
              <Link href="/" className="text-decoration-none text-theme-secondary small">Home</Link>
              <Link href="/services" className="text-decoration-none text-theme-secondary small">Services</Link>
              <Link href="/faq" className="text-decoration-none text-theme-secondary small">FAQ</Link>
              <Link href="/contact" className="text-decoration-none text-theme-secondary small">Contact</Link>
            </nav>
          </div>

          {/* COLUMN 3: Services Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-theme-primary" style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              Services
            </h4>
            <nav className="d-flex flex-column gap-2">
              <Link href="/services" className="text-decoration-none text-theme-secondary small">Web Apps</Link>
              <Link href="/services" className="text-decoration-none text-theme-secondary small">SEO Strategy</Link>
              <Link href="/services" className="text-decoration-none text-theme-secondary small">Cloud Systems</Link>
              <Link href="/services" className="text-decoration-none text-theme-secondary small">AI Solutions</Link>
            </nav>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-theme-primary" style={{ fontSize: '0.8rem', letterSpacing: '0.12em' }}>
              Contact Info
            </h4>
            <address className="fst-normal small d-flex flex-column gap-3 text-theme-secondary m-0">
              <div className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt-fill text-gradient-pink-orange fs-6"></i>
                <span style={{ fontSize: '0.85rem' }}>Noida, Uttar Pradesh, India</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-gradient-pink-orange fs-6"></i>
                <a href="mailto:sushantkumar867696@gmail.com" className="text-decoration-none text-theme-secondary" style={{ fontSize: '0.85rem' }}>
                  sushantkumar867696@gmail.com
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-gradient-pink-orange fs-6"></i>
                <a href="tel:9304556165" className="text-decoration-none text-theme-secondary" style={{ fontSize: '0.85rem' }}>
                  9304556165
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: 'var(--border-subtle)' }} />

        {/* BOTTOM METADATA BAR */}
        <div className="row align-items-center justify-content-between g-3 small text-theme-secondary" style={{ fontSize: '0.82rem' }}>
          <div className="col-md-auto text-center text-md-start">
            <p className="m-0">© {currentYear} <span className="text-theme-primary fw-bold">WebGrow</span>. All rights reserved.</p>
          </div>
          <div className="col-md-auto text-center text-md-center font-monospace">
            Developed by: <span className="text-gradient-purple-blue fw-bold">WebGrow Team</span>
          </div>
          <div className="col-md-auto">
            <div className="d-flex justify-content-center gap-4">
              <a href="#" className="text-decoration-none text-theme-secondary">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-theme-secondary">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}