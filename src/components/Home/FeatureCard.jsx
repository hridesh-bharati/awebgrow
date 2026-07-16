'use client';

import React from 'react';

export default function FeaturesCard() {
    const features = [
        {
            id: 1,
            icon: 'bi-star-fill',
            title: '5/5 Client Satisfied',
            desc: 'Delivering exceptional quality that exceeds expectations every single time.',
            gradient: 'from-warning-400 to-orange-500',
            bgGradient: 'from-warning-50 to-orange-50',
            iconBg: 'bg-warning-100',
            iconColor: 'text-warning',
        },
        {
            id: 2,
            icon: 'bi-lightning-charge-fill',
            title: 'Fast Delivery',
            desc: 'Quick turnaround times without compromising on code quality or performance.',
            gradient: 'from-danger-400 to-rose-500',
            bgGradient: 'from-danger-50 to-rose-50',
            iconBg: 'bg-danger-100',
            iconColor: 'text-danger',
        },
        {
            id: 3,
            icon: 'bi-shield-lock-fill',
            title: 'Secure Website',
            desc: 'Implementation of top-tier security practices to keep your data safe.',
            gradient: 'from-success-400 to-emerald-500',
            bgGradient: 'from-success-50 to-emerald-50',
            iconBg: 'bg-success-100',
            iconColor: 'text-success',
        },
        {
            id: 4,
            icon: 'bi-phone-fill',
            title: 'Mobile Responsive',
            desc: 'Flawless performance and beautiful layouts across all screen sizes.',
            gradient: 'from-primary-400 to-blue-600',
            bgGradient: 'from-primary-50 to-blue-50',
            iconBg: 'bg-primary-100',
            iconColor: 'text-primary',
        },
    ];

    // Gradient mapping for the icon backgrounds
    const getGradientStyle = (gradient) => {
        const map = {
            'from-warning-400 to-orange-500': 'linear-gradient(135deg, #fbbf24, #f97316)',
            'from-danger-400 to-rose-500': 'linear-gradient(135deg, #fb7185, #f43f5e)',
            'from-success-400 to-emerald-500': 'linear-gradient(135deg, #34d399, #10b981)',
            'from-primary-400 to-blue-600': 'linear-gradient(135deg, #60a5fa, #2563eb)',
        };
        return map[gradient] || 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    };

    return (
        <div className="features-wrapper min-vh-100 d-flex align-items-center py-5">
            <div className="container px-4 px-md-5">
                {/* Section Header */}
                <div className="text-center mb-5">
                    <span className="badge-modern px-4 py-2 mb-3 d-inline-block rounded-pill">
                        ✦ Why Choose Us
                    </span>
                    <h2 className="display-5 fw-bold mb-3 heading-gradient">
                        Built for <span className="text-gradient">Performance</span> &amp; <span className="text-gradient">Trust</span>
                    </h2>
                    <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '540px' }}>
                        We combine cutting-edge design with robust engineering to deliver
                        digital experiences that truly stand out.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="row g-4 justify-content-center">
                    {features.map((item, index) => (
                        <div key={item.id} className="col-12 col-sm-6 col-lg-3">
                            <div
                                className="feature-card h-100 p-4 rounded-4 text-center text-sm-start position-relative overflow-hidden transition-all"
                                style={{
                                    background: `linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))`,
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.02)',
                                }}
                            >
                                {/* Glow accent */}
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-10 rounded-4"
                                    style={{
                                        background: getGradientStyle(item.gradient),
                                        transform: 'scale(1.5) translateX(-20%) translateY(-20%)',
                                        filter: 'blur(60px)',
                                    }}
                                />

                                {/* Icon */}
                                <div
                                    className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-3 mb-3 position-relative"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        background: getGradientStyle(item.gradient),
                                        boxShadow: `0 8px 24px ${getGradientStyle(item.gradient).replace('linear-gradient(135deg, ', '').replace(')', '').split(',')[0].trim()}40`,
                                    }}
                                >
                                    <i className={`bi ${item.icon} text-white fs-4`}></i>
                                </div>

                                {/* Content */}
                                <div className="position-relative">
                                    <h5 className="fw-bold text-dark mb-2 fs-6">{item.title}</h5>
                                    <p className="text-muted small mb-0" style={{ lineHeight: '1.6' }}>
                                        {item.desc}
                                    </p>
                                </div>

                                {/* Hover line indicator */}
                                <div
                                    className="position-absolute bottom-0 start-0 w-100"
                                    style={{
                                        height: '3px',
                                        background: getGradientStyle(item.gradient),
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                        borderRadius: '0 0 12px 12px',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .features-wrapper {
                    background: linear-gradient(180deg, #fafaff 0%, #f0f4ff 100%);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }

                .badge-modern {
                    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
                    color: #4f46e5;
                    font-size: 0.8rem;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    border: 1px solid rgba(79, 70, 229, 0.15);
                }

                .heading-gradient {
                    background: linear-gradient(135deg, #1e1b4b, #312e81);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .text-gradient {
                    background: linear-gradient(135deg, #4f46e5, #7c3aed);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .feature-card {
                    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: default;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    background: rgba(255, 255, 255, 0.7) !important;
                    backdrop-filter: blur(16px) saturate(1.2);
                    -webkit-backdrop-filter: blur(16px) saturate(1.2);
                }

                .feature-card:hover {
                    transform: translateY(-8px) scale(1.01);
                    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04) !important;
                    border-color: rgba(255, 255, 255, 0.9);
                    background: rgba(255, 255, 255, 0.85) !important;
                }

                .feature-card:hover .position-absolute.bottom-0 {
                    opacity: 1 !important;
                }

                .icon-wrapper {
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    will-change: transform;
                }

                .feature-card:hover .icon-wrapper {
                    transform: scale(1.08) rotate(-2deg);
                }

                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .hover-lift:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
                }

                @media (max-width: 576px) {
                    .feature-card {
                        text-align: center !important;
                    }
                    .icon-wrapper {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .heading-gradient {
                        font-size: 2rem;
                    }
                }

                @media (min-width: 992px) {
                    .feature-card {
                        padding: 2rem 1.5rem !important;
                    }
                }

                .bi {
                    line-height: 1;
                }
            `}</style>
        </div>
    );
}