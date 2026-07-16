'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';

// NOTE: Light-mode stats component
import HomeStatsCards from './HomeStatsCards'; 

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      {/* Hero Carousel Container */}
      <section
        id="hero"
        className="carousel slide carousel-fade min-vh-100 position-relative overflow-hidden"
        data-bs-ride="carousel"
        data-bs-interval="7000"
        style={{ backgroundColor: '#0b1329', maxWidth: '100vw' }}
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators justify-content-start ms-4 ms-md-5 mb-4" style={{ zIndex: 5 }}>
          <button
            type="button"
            data-bs-target="#hero"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              margin: '0 5px',
              backgroundColor: '#475569',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <button
            type="button"
            data-bs-target="#hero"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              margin: '0 5px',
              backgroundColor: '#475569',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
          />
        </div>

        <div className="carousel-inner min-vh-100 overflow-hidden">
          {/* ========== SLIDE 1 ========== */}
          <div className="carousel-item active min-vh-100 overflow-hidden">
            {/* Background Image */}
            <div
              className="hero-bg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(to right, #0b1329 0%, #0b1329 40%, rgba(11, 19, 41, 0) 100%), url("/images/pic1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                height: '100%',
              }}
            />

            <div
              className="container min-vh-100 d-flex align-items-center position-relative"
              style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '60px' }}
            >
              <div className="row justify-content-start text-start w-100 mx-auto">
                <div className="col-lg-10 col-xl-8">
                  {/* Small Badge */}
                  <div
                    className="badge-wrapper d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                  >
                    <span
                      className="badge-dot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#38bdf8',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      className="badge-text fw-medium text-uppercase"
                      style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#cbd5e1' }}
                    >
                      Team Collaboration • Web Apps • Growth
                    </span>
                  </div>

                  {/* MAIN HEADING */}
                  <h1
                    className="mb-3 hero-title"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                      lineHeight: '1.1',
                      color: '#ffffff',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    <span data-aos="fade-right" data-aos-delay="100">WE </span>
                    <span
                      data-aos="fade-right"
                      data-aos-delay="300"
                      style={{
                        background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      BUILD WEBSITES
                    </span>
                    <br />
                    That Grow Your Business
                  </h1>

                  {/* PARAGRAPH */}
                  <p
                    className="mb-4 hero-text"
                    data-aos="fade-up"
                    data-aos-delay="500"
                    style={{
                      fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                      color: '#94a3b8',
                      maxWidth: '680px',
                      lineHeight: '1.7',
                      fontWeight: 500,
                    }}
                  >
                    We provide high-performance solutions for custom web applications, eCommerce, and integrated business platforms. Design, develop, and scale with ease.
                  </p>

                  {/* Buttons */}
                  <div
                    className="d-flex flex-wrap justify-content-start gap-3"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <Link
                      href="/dashboard"
                      className="d-inline-flex align-items-center justify-content-center px-4 py-2.5 fw-semibold text-decoration-none"
                      style={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.92rem',
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.4)';
                      }}
                    >
                      View Dashboard
                    </Link>
                    <Link
                      href="/contact"
                      className="d-inline-flex align-items-center justify-content-center px-4 py-2.5 fw-semibold text-decoration-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.92rem',
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#38bdf8';
                        e.currentTarget.style.color = '#38bdf8';
                        e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    >
                      Start a Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== SLIDE 2 ========== */}
          <div className="carousel-item min-vh-100 overflow-hidden">
            {/* Background Image */}
            <div
              className="hero-bg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(to right, #0b1329 0%, #0b1329 40%, rgba(11, 19, 41, 0) 100%), url("https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                height: '100%',
              }}
            />

            <div
              className="container min-vh-100 d-flex align-items-center position-relative"
              style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '60px' }}
            >
              <div className="row justify-content-start text-start w-100 mx-auto">
                <div className="col-lg-10 col-xl-8">
                  <div
                    className="badge-wrapper d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                  >
                    <span
                      className="badge-dot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      className="badge-text fw-medium text-uppercase"
                      style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#cbd5e1' }}
                    >
                      Performance • Security • ASO • Business Growth
                    </span>
                  </div>

                  <h1
                    className="mb-3 hero-title"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                      lineHeight: '1.1',
                      color: '#ffffff',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    Measure & Grow.
                    <br />
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #38bdf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Your Apps.
                    </span>
                  </h1>

                  <p
                    className="mb-4 hero-text"
                    style={{
                      fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                      color: '#94a3b8',
                      maxWidth: '680px',
                      lineHeight: '1.7',
                      fontWeight: 500,
                    }}
                  >
                    From specialized CRM, ERP, and booking engines to dashboards and SaaS platforms, we build the core digital products that power modern businesses and enhance user experience.
                  </p>

                  <div className="d-flex flex-wrap justify-content-start gap-3">
                    <Link
                      href="/contact"
                      className="d-inline-flex align-items-center justify-content-center px-4 py-2.5 fw-semibold text-decoration-none"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #2563eb)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.92rem',
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
                      }}
                    >
                      Get Optimization
                    </Link>
                    <Link
                      href="/services"
                      className="d-inline-flex align-items-center justify-content-center px-4 py-2.5 fw-semibold text-decoration-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.92rem',
                        borderRadius: '50px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Our Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev d-none d-md-flex"
          type="button"
          data-bs-target="#hero"
          data-bs-slide="prev"
          style={{ width: '6%', zIndex: 4, opacity: '0.6' }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
            style={{
              filter: 'brightness(1.5)',
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e\")",
            }}
          />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next d-none d-md-flex"
          type="button"
          data-bs-target="#hero"
          data-bs-slide="next"
          style={{ width: '6%', zIndex: 4, opacity: '0.6' }}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
            style={{
              filter: 'brightness(1.5)',
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\")",
            }}
          />
          <span className="visually-hidden">Next</span>
        </button>
      </section>

      {/* Stats Component */}
      <HomeStatsCards />
    </>
  );
}