"use client";

import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

export default function RecentProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase Realtime Database integration
  useEffect(() => {
    const projectsRef = ref(rtdb, 'projects');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).reverse();
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
    <section className="py-5 position-relative bg-theme-main" id="projects">
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          <div className="btn-secondary-glow px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 mb-3">
            <span className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
            <span className="fw-semibold small">✦ OUR PORTFOLIO</span>
          </div>

          <h2 className="display-6 fw-extrabold text-theme-primary mb-3">
            Explore Our <span className="text-gradient-purple">FEATURED PROJECTS</span>
          </h2>
          
          <p className="text-theme-secondary fs-6 mx-auto" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
            Discover our latest web applications, platforms, and digital solutions crafted for our clients.
          </p>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="row g-4 justify-content-center">
            {[1, 2, 3].map(i => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div 
                  className="card h-100 border p-3 rounded-4"
                  style={{ 
                    backgroundColor: 'var(--bg-card)', 
                    borderColor: 'var(--border-subtle)' 
                  }}
                >
                  <div className="placeholder-glow">
                    <div className="placeholder w-100 rounded-3" style={{ height: '200px' }}></div>
                    <div className="placeholder w-50 rounded mt-3 py-2"></div>
                    <div className="placeholder w-100 rounded mt-2 py-3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* PROJECTS GRID LAYOUT */
          <div className="row g-4 justify-content-center">
            {projects.map((project, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={project.id || index}>
                <article 
                  className="card h-100 border rounded-4 overflow-hidden position-relative"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-subtle)',
                    boxShadow: '0 10px 30px var(--shadow-color)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                >
                  
                  {/* IMAGE CONTAINER */}
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img 
                      src={project.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(project.title)}/600/400`}
                      alt={project.title}
                      loading="lazy"
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => handleImageError(e, project.title)}
                    />
                    
                    {/* CATEGORY BADGE */}
                    {project.category && (
                      <div 
                        className="position-absolute bottom-0 start-0 px-3 py-1 text-white fw-bold" 
                        style={{ 
                          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', 
                          fontSize: '0.75rem', 
                          borderTopRightRadius: '8px' 
                        }}
                      >
                        <i className="bi bi-code-slash me-1"></i> {project.category}
                      </div>
                    )}
                  </div>

                  {/* CARD BODY */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="h6 fw-bold mb-0 text-theme-primary" style={{ fontSize: '1.1rem' }}>
                          {project.title}
                        </h3>
                        <div className="text-warning small d-flex gap-1">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                      </div>

                      <p className="text-theme-secondary small mb-4" style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>
                        {project.description}
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="d-flex gap-2 mt-auto">
                      <a 
                        href="/contact" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-neon-cta flex-grow-1 justify-content-center text-center py-2"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Order Same
                      </a>
                      <a 
                        href={project.websiteUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary-glow flex-grow-1 justify-content-center text-center py-2"
                        style={{ fontSize: '0.78rem' }}
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>

                </article>
              </div>
            ))}

            {!loading && projects.length === 0 && (
              <div className="text-center text-theme-secondary py-5">
                No live projects to display at the moment.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}