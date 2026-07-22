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

// Optimized colors that adapt beautifully across both light and dark backgrounds
const badgeColors = [
  { text: '#00d2ff', bg: 'rgba(0, 210, 255, 0.08)', border: 'rgba(0, 210, 255, 0.3)', glow: 'rgba(0, 210, 255, 0.25)' },
  { text: '#ec4899', bg: 'rgba(236, 72, 153, 0.08)', border: 'rgba(236, 72, 153, 0.3)', glow: 'rgba(236, 72, 153, 0.25)' },
  { text: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.3)', glow: 'rgba(16, 185, 129, 0.25)' },
  { text: '#eab308', bg: 'rgba(234, 179, 8, 0.08)', border: 'rgba(234, 179, 8, 0.3)', glow: 'rgba(234, 179, 8, 0.25)' },
  { text: '#f97316', bg: 'rgba(249, 115, 22, 0.08)', border: 'rgba(249, 115, 22, 0.3)', glow: 'rgba(249, 115, 22, 0.25)' },
  { text: '#06b6d4', bg: 'rgba(6, 182, 212, 0.08)', border: 'rgba(6, 182, 212, 0.3)', glow: 'rgba(6, 182, 212, 0.25)' },
  { text: '#a855f7', bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.3)', glow: 'rgba(168, 85, 247, 0.25)' },
  { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.3)', glow: 'rgba(239, 68, 68, 0.25)' }
];

const WebServicesSection = () => {
  const renderTrackGroup = (keyPrefix) => (
    <div className="d-flex align-items-center gap-4 text-uppercase">
      {services.map((service, index) => {
        const color = badgeColors[index % badgeColors.length];
        return (
          <div key={`${keyPrefix}-${index}`} className="d-flex align-items-center gap-4">
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
              style={{ color: color.text, textShadow: `0 0 10px ${color.glow}` }}
            >
              ✦
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="w-100 position-relative py-3 d-flex align-items-center justify-content-center marquee-section-wrapper">
      <div className="w-100 overflow-hidden position-relative marquee-mask-container">
        <div className="marquee-track-container d-flex align-items-center gap-4">
          {renderTrackGroup('orig')}
          {renderTrackGroup('dup')}
        </div>
      </div>
    </section>
  );
};

export default WebServicesSection;