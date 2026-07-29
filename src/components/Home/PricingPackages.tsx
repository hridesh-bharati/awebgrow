'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export const websitePackagesData = [
  {
    id: "real-estate",
    title: "Real Estate",
    subTitle: "Website Development",
    icon: "bi-house-door-fill",
    gradient: "linear-gradient(135deg, #0284c7, #0ea5e9, #38bdf8)",
    color: "#0ea5e9",
    startingPrice: "13,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹13,999", features: ["5 Pages Website", "Property Listing", "WhatsApp Integration", "Mobile Friendly"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["10 Pages", "Property Gallery", "Lead Forms", "Google Map Integration"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Unlimited Listings", "Advanced Search Filters", "SEO Setup", "Blog Section"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["CRM Integration", "Agent Profiles", "Property Inquiry System"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Custom Design", "Lead Tracking Dashboard", "Performance Optimization"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Multi-Agent Portal", "Advanced Automation", "Premium SEO Structure"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Fully Custom Real Estate Platform", "Mobile App Integration", "AI Property Recommendations"], popular: false }
    ]
  },
  {
    id: "dental-clinic",
    title: "Dental Clinic",
    subTitle: "Website Development",
    icon: "bi-heart-pulse-fill",
    gradient: "linear-gradient(135deg, #0284c7, #2563eb, #3b82f6)",
    color: "#2563eb",
    startingPrice: "13,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹13,999", features: ["5 Pages Website", "Treatment Details", "WhatsApp Button"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["Appointment Form", "Doctor Profile", "Gallery Section"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Online Appointment Booking", "Testimonials", "SEO Setup"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["Multiple Doctor Profiles", "Before/After Gallery", "Blog System"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Patient Inquiry Management", "Google Reviews Integration"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Advanced Booking System", "Marketing Landing Pages"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Multi-Branch Clinic Website", "Patient Portal", "Advanced Automation"], popular: false }
    ]
  },
  {
    id: "ca-firm",
    title: "CA Firm",
    subTitle: "Website Development",
    icon: "bi-calculator-fill",
    gradient: "linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa)",
    color: "#3b82f6",
    startingPrice: "13,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹13,999", features: ["Professional Website", "Service Pages", "Contact Forms"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["GST & Tax Service Pages", "Lead Capture Forms"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Client Portal", "Document Upload Feature"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["Tax Calculator Tools", "SEO Optimization"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Secure Client Dashboard", "Blog & Resources"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Multi-User Access", "CRM Integration"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Complete Financial Service Platform", "Automation & Custom Modules"], popular: false }
    ]
  },
  {
    id: "restaurant",
    title: "Restaurant",
    subTitle: "Website Development",
    icon: "bi-egg-fried",
    gradient: "linear-gradient(135deg, #0369a1, #0284c7, #38bdf8)",
    color: "#0284c7",
    startingPrice: "14,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹14,999", features: ["Menu Display", "Contact & Location"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["Online Reservation Form", "Food Gallery"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Online Ordering System", "WhatsApp Orders"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["Table Booking System", "Customer Reviews"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Loyalty Program", "Advanced Menu Management"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Multi-Location Support", "CRM Integration"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Complete Restaurant Management Platform", "Mobile App Integration", "Custom Ordering System"], popular: false }
    ]
  },
  {
    id: "law-firm",
    title: "Law Firm",
    subTitle: "Website Development",
    icon: "bi-book",
    gradient: "linear-gradient(135deg, #1d4ed8, #2563eb, #60a5fa)",
    color: "#2563eb",
    startingPrice: "13,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹13,999", features: ["5 Pages Website", "Practice Areas", "Contact Forms"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["Attorney Profiles", "Case Studies", "Testimonials"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Client Portal", "Document Management", "SEO Setup"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["Legal Blog System", "Newsletter Integration", "Advanced Analytics"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Multi-Practice Areas", "Appointment Scheduling", "CRM Integration"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Multi-Office Support", "Case Management System"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Complete Legal Platform", "Client Communication Portal", "Custom Modules"], popular: false }
    ]
  },
  {
    id: "travel-agency",
    title: "Travel Agency",
    subTitle: "Website Development",
    icon: "bi-airplane-fill",
    gradient: "linear-gradient(135deg, #0f766e, #0284c7, #38bdf8)",
    color: "#0284c7",
    startingPrice: "14,999",
    plans: [
      { id: "01", type: "STARTER", price: "₹14,999", features: ["5 Pages Website", "Tour Packages", "Contact Forms"], popular: false },
      { id: "02", type: "GROWTH", price: "₹24,999", features: ["Destination Gallery", "Itinerary Builder", "Inquiry System"], popular: false },
      { id: "03", type: "PROFESSIONAL", price: "₹39,999", features: ["Online Booking", "Payment Gateway", "SEO Setup"], popular: true },
      { id: "04", type: "PREMIUM", price: "₹54,999", features: ["Multi-Language Support", "Customer Reviews", "Blog System"], popular: false },
      { id: "05", type: "BUSINESS", price: "₹74,999", features: ["Advanced Booking Engine", "Traveler Dashboard", "Email Automation"], popular: false },
      { id: "06", type: "ENTERPRISE", price: "₹99,999", features: ["Multi-Destination Support", "CRM Integration", "Analytics Dashboard"], popular: false },
      { id: "07", type: "ELITE", price: "₹1,49,999+", features: ["Complete Travel Platform", "Mobile App Integration", "AI Recommendations"], popular: false }
    ]
  }
];

