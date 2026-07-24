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

      toast.success("Password reset link sent! Check your inbox.");
      setEmail('');
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden p-1 p-md-3" style={{ minHeight: '100vh', backgroundColor: '#020205' }}>
      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-3 p-sm-4 p-md-5 my-1">
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={120} height={110} className="object-fit-contain" priority />
          </div>
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.25rem' }}>Forgot Password?</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.5rem' }}>
            <span style={{ color: '#3b82f6' }}>Password </span>
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Recovery </span>
          </h2>
        </div>

        <div className="flex-grow-1">
          <form onSubmit={handleReset} className="d-flex flex-column gap-2.5">
            <div className="position-relative d-flex align-items-center">
              <span className="position-absolute ms-3 text-secondary"><FiMail size={16} /></span>
              <input type="email" placeholder="your-email@example.com" className="form-control text-white border" value={email} style={{ height: '46px', borderRadius: '10px', paddingLeft: '42px', fontSize: '0.88rem' }} required onChange={e => setEmail(e.target.value)} />
            </div>

            <button type="submit" className="btn w-100 rounded-pill py-2 fw-bold text-white mt-2" style={{ height: '46px', background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)', border: 'none', fontSize: '0.9rem' }} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link →"}
            </button>
          </form>

          <div className="text-center mt-3">
            <Link href="/login" className="small fw-bold text-decoration-none" style={{ color: '#00f2fe' }}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}