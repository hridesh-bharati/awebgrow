"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { BlogPost } from '@/lib/posts';

interface BlogClientProps {
  posts: BlogPost[];
  categories: string[];
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop';

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense Initialization:', err);
    }
  }, [selectedCategory]);

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return (post.category || 'Web Development') === selectedCategory;
  });

  return (
    <main className="blog-page bg-theme-main min-vh-100 py-5" style={{ marginTop: '65px' }}>
      <div className="container position-relative">
        
        {/* Blog Header */}
        <div className="text-center mb-5">
          <div className="hero-badge mb-3 mx-auto btn-secondary-glow">
            <span className="badge-text-glow text-gradient-pink fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}>
              INSIGHTS & TRENDS
            </span>
          </div>

          <h1 className="fw-extrabold text-theme-primary mb-3 display-5">
            Latest From <span className="text-gradient-purple-blue">Our Blog</span>
          </h1>
          <p className="text-theme-secondary max-w-600 mx-auto fs-6">
            Expert insights on Web Development, Next.js, LLMO, and Google SEO.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-5 d-flex justify-content-center gap-2 flex-wrap">
          <button 
            className={`btn-secondary-glow btn-sm ${selectedCategory === 'All' ? 'btn-neon-cta' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`btn-secondary-glow btn-sm ${selectedCategory === cat ? 'btn-neon-cta' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="row g-4 justify-content-center" id="blog-posts-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={post.slug} className="col-12 col-md-6 col-lg-4 d-flex">
                <article 
                  className="blog-card rounded-4 border overflow-hidden w-100 d-flex flex-column" 
                  style={{ 
                    background: 'var(--bg-card, #0c0d14)', 
                    borderColor: 'rgba(255, 255, 255, 0.08)' 
                  }}
                >
                  
                  {/* Image Container */}
                  <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                    <img
                      src={post.image && post.image.trim() !== '' ? post.image : DEFAULT_FALLBACK_IMAGE}
                      alt={post.title}
                      loading="lazy"
                      className="w-100 h-100 blog-image"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                      }}
                    />
                    <span 
                      className="position-absolute top-0 start-0 m-3 py-1 px-3 fw-semibold text-white rounded-pill shadow-sm" 
                      style={{ 
                        fontSize: '0.68rem', 
                        background: 'rgba(2, 2, 5, 0.75)', 
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {post.category || 'Web Development'}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="mb-2 text-theme-secondary" style={{ fontSize: '0.75rem' }}>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </time>
                    </div>

                    <h2 className="h6 fw-bold text-theme-primary mb-2" style={{ lineHeight: '1.4', minHeight: '2.8em' }}>
                      <Link href={`/blog/${post.slug}`} className="text-theme-primary text-decoration-none blog-title-link">
                        {post.title}
                      </Link>
                    </h2>

                    <p 
                      className="text-theme-secondary small mb-4 flex-grow-1" 
                      style={{ 
                        fontSize: '0.85rem', 
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Clean Action Button */}
                    <div className="pt-2 mt-auto">
                      <Link href={`/blog/${post.slug}`} className="btn-neon-cta w-100 justify-content-center text-center">
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>

                </article>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-theme-secondary">No blog posts found in this category.</p>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .blog-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
        }
        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }
        .blog-title-link:hover {
          color: #a855f7 !important;
        }
      `}</style>
    </main>
  );
}