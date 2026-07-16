'use client'

import { FaRocket, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const features = [
  { 
    icon: <FaRocket size={20} />, 
    title: "Fast Delivery", 
    description: "Agile development methodology ensuring quick project completion",
    gradient: "linear-gradient(135deg, #f43f5e, #be123c)", // Rose Gradient
    delay: 100
  },
  { 
    icon: <FaUsers size={20} />, 
    title: "Expert Team", 
    description: "Skilled professionals with years of industry experience",
    gradient: "linear-gradient(135deg, #10b981, #047857)", // Emerald Gradient
    delay: 200
  },
  { 
    icon: <FaClock size={20} />, 
    title: "24/7 Support", 
    description: "Round-the-clock technical support and maintenance",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)", // Violet Gradient
    delay: 300
  },
  { 
    icon: <FaAward size={20} />, 
    title: "Quality Assured", 
    description: "Industry-standard quality checks and testing procedures",
    gradient: "linear-gradient(135deg, #f97316, #c2410c)", // Orange Gradient
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
      className="py-5 lg:py-6 position-relative overflow-hidden" 
      id="why-choose-us"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Decorative top divider line for light theme */}
      <div className="position-absolute top-0 start-0 w-100" style={{ height: '1px', background: 'rgba(0,0,0,0.05)' }} />

      {/* Dynamic Structural Blurred Radial Spots - Soft Cyan Light */}
      <div 
        className="position-absolute top-50 start-0 translate-middle-y d-none d-md-block" 
        style={{ 
          width: '500px', 
          height: '500px', 
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)', 
          filter: 'blur(80px)', 
          pointerEvents: 'none',
          left: '-150px'
        }} 
      />

      <div className="container py-4 position-relative z-1">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* Left Column: Typography Content & Asynchronous Colorful Grid */}
          <div className="col-lg-6 text-center text-lg-start">
            <span 
              className="badge rounded-pill px-3 py-2 mb-3 fw-bold shadow-sm" 
              style={{ 
                fontSize: '0.72rem', 
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(225, 29, 72, 0.08)',
                color: '#e11d48',
                border: '1px solid rgba(225, 29, 72, 0.15)'
              }}
              data-aos="fade-up"
              data-aos-delay="50"
            >
              🛡️ WHY COOPERATE WITH US
            </span>
            
            <h2 
              className="display-5 fw-bold tracking-tight mb-3"
              style={{ color: '#0f172a' }} // Slate 900
              data-aos="fade-up"
              data-aos-delay="100"
            >
              We Build <span className="text-gradient-rose" style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Architecture</span>
            </h2>
            
            <p 
              className="fs-6 mb-4 mx-auto mx-lg-0" 
              style={{ maxWidth: '560px', lineHeight: '1.6', color: '#475569' }} // Slate 600
              data-aos="fade-up"
              data-aos-delay="150"
            >
              With deep structural engineering expertise, we configure highly resilient web assets and scalable native components optimized to support long-term traffic and computational density.
            </p>
            
            {/* Interactive Colorful Grid System */}
            <div className="row g-3 text-start mt-2">
              {features.map((feature, index) => (
                <div className="col-sm-6" key={index}>
                  <div 
                    className="p-4 h-100 position-relative overflow-hidden shadow-sm feature-card" 
                    style={{
                      background: feature.gradient,
                      borderRadius: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    data-aos="fade-up"
                    data-aos-delay={feature.delay}
                  >
                    <div className="d-flex align-items-start gap-3">
                      {/* Glassmorphism Icon Container */}
                      <div className="d-flex align-items-center justify-content-center text-white flex-shrink-0" 
                           style={{ 
                             background: 'rgba(255, 255, 255, 0.2)', 
                             backdropFilter: 'blur(4px)',
                             width: '42px', 
                             height: '42px', 
                             borderRadius: '12px',
                             border: '1px solid rgba(255, 255, 255, 0.25)' 
                           }}>
                        {feature.icon}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                          {feature.title}
                        </h6>
                        <p className="small m-0 lh-sm text-white-50" style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Asynchronous Mosaic Tech Image Gallery */}
          <div className="col-lg-6 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="row g-3 align-items-end">
              
              {/* Left Row of Grid */}
              <div className="col-6">
                {/* Image 1: Coding / Web Development */}
                <div className="mb-3 overflow-hidden shadow" style={{ borderRadius: '24px', aspectRatio: '1/1' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" 
                    alt="Web Development Coding" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
                {/* Image 2: Digital Marketing Analytics */}
                <div className="overflow-hidden shadow ms-auto" style={{ borderRadius: '24px', aspectRatio: '1/1', width: '85%' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80" 
                    alt="Digital Marketing and SEO Strategy" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
              </div>

              {/* Right Row of Grid */}
              <div className="col-6">
                {/* Image 3: Modern UI/UX Design & Architecture */}
                <div className="mb-3 overflow-hidden shadow" style={{ borderRadius: '24px', aspectRatio: '4/5' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" 
                    alt="Digital Architecture and Tech Design" 
                    className="w-100 h-100 object-fit-cover mosaic-img" 
                  />
                </div>
                {/* Image 4: SEO Ranking & Data Optimization */}
                <div className="overflow-hidden shadow" style={{ borderRadius: '24px', aspectRatio: '1/1' }}>
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

      {/* Smooth Hover Effects Styles */}
      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.15) !important;
        }
        .mosaic-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mosaic-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}