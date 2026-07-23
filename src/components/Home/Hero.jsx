'use client';

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import './Hero.css';
import WebServicesSection from './WebServicesSection.jsx';

// Detailed data for each service node
const SERVICES_DATA = {
  webdev: {
    title: 'Web Development',
    badge: 'Custom & High Converting',
    headline: 'High-Converting, Custom Web Development Solutions',
    subHeadline: 'We build fast, responsive, and visually stunning websites that convert visitors into paying clients.',
    overview: 'Aapki website aapke business ka digital storefront hai. Hum sirf design nahi karte, balki ek aisa fast aur secure web platform tayyar karte hain jo aapke brand image ko boost kare aur visitors ko customers me convert kare.',
    features: [
      'Custom UI/UX Design: Modern, clean, aur brand-focused layout jo user engagement badhaye.',
      '100% Mobile & Device Responsive: Smartphone, tablet, aur desktop har screen par smooth performance.',
      'Speed & Performance Optimization: Fast loading speed jo user bounce rate ko kam kare aur SEO me help kare.',
      'Scalable Tech Stack: React, Next.js, WordPress, ya custom CMS ke saath robust architecture.',
      'E-Commerce & Portals: Secure payment gateway integration ke saath online store aur custom web portals.'
    ],
    ctaText: 'Build My Website',
    ctaLink: '/contact?service=webdev',
    themeColor: '#3b82f6',
    icon: 'bi-code-slash'
  },
  appdev: {
    title: 'App Development',
    badge: 'iOS & Android Solutions',
    headline: 'Next-Gen Android & iOS Mobile Applications',
    subHeadline: 'Turn your business ideas into feature-rich, high-performing mobile apps.',
    overview: 'Aaj ke digital era me mobile app aapke customers ke saath direct connection banane ka sabse best tarika hai. Hum intuitive design aur solid backend ke saath high-quality mobile applications develop karte hain.',
    features: [
      'Cross-Platform Development: Single codebase se Android aur iOS dono platforms ke liye app execution.',
      'User-Centric Architecture: Easy navigation aur smooth user experience jo users ko retain rakhe.',
      'API & Backend Integration: Real-time data sync, secure database, aur third-party service integrations.',
      'Push Notifications & Analytics: Direct customer communication aur user behavior tracking.',
      'End-to-End Deployment: Play Store & App Store publish karne se lekar maintenance tak ka complete support.'
    ],
    ctaText: 'Develop My App',
    ctaLink: '/contact?service=appdev',
    themeColor: '#10b981',
    icon: 'bi-phone-fill'
  },
  pwa: {
    title: 'PWA Development',
    badge: 'App-Like Web Experience',
    headline: 'High-Performance Progressive Web Apps (PWA)',
    subHeadline: 'Deliver native app experience directly through the web with zero app store downloads required.',
    overview: 'PWA aapki website ko ek full-featured mobile app jaisa experience deta hai. Offline access, instant loading, aur push notifications ke saath user retention aur engagement multiple times badhayein.',
    features: [
      'Offline & Low-Network Support: Service workers ke saath slow connectivity me bhi continuous site performance.',
      'Add to Home Screen (A2HS): App Store install ke bina user ke phone screen par instant installation icon.',
      'Push Notifications: Real-time user updates aur marketing alerts directly to user devices.',
      'Lightning-Fast Speed: Advanced caching mechanisms ke saath near-instantaneous load times.',
      'Cost-Effective Alternative: Native mobile app development ke muqable kam cost me full app experience.'
    ],
    ctaText: 'Build My PWA',
    ctaLink: '/contact?service=pwa',
    themeColor: '#06b6d4',
    icon: 'bi-layout-text-window-reverse'
  },
  seo: {
    title: 'SEO (Search Engine Optimization)',
    badge: 'Organic Search Growth',
    headline: 'Dominate Google Search & Drive Organic Traffic',
    subHeadline: 'Get your business to the top of Google and get consistent, high-converting organic leads.',
    overview: 'Agar aapki website Google ke pehle page par nahi hai, toh aap apne competitors ko business de rahe hain. Hum advanced data-driven SEO techniques ka use karke aapki organic visibility aur rankings ko multiply karte hain.',
    features: [
      'In-Depth Keyword Strategy: Target intent-based keywords jo actual business-ready leads laayein.',
      'On-Page & Content Optimization: Title tags, meta descriptions, image optimization, aur high-value content strategy.',
      'Technical SEO Audit: Site speed, crawlability, indexing, aur mobile-friendliness ki technical fixes.',
      'High-Authority Link Building: White-hat backlink strategies jo aapki domain authority ko boost karein.',
      'Local SEO Setup: Google Business Profile optimization local customer reach badhane ke liye.'
    ],
    ctaText: 'Boost My Ranking',
    ctaLink: '/contact?service=seo',
    themeColor: '#a855f7',
    icon: 'bi-search-heart'
  },
  llmo: {
    title: 'LLMO (LLM Optimization)',
    badge: 'Generative AI Search Engine Rank',
    headline: 'LLMO: Get Mentioned in ChatGPT, Perplexity & Gemini Responses',
    subHeadline: 'Optimize your brand visibility for next-generation AI Search Engines & Conversational Assistants.',
    overview: 'Future of Search SEO se aage LLMO (Large Language Model Optimization) par shift ho raha hai. Hum aapke brand data aur content ko structured aur authoritative banate hain taaki ChatGPT, Claude, aur Perplexity jaise AI systems aapke business ko recommend karein.',
    features: [
      'Entity & Knowledge Graph Optimization: AI models ko aapke brand name, services, aur authority ki clear mapping dena.',
      'Citation & Source Building: High-authority AI training datasets aur citations me brand presence confirm karna.',
      'Conversational Keyword Targeting: Natural language queries aur prompt-based searches ke liye content tailor karna.',
      'Schema & Structured Data Architecture: Machine-readable JSON-LD schemas se instant AI parsing enable karna.',
      'AI Brand Reputation Audit: AI tools aapke brand ke baare me kya response dete hain uski real-time tracking.'
    ],
    ctaText: 'Optimize For AI Search',
    ctaLink: '/contact?service=llmo',
    themeColor: '#8b5cf6',
    icon: 'bi-robot'
  },
  googleads: {
    title: 'Google Ads (PPC)',
    badge: 'Instant Qualified Leads',
    headline: 'Laser-Targeted Google Ads for Instant Qualified Leads',
    subHeadline: 'Put your brand in front of customers who are actively searching for your services right now.',
    overview: 'Instant results aur predictable revenue ke liye Google Ads sabse powerful medium hai. Hum aapke ad budget ka har rupee optimal tareeqe se spend karke maximum ROI generate karte hain.',
    features: [
      'Google Search & Shopping Ads: Intent-based text ads aur e-commerce product listings.',
      'YouTube & Display Ads: High-impact visual campaigns brand awareness aur remarketing ke liye.',
      'Negative Keyword Filtering: Unwanted clicks ko rok kar ad spend wastage ko zero karna.',
      'Conversion Rate Optimization (CRO): Dedicated landing page tweaks for higher conversion rates.',
      'Transparent ROI Tracking: Detailed weekly/monthly reporting on cost-per-lead (CPL) aur return on ad spend (ROAS).'
    ],
    ctaText: 'Launch My Campaign',
    ctaLink: '/contact?service=googleads',
    themeColor: '#f97316',
    icon: 'bi-google'
  },
  metaads: {
    title: 'Meta Ads (FB & Instagram)',
    badge: 'Brand Awareness & Retargeting',
    headline: 'Scale Your Brand With Targeted Social Media Ads',
    subHeadline: 'Reach millions of potential buyers on Facebook & Instagram with high-converting ad copies.',
    overview: 'Social media targeting se apne exact audience pool tak pahocho. Direct lead forms, high visual ads, aur laser retargeting ke sath sales skyrocket karein.',
    features: [
      'Custom Audience & Retargeting: Existing visitors aur buyers ko dobara convert karne waale ads.',
      'High-Converting Creative Ads: Engaging video & carousel designs optimized for clicks.',
      'Lead Form Automation: Direct Facebook/Instagram lead sync straight to your CRM.',
      'A/B Testing Strategies: Creative aur copy variants test karke sabse kam cost per lead prapt karna.'
    ],
    ctaText: 'Start Meta Ads',
    ctaLink: '/contact?service=metaads',
    themeColor: '#ec4899',
    icon: 'bi-infinity'
  },
  aisolutions: {
    title: 'AI Solutions',
    badge: 'Next-Gen Automation',
    headline: 'Smart AI Automation & Next-Gen Digital Solutions',
    subHeadline: 'Streamline operations, automate customer support, and scale faster using Artificial Intelligence.',
    overview: 'Modern AI tools ka use karke apne business ke repetitive tasks ko automate karein aur customer experience ko next level par le jayein. Hum tailor-made AI solutions integrate karte hain jo aapka time aur operational cost bachati hain.',
    features: [
      '24/7 Custom AI Chatbots: Website aur WhatsApp par instant customer inquiry handling aur automated lead capture.',
      'Workflow & Process Automation: Repetitive manual tasks ko intelligent automated systems me convert karna.',
      'Predictive Analytics: Customer data aur trends analyze karke smarter business decision support.',
      'AI-Powered CRM Integration: Sales pipelines ko automatically organize aur follow-ups automate karna.',
      'Custom AI Tool Development: Aapke business requirements ke hisab se specialized AI integration.'
    ],
    ctaText: 'Automate My Business',
    ctaLink: '/contact?service=aisolutions',
    themeColor: '#ef4444',
    icon: 'bi-cpu-fill'
  }
};

