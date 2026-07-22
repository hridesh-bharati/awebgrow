"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Globe, 
  ShoppingCart, 
  Layout, 
  Server, 
  Shield, 
  Zap, 
  X, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface ServiceItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  tag: string;
  description: string;
  features: string[];
  accentColor: string;
  glowColor: string;
}

const services: ServiceItem[] = [
  {
    icon: Globe,
    title: "Custom Web Apps",
    tag: "FRONTEND / FULLSTACK",
    description: "Fast, SEO-optimized user interfaces built with production-ready Next.js and React pipelines.",
    features: ["Next.js App Router", "SEO & Core Web Vitals", "State Management"],
    accentColor: "#10b981", 
    glowColor: "rgba(16, 185, 129, 0.35)"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Stores",
    tag: "RETAIL SOLUTIONS",
    description: "High-conversion digital storefronts built with seamless payment handling and inventory hooks.",
    features: ["Stripe / Crypto Hooks", "Inventory Sync Systems", "Instant Fluid Checkout"],
    accentColor: "#3b82f6", 
    glowColor: "rgba(59, 130, 246, 0.35)"
  },
  {
    icon: Layout,
    title: "UI/UX Architecture",
    tag: "PRODUCT DESIGN",
    description: "Wireframes, layout frameworks, and responsive design systems that prioritize intuitive user actions.",
    features: ["Figma to Code Systems", "User Action Mapping", "Responsive Wireframes"],
    accentColor: "#f97316", 
    glowColor: "rgba(249, 115, 22, 0.35)"
  },
  {
    icon: Server,
    title: "Backend Frameworks",
    tag: "SCALABLE SYSTEMS",
    description: "Robust data architectures, secure API development, and lightning-fast database performance optimization.",
    features: ["RESTful / GraphQL APIs", "Database Optimization", "Secure Middleware"],
    accentColor: "#a855f7", 
    glowColor: "rgba(168, 85, 247, 0.35)"
  },
  {
    icon: Shield,
    title: "Security Hardening",
    tag: "DATA PROTECTION",
    description: "Implementing token authorizations, end-to-end user encryption protocols, and regular site vulnerability patches.",
    features: ["JWT / OAuth Verification", "Data Encryption Layers", "Vulnerability Patches"],
    accentColor: "#ff0080", 
    glowColor: "rgba(255, 0, 128, 0.35)"
  },
  {
    icon: Zap,
    title: "Speed Optimization",
    tag: "PERFORMANCE",
    description: "Deep diagnostic code profiling, asset compression, and intelligent caching setups to ensure fast page loads.",
    features: ["Smart Edge Caching", "Asset Compression", "Bundle Size Shaving"],
    accentColor: "#00f2fe", 
    glowColor: "rgba(0, 242, 254, 0.35)"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedService(null);
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const renderFeatures = (features: string[], color: string, size = 14) => 
    features.map((feature, idx) => (
      <div key={idx} className="d-flex align-items-center gap-2 mb-2 text-theme-secondary" style={{ fontSize: '0.85rem' }}>
        <Check size={size} style={{ color, flexShrink: 0 }} />
        <span>{feature}</span>
      </div>
    ));

  return (
    <section className="py-5 position-relative overflow-hidden bg-theme-main border-top" id="services" style={{ borderColor: 'var(--border-subtle)' }}>
      
      {/* High-Contrast Neon Ambient Glow Orbs */}
      <div 
        className="position-absolute rounded-circle pointer-events-none" 
        style={{ 
          width: '450px', 
          height: '450px', 
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12) 0%, transparent 70%)', 
          filter: 'blur(90px)', 
          top: '5%',
          left: '-5%'
        }} 
      />
      <div 
        className="position-absolute rounded-circle pointer-events-none" 
        style={{ 
          width: '450px', 
          height: '450px', 
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)', 
          filter: 'blur(90px)', 
          bottom: '5%',
          right: '-5%'
        }} 
      />

      <div className="container position-relative z-1">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(255, 0, 128, 0.06)',
              border: '1px solid rgba(255, 0, 128, 0.25)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080' }} />
            <span className="fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#ff77bc' }}>
              ✦ WHAT WE DO
            </span>
          </div>

          <h2 className="display-6 fw-extrabold text-theme-primary mb-3">
            Web Ecosystem <span className="text-gradient-pink-orange">Solutions</span>
          </h2>
          
          <p className="text-theme-secondary fs-6 mx-auto" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
            Tailored digital capabilities engineered to scale your brand with cutting-edge stack integration.
          </p>
        </div>

        {/* Services Layout Grid */}
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="h-100 p-4 rounded-4 border position-relative overflow-hidden"
                  onClick={() => setSelectedService(service)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '0 10px 30px var(--shadow-color)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-3 text-white" 
                        style={{ 
                          width: '46px', 
                          height: '46px', 
                          background: service.accentColor,
                          boxShadow: `0 0 15px ${service.glowColor}`
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <h4 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '1.15rem' }}>{service.title}</h4>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded fw-bold" 
                      style={{ 
                        background: 'var(--bg-pill)', 
                        color: service.accentColor,
                        fontSize: '0.65rem',
                        border: `1px solid ${service.accentColor}30`
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>
                  
                  <p className="mb-4 text-theme-secondary" style={{ fontSize: '0.88rem', lineHeight: 1.6, flex: 1 }}>
                    {service.description}
                  </p>
                  
                  <div className="mt-auto">
                    {renderFeatures(service.features, service.accentColor)}
                  </div>

                  <div className="mt-4 pt-3 d-flex align-items-center justify-content-between border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="fw-bold" style={{ fontSize: '0.82rem', color: service.accentColor }}>Inspect Stack</span>
                    <ArrowRight size={16} style={{ color: service.accentColor }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Neon Modal Overlay */}
      {selectedService && (() => {
        const ModalIcon = selectedService.icon;
        return (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            onClick={() => setSelectedService(null)}
            style={{ 
              background: 'rgba(2, 2, 3, 0.75)', 
              backdropFilter: 'blur(12px)', 
              WebkitBackdropFilter: 'blur(12px)', 
              zIndex: 1050 
            }}
          >
            <div 
              className="rounded-4 p-4 p-md-5 position-relative border"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxWidth: '480px', 
                width: '100%', 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--border-subtle)',
                boxShadow: `0 20px 50px ${selectedService.glowColor}`
              }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="position-absolute border-0 d-flex align-items-center justify-content-center text-theme-secondary"
                style={{ 
                  top: '1.25rem', 
                  right: '1.25rem', 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-pill)' 
                }}
              >
                <X size={16} />
              </button>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-3 text-white" 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    background: selectedService.accentColor,
                    boxShadow: `0 0 20px ${selectedService.glowColor}`
                  }}
                >
                  <ModalIcon size={26} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '1.35rem' }}>{selectedService.title}</h3>
                  <span className="fw-bold small" style={{ color: selectedService.accentColor }}>{selectedService.tag}</span>
                </div>
              </div>

              <p className="text-theme-secondary" style={{ lineHeight: 1.6, fontSize: '0.92rem' }}>{selectedService.description}</p>

              <div className="p-3 rounded-3 mt-4 border" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)' }}>
                <h6 className="fw-bold mb-3 text-theme-primary" style={{ fontSize: '0.9rem' }}>Delivery Framework Details</h6>
                {renderFeatures(selectedService.features, selectedService.accentColor, 16)}
              </div>

              <Link
                href="/contact"
                className="btn-neon-cta w-100 justify-content-center py-2.5 mt-4"
                onClick={() => setSelectedService(null)}
              >
                <span>Configure Specs</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        );
      })()}
    </section>
  );
}