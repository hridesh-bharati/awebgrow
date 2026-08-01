"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/posts';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

interface Heading {
  id: string;
  title: string;
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop';

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const baseUrl = 'https://www.awebgrow.com';
  const pageUrl = `${baseUrl}/blog/${post.slug}`;

  // AdSense Auto Push Initialization
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense Error:', err);
    }
  }, [post.slug]);

  const headings: Heading[] = post.content
    .split('<h2')
    .slice(1)
    .map((section) => {
      const match = section.match(/id="([^"]+)"/);
      const title = section.split('</h2>')[0]?.replace(/[^>]*>/, '').trim();
      return match && title ? { id: match[1], title } : null;
    })
    .filter((heading): heading is Heading => heading !== null);

  return (
    <main className="bg-theme-main min-vh-100 py-5">
      <div className="container">
        <article className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Header Section */}
            <header className="mb-4">
              <span className="btn-secondary-glow py-1 px-3 mb-3 d-inline-block fw-semibold" style={{ fontSize: '0.75rem' }}>
                {post.category || 'Web Development'}
              </span>
              <h1 className="display-5 fw-bold text-theme-primary mb-3">{post.title}</h1>
              <p className="lead text-theme-secondary fs-5">{post.excerpt}</p>
              
              {/* Feature Banner Image */}
              <div className="my-4 rounded-4 overflow-hidden border border-subtle" style={{ maxHeight: '420px', minHeight: '260px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <img 
                  src={post.image && post.image.trim() !== '' ? post.image : DEFAULT_FALLBACK_IMAGE} 
                  alt={post.title}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_FALLBACK_IMAGE;
                  }}
                />
              </div>
            </header>

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="p-4 mb-4 rounded-4 border border-subtle" style={{ background: 'var(--bg-card)' }}>
                <h3 className="h6 fw-bold text-theme-primary mb-3">📑 Table of Contents</h3>
                <ul className="list-unstyled mb-0">
                  {headings.map((heading, index) => (
                    <li key={index} className="py-1">
                      <a href={`#${heading.id}`} className="text-decoration-none text-gradient-purple-blue fw-medium">
                        {index + 1}. {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AdSense In-Article Ad Unit */}
            <div className="my-4 text-center overflow-hidden">
              <small className="text-muted d-block mb-1" style={{ fontSize: '10px' }}>ADVERTISEMENT</small>
              <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-2660059673395664"
                data-ad-slot="9876543210"
              />
            </div>

            {/* Main Article Content */}
            <div
              className="blog-content text-theme-primary mb-5"
              style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="my-5 p-4 rounded-4 border border-subtle" style={{ background: 'var(--bg-card)' }}>
                <h3 className="h5 fw-bold text-theme-primary mb-3">💡 Frequently Asked Questions</h3>
                {post.faqs.map((faq, i) => (
                  <div key={i} className="mb-3">
                    <h4 className="h6 fw-bold text-theme-primary mb-1">Q: {faq.question}</h4>
                    <p className="text-theme-secondary small mb-0">{faq.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Bottom Content Ad */}
            <div className="my-4 text-center overflow-hidden">
              <small className="text-muted d-block mb-1" style={{ fontSize: '10px' }}>SPONSORED ADVERTISEMENT</small>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2660059673395664"
                data-ad-slot="1122334455"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>

            {/* Author Box */}
            <div className="p-4 rounded-4 border border-subtle my-5" style={{ background: 'var(--bg-card)' }}>
              <div className="d-flex align-items-center gap-3">
                <div>
                  <h4 className="h6 fw-bold text-theme-primary mb-1">Authored by AWebGrow Engineering Team</h4>
                  <p className="small text-theme-secondary mb-0">
                    Led by <strong>Hridesh Bharati</strong> and <strong>Sushant Rai</strong>. Building next-generation digital applications trusted across India and globally.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </article>
      </div>

      {/* Rich Schema markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": pageUrl
              },
              "headline": post.title,
              "description": post.excerpt,
              "image": [post.image || DEFAULT_FALLBACK_IMAGE],
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "AWebGrow",
                "url": baseUrl
              },
              "publisher": {
                "@type": "Organization",
                "name": "AWebGrow",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/icons/awebgrow-logo.png`
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": baseUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": `${baseUrl}/blog`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": pageUrl
                }
              ]
            },
            ...(post.faqs ? [{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": post.faqs.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer
                }
              }))
            }] : [])
          ])
        }}
      />
    </main>
  );
}