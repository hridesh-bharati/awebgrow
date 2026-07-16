'use client';

import React, { useState, useEffect } from "react";
import {
  FaCode,
  FaMobileAlt,
  FaSearch,
  FaShieldAlt,
  FaCloud,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

// ─── Enhanced Main Services ────────────────────────────────────────────────
const mainServices = [
  {
    icon: <FaCode />,
    title: "Enterprise Web Development",
    desc: "Custom web applications with modern frameworks and technologies.",
    longDesc: "We build high-performance, scalable web solutions using cutting-edge technologies like Next.js, React, and Node.js. Our development process follows industry best practices including CI/CD, automated testing, and code reviews.",
    color: "#4f46e5",
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    lightGradient: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    iconBg: "#4f46e5",
    features: ["Full-Stack Development", "API Integration", "Microservices", "Performance Optimization"],
    technologies: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile UX Architecture",
    desc: "Responsive designs that work perfectly on all devices.",
    longDesc: "Our mobile-first design approach ensures seamless user experiences across all devices. We create pixel-perfect, responsive interfaces with smooth animations and intuitive navigation patterns.",
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2, #06b6d4)",
    lightGradient: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)",
    iconBg: "#0891b2",
    features: ["Responsive Design", "PWA Development", "Cross-Platform", "Touch-Optimized"],
    technologies: ["Tailwind CSS", "Figma", "React Native", "Material"],
  },
  {
    icon: <FaSearch />,
    title: "Technical SEO Optimization",
    desc: "Advanced SEO strategies to improve your search rankings.",
    longDesc: "Our comprehensive SEO strategies combine technical optimization, content marketing, and data analytics to dramatically improve your search visibility. We implement schema markup and optimize Core Web Vitals.",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669, #10b981)",
    lightGradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    iconBg: "#059669",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
    technologies: ["Search Console", "SEMrush", "Ahrefs", "Schema.org"],
  },
  {
    icon: <FaShieldAlt />,
    title: "Cyber Security Solutions",
    desc: "Enterprise-grade security for your web applications.",
    longDesc: "We implement comprehensive security architectures including zero-trust frameworks, advanced encryption protocols, and continuous threat monitoring to protect your data and infrastructure.",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
    lightGradient: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
    iconBg: "#7c3aed",
    features: ["Penetration Testing", "Security Audits", "Compliance", "Incident Response"],
    technologies: ["OAuth2", "JWT", "AWS WAF", "Cloudflare"],
  },
  {
    icon: <FaCloud />,
    title: "Cloud Devops & Infrastructure",
    desc: "Scalable cloud infrastructure and deployment solutions.",
    longDesc: "We architect and manage cloud infrastructure that scales with your business. Our cloud services include automated deployment pipelines, load balancing, auto-scaling, and disaster recovery strategies.",
    color: "#2563eb",
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
    lightGradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    iconBg: "#2563eb",
    features: ["Cloud Migration", "Infrastructure as Code", "Container Orchestration", "Cost Optimization"],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
  },
  {
    icon: <FaRobot />,
    title: "AI Integration & Automation",
    desc: "AI-powered features for your business processes.",
    longDesc: "Transform your business with intelligent automation and machine learning solutions. We integrate cutting-edge AI capabilities including natural language processing, predictive analytics, and conversational AI.",
    color: "#dc2626",
    gradient: "linear-gradient(135deg, #dc2626, #ef4444)",
    lightGradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
    iconBg: "#dc2626",
    features: ["LLM Integration", "Predictive Analytics", "Process Automation", "Computer Vision"],
    technologies: ["OpenAI API", "LangChain", "TensorFlow", "PyTorch"],
  },
];

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechVision Inc.",
    content: "WebGrow transformed our digital presence completely. Our traffic increased by 300% within three months, and the new platform handles millions of requests daily.",
    rating: 5,
    avatar: "SJ",
    color: "#4f46e5",
  },
  {
    name: "Michael Chen",
    role: "CTO, DataSphere Solutions",
    content: "The AI integration they implemented revolutionized our customer service. We've reduced response times by 70% and increased customer satisfaction scores dramatically.",
    rating: 5,
    avatar: "MC",
    color: "#0891b2",
  },
  {
    name: "Emily Rodriguez",
    role: "VP Marketing, GrowthLabs",
    content: "Their SEO strategies are pure genius. We're now ranking #1 for over 200 keywords in our industry, and organic lead generation has doubled quarter over quarter.",
    rating: 5,
    avatar: "ER",
    color: "#059669",
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "50+", label: "Projects Delivered", icon: "bi-code-slash", gradient: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", shadow: "rgba(79, 70, 229, 0.25)" },
  { value: "98%", label: "Client Retention", icon: "bi-star-fill", gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)", shadow: "rgba(8, 145, 178, 0.25)" },
  { value: "5K+", label: "Users Served", icon: "bi-cloud-check-fill", gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)", shadow: "rgba(5, 150, 105, 0.25)" },
  { value: "24/7", label: "Support Available", icon: "bi-check-circle-fill", gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", shadow: "rgba(124, 58, 237, 0.25)" },
];
// ─── Pricing Tiers ─────────────────────────────────────────────────────────
const pricingTiers = [
  {
    name: "Starter",
    price: "₹13,999",
    period: "one-time",
    features: [
      "5 Pages Website",
      "Responsive Design",
      "Basic SEO Setup",
      "WhatsApp Integration",
      "1 Month Support",
    ],
    popular: false,
    color: "#4f46e5",
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  },
  {
    name: "Professional",
    price: "₹39,999",
    period: "one-time",
    features: [
      "10 Pages Website",
      "Advanced SEO Setup",
      "Security Implementation",
      "3 Months Support",
      "Performance Optimization",
      "Blog System",
    ],
    popular: true,
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "quote-based",
    features: [
      "Custom Solutions",
      "AI Integration",
      "Dedicated Team",
      "24/7 Premium Support",
      "Infrastructure Management",
      "Strategic Consulting",
    ],
    popular: false,
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2, #06b6d4)",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────
export default function WebGrowApp() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      mirror: false,
      offset: 50,
    });

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      AOS.refresh();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      AOS.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="webgrow-app" style={{
      background: '#f0f4ff',
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      
      {/* ─── HERO SECTION ─── */}
      <section className="hero-section position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 40%, #f0f4ff 100%)',
        padding: '100px 0 80px',
        borderBottom: '1px solid rgba(79, 70, 229, 0.08)'
      }}>
        
        <div className="position-absolute rounded-circle" style={{
          top: '-100px',
          right: '-50px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />
        <div className="position-absolute rounded-circle" style={{
          bottom: '-80px',
          left: '-50px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        <div className="container position-relative" style={{ zIndex: 10 }}>
          <div className="text-center">
            
            <span 
              className="badge px-4 py-2 rounded-pill mb-4 fw-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(124, 58, 237, 0.08))',
                color: '#4f46e5',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                border: '1px solid rgba(79, 70, 229, 0.15)'
              }}
              data-aos="fade-down"
            >
              ⚡ WebGrow · Digital Platform 2026
            </span>

            <h1 
              className="display-4 fw-bold mb-3"
              style={{
                letterSpacing: '-0.03em',
                color: '#0f172a'
              }}
              data-aos="fade-up"
            >
              <span style={{ 
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>WebGrow</span> Services
            </h1>

            <h2 
              className="h3 fw-semibold mb-4"
              style={{ color: '#334155', letterSpacing: '-0.02em' }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Modern Web Service · Digital Trust
            </h2>

            <p 
              className="mx-auto fs-5 mb-5"
              style={{ maxWidth: '680px', lineHeight: '1.8', color: '#475569' }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Enterprise-grade solutions built with modern design, zero‑trust security, and AI‑ready infrastructure.
            </p>

          {/* ─── Stats Grid View ─── */}
<div className="row g-3 g-md-4 justify-content-center mb-5 px-2">
  {stats.map((stat, idx) => (
    <div className="col-6 col-md-3" key={idx} data-aos="zoom-in" data-aos-delay={100 + idx * 100}>
      <div 
        className="position-relative overflow-hidden p-3 p-sm-4 h-100 d-flex flex-column align-items-center justify-content-center text-center custom-stat-card"
        style={{
          borderRadius: '24px',
          background: stat.gradient,
          boxShadow: `0 8px 32px ${stat.shadow}`,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
          e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = `0 8px 32px ${stat.shadow}`;
        }}
      >
        {/* Ambient Top Glow / Radial Shimmer Design inside card */}
        <div className="position-absolute top-0 start-50 translate-middle rounded-circle" style={{
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        {/* Floating Top Icon Badge */}
        <div 
          className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle mb-2"
          style={{ 
            width: '46px', 
            height: '46px', 
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.2)'
          }}
        >
          <i className={`bi ${stat.icon} text-white`} style={{ fontSize: '1.25rem' }}></i>
        </div>

        {/* Main Counters */}
        <div className="h2 fw-extrabold text-white mb-0 mt-1 custom-stat-val" style={{ letterSpacing: '-0.5px' }}>
          {stat.value}
        </div>
        
        {/* Secondary Labels */}
        <div className="text-white text-opacity-85 small fw-medium mt-1 px-1 custom-stat-lbl" style={{ fontSize: '0.72rem', lineHeight: '1.2' }}>
          {stat.label}
        </div>
      </div>
    </div>
  ))}

  {/* Styles Override for Mobile Typography & Native Look */}
  <style jsx>{`
    .fw-extrabold { font-weight: 800; }
    .custom-stat-val { font-size: 1.85rem; }
    @media (max-width: 576px) {
      .custom-stat-card {
        padding: 20px 10px !important;
        borderRadius: '20px' !important;
      }
      .custom-stat-val {
        font-size: 1.4rem !important;
      }
      .custom-stat-lbl {
        font-size: 0.65rem !important;
      }
    }
  `}</style>
</div>

            {/* CTA Buttons */}
            <div 
              className="d-flex flex-wrap gap-3 justify-content-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <a href="#services" className="btn px-5 py-3 rounded-pill fw-semibold text-white position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                border: 'none',
                boxShadow: '0 8px 32px rgba(79, 70, 229, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(79, 70, 229, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(79, 70, 229, 0.3)';
              }}>
                Explore Services 
                <FaArrowRight className="ms-2" style={{ fontSize: '0.9rem' }} />
              </a>
              
              <a href="#pricing" className="btn px-5 py-3 rounded-pill fw-semibold" style={{
                background: 'white',
                border: '2px solid rgba(79, 70, 229, 0.15)',
                color: '#4f46e5',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#f8faff';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.3)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = 'rgba(79, 70, 229, 0.15)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
              }}>
                <span className="me-2">💰</span>Our Pricing
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SERVICES SECTION ─── */}
      <section id="services" className="py-5 position-relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)'
      }}>
        
        <div className="position-absolute rounded-circle" style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.04) 0%, transparent 70%)',
          top: '-20%', left: '-10%', filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div className="position-absolute rounded-circle" style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.03) 0%, transparent 70%)',
          bottom: '-10%', right: '-5%', filter: 'blur(60px)', pointerEvents: 'none'
        }} />

        <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
          
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge px-4 py-2 rounded-pill fw-bold mb-3" style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.06))',
              color: '#4f46e5',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              border: '1px solid rgba(79, 70, 229, 0.08)'
            }}>
              ✨ PREMIUM SERVICES
            </span>
            <h2 className="display-5 fw-bold mb-2" style={{ color: '#0f172a' }}>
              Built for <span style={{ 
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Scale</span>, designed for <span style={{ 
                background: 'linear-gradient(135deg, #0891b2, #059669)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Trust</span>
            </h2>
            <p className="mx-auto fs-6 text-secondary" style={{ maxWidth: '550px' }}>
              Blazing fast performance backed by premium interfaces and cutting-edge technology.
            </p>
          </div>

          <div className="row g-4"> 
            {mainServices.map((service, idx) => {
              const colors = ['#4f46e5', '#0891b2', '#059669', '#7c3aed', '#2563eb', '#dc2626'];
              const color = colors[idx % colors.length];

              return (
                <div 
                  className="col-md-6 col-lg-4" 
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={100 + (idx % 3) * 100}
                >
                  <div 
                    className="card h-100 border-0 service-card"
                    style={{
                      borderRadius: '24px',
                      background: `linear-gradient(135deg, ${color}06, ${color}02)`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${color}15`,
                      boxShadow: `0 8px 32px ${color}08`,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 24px 60px ${color}20, 0 0 0 1px ${color}20`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${color}10, ${color}04)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 32px ${color}08`;
                      e.currentTarget.style.background = `linear-gradient(135deg, ${color}06, ${color}02)`;
                    }}
                  >
                    {/* Gradient Border Effect */}
                    <div className="position-absolute" style={{
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: service.gradient,
                      borderRadius: '24px 24px 0 0'
                    }} />

                    <div className="position-absolute rounded-circle" style={{
                      width: '200px', height: '200px',
                      background: color,
                      top: '-60px', right: '-60px', 
                      opacity: '0.05', filter: 'blur(40px)'
                    }} />

                    <div className="card-body p-4 d-flex flex-column h-100 position-relative">
                      
                      {/* Icon with Gradient Background */}
                      <div 
                        className="mb-4 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '18px',
                          background: service.gradient,
                          color: 'white',
                          fontSize: '26px',
                          boxShadow: `0 8px 30px ${color}30`,
                          transition: 'all 0.4s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1) rotate(-6deg)';
                          e.currentTarget.style.boxShadow = `0 12px 40px ${color}50`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                          e.currentTarget.style.boxShadow = `0 8px 30px ${color}30`;
                        }}
                      >
                        {service.icon}
                      </div>

                      <h3 className="h5 fw-bold mb-2" style={{ color: '#0f172a' }}>
                        {service.title}
                      </h3>
                      
                      <p className="small mb-4 flex-grow-1" style={{ lineHeight: '1.7', color: '#475569' }}>
                        {service.longDesc}
                      </p>

                      {/* Features Tags */}
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {service.features.slice(0, 3).map((feature, fi) => (
                          <span key={fi} className="px-2.5 py-1 fw-medium" style={{ 
                            fontSize: '0.7rem', 
                            borderRadius: '8px', 
                            background: `${color}10`,
                            color: color,
                            border: `1px solid ${color}10`
                          }}>
                            {feature}
                          </span>
                        ))}
                        {service.features.length > 3 && (
                          <span className="px-2 py-1 align-self-center text-secondary" style={{ fontSize: '0.7rem' }}>
                            +{service.features.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="d-flex flex-wrap gap-1 p-2 mt-auto" style={{ 
                        background: 'rgba(255,255,255,0.5)', 
                        borderRadius: '12px',
                        border: `1px solid ${color}08`
                      }}>
                        {service.technologies.map((tech, ti) => (
                          <span key={ti} className="badge px-2 py-1 fw-medium" style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: '600', 
                            borderRadius: '6px',
                            background: 'white',
                            color: '#475569',
                            border: '1px solid rgba(0,0,0,0.04)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-5" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8faff 100%)' }}>
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="badge px-4 py-2 rounded-pill fw-bold mb-3" style={{
              background: 'rgba(79, 70, 229, 0.06)',
              color: '#4f46e5',
              fontSize: '0.75rem',
              letterSpacing: '0.05em'
            }}>
              💎 PRICING PLANS
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#0f172a' }}>
              Choose Your <span style={{ 
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Plan</span>
            </h2>
            <p className="text-secondary mx-auto fs-6" style={{ maxWidth: '550px' }}>
              Flexible pricing options designed to fit your budget and requirements
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {pricingTiers.map((tier, idx) => (
              <div className="col-md-4" key={idx} data-aos="flip-up" data-aos-delay={100 + idx * 150}>
                <div className="card h-100 border-0 p-4 text-center position-relative overflow-hidden" style={{
                  borderRadius: '28px',
                  background: tier.popular 
                    ? `linear-gradient(135deg, ${tier.color}06, ${tier.color}02)`
                    : 'white',
                  boxShadow: tier.popular 
                    ? `0 8px 40px ${tier.color}20`
                    : '0 4px 20px rgba(0,0,0,0.04)',
                  border: tier.popular 
                    ? `2px solid ${tier.color}30`
                    : '1px solid rgba(0,0,0,0.04)',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = tier.popular 
                    ? `0 20px 60px ${tier.color}30`
                    : '0 12px 40px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = tier.popular 
                    ? `0 8px 40px ${tier.color}20`
                    : '0 4px 20px rgba(0,0,0,0.04)';
                }}>
                  {tier.popular && (
                    <div className="position-absolute top-0 start-50 translate-middle-x px-3 py-1 rounded-pill fw-bold text-white" style={{
                      background: tier.gradient,
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                      boxShadow: `0 4px 16px ${tier.color}30`
                    }}>
                      ⭐ POPULAR
                    </div>
                  )}

                  <div className="position-absolute" style={{
                    top: '-80px',
                    right: '-80px',
                    width: '200px',
                    height: '200px',
                    background: tier.color,
                    opacity: tier.popular ? '0.05' : '0.02',
                    borderRadius: '50%'
                  }} />

                  <div className="mb-3 position-relative">
                    <div className="fw-bold" style={{ 
                      color: tier.color, 
                      fontSize: '1.1rem',
                      background: tier.popular ? tier.gradient : 'none',
                      WebkitBackgroundClip: tier.popular ? 'text' : 'none',
                      WebkitTextFillColor: tier.popular ? 'transparent' : 'inherit'
                    }}>
                      {tier.name}
                    </div>
                  </div>

                  <div className="mb-3 position-relative">
                    <span className="display-4 fw-bold" style={{ color: '#0f172a' }}>{tier.price}</span>
                    <span className="text-muted small"> / {tier.period}</span>
                  </div>

                  <ul className="list-unstyled text-start mb-4">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="py-1 d-flex align-items-center gap-2">
                        <FaCheckCircle style={{ color: tier.color, fontSize: '14px', flexShrink: 0 }} />
                        <span className="small" style={{ color: '#475569' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

               <Link href={"/contact"}>
                  <button 
                    className="btn w-100 py-3 rounded-pill fw-semibold text-white position-relative overflow-hidden"
                    style={{
                      background: tier.popular ? tier.gradient : '#a067fc',
                      color: tier.popular ? 'white' : '#0f172a',
                      border: 'none',
                      boxShadow: tier.popular ? `0 8px 30px ${tier.color}30` : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Claim it<FaArrowRight className="ms-2" />
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLES ─── */}
      <style>{`
        .webgrow-app {
          scroll-behavior: smooth;
        }

        .service-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          .display-5 {
            font-size: 1.8rem;
          }
          .hero-section {
            padding: 60px 0 40px;
          }
        }
      `}</style>
    </div>
  );
}