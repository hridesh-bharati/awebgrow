"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    name: "Shushant Rai",
    role: "Co-Founder & Strategist",
    image: "/images/team1.jpg",
    bio: "Specializes in data-driven brand scaling, conversion rate optimization (CRO), and building targeted social media growth engines.",
    github: "#",
    linkedin: "https://linkedin.com/in/shushant-rai",
    whatsapp: "https://wa.me/919304556165",
    phone: "+919304556165",
    email: "sushantkumar867695@gmail.com",
    expertise: ["Digital Strategy", "SEO", "CRO", "Social Media"],
    accentColor: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
    glowColor: "rgba(236, 72, 153, 0.2)"
  },
  {
    name: "hridesh",
    role: "Founder & Lead Developer",
    image: "/images/team2.png",  
    bio: "Expert in architecting scalable MERN stack ecosystems, Native-UI optimizations, and technical SEO architectures that dominate search rankings.",
    github: "https://github.com/hridesh-bharati",
    linkedin: "https://linkedin.com/in/hridesh-bharati",
    whatsapp: "https://wa.me/917267995307",
    phone: "+917267995307",
    email: "hridesh027@gmail.com",
    expertise: ["MERN Stack", "Next.js", "SEO", "API Design"],
    accentColor: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
    glowColor: "rgba(168, 85, 247, 0.2)"
  },
  {
    name: "Shushil Kandu",
    role: "MERN Stack Developer",
    image: "/images/team3.jpg",
    bio: "Passionate engineer focusing on robust backend logic, secure RESTful APIs, and responsive, interactive frontend workflows.",
    github: "https://github.com/shushil-kandu",
    linkedin: "https://linkedin.com/in/shushil-kandu",
    whatsapp: "https://wa.me/916394521336",
    phone: "+916394521336",
    email: "kandusushil9@gmail.com",
    expertise: ["React", "Node.js", "MongoDB", "Express"],
    accentColor: "#00f2fe",
    gradient: "linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)",
    glowColor: "rgba(0, 242, 254, 0.2)"
  }
];

export default function TeamClient() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <main className="min-vh-100 py-5 bg-theme-main text-theme-primary position-relative overflow-hidden" id="our-team">
      
      {/* ─── AMBIENT NEON SPHERES ─── */}
      <div 
        className="position-absolute rounded-circle pointer-events-none" 
        style={{ 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)', 
          filter: 'blur(100px)', 
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)'
        }} 
      />

      <style jsx global>{`
        .team-clean-card {
          background-color: var(--bg-card) !important;
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          transition: all 0.35s ease;
        }

        .team-clean-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .team-social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          background: var(--bg-pill);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .team-social-icon:hover {
          color: #ffffff !important;
          transform: translateY(-3px);
        }

        .colorful-heading-blue-cyan {
          background: linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="container py-4 position-relative z-2">
        
        {/* HEADER SECTION */}
        <div className="text-center my-4" data-aos="fade-up">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#00f2fe', borderRadius: '50%', boxShadow: '0 0 10px #00f2fe' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#00f2fe', fontWeight: 800 }}>
              👥 THE ARCHITECTS BEHAVIOR
            </span>
          </div>

          <h1 
            className="display-4 fw-black mb-3 text-theme-primary" 
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Meet Our <span className="colorful-heading-blue-cyan" style={{ fontWeight: 900 }}>Expert Team</span>
          </h1>

          <p className="mx-auto text-theme-secondary fs-5" style={{ maxWidth: '620px', fontWeight: 500 }}>
            We are a passionate collective of developers, engineers, and digital strategists dedicated to crafting flawless web &amp; mobile solutions.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="row g-4 justify-content-center mt-3">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 150}>
                
                {/* CLEAN LIGHT BORDER CARD */}
                <div 
                  className="team-clean-card h-100 p-4 pt-5 d-flex flex-column align-items-center text-center position-relative overflow-hidden"
                  style={{
                    boxShadow: isHovered ? `0 15px 35px ${member.glowColor}` : '0 10px 30px var(--shadow-color)',
                    transform: isHovered ? 'translateY(-6px)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  
                  {/* AVATAR RING */}
                  <div className="position-relative mb-4" style={{ width: '130px', height: '130px' }}>
                    <div 
                      className="position-absolute rounded-circle" 
                      style={{ 
                        inset: '-4px', 
                        background: member.gradient,
                        opacity: isHovered ? 1 : 0.3,
                        transition: 'all 0.35s ease'
                      }} 
                    />
                    <div className="position-relative rounded-circle overflow-hidden border border-3 border-dark h-100 w-100">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        sizes="130px" 
                        className="object-fit-cover" 
                        priority={index === 0} 
                      />
                    </div>
                  </div>

                  {/* MEMBER DETAILS */}
                  <div className="w-100 mb-auto">
                    <h3 className="h5 fw-black mb-1 text-theme-primary" style={{ fontWeight: 900 }}>
                      {member.name}
                    </h3>

                    {/* ROLE BADGE */}
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <span 
                        className="px-3 py-1 rounded-pill text-white fw-black" 
                        style={{ 
                          background: member.gradient,
                          fontSize: '0.7rem', 
                          letterSpacing: '0.04em',
                          fontWeight: 800
                        }}
                      >
                        {member.role}
                      </span>
                    </div>

                    {/* BIO */}
                    <p className="text-theme-secondary small px-1 mb-4" style={{ lineHeight: '1.6', fontSize: '0.84rem', fontWeight: 500 }}>
                      {member.bio}
                    </p>

                    {/* SKILLS PILLS */}
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                      {member.expertise.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 rounded-pill fw-bold" 
                          style={{
                            backgroundColor: 'var(--bg-pill)',
                            fontSize: '0.72rem',
                            color: member.accentColor,
                            border: `1px solid ${member.accentColor}30`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SOCIAL LINKS STRIP */}
                  <div className="d-flex justify-content-center gap-2 pt-3 w-100 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                    {member.github && member.github !== "#" && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="team-social-icon"
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#181717'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-pill)'; }}
                      >
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0a66c2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-pill)'; }}
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a 
                      href={member.whatsapp} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-pill)'; }}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ea4335'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-pill)'; }}
                    >
                      <i className="bi bi-envelope-fill"></i>
                    </a>
                  </div>

                  {/* CALL BUTTON */}
                  <a 
                    href={`tel:${member.phone}`} 
                    className="btn w-100 mt-4 rounded-pill fw-black text-white d-flex align-items-center justify-content-center border-0"
                    style={{ 
                      background: member.gradient,
                      padding: '11px',
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="bi bi-telephone-fill me-2"></i>Call {member.name.split(' ')[0]}
                  </a>

                </div>

              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}