export default function Hero() {
  const [activeServiceKey, setActiveServiceKey] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const activeService = activeServiceKey ? SERVICES_DATA[activeServiceKey] : null;

  return (
    <section id="hero" className="hero-section">
      {/* BACKGROUND GLOW SPHERES */}
      <div className="glow-sphere-1" />
      <div className="glow-sphere-2" />

      <div className="container position-relative z-2">
        <div className="row align-items-center gy-4">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="col-12 col-lg-7 text-center text-lg-start hero-left-content">
            
            {/* BADGE */}
            <div className="hero-badge mb-3 mx-auto mx-lg-0" data-aos="fade-down" data-aos-delay="100">
              <span className="badge-dot-pink" />
              <span className="badge-text-glow">WE BUILD. YOU GROW.</span>
            </div>

            {/* MAIN TITLE */}
            <h1
              className="fw-extrabold text-white mb-3"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{
                fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
                lineHeight: '1.18',
                letterSpacing: '-0.03em',
                fontWeight: 900,
              }}
            >
              Building Digital{' '}
              <span className="text-gradient-purple-blue">Experiences</span>
              <br />
              That Drive Real{' '}
              <span className="text-gradient-pink-orange" style={{ filter: 'drop-shadow(0 0 20px rgba(255,0,128,0.3))' }}>
                Business Growth.
              </span>
            </h1>

            {/* SUBTITLE */}
            <p
              className="mb-4 mx-auto mx-lg-0 text-secondary"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                maxWidth: '540px',
                lineHeight: '1.65',
                fontWeight: 500
              }}
            >
              AWebGrow helps brands and businesses transform ideas into powerful digital products that attract, engage, and convert.
            </p>

            {/* BUTTONS */}
            <div
              className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link href="/services" className="btn-neon-cta" style={{ padding: '11px 26px', fontSize: '0.85rem', fontWeight: 800 }}>
                <span>Explore Our Services</span>
                <i className="bi bi-arrow-right"></i>
              </Link>

              <Link href="/about" className="btn-secondary-glow" style={{ padding: '10px 24px', fontWeight: 700 }}>
                <i className="bi bi-play-circle-fill" style={{ color: '#a855f7' }}></i>
                <span>About our compnay</span>
              </Link>
            </div>

            {/* RATING */}
            <div
              className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2.5 pt-1"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <i className="bi bi-star-fill me-1"></i>
                <span className="fw-bold text-white ms-1">4.9/5</span>
              </div>
              <div className='ms-1' style={{ height: '14px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <span className="text-secondary" style={{ fontSize: '0.78rem', fontWeight: 500 }}>
                Trusted by 45+ Clients Worldwide
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: CIRCULAR ORBIT (8 CLICKABLE NODES) */}
          <div className="col-12 col-lg-5 text-center mt-0 pt-0" data-aos="zoom-in" data-aos-delay="300">
            <div className="orbit-wrapper">
              
              <div className="center-brand-box">
                <Image
                  src="/images/home-circle-image.png"
                  alt="AWebGrow Brand Logo"
                  width={135}
                  height={135}
                  className="brand-image-fit"
                  priority
                />
              </div>

              <div className="orbit-circle-path">
                {/* 1. WEB DEV */}
                <div 
                  className="orbit-node-item node-pos-1" 
                  onClick={() => setActiveServiceKey('webdev')}
                  role="button"
                  style={{ border: '1px solid rgba(59,130,246,0.6)', boxShadow: '0 0 10px rgba(59,130,246,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-code-slash text-info" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>Web Dev</span>
                  </div>
                </div>

                {/* 2. APP DEV */}
                <div 
                  className="orbit-node-item node-pos-2" 
                  onClick={() => setActiveServiceKey('appdev')}
                  role="button"
                  style={{ border: '1px solid rgba(16,185,129,0.6)', boxShadow: '0 0 10px rgba(16,185,129,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-phone-fill text-success" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>App Dev</span>
                  </div>
                </div>

                {/* 3. PWA */}
                <div 
                  className="orbit-node-item node-pos-3" 
                  onClick={() => setActiveServiceKey('pwa')}
                  role="button"
                  style={{ border: '1px solid rgba(6,182,212,0.6)', boxShadow: '0 0 10px rgba(6,182,212,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-layout-text-window-reverse" style={{ color: '#06b6d4', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>PWA</span>
                  </div>
                </div>

                {/* 4. SEO */}
                <div 
                  className="orbit-node-item node-pos-4" 
                  onClick={() => setActiveServiceKey('seo')}
                  role="button"
                  style={{ border: '1px solid rgba(168,85,247,0.6)', boxShadow: '0 0 10px rgba(168,85,247,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-search-heart" style={{ color: '#a855f7', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>SEO</span>
                  </div>
                </div>

                {/* 5. LLMO */}
                <div 
                  className="orbit-node-item node-pos-5" 
                  onClick={() => setActiveServiceKey('llmo')}
                  role="button"
                  style={{ border: '1px solid rgba(139,92,246,0.6)', boxShadow: '0 0 10px rgba(139,92,246,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-robot" style={{ color: '#8b5cf6', fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.42rem', color: '#e4e4e7', fontWeight: 600 }}>LLMO</span>
                  </div>
                </div>

                {/* 6. GOOGLE ADS */}
                <div 
                  className="orbit-node-item node-pos-6" 
                  onClick={() => setActiveServiceKey('googleads')}
                  role="button"
                  style={{ border: '1px solid rgba(249,115,22,0.6)', boxShadow: '0 0 10px rgba(249,115,22,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-google text-warning" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.38rem', color: '#e4e4e7', fontWeight: 600 }}>Google Ads</span>
                  </div>
                </div>

                {/* 7. META ADS */}
                <div 
                  className="orbit-node-item node-pos-7" 
                  onClick={() => setActiveServiceKey('metaads')}
                  role="button"
                  style={{ border: '1px solid rgba(236,72,153,0.6)', boxShadow: '0 0 10px rgba(236,72,153,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-infinity" style={{ color: '#ec4899', fontSize: '0.85rem' }}></i>
                    <span style={{ fontSize: '0.38rem', color: '#e4e4e7', fontWeight: 600 }}>Meta Ads</span>
                  </div>
                </div>

                {/* 8. AI SOLUTIONS */}
                <div 
                  className="orbit-node-item node-pos-8" 
                  onClick={() => setActiveServiceKey('aisolutions')}
                  role="button"
                  style={{ border: '1px solid rgba(239,68,68,0.6)', boxShadow: '0 0 10px rgba(239,68,68,0.4)', cursor: 'pointer' }}
                >
                  <div className="orbit-node-inner">
                    <i className="bi bi-cpu-fill text-danger" style={{ fontSize: '0.8rem' }}></i>
                    <span style={{ fontSize: '0.38rem', color: '#e4e4e7', fontWeight: 600 }}>AI Solutions</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

     {/* STATS STRIP */}
<div className="row g-2 my-4 pt-1">
  {[
    { delay: 200, border: '#3b82f6', icon: 'bi-globe text-info', number: '150+', label: 'Websites Built', numClass: 'text-gradient-purple-blue' },
    { delay: 300, border: '#a855f7', icon: 'bi-emoji-smile', iconColor: '#c084fc', number: '250+', label: 'Happy Clients', grad: 'linear-gradient(135deg, #c084fc, #a855f7)' },
    { delay: 400, border: '#f97316', icon: 'bi-graph-up-arrow text-warning', number: '45+', label: 'Leads Generated', grad: 'linear-gradient(135deg, #fb923c, #f97316)' },
    { delay: 500, border: '#ec4899', icon: 'bi-trophy', iconColor: '#f472b6', number: '98%', label: 'Client Retention', numClass: 'text-gradient-pink-orange' }
  ].map((stat, i) => (
    <div key={i} className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={stat.delay}>
      <div className="stat-card-glow text-center" style={{ borderBottom: `3px solid ${stat.border}` }}>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
          <i className={`bi ${stat.icon} fs-6`} style={stat.iconColor ? { color: stat.iconColor } : {}}></i>
          <h2 
            className={`stat-number ${stat.numClass || ''}`}
            style={stat.grad ? { background: stat.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
          >
            {stat.number}
          </h2>
        </div>
        <p className="text-secondary fw-medium mb-0" style={{ fontSize: '0.7rem' }}>{stat.label}</p>
      </div>
    </div>
  ))}
</div>
      </div>

      <WebServicesSection />

      {/* --- SERVICE DETAILS MODAL --- */}
      {activeService && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1055 }}
          onClick={() => setActiveServiceKey(null)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="modal-content text-white p-3 p-md-4" 
              style={{ 
                background: '#0d0d15', 
                border: `1px solid ${activeService.themeColor}`,
                borderRadius: '16px',
                boxShadow: `0 0 25px ${activeService.themeColor}40`
              }}
            >
              {/* Modal Header */}
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${activeService.icon} fs-4`} style={{ color: activeService.themeColor }}></i>
                  <span className="badge rounded-pill px-3 py-1" style={{ backgroundColor: `${activeService.themeColor}20`, color: activeService.themeColor, border: `1px solid ${activeService.themeColor}50` }}>
                    {activeService.badge}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setActiveServiceKey(null)}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body my-2">
                <h3 className="fw-bold mb-2" style={{ color: '#fff', fontSize: '1.5rem' }}>
                  {activeService.headline}
                </h3>
                <p className="fw-medium text-light opacity-75 mb-3" style={{ fontSize: '0.95rem' }}>
                  {activeService.subHeadline}
                </p>

                <div className="p-3 mb-3 rounded-3" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${activeService.themeColor}` }}>
                  <p className="mb-0" style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#d1d5db' }}>
                    {activeService.overview}
                  </p>
                </div>

                <h6 className="fw-bold mb-2 text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                  KEY FEATURES & SERVICES:
                </h6>
                <ul className="list-unstyled mb-0">
                  {activeService.features.map((feature, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: activeService.themeColor, minWidth: '16px' }}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 pt-2 d-flex justify-content-between align-items-center">
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                  onClick={() => setActiveServiceKey(null)}
                >
                  Close
                </button>
                <Link 
                  href={activeService.ctaLink} 
                  className="btn rounded-pill px-4 py-2 fw-bold"
                  style={{ backgroundColor: activeService.themeColor, color: '#fff', border: 'none', boxShadow: `0 0 15px ${activeService.themeColor}80` }}
                >
                  {activeService.ctaText} <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}