"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import Link from 'next/link';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function CreateAccount() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const dbUser = await syncUserToDatabase(
        user.email,
        user.displayName,
        user.photoURL
      );
      await initSession(dbUser);
    } catch (error) {
      alert("Google Sign Up Failed: " + error.message);
    }
  };

  const handleGithubSignUp = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const dbUser = await syncUserToDatabase(
        user.email,
        user.displayName,
        user.photoURL
      );
      await initSession(dbUser);
    } catch (error) {
      alert("GitHub Sign Up Failed: " + error.message);
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
        .password-toggle {
          position: absolute;
          right: 16px;
          color: #9ca3af;
          cursor: pointer;
          z-index: 10;
          background: none;
          border: none;
          padding: 0;
        }
        .password-toggle:hover {
          color: #ffffff;
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

            {/* Password with Toggle */}
            <div>
              <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>Password</label>
              <div className="input-icon-wrapper">
                <FiLock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="form-control"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem', paddingRight: '45px' }}
                  required
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
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

          {/* Social Sign Up Options */}
          <div className="d-flex align-items-center my-3 text-secondary">
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
            <span className="px-3 small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>OR</span>
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn w-50 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 border text-white"
              style={{
                height: '48px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem'
              }}
              onClick={handleGoogleSignUp}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.21 21.32 7.29 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.29 0 3.21 2.68 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.99 6.73-4.99z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="btn w-50 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 border text-white"
              style={{
                height: '48px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem'
              }}
              onClick={handleGithubSignUp}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

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