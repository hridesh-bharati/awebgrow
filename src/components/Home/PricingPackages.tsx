'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        fontSize: '90px',
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
const PlanCard = ({ category, plan, planKey, isHovered, setHoveredPlan, index }: any) => {
  const isPlanHovered = isHovered === planKey;

  return (
    <div 
      className="col-12 col-sm-6 col-lg-4 col-xl-3"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay={index * 60}
    >
      <div 
        className="h-100 d-flex flex-column position-relative p-4 rounded-3 border overflow-hidden"
        onMouseEnter={() => setHoveredPlan(planKey)}
        onMouseLeave={() => setHoveredPlan(null)}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: plan.popular ? category.color : 'var(--border-subtle)',
          boxShadow: isPlanHovered ? '0 8px 30px rgba(0,0,0,0.12)' : '0 2px 10px var(--shadow-color)',
          transform: isPlanHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
        }}
      >
        <IndustryWatermark symbol={category.watermark} color={category.color} />

        {plan.popular && (
          <div 
            className="position-absolute top-0 end-0 px-3 py-1 fw-bold text-white" 
            style={{ 
              background: category.gradient, 
              borderRadius: '0 12px 0 12px', 
              fontSize: '0.55rem',
              letterSpacing: '0.06em',
              zIndex: 2
            }}
          >
            ★ POPULAR
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3 position-relative" style={{ zIndex: 1 }}>
          <span 
            className="badge rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
            style={{ 
              background: category.gradient, 
              width: '28px', 
              height: '28px', 
              fontSize: '0.65rem',
              flexShrink: 0
            }}
          >
            {plan.id}
          </span>
          <span className="fw-bold" style={{ color: category.color, fontSize: '1rem' }}>
            {plan.price}
          </span>
        </div>

        <h4 className="fw-bold text-theme-primary mb-3 position-relative" style={{ fontSize: '0.95rem', zIndex: 1 }}>
          {plan.type}
        </h4>

        <ul className="list-unstyled mb-4 flex-grow-1 position-relative" style={{ zIndex: 1 }}>
          {plan.features.map((feature: string, idx: number) => (
            <li 
              key={idx} 
              className="d-flex align-items-start gap-2"
              style={{ fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '4px' }}
            >
              <i className="bi bi-check-circle-fill mt-0.5 flex-shrink-0" style={{ color: category.color, fontSize: '0.65rem' }}></i>
              <span className="text-theme-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/booking?title=${encodeURIComponent(category.title)}&type=${encodeURIComponent(plan.type)}&price=${encodeURIComponent(plan.price)}&features=${encodeURIComponent(plan.features.join(','))}&icon=${encodeURIComponent(category.icon)}&gradient=${encodeURIComponent(category.gradient)}`}
          className="btn w-100 rounded-pill py-2 fw-bold text-white text-center border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm position-relative"
          style={{ 
            background: isPlanHovered ? '#0f172a' : category.gradient, 
            fontSize: '0.78rem',
            transition: 'all 0.3s ease',
            zIndex: 1,
            marginTop: 'auto'
          }}
        >
          <span>Choose Plan</span>
          <i className="bi bi-arrow-right" style={{ fontSize: '0.7rem' }}></i>
        </Link>

        <div 
          className="position-absolute bottom-0 start-0 rounded-bottom"
          style={{
            height: '2.5px',
            width: isPlanHovered ? '100%' : '0%',
            background: category.gradient,
            transition: 'width 0.3s ease',
            borderRadius: '0 0 4px 4px',
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
};

// Category Section
const CategorySection = ({ category, catIndex }: { category: any; catIndex: number }) => {
  const [showAllPlans, setShowAllPlans] = useState(false);
  const initialPlans = 4; // Changed to 4
  const visiblePlans = showAllPlans ? category.plans : category.plans.slice(0, initialPlans);
  const hasMorePlans = category.plans.length > initialPlans;

  return (
    <div 
      className="col-12 px-0 px-md-3"
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={catIndex * 80}
    >
      <div 
        className="position-relative overflow-hidden p-4 p-md-5 rounded-4 border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          boxShadow: '0 2px 15px var(--shadow-color)',
        }}
      >
        <div className="d-flex align-items-center flex-wrap gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
          <div 
            className="d-flex align-items-center justify-content-center rounded-3 text-white"
            style={{ width: '44px', height: '44px', background: category.gradient }}
          >
            <i className={`bi ${category.icon}`} style={{ fontSize: '1.2rem' }}></i>
          </div>
          <div>
            <h2 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '1.2rem' }}>
              {category.title}
            </h2>
            <span className="text-theme-secondary d-none d-lg-block" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              {category.subTitle}
            </span>
          </div>
          <div className="ms-auto">
            <span className="badge rounded-pill px-3 py-2 fw-bold text-white shadow-sm" style={{ background: category.gradient, fontSize: '0.75rem' }}>
              Starting ₹{category.startingPrice}
            </span>
          </div>
        </div>

        <div className="row g-3">
          {visiblePlans.map((plan: any, planIndex: number) => {
            const planKey = `${catIndex}-${planIndex}`;
            const globalIndex = catIndex * 10 + planIndex;
            return (
              <PlanCard
                key={planIndex}
                category={category}
                plan={plan}
                planKey={planKey}
                isHovered={null}
                setHoveredPlan={() => {}}
                index={globalIndex}
              />
            );
          })}
        </div>

        {hasMorePlans && (
          <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setShowAllPlans(!showAllPlans)}
              className="btn rounded-pill px-4 py-1.5 fw-bold d-inline-flex align-items-center gap-2"
              style={{
                background: 'transparent',
                color: category.color,
                border: `2px solid ${category.color}`,
                fontSize: '0.7rem',
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
              <span>{showAllPlans ? 'Show Less' : `View All ${category.plans.length}`}</span>
              <i className={`bi bi-chevron-${showAllPlans ? 'up' : 'down'}`} style={{ fontSize: '0.65rem' }}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function PricingPackages() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 30,
      duration: 500,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="w-100 py-5 px-0 position-relative bg-theme-main border-top" id="pricingpackages" style={{ borderColor: 'var(--border-subtle)' }}>
      
      <div 
        className="position-absolute top-0 start-0 rounded-circle pointer-events-none" 
        style={{
          width: '400px', 
          height: '400px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, rgba(2, 132, 199, 0) 70%)',
          transform: 'translate(-25%, -25%)',
          filter: 'blur(50px)'
        }}
      />

      <div className="container-fluid p-0 position-relative z-1" style={{ maxWidth: '1920px' }}>

        <div 
          className="text-center mb-4 px-3"
          data-aos="fade-down"
          data-aos-duration="500"
        >
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
            style={{
              background: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.2)',
            }}
          >
            <span style={{ width: '5px', height: '5px', backgroundColor: '#0ea5e9', borderRadius: '50%' }} />
            <span className="fw-bold text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: '#0284c7' }}>
              PRICING PLANS
            </span>
          </div>

          <h1 className="fw-bold mb-2 text-theme-primary" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Professional <span style={{ color: '#0ea5e9' }}>Website Packages</span>
          </h1>

          <p className="text-theme-secondary mx-auto" style={{ maxWidth: '450px', fontWeight: 500, fontSize: '0.9rem' }}>
            7 Powerful Packages • Starting From <span className="fw-bold" style={{ color: '#0284c7' }}>₹13,999</span>
          </p>
        </div>

        <div className="row g-3 m-0 w-100">
          {websitePackagesData.map((category, catIndex) => (
            <CategorySection key={catIndex} category={category} catIndex={catIndex} />
          ))}
        </div>

      </div>
    </div>
  );
}