"use client";

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const whatsappNumber = "919304556165";
    const encodedMessage = encodeURIComponent(
      `*🚀 New Lead from WebGrow Hub*\n\n` +
      `*👤 Name:* ${formData.name}\n` +
      `*📧 Email:* ${formData.email}\n` +
      `*📌 Subject:* ${formData.subject}\n\n` +
      `*💬 Message:* ${formData.message}`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  return (
    <div className="hero-section mt-0 w-100 min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4 position-relative">
      {/* Existing Hero Glow Spheres */}
      <div className="glow-sphere-1"></div>
      <div className="glow-sphere-2"></div>

      {/* Main Glass Card with Stat Card Neon Borders */}
      <div 
        className="stat-card-glow rounded-4 p-4 p-md-5 w-100 position-relative z-2" 
        style={{ maxWidth: '500px' }}
      >
        {/* Header with Hero Badge Design */}
        <div className="text-center mb-4 py-3 hero-badge d-flex flex-column align-items-center justify-content-center w-100">
          <div 
            className="center-brand-box mb-3 rounded-circle" 
            style={{ width: '60px', height: '60px', position: 'relative' }}
          >
            <i className="bi bi-chat-dots-fill fs-3 text-gradient-pink-orange"></i>
          </div>
          <h3 className="fw-bold text-gradient-pink-orange mb-1">Get in Touch</h3>
          <p className="badge-text-glow mb-0">We'd love to hear from you</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-theme-primary">Full Name</label>
            <div className="input-group">
              <span className="input-group-text btn-secondary-glow border-end-0 rounded-start-3 rounded-end-0">
                <i className="bi bi-person text-gradient-purple-blue fs-5"></i>
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control btn-secondary-glow border-start-0 rounded-end-3 text-theme-primary"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-theme-primary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text btn-secondary-glow border-end-0 rounded-start-3 rounded-end-0">
                <i className="bi bi-envelope text-gradient-pink-orange fs-5"></i>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control btn-secondary-glow border-start-0 rounded-end-3 text-theme-primary"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-theme-primary">Subject</label>
            <div className="input-group">
              <span className="input-group-text btn-secondary-glow border-end-0 rounded-start-3 rounded-end-0">
                <i className="bi bi-tag text-gradient-purple-blue fs-5"></i>
              </span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control btn-secondary-glow border-start-0 rounded-end-3 text-theme-primary"
                placeholder="How can we help?"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-theme-primary">Message</label>
            <div className="input-group">
              <span className="input-group-text btn-secondary-glow border-end-0 rounded-start-3 rounded-end-0 align-items-start pt-2">
                <i className="bi bi-chat text-gradient-pink-orange fs-5"></i>
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control btn-secondary-glow border-start-0 rounded-end-3 text-theme-primary"
                rows="4"
                placeholder="Tell us about your project..."
                required
                style={{ resize: 'none' }}
              ></textarea>
            </div>
          </div>

          {/* Glowing CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-neon-cta w-100 py-3 justify-content-center mt-2 fs-6"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <i className="bi bi-whatsapp fs-5"></i>
                <span>Send via WhatsApp</span>
              </>
            )}
          </button>

          {/* Footer Note */}
          <p className="text-center text-theme-secondary small mt-3 mb-0">
            <i className="bi bi-shield-check me-1 text-gradient-pink-orange"></i>
            Your data is safe & encrypted
          </p>
        </form>
      </div>
    </div>
  );
}