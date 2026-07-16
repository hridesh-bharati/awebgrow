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
    <div className="d-flex justify-content-center align-items-center w-100 bg-light" style={{ minHeight: '100vh', padding: '0px' }}>
      
      {/* Pure Native App Feel Layout Engine Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          border-radius: 0px;
        }
        
        /* Desktop/PC View Layout Config */
        @media (min-width: 768px) {
          .custom-card {
            width: 60% !important;
            max-width: 900px !important;
            border-radius: 40px !important;
            min-height: auto !important;
            box-shadow: 0 15px 35px rgba(59, 0, 168, 0.08) !important;
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
          left: 15px;
          color: #6c757d;
          font-size: 1.1rem;
          z-index: 10;
        }
        .input-icon-wrapper .form-control {
          padding-left: 45px !important;
        }
        .input-icon-wrapper .form-control:focus {
          border-color: #3b00a8 !important;
          box-shadow: 0 0 0 0.25rem rgba(59, 0, 168, 0.15) !important;
        }
      `}} />

      {/* Main Structural Native Canvas Container */}
      <div className="position-relative bg-white border-0 overflow-hidden custom-card d-flex flex-column">
        
        {/* Top Header Section with True Native SVG Smooth Path */}
        <div className="position-relative w-100" style={{ height: '180px', flexShrink: 0 }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
            <svg viewBox="0 0 500 180" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
              <path d="M0,0 L500,0 L500,110 C380,185 120,85 0,160 Z" style={{ stroke: 'none', fill: '#3b00a8' }}></path>
            </svg>
          </div>

          <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center px-4" style={{ zIndex: 2 }}>
            <h1 className="fw-bold text-white m-0" style={{ fontSize: '2.3rem', letterSpacing: '-0.5px' }}>Reset Password</h1>
            <p className="text-white-50 small mt-1 mb-0" style={{ fontSize: '0.95rem' }}>Enter your registered email to receive a recovery link</p>
          </div>
        </div>

        {/* Content Operations Body */}
        <div className="px-4 pt-5 pb-4 flex-grow-1 no-scrollbar" style={{ zIndex: 3 }}>
          
          <form onSubmit={handleReset} className="d-flex flex-column gap-3">
            
            {/* Email Field Row */}
            <div className="row align-items-center g-2 g-md-3 mx-0">
              <div className="col-12 col-md-3 px-0 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Email Address</label>
              </div>
              <div className="col-12 col-md-9 px-0">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="email" 
                    placeholder="your-email@example.com" 
                    className="form-control" 
                    value={email}
                    style={{ height: '50px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem' }} 
                    required 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="row mt-4 mx-0">
              <div className="col-12 offset-md-3 col-md-9 px-0">
                <button 
                  type="submit" 
                  className="btn d-flex align-items-center justify-content-center w-100 rounded-pill fw-bold text-white" 
                  style={{ 
                    height: '50px', 
                    backgroundColor: '#F59E0B', 
                    border: 'none',
                    fontSize: '1rem',
                    letterSpacing: '0.5px'
                  }} 
                  disabled={loading}
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-5">
            <Link href="/login" className="small fw-semibold text-primary text-decoration-none">Back to Login</Link>
          </div>

        </div>

        {/* Bottom Double Wave Fluid Graphics */}
        <div className="position-relative w-100 mt-auto" style={{ height: '75px', flexShrink: 0, zIndex: 1 }}>
          <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="position-absolute bottom-0 start-0 w-100 h-100">
            <path d="M0,45 C150,95 350,15 500,55 L500,100 L0,100 Z" style={{ stroke: 'none', fill: '#DCEBFE' }}></path>
            <path d="M0,65 C150,25 300,95 500,45 L500,100 L0,100 Z" style={{ stroke: 'none', fill: '#2563EB' }}></path>
          </svg>
        </div>

      </div>
    </div>
  );
}