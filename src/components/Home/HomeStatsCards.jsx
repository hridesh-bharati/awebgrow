import React from 'react'

export default function HomeStatsCards() {
  const services = [
    "SEO Optimization", "Digital Marketing", "Full-Stack Coding", "Website Development",
    "UI/UX Design", "E-commerce Solutions", "Mobile App Development", "Cloud Hosting",
    "AI Integration", "Custom ERP Systems", "Brand Identity", "Social Media Management",
    "Content Writing", "Cybersecurity", "Database Management", "SaaS Development",
    "Performance Optimization", "PWA Development", "IT Consulting", "API Integration",
    "Tech Support", "Digital Transformation"
  ];

  return (
    <>
      <div className="services-marquee-container">
        {/* Left aur Right fade overlays */}
        <div className="marquee-overlay left-overlay"></div>
        <div className="marquee-overlay right-overlay"></div>

        <div className="marquee-content">
          {services.map((service, index) => (
            <React.Fragment key={`orig-${index}`}>
              <span>{service}</span>
              <i>•</i>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {services.map((service, index) => (
            <React.Fragment key={`dup-${index}`}>
              <span>{service}</span>
              <i>•</i>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        .services-marquee-container {
          width: 100%;
          height: 100px;
          background-color: #0a192f;
          color:white;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
        }

        /* Fade Overlays */
        .marquee-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15%; 
          z-index: 2;
          pointer-events: none;
        }

        .left-overlay {
          left: 0;
          background: linear-gradient(to right, #0a192f 20%, rgba(10, 25, 47, 0) 100%);
        }

        .right-overlay {
          right: 0;
          background: linear-gradient(to left, #0a192f 20%, rgba(10, 25, 47, 0) 100%);
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          gap: 40px;
          padding-right: 40px;
          animation: scroll-marquee 45s linear infinite;
        }

        /* Desktop Typography (Font family removed) */
        .marquee-content span {
          color: #64ffda;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .marquee-content i {
          color: #8892b0;
          font-style: normal;
          font-size: 18px;
        }

        @keyframes scroll-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }

        .services-marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        /* --- MOBILE RESPONSIVE STYLES --- */
        @media (max-width: 768px) {
          .services-marquee-container {
            height: 70px; /* Mobile par container ki height thodi kam ki */
          }
          
          .marquee-content {
            gap: 25px; /* Mobile par space kam kiya */
            padding-right: 25px;
          }

          .marquee-content span {
            font-size: 12px; /* Mobile par font chhota kiya */
            letter-spacing: 1px;
          }

          .marquee-content i {
            font-size: 14px; /* Dot ka size bhi chhota kiya */
          }

          .marquee-overlay {
            width: 20%; /* Chhoti screen par fade effect thoda behtar dikhne ke liye area badhaya */
          }
        }
      `}</style>
    </>
  )
}