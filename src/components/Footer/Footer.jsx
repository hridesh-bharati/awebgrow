"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // HTML5 semantic footer block upgraded with a premium slate-dark professional finish
    <footer className="footer-section position-relative overflow-hidden" style={{ background: '#0f172a', color: '#94a3b8', borderTop: '1px solid #1e293b' }}>
      
      {/* ─── PREMIUM SOFT AMBIENT GLOW ─── */}
      <div className="position-absolute bottom-0 start-0 rounded-circle opacity-10" style={{ 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div className="container pt-5 pb-4 position-relative" style={{ zIndex: 2 }}>
        {/* Dynamic Grid Layout */}
        <div className="row g-4 justify-content-between">
          
          {/* COLUMN 1: Brand & Identity */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="0">
              {/* <Image 
                src="/images/logo.jpg" 
                alt="WebGrow Corporate Identity Logo" 
                width={90}  
                height={40} 
                className="img-fluid rounded-circle"
                loading="lazy"
              /> */}
              <h2 className='text-white'>WebGrow</h2>
            <p className="small mb-4" style={{ color: '#94a3b8', maxWidth: '320px', lineHeight: '1.65', fontSize: '0.9rem' }}>
              High-performance custom web applications built with modern engineering standards and optimized for ultra-fast performance.
            </p>
            {/* Social Icons with Accessible Aria-Labels */}
            <div className="d-flex gap-2 footer-socials">
              <a href="#" className="social-icon-btn" aria-label="Follow WebGrow on Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon-btn" aria-label="Follow WebGrow on Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-icon-btn" aria-label="Follow WebGrow on LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href=
              "https://www.instagram.com/2webdeveloper" className="social-icon-btn" aria-label="Follow WebGrow on Instagram"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          {/* COLUMN 2: Quick Navigation Links */}
          <div className="col-6 col-md-3 col-lg-2" data-aos="fade-up" data-aos-delay="50">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-white" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>
              Company
            </h4>
            <nav className="d-flex flex-column gap-2 footer-nav-links">
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* COLUMN 3: Services Shortlist Links */}
          <div className="col-6 col-md-3 col-lg-2" data-aos="fade-up" data-aos-delay="100">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-white" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>
              Services
            </h4>
            <nav className="d-flex flex-column gap-2 footer-nav-links">
              <Link href="/services">Web Apps</Link>
              <Link href="/services">SEO Strategy</Link>
              <Link href="/services">Cloud Systems</Link>
              <Link href="/services">AI Solutions</Link>
            </nav>
          </div>

          {/* COLUMN 4: Operational Hub Information */}
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="150">
            <h4 className="h6 fw-bold mb-3 text-uppercase text-white" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>
              Contact Info
            </h4>
              <address className="fst-normal small d-flex flex-column gap-3" style={{ color: '#94a3b8' }}>
              <div className="m-0 d-flex align-items-start gap-2 contact-item">
                <i className="bi bi-geo-alt-fill text-white fs-6 lh-1"></i>
                <span style={{ fontSize: '0.85rem' }}>Noida, Uttar Pradesh, India</span>
              </div>
              <div className="m-0 d-flex align-items-center gap-2 contact-item">
                <i className="bi bi-envelope-fill text-white fs-6 lh-1"></i>
                <a href="mailto:sushantkumar867696@gmail.com" className="text-decoration-none" style={{ color: 'inherit', fontSize: '0.85rem' }}>
                  sushantkumar867696@gmail.com
                </a>
              </div>
              <div className="m-0 d-flex align-items-center gap-2 contact-item">
                <i className="bi bi-telephone-fill text-white fs-6 lh-1"></i>
                <a href="tel:9304556165" className="text-decoration-none" style={{ color: 'inherit', fontSize: '0.85rem' }}>
                   9304556165
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Horizontal Split Line Divider */}
        <hr className="my-4" style={{ borderColor: '#1e293b' }} />

        {/* BOTTOM METADATA BAR */}
        <div className="row align-items-center justify-content-between g-3 small" style={{ color: '#64748b' }}>
          <div className="col-md-auto text-center text-md-start">
            <p className="m-0">© {currentYear} <span className="text-white fw-semibold">WebGrow</span>. All rights reserved.</p>
          </div>
          <div className="col-md-auto text-center text-md-center font-monospace" style={{ fontSize: '0.85rem' }}>
            Developed by: <span className="text-white fw-semibold">WebGrow Team</span>
          </div>
          <div className="col-md-auto">
            <div className="d-flex justify-content-center gap-4 sub-footer-links">
              <a href="#" className="text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>

      {/* Embedded Dynamic Style Sheet */}
      <style jsx>{`
        .footer-nav-links :global(a), .sub-footer-links a {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease-in-out;
          width: fit-content;
        }
        .footer-nav-links :global(a:hover), .sub-footer-links a:hover {
          color: #3b82f6 !important;
          transform: translateX(4px);
        }
        .social-icon-btn {
          width: 38px;
          height: 38px;
          background: #1e293b;
          color: #94a3b8;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .social-icon-btn:hover {
          background: #3b82f6;
          color: #ffffff !important;
          transform: translateY(-4px);
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
          border-color: #3b82f6;
        }
        .contact-item i {
          transition: color 0.2s ease;
        }
        .contact-item:hover i {
          color: #60a5fa !important;
        }
      `}</style>
    </footer>
  );
}