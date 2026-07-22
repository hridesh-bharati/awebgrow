"use client";

import React from 'react';
import './WebServicesSection.css';

const services = [
  "SEO Optimization", "Digital Marketing", "Full-Stack Coding", "Website Development",
  "UI/UX Design", "E-commerce Solutions", "Mobile App Development", "Cloud Hosting",
  "AI Integration", "Custom ERP Systems", "Brand Identity", "Social Media Management",
  "Content Writing", "Cybersecurity", "Database Management", "SaaS Development",
  "Performance Optimization", "PWA Development", "IT Consulting", "API Integration",
  "Tech Support", "Digital Transformation"
];

// Pre-defined Neon Palette Matrix
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

const WebServicesSection = () => {
  return (
    <section className="w-100 position-relative py-3 d-flex align-items-center justify-content-center marquee-section-wrapper">
      
      {/* MASK CONTAINER FOR FADING EDGES */}
      <div className="w-100 overflow-hidden position-relative marquee-mask-container">
        
        {/* RUNNING MARQUEE CONTAINER */}
        <div className="marquee-track-container d-flex align-items-center gap-4">
          
          {/* TRACK GROUP 1 */}
          <div className="d-flex align-items-center gap-4 text-uppercase">
            {services.map((service, index) => {
              const color = badgeColors[index % badgeColors.length];
              return (
                <div key={`orig-${index}`} className="d-flex align-items-center gap-4">
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
                  <span 
                    className="badge-star-icon" 
                    style={{ color: color.text, textShadow: `0 0 10px ${color.text}` }}
                  >
                    ✦
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* TRACK GROUP 2 (DUPLICATE FOR SEAMLESS LOOP) */}
          <div className="d-flex align-items-center gap-4 text-uppercase">
            {services.map((service, index) => {
              const color = badgeColors[index % badgeColors.length];
              return (
                <div key={`dup-${index}`} className="d-flex align-items-center gap-4">
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
                  <span 
                    className="badge-star-icon" 
                    style={{ color: color.text, textShadow: `0 0 10px ${color.text}` }}
                  >
                    ✦
                  </span>
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