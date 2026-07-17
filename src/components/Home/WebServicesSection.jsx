"use client";

import React from 'react';

const WebServicesSection = () => {
  const services = [
    "SEO Optimization", "Digital Marketing", "Full-Stack Coding", "Website Development",
    "UI/UX Design", "E-commerce Solutions", "Mobile App Development", "Cloud Hosting",
    "AI Integration", "Custom ERP Systems", "Brand Identity", "Social Media Management",
    "Content Writing", "Cybersecurity", "Database Management", "SaaS Development",
    "Performance Optimization", "PWA Development", "IT Consulting", "API Integration",
    "Tech Support", "Digital Transformation"
  ];

  return (
    <section 
      className="w-full position-relative overflow-hidden py-1 d-flex align-items-center justify-content-center" 
      style={{ 
        background: 'linear-gradient(180deg, #0f172a 0%, #030712 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Optimized Performance Infinitesimal Loop Keyframes */}
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: customMarquee 35s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        .service-badge {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #f8fafc; /* Crisp clean readable slate-white text */
          padding: 6px 16px;
          border-radius: 100px;
          transition: all 0.3s ease;
        }
        .service-badge:hover {
          background: linear-gradient(90deg, rgba(0, 242, 254, 0.15), rgba(121, 40, 202, 0.15));
          border-color: #00f2fe;
          color: #00f2fe;
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.2);
        }
      `}</style>

      {/* Track Mask Overlay for Soft Edges fading effect */}
      <div 
        className="w-100 overflow-hidden position-relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)'
        }}
      >
        <div className="marquee-container d-flex align-items-center gap-4">
          
          {/* Track Group 1 */}
          <div className="d-flex align-items-center gap-4 text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.78rem', letterSpacing: '0.12em' }}>
            {services.map((service, index) => (
              <div key={`orig-${index}`} className="d-flex align-items-center gap-4 whitespace-nowrap">
                <div className="service-badge">{service}</div>
                <span style={{ color: '#ff0080', fontSize: '1.2rem', textShadow: '0 0 10px rgba(255,0,128,0.5)' }}>✦</span>
              </div>
            ))}
          </div>
          
          {/* Track Group 2 (Duplicate for Seamless Scroll Loop) */}
          <div className="d-flex align-items-center gap-4 text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.78rem', letterSpacing: '0.12em' }}>
            {services.map((service, index) => (
              <div key={`dup-${index}`} className="d-flex align-items-center gap-4 whitespace-nowrap">
                <div className="service-badge">{service}</div>
                <span style={{ color: '#ff0080', fontSize: '1.2rem', textShadow: '0 0 10px rgba(255,0,128,0.5)' }}>✦</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebServicesSection;