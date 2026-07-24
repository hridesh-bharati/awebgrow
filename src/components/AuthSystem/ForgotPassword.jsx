"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { toast } from 'sonner';
import Image from 'next/image';

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

      toast.success("Password reset link sent! Check your email inbox.");
      setEmail('');
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '16px' }}>
      
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-4 p-md-5 shadow-lg border text-theme-primary" style={{ width: '100%', maxWidth: '480px', borderRadius: '24px', backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.9))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', backdropFilter: 'blur(20px)', zIndex: 2 }}>
        
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={146} height={140} className="object-fit-contain" priority />
          </div>

          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Forgot Password?</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.7rem', fontWeight: 900 }}>
            <span style={{ color: '#3b82f6' }}>Password </span>
            <span className="text-gradient-purple-blue" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Recovery </span>
          </h2>
          <p className="text-theme-secondary small mt-2 mb-0" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            Enter your registered email to receive a recovery link
          </p>
        </div>

        <div className="flex-grow-1">
          <form onSubmit={handleReset} className="d-flex flex-column gap-3">
            
            <div className="position-relative d-flex align-items-center">
              <span className="position-absolute ms-3 text-secondary" style={{ zIndex: 10 }}>
                <FiMail size={18} />
              </span>
              <input 
                type="email" 
                placeholder="your-email@example.com" 
                className="form-control text-theme-primary border" 
                value={email}
                style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem', paddingLeft: '45px', backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }} 
                required 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              className="btn w-100 rounded-pill py-2.5 fw-bold text-white mt-2" 
              style={{ 
                height: '48px', 
                background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)',
                border: 'none',
                fontSize: '0.95rem',
                letterSpacing: '0.3px',
                boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
              }} 
              disabled={loading}
            >
              {loading ? "Sending link..." : "Send Reset Link →"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/login" className="small fw-bold text-decoration-none" style={{ color: '#00f2fe' }}>Back to Login</Link>
          </div>

          <div className="text-center mt-4 pt-2 text-secondary" style={{ fontSize: '0.75rem' }}>
            <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
              <i className="bi bi-shield-check text-success"></i>
              <span>Secure Recovery • 256-bit Encryption</span>
            </div>
            <span className="opacity-75">Authorized Access Only</span>
          </div>

        </div>

      </div>
    </div>
  );
}