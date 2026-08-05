"use client";

import React, { useState, useEffect } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

export default function RecentProjectsGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Feedback states
  const [activeFeedbackForm, setActiveFeedbackForm] = useState(null);
  const [selectedProjectForView, setSelectedProjectForView] = useState(null);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState({});

  // Get or Create Unique Client ID (Client-side safe)
  const getClientId = () => {
    if (typeof window === 'undefined') return 'guest';
    let clientId = localStorage.getItem('webgrow_user_id');
    if (!clientId) {
      clientId = 'user_' + Math.random().toString(36).substring(2, 10);
      localStorage.setItem('webgrow_user_id', clientId);
    }
    return clientId;
  };

  // Fetch Projects & Ratings
  useEffect(() => {
    const clientId = getClientId();
    const projectsRef = ref(rtdb, 'projects');

    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => {
          const item = data[key];
          const feedbacksObj = item.feedbacks || {};
          const feedbackList = Object.keys(feedbacksObj).map(fKey => ({
            id: fKey,
            ...feedbacksObj[fKey]
          }));

          // Calculate Average Rating
          const avgRating = feedbackList.length > 0
            ? (feedbackList.reduce((acc, curr) => acc + Number(curr.rating || 0), 0) / feedbackList.length).toFixed(1)
            : '5.0';

          // Get Current User's Specific Rating
          const myFeedback = feedbacksObj[clientId];
          const myRating = myFeedback ? Number(myFeedback.rating) : null;

          return {
            id: key,
            ...item,
            feedbacks: feedbackList,
            avgRating,
            myRating
          };
        }).reverse();
        setProjects(list);
      } else {
        setProjects([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageError = (e, projectTitle) => {
    e.target.onerror = null;
    e.target.src = `https://picsum.photos/seed/${encodeURIComponent(projectTitle)}/600/400`;
  };

  // Direct Interactive Star Click
  const handleDirectStarClick = async (projectId, ratingValue) => {
    try {
      const clientId = getClientId();
      const singleFeedbackRef = ref(rtdb, `projects/${projectId}/feedbacks/${clientId}`);

      await set(singleFeedbackRef, {
        name: 'Quick Rating User',
        rating: Number(ratingValue),
        comment: 'Rated via quick stars',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error("Error submitting direct rating:", err);
    }
  };

  // Detailed Feedback Form Submission
  const handleFeedbackSubmit = async (projectId) => {
    if (!userComment.trim()) {
      alert("Please enter a feedback comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const clientId = getClientId();
      const singleFeedbackRef = ref(rtdb, `projects/${projectId}/feedbacks/${clientId}`);

      await set(singleFeedbackRef, {
        name: userName.trim() || 'Anonymous',
        rating: Number(userRating),
        comment: userComment.trim(),
        createdAt: new Date().toISOString()
      });

      setUserComment('');
      setUserName('');
      setUserRating(5);
      setActiveFeedbackForm(null);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5 position-relative bg-theme-main" id="projects">
      <div className="container" style={{ maxWidth: '1200px' }}>

        <div className="text-center mb-5">
          <div className="btn-secondary-glow px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-2 mb-3">
            <span className="rounded-circle" style={{ width: '6px', height: '6px', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7' }} />
            <span className="fw-semibold small">✦ OUR PROJECTS</span>
          </div>
          <h2 className="display-6 fw-extrabold text-theme-primary mb-3">
            Explore Our <span className="text-gradient-purple">FEATURED PROJECTS</span>
          </h2>
          <p className="text-theme-secondary fs-6 mx-auto" style={{ maxWidth: '580px', lineHeight: '1.6' }}>
            Discover our latest web applications, platforms, and digital solutions crafted for our clients.
          </p>
        </div>

        {loading ? (
          <div className="row g-4 justify-content-center">
            {[1, 2, 3].map(i => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div className="card h-100 border p-3 rounded-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                  <div className="placeholder-glow">
                    <div className="placeholder w-100 rounded-3" style={{ height: '200px' }}></div>
                    <div className="placeholder w-50 rounded mt-3 py-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {projects.map((project, index) => {
              // Yahan logic update kiya hai taaki user ki khud ki rating dikhe (myRating) agar available ho
              const currentAvg = Math.round(Number(project.avgRating));
              const activeHover = hoverRating[project.id] || 0;
              const displayStars = activeHover || project.myRating || currentAvg;

              return (
                <div className="col-12 col-md-6 col-lg-4" key={project.id || index}>
                  <article className="card h-100 border rounded-4 overflow-hidden position-relative" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)', boxShadow: '0 10px 30px var(--shadow-color)' }}>

                    <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      <img
                        src={project.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(project.title)}/600/400`}
                        alt={project.title} loading="lazy" className="w-100 h-100 object-fit-cover"
                        onError={(e) => handleImageError(e, project.title)}
                      />
                      {project.category && (
                        <div className="position-absolute bottom-0 start-0 px-3 py-1 text-white fw-bold" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', fontSize: '0.75rem', borderTopRightRadius: '8px' }}>
                          <i className="bi bi-code-slash me-1"></i> {project.category}
                        </div>
                      )}
                    </div>

                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h3 className="h6 fw-bold mb-0 text-theme-primary text-truncate pe-2" style={{ fontSize: '1.05rem' }} title={project.title}>
                            {project.title}
                          </h3>

                          <div className="d-flex align-items-center gap-1">
                            <div className="text-warning small d-flex gap-1" style={{ cursor: 'pointer' }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`bi ${star <= displayStars ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
                                  style={{ fontSize: '0.85rem' }}
                                  onMouseEnter={() => setHoverRating({ ...hoverRating, [project.id]: star })}
                                  onMouseLeave={() => setHoverRating({ ...hoverRating, [project.id]: 0 })}
                                  onClick={() => handleDirectStarClick(project.id, star)}
                                  title={project.myRating ? `Your rating: ${project.myRating} star` : `Click to rate ${star} star`}
                                />
                              ))}
                            </div>
                            <span className="text-theme-secondary opacity-75 ms-1" style={{ fontSize: '0.7rem' }}>
                              ({project.feedbacks.length})
                            </span>
                          </div>
                        </div>

                        <p className="text-theme-secondary small mb-3" style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>
                          {project.description}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top border-secondary border-opacity-25">
                          <button onClick={() => setSelectedProjectForView(project)} className="btn btn-link btn-sm p-0 text-decoration-none text-gradient-purple fw-semibold" style={{ fontSize: '0.78rem' }}>
                            View Reviews ({project.feedbacks.length})
                          </button>
                          <button onClick={() => setActiveFeedbackForm(activeFeedbackForm === project.id ? null : project.id)} className="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill" style={{ fontSize: '0.75rem' }}>
                            {activeFeedbackForm === project.id ? 'Cancel' : '+ Feedback'}
                          </button>
                        </div>

                        {activeFeedbackForm === project.id && (
                          <div className="bg-body-tertiary p-2 rounded-3 mb-3 border border-secondary border-opacity-25" style={{ fontSize: '0.8rem' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="fw-semibold">Rating:</span>
                              <div className="d-flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <i key={star} className={`bi ${star <= userRating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`} onClick={() => setUserRating(star)} style={{ cursor: 'pointer' }} />
                                ))}
                              </div>
                            </div>
                            <input type="text" placeholder="Your Name (Optional)" className="form-control form-control-sm mb-1 bg-transparent text-theme-primary" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <textarea rows="2" placeholder="Write your review...*" className="form-control form-control-sm mb-2 bg-transparent text-theme-primary" value={userComment} onChange={(e) => setUserComment(e.target.value)} />
                            <button onClick={() => handleFeedbackSubmit(project.id)} disabled={isSubmitting} className="btn btn-sm btn-primary w-100 py-1" style={{ fontSize: '0.75rem' }}>
                              {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="d-flex gap-2 mt-auto">
                        <a href="/contact" target="_blank" rel="noopener noreferrer" className="btn-neon-cta flex-grow-1 justify-content-center text-center py-2" style={{ fontSize: '0.78rem' }}>
                          Order Same
                        </a>
                        <a href={project.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn-secondary-glow flex-grow-1 justify-content-center text-center py-2" style={{ fontSize: '0.78rem' }}>
                          Visit Site
                        </a>
                      </div>
                    </div>

                  </article>
                </div>
              );
            })}
            {!loading && projects.length === 0 && <div className="text-center text-theme-secondary py-5">No projects found.</div>}
          </div>
        )}
      </div>
    </section>
  );
}