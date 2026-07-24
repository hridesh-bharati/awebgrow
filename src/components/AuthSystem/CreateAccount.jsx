"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { rtdb, auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import Link from 'next/link';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { toast } from 'sonner';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function CreateAccount() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const initSessionAndRedirect = async (userPayload) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPayload)
    });

    if (res.ok) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('awebgrow_user_session', JSON.stringify(userPayload));
      }
      toast.success("OAuth Login Successful! Redirecting...");
      router.push('/dashboard');
      router.refresh();
    }
  };

  // 1. Email/Password Signup -> Redirects to Login
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await syncUserToDatabase(
        formData.email, 
        formData.name, 
        "/icons/default-avatar.png", 
        formData.phone
      );

      toast.success("Account Created Successfully! Please login now.");
      router.push('/login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email is already registered! Redirecting to login...");
        router.push('/login');
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password should be at least 6 characters!");
      } else {
        toast.error("Signup Failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Google / GitHub OAuth Signup -> Direct to Dashboard
  const handleOAuthLogin = async (providerName) => {
    setLoading(true);
    try {
      const provider = providerName === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      if (!fbUser.email) {
        throw new Error("Email permissions are required.");
      }

      const dbUser = await syncUserToDatabase(
        fbUser.email,
        fbUser.displayName,
        fbUser.photoURL,
        fbUser.phoneNumber || ''
      );

      await initSessionAndRedirect(dbUser);
    } catch (error) {
      toast.error(`${providerName.toUpperCase()} Auth Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden p-1 p-md-3" style={{ minHeight: '100vh', backgroundColor: '#020205' }}>

      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '400px', height: '400px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '400px', height: '400px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-card {
          width: 100% !important;
          max-width: 480px !important;
          border-radius: 20px !important;
          background-color: rgba(15, 16, 26, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
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
        .input-icon-wrapper .icon-left {
          position: absolute;
          left: 14px;
          color: #9ca3af;
          font-size: 1rem;
          z-index: 10;
        }
        .input-icon-wrapper .icon-right {
          position: absolute;
          right: 14px;
          color: #9ca3af;
          font-size: 1rem;
          cursor: pointer;
          z-index: 10;
        }
        .input-icon-wrapper .form-control {
          padding-left: 42px !important;
          padding-right: 42px !important;
          background-color: rgba(255, 255, 255, 0.03) !important;
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
        }
        .input-icon-wrapper .form-control:focus {
          border-color: #a855f7 !important;
          box-shadow: 0 0 0 0.2rem rgba(168, 85, 247, 0.2) !important;
        }
      `}} />

      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-3 p-sm-4 p-md-5 my-1">
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={120} height={110} className="object-fit-contain" priority />
          </div>
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.25rem' }}>Get Started!</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.5rem' }}>
            <span style={{ color: '#3b82f6' }}>Create </span>
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Account </span>
          </h2>
        </div>

        <div className="flex-grow-1">
          <form onSubmit={handleSignup} className="d-flex flex-column gap-2.5">
            <div>
              <label className="form-label extra-small fw-bold mb-1" style={{ color: '#9ca3af', fontSize: '0.78rem' }}>Full Name</label>
              <div className="input-icon-wrapper">
                <FiUser className="icon-left" />
                <input type="text" placeholder="Hridesh Kumar" className="form-control" style={{ height: '46px', borderRadius: '10px', fontSize: '0.88rem' }} required onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="form-label extra-small fw-bold mb-1" style={{ color: '#9ca3af', fontSize: '0.78rem' }}>Email Address</label>
              <div className="input-icon-wrapper">
                <FiMail className="icon-left" />
                <input type="email" placeholder="user@example.com" className="form-control" style={{ height: '46px', borderRadius: '10px', fontSize: '0.88rem' }} required onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="form-label extra-small fw-bold mb-1" style={{ color: '#9ca3af', fontSize: '0.78rem' }}>Mobile No.</label>
              <div className="input-icon-wrapper">
                <FiPhone className="icon-left" />
                <input type="tel" placeholder="+91 xxxxx-xxxxx" className="form-control" style={{ height: '46px', borderRadius: '10px', fontSize: '0.88rem' }} required onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="form-label extra-small fw-bold mb-1" style={{ color: '#9ca3af', fontSize: '0.78rem' }}>Password</label>
              <div className="input-icon-wrapper">
                <FiLock className="icon-left" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••" className="form-control" style={{ height: '46px', borderRadius: '10px', fontSize: '0.88rem' }} required onChange={e => setFormData({ ...formData, password: e.target.value })} />
                <span className="icon-right" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="btn w-100 rounded-pill py-2 fw-bold text-white mt-2" style={{ height: '46px', background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)', border: 'none', fontSize: '0.9rem' }} disabled={loading}>
              {loading ? "Creating..." : "Create Account →"}
            </button>
          </form>

          <div className="d-flex align-items-center my-3 text-secondary">
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
            <span className="px-2 small text-uppercase" style={{ fontSize: '0.68rem' }}>OR</span>
            <div className="flex-grow-1 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          {/* Side-by-Side OAuth Buttons for Mobile & Desktop */}
          <div className="d-flex gap-2">
            <button type="button" className="btn w-50 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1.5 border text-white" style={{ height: '44px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', fontSize: '0.82rem' }} onClick={() => handleOAuthLogin('google')} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.21 21.32 7.29 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.29 0 3.21 2.68 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.99 6.73-4.99z"/>
              </svg>
              Google
            </button>

            <button type="button" className="btn w-50 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-1.5 border text-white" style={{ height: '44px', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.1)', fontSize: '0.82rem' }} onClick={() => handleOAuthLogin('github')} disabled={loading}>
              <i className="bi bi-github fs-6"></i>
              GitHub
            </button>
          </div>

          <div className="text-center mt-3">
            <span style={{ color: '#9ca3af' }} className="small">Already have an account? </span>
            <Link href="/login" className="small fw-bold text-decoration-none ms-1" style={{ color: '#00f2fe' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}