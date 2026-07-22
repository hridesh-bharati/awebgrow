"use client";

import React, { useState } from 'react';
import Footer from '../Footer/Footer';

const categories = [
  { id: 'services', name: 'Services', icon: 'bi-briefcase', activeBg: 'linear-gradient(135deg, #2563eb, #1d4ed8)', activeColor: '#2563eb' },
  { id: 'stack', name: 'Technology Stack', icon: 'bi-layers', activeBg: 'linear-gradient(135deg, #7c3aed, #6d28d9)', activeColor: '#7c3aed' },
  { id: 'process', name: 'Development Process', icon: 'bi-gear', activeBg: 'linear-gradient(135deg, #059669, #047857)', activeColor: '#059669' },
  { id: 'devops', name: 'Security & Performance', icon: 'bi-shield-check', activeBg: 'linear-gradient(135deg, #dc2626, #b91c1c)', activeColor: '#dc2626' },
  { id: 'business', name: 'Business & Pricing', icon: 'bi-cash-coin', activeBg: 'linear-gradient(135deg, #d97706, #b45309)', activeColor: '#d97706' },
  { id: 'seo', name: 'SEO & Marketing', icon: 'bi-graph-up-arrow', activeBg: 'linear-gradient(135deg, #db2777, #be185d)', activeColor: '#db2777' }
];

