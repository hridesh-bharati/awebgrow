"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    name: "Sushant Rai",
    role: "Founder & Strategist",
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
    glowColor: "rgba(236, 72, 153, 0.25)"
  },
  {
    name: "Hridesh Bharati",
    role: "Android • Native • PWA • WebApp Developer",
    image: "/images/team2.png",  
    bio: "Expert in architecting scalable MERN stack ecosystems, Native-UI optimizations, and technical SEO architectures. Specializes in cross-platform mobile development and progressive web apps.",
    github: "https://github.com/hridesh-bharati",
    linkedin: "https://linkedin.com/in/hridesh-bharati",
    whatsapp: "https://wa.me/917267995307",
    phone: "+917267995307",
    email: "hridesh027@gmail.com",
    expertise: ["Android", "React Native", "PWA", "WebApp", "MERN Stack", "Next.js"],
    accentColor: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
    glowColor: "rgba(168, 85, 247, 0.25)"
  },
  {
    name: "Sushil Kandu",
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
    glowColor: "rgba(0, 242, 254, 0.25)"
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
    <main className="min-vh-100 py-5 text-white position-relative overflow-hidden" id="our-team" style={{ backgroundColor: '#020205' }}>
      
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />

      <style jsx global>{`
        .team-clean-card {
          background-color: rgba(15, 16, 26, 0.75) !important;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-clean-card:hover {
          border-color: var(--accent-border, rgba(168, 85, 247, 0.4));
          transform: translateY(-6px);
        }

        .team-social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.04);
          color: #9ca3af;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .team-social-icon:hover {
          color: #ffffff !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .colorful-heading-blue-cyan {
          background: linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-badge {
          font-size: 0.72rem;
          letter-spacing: 0.03em;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 50px;
          display: inline-block;
          line-height: 1.4;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .expertise-pill {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 50px;
          transition: all 0.25s ease;
          cursor: default;
          background: rgba(255, 255, 255, 0.03);
        }

        .expertise-pill:hover {
          transform: scale(1.06);
          background: rgba(255, 255, 255, 0.07);
        }

        .call-btn {
          padding: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .call-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .avatar-ring {
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
      `}</style>

      <div className="container py-4 position-relative z-2">
        
        {/* HEADER SECTION */}
        <div className="text-center my-4" data-aos="fade-up">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(0, 242, 254, 0.06)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#00f2fe', borderRadius: '50%', boxShadow: '0 0 10px #00f2fe' }} />
            <span className="text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#00f2fe', fontWeight: 800 }}>
              👥 THE ARCHITECTS BEHIND
            </span>
          </div>

          <h1 
            className="display-4 fw-black mb-3 text-white" 
            style={{ fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Meet Our <span className="colorful-heading-blue-cyan">Expert Team</span>
          </h1>

          <p className="mx-auto fs-5" style={{ maxWidth: '620px', fontWeight: 500, color: '#9ca3af' }}>
            We are a passionate collective of developers, engineers, and digital strategists dedicated to crafting flawless web &amp; mobile solutions.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="row g-4 justify-content-center mt-3">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 150}>
                
                {/* CYBERPUNK CARD */}
                <div 
                  className="team-clean-card h-100 p-4 pt-5 d-flex flex-column align-items-center text-center position-relative overflow-hidden"
                  style={{
                    boxShadow: isHovered ? `0 20px 40px ${member.glowColor}` : '0 10px 30px rgba(0, 0, 0, 0.5)',
                    ['--accent-border' as string]: member.accentColor
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  
                  {/* AVATAR RING */}
                  <div className="position-relative mb-4" style={{ width: '130px', height: '130px' }}>
                    <div 
                      className="position-absolute rounded-circle avatar-ring" 
                      style={{ 
                        inset: '-4px', 
                        background: member.gradient,
                        opacity: isHovered ? 1 : 0.35,
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)'
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
                  <div className="w-100 mb-auto d-flex flex-column align-items-center">
                    <h3 className="h5 mb-2 text-white" style={{ fontWeight: 900, letterSpacing: '-0.01em' }}>
                      {member.name}
                    </h3>

                    {/* ROLE BADGE */}
                    <div className="mb-3 w-100 px-2">
                      <span 
                        className="role-badge text-white" 
                        style={{ 
                          background: member.gradient,
                        }}
                      >
                        {member.role}
                      </span>
                    </div>

                    {/* BIO */}
                    <p className="small px-1 mb-4" style={{ lineHeight: '1.65', fontSize: '0.84rem', fontWeight: 500, color: '#9ca3af' }}>
                      {member.bio}
                    </p>

                    {/* SKILLS PILLS */}
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                      {member.expertise.map((skill, i) => (
                        <span 
                          key={i} 
                          className="expertise-pill" 
                          style={{
                            color: member.accentColor,
                            border: `1px solid ${member.accentColor}35`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SOCIAL LINKS STRIP */}
                  <div className="d-flex justify-content-center gap-2 pt-3 w-100 border-top" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    {member.github && member.github !== "#" && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="team-social-icon"
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#181717'; e.currentTarget.style.borderColor = '#181717'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                      >
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0a66c2'; e.currentTarget.style.borderColor = '#0a66c2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a 
                      href={member.whatsapp} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; e.currentTarget.style.borderColor = '#25D366'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <a 
                      href={`mailto:${member.email}`} 
                      className="team-social-icon"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ea4335'; e.currentTarget.style.borderColor = '#ea4335'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                      <i className="bi bi-envelope-fill"></i>
                    </a>
                  </div>

                  {/* CALL BUTTON */}
                  <a 
                    href={`tel:${member.phone}`} 
                    className="btn w-100 mt-4 rounded-pill text-white d-flex align-items-center justify-content-center call-btn"
                    style={{ 
                      background: member.gradient,
                      boxShadow: `0 4px 18px ${member.glowColor}`
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