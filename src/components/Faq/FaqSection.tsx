"use client";

import React, { useState } from 'react';

// 🌈 हर कैटेगरी के लिए कस्टमाइज्ड आइकन्स और वाइब्रेंट कलर क्लासेस
const categories = [
  { id: 'services', name: 'Services', icon: 'bi-briefcase', activeClass: 'act-services', inactiveClass: 'inact-services' },
  { id: 'stack', name: 'Technology Stack', icon: 'bi-layers', activeClass: 'act-stack', inactiveClass: 'inact-stack' },
  { id: 'process', name: 'Development Process', icon: 'bi-gear', activeClass: 'act-process', inactiveClass: 'inact-process' },
  { id: 'devops', name: 'Security & Performance', icon: 'bi-shield-check', activeClass: 'act-devops', inactiveClass: 'inact-devops' },
  { id: 'business', name: 'Business & Pricing', icon: 'bi-cash-coin', activeClass: 'act-business', inactiveClass: 'inact-business' },
  { id: 'seo', name: 'SEO & Marketing', icon: 'bi-graph-up-arrow', activeClass: 'act-seo', inactiveClass: 'inact-seo' }
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

  const getActiveColor = () => {
    switch(activeCategory) {
      case 'services': return '#2563eb';
      case 'stack': return '#7c3aed';
      case 'process': return '#059669';
      case 'devops': return '#dc2626';
      case 'business': return '#d97706';
      case 'seo': return '#db2777';
      default: return '#0d6efd';
    }
  };

  return (
    <section className="py-5 position-relative overflow-hidden w-100" id="faq" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="container px-4">
        
        {/* Modern Section Header */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-2 fw-semibold text-uppercase tracking-wider small">
            Knowledge Base
          </span>
          <h2 className="fw-bold tracking-tight mb-2" style={{ color: '#0f172a', fontSize: '2.25rem' }}>
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mx-auto text-muted" style={{ maxWidth: '600px', fontSize: '0.95rem' }}>
            Explore our ecosystem specific guides and quick responses curated for next-gen digital transformation.
          </p>
        </div>

        {/* 💻📱 डिफ़ॉल्ट रूप से पूरी तरह कलरफुल प्रीमियम टैब लेआउट */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="p-3 bg-white rounded-4 border d-flex flex-wrap justify-content-center align-items-center gap-3 custom-navbar-card shadow-sm" data-aos="fade-up">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setOpenIndex(null);
                    }}
                    className={`btn px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 fw-semibold tracking-wide border transition-all tab-pill-btn ${
                      isActive ? `${category.activeClass} active-shadow text-white` : `${category.inactiveClass}`
                    }`}
                    style={{ fontSize: '0.925rem' }}
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
              return (
                <div key={index} className="card modern-faq-card border-0 mb-3" style={{ borderColor: isOpen ? `${getActiveColor()}40` : 'rgba(226, 232, 240, 0.7)' }}>
                  
                  <h3 className="m-0">
                    <button
                      className="btn text-decoration-none w-100 p-4 d-flex justify-content-between align-items-center faq-trigger-btn"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="fw-semibold text-start text-dark" style={{ fontSize: '1.025rem', letterSpacing: '-0.01em' }}>
                        {faq.question}
                      </span>
                      <div 
                        className="faq-icon-holder ms-3 d-flex align-items-center justify-content-center"
                        style={{ 
                          background: isOpen ? getActiveColor() : '#f1f5f9',
                          color: isOpen ? '#ffffff' : '#64748b',
                          transform: isOpen ? 'rotate(180deg)' : 'none'
                        }}
                      >
                        <i className={`bi ${isOpen ? 'bi-dash' : 'bi-plus'} d-flex`} style={{ fontSize: '18px' }}></i>
                      </div>
                    </button>
                  </h3>

                  <div className={`faq-collapse-panel ${isOpen ? 'panel-expanded' : ''}`}>
                    <div className="card-body p-4 pt-0">
                      <p className="m-0 text-secondary" style={{ lineHeight: '1.65', fontSize: '0.95rem' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-navbar-card {
          border-color: rgba(226, 232, 240, 0.8) !important;
        }
        .tab-pill-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* 🔵 SERVICES - Active & Inactive Colors */
        .act-services { background: linear-gradient(135deg, #2563eb, #1d4ed8) !important; border-color: #1d4ed8 !important; }
        .inact-services { background: #eff6ff !important; color: #2563eb !important; border-color: rgba(37, 99, 235, 0.15) !important; }
        .inact-services:hover { background: #dbeafe !important; }

        /* 🟣 TECH STACK - Active & Inactive Colors */
        .act-stack { background: linear-gradient(135deg, #7c3aed, #6d28d9) !important; border-color: #6d28d9 !important; }
        .inact-stack { background: #f5f3ff !important; color: #7c3aed !important; border-color: rgba(124, 58, 237, 0.15) !important; }
        .inact-stack:hover { background: #ede9fe !important; }

        /* 🟢 PROCESS - Active & Inactive Colors */
        .act-process { background: linear-gradient(135deg, #059669, #047857) !important; border-color: #047857 !important; }
        .inact-process { background: #ecfdf5 !important; color: #059669 !important; border-color: rgba(5, 150, 105, 0.15) !important; }
        .inact-process:hover { background: #d1fae5 !important; }

        /* 🔴 DEVOPS & SECURITY - Active & Inactive Colors */
        .act-devops { background: linear-gradient(135deg, #dc2626, #b91c1c) !important; border-color: #b91c1c !important; }
        .inact-devops { background: #fef2f2 !important; color: #dc2626 !important; border-color: rgba(220, 38, 38, 0.15) !important; }
        .inact-devops:hover { background: #fee2e2 !important; }

        /* 🟠 BUSINESS & PRICING - Active & Inactive Colors */
        .act-business { background: linear-gradient(135deg, #d97706, #b45309) !important; border-color: #b45309 !important; }
        .inact-business { background: #fffbeb !important; color: #d97706 !important; border-color: rgba(217, 119, 6, 0.15) !important; }
        .inact-business:hover { background: #fef3c7 !important; }

        /* 💗 SEO & MARKETING - Active & Inactive Colors */
        .act-seo { background: linear-gradient(135deg, #db2777, #be185d) !important; border-color: #be185d !important; }
        .inact-seo { background: #fdf2f8 !important; color: #db2777 !important; border-color: rgba(219, 39, 119, 0.15) !important; }
        .inact-seo:hover { background: #fce7f3 !important; }
        
        .active-shadow {
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
          transform: scale(1.02);
        }

        .modern-faq-card {
          background: #ffffff !important;
          border-radius: 16px !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.015) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1px solid transparent;
        }
        .faq-trigger-btn {
          box-shadow: none !important;
          border: 0 !important;
          background: transparent !important;
        }
        .faq-icon-holder {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .faq-collapse-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
          opacity: 0;
        }
        .panel-expanded {
          max-height: 350px;
          opacity: 1;
        }
        .tracking-wider { letter-spacing: 0.05em; }
        .tracking-tight { letter-spacing: -0.02em; }
      `}</style>
    </section>
  );
}