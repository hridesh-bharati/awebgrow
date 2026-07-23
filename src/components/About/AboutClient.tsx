"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TeamSection from '@/components/Team/OurTeam';

export default function AboutClient() {
  const servicesList = [
    {
      icon: "bi-code-slash",
      color: "linear-gradient(135deg, #a855f7, #6366f1)",
      headerGradient: "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)",
      glow: "rgba(168, 85, 247, 0.35)",
      title: "Web Development",
      description: "Custom Next.js, React, and Node.js solutions built for speed, responsiveness, and enterprise-grade scalability."
    },
    {
      icon: "bi-phone",
      color: "linear-gradient(135deg, #ff0080, #f43f5e)",
      headerGradient: "linear-gradient(135deg, #ff0080 0%, #f97316 100%)",
      glow: "rgba(255, 0, 128, 0.35)",
      title: "Mobile App Development",
      description: "Feature-rich iOS and Android mobile apps engineered with React Native and Flutter for seamless UX."
    },
    {
      icon: "bi-palette",
      color: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
      headerGradient: "linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)",
      glow: "rgba(14, 165, 233, 0.35)",
      title: "UI/UX & Web Design",
      description: "Conversion-driven, intuitive user experiences and sleek modern wireframes designed in Figma."
    },
    {
      icon: "bi-graph-up-arrow",
      color: "linear-gradient(135deg, #10b981, #059669)",
      headerGradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
      glow: "rgba(16, 185, 129, 0.35)",
      title: "SEO & Digital Marketing",
      description: "Data-backed SEO strategies, keyword optimization, and performance campaigns to grow online visibility."
    }
  ];

  const techCategories = [
    { name: "Next.js 15", icon: "bi-lightning-charge-fill", color: "#a855f7" },
    { name: "React.js", icon: "bi-code-square", color: "#00f2fe" },
    { name: "TypeScript", icon: "bi-filetype-ts", color: "#3b82f6" },
    { name: "Node.js", icon: "bi-server", color: "#10b981" },
    { name: "Flutter", icon: "bi-phone-fill", color: "#0ea5e9" },
    { name: "React Native", icon: "bi-device-mobile", color: "#6366f1" },
    { name: "Tailwind CSS", icon: "bi-filetype-css", color: "#06b6d4" },
    { name: "Firebase", icon: "bi-fire", color: "#f97316" },
    { name: "MongoDB", icon: "bi-database-fill", color: "#22c55e" },
    { name: "Figma", icon: "bi-figma", color: "#ec4899" },
    { name: "PostgreSQL", icon: "bi-database-gear", color: "#38bdf8" },
    { name: "AWS", icon: "bi-cloud-check-fill", color: "#eab308" }
  ];

  const coreValues = [
    {
      icon: "bi-shield-check",
      title: "Uncompromising Security",
      desc: "Top-tier data encryption, tokenized auth, and hardened server setups.",
      accentGradient: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
      glowColor: "rgba(255, 0, 128, 0.25)",
      borderColor: "rgba(255, 0, 128, 0.3)"
    },
    {
      icon: "bi-lightning-charge-fill",
      title: "Lightning Velocity",
      desc: "Sub-second load times optimized for Google Core Web Vitals.",
      accentGradient: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
      glowColor: "rgba(0, 242, 254, 0.25)",
      borderColor: "rgba(0, 242, 254, 0.3)"
    },
    {
      icon: "bi-people-fill",
      title: "Client-Centric Approach",
      desc: "100% transparent development pipelines and weekly project updates.",
      accentGradient: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
      glowColor: "rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.3)"
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Measurable ROI",
      desc: "Digital products built specifically to increase conversions and sales.",
      accentGradient: "linear-gradient(135deg, #f97316 0%, #ff0080 100%)",
      glowColor: "rgba(249, 115, 22, 0.25)",
      borderColor: "rgba(249, 115, 22, 0.3)"
    }
  ];

  return (
    <div className="bg-theme-main text-theme-primary overflow-hidden">

      {/* ============================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================ */}
      <section
        className="position-relative overflow-hidden border-bottom"
        style={{
          paddingTop: '120px',
          paddingBottom: '90px',
          borderColor: 'var(--border-subtle)',
          zIndex: 1
        }}
        aria-label="About AWebGrow"
      >
        <div
          className="position-absolute rounded-circle pointer-events-none glow-sphere-1"
          style={{ width: '500px', height: '500px', top: '-10%', left: '-5%' }}
        />
        <div
          className="position-absolute rounded-circle pointer-events-none glow-sphere-2"
          style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%' }}
        />

        <div className="container position-relative z-2">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-10">

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
                  FULL-SERVICE DIGITAL AGENCY
                </span>
              </div>

              <h1
                className="display-4 fw-black text-theme-primary mb-3"
                style={{
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.03em',
                  fontWeight: 900
                }}
              >
                Crafting Digital Growth with <br className="d-none d-md-block" />
                <span
                  className="text-gradient-pink-orange"
                  style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}
                >
                  Engineering &amp; Creative Excellence
                </span>
              </h1>

              <p
                className="mx-auto mb-0 text-theme-secondary"
                style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  maxWidth: '780px',
                  lineHeight: '1.7',
                  fontWeight: 500
                }}
              >
                <strong>AWebGrow</strong> is a full-stack web and mobile development studio delivering custom software, cross-platform mobile apps, conversion-focused UI/UX design, and targeted SEO solutions for clients in Noida, Nichlaul, and globally.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 2. SERVICES CAPABILITIES GRID */}
      {/* ============================================ */}
      <section className="py-5 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="btn-secondary-glow px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 mb-3">
              <span style={{ width: '6px', height: '6px', backgroundColor: '#a855f7', borderRadius: '50%', boxShadow: '0 0 8px #a855f7' }} />
              <span className="fw-bold text-uppercase small" style={{ letterSpacing: '0.12em' }}>
                WHAT WE DO BEST
              </span>
            </div>

            <h2 className="display-6 fw-black text-theme-primary mb-2" style={{ fontWeight: 900 }}>
              Complete Digital Solutions Under One Roof
            </h2>
            <p className="text-theme-secondary mx-auto" style={{ maxWidth: '600px', fontWeight: 500 }}>
              From initial strategy to high-performance code deployment and organic ranking.
            </p>
          </div>

          <div className="row g-4">
            {servicesList.map((service, idx) => (
              <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div
                  className="p-4 h-100 rounded-4 border position-relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '0 10px 30px var(--shadow-color)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3 text-white"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: service.color,
                      fontSize: '1.4rem',
                      boxShadow: `0 0 20px ${service.glow}`
                    }}
                  >
                    <i className={`bi ${service.icon}`}></i>
                  </div>

                  <h3
                    className="fw-black fs-5 mb-2"
                    style={{
                      fontWeight: 900,
                      background: service.headerGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-theme-secondary small mb-0 lh-base" style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. OUR STORY & BRAND EXPERIENCE */}
      {/* ============================================ */}
      <section className="py-5 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div
                className="position-relative overflow-hidden rounded-4 border"
                style={{
                  borderColor: 'var(--border-subtle)',
                  boxShadow: '0 20px 40px var(--shadow-color)'
                }}
              >
                <Image
                  src="/images/home-circle-image.png"
                  alt="AWebGrow Software & Mobile App Development Team"
                  width={600}
                  height={450}
                  className="w-100"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  className="position-absolute border rounded-4 p-3.5"
                  style={{
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'var(--bg-header)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'var(--border-subtle)'
                  }}
                >
                  <div className="text-gradient-pink-orange fw-black" style={{ fontSize: '2rem', fontWeight: 900 }}>150+</div>
                  <div className="text-theme-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>Projects Launched Worldwide</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div className="btn-secondary-glow px-3 py-1.5 rounded-pill mb-3">
                <span className="fw-bold text-uppercase small" style={{ letterSpacing: '0.12em', color: '#ff0080' }}>
                  ✦ ABOUT OUR JOURNEY
                </span>
              </div>

              <h2 className="display-6 fw-black mb-3 text-theme-primary" style={{ fontWeight: 900 }}>
                Transforming Ideas into High-Performance <span className="text-gradient-pink-orange" style={{ fontWeight: 900 }}>Digital Products</span>
              </h2>

              <p className="text-theme-secondary" style={{ lineHeight: '1.8', fontWeight: 500 }}>
                Founded in 2026, <strong>AWebGrow</strong> started with a mission to bridge technical gaps for scaling startups and enterprises. Headquartered in <strong>Nichlaul, Uttar Pradesh</strong> with direct presence in <strong>Noida</strong>, we deliver custom web apps, mobile solutions, and SEO strategies.
              </p>

              <p className="text-theme-secondary" style={{ lineHeight: '1.8', fontWeight: 500 }}>
                Whether it is building custom Web Applications using <strong>Next.js &amp; Node.js</strong>, crafting <strong>Native Mobile Apps</strong>, or scaling search rankings through technical SEO, we ensure your business grows systematically.
              </p>

              <div className="row g-3 mt-3">
                {[
                  { value: "150+", label: "Web Solutions", color: "#a855f7" },
                  { value: "50+", label: "Mobile Apps", color: "#ff0080" },
                  { value: "98%", label: "Client Success", color: "#10b981" }
                ].map((stat, idx) => (
                  <div className="col-4" key={idx}>
                    <div className="text-center p-3 rounded-4 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                      <h3 className="fw-black mb-0" style={{ color: stat.color, fontWeight: 900 }}>{stat.value}</h3>
                      <small className="text-theme-secondary fw-bold" style={{ fontSize: '0.72rem' }}>{stat.label}</small>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 4. TECH STACK GRID */}
      {/* ============================================ */}
      <section className="py-5 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container py-3">

          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-6 fw-black text-theme-primary mb-2" style={{ fontWeight: 900 }}>
              Powered by <span className="text-gradient-purple-blue" style={{ fontWeight: 900 }}>Modern Technologies</span>
            </h2>
            <p className="text-theme-secondary fw-medium mx-auto" style={{ maxWidth: '580px' }}>
              We leverage production-proven frameworks and cloud infrastructure for speed, security &amp; unlimited scale.
            </p>
          </div>

          <div className="row g-3 justify-content-center" data-aos="fade-up" data-aos-delay="100">
            {techCategories.map((tech, idx) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
                <div
                  className="p-3 rounded-4 border text-center h-100 d-flex flex-column align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '0 8px 20px var(--shadow-color)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className={`bi ${tech.icon} fs-3`} style={{ color: tech.color, filter: `drop-shadow(0 0 10px ${tech.color}80)` }}></i>
                  <span className="fw-black text-theme-primary small" style={{ fontSize: '0.82rem', fontWeight: 800 }}>
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================ */}
      {/* 5. OUR CORE VALUES */}
      {/* ============================================ */}
      <section className="py-5 position-relative border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container py-4">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-6 fw-black text-theme-primary mb-2" style={{ fontWeight: 900 }}>
              Why Clients <span className="text-gradient-pink-orange" style={{ fontWeight: 900 }}>Trust Us</span>
            </h2>
            <p className="text-theme-secondary fw-semibold">Built on principles that ensure engineering clarity and reliable delivery.</p>
          </div>

          <div className="row g-4">
            {coreValues.map((val, idx) => (
              <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div
                  className="p-4 h-100 rounded-4 border text-center text-md-start position-relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: val.borderColor,
                    boxShadow: `0 10px 30px ${val.glowColor}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
                    style={{
                      background: val.accentGradient,
                      opacity: 0.08,
                      filter: 'blur(30px)'
                    }}
                  />

                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3 rounded-3 text-white fs-3"
                    style={{
                      width: '52px',
                      height: '52px',
                      background: val.accentGradient,
                      boxShadow: `0 0 20px ${val.glowColor}`
                    }}
                  >
                    <i className={`bi ${val.icon}`}></i>
                  </div>

                  <h4 className="fw-black fs-6 text-theme-primary mb-2" style={{ fontWeight: 800 }}>{val.title}</h4>
                  <p className="text-theme-secondary small mb-0 lh-base" style={{ fontSize: '0.84rem', fontWeight: 500 }}>
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 6. OUR TEAM MEMBERS */}
      {/* ============================================ */}
      <TeamSection />

      {/* ============================================ */}
      {/* 7. LOCATIONS SECTION WITH TEAM TAGS */}
      {/* ============================================ */}
      <section className="py-5 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container py-3">
          <div className="text-center mb-4" data-aos="fade-up">
            <h2 className="fw-black mb-2 text-theme-primary" style={{ fontWeight: 900 }}>
              Where We <span className="text-gradient-purple-blue" style={{ fontWeight: 900 }}>Operate</span>
            </h2>
            <p className="text-theme-secondary fw-semibold">Reach out to our offices in India for project discussions.</p>
          </div>

          <div className="row g-4">
            {/* Noida Office - Sushant Rai Tag */}
            <div className="col-md-6" data-aos="fade-up">
              <div
                className="p-4 rounded-4 border h-100 d-flex flex-column justify-content-between position-relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'rgba(236, 72, 153, 0.35)',
                  boxShadow: '0 10px 30px var(--shadow-color)'
                }}
              >
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 text-white fs-4 rounded-3"
                      style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #ec4899, #f97316)' }}
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                      <h3 className="fw-black mb-0 text-theme-primary" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Noida Office</h3>
                      <p className="mb-0 text-theme-secondary" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        Noida, Uttar Pradesh - 201309, India
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-3 border mt-3 d-flex align-items-center gap-3"
                  style={{
                    backgroundColor: 'var(--bg-pill)',
                    borderColor: 'rgba(236, 72, 153, 0.2)'
                  }}
                >
                  <div className="position-relative flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Image
                      src="/images/team1.png"
                      alt="Sushant Rai"
                      fill
                      className="rounded-circle object-fit-cover border border-2 border-danger"
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '0.9rem' }}>Sushant Rai</h6>
                      <span className="badge rounded-pill text-white" style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)', fontSize: '0.62rem' }}>Founder</span>
                    </div>
                    <p className="small text-theme-secondary mb-0 mt-0.5" style={{ fontSize: '0.76rem', lineHeight: '1.3' }}>
                      SEO &amp; digital marketing expert driving growth strategies for clients across Noida.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Nichlaul HQ - hridesh Tag */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div
                className="p-4 rounded-4 border h-100 d-flex flex-column justify-content-between position-relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'rgba(168, 85, 247, 0.35)',
                  boxShadow: '0 10px 30px var(--shadow-color)'
                }}
              >
                <div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0 text-white fs-4 rounded-3"
                      style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                      <h3 className="fw-black mb-0 text-theme-primary" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Nichlaul HQ</h3>
                      <p className="mb-0 text-theme-secondary" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                        Nichlaul, Maharajganj, Uttar Pradesh - 273304, India
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="p-3 rounded-3 border mt-3 d-flex align-items-center gap-3"
                  style={{
                    backgroundColor: 'var(--bg-pill)',
                    borderColor: 'rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <div className="position-relative flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <Image
                      src="/images/team2.png"
                      alt="hridesh"
                      fill
                      className="rounded-circle object-fit-cover border border-2 border-primary"
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="fw-bold mb-0 text-theme-primary" style={{ fontSize: '0.9rem' }}>Hridesh Bharati</h6>
                      <span className="badge rounded-pill text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', fontSize: '0.62rem' }}>Founder &amp; Lead</span>
                    </div>
                    <p className="small text-theme-secondary mb-0 mt-0.5" style={{ fontSize: '0.76rem', lineHeight: '1.3' }}>
                      Full-stack &amp; LLM Developer specializing in Next.js, React &amp; MERN Stack. Building scalable AI-powered web solutions from Nichlaul.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* 8. CTA SECTION */}
      {/* ============================================ */}
      <section className="py-5 position-relative">
        <div className="container text-center py-4">
          <h2 className="display-6 fw-black text-theme-primary mb-3" style={{ fontWeight: 900 }}>
            Have a Web, App, or SEO <span className="text-gradient-pink-orange" style={{ fontWeight: 900 }}>Requirement?</span>
          </h2>
          <p className="mb-4 mx-auto text-theme-secondary" style={{ maxWidth: '580px', fontWeight: 500 }}>
            Let's build a custom web solution or feature-packed mobile application for your business today.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="btn-neon-cta py-3 px-4 fs-6"
            >
              <span>Start Your Project</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* SCHEMA DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About AWebGrow - Web & Mobile App Development Company",
            "description": "AWebGrow is a digital agency offering Web Development, Mobile App Development, UI/UX Design, and SEO Services in India.",
            "url": "https://www.awebgrow.com/about"
          })
        }}
      />
    </div>
  );
}