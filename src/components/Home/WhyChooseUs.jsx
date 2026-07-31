'use client';

import { FaRocket, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  {
    icon: <FaRocket size={16} />,
    title: "Fast Delivery",
    description: "Agile development methodology ensuring quick project completion.",
    accentColor: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.3)",
    delay: 100
  },
  {
    icon: <FaUsers size={16} />,
    title: "Expert Team",
    description: "Skilled professionals with years of industry experience.",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.3)",
    delay: 200
  },
  {
    icon: <FaClock size={16} />,
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance.",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.3)",
    delay: 300
  },
  {
    icon: <FaAward size={16} />,
    title: "Quality Assured",
    description: "Industry-standard quality checks and testing procedures.",
    accentColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.3)",
    delay: 400
  }
];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }, []);

  return (
    <section
      className="py-5 position-relative overflow-hidden bg-theme-main border-top"
      id="why-choose-us"
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      {/* GLOWING GRADIENT TOP DIVIDER LINE */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x w-75 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 128, 0.6) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(255, 0, 128, 0.8)'
        }}
      />

      {/* AMBIENT NEON BACKGROUND GLOWS */}
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12) 0%, transparent 70%)',
          filter: 'blur(90px)',
          top: '15%',
          left: '-5%',
        }}
      />
      <div
        className="position-absolute rounded-circle pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
          bottom: '10%',
          right: '-5%',
        }}
      />

      <div className="container py-4 position-relative z-1">
        <div className="row align-items-center g-4 g-lg-5">

          {/* LEFT COLUMN: TEXT CONTENT & CARDS */}
          <div className="col-lg-6 text-center text-lg-start">

            {/* BADGE */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
              style={{
                background: 'rgba(255, 0, 128, 0.08)',
                border: '1.5px solid rgba(255, 0, 128, 0.35)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
              }}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <span style={{ width: '7px', height: '7px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080, 0 0 20px #ff0080' }} />
              <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#ff77bc', fontWeight: 800 }}>
                🛡️ WHY COOPERATE WITH US
              </span>
            </div>

            {/* HEADING */}
            <h2
              className="display-5 fw-black tracking-tight mb-3 text-theme-primary"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              We Build{' '}
              <span
                className="text-gradient-pink-orange"
                style={{
                  fontWeight: 900,
                  filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))'
                }}
              >
                Digital Architecture
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="fs-6 mb-4 mx-auto mx-lg-0 text-theme-secondary"
              style={{
                maxWidth: '560px',
                lineHeight: '1.65',
                fontSize: '0.95rem',
                fontWeight: 500,
                opacity: 0.95
              }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              With deep structural engineering expertise, we configure highly resilient web assets and scalable native components optimized to support long-term traffic and computational density.
            </p>

            {/* CARDS GRID WITH 360-DEGREE ROTATING BORDER */}
            <div className="row g-2.5 text-start mt-2">
              {features.map((feature, index) => (
                <div className="col-sm-6 my-1" key={index}>
                  
                  {/* WRAPPER WITH ROTATING BORDER CLASS */}
                  <div
                    className="rotating-border-card rounded-4"
                    style={{
                      '--card-accent': feature.accentColor,
                      '--card-glow': feature.glowColor,
                    }}
                    data-aos="fade-up"
                    data-aos-delay={feature.delay}
                  >
                    {/* INNER CONTENT AREA */}
                    <div className="rotating-border-inner p-3">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle me-2"
                          style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.05))',
                            border: `1px solid ${feature.accentColor}55`,
                            color: feature.accentColor,
                            boxShadow: `0 0 12px ${feature.glowColor}`
                          }}
                        >
                          {feature.icon}
                        </div>

                        <div>
                          <h6 className="fw-bold mb-0.5 text-theme-primary" style={{ fontSize: '0.88rem', letterSpacing: '-0.01em' }}>
                            {feature.title}
                          </h6>
                          <p className="small m-0 text-theme-secondary" style={{ fontSize: '0.75rem', lineHeight: '1.35' }}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: GALLERY */}
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="row g-3 align-items-end">

              {/* Left Column Images */}
              <div className="col-6">
                <div className="mb-3 overflow-hidden rounded-4" style={{ aspectRatio: '1/1' }}>
                  <img
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
                    alt="Web Development Coding"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="overflow-hidden ms-auto rounded-4" style={{ aspectRatio: '1/1', width: '85%' }}>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80"
                    alt="Digital Marketing and SEO Strategy"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </div>

              {/* Right Column Images */}
              <div className="col-6">
                <div className="mb-3 overflow-hidden rounded-4" style={{ aspectRatio: '4/5' }}>
                  <img
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80"
                    alt="Digital Architecture and Tech Design"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-4" style={{ aspectRatio: '1/1' }}>
                  <img
                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80"
                    alt="SEO Data Analysis"
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}