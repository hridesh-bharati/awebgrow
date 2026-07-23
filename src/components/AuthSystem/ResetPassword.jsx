"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { toast } from 'sonner';
import { FiLock } from 'react-icons/fi';
import Image from 'next/image';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [oobCode, setOobCode] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (code) {
      setOobCode(code);
      verifyPasswordResetCode(auth, code)
        .then(() => {
          setIsCodeValid(true);
          setVerifying(false);
        })
        .catch((err) => {
          setMessage("❌ Link Expired or Invalid! Please request a new link.");
          setVerifying(false);
        });
    } else {
      setMessage("❌ Missing Action Token. Please open this page via the link sent to your email.");
      setVerifying(false);
    }
  }, [searchParams]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("🎉 Password updated successfully! Redirecting to login...");

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setMessage("❌ Failed to update password: " + error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#020205' }}>
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3 small text-theme-secondary" style={{ color: '#9ca3af' }}>Verifying secure token...</span>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '4px' }}>

      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-4 p-md-5 shadow-lg border text-theme-primary" style={{ width: '100%', maxWidth: '480px', borderRadius: '24px', backgroundColor: 'var(--bg-card, rgba(15, 16, 26, 0.9))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', backdropFilter: 'blur(20px)', zIndex: 2 }}>

        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center mb-3">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={146} height={140} className="object-fit-contain" priority />
          </div>
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.4rem', fontWeight: 700 }}>Secure Reset</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.7rem', fontWeight: 900 }}>
            <span style={{ color: '#3b82f6' }}>Setup New </span>
            <span className="text-gradient-purple-blue" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Password </span>
          </h2>
          <p className="text-theme-secondary small mt-2 mb-0" style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            Enter your secure new account credentials
          </p>
        </div>

        <div className="flex-grow-1">
          {message && (
            <div className="alert border text-center small rounded-3 mb-3" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.03))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))', color: '#f87171' }}>
              {message}
            </div>
          )}

          {isCodeValid && (
            <form onSubmit={handleUpdatePassword} className="d-flex flex-column gap-3">
              <div className="position-relative d-flex align-items-center">
                <span className="position-absolute ms-3 text-secondary" style={{ zIndex: 10 }}>
                  <FiLock size={18} />
                </span>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  className="form-control text-theme-primary border"
                  style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem', paddingLeft: '45px', backgroundColor: 'var(--bg-pill, rgba(255, 255, 255, 0.03))', borderColor: 'var(--border-subtle, rgba(255, 255, 255, 0.08))', color: '#fff' }}
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 rounded-pill py-2.5 fw-bold text-white mt-2"
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
                {loading ? "Updating..." : "Update Password →"}
              </button>
            </form>
          )}

          <div className="text-center mt-4 pt-2 text-secondary" style={{ fontSize: '0.75rem' }}>
            <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
              <i className="bi bi-shield-check text-success"></i>
              <span>Secure Token Verification • 256-bit Encryption</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#020205' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}