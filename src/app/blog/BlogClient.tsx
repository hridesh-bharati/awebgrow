// src/app/blog/BlogClient.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import type { BlogPost } from '@/lib/posts';

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter posts based on active React state
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return (post.category || 'Web Development') === selectedCategory;
  });

  return (
    <main className="blog-page" style={{ 
      backgroundColor: '#020203', 
      minHeight: '100vh',
      paddingTop: '65px',
      paddingBottom: '60px'
    }}>
      {/* Glow Spheres */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        top: '-10%',
        right: '-5%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        bottom: '-5%',
        left: '-5%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container position-relative z-2">
        {/* Blog Header */}
        <div className="text-center mb-5">
          <div className="hero-badge mb-3 mx-auto" style={{
            background: 'rgba(255, 0, 128, 0.05)',
            border: '1px solid rgba(255, 0, 128, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '6px 20px',
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span className="badge-dot-pink" style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#ff0080',
              borderRadius: '50%',
              boxShadow: '0 0 10px #ff0080, 0 0 20px #ff0080'
            }} />
            <span className="badge-text-glow" style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: '#fce7f3',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>INSIGHTS & TRENDS</span>
          </div>

          <h1 className="fw-extrabold text-white mb-3" style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: '1.18',
            letterSpacing: '-0.03em',
            fontWeight: 900,
          }}>
            Latest From{' '}
            <span className="text-gradient-purple-blue">Our Blog</span>
          </h1>
          <p className="text-secondary" style={{
            fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.65',
            fontWeight: 500
          }}>
            Insights, guides, and trends from India's trusted web development company.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-4 d-flex justify-content-center gap-2 flex-wrap">
          <button 
            className={`btn btn-sm btn-outline-light rounded-pill category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`btn btn-sm btn-outline-light rounded-pill category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="row g-4" id="blog-posts-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div 
                key={post.slug} 
                className="col-md-6 col-lg-4 blog-post-item" 
              >
                <article className="blog-card" style={{
                  background: 'rgba(10, 10, 12, 0.85)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  height: '100%',
                  position: 'relative',
                }}>
                  {post.image && (
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease'
                        }}
                        className="blog-image"
                        onError={(e) => {
                          e.currentTarget.src = '/images/blog-placeholder.jpg';
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(168, 85, 247, 0.9)',
                        color: 'white',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        {post.category || 'Web Development'}
                      </span>
                      <span style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '0.65rem',
                        backdropFilter: 'blur(4px)'
                      }}>
                        📖 {Math.ceil(post.content.split(' ').length / 200)} min
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-secondary" style={{ fontSize: '0.7rem' }}>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </time>
                      </small>
                      {post.updatedDate && (
                        <small className="text-secondary" style={{ fontSize: '0.6rem' }}>
                          Updated: {new Date(post.updatedDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </small>
                      )}
                    </div>
                    <h2 className="h5 fw-bold text-white mb-2" style={{ lineHeight: '1.3' }}>
                      <Link href={`/blog/${post.slug}`} style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      className="blog-title-link">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-secondary small mb-3" style={{ 
                      fontSize: '0.85rem', 
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="btn rounded-pill px-4 py-2 fw-bold"
                      style={{
                        background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                        color: '#fff',
                        border: 'none',
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-secondary">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Collection Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AWebGrow Blog",
            "description": "Latest articles on web development, SEO, and digital marketing.",
            "url": "https://www.awebgrow.com/blog",
            "about": {
              "@type": "Thing",
              "name": "Web Development"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AWebGrow"
            },
            "hasPart": posts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "url": `https://www.awebgrow.com/blog/${post.slug}`,
              "datePublished": post.date
            }))
          })
        }}
      />
      
      <style>{`
        .blog-card:hover {
          transform: translateY(-5px) scale(1.01);
          border-color: rgba(168, 85, 247, 0.3) !important;
          box-shadow: 0 20px 60px rgba(168, 85, 247, 0.15);
        }
        
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        
        .blog-title-link:hover {
          color: #a855f7 !important;
        }
        
        .category-btn {
          transition: all 0.3s ease;
          background: transparent;
          color: #6c757d;
          border-color: #6c757d;
        }
        
        .category-btn:hover,
        .category-btn.active {
          background: linear-gradient(135deg, #a855f7, #6366f1);
          color: white;
          border-color: transparent;
        }
        
        .text-gradient-purple-blue {
          background: linear-gradient(135deg, #a855f7, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </main>
  );
}