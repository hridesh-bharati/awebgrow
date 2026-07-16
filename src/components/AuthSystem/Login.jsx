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
    <div className="d-flex justify-content-center align-items-center w-100 bg-white border shadow shell-wrapper">
      
      {/* Dynamic style layout strictly modified for 100% full-width on PC & Mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-card {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0px !important;
          border: none !important;
        }
        
        .content-padding {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        
        /* Desktop/PC View Layout Engine - Kept fully stretched */
        @media (min-width: 768px) {
          .pc-label-align {
            text-align: left !important;
            white-space: nowrap;
          }
          .content-padding {
            padding-left: 80px !important;
            padding-right: 80px !important;
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

      {/* Main Wide Card Element */}
      <div className="position-relative bg-white overflow-hidden custom-card d-flex flex-column">
        
        {/* Top Header Section with True Native SVG Smooth Path Stretched */}
        <div className="position-relative w-100" style={{ height: '180px', flexShrink: 0 }}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
            <svg viewBox="0 0 500 180" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
              <path d="M0,0 L500,0 L500,110 C380,185 120,85 0,160 Z" style={{ stroke: 'none', fill: '#3b00a8' }}></path>
            </svg>
          </div>

         <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center content-padding" style={{ zIndex: 2 }}>
  
  {/* Flexbox की मदद से आइकॉन और टेक्स्ट को एक लाइन में परफेक्टली अलाइन किया */}
  <h1 className="fw-bold text-white m-0 d-flex align-items-center gap-2" style={{ fontSize: '2.5rem', letterSpacing: '-0.5px' }}> 
    <Link href="/" className="text-decoration-none text-white d-inline-flex align-items-center" style={{ fontSize: '2rem' }}>
      <i className="bi bi-house"></i>
    </Link>
    <span>Welcome Back</span>
  </h1>
  
  <p className="text-white-50 mt-1 mb-0" style={{ fontSize: '0.95rem' }}>
    Sign in to your account
  </p>
</div>
        </div>

        {/* Form Content Area */}
        <div className="pt-5 pb-2 flex-grow-1 no-scrollbar content-padding" style={{ zIndex: 3 }}>
          <form onSubmit={handleSmartLogin} className="d-flex flex-column gap-3">
            
            {/* Email / Mobile input line */}
            <div className="row align-items-center g-2 g-md-3 mx-0">
              <div className="col-12 col-md-2 px-0 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Email / Mobile</label>
              </div>
              <div className="col-12 col-md-10 px-0">
                <div className="input-icon-wrapper">
                  <FiMail />
                  <input 
                    type="text" 
                    placeholder="name@company.com or 98765..."
                    className="form-control" 
                    style={{ height: '52px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem' }} 
                    required 
                    onChange={e => setIdentifier(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            {/* Password input line */}
            <div className="row align-items-center g-2 g-md-3 mx-0">
              <div className="col-12 col-md-2 px-0 pc-label-align">
                <label className="form-label small fw-bold text-dark mb-0">Password</label>
              </div>
              <div className="col-12 col-md-10 px-0">
                <div className="input-icon-wrapper">
                  <FiLock />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="form-control" 
                    style={{ height: '52px', borderRadius: '10px', border: '1px solid #ced4da', fontSize: '0.95rem' }} 
                    required 
                    onChange={e => setPassword(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Forgot Password Anchor link */}
            <div className="row mx-0">
              <div className="col-12 offset-md-2 col-md-10 px-0 text-end">
                <Link href="/forgot-password" className="text-decoration-none text-primary fw-semibold" style={{ fontSize: '0.9rem' }}>
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Wide Primary Operation Submit Trigger */}
            <div className="row mt-3 mx-0">
              <div className="col-12 offset-md-2 col-md-10 px-0">
                <button 
                  type="submit" 
                  className="btn w-100 rounded-pill py-2 fw-bold text-white" 
                  style={{ 
                    height: '52px', 
                    backgroundColor: '#F59E0B', 
                    border: 'none',
                    fontSize: '1.05rem',
                    letterSpacing: '0.5px'
                  }} 
                  disabled={loading}
                >
                  {loading ? "VERIFYING..." : "SIGN IN"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center my-2">
            <span className="text-muted small">Don't have an account? </span>
            <Link href="/register" className="small fw-semibold text-primary text-decoration-none ms-1">Sign up</Link>
          </div>

        </div>

        {/* Bottom Decorative Waves Footer */}
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