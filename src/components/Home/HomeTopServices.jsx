'use client'

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomeTopServices() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }, []);

  return (
    <section className="position-relative overflow-hidden" style={{ backgroundColor: '#f8fafc', padding: '90px 0' }}>
      {/* Decorative top divider line for light theme */}
      <div className="position-absolute top-0 start-0 w-100" style={{ height: '1px', background: 'rgba(0,0,0,0.05)' }} />
      
      {/* Subtle Mesh Grid Lines overlay (Simple look hatane ke liye) */}
      <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-100 opacity-5" style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)`,
        backgroundSize: '45px 45px',
        maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        pointerEvents: 'none'
      }} />

      <div className="container position-relative z-1">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-uppercase fw-bold small mb-2 d-inline-block" style={{ letterSpacing: '2px', color: '#e11d48', fontSize: '0.78rem' }}>
            —— OUR SERVICES ——
          </span>
          <h2 
            data-aos="fade-up"
            className="fw-bold tracking-wider" 
            style={{ 
              fontSize: '2.2rem', 
              fontFamily: "'Inter', sans-serif", 
              letterSpacing: '-0.02em',
              color: '#0f172a'
            }}
          >
            What We Do Best
          </h2>
        </div>

        {/* Service Cards Layout */}
        <div className="row g-4 justify-content-center" data-aos="fade-up" data-aos-delay="100">

          {/* Card 1: Web Development */}
          <div className="col-lg-4 col-md-6">
            <div 
              className="p-4 h-100 d-flex flex-column justify-content-between service-premium-card shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              }}
            >
              <div className="d-flex align-items-start gap-3">
                {/* Translucent Premium Glass Icon Box */}
                <div 
                  className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    backdropFilter: 'blur(4px)',
                    width: '48px', height: '48px', borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}
                >
                  <i className="bi bi-code-slash" style={{ fontSize: '1.3rem' }}></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>Web Development</h3>
                  <p className="small mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.85)' }}>
                    High-performance custom applications built with core structural optimizations.
                  </p>
                </div>
              </div>

              {/* Bottom Metric Bar */}
              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)' }}>
                  <span className="fw-bold tracking-wider">PERFORMANCE RATIO</span>
                  <span className="fw-bold text-white">97%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '97%', height: '100%', backgroundColor: '#ffffff', borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: SEO Optimization */}
          <div className="col-lg-4 col-md-6">
            <div 
              className="p-4 h-100 d-flex flex-column justify-content-between service-premium-card shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #10b981, #047857)', 
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              }}
            >
              <div className="d-flex align-items-start gap-3">
                <div 
                  className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    backdropFilter: 'blur(4px)',
                    width: '48px', height: '48px', borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}
                >
                  <i className="bi bi-graph-up-arrow" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>SEO Optimization</h3>
                  <p className="small mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.85)' }}>
                    Systematically validated structure updates based on deep live telemetry.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)' }}>
                  <span className="fw-bold tracking-wider">INDEX RATIO</span>
                  <span className="fw-bold text-white">94%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '94%', height: '100%', backgroundColor: '#ffffff', borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Digital Marketing */}
          <div className="col-lg-4 col-md-12">
            <div 
              className="p-4 h-100 d-flex flex-column justify-content-between service-premium-card shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)', 
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              }}
            >
              <div className="d-flex align-items-start gap-3">
                <div 
                  className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    backdropFilter: 'blur(4px)',
                    width: '48px', height: '48px', borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}
                >
                  <i className="bi bi-megaphone" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>Digital Marketing</h3>
                  <p className="small mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.85)' }}>
                    Conversion layout configurations engineered specifically for targeting operational ROI.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)' }}>
                  <span className="fw-bold tracking-wider">CONVERSION RATE</span>
                  <span className="fw-bold text-white">89%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '89%', height: '100%', backgroundColor: '#ffffff', borderRadius: '100px' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hover Lift and Glow Style Effect */}
      <style jsx>{`
        .service-premium-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(15, 23, 42, 0.15) !important;
        }
      `}</style>
    </section>
  );
}