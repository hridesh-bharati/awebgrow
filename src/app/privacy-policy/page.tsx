import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Privacy Policy | AWebGrow - Web Development Company India",
  description: "Read AWebGrow's privacy policy to understand how we collect, use, and protect your personal data. We are committed to your privacy and data security.",
  keywords: [
    "privacy policy",
    "AWebGrow privacy",
    "data protection",
    "personal data security",
    "website privacy policy India"
  ],
  openGraph: {
    title: "Privacy Policy | AWebGrow",
    description: "AWebGrow's privacy policy - How we protect your data",
    url: "https://awebgrowhb.com/privacy-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://awebgrowhb.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <article 
        className="container py-5"
        aria-labelledby="privacy-heading"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10">
            
            {/* ✅ Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="breadcrumb-item" itemScope itemType="https://schema.org/ListItem">
                  <Link href="/" itemProp="item">
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li className="breadcrumb-item active" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                  <span itemProp="name">Privacy Policy</span>
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>

            {/* ✅ Page Header */}
            <header className="mb-5">
              <h1 
                id="privacy-heading"
                className="fw-bold mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#0f172a' }}
              >
                Privacy Policy
              </h1>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Last Updated: <time dateTime="2026-07-22">July 22, 2026</time>
              </p>
            </header>

            {/* ✅ Introduction */}
            <section className="mb-4" aria-labelledby="intro-heading">
              <h2 id="intro-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                1. Introduction
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                Welcome to <strong>AWebGrow</strong> (&quot;awebgrowhb.com&quot;). We are committed to protecting 
                your personal information and your right to privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                By accessing or using our website, you signify that you have read, understood, and agree to our 
                collection, storage, use, and disclosure of your personal information as described in this 
                Privacy Policy.
              </p>
            </section>

            {/* ✅ Information We Collect */}
            <section className="mb-4" aria-labelledby="info-heading">
              <h2 id="info-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                2. Information We Collect
              </h2>
              <p className="mb-2 fw-semibold" style={{ color: '#334155' }}>Personal Information:</p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>Name and contact details (email address, phone number)</li>
                <li>Business information (company name, website URL)</li>
                <li>Project requirements and preferences</li>
                <li>Communication history with our team</li>
              </ul>
              <p className="mb-2 fw-semibold" style={{ color: '#334155' }}>Automatically Collected Information:</p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on website</li>
                <li>Referring URL and exit pages</li>
              </ul>
            </section>

            {/* ✅ How We Use Your Information */}
            <section className="mb-4" aria-labelledby="use-heading">
              <h2 id="use-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                3. How We Use Your Information
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                We use the information we collect for the following purposes:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>To provide and maintain our <strong>web development</strong> and <strong>digital marketing services</strong></li>
                <li>To communicate with you about your projects and inquiries</li>
                <li>To send you updates, promotional materials, and service information</li>
                <li>To improve our website, services, and user experience</li>
                <li>To comply with legal obligations and enforce our terms</li>
                <li>To analyze website traffic and user behavior for optimization</li>
              </ul>
            </section>

            {/* ✅ Data Protection */}
            <section className="mb-4" aria-labelledby="protection-heading">
              <h2 id="protection-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                4. Data Protection & Security
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                We implement a variety of security measures to maintain the safety of your personal information:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li>SSL (Secure Socket Layer) encryption for data transmission</li>
                <li>Regular security audits and vulnerability scanning</li>
                <li>Secure server infrastructure and firewalls</li>
                <li>Restricted access to personal data (only authorized personnel)</li>
                <li>Regular data backup and disaster recovery protocols</li>
              </ul>
            </section>

            {/* ✅ Cookies Policy */}
            <section className="mb-4" aria-labelledby="cookies-heading">
              <h2 id="cookies-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                5. Cookies Policy
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. 
                Cookies are small text files stored on your device that help us recognize you and remember your preferences.
              </p>
              <p className="mb-2 fw-semibold" style={{ color: '#334155' }}>Types of Cookies We Use:</p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li><strong>Essential Cookies:</strong> Required for website functionality and navigation</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Track your browsing for relevant advertisements</li>
              </ul>
            </section>

            {/* ✅ Third-Party Services */}
            <section className="mb-4" aria-labelledby="third-party-heading">
              <h2 id="third-party-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                6. Third-Party Services
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                We may use third-party services for analytics, payment processing, and communication:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li><strong>Google Analytics:</strong> For website traffic analysis</li>
                <li><strong>Firebase:</strong> For authentication and database services</li>
                <li><strong>Cloudinary:</strong> For media storage and optimization</li>
              </ul>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                These third-party services have their own privacy policies. We recommend reviewing them for 
                more information on how they handle your data.
              </p>
            </section>

            {/* ✅ Your Rights */}
            <section className="mb-4" aria-labelledby="rights-heading">
              <h2 id="rights-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                7. Your Rights
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                You have the following rights regarding your personal data:
              </p>
              <ul className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct any inaccurate information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
            </section>

            {/* ✅ Contact Information */}
            <section className="mb-4" aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="h4 fw-bold mb-3" style={{ color: '#0f172a' }}>
                8. Contact Us
              </h2>
              <p className="mb-3" style={{ lineHeight: '1.8', color: '#475569' }}>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <address className="mb-3" style={{ fontStyle: 'normal', lineHeight: '1.8', color: '#475569' }}>
                <strong>AWebGrow</strong><br />
                Email: <a href="mailto:hridesh027@gmail.com" className="text-decoration-none" style={{ color: '#8b5cf6' }}>hridesh027@gmail.com</a><br />
                Phone: <a href="tel:+917267995307" className="text-decoration-none" style={{ color: '#8b5cf6' }}>+91-7267995307</a><br />
                Website: <a href="https://awebgrowhb.com" className="text-decoration-none" style={{ color: '#8b5cf6' }}>awebgrowhb.com</a>
              </address>
            </section>

            {/* ✅ Footer Note */}
            <footer className="border-top pt-3 mt-5">
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                This privacy policy is effective as of July 22, 2026, and will be updated as necessary. 
                Please check back regularly for any changes.
              </p>
            </footer>

          </div>
        </div>

        {/* ✅ Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy",
              "description": "AWebGrow's privacy policy - How we collect, use, and protect your personal data.",
              "url": "https://awebgrowhb.com/privacy-policy",
              "publisher": {
                "@type": "Organization",
                "name": "AWebGrow",
                "url": "https://awebgrowhb.com"
              },
              "lastReviewed": "2026-07-22"
            })
          }}
        />
      </article>
    </>
  );
}