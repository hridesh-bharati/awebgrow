// src/app/about/AboutClient.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutClient() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO BANNER - Theme Match with Hero Section */}
      {/* ============================================ */}
      <section 
        className="position-relative overflow-hidden"
        style={{ 
          backgroundColor: '#090a0f', 
          marginTop: '65px',
          paddingTop: '60px',
          paddingBottom: '60px' 
        }}
        aria-label="About AWebGrow"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        {/* Background Glow Effects */}
        <div 
          aria-hidden="true"
          style={{
            width: '450px', height: '450px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
            top: '-5%', left: '-5%',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            position: 'absolute'
          }}
        />
        <div 
          aria-hidden="true"
          style={{
            width: '450px', height: '450px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, rgba(0, 0, 0, 0) 70%)',
            bottom: '0%', right: '-5%',
            filter: 'blur(70px)',
            pointerEvents: 'none',
            position: 'absolute'
          }}
        />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-12 text-center">
              
              {/* Badge */}
              <div 
                className="d-inline-flex align-items-center gap-2 mb-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  padding: '5px 14px',
                  borderRadius: '50px'
                }}
              >
                <span style={{
                  width: '6px', height: '6px',
                  backgroundColor: '#ec4899',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #ec4899'
                }} aria-hidden="true" />
                <span style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: '#e4e4e7',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  ABOUT OUR AGENCY
                </span>
              </div>

              {/* Page Title */}
              <h1 
                className="fw-extrabold text-white mb-3"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.03em',
                  fontWeight: 800
                }}
              >
                We Are <span style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>AWebGrow</span>
              </h1>

              {/* Subtitle */}
              <p 
                className="mx-auto mb-0"
                style={{
                  color: '#9ca3af',
                  fontSize: 'clamp(0.9rem, 1vw, 1.05rem)',
                  maxWidth: '600px',
                  lineHeight: '1.55'
                }}
              >
                A leading <strong style={{ color: '#e4e4e7' }}>web development company in India</strong> delivering 
                custom websites, mobile apps, SEO, and digital marketing solutions to clients across 
                <strong style={{ color: '#e4e4e7' }}> Noida, Nichlaul,</strong> and worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* OUR STORY SECTION */}
      {/* ============================================ */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            
            {/* Left: Image */}
            <div className="col-lg-6" data-aos="fade-right">
              <div 
                className="position-relative overflow-hidden"
                style={{ 
                  borderRadius: '24px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                }}
              >
                <Image
                  src="/images/home-circle-image.png"
                  alt="AWebGrow - Web Development Company India Team"
                  width={600}
                  height={450}
                  className="w-100"
                  style={{ objectFit: 'cover' }}
                />
                {/* Overlay Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    background: 'rgba(9, 10, 15, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  <div className="text-white fw-bold" style={{ fontSize: '1.5rem' }}>150+</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Projects Delivered</div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="col-lg-6" data-aos="fade-left">
              <span 
                className="badge rounded-pill px-3 py-2 mb-3 fw-bold"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                  color: '#be185d',
                  border: '1px solid rgba(236, 72, 153, 0.2)'
                }}
              >
                OUR STORY
              </span>
              
              <h2 className="fw-bold mb-3" style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Building Digital <span style={{
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Excellence</span> Since 2022
              </h2>
              
              <p style={{ color: '#64748b', lineHeight: '1.8' }}>
                <strong>AWebGrow</strong> was founded with a simple mission: to make world-class 
                <strong> web development</strong> and <strong>digital marketing services</strong> accessible 
                to businesses of all sizes. What started as a small team in 
                <strong style={{ color: '#0f172a' }}> Nichlaul, Uttar Pradesh</strong> has grown into a 
                trusted <strong style={{ color: '#0f172a' }}>web development company in India</strong> 
                serving 150+ clients worldwide.
              </p>
              
              <p style={{ color: '#64748b', lineHeight: '1.8' }}>
                Our team specializes in <strong>Next.js, React, MERN Stack,</strong> and modern web technologies. 
                We don&apos;t just build websites—we create <strong>digital experiences</strong> that drive 
                real business growth through SEO optimization, mobile-first design, and conversion-focused strategies.
              </p>

              {/* Stats Row */}
              <div className="row g-3 mt-3">
                <div className="col-4">
                  <div 
                    className="text-center p-3 rounded-3"
                    style={{ 
                      background: 'rgba(18, 19, 28, 0.04)',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}
                  >
                    <h3 className="fw-bold mb-1" style={{ 
                      color: '#0f172a',
                      background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>150+</h3>
                    <small style={{ color: '#64748b' }}>Projects</small>
                  </div>
                </div>
                <div className="col-4">
                  <div 
                    className="text-center p-3 rounded-3"
                    style={{ 
                      background: 'rgba(18, 19, 28, 0.04)',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}
                  >
                    <h3 className="fw-bold mb-1" style={{ 
                      color: '#0f172a',
                      background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>250+</h3>
                    <small style={{ color: '#64748b' }}>Clients</small>
                  </div>
                </div>
                <div className="col-4">
                  <div 
                    className="text-center p-3 rounded-3"
                    style={{ 
                      background: 'rgba(18, 19, 28, 0.04)',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}
                  >
                    <h3 className="fw-bold mb-1" style={{ 
                      color: '#0f172a',
                      background: 'linear-gradient(135deg, #ec4899, #f97316)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>98%</h3>
                    <small style={{ color: '#64748b' }}>Retention</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MISSION & VISION */}
      {/* ============================================ */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row g-4">
            
            {/* Mission */}
            <div className="col-md-6" data-aos="fade-up">
              <div 
                className="p-4 h-100"
                style={{
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  borderRadius: '24px',
                  border: '1px solid rgba(236, 72, 153, 0.15)'
                }}
              >
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '60px', height: '60px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                    color: '#ffffff',
                    fontSize: '24px',
                    boxShadow: '0 8px 30px rgba(236, 72, 153, 0.25)'
                  }}
                >
                  <i className="bi bi-bullseye"></i>
                </div>
                <h3 className="fw-bold mb-2" style={{ color: '#0f172a' }}>Our Mission</h3>
                <p style={{ color: '#64748b', lineHeight: '1.7' }}>
                  To empower businesses with <strong>cutting-edge web development</strong> and 
                  <strong> digital marketing solutions</strong> that drive measurable growth. We aim to be 
                  the most trusted <strong>web development company in India</strong> by delivering 
                  exceptional quality at affordable prices.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div 
                className="p-4 h-100"
                style={{
                  background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                  borderRadius: '24px',
                  border: '1px solid rgba(14, 165, 233, 0.15)'
                }}
              >
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '60px', height: '60px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                    color: '#ffffff',
                    fontSize: '24px',
                    boxShadow: '0 8px 30px rgba(14, 165, 233, 0.25)'
                  }}
                >
                  <i className="bi bi-eye"></i>
                </div>
                <h3 className="fw-bold mb-2" style={{ color: '#0f172a' }}>Our Vision</h3>
                <p style={{ color: '#64748b', lineHeight: '1.7' }}>
                  To become India&apos;s leading <strong>digital transformation agency</strong> by 2028, 
                  serving 1000+ clients across <strong>Noida, Nichlaul, Delhi NCR,</strong> and globally. 
                  We envision a future where every business has access to enterprise-grade technology.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TEAM MEMBERS */}
      {/* ============================================ */}
      <section 
        className="py-5" 
        style={{ backgroundColor: '#f8fafc' }}
        aria-label="Our Team"
      >
        <div className="container">
          
          {/* Section Header */}
          <div className="text-center mb-5" data-aos="fade-up">
            <span 
              className="badge rounded-pill px-3 py-2 mb-3 fw-bold"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
                color: '#be185d',
                border: '1px solid rgba(236, 72, 153, 0.2)'
              }}
            >
              OUR TEAM
            </span>
            <h2 className="fw-bold" style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              Meet The <span style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Experts</span>
            </h2>
          </div>

          {/* Team Cards */}
          <div className="row g-4 justify-content-center">
            
            {/* Hridesh Bharati */}
            <div className="col-md-4 col-sm-6" data-aos="fade-up">
              <article 
                className="text-center p-4 h-100"
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                }}
                itemScope
                itemType="https://schema.org/Person"
              >
                <div 
                  className="mx-auto mb-3 rounded-circle overflow-hidden"
                  style={{ 
                    width: '120px', 
                    height: '120px',
                    border: '3px solid rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <Image
                    src="/images/home-circle-image.png"
                    alt="Hridesh Bharati - Founder & Lead Developer at AWebGrow"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#0f172a', fontSize: '1.1rem' }}>
                  Hridesh Bharati
                </h3>
                <p className="mb-2" style={{ 
                  fontSize: '0.8rem',
                  background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600
                }}>
                  Founder & Lead Developer
                </p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                  Full-stack developer specializing in Next.js, React & MERN Stack. 
                  Building scalable web solutions from Nichlaul.
                </p>
                <meta itemProp="name" content="Hridesh Bharati" />
                <meta itemProp="jobTitle" content="Founder & Lead Developer" />
              </article>
            </div>

            {/* Sushant Rai */}
            <div className="col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="100">
              <article 
                className="text-center p-4 h-100"
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                }}
                itemScope
                itemType="https://schema.org/Person"
              >
                <div 
                  className="mx-auto mb-3 rounded-circle overflow-hidden"
                  style={{ 
                    width: '120px', 
                    height: '120px',
                    border: '3px solid rgba(236, 72, 153, 0.3)',
                    boxShadow: '0 0 30px rgba(236, 72, 153, 0.2)'
                  }}
                >
                  <Image
                    src="/images/home-circle-image.png"
                    alt="Sushant Rai - Co-Founder & Marketing Head at AWebGrow"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#0f172a', fontSize: '1.1rem' }}>
                  Sushant Rai
                </h3>
                <p className="mb-2" style={{ 
                  fontSize: '0.8rem',
                  background: 'linear-gradient(135deg, #ec4899, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600
                }}>
                  Co-Founder & Marketing Head
                </p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                  SEO & digital marketing expert driving growth strategies for clients 
                  across Noida and Delhi NCR.
                </p>
                <meta itemProp="name" content="Sushant Rai" />
                <meta itemProp="jobTitle" content="Co-Founder & Marketing Head" />
              </article>
            </div>

            {/* Sushil Kandu */}
            <div className="col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay="200">
              <article 
                className="text-center p-4 h-100"
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                }}
                itemScope
                itemType="https://schema.org/Person"
              >
                <div 
                  className="mx-auto mb-3 rounded-circle overflow-hidden"
                  style={{ 
                    width: '120px', 
                    height: '120px',
                    border: '3px solid rgba(16, 185, 129, 0.3)',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <Image
                    src="/images/home-circle-image.png"
                    alt="Sushil Kandu - UI/UX Designer at AWebGrow"
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#0f172a', fontSize: '1.1rem' }}>
                  Sushil Kandu
                </h3>
                <p className="mb-2" style={{ 
                  fontSize: '0.8rem',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 600
                }}>
                  UI/UX Designer
                </p>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                  Creative designer crafting beautiful user interfaces and seamless 
                  user experiences for web and mobile applications.
                </p>
                <meta itemProp="name" content="Sushil Kandu" />
                <meta itemProp="jobTitle" content="UI/UX Designer" />
              </article>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* LOCATIONS SECTION */}
      {/* ============================================ */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="fw-bold mb-3" style={{ color: '#0f172a' }}>
              Our <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Locations</span>
            </h2>
          </div>
          
          <div className="row g-4">
            {/* Noida */}
            <div className="col-md-6" data-aos="fade-up">
              <div 
                className="p-4 d-flex align-items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                  borderRadius: '20px',
                  border: '1px solid rgba(14, 165, 233, 0.15)'
                }}
              >
                <div 
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '50px', height: '50px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                    color: '#ffffff',
                    fontSize: '20px'
                  }}
                >
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ fontSize: '1rem', color: '#0f172a' }}>Noida Office</h3>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Sector 62, Noida, Uttar Pradesh - 201309, India
                  </p>
                </div>
              </div>
            </div>

            {/* Nichlaul */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div 
                className="p-4 d-flex align-items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #fefce8, #fef9c3)',
                  borderRadius: '20px',
                  border: '1px solid rgba(234, 179, 8, 0.15)'
                }}
              >
                <div 
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '50px', height: '50px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #eab308, #facc15)',
                    color: '#ffffff',
                    fontSize: '20px'
                  }}
                >
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ fontSize: '1rem', color: '#0f172a' }}>Nichlaul HQ</h3>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Nichlaul, Maharajganj, Uttar Pradesh - 273304, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section 
        className="py-5"
        style={{
          background: 'linear-gradient(135deg, #090a0f, #1a1b2e)'
        }}
      >
        <div className="container text-center">
          <h2 className="fw-bold text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Ready to Work With <span style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Us?</span>
          </h2>
          <p className="mb-4 mx-auto" style={{ color: '#9ca3af', maxWidth: '500px' }}>
            Let&apos;s discuss your project and build something amazing together.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link 
              href="/contact"
              className="btn rounded-pill px-4 py-2 fw-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                border: 'none',
                boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)'
              }}
            >
              Get In Touch
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link 
              href="/services"
              className="btn rounded-pill px-4 py-2 fw-bold"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff'
              }}
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SCHEMA.ORG STRUCTURED DATA */}
      {/* ============================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About AWebGrow - Web Development Company India",
            "description": "Learn about AWebGrow - a leading web development company in India. Meet our team and discover our mission.",
            "url": "https://www.awebgrow.com/about",
            "publisher": {
              "@type": "Organization",
              "name": "AWebGrow",
              "url": "https://www.awebgrow.com"
            },
            "about": {
              "@type": "Organization",
              "name": "AWebGrow",
              "foundingDate": "2022",
              "founder": [
                { "@type": "Person", "name": "Hridesh Bharati" },
                { "@type": "Person", "name": "Sushant Rai" }
              ],
              "employee": [
                { "@type": "Person", "name": "Hridesh Bharati", "jobTitle": "Founder & Lead Developer" },
                { "@type": "Person", "name": "Sushant Rai", "jobTitle": "Co-Founder & Marketing Head" },
                { "@type": "Person", "name": "Sushil Kandu", "jobTitle": "UI/UX Designer" }
              ],
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Noida",
                  "addressRegion": "Uttar Pradesh",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Nichlaul",
                  "addressRegion": "Uttar Pradesh",
                  "addressCountry": "IN"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}