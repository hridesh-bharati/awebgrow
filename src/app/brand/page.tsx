// src/app/brand/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: "AWebGrow - India's Leading Web Development Company | Brand Story",
  description: "AWebGrow is a trusted web development company in India. We build custom websites, mobile apps, and digital solutions for startups and enterprises. Our story of innovation and excellence.",
  keywords: "awebgrow, awebgrow brand, awebgrow story, awebgrow company, web development company india",
  openGraph: {
    title: "AWebGrow - Leading Web Development Company India",
    description: "Our story, mission, and vision - AWebGrow",
    url: "https://www.awebgrow.com/brand",
  },
  alternates: {
    canonical: "https://www.awebgrow.com/brand",
  },
};

export default function BrandPage() {
  return (
    <main className="container py-5">
      <h1 className="display-4 fw-bold mb-4" style={{ color: '#0f172a' }}>
        AWebGrow - Our Brand Story</h1>
      
      <article className="row">
        <div className="col-lg-8 mx-auto">
          <section className="mb-5">
            <h2 className="h3 fw-bold mb-3">Who is AWebGrow?</h2>
            <p className="lead" style={{ lineHeight: '1.8' }}>
              <strong>AWebGrow</strong> is a premium web development company headquartered in India, 
              serving clients globally. We specialize in custom website development, mobile app development, 
              and digital transformation solutions..
            </p>
            <p style={{ lineHeight: '1.8', color: '#475569' }}>
              Founded by <strong>Sushant Rai </strong> and <strong> Hridesh Bharati</strong>, 
              AWebGrow has grown from a small team of passionate developers to a full-service 
              digital agency trusted by businesses across India and beyond.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold mb-3">Our Mission</h2>
            <p style={{ lineHeight: '1.8', color: '#475569' }}>
              To empower businesses with cutting-edge web and mobile solutions that drive growth, 
              enhance user experience, and create lasting digital impact. We believe in delivering 
              excellence through innovation, transparency, and client-centric approach.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold mb-3">Why Choose AWebGrow?</h2>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <span className="text-primary fs-3 me-3">✓</span>
                <div>
                  <strong>5+ Years of Experience</strong>
                  <p className="text-muted">Trusted by 200+ clients across India</p>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="text-primary fs-3 me-3">✓</span>
                <div>
                  <strong>Expert Team</strong>
                  <p className="text-muted">15+ skilled developers, designers, and marketers</p>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="text-primary fs-3 me-3">✓</span>
                <div>
                  <strong>Latest Technologies</strong>
                  <p className="text-muted">React, Next.js, Node.js, Python, AWS, and more</p>
                </div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="text-primary fs-3 me-3">✓</span>
                <div>
                  <strong>100% Client Satisfaction</strong>
                  <p className="text-muted">4.9/5 average rating on Google Reviews</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="mb-5">
            <h2 className="h3 fw-bold mb-3">Our Presence</h2>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card p-3">
                  <h4>🇮🇳 Noida</h4>
                  <p className="text-muted">Sector 62, Noida, UP</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h4>🇮🇳 Nichlaul</h4>
                  <p className="text-muted">Nichlaul, Maharajganj, UP</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h4>🌍 Global</h4>
                  <p className="text-muted">Serving Clients Worldwide</p>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-light p-4 rounded-3">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Let's Work Together
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}