"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// TypeScript Interface for premium styling metrics
interface ServiceItem {
  iconClass: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  glowColor: string;
  iconColor: string;
  gradient: string;
  size?: 'large' | 'normal'; 
}

// Colorfully updated array with an explicit emphasis on Mobile Apps & ASO
const webGrowServices: ServiceItem[] = [
  { 
    iconClass: "bi bi-phone-flip", 
    title: "Cross-Platform App Architecture", 
    tag: "NATIVE CORE",
    description: "High-performance native iOS and Android ecosystems built via Flutter and React Native. Engineered with optimized multi-threaded lifecycles for fluid 120Hz refresh rates and immediate time-to-interactive metrics.",
    features: ["Flutter & React Native Engines", "Biometric & Hardware API Sync", "Offline-First Sync Engine"],
    glowColor: "rgba(0, 180, 216, 0.2)", 
    iconColor: "#00b4d8",
    gradient: "linear-gradient(135deg, #00f2fe, #4facfe)",
    size: 'large'
  },
  { 
    iconClass: "bi bi-graph-up-arrow", 
    title: "Global ASO & Visibility Indexing", 
    tag: "GROWTH",
    description: "Algorithmic keyword optimization, localized metadata architectures, and conversion-optimized visual workflows engineered to rank your app top 5 across Apple App Store & Google Play.",
    features: ["Keyword Velocity Audits", "Localized Metadata Mapping", "A/B Screenshot Funnel Tuning"],
    glowColor: "rgba(101, 163, 13, 0.2)", 
    iconColor: "#65a30d",
    gradient: "linear-gradient(135deg, #baff29, #10b981)"
  },
  { 
    iconClass: "bi bi-lightning-charge-fill", 
    title: "User Acquisition & Retention Funnels", 
    tag: "ENGAGEMENT",
    description: "Advanced deep-linking infrastructure coupled with personalized push automation setups and interactive retention mechanics that systematically suppress app churn.",
    features: ["Branch.io & Adjust Attribution", "Segmented Rich Push Scripts", "In-App Micro-Rewards Triggers"],
    glowColor: "rgba(219, 39, 119, 0.2)", 
    iconColor: "#db2777",
    gradient: "linear-gradient(135deg, #ff0080, #7928ca)"
  },
  { 
    iconClass: "bi bi-cpu-fill", 
    title: "On-Device AI & Edge Neural Modules", 
    tag: "INTELLIGENCE",
    description: "Integrate specialized, low-latency machine learning frameworks into your mobile application utilizing CoreML and TensorFlow Lite for offline contextual computing.",
    features: ["CoreML & TF Lite Tuning", "Real-time Vision Matrix", "Privacy-First Local Vectors"],
    glowColor: "rgba(234, 88, 12, 0.2)", 
    iconColor: "#ea580c",
    gradient: "linear-gradient(135deg, #f97316, #ff4500)",
    size: 'large'
  },
  { 
    iconClass: "bi bi-fingerprint", 
    title: "Mobile Security & Fraud Deterrence", 
    tag: "SECURITY",
    description: "Bank-grade device storage hardening. Implementing end-to-end payload sanitization, certificate pinning, and biometric runtime checks to shield user data ecosystems.",
    features: ["SSL Certificate Pinning", "Encrypted Keychain Modules", "OWASP Mobile Top 10 Guards"],
    glowColor: "rgba(124, 58, 237, 0.2)", 
    iconColor: "#7c3aed",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)"
  },
  { 
    iconClass: "bi bi-app-indicator", 
    title: "Storefront Compliance & Delivery", 
    tag: "COMPLIANCE",
    description: "Seamless deployment pipelines engineered to handle regulatory audits, strict App Store review guidelines, and complex Google Play sandbox compliance policies.",
    features: ["Apple Review Pre-Screening", "GDPR / CCPA Framework Sync", "Automated Fastlane Shipments"],
    glowColor: "rgba(225, 29, 72, 0.2)", 
    iconColor: "#e11d48",
    gradient: "linear-gradient(135deg, #db2777, #f43f5e)"
  }
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const cards = document.querySelectorAll('.service-card-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedService(null), 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <section ref={sectionRef} className="services-section py-6 position-relative overflow-hidden bg-slate-50 text-slate-900" id="services" style={{ backgroundColor: '#f8fafc' }}>
        {/* Soft Fluid Vibrant Ambient Blurred Background Elements */}
        <div className="bg-blur-effect top-0 start-0 visual-orb-1" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,242,254,0.18) 0%, transparent 70%)', position: 'absolute', width: '600px', height: '600px', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
        <div className="bg-blur-effect bottom-0 end-0 visual-orb-2" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,0,128,0.1) 0%, transparent 70%)', position: 'absolute', width: '600px', height: '600px', filter: 'blur(100px)', pointerEvents: 'none' }}></div>

        <div className="container position-relative" style={{ zIndex: 2 }}>
          {/* Header */}
        {/* Header Container */}
