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
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

interface ServiceItem {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  tag: string;
  description: string;
  features: string[];
  accentColor: string;
  glassBg: string;
}

// Exactly 6 core web development ecosystem capabilities
const services: ServiceItem[] = [
  {
    icon: Globe,
    title: "Custom Web Apps",
    tag: "FRONTEND / FULLSTACK",
    description: "Fast, SEO-optimized user interfaces built with production-ready Next.js and React pipelines.",
    features: ["Next.js App Router", "SEO & Core Web Vitals", "State Management"],
    accentColor: "#22c55e", // Dashboard Green
    glassBg: "rgba(255, 255, 255, 0.65)"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Stores",
    tag: "RETAIL SOLUTIONS",
    description: "High-conversion digital storefronts built with seamless payment handling and inventory hooks.",
    features: ["Stripe / Crypto Hooks", "Inventory Sync Systems", "Instant Fluid Checkout"],
    accentColor: "#3b82f6", // Active Blue
    glassBg: "rgba(255, 255, 255, 0.65)"
  },
  {
    icon: Layout,
    title: "UI/UX Architecture",
    tag: "PRODUCT DESIGN",
    description: "Wireframes, layout frameworks, and responsive design systems that prioritize intuitive user actions.",
    features: ["Figma to Code Systems", "User Action Mapping", "Responsive Wireframes"],
    accentColor: "#ea580c", // Warning/Alert Orange
    glassBg: "rgba(255, 255, 255, 0.65)"
  },
  {
    icon: Server,
    title: "Backend Frameworks",
    tag: "SCALABLE SYSTEMS",
    description: "Robust data architectures, secure API development, and lightning-fast database performance optimization.",
    features: ["RESTful / GraphQL APIs", "Database Optimization", "Secure Middleware"],
    accentColor: "#a855f7", // Inbox Purple
    glassBg: "rgba(255, 255, 255, 0.65)"
  },
  {
    icon: Shield,
    title: "Security Hardening",
    tag: "DATA PROTECTION",
    description: "Implementing token authorizations, end-to-end user encryption protocols, and regular site vulnerability patches.",
    features: ["JWT / OAuth Verification", "Data Encryption Layers", "Vulnerability Patches"],
    accentColor: "#ef4444", // Exam Red
    glassBg: "rgba(255, 255, 255, 0.65)"
  },
  {
    icon: Zap,
    title: "Speed Optimization",
    tag: "PERFORMANCE",
    description: "Deep diagnostic code profiling, asset compression, and intelligent caching setups to ensure fast page loads.",
    features: ["Smart Edge Caching", "Asset Asset Compression", "Bundle Size Shaving"],
    accentColor: "#0d9488", // Attendance Teal
    glassBg: "rgba(255, 255, 255, 0.65)"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedService(null);
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Shared feature renderer to maintain DRY infrastructure
  const renderFeatures = (features: string[], color: string, size = 14) => 
    features.map((feature, idx) => (
      <div key={idx} className="d-flex align-items-center gap-2 mb-2 text-secondary" style={{ fontSize: '0.875rem' }}>
        <Check size={size} style={{ color, flexShrink: 0 }} />
        <span>{feature}</span>
      </div>
    ));

  return (
    <section className="py-5 position-relative overflow-hidden" id="services" style={{ background: '#f8fafc' }}>
      {/* Reduced blue intensity blobs drastically to keep background balanced and clean */}
      <div className="position-absolute rounded-circle opacity-10" style={{ top: '-5%', left: '10%', width: '250px', height: '250px', background: '#e2e8f0', filter: 'blur(90px)' }} />
      <div className="position-absolute rounded-circle opacity-10" style={{ bottom: '5%', right: '10%', width: '300px', height: '300px', background: '#cbd5e1', filter: 'blur(100px)' }} />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)', border: '1px solid #e2e8f0' }}>
            <Sparkles size={14} style={{ color: '#475569' }} />
            <span className="fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: '#475569' }}>WHAT WE DO</span>
          </div>
          <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>Web Ecosystem Solutions</h2>
        </div>

        {/* Services Layout Grid */}
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="h-100 p-4 rounded-4"
                  onClick={() => setSelectedService(service)}
                  style={{
                    cursor: 'pointer',
                    background: service.glassBg,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = `${service.accentColor}50`;
                    e.currentTarget.style.boxShadow = `0 12px 30px -5px ${service.accentColor}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.boxShadow = '0 4px 24px -4px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center justify-content-center rounded-3 text-white" style={{ width: '46px', height: '46px', background: service.accentColor }}>
                        <IconComponent size={22} />
                      </div>
                      <h4 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: '1.15rem' }}>{service.title}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded text-muted fw-semibold" style={{ background: 'rgba(0,0,0,0.04)', fontSize: '0.65rem' }}>{service.tag}</span>
                  </div>
                  
                  <p className="mb-4 text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>{service.description}</p>
                  
                  <div className="mt-auto">{renderFeatures(service.features, service.accentColor)}</div>

                  <div className="mt-4 pt-3 d-flex align-items-center justify-content-between" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <span className="fw-semibold" style={{ fontSize: '0.85rem', color: service.accentColor }}>Inspect Stack</span>
                    <ArrowRight size={16} style={{ color: service.accentColor }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Modular Modal Stack */}
      {selectedService && (() => {
        const ModalIcon = selectedService.icon;
        return (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            onClick={() => setSelectedService(null)}
            style={{ background: 'rgba(15, 23, 42, 0.2)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 1050, padding: '1rem' }}
          >
            <div 
              className="rounded-4 p-4 p-md-5 position-relative"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxWidth: '480px', 
                width: '100%', 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.12)'
              }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="position-absolute border-0 d-flex align-items-center justify-content-center"
                style={{ top: '1.25rem', right: '1.25rem', width: '32px', height: '32px', borderRadius: '50%', color: '#64748b', background: 'rgba(0,0,0,0.05)' }}
              >
                <X size={16} />
              </button>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center justify-content-center rounded-3 text-white" style={{ width: '52px', height: '52px', background: selectedService.accentColor }}>
                  <ModalIcon size={26} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark" style={{ fontSize: '1.35rem' }}>{selectedService.title}</h3>
                  <span className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>{selectedService.tag}</span>
                </div>
              </div>

              <p className="text-secondary" style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>{selectedService.description}</p>

              <div className="p-3 rounded-3 mt-4" style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h6 className="fw-bold mb-3 text-dark" style={{ fontSize: '0.9rem' }}>Delivery Framework Details</h6>
                {renderFeatures(selectedService.features, selectedService.accentColor, 16)}
              </div>

              <Link
                href="/contact"
                className="btn w-100 rounded-3 py-2.5 fw-semibold text-white mt-4 d-inline-flex align-items-center justify-content-center gap-2"
                onClick={() => setSelectedService(null)}
                style={{ background: selectedService.accentColor, border: 'none' }}
              >
                Configure Specs
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        );
      })()}
    </section>
  );
}