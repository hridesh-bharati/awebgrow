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
    watermark: "🏘️",
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
    watermark: "🦷",
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
    watermark: "📊",
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
    watermark: "🍽️",
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
    watermark: "⚖️",
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
    watermark: "✈️",
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

// Industry Watermark
const IndustryWatermark = ({ symbol, color }: { symbol: string; color: string }) => {
  return (
    <div 
      className="position-absolute pointer-events-none"
      style={{
        fontSize: '100px',
        opacity: 0.04,
        color: color,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-15deg)',
        fontWeight: 900,
        zIndex: 0,
        userSelect: 'none'
      }}
    >
      {symbol}
    </div>
  );
};

// Plan Card Component
const PlanCard = ({ category, plan, planKey, isHovered, setHoveredPlan }: any) => {
  const isPlanHovered = isHovered === planKey;

  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div 
        className="h-100 d-flex flex-column position-relative p-3 rounded-4 border overflow-hidden"
        onMouseEnter={() => setHoveredPlan(planKey)}
        onMouseLeave={() => setHoveredPlan(null)}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: plan.popular ? category.color : 'var(--border-subtle)',
          boxShadow: isPlanHovered ? `0 8px 25px rgba(0,0,0,0.1)` : '0 2px 8px var(--shadow-color)',
          transform: isPlanHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          zIndex: isPlanHovered ? 2 : 1,
          minHeight: '280px'
        }}
      >
        <IndustryWatermark symbol={category.watermark} color={category.color} />

        {plan.popular && (
          <div 
            className="position-absolute top-0 end-0 px-3 py-1 fw-bold text-white shadow-sm" 
            style={{ 
              background: category.gradient, 
              borderRadius: '0 14px 0 14px', 
              fontSize: '0.6rem', 
              letterSpacing: '0.04em',
              zIndex: 3
            }}
          >
            ★ POPULAR
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-2 position-relative" style={{ zIndex: 2 }}>
          <span className="badge rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ background: category.gradient, width: '24px', height: '24px', fontSize: '0.6rem' }}>
            {plan.id}
          </span>
          <span className="fs-6 fw-bold" style={{ color: category.color }}>
            {plan.price}
          </span>
        </div>

        <h4 className="fw-bold text-theme-primary mb-2 position-relative" style={{ fontSize: '0.9rem', zIndex: 2 }}>
          {plan.type}
        </h4>

        <ul className="list-unstyled mb-3 flex-grow-1 position-relative" style={{ zIndex: 2 }}>
          {plan.features.slice(0, 2).map((feature: string, fIdx: number) => (
            <li 
              key={fIdx} 
              className="d-flex align-items-start gap-2 mb-1"
              style={{ fontSize: '0.78rem', lineHeight: '1.3' }}
            >
              <i className="bi bi-check-circle-fill mt-0.5 flex-shrink-0" style={{ color: category.color, fontSize: '0.7rem' }}></i>
              <span className="text-theme-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/booking?title=${encodeURIComponent(category.title)}&type=${encodeURIComponent(plan.type)}&price=${encodeURIComponent(plan.price)}&features=${encodeURIComponent(plan.features.join(','))}&icon=${encodeURIComponent(category.icon)}&gradient=${encodeURIComponent(category.gradient)}`}
          className="btn w-100 rounded-pill py-2 fw-bold text-white text-center border-0 d-flex align-items-center justify-content-center gap-2 mt-auto position-relative shadow-sm"
          style={{ 
            background: isPlanHovered ? '#0f172a' : category.gradient, 
            fontSize: '0.75rem',
            transition: 'all 0.25s ease',
            zIndex: 2,
          }}
        >
          <span>Choose Plan</span>
          <i className="bi bi-arrow-right" style={{ fontSize: '0.7rem', transition: 'transform 0.25s ease' }}></i>
        </Link>

        <div 
          className="position-absolute bottom-0 start-0 rounded-bottom"
          style={{
            height: '2px',
            width: isPlanHovered ? '100%' : '0%',
            background: category.gradient,
            transition: 'width 0.3s ease',
            borderRadius: '0 0 4px 4px',
            zIndex: 2
          }}
        />
      </div>
    </div>
  );
};

// Scroll Down Indicator
const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide when near bottom
      if (scrollY + windowHeight >= documentHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="position-absolute bottom-0 start-50 translate-middle-x pb-2"
      style={{
        zIndex: 10,
        animation: 'bounceDown 2s ease-in-out infinite'
      }}
    >
      <div 
        className="d-flex flex-column align-items-center gap-1"
        style={{ opacity: 0.6 }}
      >
        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500, letterSpacing: '0.05em' }}>
          SCROLL
        </span>
        <i 
          className="bi bi-chevron-down" 
          style={{ 
            fontSize: '1.2rem', 
            color: '#64748b',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
};

// Category Section with Show More/Less
const CategorySection = ({ category, catIndex }: { category: any; catIndex: number }) => {
  const [showAllPlans, setShowAllPlans] = useState(false);
  const initialPlans = 3;
  const visiblePlans = showAllPlans ? category.plans : category.plans.slice(0, initialPlans);
  const hasMorePlans = category.plans.length > initialPlans;

  return (
    <div className="col-12 px-0 px-md-3">
      <div 
        className="position-relative overflow-hidden p-3 p-md-4 rounded-4 border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          boxShadow: '0 4px 16px var(--shadow-color)',
        }}
      >
        {/* Category Header */}
        <div className="d-flex align-items-center flex-wrap gap-3 mb-3 pb-2 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
          <div 
            className="d-flex align-items-center justify-content-center rounded-3 shadow-sm text-white fs-5 flex-shrink-0"
            style={{ width: '42px', height: '42px', background: category.gradient }}
          >
            <i className={`bi ${category.icon}`}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '1.1rem' }}>
              {category.title}
            </h2>
            <span className="text-theme-secondary d-none d-sm-flex" style={{ fontSize: '0.7rem', opacity: 0.7 }}>
              {category.subTitle}
            </span>
          </div>
          <div className="ms-sm-auto mt-1 mt-sm-0">
            <span className="badge rounded-pill px-3 py-1.5 fw-bold text-white shadow-sm" style={{ background: category.gradient, fontSize: '0.7rem' }}>
              Starting ₹{category.startingPrice}
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="row g-3 position-relative">
          {visiblePlans.map((plan: any, planIndex: number) => {
            const planKey = `${catIndex}-${planIndex}`;
            return (
              <PlanCard
                key={planIndex}
                category={category}
                plan={plan}
                planKey={planKey}
                isHovered={null}
                setHoveredPlan={() => {}}
              />
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {hasMorePlans && (
          <div className="text-center mt-3 pt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setShowAllPlans(!showAllPlans)}
              className="btn rounded-pill px-4 py-1.5 fw-bold d-inline-flex align-items-center gap-2"
              style={{
                background: 'transparent',
                color: category.color,
                border: `1.5px solid ${category.color}`,
                fontSize: '0.75rem',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = category.color;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = category.color;
              }}
            >
              <span>{showAllPlans ? 'Show Less' : `View All ${category.plans.length} Plans`}</span>
              <i className={`bi bi-chevron-${showAllPlans ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PricingPackages() {
  return (
    <div className="w-100 min-vh-100 py-4 px-0 position-relative overflow-hidden bg-theme-main border-top" id="pricingpackages" style={{ borderColor: 'var(--border-subtle)' }}>
      
      {/* Soft Background */}
      <div 
        className="position-absolute top-0 start-0 rounded-circle pointer-events-none" 
        style={{
          width: '400px', 
          height: '400px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, rgba(2, 132, 199, 0) 70%)',
          transform: 'translate(-30%, -30%)',
          filter: 'blur(50px)'
        }}
      />

      <div className="container-fluid p-0 position-relative z-1" style={{ maxWidth: '1920px' }}>

        {/* Header */}
        <div className="text-center mb-4 px-3 position-relative">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              background: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
            }}
          >
            <span style={{ width: '5px', height: '5px', backgroundColor: '#0ea5e9', borderRadius: '50%' }} />
            <span className="fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#0284c7' }}>
              💎 PRICING PLANS
            </span>
          </div>

          <h1 className="display-6 fw-bold mb-2 text-theme-primary" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Professional <span style={{ color: '#0ea5e9' }}>Website Packages</span>
          </h1>

          <p className="text-theme-secondary mx-auto" style={{ maxWidth: '450px', fontWeight: 500, fontSize: '0.95rem' }}>
            7 Powerful Packages • Starting From <span className="fw-bold text-theme-primary" style={{ color: '#0284c7' }}>₹13,999</span>
          </p>
        </div>

        {/* Categories Grid */}
        <div className="row g-3 m-0 w-100 position-relative">
          {websitePackagesData.map((category, catIndex) => (
            <CategorySection key={catIndex} category={category} catIndex={catIndex} />
          ))}
          
          {/* Scroll Down Indicator - Shows only when content is scrollable */}
          <ScrollIndicator />
        </div>

      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </div>
  );
}