// src\app\blog\[slug]\BlogPostClient.tsx
"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import type { BlogPost } from '@/lib/posts';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const baseUrl = 'https://www.awebgrow.com';
  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  // Extract headings for TOC
  const headings = post.content
    .split('<h2')
    .slice(1)
    .map(section => {
      const match = section.match(/id="([^"]+)"/);
      const title = section.split('</h2>')[0]?.replace(/[^>]*>/, '').trim();
      return match && title ? { id: match[1], title } : null;
    })
    .filter(Boolean);

  // Smooth scroll for TOC links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <main className="container py-5">
      {/* Breadcrumb with Schema */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
          <li className="breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="text-decoration-none" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="breadcrumb-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/blog" className="text-decoration-none" itemProp="item">
              <span itemProp="name">Blog</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li className="breadcrumb-item active" aria-current="page" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      <article className="row justify-content-center" itemScope itemType="https://schema.org/BlogPosting">
        <div className="col-lg-8">
          <header className="mb-4">
            {/* Category, Date, Reading Time */}
            <div className="d-flex gap-2 mb-3 flex-wrap">
              <span className="badge bg-primary" itemProp="about">
                {post.category || 'Web Development'}
              </span>
              <span className="badge bg-secondary">
                <time dateTime={post.date} itemProp="datePublished">
                  {new Date(post.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </time>
              </span>
              <span className="badge bg-info">
                ⏱️ {readingTime} min read
              </span>
            </div>
            
            <h1 className="display-5 fw-bold" style={{ color: '#0f172a' }} itemProp="headline">
              {post.title}
            </h1>
            <p className="lead text-muted" itemProp="description">{post.excerpt}</p>
            
            {/* Author info */}
            <div className="d-flex align-items-center gap-3 mt-3">
              <div className="d-flex align-items-center gap-2">
                <img 
                  src="/images/author-avatar.jpg" 
                  alt="AWebGrow Team" 
                  width="40" 
                  height="40" 
                  className="rounded-circle"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/default-avatar.jpg';
                  }}
                />
                <div>
                  <div className="fw-bold" itemProp="author" itemScope itemType="https://schema.org/Organization">
                    <span itemProp="name">AWebGrow Team</span>
                  </div>
                  <small className="text-muted">Web Development Experts</small>
                </div>
              </div>
            </div>
            <hr />
          </header>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="table-of-contents mb-4 p-3" style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <h3 className="h6 fw-bold">📑 Table of Contents</h3>
              <ul className="list-unstyled mb-0">
                {headings.map((heading, index) => (
                  <li key={index} style={{ padding: '4px 0' }}>
                    <a href={`#${heading!.id}`} className="text-decoration-none text-primary">
                      {index + 1}. {heading!.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Blog Content */}
          <div
            className="blog-content"
            style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
            itemProp="articleBody"
          />

          {/* Author Bio Box */}
          <div className="author-box mt-5 p-4" style={{
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            borderRadius: '12px',
            border: '1px solid #dee2e6'
          }}>
            <div className="d-flex align-items-center gap-3">
              <img 
                src="/images/author-avatar.jpg" 
                alt="AWebGrow Team" 
                width="60" 
                height="60" 
                className="rounded-circle"
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = '/images/default-avatar.jpg';
                }}
              />
              <div>
                <h4 className="h6 fw-bold mb-1">About AWebGrow Team</h4>
                <p className="small text-muted mb-0">
                  We're a team of passionate web developers and digital marketers from India, 
                  dedicated to helping businesses grow online through cutting-edge technology 
                  and proven SEO strategies.
                </p>
                <div className="mt-2">
                  <Link href="/about" className="btn btn-sm btn-outline-primary rounded-pill">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="related-posts mt-5">
              <h3 className="h4 fw-bold mb-3">Related Articles</h3>
              <div className="row g-3">
                {relatedPosts.map(related => (
                  <div key={related.slug} className="col-md-4">
                    <Link href={`/blog/${related.slug}`} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm">
                        {related.image && (
                          <img 
                            src={related.image} 
                            className="card-img-top" 
                            alt={related.title}
                            style={{ height: '120px', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.src = '/images/blog-placeholder.jpg';
                            }}
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title h6">{related.title}</h5>
                          <small className="text-muted">{related.category}</small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer className="mt-5 pt-3 border-top">
            <p className="text-muted small">
              Published by <strong itemProp="author">AWebGrow Team</strong> on {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              {post.updatedDate && (
                <> • Updated on {new Date(post.updatedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</>
              )}
            </p>
            
            {/* Social Share Buttons */}
            <div className="social-share mb-3">
              <span className="me-2 text-muted">Share this article:</span>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary me-1"
              >
                🐦 Twitter
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary me-1"
              >
                💼 LinkedIn
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary me-1"
              >
                📘 Facebook
              </a>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${pageUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-secondary"
              >
                💬 WhatsApp
              </a>
            </div>
            
            <Link href="/blog" className="btn btn-outline-primary rounded-pill">
              ← Back to Blog
            </Link>
          </footer>
        </div>
      </article>

      {/* ✅ Enhanced Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image || `${baseUrl}/images/og-image.jpg`,
            "datePublished": post.date,
            "dateModified": post.updatedDate || post.date,
            "author": {
              "@type": "Organization",
              "name": "AWebGrow",
              "url": baseUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.png`
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "AWebGrow",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": pageUrl
            },
            "keywords": post.keywords?.join(', ') || '',
            "articleSection": post.category || 'Web Development',
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${readingTime}M`
          })
        }}
      />
      
      {/* ✅ Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.awebgrow.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.awebgrow.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": pageUrl
              }
            ]
          })
        }}
      />
      
      <style>{`
        .blog-content h2 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          color: #0f172a;
        }
        .blog-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #1e293b;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.3rem;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .blog-content pre {
          margin: 1rem 0;
          background: #1a1a1a;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          color: #f8f8f8;
        }
        .blog-content code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #0f172a;
        }
        .blog-content a {
          color: #a855f7;
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
        .blog-content blockquote {
          border-left: 4px solid #a855f7;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #475569;
          font-style: italic;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        .blog-content th, .blog-content td {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
        }
        .blog-content th {
          background: #f1f5f9;
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}