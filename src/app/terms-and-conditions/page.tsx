import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms and Conditions | AWebGrow - Web Development Company India",
  description: "Read AWebGrow's terms and conditions for using our website and services. Understand your rights, obligations, and our service agreements.",
  keywords: [
    "terms and conditions",
    "AWebGrow terms",
    "service agreement",
    "website terms of use",
    "web development terms India"
  ],
  openGraph: {
    title: "Terms and Conditions | AWebGrow",
    description: "AWebGrow's terms and conditions - Service agreements and policies",
    url: "https://www.awebgrow.com/terms-and-conditions",
    type: "website",
  },
  alternates: {
    canonical: "https://www.awebgrow.com/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <article 
        className="container py-5"
        aria-labelledby="terms-heading"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="breadcrumb-item" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="breadcrumb-item active" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                  <span itemProp="name">Terms and Conditions</span>
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>

            <header className="mb-5">
              <h1 
                id="terms-heading"
                className="fw-bold mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0f172a' }}
              >
                Terms and Conditions
              </h1>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Last Updated: <time dateTime="2026-07-22">July 22, 2026</time>
              </p>
            </header>

            <section className="mb-4" aria-labelledby="acceptance-heading">
              <h2 id="acceptance-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                1. Acceptance of Terms
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                By accessing and using <strong>AWebGrow</strong> (&quot;www.awebgrow.com&quot;), you agree to be bound by 
                these Terms and Conditions. If you do not agree with any part of these terms, you must not use our 
                website or services.
              </p>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                AWebGrow is a leading <strong>web development company in India</strong> providing website development, 
                mobile app development, SEO services, UI/UX design, and digital marketing solutions.
              </p>
            </section>

            <section className="mb-4" aria-labelledby="services-heading">
              <h2 id="services-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                2. Services Provided
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                AWebGrow offers the following professional services:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>Custom <strong>Website Development</strong> (React, Next.js, MERN Stack)</li>
                <li><strong>Mobile App Development</strong> (Android & iOS)</li>
                <li><strong>SEO Services</strong> (Search Engine Optimization)</li>
                <li><strong>UI/UX Design</strong> (User Interface & Experience Design)</li>
                <li><strong>Digital Marketing</strong> (Google Ads, Meta Ads, Content Marketing)</li>
                <li><strong>Ecommerce Development</strong> (Shopify, WooCommerce, Custom Solutions)</li>
                <li>Cloud & DevOps Infrastructure Management</li>
              </ul>
            </section>

            <section className="mb-4" aria-labelledby="obligations-heading">
              <h2 id="obligations-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                3. User Obligations
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                As a user of our website and services, you agree to:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>Provide accurate and complete information when contacting us</li>
                <li>Use our website for lawful purposes only</li>
                <li>Not engage in any activity that may damage or disrupt our services</li>
                <li>Respect intellectual property rights of AWebGrow and third parties</li>
                <li>Not attempt unauthorized access to our systems or data</li>
              </ul>
            </section>

            <section className="mb-4" aria-labelledby="payment-heading">
              <h2 id="payment-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                4. Payment Terms
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                All payments for our services are subject to the following terms:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>Project pricing is provided based on scope and requirements</li>
                <li>Payment schedules are agreed upon before project commencement</li>
                <li>Late payments may incur additional charges</li>
                <li>All prices are in Indian Rupees (INR) unless specified otherwise</li>
                <li>Taxes are additional as applicable under Indian law</li>
              </ul>
            </section>

            <section className="mb-4" aria-labelledby="ip-heading">
              <h2 id="ip-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                5. Intellectual Property
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                All content on this website including text, graphics, logos, images, and software is the property of 
                AWebGrow and is protected by Indian and international copyright laws.
              </p>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                Upon full payment, clients receive ownership of the final deliverables. However, AWebGrow retains 
                the right to display the work in our portfolio and marketing materials.
              </p>
            </section>

            <section className="mb-4" aria-labelledby="liability-heading">
              <h2 id="liability-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                6. Limitation of Liability
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                AWebGrow shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from the use of our website or services. We make no warranties regarding the accuracy, 
                reliability, or completeness of the content on this website.
              </p>
            </section>

            <section className="mb-4" aria-labelledby="termination-heading">
              <h2 id="termination-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                7. Termination
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                We reserve the right to terminate or suspend access to our services immediately, without prior 
                notice, for any breach of these Terms and Conditions.
              </p>
            </section>

            <section className="mb-4" aria-labelledby="law-heading">
              <h2 id="law-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                8. Governing Law
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                These Terms and Conditions are governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Uttar Pradesh, India.
              </p>
            </section>

            <section className="mb-4" aria-labelledby="terms-contact-heading">
              <h2 id="terms-contact-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                9. Contact Information
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                For any questions regarding these Terms and Conditions, please contact:
              </p>
              <address className="mb-3" style={{ fontStyle: 'normal', lineHeight: '1.8', color: '#475569' }}>
                <strong>AWebGrow</strong><br />
                Email: <a href="mailto:hridesh027@gmail.com" className="text-decoration-none" style={{ color: '#8b5cf6' }}>hridesh027@gmail.com</a><br />
                Phone: <a href="tel:+917267995307" className="text-decoration-none" style={{ color: '#8b5cf6' }}>+91-7267995307</a><br />
                Website: <a href="https://www.awebgrow.com" className="text-decoration-none" style={{ color: '#8b5cf6' }}>www.awebgrow.com</a>
              </address>
            </section>

            <footer className="border-top pt-3 mt-5">
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                These terms and conditions are effective as of July 22, 2026. AWebGrow reserves the right 
                to modify these terms at any time. Continued use of our services constitutes acceptance of 
                the updated terms.
              </p>
            </footer>

          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms and Conditions",
              "description": "AWebGrow's terms and conditions - Service agreements and policies for web development, SEO, and digital marketing services.",
              "url": "https://www.awebgrow.com/terms-and-conditions",
              "publisher": {
                "@type": "Organization",
                "name": "AWebGrow",
                "url": "https://www.awebgrow.com"
              },
              "lastReviewed": "2026-07-22"
            })
          }}
        />
      </article>
    </>
  );
}