"use client";

import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

// src\components\Home\OurProjects.jsx
export default function RecentProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase से प्रोजेक्ट्स फ़ेच करना
  useEffect(() => {
    const projectsRef = ref(rtdb, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse(); // लेटेस्ट प्रोजेक्ट सबसे आगे
        setProjects(list);
      } else {
        setProjects([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageError = (e, projectTitle) => {
    e.target.onerror = null; 
    e.target.src = `https://picsum.photos/seed/${encodeURIComponent(projectTitle)}/600/400`;
  };

  return (
    <section className="py-5 position-relative" id="projects" style={{ background: '#f4f6f9' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="text-uppercase fw-bold text-warning small mb-1" style={{ letterSpacing: '2px', color: '#FEA116' }}>
            —— OUR PROJECTS ——
          </div>
          <h2 className="display-6 fw-bold text-dark">
            Explore Our <span style={{ color: '#FEA116' }}>PROJECTS</span>
          </h2>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="row g-4 justify-content-center">
            {[1, 2, 3].map(i => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div className="card h-100 border-0 shadow-sm p-3" style={{ animation: 'pulse 1.5s infinite' }}>
                  <div style={{ height: '220px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                  <div className="mt-3" style={{ height: '20px', background: '#e2e8f0', width: '60%' }}></div>
                  <div className="mt-2" style={{ height: '50px', background: '#e2e8f0', width: '100%' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Projects Grid Layout */
          <div className="row g-4 justify-content-center">
            {projects.map((project, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={project.id || index}>
                <article className="card h-100 hotel-room-card border-0 shadow-sm overflow-hidden position-relative">
                  
                  {/* Image Container Aspect Box */}
                  <div className="position-relative overflow-hidden" style={{ background: '#e2e8f0', aspectRatio: '16/10' }}>
                    <img 
                      src={project.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(project.title)}/600/400`}
                      alt={project.title}
                      loading="lazy"
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => handleImageError(e, project.title)}
                    />
                    
                    {/* Category Badge */}
                    <div className="position-absolute bottom-0 start-0 px-3 py-1 text-white fw-bold" style={{ backgroundColor: '#FEA116', fontSize: '0.85rem', borderTopRightRadius: '4px' }}>
                      <i className="bi bi-code text-white me-1"></i> {project.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '1.15rem' }}>
                          {project.title}
                        </h3>
                        <div className="text-warning small" style={{ color: '#FEA116' }}>
                          <i className="bi bi-star-fill me-1"></i>
                          <i className="bi bi-star-fill me-1"></i>
                          <i className="bi bi-star-fill me-1"></i>
                          <i className="bi bi-star-fill me-1"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                      </div>

                      <p className="text-muted small mb-4" style={{ lineHeight: '1.6', fontSize: '0.88rem' }}>
                        {project.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-auto">
                      <a 
                        href="/contact" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn text-white fw-bold flex-grow-1 py-2 text-uppercase" 
                        style={{ backgroundColor: '#FEA116', fontSize: '0.78rem', borderRadius: '4px', letterSpacing: '0.5px' }}
                      >
                        Order Same
                      </a>
                      <a 
                        href={project.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn text-white fw-bold flex-grow-1 py-2 text-uppercase" 
                        style={{ backgroundColor: '#0F172A', fontSize: '0.78rem', borderRadius: '4px', letterSpacing: '0.5px' }}
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>

                </article>
              </div>
            ))}
            {!loading && projects.length === 0 && (
              <div className="text-center text-muted py-5">No live projects to display.</div>
            )}
          </div>
        )}

      </div>

      <style jsx>{`
        .hotel-room-card {
          border-radius: 4px !important;
          background: #ffffff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hotel-room-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}