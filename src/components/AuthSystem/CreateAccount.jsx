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
    <div className="d-flex justify-content-center align-items-center w-100 bg-light" style={{ minHeight: '100vh', padding: '10px' }}>
      
      {/* Complete Overhaul Stylesheet for Full Width Stretching */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          border-radius: 24px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        
        /* Desktop/PC View Layout Engine */
        @media (min-width: 768px) {
          .custom-card {
            width: 60% !important;
            max-width: 900px !important;
            border-radius: 40px;
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
          left: 15px;
          color: #6c757d;
          font-size: 1.1rem;
          z-index: 10;
        }
        .input-icon-wrapper .form-control {
          padding-left: 45px !important;
        }
      `}} />

      {/* Main Container */}
      <div 
        className="position-relative bg-white shadow border overflow-hidden custom-card d-flex flex-column"
        style={{ minHeight: 'auto' }}
      >
        
        {/* Top Header Section with SVG Background Stretch */}
        <div className="position-relative w-100" style={{ height: '160px', flexShrink: 0 }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
            <svg viewBox="0 0 500 160" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
              <path d="M0,0 L500,0 L500,100 C400,160 150,95 0,140 Z" style={{ stroke: 'none', fill: '#3b00a8' }}></path>
            </svg>
          </div>

          <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center px-4" style={{ zIndex: 2 }}>
            <h1 className="fw-bold text-white m-0" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Create Account</h1>
            <p className="text-white-50 small mt-1 mb-0" style={{ fontSize: '0.92rem' }}>Register a new profile to get started</p>
          </div>
        </div>

        {/* Form Elements Area */}
        <div className="px-4 pt-4 pb-2 flex-grow-1 no-scrollbar" style={{ zIndex: 3 }}>
          <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
            
            {/* Full Name */}
            <div className="row align-items-center g-2 g-md-3">
              <div className="col-12 col-md-3 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Full Name</label>
              </div>
              <div className="col-12 col-md-9">
                <div className="input-icon-wrapper">
                  <FiUser />
                  <input 
                    type="text" 
                    placeholder="Admin Kumar"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem' }} 
                    required 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="row align-items-center g-2 g-md-3">
              <div className="col-12 col-md-3 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Email Address</label>
              </div>
              <div className="col-12 col-md-9">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="email" 
                    placeholder="admin@gmail.com"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem', backgroundColor: '#E8F0FE' }} 
                    required 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile Number */}
            <div className="row align-items-center g-2 g-md-3">
              <div className="col-12 col-md-3 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Mobile No.</label>
              </div>
              <div className="col-12 col-md-9">
                <div className="input-icon-wrapper">
                  <FiPhone />
                  <input 
                    type="tel" 
                    placeholder="+91 xxxxx-xxxxx"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem', backgroundColor: '#E8F0FE' }} 
                    required 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            {/* Password */}
            <div className="row align-items-center g-2 g-md-3">
              <div className="col-12 col-md-3 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Password</label>
              </div>
              <div className="col-12 col-md-9">
                <div className="input-icon-wrapper">
                  <FiLock />
                  <input 
                    type="password" 
                    placeholder="••••••"
                    className="form-control" 
                    style={{ height: '48px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem', backgroundColor: '#E8F0FE' }} 
                    required 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            {/* Action Action */}
            <div className="row mt-3">
              <div className="col-12 offset-md-3 col-md-9">
                <button 
                  type="submit" 
                  className="btn w-100 rounded-pill py-2 fw-bold text-white" 
                  style={{ 
                    height: '50px', 
                    backgroundColor: '#F59E0B', 
                    border: 'none',
                    fontSize: '1rem',
                    letterSpacing: '0.5px'
                  }} 
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-4 mb-4">
            <span className="text-muted small">Already have account </span>
            <Link href="/login" className="small fw-semibold text-primary text-decoration-none ms-1">Sign in</Link>
          </div>

        </div>

        {/* Bottom Decorative Waves Footer */}
        <div className="position-relative w-100 mt-auto" style={{ height: '65px', flexShrink: 0, zIndex: 1 }}>
          <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="position-absolute bottom-0 start-0 w-100 h-100">
            <path d="M0,50 C150,100 350,20 500,60 L500,100 L0,100 Z" style={{ stroke: 'none', fill: '#DCEBFE' }}></path>
            <path d="M0,70 C150,30 300,100 500,50 L500,100 L0,100 Z" style={{ stroke: 'none', fill: '#2563EB' }}></path>
          </svg>
        </div>

      </div>
    </div>
  );
}