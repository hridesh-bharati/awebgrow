// src\app\location\noida\page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FaCheckCircle,
  FaRocket,
  FaUsers,
  FaCode,
  FaStar,
  FaMapMarkerAlt,
  FaGlobe
} from 'react-icons/fa';
import Header from "@/components/Header/Header"


export const metadata: Metadata = {
  title: "Best Website & App Development Company in Noida | AWebGrow",
  description: "AWebGrow is a leading web development company in Noida. We offer custom website design, mobile apps, SEO, and enterprise software solutions.",
  keywords: "website development company in noida, web developer in noida, app development company noida, seo services noida, awebgrow noida",
  openGraph: {
    title: "Best Website & App Development Company in Noida | AWebGrow",
    description: "Leading IT & web development agency in Noida Sector 62. Custom websites, apps, and digital growth.",
    url: "https://www.awebgrow.com/location/noida",
    type: "website",
  },
  alternates: {
    canonical: "https://www.awebgrow.com/location/noida",
  },
};

export default function BrandPage() {
  return (
   <>
   <Header />
    <main className="container py-5" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <section className="row align-items-center g-5 py-4">
        <div className="col-lg-8 mx-auto text-center">
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <span className="badge bg-pill px-4 py-2" style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}>
              <FaRocket className="me-2" /> Founded 2020
            </span>
            <span className="badge bg-pill px-4 py-2" style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}>
              <FaUsers className="me-2" /> 200+ Clients
            </span>
            <span className="badge bg-pill px-4 py-2" style={{ backgroundColor: 'var(--bg-pill)', color: 'var(--text-secondary)' }}>
              <FaStar className="me-2" /> 4.9 Rating
            </span>
          </div>

          <h1 className="display-3 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            <span className="text-gradient-purple">AWebGrow</span> —
            <span className="text-gradient-pink"> Our Brand Story</span>
          </h1>
          <p className="lead mb-4" style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
            From a passionate startup to India's trusted web development partner —
            built on innovation, transparency, and a relentless pursuit of excellence.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-neon-cta">
              <FaRocket className="me-1" /> Let's Build Together
            </Link>
            <Link href="#story" className="btn-secondary-glow">
              Read Our Story <span className="ms-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="row mt-5" id="story">
        <div className="col-lg-10 mx-auto">

          {/* Who We Are */}
          <section className="mb-5 p-4 p-md-5 rounded-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', backdropFilter: 'blur(4px)' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="display-6">🚀</span>
              <h2 className="h2 fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Who is AWebGrow?</h2>
            </div>
            <p className="lead" style={{ lineHeight: '1.9', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>AWebGrow</strong> is a premium web development company headquartered in India,
              serving clients globally. We specialize in custom website development, mobile app development,
              and digital transformation solutions.
            </p>
            <p style={{ lineHeight: '1.9', color: 'var(--text-secondary)' }}>
              Founded by <strong style={{ color: 'var(--text-primary)' }}>Sushant Rai</strong> and <strong style={{ color: 'var(--text-primary)' }}> Hridesh Bharati</strong>,
              AWebGrow has grown from a small team of passionate developers to a full-service
              digital agency trusted by businesses across India and beyond.
            </p>
            <div className="row g-3 mt-3">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <FaCheckCircle style={{ color: '#a855f7' }} /> 5+ Years of Excellence
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <FaCheckCircle style={{ color: '#a855f7' }} /> 15+ Expert Team Members
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <section className="p-4 p-md-5 rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>🎯 Our Mission</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  To empower businesses with cutting-edge web and mobile solutions that drive growth,
                  enhance user experience, and create lasting digital impact. We believe in delivering
                  excellence through innovation, transparency, and client-centric approach.
                </p>
              </section>
            </div>
            <div className="col-md-6">
              <section className="p-4 p-md-5 rounded-4 h-100" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>🌟 Our Vision</h3>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  To be India's most admired digital transformation partner, recognized for our
                  technical excellence, creative innovation, and unwavering commitment to client success
                  across the globe.
                </p>
              </section>
            </div>
          </div>

          {/* Why Choose Us */}
          <section className="mb-5 p-4 p-md-5 rounded-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="display-6">💎</span>
              <h2 className="h2 fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Why Choose AWebGrow?</h2>
            </div>
            <div className="row g-4">
              {[
                { icon: <FaRocket />, title: '5+ Years of Experience', desc: 'Trusted by 200+ clients across India' },
                { icon: <FaUsers />, title: 'Expert Team', desc: '15+ skilled developers, designers, and marketers' },
                { icon: <FaCode />, title: 'Latest Technologies', desc: 'React, Next.js, Node.js, Python, AWS, and more' },
                { icon: <FaStar />, title: '100% Client Satisfaction', desc: '4.9/5 average rating on Google Reviews' },
              ].map((item, i) => (
                <div className="col-md-6 col-lg-3" key={i}>
                  <div className="d-flex flex-column align-items-start gap-2 p-3 rounded-3" style={{ backgroundColor: 'var(--bg-pill)' }}>
                    <span className="fs-3" style={{ color: '#a855f7' }}>{item.icon}</span>
                    <h4 className="h6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p className="small mb-0" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Our Presence */}
          <section className="mb-5 p-4 p-md-5 rounded-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="display-6">📍</span>
              <h2 className="h2 fw-bold mb-0" style={{ color: 'var(--text-primary)' }}>Our Presence</h2>
            </div>
            <div className="row g-3">
              {[
                { emoji: '🇮🇳', city: 'Noida', address: 'Sector 62, Noida, UP' },
                { emoji: '🇮🇳', city: 'Nichlaul', address: 'Nichlaul, Maharajganj, UP' },
                { emoji: '🌍', city: 'Global', address: 'Serving Clients Worldwide' },
              ].map((loc, i) => (
                <div className="col-md-4" key={i}>
                  <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'var(--bg-pill)', border: '1px solid var(--border-subtle)' }}>
                    <span className="fs-1">{loc.emoji}</span>
                    <h4 className="h5 fw-bold mt-2" style={{ color: 'var(--text-primary)' }}>{loc.city}</h4>
                    <p className="small mb-0" style={{ color: 'var(--text-secondary)' }}>{loc.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="p-5 rounded-4 text-center" style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)',
            border: '1px solid var(--border-subtle)',
          }}>
            <h3 className="fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>Ready to Build Something Amazing?</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Let's create digital experiences that drive growth and leave a lasting impression.
            </p>
            <Link href="/contact" className="btn-neon-cta" style={{ fontSize: '1rem', padding: '12px 36px' }}>
              <FaRocket className="me-2" /> Start Your Project
            </Link>
          </div>

        </div>
      </article>
    </main>
   </>
  );
}

