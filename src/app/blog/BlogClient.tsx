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

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return (post.category || 'Web Development') === selectedCategory;
  });

  return (
    <main className="blog-page bg-theme-main min-vh-100 py-5">
      <div className="container position-relative">
        {/* Blog Header */}
        <div className="text-center my-5">
          <div className="hero-badge mb-3 mx-auto btn-secondary-glow">
            <span className="badge-text-glow text-gradient-pink fw-bold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}>
              INSIGHTS & TRENDS
            </span>
          </div>

          <h1 className="fw-extrabold text-theme-primary mb-3 display-4">
            Latest From <span className="text-gradient-purple-blue">Our Blog</span>
          </h1>
          <p className="text-theme-secondary max-w-600 mx-auto lead fs-6">
            Expert insights on Web Development, Next.js, LLMO (Large Language Model Optimization), and Google SEO.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-4 d-flex justify-content-center gap-2 flex-wrap">
          <button 
            className={`btn-secondary-glow btn-sm ${selectedCategory === 'All' ? 'btn-neon-cta' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map(cat => (
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
        <div className="row g-4" id="blog-posts-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.slug} className="col-md-6 col-lg-4 blog-post-item">
                <article className="blog-card rounded-4 border border-subtle overflow-hidden h-100 d-flex flex-column" style={{ background: 'var(--bg-card)' }}>
                  <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'}
                      alt={post.title}
                      loading="lazy"
                      className="w-100 h-100 blog-image"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
                      }}
                    />
                    <span className="position-absolute top-0 start-0 m-3 btn-secondary-glow py-1 px-3 fw-semibold text-white" style={{ fontSize: '0.7rem' }}>
                      {post.category || 'Web Development'}
                    </span>
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2 text-theme-secondary" style={{ fontSize: '0.75rem' }}>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </time>
                    </div>

                    <h2 className="h5 fw-bold text-theme-primary mb-2" style={{ lineHeight: '1.3' }}>
                      <Link href={`/blog/${post.slug}`} className="text-theme-primary text-decoration-none blog-title-link">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-theme-secondary small mb-4 flex-grow-1" style={{ 
                      fontSize: '0.875rem', 
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} className="btn-neon-cta w-100 justify-content-center text-center mt-auto">
                      Read Article &rarr;
                    </Link>
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
          transform: translateY(-6px);
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 15px 30px var(--shadow-color);
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