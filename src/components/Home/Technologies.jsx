'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker, 
  FaAws, 
  FaGitAlt, 
  FaJenkins, 
  FaLinux 
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiMongodb, 
  SiPostgresql, 
  SiTypescript, 
  SiGraphql, 
  SiRedis, 
  SiElasticsearch, 
  SiKubernetes, 
  SiTerraform, 
  SiPrometheus, 
  SiGrafana 
} from 'react-icons/si';

const technologies = [
  { icon: <FaReact size={32} />, name: "React", color: "#61DAFB", bg: "rgba(97, 218, 251, 0.15)" },
  { icon: <SiNextdotjs size={32} />, name: "Next.js", color: "#ffffff", bg: "rgba(255, 255, 255, 0.1)" },
  { icon: <FaNodeJs size={32} />, name: "Node.js", color: "#339933", bg: "rgba(51, 153, 51, 0.15)" },
  { icon: <SiTailwindcss size={32} />, name: "Tailwind", color: "#06B6D4", bg: "rgba(6, 182, 212, 0.15)" },
  { icon: <SiMongodb size={32} />, name: "MongoDB", color: "#47A248", bg: "rgba(71, 162, 72, 0.15)" },
  { icon: <SiPostgresql size={32} />, name: "PostgreSQL", color: "#4169E1", bg: "rgba(65, 105, 225, 0.15)" },
  { icon: <FaPython size={32} />, name: "Python", color: "#3776AB", bg: "rgba(55, 118, 171, 0.15)" },
  { icon: <FaDocker size={32} />, name: "Docker", color: "#2496ED", bg: "rgba(36, 150, 237, 0.15)" },
  { icon: <FaAws size={32} />, name: "AWS", color: "#FF9900", bg: "rgba(255, 153, 0, 0.15)" },
  { icon: <FaGitAlt size={32} />, name: "Git", color: "#F05032", bg: "rgba(240, 80, 50, 0.15)" }
];