// Water Ripple Component for each card
const WaterRippleEffect = ({ color, isHovered, isVisible }: { color: string; isHovered: boolean; isVisible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const ripplesRef = useRef<any[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      width = canvas.width;
      height = canvas.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create initial ripples
    const createRipple = () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = 10 + Math.random() * 30;
      const speed = 0.5 + Math.random() * 1;
      const opacity = 0.08 + Math.random() * 0.12;
      const phase = Math.random() * Math.PI * 2;
      
      return {
        x,
        y,
        radius,
        maxRadius: radius + 60 + Math.random() * 100,
        speed,
        opacity,
        phase,
        alive: true,
        age: 0,
        maxAge: 200 + Math.random() * 300
      };
    };

    // Initialize with some ripples
    for (let i = 0; i < 5; i++) {
      ripplesRef.current.push(createRipple());
    }

    const drawRipple = (ripple: any) => {
      const progress = ripple.age / ripple.maxAge;
      const currentRadius = ripple.radius + (ripple.maxRadius - ripple.radius) * progress;
      const currentOpacity = ripple.opacity * (1 - progress) * (isHovered ? 1.3 : 0.8);
      
      // Main circle
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = currentOpacity * 0.4;
      ctx.lineWidth = 1 + (1 - progress) * 1.5;
      ctx.stroke();

      // Inner glow circle
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = currentOpacity * 0.2;
      ctx.lineWidth = 0.5 + (1 - progress) * 0.8;
      ctx.stroke();

      // Outer glow
      const gradient = ctx.createRadialGradient(
        ripple.x, ripple.y, 0,
        ripple.x, ripple.y, currentRadius
      );
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(0.5, `${color}0A`);
      gradient.addColorStop(1, `${color}00`);
      
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.8;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      timeRef.current += 1;

      ripplesRef.current.forEach((ripple) => {
        ripple.age += 1;
        if (ripple.age > ripple.maxAge) {
          ripple.alive = false;
        }
      });

      ripplesRef.current = ripplesRef.current.filter(r => r.alive);
      
      if (Math.random() < 0.015 || (isHovered && Math.random() < 0.03)) {
        ripplesRef.current.push(createRipple());
      }

      while (ripplesRef.current.length < 3) {
        ripplesRef.current.push(createRipple());
      }

      ripplesRef.current.forEach(drawRipple);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }}
    />
  );
};

