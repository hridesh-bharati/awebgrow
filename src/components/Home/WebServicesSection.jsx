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

  // हर बैज के लिए अलग-अलग नियॉन कलर्स की लिस्ट
  const badgeColors = [
    { text: '#00f2fe', bg: 'rgba(0, 242, 254, 0.05)', border: 'rgba(0, 242, 254, 0.25)', glow: 'rgba(0, 242, 254, 0.3)' },
    { text: '#ff0080', bg: 'rgba(255, 0, 128, 0.05)', border: 'rgba(255, 0, 128, 0.25)', glow: 'rgba(255, 0, 128, 0.3)' },
    { text: '#39ff14', bg: 'rgba(57, 255, 20, 0.05)', border: 'rgba(57, 255, 20, 0.25)', glow: 'rgba(57, 255, 20, 0.3)' },
    { text: '#fffe33', bg: 'rgba(255, 254, 51, 0.05)', border: 'rgba(255, 254, 51, 0.25)', glow: 'rgba(255, 254, 51, 0.3)' },
    { text: '#ff6600', bg: 'rgba(255, 102, 0, 0.05)', border: 'rgba(255, 102, 0, 0.25)', glow: 'rgba(255, 102, 0, 0.3)' },
    { text: '#00ffff', bg: 'rgba(0, 255, 255, 0.05)', border: 'rgba(0, 255, 255, 0.25)', glow: 'rgba(0, 255, 255, 0.3)' },
    { text: '#bd00ff', bg: 'rgba(189, 0, 255, 0.05)', border: 'rgba(189, 0, 255, 0.25)', glow: 'rgba(189, 0, 255, 0.3)' },
    { text: '#ff003c', bg: 'rgba(255, 0, 60, 0.05)', border: 'rgba(255, 0, 60, 0.25)', glow: 'rgba(255, 0, 60, 0.3)' }
  ];

  return (
    <section 
      className="w-full position-relative overflow-hidden py-2 d-flex align-items-center justify-content-center" 
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
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 6px 16px;
          border-radius: 100px;
          transition: all 0.3s ease;
          text-shadow: 0 0 8px var(--glow-color);
          box-shadow: inset 0 0 10px var(--glow-color);
        }
        .service-badge:hover {
          background: var(--text-color);
          color: #030712;
          border-color: var(--text-color);
          transform: scale(1.05);
          box-shadow: 0 0 25px var(--text-color);
          text-shadow: none;
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
            {services.map((service, index) => {
              const color = badgeColors[index % badgeColors.length];
              return (
                <div key={`orig-${index}`} className="d-flex align-items-center gap-4 whitespace-nowrap">
                  <div 
                    className="service-badge"
                    style={{
                      '--text-color': color.text,
                      '--bg-color': color.bg,
                      '--border-color': color.border,
                      '--glow-color': color.glow
                    }}
                  >
                    {service}
                  </div>
                  <span style={{ color: color.text, fontSize: '1.2rem', textShadow: `0 0 10px ${color.text}`, opacity: 0.7 }}>✦</span>
                </div>
              );
            })}
          </div>
          
          {/* Track Group 2 (Duplicate for Seamless Scroll Loop) */}
          <div className="d-flex align-items-center gap-4 text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.78rem', letterSpacing: '0.12em' }}>
            {services.map((service, index) => {
              const color = badgeColors[index % badgeColors.length];
              return (
                <div key={`dup-${index}`} className="d-flex align-items-center gap-4 whitespace-nowrap">
                  <div 
                    className="service-badge"
                    style={{
                      '--text-color': color.text,
                      '--bg-color': color.bg,
                      '--border-color': color.border,
                      '--glow-color': color.glow
                    }}
                  >
                    {service}
                  </div>
                  <span style={{ color: color.text, fontSize: '1.2rem', textShadow: `0 0 10px ${color.text}`, opacity: 0.7 }}>✦</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WebServicesSection;