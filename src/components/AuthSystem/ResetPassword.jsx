// src\components\AuthSystem\ResetPassword.jsx 
"use client";
import { useState, useEffect, Suspense } from 'react'; 
import { useSearchParams, useRouter } from 'next/navigation'; 
import { auth } from '@/lib/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { toast } from 'sonner'; 
import { FiLock } from 'react-icons/fi';

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
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden shell-wrapper" style={{ minHeight: '100vh', backgroundColor: '#020205', padding: '10px' }}>
      
      {/* AMBIENT BACKGROUND NEON SPHERES */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <style dangerouslySetInnerHTML={{__html: `
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

      <article className="position-relative overflow-hidden custom-card d-flex flex-column my-4">
        
        {/* Header Section */}
        <header className="py-4 px-4 border-bottom" style={{ borderColor: 'var(--border-subtle)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(255, 0, 128, 0.05) 100%)' }}>
          <h1 className="h4 fw-black text-white m-0" style={{ fontWeight: 900, letterSpacing: '-0.5px' }}>Setup New Password</h1>
          <p className="text-theme-secondary small mt-1 mb-0" style={{ color: '#9ca3af', fontWeight: 500 }}>Enter your secure new account credentials</p>
        </header>

        <div className="px-4 pt-4 pb-4">
          {message && (
            <div className="alert border text-center small rounded-3 mb-3" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: '#f87171' }}>
              {message}
            </div>
          )}

          {isCodeValid && (
            <form onSubmit={handleUpdatePassword} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-bold text-theme-secondary mb-1" style={{ color: '#9ca3af' }}>New Password</label>
                <div className="input-icon-wrapper">
                  <FiLock />
                  <input 
                    type="password" 
                    placeholder="Min 6 characters" 
                    className="form-control" 
                    style={{ height: '50px', borderRadius: '12px', fontSize: '0.9rem' }} 
                    required 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)} 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn w-100 rounded-pill py-2 fw-black text-white mt-2" 
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
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </article>
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