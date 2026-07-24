"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { toast } from 'sonner';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [oobCode, setOobCode] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        .catch(() => {
          setMessage("Link Expired or Invalid! Please request a new link.");
          setVerifying(false);
        });
    } else {
      setMessage("Missing Action Token. Please use the link sent to your email.");
      setVerifying(false);
    }
  }, [searchParams]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password updated successfully! Redirecting to login...");

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setMessage("Failed: " + error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#020205' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 position-relative overflow-hidden p-1 p-md-3" style={{ minHeight: '100vh', backgroundColor: '#020205' }}>
      <div className="position-relative overflow-hidden custom-card d-flex flex-column p-3 p-sm-4 p-md-5 my-1">
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
            <Image src="/images/awebgrow-logo-art-letter.png" alt="Logo" width={120} height={110} className="object-fit-contain" priority />
          </div>
          <h3 className="fw-bold text-white m-0" style={{ fontSize: '1.25rem' }}>Secure Reset</h3>
          <h2 className="fw-black m-0 mt-1" style={{ fontSize: '1.5rem' }}>
            <span style={{ color: '#3b82f6' }}>Setup New </span>
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Password </span>
          </h2>
        </div>

        <div className="flex-grow-1">
          {message && (
            <div className="alert border text-center small rounded-3 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#f87171' }}>
              {message}
            </div>
          )}

          {isCodeValid && (
            <form onSubmit={handleUpdatePassword} className="d-flex flex-column gap-2.5">
              <div className="position-relative d-flex align-items-center">
                <span className="position-absolute ms-3 text-secondary"><FiLock size={16} /></span>
                <input type={showPassword ? "text" : "password"} placeholder="Min 6 characters" className="form-control text-white border" style={{ height: '46px', borderRadius: '10px', paddingLeft: '42px', paddingRight: '42px', fontSize: '0.88rem' }} required value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <span className="position-absolute end-0 me-3 text-secondary cursor-pointer" style={{ zIndex: 10 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </span>
              </div>

              <button type="submit" className="btn w-100 rounded-pill py-2 fw-bold text-white mt-2" style={{ height: '46px', background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f97316 100%)', border: 'none', fontSize: '0.9rem' }} disabled={loading}>
                {loading ? "Updating..." : "Update Password →"}
              </button>
            </form>
          )}
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