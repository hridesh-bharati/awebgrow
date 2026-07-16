"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer";

const teamMembers = [
  {
    name: "Shushant Rai [Founder]",
    role: "Digital Marketing Head & Strategist",
    image: "/images/team1.jpg",
    bio: "Specializes in data-driven brand scaling, conversion rate optimization (CRO), and building targeted social media growth engines.",
    github: "#",
    linkedin: "https://linkedin.com/in/shushant-rai",
    whatsapp: "https://wa.me/919304556165",
    phone: "+919304556165",
    email: "sushantkumar867695@gmail.com",
    expertise: ["Digital Strategy", "SEO", "CRO", "Social Media"],
    accentColor: "#7f00ff",
    gradient: "linear-gradient(135deg, #7f00ff 0%, #a855f7 100%)",
  },
  {
    name: "Hridesh Bharati",
    role: "Full-Stack Developer & SEO Specialist",
    image: "/images/team2.png",  
    bio: "Expert in architecting scalable MERN stack ecosystems, Native-UI optimizations, and technical SEO architectures that dominate search rankings.",
    github: "https://github.com/hridesh-bharati",
    linkedin: "https://linkedin.com/in/hridesh-bharati",
    whatsapp: "https://wa.me/917267995307",
    phone: "+917267995307",
    email: "hridesh027@gmail.com",
    expertise: ["MERN Stack", "Next.js", "SEO", "API Design"],
    accentColor: "#ff007f",
    gradient: "linear-gradient(135deg, #ff007f 0%, #f472b6 100%)",
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
    accentColor: "#0072ff",
    gradient: "linear-gradient(135deg, #0072ff 0%, #38bdf8 100%)",
  }
];

export default function TeamClient() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 50,
    });
  }, []);

  return (
    <main className="min-vh-100 pt-5" style={{ 
      background: 'linear-gradient(135deg, #bfb4ff60 0%, #fefaff 50%, #90ffa8 100%)'
    }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

      <div className="container py-4">
        
        {/* Header Section */}
        <div className="text-center my-5" data-aos="fade-up">
          <span className="badge px-4 py-2 rounded-pill fw-bold mb-3 shadow-sm" style={{ 
            background: 'linear-gradient(135deg, #7f00ff 0%, #ff007f 100%)', 
            color: 'white', 
            fontSize: '0.8rem', 
            letterSpacing: '0.08em'
          }}>
            <i className="bi bi-people-fill me-2"></i>THE ARCHITECTS
          </span>
          <h1 className="display-4 fw-black mb-3" style={{ 
            color: '#0f172a',
            letterSpacing: '-0.02em'
          }}>
            Meet Our Expert Team
          </h1>
          <p className="mx-auto fs-5 text-secondary" style={{ 
            maxWidth: '600px',
            color: '#64748b'
          }}>
            We are a passionate collective of developers, innovators, and strategists dedicated to crafting flawless digital ecosystems.
          </p>
        </div>

        {/* Team Grid */}
        <div className="row g-4 justify-content-center mt-5">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 150}>
              <div 
                className="card h-100 border-0 overflow-hidden text-center p-0 position-relative"
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  boxShadow: hoveredIndex === index 
                    ? `0 20px 50px ${member.accentColor}25` 
                    : '0 10px 30px rgba(0, 0, 0, 0.06)',
                  transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient Top Border */}
                <div className="position-absolute top-0 start-0 end-0" style={{ 
                  height: '4px', 
                  background: member.gradient,
                  zIndex: 3
                }} />

                <div className="card-body p-4 pt-5 d-flex flex-column align-items-center position-relative" style={{ zIndex: 2 }}>
                  
                  {/* Profile Image Ring */}
                  <div className="position-relative mb-4" style={{ width: '140px', height: '140px' }}>
                    <div className="position-absolute rounded-circle" style={{ 
                      inset: '-4px', 
                      background: member.gradient,
                      opacity: 0.15,
                      transition: 'all 0.4s ease'
                    }} />
                    <div className="position-relative rounded-circle overflow-hidden border border-3 border-white h-100 w-100 shadow-sm">
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        sizes="140px" 
                        className="object-fit-cover" 
                        priority={index === 0} 
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="w-100 mb-auto">
                    <h3 className="h5 fw-bold mb-2" style={{ color: '#0f172a' }}>
                      {member.name}
                    </h3>
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <span className="px-3 py-1 rounded-pill text-white" style={{ 
                        background: member.gradient,
                        fontSize: '0.7rem', 
                        fontWeight: '600',
                        letterSpacing: '0.02em'
                      }}>
                        {member.role}
                      </span>
                    </div>

                    <p className="text-secondary small px-2 mb-4" style={{ 
                      lineHeight: '1.6',
                      color: '#64748b'
                    }}>
                      {member.bio}
                    </p>

                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-pill fw-medium" style={{
                          background: `${member.accentColor}10`,
                          fontSize: '0.7rem',
                          color: member.accentColor,
                          border: `1px solid ${member.accentColor}15`
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="d-flex justify-content-center gap-2 pt-3 w-100" style={{ 
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    {member.github && member.github !== "#" && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="social-btn github">
                        <i className="bi bi-github"></i>
                      </a>
                    )}
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="social-btn linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href={member.whatsapp} target="_blank" rel="noreferrer" className="social-btn whatsapp">
                      <i className="bi bi-whatsapp"></i>
                    </a>
                    <a href={`mailto:${member.email}`} className="social-btn email">
                      <i className="bi bi-envelope-fill"></i>
                    </a>
                  </div>

                  {/* Call Button */}
                  <a 
                    href={`tel:${member.phone}`} 
                    className="btn w-100 mt-4 rounded-pill fw-semibold text-white shadow-sm d-flex align-items-center justify-content-center"
                    style={{ 
                      background: member.gradient,
                      border: 'none',
                      padding: '11px',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 8px 25px ${member.accentColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }}
                  >
                    <i className="bi bi-telephone-fill me-2"></i>Call {member.name.split(' ')[0]}
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fw-black { font-weight: 900; }
        
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
        }
        
        .social-btn.github { 
          background: #f1f5f9; 
          color: #334155; 
          border: 1px solid #e2e8f0; 
        }
        .social-btn.linkedin { 
          background: #e0f2fe; 
          color: #0a66c2; 
          border: 1px solid #bae6fd; 
        }
        .social-btn.whatsapp { 
          background: #dcfce7; 
          color: #25D366; 
          border: 1px solid #bbf7d0; 
        }
        .social-btn.email { 
          background: #fee2e2; 
          color: #ea4335; 
          border: 1px solid #fecaca; 
        }
        
        .social-btn:hover {
          transform: translateY(-3px) scale(1.05);
          color: #fff !important;
        }
        .social-btn.github:hover { 
          background: #1e293b; 
          border-color: #1e293b;
          box-shadow: 0 6px 20px rgba(30,41,59,0.3);
        }
        .social-btn.linkedin:hover { 
          background: #0a66c2; 
          border-color: #0a66c2;
          box-shadow: 0 6px 20px rgba(10,102,194,0.3);
        }
        .social-btn.whatsapp:hover { 
          background: #25D366; 
          border-color: #25D366;
          box-shadow: 0 6px 20px rgba(37,211,102,0.3);
        }
        .social-btn.email:hover { 
          background: #ea4335; 
          border-color: #ea4335;
          box-shadow: 0 6px 20px rgba(234,67,53,0.3);
        }
      `}</style>
      <Footer />
    </main>
  );
}