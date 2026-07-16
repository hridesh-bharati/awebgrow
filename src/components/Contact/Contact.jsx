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
    <div className="contact-form-wrapper w-100 px-3 py-4 mb-5 mb-lg-0">
      <div className="contact-card rounded-4 p-4 shadow-sm">
        {/* Header */}
        <div className="text-center mb-4  py-3 rounded-4" style={{ background: 'linear-gradient(135deg, #3586ff, #064db8)' }}>
          <div className="icon-circle border border-light  mx-auto mb-2">
            <i className="bi bi-chat-dots-fill fs-4 text-white"></i>
          </div>
          <h4 className="fw-bold text-white mb-1">Get in Touch</h4>
          <p className="text-light text-opacity-75 small mb-0">We'd love to hear from you</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-dark">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-person text-primary"></i>
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control border-start-0"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-dark">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope text-danger"></i>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control border-start-0"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-dark">Subject</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-tag text-warning"></i>
              </span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control border-start-0"
                placeholder="How can we help?"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-dark">Message</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 align-items-start pt-2">
                <i className="bi bi-chat text-success"></i>
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control border-start-0"
                rows="4"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 py-2 fw-bold text-white rounded-pill d-flex align-items-center justify-content-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #25d366, #128C7E)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <i className="bi bi-whatsapp"></i>
                <span>Send via WhatsApp</span>
              </>
            )}
          </button>

          {/* Footer Note */}
          <p className="text-center text-muted small mt-3 mb-0">
            <i className="bi bi-shield-check me-1"></i>
            Your data is safe & encrypted
          </p>
        </form>
      </div>

      <style jsx>{`
        .contact-form-wrapper {
          background: linear-gradient(135deg, #6cb5ff, #9ea814);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-card {
          background: white;
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          border: none;
        }

        .icon-circle {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #0d6efd, #0b5ed7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .input-group-text {
          border-radius: 10px 0 0 10px !important;
          border-color: #d1d5db !important;
        }

        .form-control {
          border-radius: 0 10px 10px 0 !important;
          border-color: #d1d5db !important;
          padding: 10px 12px;
          font-size: 15px;
        }

        .form-control:focus {
          box-shadow: none !important;
          border-color: #0d6efd !important;
        }

        .form-control:focus + .input-group-text {
          border-color: #0d6efd !important;
        }

        .input-group:focus-within .input-group-text {
          border-color: #0d6efd !important;
        }

        textarea.form-control {
          resize: none;
          min-height: 100px;
        }

        @media (max-width: 576px) {
          .contact-form-wrapper {
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            align-items: flex-start;
            padding-top: 20px !important;
          }
          
          .contact-card {
            border-radius: 0 !important;
            padding: 20px !important;
            min-height: 100vh;
          }
        }

        @media (min-width: 768px) {
          .contact-form-wrapper {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}