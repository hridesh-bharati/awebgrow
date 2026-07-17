'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import WebServicesSection from './WebServicesSection';

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
      <section
        id="hero"
        className="carousel slide carousel-fade position-relative overflow-hidden"
        data-bs-ride="carousel"
        data-bs-interval="7000"
        style={{ 
          backgroundColor: '#0b1329', 
          maxWidth: '100vw',
          overflow: 'hidden',
          marginTop: '65px', 
          height: '85vh',    
          minHeight: '85vh'
        }}
      >
        {/* Mobile Responsiveness Framework - Set to exactly 70vh */}
        <style jsx>{`
          @media (max-width: 767.98px) {
            #hero, .carousel-inner, .carousel-item {
              height: 70vh !important;
              min-height: 70vh !important;
            }
            .hero-bg {
              background-position: 85% center !important; /* Shifts graphics rightward to save text clarity */
              background-image: linear-gradient(to top, #0b1329 15%, rgba(11, 19, 41, 0.75) 50%, #0b1329 85%), url("/images/pic1.webp") !important;
            }
            .slide2-bg {
              background-position: 85% center !important;
            }
          }
        `}</style>

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
              backgroundColor: '#ffffff',
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
              backgroundColor: 'rgba(255,255,255,0.4)',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
          />
        </div>

        <div className="carousel-inner overflow-hidden" style={{ height: '100%' }}>
          
          {/* ========== SLIDE 1: Website Development ========== */}
          <div className="carousel-item active overflow-hidden" style={{ height: '100%' }}>
            <div
              className="hero-bg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(to right, #0b1329 0%, #0b1329 45%, rgba(11, 19, 41, 0.2) 100%), url("/images/pic1.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                height: '100%',
              }}
            />

            <div
              className="container d-flex align-items-center position-relative h-100"
              style={{ 
                zIndex: 2, 
                paddingTop: '40px',     
                paddingBottom: '40px',
                boxSizing: 'border-box'
              }}
            >
              <div className="row justify-content-start text-start w-100 mx-auto align-items-center">
                <div className="col-12 col-lg-10 col-xl-8">
                  
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
                      Website Development • Custom Solutions
                    </span>
                  </div>

                  <h1
                    className="mb-3 hero-title"
                    data-aos="fade-right"
                    data-aos-delay="100"
                    style={{
                      fontWeight: 800,
                      fontSize: 'clamp(2.1rem, 4.5vw, 4rem)', 
                      lineHeight: '1.2',
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Build <span
                      style={{
                        background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      High-Performance
                    </span>
                    <br />
                    Websites & Apps
                  </h1>

                  <p
                    className="mb-4 hero-text"
                    data-aos="fade-up"
                    data-aos-delay="300"
                    style={{
                      fontSize: 'clamp(0.88rem, 1.1vw, 1.1rem)',
                      color: '#94a3b8',
                      maxWidth: '650px',
                      lineHeight: '1.5',
                      fontWeight: 500,
                    }}
                  >
                    From custom web applications and platforms to SaaS — we design, develop, and scale digital products that drive real results.
                  </p>

                  <div
                    className="d-flex align-items-center justify-content-start gap-3 w-100"
                    data-aos="fade-up"
                    data-aos-delay="400"
                    style={{ maxWidth: "400px" }}
                  >
                    <Link
                      href="#projects"
                      className="btn d-inline-flex align-items-center justify-content-center flex-grow-1 px-4 py-2 fw-semibold text-decoration-none"
                      style={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.85rem',
                        borderRadius: '50px',
                        boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                      }}
                    >
                      View Projects
                    </Link>

                    <Link
                      href="/contact"
                      className="btn d-inline-flex align-items-center justify-content-center bg-warning text-dark flex-grow-1 px-4 py-2 fw-bold text-decoration-none"
                      style={{
                        border: 'none',
                        fontSize: '0.85rem',
                        borderRadius: '50px',
                        boxShadow: '0 4px 12px rgba(255,193,7,0.2)'
                      }}
                    >
                      Contact Us
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ========== SLIDE 2: SEO & Analytics ========== */}
          <div className="carousel-item overflow-hidden" style={{ height: '100%' }}>
            <div
              className="hero-bg slide2-bg"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(to right, #0b1329 0%, #0b1329 45%, rgba(11, 19, 41, 0.2) 100%), url("https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                height: '100%',
              }}
            />

            <div
              className="container d-flex align-items-center position-relative h-100"
              style={{ 
                zIndex: 2, 
                paddingTop: '40px',
                paddingBottom: '40px',
                boxSizing: 'border-box'
              }}
            >
              <div className="row justify-content-start text-start w-100 mx-auto align-items-center">
                <div className="col-12 col-lg-10 col-xl-8">
                  
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
                      SEO • Analytics • Performance Optimization
                    </span>
                  </div>

                  <h1
                    className="mb-3 hero-title"
                    style={{
                      fontWeight: 800,
                      fontSize: 'clamp(2.1rem, 4.5vw, 4rem)',
                      lineHeight: '1.2',
                      color: '#ffffff',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Grow Your <span
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #38bdf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Digital Presence
                    </span>
                    <br />
                    with Analytics
                  </h1>

                  <p
                    className="mb-4 hero-text"
                    style={{
                      fontSize: 'clamp(0.88rem, 1.1vw, 1.1rem)',
                      color: '#94a3b8',
                      maxWidth: '650px',
                      lineHeight: '1.5',
                      fontWeight: 500,
                    }}
                  >
                    Boost your visibility with expert SEO strategies, track performance with Google Analytics, and optimize your apps for maximum reach.
                  </p>

                  <div className="d-flex align-items-center justify-content-start gap-3 w-100" style={{ maxWidth: "400px" }}>
                    <Link
                      href="/services"
                      className="d-inline-flex align-items-center justify-content-center flex-grow-1 px-4 py-2 fw-semibold text-decoration-none"
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #2563eb)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.85rem',
                        borderRadius: '50px',
                        boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
                      }}
                    >
                      Explore Services
                    </Link>
                    <Link
                      href="/contact"
                      className="d-inline-flex align-items-center justify-content-center flex-grow-1 px-4 py-2 fw-semibold text-decoration-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontSize: '0.85rem',
                        borderRadius: '50px',
                      }}
                    >
                      Get Started
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
      <WebServicesSection />
    </>
  );
}