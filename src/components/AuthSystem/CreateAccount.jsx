"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import Link from 'next/link';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import Image from 'next/image';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function CreateAccount() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initSession = async (userPayload) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload)
    });

    if (res.ok) {
      router.push('/dashboard');
    }
  };

  const syncUserToDatabase = async (userEmail, displayName, photoURL, phoneNumber = '') => {
    const emailKey = userEmail.toLowerCase().replace(/\./g, '_');
    const userRef = ref(rtdb, `users/${emailKey}`);

    const snapshot = await get(userRef);
    let finalUserData;

    if (snapshot.exists()) {
      finalUserData = snapshot.val();
    } else {
      const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

      finalUserData = {
        uid: emailKey,
        name: displayName || userEmail.split('@')[0],
        email: userEmail.toLowerCase(),
        phone: phoneNumber.trim(),
        profileImage: photoURL || "/icons/default-avatar.png",
        role: isAdmin ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };
      await set(userRef, finalUserData);
    }
    return finalUserData;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
   setLoading(true);
try {
  await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  const dbUser = await syncUserToDatabase(
    formData.email, 
    formData.name, 
    "/icons/default-avatar.png", 
    formData.phone
  );
  await initSession(dbUser);
} catch (error) {
  // ✅ Handle Firebase Errors Cleanly
  if (error.code === 'auth/email-already-in-use') {
    alert("Is email se account pehle se bana hua hai! Please Login karein.");
  } else if (error.code === 'auth/weak-password') {
    alert("Password kam se kam 6 characters ka hona chahiye!");
  } else {
    alert("Signup Failed: " + error.message);
  }
} finally {
  setLoading(false);
}
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '4px' }}>

      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          max-width: 520px !important;
          border-radius: 24px !important;
          background-color: var(--bg-card, rgba(15, 16, 26, 0.9)) !important;
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
          z-index: 2;
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

      {/* Main Container */}
      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-4 p-md-5 my-4">

        {/* Top Header Section with Branding */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={146} height={140} className="object-fit-contain" priority />
          </div>
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Get Started!</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.7rem', fontWeight: 900 }}>
            <span style={{ color: '#3b82f6' }}>Create </span>
            <span className="text-gradient-purple-blue" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Account </span>
          </h2>
          <p className="text-theme-secondary small mt-2 mb-0" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            Register a new profile to access your dashboard
          </p>
        </div>

        {/* Form Elements Area */}
        <div className="flex-grow-1 no-scrollbar">
          <form onSubmit={handleSignup} className="d-flex flex-column gap-3">

            {/* Full Name */}
            <div>
              <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>Full Name</label>
              <div className="input-icon-wrapper">
                <FiUser />
                <input
                  type="text"
                  placeholder="Admin Kumar"
                  className="form-control"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }}
                  required
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>Email Address</label>
              <div className="input-icon-wrapper">
                <FiMail />
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  className="form-control"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }}
                  required
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Mobile No. */}
            <div>
              <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>Mobile No.</label>
              <div className="input-icon-wrapper">
                <FiPhone />
                <input
                  type="tel"
                  placeholder="+91 xxxxx-xxxxx"
                  className="form-control"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }}
                  required
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>Password</label>
              <div className="input-icon-wrapper">
                <FiLock />
                <input
                  type="password"
                  placeholder="••••••"
                  className="form-control"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }}
                  required
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-2">
              <button
                type="submit"
                className="btn w-100 rounded-pill py-2.5 fw-black text-white"
                style={{
                  height: '48px',
                  background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
                }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account →"}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-theme-secondary small" style={{ color: '#9ca3af' }}>Already have an account? </span>
            <Link href="/login" className="small fw-bold text-decoration-none ms-1" style={{ color: '#00f2fe' }}>Sign in</Link>
          </div>

          <div className="text-center mt-4 pt-2 text-secondary" style={{ fontSize: '0.75rem' }}>
            <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
              <i className="bi bi-shield-check text-success"></i>
              <span>Secure Registration • 256-bit Encryption</span>
            </div>
            <span className="opacity-75">Authorized Access Only</span>
          </div>

        </div>

      </div>
    </div>
  );
}