const techStack = [
  { icon: <SiNextdotjs />, name: "Next.js", color: "#ffffff" },
  { icon: <FaReact />, name: "React", color: "#61DAFB" },
  { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
  { icon: <FaNodeJs />, name: "Node.js", color: "#339933" },
  { icon: <SiTailwindcss />, name: "Tailwind", color: "#06B6D4" },
  { icon: <SiGraphql />, name: "GraphQL", color: "#E10098" },
  { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
  { icon: <SiPostgresql />, name: "PostgreSQL", color: "#4169E1" },
  { icon: <SiRedis />, name: "Redis", color: "#DC382D" },
  { icon: <SiElasticsearch />, name: "ElasticSearch", color: "#005571" },
  { icon: <FaAws />, name: "AWS", color: "#FF9900" },
  { icon: <FaDocker />, name: "Docker", color: "#2496ED" },
  { icon: <SiKubernetes />, name: "Kubernetes", color: "#326CE5" },
  { icon: <SiTerraform />, name: "Terraform", color: "#7B42BC" },
  { icon: <FaGitAlt />, name: "Git", color: "#F05032" },
  { icon: <FaJenkins />, name: "Jenkins", color: "#D24939" },
  { icon: <SiPrometheus />, name: "Prometheus", color: "#E6522C" },
  { icon: <SiGrafana />, name: "Grafana", color: "#F46800" },
  { icon: <FaLinux />, name: "Linux", color: "#FCC624" },
  { icon: <FaPython />, name: "Python", color: "#3776AB" },
];

export default function Technologies() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Double the array for seamless scrolling
  const doubledTechnologies = [...technologies, ...technologies, ...technologies];

  return (
    <section id="technologies" className="position-relative overflow-hidden" style={{ 
      background: 'linear-gradient(180deg, #0a0e1a 0%, #0f1a2e 50%, #0d1525 100%)',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      
      {/* ─── AMBIENT GLOW BACKDROP ─── */}
      <div className="position-absolute top-50 start-50 rounded-circle" style={{
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12), transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)'
      }}></div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 rounded-pill px-4 py-2 mb-3 fw-bold" style={{ 
            fontSize: '0.7rem', 
            letterSpacing: '0.1em',
            color: '#818cf8 !important',
            borderColor: 'rgba(129, 140, 248, 0.2) !important',
            background: 'rgba(129, 140, 248, 0.1) !important'
          }}>
            ⚡ TECH ECOSYSTEM
          </span>
          <h2 className="display-5 fw-bold mb-3" style={{ color: '#f1f5f9' }}>
            Tools We <span className="gradient-text">Use</span>
          </h2>
          <p className="text-white mx-auto fs-6" style={{ maxWidth: '500px' }}>
            Cutting-edge technologies for modern web development
          </p>
        </div>

        {/* ─── MARQUEE WITH GLASS CARDS ─── */}
        <div 
          className="marquee-wrapper position-relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade effects */}
          <div className="fade-overlay fade-left"></div>
          <div className="fade-overlay fade-right"></div>

          <div 
            className="marquee-track d-flex"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              width: 'max-content'
            }}
          >
            {doubledTechnologies.map((tech, index) => (
              <div 
                className="marquee-item flex-shrink-0" 
                key={index}
                style={{ width: '150px', marginRight: '20px' }}
              >
                <div 
                  className="glass-tech-card text-center p-4 h-100 d-flex flex-column align-items-center justify-content-center"
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{
                    background: hoveredTech === index 
                      ? 'rgba(30, 41, 59, 0.95)'
                      : 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: hoveredTech === index 
                      ? `2px solid ${tech.color}`
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: hoveredTech === index
                      ? `0 20px 60px ${tech.color}20, 0 0 0 1px ${tech.color}15`
                      : '0 8px 32px rgba(0,0,0,0.3)',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: hoveredTech === index ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                    cursor: 'default',
                    minHeight: '140px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* ─── GLOW ORB ─── */}
                  <div 
                    className="position-absolute rounded-circle"
                    style={{
                      width: '120px',
                      height: '120px',
                      background: tech.color,
                      opacity: hoveredTech === index ? 0.15 : 0,
                      filter: 'blur(40px)',
                      transition: 'opacity 0.4s ease',
                      pointerEvents: 'none'
                    }}
                  ></div>

                  {/* ─── ICON ─── */}
                  <div 
                    className="d-flex align-items-center justify-content-center mb-2 position-relative"
                    style={{
                      fontSize: '36px',
                      color: tech.color,
                      transition: 'transform 0.4s ease'
                    }}
                  >
                    {tech.icon}
                  </div>
                  
                  <p className="m-0 fw-bold" style={{ 
                    color: hoveredTech === index ? tech.color : '#e2e8f0',
                    fontSize: '0.85rem',
                    letterSpacing: '0.02em',
                    transition: 'color 0.3s ease'
                  }}>
                    {tech.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TECH STACK SECTION ─── */}
      <section className="py-5 position-relative" style={{ 
        background: 'rgba(10, 14, 26, 0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-dark bg-opacity-10 text-dark border border-dark border-opacity-10 rounded-pill px-4 py-2 mb-3 fw-bold" style={{ 
              fontSize: '0.7rem', 
              letterSpacing: '0.1em',
              color: '#94a3b8 !important',
              borderColor: 'rgba(255, 255, 255, 0.1) !important',
              background: 'rgba(255, 255, 255, 0.05) !important'
            }}>
              🚀 TECHNOLOGY STACK
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#f1f5f9' }}>
              Modern Tech <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-light mx-auto fs-6" style={{ maxWidth: '550px', }}>
              We leverage the most advanced technologies to build your digital solutions
            </p>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3">
            {techStack.map((tech, idx) => (
              <div 
                key={idx} 
                className="stack-item d-flex flex-column align-items-center p-3"
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  minWidth: '80px',
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${tech.color}20`;
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
                }}
              >
                <div style={{ fontSize: '32px', color: tech.color, transition: 'transform 0.3s ease' }}>
                  {tech.icon}
                </div>
                <span className="mt-1 small fw-semibold" style={{ color: '#94a3b8' }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STYLES ─── */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 20px 0;
        }

        .fade-overlay {
          position: absolute;
          top: 0;
          height: 100%;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }

        .fade-left {
          left: 0;
          background: linear-gradient(to right, #0a0e1a, transparent);
        }

        .fade-right {
          right: 0;
          background: linear-gradient(to left, #0a0e1a, transparent);
        }

        .marquee-track {
          display: flex;
          animation: scrollMarquee 35s linear infinite;
          width: max-content;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .glass-tech-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .stack-item {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-51%);
          }
        }

        @media (max-width: 768px) {
          .marquee-item {
            width: 120px !important;
            margin-right: 16px !important;
          }
          .glass-tech-card {
            padding: 16px !important;
            min-height: 110px !important;
          }
          .glass-tech-card div {
            font-size: 28px !important;
          }
          .fade-overlay {
            width: 60px;
          }
          .stack-item {
            min-width: 60px !important;
            padding: 12px !important;
          }
          .stack-item div {
            font-size: 24px !important;
          }
        }

        @media (max-width: 576px) {
          .marquee-item {
            width: 100px !important;
            margin-right: 12px !important;
          }
          .glass-tech-card {
            padding: 12px !important;
            min-height: 90px !important;
          }
          .glass-tech-card div {
            font-size: 22px !important;
          }
          .glass-tech-card p {
            font-size: 0.7rem !important;
          }
          .fade-overlay {
            width: 40px;
          }
        }
      `}</style>
    </section>
  );
}