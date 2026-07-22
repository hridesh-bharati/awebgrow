"use client";
// src\components\Home\Services.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface ServiceItem {
  iconClass: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  glowColor: string;
  iconColor: string;
  gradient: string;
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
      <section 
        className="py-5 position-relative overflow-hidden bg-theme-main text-theme-primary border-top" 
        id="services-page-hub"
        aria-label="AWebGrow Digital Services"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {/* Ambient Neon Spheres */}
        <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '10%', left: '-5%' }} />
        <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '10%', right: '-5%' }} />

        <div className="container-fluid py-4 position-relative z-1">
          
          {/* Header */}
          <header className="text-center mb-5" data-aos="fade-up">
            <div 
              className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
              style={{
                background: 'rgba(255, 0, 128, 0.08)',
                border: '1.5px solid rgba(255, 0, 128, 0.35)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
              }}
            >
              <span style={{ width: '7px', height: '7px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080' }} />
              <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#ff77bc', fontWeight: 800 }}>
                ⚡ ENTERPRISE CAPABILITIES
              </span>
            </div>

            <h2 className="display-5 fw-black mb-3 text-theme-primary" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
              Our Next-Gen{' '}
              <span className="text-gradient-pink-orange" style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}>
                Digital Services
              </span>
            </h2>

            <p className="mx-auto fs-6 text-theme-secondary" style={{ maxWidth: '580px', fontWeight: 500 }}>
              AWebGrow is a leading <strong>web development company in India</strong> offering 
              custom website development, mobile app development, SEO services, UI/UX design, 
              and enterprise software solutions.
            </p>
          </header>

          {/* Services Grid */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 justify-content-center" role="list">
            {webGrowServices.map((service, index) => (
              <div 
                className="col d-flex" 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 60}
              >
                <article 
                  className="w-100 d-flex flex-column position-relative rounded-4 border p-4"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(service)}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: hoveredCard === index ? service.iconColor : 'var(--border-subtle)',
                    boxShadow: hoveredCard === index 
                      ? `0 20px 50px ${service.iconColor}25` 
                      : '0 10px 30px var(--shadow-color)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                    cursor: 'pointer',
                    minHeight: '360px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="card-content position-relative z-2 h-100 d-flex flex-column">
                    
                    {/* Icon */}
                    <div 
                      className="d-flex align-items-center justify-content-center mb-4 text-white fs-3 rounded-3"
                      style={{
                        width: '56px',
                        height: '56px',
                        background: service.gradient,
                        boxShadow: `0 0 20px ${service.iconColor}50`
                      }}
                    >
                      <i className={service.iconClass}></i>
                    </div>

                    {/* Tag Badge & Title */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h3 className="fw-black mb-0 text-theme-primary fs-5" style={{ fontWeight: 800 }}>
                        {service.title}
                      </h3>
                      <span 
                        className="badge rounded-pill px-2.5 py-1 fw-bold text-white"
                        style={{
                          fontSize: '0.62rem',
                          background: service.gradient
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="mb-3 text-theme-secondary small lh-base" style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="list-unstyled p-0 m-0 mb-4 d-flex flex-column gap-1.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="d-flex align-items-center gap-2 small" style={{ fontSize: '0.8rem' }}>
                          <i className="bi bi-patch-check-fill" style={{ color: service.iconColor }}></i>
                          <span className="text-theme-secondary" style={{ fontWeight: 500 }}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Link */}
                    <div className="mt-auto pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span 
                        className="d-inline-flex align-items-center gap-2 fw-bold small"
                        style={{ color: service.iconColor }}
                      >
                        Learn More
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </div>

                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <footer className="text-center mt-5">
            <Link 
              href="/contact" 
              className="btn-neon-cta py-3 px-5 fs-6"
            >
              <span>Get Started Today</span>
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </footer>

        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <dialog 
          className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            border: 'none'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="p-4 position-relative border rounded-4 text-theme-primary"
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
              boxShadow: `0 20px 60px ${selectedService.iconColor}30`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="position-absolute top-0 end-0 m-3 border-0 rounded-circle text-theme-secondary d-flex align-items-center justify-content-center"
              style={{ width: '32px', height: '32px', backgroundColor: 'var(--bg-pill)' }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="text-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3 text-white fs-2"
                style={{
                  width: '64px',
                  height: '64px',
                  background: selectedService.gradient,
                  boxShadow: `0 0 20px ${selectedService.iconColor}50`
                }}
              >
                <i className={selectedService.iconClass}></i>
              </div>
              <h3 className="fw-black mb-1 h4 text-theme-primary" style={{ fontWeight: 800 }}>
                {selectedService.title}
              </h3>
            </div>

            <p className="mb-4 text-theme-secondary small lh-base" style={{ fontWeight: 500 }}>
              {selectedService.description}
            </p>

            <h4 className="fw-bold mb-3 fs-6 text-theme-primary">
              Key Features
            </h4>
            <ul className="list-unstyled mb-4 p-0">
              {selectedService.features.map((feature: string, idx: number) => (
                <li key={idx} className="d-flex align-items-center gap-2 mb-2 text-theme-secondary small" style={{ fontWeight: 500 }}>
                  <i className="bi bi-patch-check-fill" style={{ color: selectedService.iconColor }}></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/contact" 
              className="btn w-100 rounded-pill py-2.5 fw-black text-white text-center border-0"
              style={{
                background: selectedService.gradient,
                boxShadow: `0 4px 15px ${selectedService.iconColor}40`
              }}
              onClick={() => setIsModalOpen(false)}
            >
              Get This Service
            </Link>
          </div>
        </dialog>
      )}
    </>
  );
}