const faqs = [
  // Services
  {
    category: "services",
    question: "What types of web applications do you develop?",
    answer: "We develop next-generation web applications ranging from simple websites to complex enterprise solutions. Our expertise includes SPAs, PWAs, e-commerce platforms, SaaS products, and custom web portals tailored to your business needs."
  },
  {
    category: "services",
    question: "Do you offer mobile app development services?",
    answer: "Yes, we provide comprehensive mobile app development for both iOS and Android platforms. We build native, hybrid, and cross-platform applications using React Native and other modern frameworks."
  },
  {
    category: "services",
    question: "What is your approach to UI/UX design?",
    answer: "Our design process is user-centric and data-driven. We create interactive, engaging designs with modern aesthetics, focusing on accessibility, responsive layouts, and seamless user experiences that drive conversions."
  },

  // Technology Stack
  {
    category: "stack",
    question: "What frontend technologies do you use?",
    answer: "Our frontend stack includes Next.js, React, TypeScript, and Tailwind CSS. We leverage these modern technologies to build fast, responsive, and interactive user interfaces with excellent developer experience."
  },
  {
    category: "stack",
    question: "What backend technologies do you specialize in?",
    answer: "We work with Node.js, Python, GraphQL, and various databases including MongoDB, PostgreSQL, and Redis. This allows us to build robust, scalable, and high-performance backend systems."
  },
  {
    category: "stack",
    question: "What cloud services do you use?",
    answer: "We leverage AWS (Amazon Web Services) for cloud infrastructure, along with Docker for containerization, Kubernetes for orchestration, and Terraform for infrastructure as code. This ensures scalable and reliable deployments."
  },
  {
    category: "stack",
    question: "What makes your technology ecosystem modern?",
    answer: "Our technology ecosystem combines cutting-edge tools including Next.js, React, TypeScript, Node.js, Tailwind CSS, GraphQL, MongoDB, PostgreSQL, Redis, ElasticSearch, AWS, Docker, Kubernetes, Terraform, Git, Jenkins, Prometheus, and Grafana for comprehensive digital solutions."
  },
  {
    category: "stack",
    question: "Do you work with ElasticSearch?",
    answer: "Yes, we implement ElasticSearch for powerful search capabilities, real-time analytics, and log management. It helps build fast, relevant search experiences and data analysis for your applications."
  },

  // Development Process
  {
    category: "process",
    question: "What is your development methodology?",
    answer: "We follow agile development methodologies with iterative sprints. This ensures continuous feedback, faster delivery, and the ability to adapt to changing requirements throughout the project lifecycle."
  },
  {
    category: "process",
    question: "How do you ensure code quality and reliability?",
    answer: "We implement rigorous quality assurance processes including automated testing, code reviews, continuous integration, and performance testing. Our goal is to deliver secure, reliable, and scalable applications."
  },
  {
    category: "process",
    question: "Do you provide project optimization services?",
    answer: "Absolutely. We optimize applications for speed, performance, and SEO. This includes code optimization, asset compression, caching strategies, CDN integration, and search engine optimization techniques."
  },

  // Security & Performance
  {
    category: "devops",
    question: "What is your DevOps approach?",
    answer: "We implement modern DevOps practices including CI/CD pipelines using Jenkins, version control with Git, automated monitoring with Prometheus and Grafana, and containerized deployments to ensure smooth and reliable operations."
  },
  {
    category: "devops",
    question: "How do you handle security in your applications?",
    answer: "Security is a top priority. We implement comprehensive security measures including data encryption, secure authentication, input validation, regular security audits, and compliance with industry security standards."
  },
  {
    category: "devops",
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes, we offer comprehensive maintenance and support packages including bug fixes, security updates, performance monitoring, feature enhancements, and 24/7 technical support to ensure your application runs smoothly."
  },
  {
    category: "devops",
    question: "What monitoring and observability tools do you use?",
    answer: "We use Prometheus for metrics collection and Grafana for visualization and monitoring. This provides real-time insights into application performance, system health, and user behavior."
  },

  // Business & Pricing
  {
    category: "business",
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on complexity and scope. A simple website typically takes 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timeline estimates during the consultation phase."
  },
  {
    category: "business",
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Each project is custom-quoted based on specific requirements, scope, and complexity."
  },
  {
    category: "business",
    question: "Do you offer scaling solutions?",
    answer: "Yes, we build scalable applications that can grow with your business. We design architectures that can handle increased traffic, data volume, and user load through horizontal scaling, load balancing, and microservices architecture."
  },

  // SEO & Marketing
  {
    category: "seo",
    question: "Do you provide SEO services?",
    answer: "Yes, we offer comprehensive SEO optimization including on-page SEO, technical SEO, content strategy, and performance optimization. We ensure your application is optimized for search engines to improve visibility and organic traffic."
  },
  {
    category: "seo",
    question: "What digital marketing services do you offer?",
    answer: "We provide digital marketing solutions including social media integration, analytics tracking, conversion optimization, and marketing automation to help you reach your target audience effectively."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('services');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <section 
      className="py-5 position-relative overflow-hidden w-100 bg-theme-main text-theme-primary border-top" 
      id="faq" 
      style={{ borderColor: 'var(--border-subtle)' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* AMBIENT BACKGROUND GLOWS */}
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-1" 
        style={{ width: '500px', height: '500px', top: '10%', left: '-5%' }} 
      />
      <div 
        className="position-absolute rounded-circle pointer-events-none glow-sphere-2" 
        style={{ width: '500px', height: '500px', bottom: '10%', right: '-5%' }} 
      />

      <div className="container px-4 position-relative z-1">
        
        {/* Modern Section Header */}
        <div className="text-center mb-5" data-aos="fade-up">
          <div 
            className="d-inline-flex align-items-center gap-2 px-3.5 py-1.5 rounded-pill mb-3"
            style={{
              background: 'rgba(255, 0, 128, 0.08)',
              border: '1.5px solid rgba(255, 0, 128, 0.35)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(255, 0, 128, 0.15)'
            }}
          >
            <span style={{ width: '7px', height: '7px', backgroundColor: '#ff0080', borderRadius: '50%', boxShadow: '0 0 10px #ff0080' }} />
            <span className="fw-black text-uppercase" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#ff77bc', fontWeight: 800 }}>
              💡 KNOWLEDGE BASE
            </span>
          </div>

          <h2 className="display-5 fw-black mb-3 text-theme-primary" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
            Frequently Asked{' '}
            <span className="text-gradient-pink-orange" style={{ fontWeight: 900, filter: 'drop-shadow(0 0 25px rgba(255, 0, 128, 0.35))' }}>
              Questions
            </span>
          </h2>

          <p className="mx-auto text-theme-secondary fs-6" style={{ maxWidth: '600px', fontWeight: 500 }}>
            Explore our ecosystem specific guides and quick responses curated for next-gen digital transformation.
          </p>
        </div>

        {/* Dynamic Category Pill Tabs */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div 
              className="p-3 rounded-4 border d-flex flex-wrap justify-content-center align-items-center gap-2.5 shadow-sm" 
              data-aos="fade-up"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
            >
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenIndex(null);
                    }}
                    className={`btn px-4 py-2 m-1 rounded-pill d-inline-flex align-items-center gap-2 fw-black tracking-wide border-0 transition-all ${
                      isActive ? 'text-white shadow-sm' : 'text-theme-secondary'
                    }`}
                    style={{ 
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      background: isActive ? category.activeBg : 'var(--bg-pill)',
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className={`bi ${category.icon} d-flex fs-6`}></i>
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Accordion Wrapper */}
        <div className="row justify-content-center">
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const activeColor = currentCategory?.activeColor || '#3b82f6';

              return (
                <div 
                  key={index} 
                  className="rounded-4 border mb-3 overflow-hidden" 
                  style={{ 
                    backgroundColor: 'var(--bg-card)',
                    borderColor: isOpen ? activeColor : 'var(--border-subtle)',
                    boxShadow: isOpen ? `0 10px 30px ${activeColor}20` : '0 4px 15px var(--shadow-color)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 className="m-0">
                    <button
                      className="btn text-decoration-none w-100 p-4 d-flex justify-content-between align-items-center border-0 shadow-none"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="fw-black text-start text-theme-primary" style={{ fontSize: '1.025rem', letterSpacing: '-0.01em', fontWeight: 800 }}>
                        {faq.question}
                      </span>
                      <div 
                        className="ms-3 d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ 
                          width: '32px',
                          height: '32px',
                          background: isOpen ? activeColor : 'var(--bg-pill)',
                          color: isOpen ? '#ffffff' : 'var(--text-secondary)',
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className={`bi ${isOpen ? 'bi-dash' : 'bi-plus'} d-flex fs-5`}></i>
                      </div>
                    </button>
                  </h3>

                  {/* Expandable Accordion Body */}
                  {isOpen && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="m-0 text-theme-secondary small lh-base" style={{ fontSize: '0.92rem', fontWeight: 500 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
      <Footer />
    </section>
  );
}