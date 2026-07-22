"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import Link from 'next/link';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

const ADMIN_EMAILS = [
  'sushantkumar867695@gmail.com',
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
        profileImage: photoURL || "/images/default-avatar.jpg",
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
      const dbUser = await syncUserToDatabase(formData.email, formData.name, "/images/default-avatar.jpg", formData.phone);
      await initSession(dbUser);
    } catch (error) {
      console.error(error);
      alert("Registration Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '10px' }}>
      
      {/* AMBIENT BACKGROUND NEON SPHERES */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          max-width: 560px !important;
          border-radius: 24px !important;
          background-color: var(--bg-card, rgba(15, 16, 26, 0.85)) !important;
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
          z-index: 2;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        
        @media (min-width: 768px) {
          .custom-card {
            border-radius: 32px !important;
            margin-top: 0px;
            margin-bottom: 0px;
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

      {/* Main Container */}
      <div className="position-relative shadow overflow-hidden custom-card d-flex flex-column" style={{ minHeight: 'auto' }}>
        
        {/* Top Header Section with Neon Gradient Accent */}
        <div className="position-relative w-100 py-4 px-4 border-bottom" style={{ borderColor: 'var(--border-subtle)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(255, 0, 128, 0.05) 100%)' }}>
          <div className="d-flex flex-column justify-content-center">
            <h1 className="fw-black text-white m-0" style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Create Account</h1>
            <p className="text-theme-secondary small mt-1 mb-0" style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 500 }}>Register a new administrative profile to get started</p>
          </div>
        </div>

        {/* Form Elements Area */}
        <div className="px-4 pt-4 pb-2 flex-grow-1 no-scrollbar">
          <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
            
            {/* Full Name */}
            <div className="row align-items-center g-2 mx-0">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Full Name</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiUser />
                  <input 
                    type="text" 
                    placeholder="Admin Kumar"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="row align-items-center g-2 mx-0 mt-1">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Email Address</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="email" 
                    placeholder="admin@gmail.com"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Number */}
            <div className="row align-items-center g-2 mx-0 mt-1">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Mobile No.</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiPhone />
                  <input 
                    type="tel" 
                    placeholder="+91 xxxxx-xxxxx"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Password */}
            <div className="row align-items-center g-2 mx-0 mt-1">
              <div className="col-12 px-0 mb-1">
                <label className="form-label small fw-bold text-theme-secondary" style={{ color: '#9ca3af' }}>Password</label>
              </div>
              <div className="col-12 px-0">
                <div className="input-icon-wrapper">
                  <FiLock />
                  <input 
                    type="password" 
                    placeholder="••••••"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="row mt-3 mx-0">
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
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-4 mb-3">
            <span className="text-theme-secondary small" style={{ color: '#9ca3af' }}>Already have account? </span>
            <Link href="/login" className="small fw-bold text-decoration-none ms-1" style={{ color: '#00f2fe' }}>Sign in</Link>
          </div>

        </div>

      </div>
    </div>
  );
}