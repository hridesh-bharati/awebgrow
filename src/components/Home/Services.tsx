"use client";
// src\components\Home\Services.tsx
import React, { useState } from 'react';
import Link from 'next/link';

// TypeScript Interface for strict type safety
interface ServiceItem {
  iconClass: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  glowColor: string;
  iconColor: string;
  gradient: string;
  lightBg: string;
  keywords: string;
}

const webGrowServices: ServiceItem[] = [
  { 
    iconClass: "bi bi-code-slash", 
    title: "Enterprise Web Development", 
    tag: "SCALE",
    description: "High-performance custom web applications built with semantic HTML5 and core optimization for ultra-fast load times. We architect scalable platforms using MERN and Next.js architectures.",
    features: ["Next.js SSR & SSG", "RESTful & GraphQL", "DRY & Minimalist Code"],
    glowColor: "rgba(236, 72, 153, 0.99)", 
    iconColor: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    lightBg: "#fdf2f8",
    keywords: "web development company India, custom website development, Next.js developers, MERN stack development"
  },
  { 
    iconClass: "bi bi-phone-vibrate", 
    title: "Mobile UX Architecture", 
    tag: "UX/UI",
    description: "Native app-like responsive user interfaces featuring smooth fluid transitions, minimalist glassmorphism layers, and automated cross-browser component scalability benchmarks.",
    features: ["Material Design 3", "PWA Setup & Rules", "Mobile PageSpeed Boost"],
    glowColor: "rgba(56, 189, 248, 0.99)", 
    iconColor: "#0ea5e9",
    gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    lightBg: "#f0f9ff",
    keywords: "mobile app development, responsive web design, PWA development, UI/UX design services"
  },
  { 
    iconClass: "bi bi-search-heart", 
    title: "Technical SEO Optimization", 
    tag: "GROWTH",
    description: "Advanced semantic optimizations and structured schema injections designed to boost organic crawlability indexes, visibility, and Google Core Web Vitals rankings.",
    features: ["JSON-LD Rich Schema", "Core Web Vitals Audit", "Automated Sitemaps"],
    glowColor: "rgba(34, 197, 94, 0.99)", 
    iconColor: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e, #4ade80)",
    lightBg: "#f0fdf4",
    keywords: "SEO services India, search engine optimization, Google ranking, Core Web Vitals"
  },
  { 
    iconClass: "bi bi-shield-lock", 
    title: "Cyber Security Solutions", 
    tag: "SECURITY",
    description: "Enterprise-grade defensive security engineering. We implement advanced token sanitization protocols, data encryption matrices, and secure multi-layer user authentication barriers.",
    features: ["JWT & OAuth2 Secure", "SQL Injection Guard", "Real-time XSS Guard"],
    glowColor: "rgba(251, 191, 36, 0.99)", 
    iconColor: "#eab308",
    gradient: "linear-gradient(135deg, #eab308, #facc15)",
    lightBg: "#fefce8",
    keywords: "web security services, JWT authentication, XSS protection, SQL injection prevention"
  },
  { 
    iconClass: "bi bi-cloud-arrow-up", 
    title: "Cloud Devops & Infrastructure", 
    tag: "DEVOPS",
    description: "Automated containerization architectures and redundant global cloud networks that ensure continuous 99.9% application uptime and lightning-fast edge replication assets.",
    features: ["Docker & Kubernetes", "CI/CD Pipelines Setup", "Global CDN Nodes"],
    glowColor: "rgba(251, 146, 60, 0.99)", 
    iconColor: "#f97316",
    gradient: "linear-gradient(135deg, #f97316, #fb923c)",
    lightBg: "#fff7ed",
    keywords: "cloud computing services, DevOps solutions, Docker Kubernetes, CI/CD pipeline"
  },
  { 
    iconClass: "bi bi-robot", 
    title: "AI Integration & Automation", 
    tag: "INTELLIGENCE",
    description: "Empower your workflows with localized artificial intelligence modules, real-time linguistic vector processing nodes, and predictive data automation algorithms.",
    features: ["LLM API Integration", "Automated Workflow Nodes", "Advanced Diagnostics"],
    glowColor: "rgba(139, 92, 246, 0.99)", 
    iconColor: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    lightBg: "#f5f3ff",
    keywords: "AI development services, machine learning, chatbot development, automation"
  },
  { 
    iconClass: "bi bi-database-check", 
    title: "Database Modeling & Tuning", 
    tag: "DATA",
    description: "High-volume data storage management systems. Expert configuration of ACID compliant schemas and distributed database engines optimized for instantaneous search indexing.",
    features: ["PostgreSQL Clusters", "NoSQL MongoDB Sharding", "Advanced Query Tuning"],
    glowColor: "rgba(239, 68, 68, 0.99)", 
    iconColor: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #f87171)",
    lightBg: "#fef2f2",
    keywords: "database management, PostgreSQL, MongoDB, data optimization"
  },
  { 
    iconClass: "bi bi-graph-up-arrow", 
    title: "Monetization Analytics Strategy", 
    tag: "REVENUE",
    description: "Data-driven revenue tracking modules. Seamless scripts injection for tracking user events and managing advertisement blocks through high-conversion layout spots.",
    features: ["AdSense Dynamic Layouts", "Conversion Heatmaps", "Real-Time Dashboards"],
    glowColor: "rgba(59, 130, 246, 0.99)", 
    iconColor: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    lightBg: "#eff6ff",
    keywords: "digital marketing, Google AdSense, conversion optimization, analytics"
  }
];

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCardClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ✅ HTML5 Semantic Section */}
      <section 
        className="py-5 position-relative overflow-hidden services-section" 
        id="services-page-hub"
        aria-label="AWebGrow Digital Services - Web Development, SEO, App Development"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        
        {/* Decorative Backdrop - Hidden from Screen Readers */}
        <div className="position-absolute top-0 start-0 w-100 h-100" aria-hidden="true" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(236, 72, 153, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(251, 191, 36, 0.06) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>
        
        {/* Animated Grid Lines */}
        <div className="position-absolute w-100 h-100" aria-hidden="true" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.5
        }}></div>

        <div className="container-fluid py-4 position-relative" style={{ zIndex: 1 }}>
          
          {/* ✅ Header with H2 (H1 already on page) */}
          <header className="text-center mb-5" data-aos="fade-up">
            <span className="badge rounded-pill px-4 py-2 mb-3 fw-bold" style={{ 
              fontSize: '0.7rem', 
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
              color: '#be185d',
              border: '1px solid rgba(236, 72, 153, 0.2)'
            }}>
              ⚡ ENTERPRISE CAPABILITIES
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#0f172a' }}>
              Our Next-Gen{' '}
              <span className="gradient-text">Digital Services</span>
            </h2>
            <p className="mx-auto fs-6" style={{ 
              maxWidth: '550px',
              color: '#64748b'
            }}>
              AWebGrow is a leading <strong>web development company in India</strong> offering 
              custom website development, mobile app development, SEO services, UI/UX design, 
              and enterprise software solutions.
            </p>
          </header>

          {/* ✅ Services Grid with Schema */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 justify-content-center" role="list">
            {webGrowServices.map((service, index) => (
              <div 
                className="col d-flex" 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 60}
                role="listitem"
                itemScope
                itemType="https://schema.org/Service"
              >
                <article 
                  className="glass-card w-100 d-flex flex-column position-relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(service)}
                  aria-label={`${service.title} - ${service.tag}`}
                  title={service.keywords}
                  style={{
                    background: hoveredCard === index 
                      ? '#ffffff'
                      : service.lightBg,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: hoveredCard === index 
                      ? `2px solid ${service.iconColor}`
                      : `1px solid ${service.iconColor}20`,
                    boxShadow: hoveredCard === index 
                      ? `0 20px 60px ${service.iconColor}25, 0 0 40px ${service.iconColor}10`
                      : '0 4px 20px rgba(0,0,0,0.04)',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: hoveredCard === index ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
                    cursor: 'pointer',
                    padding: '28px 24px 24px',
                    minHeight: '360px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Schema Meta */}
                  <meta itemProp="name" content={service.title} />
                  <meta itemProp="description" content={service.description} />
                  
                  {/* Glass Reflection Effect */}
                  <div 
                    className="glass-shimmer position-absolute"
                    aria-hidden="true"
                    style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: `linear-gradient(180deg, ${service.iconColor}08 0%, transparent 100%)`,
                      borderRadius: '24px 24px 0 0',
                      pointerEvents: 'none',
                      opacity: hoveredCard === index ? 1 : 0.3,
                      transition: 'opacity 0.5s ease'
                    }}
                  ></div>

                  {/* Colored Glow Orb */}
                  <div 
                    className="position-absolute rounded-circle"
                    aria-hidden="true"
                    style={{
                      width: '200px',
                      height: '200px',
                      background: service.glowColor,
                      opacity: hoveredCard === index ? 0.12 : 0.02,
                      filter: 'blur(60px)',
                      bottom: '-60px',
                      right: '-60px',
                      pointerEvents: 'none',
                      transition: 'opacity 0.5s ease',
                      transform: hoveredCard === index ? 'scale(1.5)' : 'scale(1)'
                    }}
                  ></div>

                  <div className="card-content position-relative" style={{ zIndex: 2 }}>
                    
                    {/* Icon with Gradient Background */}
                    <div 
                      className="icon-wrapper d-flex align-items-center justify-content-center mb-4"
                      aria-hidden="true"
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '18px',
                        background: service.gradient,
                        boxShadow: `0 8px 30px ${service.glowColor.replace('0.99', '0.25')}`,
                        color: '#ffffff',
                        fontSize: '28px',
                        transition: 'all 0.4s ease',
                        transform: hoveredCard === index ? 'scale(1.1) rotate(-6deg)' : 'scale(1) rotate(0deg)'
                      }}
                    >
                      <i className={service.iconClass}></i>
                    </div>

                    {/* Tag Badge */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="fw-bold mb-0" style={{ 
                        fontSize: '1.05rem', 
                        color: '#0f172a',
                        letterSpacing: '-0.01em'
                      }}>
                        {service.title}
                      </h3>
                      <span 
                        className="badge rounded-pill px-3 py-1.5 fw-bold"
                        style={{
                          fontSize: '0.6rem',
                          letterSpacing: '0.08em',
                          background: service.gradient,
                          color: '#ffffff',
                          boxShadow: `0 4px 12px ${service.glowColor.replace('0.99', '0.25')}`
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="mb-3" style={{ 
                      fontSize: '0.85rem', 
                      lineHeight: '1.6',
                      color: '#64748b'
                    }}>
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="list-unstyled p-0 m-0 mb-3 d-flex flex-column gap-1.5" aria-label={`${service.title} features`}>
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem' }}>
                          <i className="bi bi-check-circle-fill" style={{ color: service.iconColor, fontSize: '0.9rem' }} aria-hidden="true"></i>
                          <span style={{ color: '#475569' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Link */}
                    <div className="mt-auto pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                      <span 
                        className="d-inline-flex align-items-center gap-2 fw-bold"
                        style={{
                          color: service.iconColor,
                          fontSize: '0.85rem',
                          transition: 'gap 0.3s ease'
                        }}
                        role="button"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                        <i className="bi bi-arrow-right" aria-hidden="true" style={{ transition: 'transform 0.3s ease' }}></i>
                      </span>
                    </div>

                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* ✅ Bottom CTA */}
          <footer className="text-center mt-5">
            <Link 
              href="/contact" 
              className="btn rounded-pill px-5 py-3 fw-bold shadow-lg position-relative overflow-hidden"
              aria-label="Contact AWebGrow for web development services"
              title="Get Started with AWebGrow - Web Development Company India"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                border: 'none',
                color: '#ffffff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLAnchorElement;
                target.style.transform = 'scale(1.05)';
                target.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.35)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLAnchorElement;
                target.style.transform = 'scale(1)';
                target.style.boxShadow = '0 8px 30px rgba(236, 72, 153, 0.25)';
              }}
            >
              <span className="position-relative" style={{ zIndex: 2 }}>
                Get Started Today
                <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
              </span>
              <span className="position-absolute top-0 start-0 w-100 h-100" aria-hidden="true" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
                zIndex: 1
              }}></span>
            </Link>
          </footer>

        </div>

        {/* Styles */}
        <style jsx>{`
          .services-section {
            min-height: 100vh;
            background: #f8fafc;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #ec4899, #8b5cf6, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 300% 300%;
            animation: gradientShift 4s ease-in-out infinite;
          }

          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .glass-card {
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .glass-card:hover {
            background: #ffffff !important;
          }

          .icon-wrapper {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          .glass-card:nth-child(1) { animation: float 6s ease-in-out infinite; animation-delay: 0s; }
          .glass-card:nth-child(2) { animation: float 6s ease-in-out infinite; animation-delay: 0.5s; }
          .glass-card:nth-child(3) { animation: float 6s ease-in-out infinite; animation-delay: 1s; }
          .glass-card:nth-child(4) { animation: float 6s ease-in-out infinite; animation-delay: 1.5s; }
          .glass-card:nth-child(5) { animation: float 6s ease-in-out infinite; animation-delay: 2s; }
          .glass-card:nth-child(6) { animation: float 6s ease-in-out infinite; animation-delay: 2.5s; }
          .glass-card:nth-child(7) { animation: float 6s ease-in-out infinite; animation-delay: 3s; }
          .glass-card:nth-child(8) { animation: float 6s ease-in-out infinite; animation-delay: 3.5s; }

          .glass-card:hover {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .glass-card {
              padding: 20px !important;
              min-height: 300px !important;
            }
            .glass-card .icon-wrapper {
              width: 52px !important;
              height: 52px !important;
              font-size: 22px !important;
            }
          }
        `}</style>
      </section>

      {/* ✅ Service Detail Modal */}
      {isModalOpen && selectedService && (
        <dialog 
          className="modal-overlay position-fixed top-0 mt-4 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          aria-label={`${selectedService.title} details`}
          style={{
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="modal-glass p-4 position-relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{
              maxWidth: '550px',
              width: '95%',
              maxHeight: '95vh',
              overflowY: 'auto',
              borderRadius: '28px',
              background: '#ffffff',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: `1px solid ${selectedService.iconColor}25`,
              boxShadow: `0 40px 120px rgba(0,0,0,0.15), 0 0 60px ${selectedService.iconColor}10`,
              animation: 'slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="position-absolute top-0 end-0 m-3 border-0 d-flex align-items-center justify-content-center modal-custom-close-btn"
              aria-label="Close modal"
              style={{ 
                fontSize: '1rem',
                background: 'rgba(0,0,0,0.04)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#475569',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                zIndex: 10
              }}
            > 
              <i className="bi bi-x-lg fw-bold" aria-hidden="true"></i>
            </button>
            
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center mb-3"
                aria-hidden="true"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: selectedService.gradient,
                  color: '#ffffff',
                  fontSize: '34px',
                  boxShadow: `0 12px 40px ${selectedService.glowColor.replace('0.99', '0.25')}`
                }}
              >
                <i className={selectedService.iconClass}></i>
              </div>
              <h3 id="modal-title" className="fw-bold mb-2 h4" style={{ color: '#0f172a' }}>
                {selectedService.title}
              </h3>
              <span 
                className="badge rounded-pill px-3 py-1.5 fw-bold"
                style={{
                  background: selectedService.gradient,
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em'
                }}
              >
                {selectedService.tag}
              </span>
            </div>

            <p className="mb-4 small" style={{ lineHeight: '1.8', color: '#64748b' }}>
              {selectedService.description}
            </p>

            <h4 className="fw-bold mb-3 h6" style={{ color: '#0f172a' }}>
              <i className="bi bi-check-circle-fill me-2" style={{ color: selectedService.iconColor }} aria-hidden="true"></i>
              Key Features
            </h4>
            <ul className="list-unstyled mb-4 p-0" aria-label="Features list">
              {selectedService.features.map((feature: string, idx: number) => (
                <li key={idx} className="d-flex align-items-start gap-2 mb-2 small">
                  <i className="bi bi-check-lg mt-0.5" style={{ color: selectedService.iconColor, fontSize: '1.1rem' }} aria-hidden="true"></i>
                  <span style={{ color: '#475569' }}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="d-grid gap-2">
              <Link 
                href="/contact" 
                className="btn rounded-pill py-3 fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                aria-label={`Contact AWebGrow for ${selectedService.title}`}
                style={{
                  background: selectedService.gradient,
                  border: 'none',
                  boxShadow: `0 8px 30px ${selectedService.glowColor.replace('0.99', '0.25')}`
                }}
                onClick={() => setIsModalOpen(false)}
              >
                Get This Service
                <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>

            <style jsx global>{`
              .modal-custom-close-btn:hover {
                background: rgba(0,0,0,0.08) !important;
                transform: scale(1.08) rotate(90deg);
              }
              .modal-custom-close-btn:active {
                transform: scale(0.95);
              }
            `}</style>
          </div>
        </dialog>
      )}

      {/* Global Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .modal-glass::-webkit-scrollbar {
          width: 4px;
        }
        .modal-glass::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.04);
          border-radius: 10px;
        }
        .modal-glass::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}