"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, child } from 'firebase/database';
import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';

const ADMIN_EMAILS = [
  'sushantkumar867695@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function Login() {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
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

  const handleSmartLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let targetEmail = identifier.trim().toLowerCase();

    try {
      if (/^\d+$/.test(targetEmail)) {
        const snapshot = await get(child(ref(rtdb), 'users'));
        if (!snapshot.exists()) throw new Error("No users database found.");
        
        let foundEmail = null;
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.phone === targetEmail) foundEmail = user.email;
        });

        if (!foundEmail) throw new Error("Mobile number not registered.");
        targetEmail = foundEmail;
      }

      await signInWithEmailAndPassword(auth, targetEmail, password);
      const emailKey = targetEmail.replace(/\./g, '_');
      
      const userSnap = await get(ref(rtdb, `users/${emailKey}`));
      const dbUser = userSnap.val();

      await initSession({
        uid: emailKey,
        email: targetEmail,
        name: dbUser?.name || targetEmail.split('@')[0],
        profileImage: dbUser?.profileImage || "/images/default-avatar.jpg",
        role: ADMIN_EMAILS.includes(targetEmail) ? 'admin' : (dbUser?.role || 'user')
      });

    } catch (err) {
      alert("Login Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205' }}>
      
      {/* AMBIENT BACKGROUND NEON SPHERES */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

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
        
        .content-padding {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }
        
        @media (min-width: 768px) {
          .pc-label-align {
            text-align: left !important;
            white-space: nowrap;
          }
          .content-padding {
            padding-left: 45px !important;
            padding-right: 45px !important;
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

      {/* Main Wide Card Element */}
      <div className="position-relative overflow-hidden custom-card d-flex flex-column my-4">
        
        {/* Top Header Section with Neon Gradient Accent */}
        <div className="position-relative w-100 py-4 px-4 border-bottom" style={{ borderColor: 'var(--border-subtle)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(255, 0, 128, 0.05) 100%)' }}>
          <div className="d-flex flex-column justify-content-center">
            <h1 className="fw-black text-white m-0 d-flex align-items-center gap-2" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px' }}> 
              <Link href="/" className="text-decoration-none text-white d-inline-flex align-items-center p-2 rounded-circle" style={{ fontSize: '1.4rem', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <i className="bi bi-house"></i>
              </Link>
              <span>Welcome Back</span>
            </h1>
            <p className="text-theme-secondary mt-2 mb-0" style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 500 }}>
              Sign in to access your administrative pipeline
            </p>
          </div>
        </div>

        {/* Form Content Area */}
        <div className="py-4 flex-grow-1 no-scrollbar content-padding">
          <form onSubmit={handleSmartLogin} className="d-flex flex-column gap-3">
            
            {/* Email / Mobile input line */}
            <div className="row align-items-center g-2 mx-0">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Email / Mobile</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="text" 
                    placeholder="name@company.com or 98765..."
                    className="form-control" 
                    style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setIdentifier(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            {/* Password input line */}
            <div className="row align-items-center g-2 mx-0 mt-2">
              <div className="col-12 px-0 mb-1 d-flex justify-content-between align-items-center">
                <label className="form-label small fw-bold text-theme-secondary mb-0" style={{ color: '#9ca3af' }}>Password</label>
                <Link href="/forgot-password" className="text-decoration-none fw-semibold" style={{ fontSize: '0.85krem', color: '#c084fc' }}>
                  Forgot Password?
                </Link>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiLock />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="form-control" 
                    style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setPassword(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Wide Primary Operation Submit Trigger */}
            <div className="row mt-4 mx-0">
              <div className="col-12 px-0">
                <button 
                  type="submit" 
                  className="btn w-100 rounded-pill py-2 fw-black text-white" 
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
                  {loading ? "VERIFYING..." : "SIGN IN"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-theme-secondary small" style={{ color: '#9ca3af' }}>Don't have an account? </span>
            <Link href="/register" className="small fw-bold text-decoration-none ms-1" style={{ color: '#00f2fe' }}>Sign up</Link>
          </div>

        </div>

      </div>
    </div>
  );
}