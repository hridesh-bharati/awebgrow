// app/page.js - Complete single file with Bootstrap classes & Custom Purple/Lime Theme
'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      {/* ============ CTA SECTION ============ */}
      <section
        className="py-5 my-3 text-center position-relative overflow-hidden"
        id="cta"
        style={{
          // Screenshot ka premium dark purple-indigo gradient background
          background: 'linear-gradient(135deg, #1b0c47 0%, #0c0424 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff'
        }}
      >
        {/* Background Decorative Abstract Shapes (as seen in screenshot) */}
        <div
          className="position-absolute opacity-25"
          style={{
            top: '10%', left: '5%', width: '150px', height: '150px',
            background: 'linear-gradient(45deg, #6346e5, transparent)',
            transform: 'rotate(45deg)', borderRadius: '15px'
          }}
        ></div>
        <div
          className="position-absolute opacity-25 d-none d-md-block"
          style={{
            bottom: '15%', right: '5%', width: '120px', height: '120px',
            background: 'linear-gradient(45deg, transparent, #4c1d95)',
            transform: 'rotate(30deg)', borderRadius: '10px'
          }}
        ></div>

        <div className="container position-relative z-index-1 py-4">
          {/* Main Heading */}
          <h2 className="text-white fw-bold mb-3" style={{ fontSize: '2.8rem', letterSpacing: '-0.5px' }}>
            Let's Build Something Epic Together
          </h2>

          {/* Subheading */}
          <p className="mx-auto mb-4" style={{ color: '#b4a9db', maxWidth: '600px', fontSize: '1.1rem' }}>Get your free consultation today and transform your digital presence.
          </p>

          {/* BUTTONS GROUP */}
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
            {/* Primary CTA: Lime/Yellow Button from Screenshot */}
            <Link
              href="#pricingpackages"
              className="btn fw-semibold px-4 py-2"
              style={{
                backgroundColor: '#dffe52',
                color: '#0c0424',
                borderRadius: '6px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cceb3b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dffe52'}
            > Get Started </Link>

            {/* Secondary CTA: Dark Purple Button from Screenshot */}
            <Link
              href="#projects"
              className="btn border-0 fw-semibold px-4 py-2"
              style={{
                backgroundColor: '#231454',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '0.95rem',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d1b69'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231454'}
            >
              Request a demo
            </Link>
          </div>

          {/* Micro-copy Text */}
          <p style={{ color: '#7b6f9e', fontSize: '0.8rem' }} >
            14-day trial, no credit card required
          </p>
        </div>
      </section>
    </>
  );
}