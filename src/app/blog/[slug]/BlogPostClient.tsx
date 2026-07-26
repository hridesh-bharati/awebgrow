// src/app/blog/[slug]/BlogPostClient.tsx
"use client";

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

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const baseUrl = 'https://www.awebgrow.com';
  const pageUrl = `${baseUrl}/blog/${post.slug}`;

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
            <header className="mb-4">
              <span className="btn-secondary-glow py-1 px-3 mb-3 d-inline-block fw-semibold" style={{ fontSize: '0.75rem' }}>
                {post.category || 'Web Development'}
              </span>
              <h1 className="display-5 fw-bold text-theme-primary mb-3">{post.title}</h1>
              <p className="lead text-theme-secondary fs-5">{post.excerpt}</p>
              
              <div className="my-4 rounded-4 overflow-hidden border border-subtle" style={{ maxHeight: '420px' }}>
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'} 
                  alt={post.title}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
              </div>
            </header>

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

            <div
              className="blog-content text-theme-primary mb-5"
              style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.image,
              "datePublished": post.date,
              "author": {
                "@type": "Organization",
                "name": "AWebGrow",
                "url": baseUrl
              }
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