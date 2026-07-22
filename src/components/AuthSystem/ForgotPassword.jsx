"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    try {
      await sendPasswordResetEmail(
        auth,
        email.trim(),
        {
          url: `${siteUrl}/reset-password`,
          handleCodeInApp: false,
        }
      );

      toast.success("🔒 Password reset link sent successfully! Check your inbox.");
      setEmail('');
    } catch (error) {
      toast.error("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '10px' }}>
      
      {/* AMBIENT BACKGROUND NEON SPHERES */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Cyberpunk Theme Stylesheet */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          max-width: 520px !important;
          border-radius: 24px !important;
          background-color: var(--bg-card, rgba(15, 16, 26, 0.85)) !important;
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
          z-index: 2;
        }
        
        @media (min-width: 768px) {
          .custom-card {
            border-radius: 32px !important;
          }
          .pc-label-align {
            text-align: left !important;
            white-space: nowrap;
          }
        }
        
        .input-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .input-icon-wrapper svg {
          position: absolute;
          left: 16px;
          color: var(--text-secondary, #9ca3af);
          font-size: 1.1rem;
          z-index: 10;
        }
        .input-icon-wrapper .form-control {
          padding-left: 48px !important;
          background-color: var(--bg-pill, rgba(255, 255, 255, 0.03)) !important;
          color: var(--text-primary, #ffffff) !important;
          border-color: var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
        }
        .input-icon-wrapper .form-control:focus {
          border-color: #a855f7 !important;
          box-shadow: 0 0 0 0.25rem rgba(168, 85, 247, 0.2) !important;
          background-color: var(--bg-pill, rgba(255, 255, 255, 0.05)) !important;
        }
        .input-icon-wrapper .form-control::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `}} />

      {/* Main Structural Native Canvas Container */}
      <div className="position-relative overflow-hidden custom-card d-flex flex-column my-4">
        
        {/* Top Header Section with Neon Gradient Accent */}
        <div className="position-relative w-100 py-4 px-4 border-bottom" style={{ borderColor: 'var(--border-subtle)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(255, 0, 128, 0.05) 100%)' }}>
          <div className="d-flex flex-column justify-content-center">
            <h1 className="fw-black text-white m-0" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Reset Password</h1>
            <p className="text-theme-secondary small mt-1 mb-0" style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 500 }}>Enter your registered email to receive a recovery link</p>
          </div>
        </div>

        {/* Content Operations Body */}
        <div className="px-4 pt-4 pb-4 flex-grow-1 no-scrollbar">
          
          <form onSubmit={handleReset} className="d-flex flex-column gap-3">
            
            {/* Email Field Row */}
            <div className="row align-items-center g-2 mx-0">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Email Address</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="email" 
                    placeholder="your-email@example.com" 
                    className="form-control" 
                    value={email}
                    style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="row mt-3 mx-0">
              <div className="col-12 px-0">
                <button 
                  type="submit" 
                  className="btn d-flex align-items-center justify-content-center w-100 rounded-pill fw-black text-white" 
                  style={{ 
                    height: '50px', 
                    background: 'linear-gradient(135deg, #a855f7 0%, #ff0080 100%)',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                  }} 
                  disabled={loading}
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-4 mb-2">
            <Link href="/login" className="small fw-bold text-decoration-none" style={{ color: '#00f2fe' }}>Back to Login</Link>
          </div>

        </div>

      </div>
    </div>
  );
}