<div className="section-header text-center mb-5 pb-3 px-3">
  
  {/* Badge Wrapper */}
  <div 
    className="badge-wrapper d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-3" 
    style={{ 
      background: 'rgba(15,23,42,0.05)', 
      border: '1px solid rgba(15,23,42,0.08)' 
    }}
  >
    <span 
      className="badge-dot" 
      style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        backgroundColor: '#00b4d8', 
        display: 'inline-block' 
      }}
    ></span>
    <span 
      className="badge-text fw-bold text-uppercase" 
      style={{ 
        fontSize: '0.75rem', 
        letterSpacing: '0.15em',
        color: '#475569' /* Slate-600 color code ka custom css */
      }}
    >
      Growth Framework
    </span>
  </div>
  
  {/* Section Title (Bootstrap Display Class + Custom Gradient CSS) */}
  <h2 
    className="section-title display-5 display-md-4 mb-3" 
    style={{ 
      fontWeight: 900,
      color: '#0f172a', /* Slate-900 color code */
      lineHeight: '1.2'
    }}
  >
    Next-Gen Services To <br className="d-none d-md-inline" />
    <span 
      className="gradient-text-modern" 
      style={{ 
        background: 'linear-gradient(90deg, #00b4d8, #65a30d, #db2777)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }}
    >
      Scale Your App Ecosystem
    </span>
  </h2>
  
  {/* Section Description */}
  <p 
    className="section-description mx-auto fs-6 fs-md-5" 
    style={{ 
      maxWidth: '600px', 
      color: '#475569',
      lineHeight: '1.6'
    }}
  >
    We architect blazing-fast native application infrastructures and dominant ASO pipelines configured for maximum organic user acquisition.
  </p>

</div>

          {/* Bento Grid Layout */}
          <div className="row g-4 grid-bento">
            {webGrowServices.map((service, index) => {
              const columnClass = service.size === 'large' 
                ? "col-12 col-lg-8 service-card-wrapper" 
                : "col-12 col-md-6 col-lg-4 service-card-wrapper";

              return (
                <div className={columnClass} key={index}>
                  <div 
                    className={`modern-service-card h-100 d-flex flex-column position-relative p-4 rounded-4 ${hoveredCard === index ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(service)}
                    style={{
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.75)',
                      border: '1px solid rgba(15, 23, 42, 0.06)',
                      backdropFilter: 'blur(16px)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: hoveredCard === index ? `0 24px 48px -12px ${service.glowColor}` : '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
                      transform: hoveredCard === index ? 'translateY(-5px)' : 'none'
                    }}
                  >
                    {/* Card Content Top: Icon & Tag */}
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="modern-icon-box p-3 rounded-3 d-flex align-items-center justify-content-center text-white fs-4" style={{ background: service.gradient, width: '52px', height: '52px', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1)' }}>
                        <i className={service.iconClass}></i>
                      </div>
                      <span className="modern-card-tag px-2.5 py-1 rounded-2 fw-bold text-white" style={{ background: service.iconColor, fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                        {service.tag}
                      </span>
                    </div>

                    {/* Card Middle: Text */}
                    <div className="mb-4">
                      <h3 className="modern-card-title fw-bold mb-2 h5 transition-all" style={{ color: hoveredCard === index ? service.iconColor : '#0f172a' }}>
                        {service.title}
                      </h3>
                      <p className="modern-card-desc mb-0" style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Features List */}
                    <ul className="modern-features-list list-unstyled mt-auto pt-2 mb-4">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.88rem' }}>
                          <i className="bi bi-patch-check-fill" style={{ color: service.iconColor }}></i>
                          <span style={{ color: '#334155', fontWeight: 500 }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Card Footer */}
                    <div className="modern-card-footer pt-3 mt-auto d-flex align-items-center justify-content-between" style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}>
                      <span className="action-text fw-bold" style={{ fontSize: '0.85rem', color: hoveredCard === index ? service.iconColor : '#64748b' }}>Explore Blueprint</span>
                      <div className="arrow-circle d-flex align-items-center justify-content-center rounded-circle" style={{ width: '32px', height: '32px', background: 'rgba(15,23,42,0.03)', transition: 'all 0.3s', transform: hoveredCard === index ? 'rotate(45deg)' : 'none', color: service.iconColor }}>
                        <i className="bi bi-arrow-up-right" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Epic CTA Footer Button */}
          <div className="text-center mt-5 pt-4">
            <Link href="/contact" className="modern-cta-btn btn rounded-pill px-5 py-3 fw-bold position-relative overflow-hidden text-white transition-all shadow-lg" style={{ background: 'linear-gradient(90deg, #db2777, #7c3aed)', border: 'none', boxShadow: '0 10px 25px -5px rgba(124,58,237,0.3)' }}>
              <span className="position-relative" style={{ zIndex: 1 }}>Let's Build Something Epic</span>
              <i className="bi bi-arrow-right ms-2 position-relative" style={{ zIndex: 1 }}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Glassmorphic Dynamic Modal */}
      {isModalOpen && selectedService && (
        <div className="modern-modal-overlay d-flex align-items-center justify-content-center" onClick={closeModal} role="dialog" aria-modal="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.3)', backdropFilter: 'blur(16px)', zIndex: 1050 }}>
          <div className="modern-modal-wrapper position-relative p-4 p-md-5 rounded-4 text-slate-900 mx-3" onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255, 255, 255, 0.95)', border: `1px solid rgba(15,23,42,0.08)`, maxWidth: '580px', width: '100%', boxShadow: `0 30px 60px -15px rgba(15,23,42,0.15)` }}>
            <button className="modern-close-btn position-absolute border-0 bg-transparent text-slate-500 hover:text-slate-800 opacity-70" onClick={closeModal} aria-label="Close modal" style={{ top: '20px', right: '20px', fontSize: '1.25rem' }}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="modal-inner-layout text-center">
              <div className="modern-icon-box mx-auto mb-3 p-3 rounded-3 d-flex align-items-center justify-content-center text-white fs-3" style={{ background: selectedService.gradient, width: '60px', height: '60px', boxShadow: '0 8px 20px -4px rgba(0,0,0,0.15)' }}>
                <i className={selectedService.iconClass}></i>
              </div>
              
              <h3 className="fw-bold mb-2 fs-3 text-slate-900">{selectedService.title}</h3>
              <span className="modern-card-tag px-3 py-1 rounded-2 text-white fw-bold d-inline-block mb-3" style={{ background: selectedService.iconColor, fontSize: '0.75rem' }}>{selectedService.tag}</span>
              <p className="mb-4" style={{ color: '#475569', lineHeight: '1.6' }}>{selectedService.description}</p>

              <div className="text-start modern-modal-features-box p-4 rounded-4 mb-4" style={{ background: 'rgba(15,23,42,0.02)', border: '1px solid rgba(15,23,42,0.04)' }}>
                <h4 className="text-slate-800 fw-bold fs-6 mb-3">Target KPI Performance Deliverables</h4>
                <div className="row g-2">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="col-12 d-flex align-items-center gap-2 text-slate-600" style={{ fontSize: '0.9rem' }}>
                      <i className="bi bi-lightning-fill" style={{ color: selectedService.iconColor }}></i>
                      <span style={{ color: '#334155', fontWeight: 500 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="btn btn-dark w-100 rounded-pill py-3 fw-bold tracking-wide border-0" onClick={closeModal} style={{ background: '#0f172a', color: '#ffffff', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
                Initiate Project Discovery Phase
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}