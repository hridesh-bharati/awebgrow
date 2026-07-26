// src/app/location/nichlaul/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Web Development Company in Nichlaul | AWebGrow - Trusted Agency",
  description: "AWebGrow is the best web development company in Nichlaul. We offer custom website design, app development, SEO, and digital marketing solutions.",
  keywords: [
    "web development company in nichlaul",
    "website development nichlaul",
    "app development company nichlaul",
    "seo services nichlaul",
    "digital marketing nichlaul",
    "best web development nichlaul"
  ],
  openGraph: {
    title: "Web Development Company in Nichlaul | AWebGrow",
    description: "Trusted web development agency in Nichlaul. Custom websites, apps, and digital solutions.",
    url: "https://www.awebgrow.com/location/nichlaul",
    type: "website",
  },
  alternates: {
    canonical: "https://www.awebgrow.com/location/nichlaul",
  },
};

export default function NichlaulPage() {
  return (
    <main style={{
      backgroundColor: '#020203',
      minHeight: '100vh',
      paddingTop: '65px',
      paddingBottom: '60px'
    }}>
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="breadcrumb" style={{ background: 'transparent' }}>
            <li className="breadcrumb-item">
              <Link href="/" style={{ color: '#a855f7', textDecoration: 'none' }}>Home</Link>
            </li>
            <li className="breadcrumb-item active text-secondary" aria-current="page">Nichlaul</li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-8">
            <div className="hero-badge mb-3" style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              backdropFilter: 'blur(10px)',
              padding: '6px 16px',
              borderRadius: '50px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#a855f7',
                borderRadius: '50%',
                boxShadow: '0 0 10px #a855f7'
              }} />
              <span style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: '#c084fc',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>📍 Nichlaul, Maharajganj</span>
            </div>

            <h1 className="fw-extrabold text-white mb-3" style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              lineHeight: '1.18',
              fontWeight: 900,
            }}>
              Web Development Company in <span className="text-gradient-purple-blue">Nichlaul</span>
            </h1>

            <p className="lead text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              AWebGrow is a trusted <strong className="text-white">web development company in Nichlaul</strong>, 
              delivering custom websites, mobile apps, and digital solutions to businesses in Maharajganj and Eastern UP.
            </p>

            <div style={{
              background: 'rgba(10, 10, 12, 0.85)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h2 className="h5 fw-bold text-white mb-3">Why Nichlaul Businesses Choose AWebGrow</h2>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#d1d5db' }}>
                  <span style={{ color: '#a855f7' }}>✓</span>
                  <span><strong className="text-white">Local Presence:</strong> We understand Nichlaul's local business needs and deliver solutions that work.</span>
                </li>
                <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#d1d5db' }}>
                  <span style={{ color: '#a855f7' }}>✓</span>
                  <span><strong className="text-white">Affordable Excellence:</strong> Top-quality services at budget-friendly prices for local businesses.</span>
                </li>
                <li className="d-flex align-items-start gap-2 mb-2" style={{ color: '#d1d5db' }}>
                  <span style={{ color: '#a855f7' }}>✓</span>
                  <span><strong className="text-white">Modern Technology:</strong> Using the latest tech to build fast, secure, and scalable solutions.</span>
                </li>
                <li className="d-flex align-items-start gap-2" style={{ color: '#d1d5db' }}>
                  <span style={{ color: '#a855f7' }}>✓</span>
                  <span><strong className="text-white">Client-Focused:</strong> 250+ happy clients and 98% retention rate speak for our service quality.</span>
                </li>
              </ul>
            </div>

            <div className="d-flex gap-3 flex-wrap">
              <Link
                href="/contact"
                className="btn rounded-pill px-4 py-2 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
               >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="btn rounded-pill px-4 py-2 fw-bold"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}>
                Our Services
              </Link>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div style={{
              background: 'rgba(10, 10, 12, 0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '24px'
            }}>
              <h3 className="h6 fw-bold text-white mb-3">📍 Our Nichlaul Office</h3>
              <p className="text-secondary small mb-1">Nichlaul, Maharajganj</p>
              <p className="text-secondary small mb-1">Uttar Pradesh, India</p>
              <p className="text-secondary small mb-3">📞 +91-7267995307</p>
              <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
              <h4 className="h6 fw-bold text-white mb-2">Services We Offer in Nichlaul</h4>
              <ul className="list-unstyled small text-secondary">
                <li className="mb-1">✓ Custom Website Design</li>
                <li className="mb-1">✓ Mobile App Development</li>
                <li className="mb-1">✓ SEO & Digital Marketing</li>
                <li className="mb-1">✓ UI/UX Design</li>
                <li className="mb-1">✓ E-Commerce Solutions</li>
                <li>✓ Business Website Development</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ Local Business Schema for Nichlaul */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "AWebGrow - Nichlaul",
              "description": "Best web development company in Nichlaul offering website design, mobile apps, SEO, and digital marketing.",
              "url": "https://www.awebgrow.com/location/nichlaul",
              "telephone": "+91-7267995307",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nichlaul",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 27.0700,
                "longitude": 83.9900
              },
              "priceRange": "₹₹",
              "openingHours": "Mo-Sa 09:00-18:00"
            })
          }}
        />
      </div>
    </main>
  );
}