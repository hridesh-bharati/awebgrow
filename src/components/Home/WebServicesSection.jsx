'use client';

import React from 'react';
import Link from 'next/link';

const SERVICES = [
  {
    title: 'Web Development',
    desc: 'Fast, responsive, and SEO-friendly websites that convert visitors into customers.',
    icon: 'bi-code-square',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    accentColor: '#3b82f6',
    path: '/services#web-dev'
  },
  {
    title: 'SEO Services',
    desc: 'Rank higher, get discovered, and attract high-quality organic traffic continuously.',
    icon: 'bi-search-heart',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#a855f7',
    path: '/services#seo'
  },
  {
    title: 'Google Ads',
    desc: 'Target the right audience and get more leads with high-converting PPC campaigns.',
    icon: 'bi-google',
    borderColor: 'rgba(249, 115, 22, 0.4)',
    accentColor: '#f97316',
    path: '/services#google-ads'
  },
  {
    title: 'Meta Ads',
    desc: 'Reach, engage, and convert your ideal audience on Facebook & Instagram.',
    icon: 'bi-infinity',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    accentColor: '#ec4899',
    path: '/services#meta-ads'
  },
  {
    title: 'AI Automation',
    desc: 'Automate your business processes and save time with smart AI workflows.',
    icon: 'bi-cpu-fill',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    accentColor: '#ef4444',
    path: '/services#ai'
  }
];

export default function WebServicesSection() {
  return (
    <section className="py-5" style={{ backgroundColor: '#090a0f', color: '#ffffff' }}>
      <div className="container py-4">
        
        {/* HEADER AREA */}
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between mb-5">
          <div>
            <span className="text-uppercase fw-bold text-secondary" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
              WHAT WE DO
            </span>
            <h2 className="display-6 fw-bold text-white mb-0 mt-1">
              Digital Solutions That <br className="d-none d-md-block" />
              Drive Real{' '}
              <span style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Results
              </span>
            </h2>
          </div>
          <div className="mt-3 mt-md-0 text-md-end">
            <p className="text-secondary small mb-2" style={{ maxWidth: '320px' }}>
              From websites to marketing, we provide end-to-end solutions to grow your brand online.
            </p>
            <Link
              href="/services"
              className="btn btn-outline-light rounded-pill px-4 py-2"
              style={{ fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              View All Services <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="row g-4 justify-content-center">
          {SERVICES.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div
                className="h-100 p-4 rounded-4 position-relative overflow-hidden d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: '#10121a',
                  border: `1px solid ${service.borderColor}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease'
                }}
              >
                <div>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${service.borderColor}`
                    }}
                  >
                    <i className={`bi ${service.icon} fs-4`} style={{ color: service.accentColor }}></i>
                  </div>

                  <h4 className="fw-bold text-white mb-2" style={{ fontSize: '1.2rem' }}>
                    {service.title}
                  </h4>
                  <p className="text-secondary mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {service.desc}
                  </p>
                </div>

                <Link
                  href={service.path}
                  className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
                  style={{ color: service.accentColor, fontSize: '0.82rem' }}
                >
                  <span>Learn More</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}