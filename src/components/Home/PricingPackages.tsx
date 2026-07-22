'use client';

import React, { useState } from 'react';
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
    gradient: "linear-gradient(135deg, #0d9488, #14b8a6, #2dd4bf)",
    color: "#14b8a6",
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
    gradient: "linear-gradient(135deg, #4f46e5, #6366f1, #818cf8)",
    color: "#6366f1",
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
    gradient: "linear-gradient(135deg, #ea580c, #f97316, #fb923c)",
    color: "#f97316",
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
    gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6, #a78bfa)",
    color: "#8b5cf6",
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
    gradient: "linear-gradient(135deg, #059669, #10b981, #34d399)",
    color: "#10b981",
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

export default function PricingPackages() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="w-100 min-vh-100 py-5 px-0 position-relative overflow-hidden bg-theme-main border-top" id="pricingpackages" style={{ borderColor: 'var(--border-subtle)' }}>
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div 
        className="position-absolute top-0 start-0 rounded-circle pointer-events-none glow-sphere-1" 
        style={{
          width: '800px', 
          height: '800px',
          transform: 'translate(-30%, -30%)'
        }}
      />

      <div className="container-fluid p-0 position-relative z-1" style={{ maxWidth: '1920px' }}>

        {/* MASTER TOP HEADER */}
        <div className="text-center mb-5 px-3">
          {/* EXTRA BOLD NEON BADGE */}
          <div 
            className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(255, 0, 128, 0.08)',
              border: '1.5px solid rgba(255, 0, 128, 0.35)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080, 0 0 20px #ff0080' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#ff77bc', fontWeight: 800 }}>
              💎 PRICING PLANS
            </span>
          </div>

          {/* MAXIMUM BOLD HEADING */}
          <h1 
            className="display-4 fw-black mb-3 text-theme-primary"
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Professional <span className="text-gradient-pink-orange" style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}>Website Packages</span>
          </h1>

          <p className="text-theme-secondary mx-auto fs-5" style={{ maxWidth: '520px', fontWeight: 500 }}>
            7 Powerful Packages • Starting From <span className="fw-black text-theme-primary" style={{ fontWeight: 900 }}>₹13,999</span>
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
                  boxShadow: '0 10px 30px var(--shadow-color)',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease'
                }}
              >
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
                    <span className="text-theme-secondary d-none d-lg-flex fw-bold mt-0.5" style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                      {category.subTitle} Baseline Architecture
                    </span>
                  </div>
                  <div className="ms-sm-auto mt-2 mt-sm-0">
                    <span className="badge rounded-pill px-3.5 py-2 fw-black text-white" style={{ background: category.gradient, fontSize: '0.8rem', fontWeight: 800 }}>
                      Starting ₹{category.startingPrice}
                    </span>
                  </div>
                </div>

                {/* PLANS ROW */}
                <div className="row g-3 position-relative">
                  {category.plans.map((plan, planIndex) => {
                    const planKey = `${catIndex}-${planIndex}`;
                    const isHovered = hoveredPlan === planKey;

                    return (
                      <div key={planIndex} className="col-12 col-sm-6 col-lg-4 col-xl-3 col-xxl">
                        <div 
                          className="h-100 d-flex flex-column position-relative p-4 rounded-4 border"
                          onMouseEnter={() => setHoveredPlan(planKey)}
                          onMouseLeave={() => setHoveredPlan(null)}
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: plan.popular ? category.color : 'var(--border-subtle)',
                            boxShadow: isHovered ? `0 15px 30px var(--shadow-color)` : 'none',
                            transform: isHovered ? 'translateY(-5px)' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {/* POPULAR BADGE */}
                          {plan.popular && (
                            <div 
                              className="position-absolute top-0 end-0 px-3 py-1 fw-black text-white" 
                              style={{ 
                                background: category.gradient, 
                                borderRadius: '0 14px 0 14px', 
                                fontSize: '0.62rem', 
                                letterSpacing: '0.06em',
                                fontWeight: 900
                              }}
                            >
                              ★ POPULAR CHOICE
                            </div>
                          )}

                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge rounded-circle d-flex align-items-center justify-content-center text-white fw-black" style={{ background: category.gradient, width: '24px', height: '24px', fontSize: '0.65rem', fontWeight: 900 }}>
                              {plan.id}
                            </span>
                            <span className="fs-5 fw-black" style={{ color: category.color, fontWeight: 900 }}>
                              {plan.price}
                            </span>
                          </div>

                          <h4 className="fw-black text-theme-primary mb-3" style={{ fontSize: '0.98rem', fontWeight: 900 }}>
                            {plan.type}
                          </h4>

                          {/* FEATURES LIST */}
                          <ul className="list-unstyled mb-4 flex-grow-1">
                            {plan.features.map((feature, fIdx) => (
                              <li key={fIdx} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: '0.8rem', lineHeight: '1.45' }}>
                                <i className="bi bi-patch-check-fill mt-0.5 flex-shrink-0" style={{ color: category.color, fontSize: '0.8rem' }}></i>
                                <span className="text-theme-secondary" style={{ fontWeight: 500 }}>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* ACTION BUTTON */}
                          <Link
                            href={`/booking?title=${encodeURIComponent(category.title)}&type=${encodeURIComponent(plan.type)}&price=${encodeURIComponent(plan.price)}&features=${encodeURIComponent(plan.features.join(','))}&icon=${encodeURIComponent(category.icon)}&gradient=${encodeURIComponent(category.gradient)}`}
                            className="btn w-100 rounded-pill py-2.5 fw-black text-white text-center border-0 d-flex align-items-center justify-content-center gap-1 mt-auto"
                            style={{ 
                              background: isHovered ? '#0f172a' : category.gradient, 
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              transition: 'all 0.25s'
                            }}
                          >
                            <span>Choose Blueprint</span>
                            <i className="bi bi-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                          </Link>

                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}