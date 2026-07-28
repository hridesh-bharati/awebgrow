// src/app/page.tsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Process from "@/components/Home/Process";
import OurProjects from "@/components/Home/OurProjects";
import PricingPackages from "@/components/Home/PricingPackages";
import ClientReviews from "@/components/Home/ClientReviews";
import CTA from "@/components/Home/CTA";
import FeatureCard from "@/components/Home/FeatureCard";
import CustomCursor from "./CustomCursor";
import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com';

// ✅ COMPLETE SCHEMA COLLECTION
const schemas = [
  // Organization Schema
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AWebGrow",
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/awebgrow-logo-art-letter.png`,
    "sameAs": [
      "https://github.com/hrideshbharati",
      "https://linkedin.com/company/AWebGrow",
      "https://twitter.com/AWebGrow"
    ],
    "description": "Leading web development company in India specializing in custom websites, mobile apps, and enterprise software solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7267995307",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  },

  // ✅ LOCAL BUSINESS SCHEMA
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AWebGrow",
    "image": `${BASE_URL}/images/awebgrow-logo-art-letter.png`,
    "url": BASE_URL,
    "telephone": "+91-7267995307",
    "description": "Professional web development company in India offering website design, mobile app development, and digital marketing services.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  },

  // WebSite Schema
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BASE_URL,
    "name": "AWebGrow",
    "description": "Professional web development company in India",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },

  // ✅ SERVICE SCHEMA
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "AWebGrow"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Professional custom website development using modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "eCommerce Development",
            "description": "Full-featured eCommerce website development"
          }
        }
      ]
    }
  },

  // ✅ BREADCRUMB SCHEMA
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }]
  }
];

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      {/* Pure CSS replacement for hover states to prevent Server-Client component errors */}
      <style>{`
        .location-card-noida {
          transition: all 0.3s ease;
        }
        .location-card-noida:hover {
          transform: translateY(-5px);
          border-color: rgba(59, 130, 246, 0.4) !important;
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
        }

        .location-card-nichlaul {
          transition: all 0.3s ease;
        }
        .location-card-nichlaul:hover {
          transform: translateY(-5px);
          border-color: rgba(168, 85, 247, 0.4) !important;
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.15);
        }

        .blog-card-hover {
          transition: all 0.3s ease;
        }
        .blog-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 0, 128, 0.3) !important;
          box-shadow: 0 20px 40px rgba(255, 0, 128, 0.15);
        }

        .blog-title-link {
          color: #ffffff;
          transition: color 0.3s ease;
        }
        .blog-title-link:hover {
          color: #a855f7 !important;
        }

        .blog-btn-hover {
          transition: all 0.3s ease;
        }
        .blog-btn-hover:hover {
          transform: translateX(3px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .view-all-btn-hover {
          transition: all 0.3s ease;
        }
        .view-all-btn-hover:hover {
          background: rgba(168, 85, 247, 0.2) !important;
          border-color: #a855f7 !important;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.2);
        }
      `}</style>

      {/* Structured JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas)
        }}
      />

      <CustomCursor>
        <Header />
        <main>
          <Hero />
          <WhyChooseUs />
          <FeatureCard />
          <OurProjects />
          <Process />
          <CTA />
          <PricingPackages />
          <ClientReviews />

          {/* ========================================== */}
          {/* SECTION 1: LOCATION LINKS */}
          {/* ========================================== */}
          <section style={{
            backgroundColor: '#020203',
            padding: '60px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="container">
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
                  }}>Our Presence</span>
                </div>
                <h2 className="fw-extrabold text-white mb-2" style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 900,
                }}>
                  Serving Businesses Across <span className="text-gradient-purple-blue">India</span>
                </h2>
                <p className="text-secondary" style={{ fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                  We deliver world-class web development and digital solutions from our offices across India.
                </p>
              </div>

              <div className="row g-4 justify-content-center">
                {/* Noida */}
                <div className="col-md-4 col-lg-3">
                  <Link href="/location/noida" style={{ textDecoration: 'none' }}>
                    <div className="location-card location-card-noida" style={{
                      background: 'rgba(10, 10, 12, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '24px',
                      textAlign: 'center',
                      height: '100%',
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌍</div>
                      <h3 className="h5 fw-bold text-white mb-2">Noida</h3>
                      <p className="text-secondary small mb-0">Noida, UP</p>
                      <span className="badge rounded-pill px-3 py-1 mt-2" style={{
                        background: 'rgba(59, 130, 246, 0.2)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        fontSize: '0.7rem'
                      }}>Learn More →</span>
                    </div>
                  </Link>
                </div>

                {/* Nichlaul */}
                <div className="col-md-4 col-lg-3">
                  <Link href="/location/nichlaul" style={{ textDecoration: 'none' }}>
                    <div className="location-card location-card-nichlaul" style={{
                      background: 'rgba(10, 10, 12, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      padding: '24px',
                      textAlign: 'center',
                      height: '100%',
                      cursor: 'pointer'
                    }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌍</div>
                      <h3 className="h5 fw-bold text-white mb-2">Nichlaul</h3>
                      <p className="text-secondary small mb-0">Nichlaul, Maharajganj, UP</p>
                      <span className="badge rounded-pill px-3 py-1 mt-2" style={{
                        background: 'rgba(168, 85, 247, 0.2)',
                        color: '#a855f7',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        fontSize: '0.7rem'
                      }}>Learn More →</span>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* SECTION 2: BLOG SECTION */}
          {/* ========================================== */}
          <section style={{
            backgroundColor: '#020203',
            padding: '60px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="container">
              <div className="text-center mb-4">
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
                  }}>Latest Insights</span>
                </div>
                <h2 className="fw-extrabold text-white mb-2" style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 900,
                }}>
                  From Our <span className="text-gradient-purple-blue">Blog</span>
                </h2>
                <p className="text-secondary" style={{ fontSize: '0.95rem' }}>
                  Expert insights on web development, SEO, and digital growth
                </p>
              </div>

              <div className="row g-4">
                {latestPosts && latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <div key={post.slug} className="col-md-4">
                      <div className="blog-card blog-card-hover" style={{
                        background: 'rgba(10, 10, 12, 0.85)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        overflow: 'hidden',
                        height: '100%',
                      }}>
                        {post.image && (
                          <div style={{ height: '180px', overflow: 'hidden' }}>
                            <img
                              src={post.image}
                              alt={post.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="badge rounded-pill px-3 py-1" style={{
                              background: 'rgba(168, 85, 247, 0.2)',
                              color: '#a855f7',
                              border: '1px solid rgba(168, 85, 247, 0.3)',
                              fontSize: '0.65rem'
                            }}>
                              {post.category || 'Web Development'}
                            </span>
                            <small className="text-secondary" style={{ fontSize: '0.65rem' }}>
                              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </small>
                          </div>
                          <h3 className="h6 fw-bold text-white mb-2" style={{ lineHeight: '1.3' }}>
                            <Link href={`/blog/${post.slug}`} className="blog-title-link" style={{ textDecoration: 'none' }}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-secondary small mb-3" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                            {post.excerpt && post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                          </p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="btn rounded-pill px-3 py-1 fw-bold blog-btn-hover"
                            style={{
                              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                              color: '#fff',
                              border: 'none',
                              fontSize: '0.75rem',
                            }}>
                            Read More <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-4">
                    <p className="text-secondary">No blog posts yet. Check back soon!</p>
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <Link
                  href="/blog"
                  className="btn rounded-pill px-5 py-2 fw-bold view-all-btn-hover"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}>
                  View All Posts <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* SECTION 3: BRAND + RICH CONTENT */}
          {/* ========================================== */}
          <section style={{
            backgroundColor: '#020203',
            padding: '60px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div style={{
                    background: 'rgba(10, 10, 12, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '40px',
                  }}>
                    <h2 className="fw-extrabold text-white mb-3" style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 900,
                    }}>
                      AWebGrow - India's Leading <span className="text-gradient-purple-blue">Web Development Company</span>
                    </h2>
                    <p style={{ lineHeight: '1.8', color: '#d1d5db' }}>
                      <strong className="text-white">AWebGrow</strong> is a premier <strong className="text-white">web development company in India</strong>, 
                      delivering cutting-edge digital solutions since 2021. We specialize in custom website development, 
                      mobile app development, UI/UX design, and SEO services.
                    </p>
                    <p style={{ lineHeight: '1.8', color: '#d1d5db' }}>
                      As a trusted <strong className="text-white">web development agency in Noida</strong>, we serve clients globally, 
                      from startups to enterprises. Our expertise in React, Next.js, Node.js, Python, and cloud technologies 
                      ensures we build scalable, high-performance applications.
                    </p>
                    <div className="row g-3 mt-3">
                      <div className="col-md-6">
                        <div style={{
                          background: 'rgba(168, 85, 247, 0.05)',
                          borderRadius: '12px',
                          padding: '16px',
                          borderLeft: '3px solid #a855f7'
                        }}>
                          <h4 className="text-white h6 fw-bold">🌍 Our Presence</h4>
                          <p className="text-secondary small mb-0">Noida (Sector 62) • Nichlaul (Maharajganj) • Serving India & Global</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.05)',
                          borderRadius: '12px',
                          padding: '16px',
                          borderLeft: '3px solid #3b82f6'
                        }}>
                          <h4 className="text-white h6 fw-bold">🏆 Our Achievements</h4>
                          <p className="text-secondary small mb-0">150+ Websites • 250+ Happy Clients • 98% Client Retention</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 d-flex flex-wrap gap-2">
                      <Link href="/services" className="btn rounded-pill px-4 py-2 fw-bold" style={{
                        background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                        color: '#fff',
                        border: 'none',
                      }}>
                        Explore Our Services
                      </Link>
                      <Link href="/brand" className="btn rounded-pill px-4 py-2 fw-bold" style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }}>
                        Our Brand Story
                      </Link>
                      <Link href="/contact" className="btn rounded-pill px-4 py-2 fw-bold" style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                      }}>
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </CustomCursor>
    </>
  );
}