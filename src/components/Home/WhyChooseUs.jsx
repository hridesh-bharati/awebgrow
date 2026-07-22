'use client';

import { FaRocket, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  { 
    icon: <FaRocket size={18} />, 
    title: "Fast Delivery", 
    description: "Agile development methodology ensuring quick project completion.",
    borderColor: "rgba(244, 63, 94, 0.35)",
    accentColor: "#f43f5e",
    delay: 100
  },
  { 
    icon: <FaUsers size={18} />, 
    title: "Expert Team", 
    description: "Skilled professionals with years of industry experience.",
    borderColor: "rgba(16, 185, 129, 0.35)",
    accentColor: "#10b981",
    delay: 200
  },
  { 
    icon: <FaClock size={18} />, 
    title: "24/7 Support", 
    description: "Round-the-clock technical support and maintenance.",
    borderColor: "rgba(168, 85, 247, 0.35)",
    accentColor: "#a855f7",
    delay: 300
  },
  { 
    icon: <FaAward size={18} />, 
    title: "Quality Assured", 
    description: "Industry-standard quality checks and testing procedures.",
    borderColor: "rgba(249, 115, 22, 0.35)",
    accentColor: "#f97316",
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
      className="py-5 position-relative overflow-hidden" 
      id="why-choose-us"
      style={{ 
        backgroundColor: '#0d0f17', // Distinct dark tone to separate from Hero (#090a0f)
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)' // Clear boundary line
      }}
    >
      {/* GLOWING GRADIENT TOP DIVIDER LINE */}
      <div 
        className="position-absolute top-0 start-50 translate-middle-x w-75" 
        style={{ 
          height: '1px', 
          background: 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.5) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)'
        }} 
      />

      {/* SECTION SPHERES */}
      <div 
        className="position-absolute rounded-circle" 
        style={{ 
          width: '350px', 
          height: '350px', 
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)', 
          filter: 'blur(70px)', 
          top: '20%',
          left: '-5%',
          pointerEvents: 'none',
        }} 
      />

      <div className="container py-4 position-relative z-1">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* LEFT COLUMN: TEXT CONTENT & CARDS */}
          <div className="col-lg-6 text-center text-lg-start">
            
            {/* BADGE */}
            <div 
              className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                backdropFilter: 'blur(8px)',
              }}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <span className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
              <span className="fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: '#d8b4fe' }}>
                🛡️ WHY COOPERATE WITH US
              </span>
            </div>
            
            {/* HEADING */}
            <h2 
              className="display-6 fw-bold tracking-tight mb-3 text-white"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              We Build{' '}
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}
              >
                Digital Architecture
              </span>
            </h2>
            
            {/* DESCRIPTION */}
            <p 
              className="fs-6 mb-4 mx-auto mx-lg-0" 
              style={{ maxWidth: '560px', lineHeight: '1.6', color: '#94a3b8', fontSize: '0.92rem' }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              With deep structural engineering expertise, we configure highly resilient web assets and scalable native components optimized to support long-term traffic and computational density.
            </p>
            
            {/* CARDS GRID */}
            <div className="row g-3 text-start mt-2">
              {features.map((feature, index) => (
                <div className="col-sm-6" key={index}>
                  <div 
                    className="p-3.5 h-100 position-relative overflow-hidden why-card-item" 
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderRadius: '16px',
                      border: `1px solid ${feature.borderColor}`,
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    data-aos="fade-up"
                    data-aos-delay={feature.delay}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div 
                        className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" 
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.05)', 
                          width: '40px', 
                          height: '40px', 
                          border: `1px solid ${feature.borderColor}`,
                          color: feature.accentColor
                        }}
                      >
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '0.9rem' }}>
                          {feature.title}
                        </h6>
                        <p className="small m-0 lh-sm" style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: GALLERY WITH DISTINCT ELEVATION */}
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="row g-3 align-items-end p-2 rounded-4" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
              
              {/* Left Row */}
              <div className="col-6">
                <div 
                  className="mb-3 overflow-hidden shadow-lg position-relative mosaic-box" 
                  style={{ borderRadius: '18px', aspectRatio: '1/1', border: '1px solid rgba(168, 85, 247, 0.25)' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" 
                    alt="Web Development Coding" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
                <div 
                  className="overflow-hidden shadow-lg ms-auto mosaic-box" 
                  style={{ borderRadius: '18px', aspectRatio: '1/1', width: '85%', border: '1px solid rgba(236, 72, 153, 0.25)' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80" 
                    alt="Digital Marketing and SEO Strategy" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
              </div>

              {/* Right Row */}
              <div className="col-6">
                <div 
                  className="mb-3 overflow-hidden shadow-lg mosaic-box" 
                  style={{ borderRadius: '18px', aspectRatio: '4/5', border: '1px solid rgba(59, 130, 246, 0.25)' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" 
                    alt="Digital Architecture and Tech Design" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
                <div 
                  className="overflow-hidden shadow-lg mosaic-box" 
                  style={{ borderRadius: '18px', aspectRatio: '1/1', border: '1px solid rgba(249, 115, 22, 0.25)' }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80" 
                    alt="SEO Data Analysis" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .why-card-item:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        .mosaic-img {
          transition: transform 0.5s ease;
        }
        .mosaic-box:hover .mosaic-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}