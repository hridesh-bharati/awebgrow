"use client";

import React from 'react';

// Real-world, results-driven testimonial data
const testimonials = [
  {
    name: "Sarah Jenkins",
    position: "Growth Lead at Finovate",
    comment: "WebGrow didn't just rebuild our platform; they optimized our entire funnel. Our checkout conversion rate jumped by 34% within two weeks of launch.",
    rating: 5,
    initials: "SJ",
    accentColor: "bg-primary"
  },
  {
    name: "Arjun Mehta",
    position: "Founder, CreateStream",
    comment: "Finding a dev team that understands both clean code and SEO is rare. Our organic traffic doubled, and the site performance score is a solid 98/100.",
    rating: 5,
    initials: "AM",
    accentColor: "bg-info"
  },
  {
    name: "Marcus Vance",
    position: "Operations Director, CoreLogix",
    comment: "The communication was flawless. They delivered a complex corporate portal three weeks ahead of schedule without sacrificing security features.",
    rating: 5,
    initials: "MV",
    accentColor: "bg-success"
  }
];

export default function Testimonials() {
  return (
    <section 
      className="py-5 position-relative overflow-hidden" 
      id="testimonials" 
      style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}
    >
      <div className="container px-4 py-4">
        
        {/* Modern Clean Header */}
        <div className="text-center mb-5">
          <span 
            className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-semibold text-uppercase small"
            style={{ letterSpacing: '0.05em' }}
          >
            Success Stories
          </span>
          <h2 
            className="fw-bold mb-2 text-dark" 
            style={{ letterSpacing: '-0.02em', fontSize: '2.25rem' }}
          >
            Backed by Real <span className="text-primary">Business Results</span>
          </h2>
          <p className="mx-auto text-muted" style={{ maxWidth: '550px', fontSize: '1rem', lineHeight: '1.6' }}>
            See how we've helped fast-growing companies scale their digital infrastructure and elevate customer experiences.
          </p>
        </div>

        {/* Modern App-Style Layout */}
        <div className="row g-4 justify-content-center">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              
              {/* Instagram-style Minimal Rounded Card */}
              <div 
                className="card h-100 border-0 p-4 position-relative testimonial-hover-card"
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Rating & Quote Header Line */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex text-warning">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="me-1" style={{ fontSize: '14px' }}>★</span>
                    ))}
                  </div>
                  {/* Clean SVG Quote Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted opacity-25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.583 17.333h3.5l2.334-4.666V6.666H3.417v6h3.5l-2.334 4.667zm10 0h3.5l2.334-4.666V6.666h-7v6h3.5l-2.334 4.667z" fill="currentColor"/>
                  </svg>
                </div>
                
                {/* Clean Quote Text */}
                <blockquote className="m-0 mb-4 flex-grow-1">
                  <p className="m-0 text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.65', fontWeight: '400' }}>
                    "{testimonial.comment}"
                  </p>
                </blockquote>
                
                {/* Profile Wrapper */}
                <div className="d-flex align-items-center pt-3 border-top" style={{ borderColor: '#f1f5f9' }}>
                  <div 
                    className={`avatar-circle me-3 d-flex align-items-center justify-content-center ${testimonial.accentColor} bg-opacity-10 fw-bold text-uppercase`}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      color: 'var(--bs-primary)'
                    }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="h6 fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.01em', fontSize: '0.95rem' }}>
                      {testimonial.name}
                    </h4>
                    <span className="small text-muted" style={{ fontSize: '0.8rem' }}>
                      {testimonial.position}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global component specific hover styles safely added */}
      <style dangerouslySetInnerHTML={{__html: `
        .testimonial-hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px rgba(15, 23, 42, 0.06) !important;
        }
      `}} />
    </section>
  );
}