"use client";

import React from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    position: "Growth Lead at Finovate",
    comment: "WebGrow didn't just rebuild our platform; they optimized our entire funnel. Our checkout conversion rate jumped by 34% within two weeks of launch.",
    rating: 5,
    initials: "SJ",
    glowColor: "rgba(255, 0, 128, 0.35)",
    gradient: "linear-gradient(135deg, #ff0080 0%, #f97316 100%)"
  },
  {
    name: "Arjun Mehta",
    position: "Founder, CreateStream",
    comment: "Finding a dev team that understands both clean code and SEO is rare. Our organic traffic doubled, and the site performance score is a solid 98/100.",
    rating: 5,
    initials: "AM",
    glowColor: "rgba(168, 85, 247, 0.35)",
    gradient: "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)"
  },
  {
    name: "Marcus Vance",
    position: "Operations Director, CoreLogix",
    comment: "The communication was flawless. They delivered a complex corporate portal three weeks ahead of schedule without sacrificing security features.",
    rating: 5,
    initials: "MV",
    glowColor: "rgba(0, 242, 254, 0.35)",
    gradient: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)"
  }
];

export default function Testimonials() {
  return (
    <section 
      className="py-5 position-relative overflow-hidden bg-theme-main border-top" 
      id="testimonials"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {/* AMBIENT BACKGROUND GLOWS */}
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-1" 
        style={{ 
          width: '450px', 
          height: '450px', 
          top: '10%',
          left: '-5%'
        }} 
      />
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-2" 
        style={{ 
          width: '450px', 
          height: '450px', 
          bottom: '10%',
          right: '-5%'
        }} 
      />

      <div className="container px-4 py-4 position-relative z-1">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          {/* BADGE */}
          <div className="btn-secondary-glow px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 mb-3">
            <span style={{ width: '6px', height: '6px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080' }} />
            <span className="fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#ff77bc' }}>
              ✦ SUCCESS STORIES
            </span>
          </div>

          {/* MAXIMUM BOLDER HEADING */}
          <h2 
            className="display-5 fw-extrabold text-theme-primary mb-3"
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Backed by Real{' '}
            <span 
              className="text-gradient-pink-orange" 
              style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}
            >
              Business Results
            </span>
          </h2>
          
          <p className="text-theme-secondary mx-auto" style={{ maxWidth: '560px', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: 500 }}>
            See how we've helped fast-growing companies scale their digital infrastructure and elevate customer experiences.
          </p>
        </div>

        {/* TESTIMONIALS CARDS */}
        <div className="row g-4 justify-content-center">
          {testimonials.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div 
                className="h-100 p-4 position-relative rounded-4 border d-flex flex-column justify-content-between overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '0 10px 30px var(--shadow-color)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div>
                  {/* RATING STARS & QUOTE SVG */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex text-warning">
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i} className="me-1" style={{ fontSize: '14px', color: '#ffb703', filter: 'drop-shadow(0 0 4px rgba(255,183,3,0.5))' }}>★</span>
                      ))}
                    </div>
                    
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-theme-secondary opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.583 17.333h3.5l2.334-4.666V6.666H3.417v6h3.5l-2.334 4.667zm10 0h3.5l2.334-4.666V6.666h-7v6h3.5l-2.334 4.667z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  {/* COMMENT */}
                  <blockquote className="m-0 mb-4">
                    <p className="m-0 text-theme-secondary" style={{ fontSize: '0.92rem', lineHeight: '1.65' }}>
                      "{item.comment}"
                    </p>
                  </blockquote>
                </div>
                
                {/* USER PROFILE INFO */}
                <div className="d-flex align-items-center pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center fw-bold rounded-circle flex-shrink-0 text-white"
                    style={{
                      width: '42px',
                      height: '42px',
                      fontSize: '0.88rem',
                      background: item.gradient,
                      boxShadow: `0 0 15px ${item.glowColor}`
                    }}
                  >
                    {item.initials}
                  </div>

                  <div>
                    <h4 className="h6 fw-bold mb-0 text-theme-primary" style={{ fontSize: '0.92rem' }}>
                      {item.name}
                    </h4>
                    <span className="small text-theme-secondary" style={{ fontSize: '0.78rem' }}>
                      {item.position}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}