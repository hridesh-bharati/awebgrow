"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase'; 
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from 'firebase/auth';
import { ref, get, child, set } from 'firebase/database';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'sonner';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function Login() {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();  

  const initSession = async (userPayload) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload)
    });
    
    if (res.ok) {
      toast.success("Welcome back!");
      router.push('/dashboard'); 
    } else {
      toast.error("Session creation failed.");
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
        profileImage: dbUser?.profileImage || "/icons/default-avatar.png",
        role: ADMIN_EMAILS.includes(targetEmail) ? 'admin' : (dbUser?.role || 'user')
      });

    } catch (err) {
      toast.error("Login Failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (providerName) => {
    setLoading(true);
    try {
      const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      if (!fbUser.email) {
        throw new Error("Email permissions are required to log in.");
      }

      const targetEmail = fbUser.email.toLowerCase();
      const emailKey = targetEmail.replace(/\./g, '_');
      const userRef = ref(rtdb, `users/${emailKey}`);
      
      const userSnap = await get(userRef);
      let dbUser = userSnap.exists() ? userSnap.val() : null;

      if (!dbUser) {
        const isAdmin = ADMIN_EMAILS.includes(targetEmail);
        dbUser = {
          uid: emailKey,
          name: fbUser.displayName || targetEmail.split('@')[0],
          email: targetEmail,
          phone: fbUser.phoneNumber || '',
          profileImage: fbUser.photoURL || "/icons/default-avatar.png",
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        };
        await set(userRef, dbUser);
      }

      await initSession({
        uid: emailKey,
        email: targetEmail,
        name: dbUser.name,
        profileImage: dbUser.profileImage,
        role: ADMIN_EMAILS.includes(targetEmail) ? 'admin' : dbUser.role
      });

    } catch (error) {
      toast.error(`${providerName.toUpperCase()} Login failed: ${error.message}`);
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
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Welcome Back!</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.7rem', fontWeight: 900 }}>
            <span style={{ color: '#3b82f6' }}>User </span>
            <span className="text-gradient-purple-blue" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Control </span>
            <span style={{ color: '#f97316' }}>Center</span>
          </h2>
          <p className="text-theme-secondary small mt-2 mb-0" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            Please sign in to continue to your dashboard
          </p>
        </div>

        <div className="flex-grow-1">
          <form onSubmit={handleSmartLogin} className="d-flex flex-column gap-3">
            
            <div className="position-relative d-flex align-items-center">
              <span className="position-absolute ms-3 text-secondary" style={{ zIndex: 10 }}>
                <FiMail size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Email Address or Mobile No."
                className="form-control text-theme-primary border" 
                style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem', paddingLeft: '45px', backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }} 
                required 
                onChange={e => setIdentifier(e.target.value)} 
              />
            </div>
            
            <div className="position-relative d-flex align-items-center">
              <span className="position-absolute ms-3 text-secondary" style={{ zIndex: 10 }}>
                <FiLock size={18} />
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="form-control text-theme-primary border" 
                style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem', paddingLeft: '45px', paddingRight: '45px', backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }} 
                required 
                onChange={e => setPassword(e.target.value)} 
              />
              <span className="position-absolute end-0 me-3 text-secondary cursor-pointer" style={{ zIndex: 10 }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center small my-1">
              <div className="form-check d-flex align-items-center gap-2">
                <input 
                  type="checkbox" 
                  className="form-check-input rounded-1" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
                />
                <label className="form-check-label text-secondary cursor-pointer" htmlFor="rememberMe" style={{ fontSize: '0.85rem' }}>
                  Remember Me
                </label>
              </div>
              <Link href="/forgot-password" className="text-decoration-none text-secondary" style={{ fontSize: '0.85rem' }}>
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn w-100 rounded-pill py-2.5 fw-bold text-white mt-1" 
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
              {loading ? "VERIFYING..." : "Sign In →"}
            </button>
          </form>

          <div className="d-flex align-items-center my-3 text-secondary">
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
            <span className="px-3 small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>OR</span>
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          <div className="d-flex flex-column gap-2">
            <button 
              type="button" 
              className="btn w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 border text-white"
              style={{ 
                height: '48px', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem'
              }}
              onClick={() => handleOAuthLogin('google')}
              disabled={loading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.21 21.32 7.29 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.29 0 3.21 2.68 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.99 6.73-4.99z"/>
              </svg>
              Sign in with Google
            </button>

            <button 
              type="button" 
              className="btn w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2 border text-white"
              style={{ 
                height: '48px', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                fontSize: '0.9rem'
              }}
              onClick={() => handleOAuthLogin('github')}
              disabled={loading}
            >
              <i className="bi bi-github fs-5"></i>
              Sign in with GitHub
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-theme-secondary small" style={{ color: '#9ca3af' }}>Don't have an account? </span>
            <Link href="/register" className="small fw-bold text-decoration-none ms-1" style={{ color: '#00f2fe' }}>Sign up</Link>
          </div>

          <div className="text-center mt-4 pt-2 text-secondary" style={{ fontSize: '0.75rem' }}>
            <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
              <i className="bi bi-shield-check text-success"></i>
              <span>Secure Access • 256-bit Encryption</span>
            </div>
            <span className="opacity-75">Authorized Access Only</span>
          </div>

        </div>

      </div>
    </div>
  );
}