// Card Component with Soft Blue Water Effect
const PlanCard = ({ category, plan, planKey, isHovered, setHoveredPlan, catIndex, planIndex }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100 + (catIndex * 100) + (planIndex * 50));
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [catIndex, planIndex]);

  const isPlanHovered = isHovered === planKey;

  return (
    <div 
      ref={cardRef}
      className="col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl"
    >
      <div 
        className="h-100 d-flex flex-column position-relative p-4 rounded-4 border overflow-hidden"
        onMouseEnter={() => setHoveredPlan(planKey)}
        onMouseLeave={() => setHoveredPlan(null)}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: plan.popular ? category.color : 'var(--border-subtle)',
          boxShadow: isPlanHovered ? `0 15px 35px rgba(2, 132, 199, 0.15)` : '0 4px 12px var(--shadow-color)',
          transform: isPlanHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: isPlanHovered ? 2 : 1,
        }}
      >
        {/* Subtle Water Ripple Effect */}
        <WaterRippleEffect 
          color={category.color} 
          isHovered={isPlanHovered}
          isVisible={isVisible}
        />

        {/* Card Starting Animation - Circle Effect (Fixing React Shorthand/Longhand Style Conflict) */}
        <div 
          className="position-absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            background: category.gradient,
            transform: 'translate(-50%, -50%)',
            opacity: isVisible ? 0 : 0.4,
            animationName: isVisible ? 'cardReveal' : 'none',
            animationDuration: '0.8s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            animationDelay: `${(catIndex * 100) + (planIndex * 50)}ms`,
          }}
        />

        {/* POPULAR BADGE */}
        {plan.popular && (
          <div 
            className="position-absolute top-0 end-0 px-3 py-1 fw-black text-white shadow-sm" 
            style={{ 
              background: category.gradient, 
              borderRadius: '0 14px 0 14px', 
              fontSize: '0.62rem', 
              letterSpacing: '0.06em',
              fontWeight: 900,
              zIndex: 3,
              animationName: 'pulseBadge',
              animationDuration: '2.5s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          >
            ★ POPULAR CHOICE
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3 position-relative" style={{ zIndex: 2 }}>
          <span className="badge rounded-circle d-flex align-items-center justify-content-center text-white fw-black" style={{ background: category.gradient, width: '28px', height: '28px', fontSize: '0.7rem', fontWeight: 900 }}>
            {plan.id}
          </span>
          <span className="fs-5 fw-black" style={{ color: category.color, fontWeight: 900 }}>
            {plan.price}
          </span>
        </div>

        <h4 className="fw-black text-theme-primary mb-3 position-relative" style={{ fontSize: '0.98rem', fontWeight: 900, zIndex: 2 }}>
          {plan.type}
        </h4>

        {/* FEATURES LIST */}
        <ul className="list-unstyled mb-4 flex-grow-1 position-relative" style={{ zIndex: 2 }}>
          {plan.features.map((feature: string, fIdx: number) => (
            <li 
              key={fIdx} 
              className="d-flex align-items-start gap-2 mb-2"
              style={{ 
                fontSize: '0.82rem', 
                lineHeight: '1.45',
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.4s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${(catIndex * 100) + (planIndex * 50) + (fIdx * 50)}ms`,
                opacity: 0
              }}
            >
              <i className="bi bi-patch-check-fill mt-0.5 flex-shrink-0" style={{ color: category.color, fontSize: '0.85rem' }}></i>
              <span className="text-theme-secondary fw-semibold" style={{ color: 'var(--text-primary, #334155)' }}>{feature}</span>
            </li>
          ))}
        </ul>

        {/* ACTION BUTTON */}
        <Link
          href={`/booking?title=${encodeURIComponent(category.title)}&type=${encodeURIComponent(plan.type)}&price=${encodeURIComponent(plan.price)}&features=${encodeURIComponent(plan.features.join(','))}&icon=${encodeURIComponent(category.icon)}&gradient=${encodeURIComponent(category.gradient)}`}
          className="btn w-100 rounded-pill py-2.5 fw-black text-white text-center border-0 d-flex align-items-center justify-content-center gap-2 mt-auto position-relative overflow-hidden shadow-sm"
          style={{ 
            background: isPlanHovered ? '#0f172a' : category.gradient, 
            fontSize: '0.82rem',
            fontWeight: 800,
            transition: 'all 0.3s ease',
            zIndex: 2,
          }}
        >
          <span>Choose Blueprint</span>
          <i className="bi bi-arrow-right" style={{ fontSize: '0.8rem', transition: 'transform 0.3s ease' }}></i>
        </Link>

        {/* BOTTOM GLOW LINE */}
        <div 
          className="position-absolute bottom-0 start-0 rounded-bottom"
          style={{
            height: '3px',
            width: isPlanHovered ? '100%' : '0%',
            background: category.gradient,
            transition: 'width 0.4s ease',
            borderRadius: '0 0 4px 4px',
            zIndex: 2
          }}
        />

        {/* Card border glow on hover */}
        {isPlanHovered && (
          <div 
            className="position-absolute pointer-events-none"
            style={{
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              borderRadius: 'inherit',
              padding: '2px',
              background: `conic-gradient(from var(--angle, 0deg), ${category.color}22, ${category.color}88, ${category.color}22, transparent, ${category.color}22)`,
              animationName: 'borderRotate',
              animationDuration: '2s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'source-out',
              zIndex: 0
            }}
          />
        )}
      </div>
    </div>
  );
};

export default function PricingPackages() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="w-100 min-vh-100 py-5 px-0 position-relative overflow-hidden bg-theme-main border-top" id="pricingpackages" style={{ borderColor: 'var(--border-subtle)' }}>
      
      {/* SOFT BLUE AMBIENT BACKGROUND GLOW */}
      <div 
        className="position-absolute top-0 start-0 rounded-circle pointer-events-none" 
        style={{
          width: '700px', 
          height: '700px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(2, 132, 199, 0) 70%)',
          transform: 'translate(-25%, -25%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="container-fluid p-0 position-relative z-1" style={{ maxWidth: '1920px' }}>

        {/* MASTER TOP HEADER */}
        <div className="text-center mb-5 px-3">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(14, 165, 233, 0.08)',
              border: '1.5px solid rgba(14, 165, 233, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(14, 165, 233, 0.12)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#0ea5e9', borderRadius: '50%', boxShadow: '0 0 10px #0ea5e9, 0 0 20px #0ea5e9' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#0284c7', fontWeight: 800 }}>
              💎 PRICING PLANS
            </span>
          </div>

          <h1 
            className="display-4 fw-black mb-3 text-theme-primary"
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Professional <span style={{ color: '#0ea5e9', fontWeight: 900, filter: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.25))' }}>Website Packages</span>
          </h1>

          <p className="text-theme-secondary mx-auto fs-5" style={{ maxWidth: '520px', fontWeight: 500 }}>
            7 Powerful Packages • Starting From <span className="fw-black text-theme-primary" style={{ fontWeight: 900, color: '#0284c7' }}>₹13,999</span>
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="row g-5 m-0 w-100">
          {websitePackagesData.map((category, catIndex) => (
            <div key={catIndex} className="col-12 px-0 px-md-3">
              
              {/* CATEGORY CONTAINER */}
              <div 
                className="position-relative overflow-hidden p-4 p-md-5 rounded-4 border"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '0 8px 24px var(--shadow-color)',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* ANIMATED BACKGROUND ORB */}
                <div 
                  className="position-absolute rounded-circle pointer-events-none"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: category.gradient,
                    opacity: '0.02',
                    top: '-100px',
                    right: '-100px',
                    filter: 'blur(80px)',
                    animationName: 'floatingOrb',
                    animationDuration: '8s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    transform: 'translate(0, 0)'
                  }}
                />

                {/* CATEGORY HEADER */}
                <div className="d-flex align-items-center flex-wrap gap-3 mb-4 pb-3 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3 shadow-sm text-white fs-4 flex-shrink-0"
                    style={{ width: '52px', height: '52px', background: category.gradient }}
                  >
                    <i className={`bi ${category.icon}`}></i>
                  </div>
                  <div>
                    <h2 className="fw-black mb-0 text-theme-primary" style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                      {category.title}
                    </h2>
                    <span className="text-theme-secondary d-none d-lg-flex fw-bold mt-0.5" style={{ fontSize: '0.78rem', opacity: 0.85 }}>
                      {category.subTitle} Baseline Architecture
                    </span>
                  </div>
                  <div className="ms-sm-auto mt-2 mt-sm-0">
                    <span className="badge rounded-pill px-3.5 py-2 fw-black text-white shadow-sm" style={{ background: category.gradient, fontSize: '0.8rem', fontWeight: 800 }}>
                      Starting ₹{category.startingPrice}
                    </span>
                  </div>
                </div>

                {/* PLANS ROW */}
                <div className="row g-3 position-relative">
                  {category.plans.map((plan, planIndex) => {
                    const planKey = `${catIndex}-${planIndex}`;
                    return (
                      <PlanCard
                        key={planIndex}
                        category={category}
                        plan={plan}
                        planKey={planKey}
                        isHovered={hoveredPlan}
                        setHoveredPlan={setHoveredPlan}
                        catIndex={catIndex}
                        planIndex={planIndex}
                      />
                    );
                  })}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* STYLES FOR ANIMATIONS */}
      <style jsx>{`
        @keyframes floatingOrb {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-10px, 15px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes cardReveal {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.3;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes borderRotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        @keyframes pulseBadge {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes borderRotateFallback {
          from { filter: hue-rotate(0deg); }
          to { filter: hue-rotate(360deg); }
        }
        .border-animation-fallback {
          animation: borderRotateFallback 2s linear infinite;
        }
      ` }} />

    </div>
  );
}