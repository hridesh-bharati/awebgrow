"use client";
import { useState, useEffect, Suspense } from 'react'; 
import { useSearchParams, useRouter } from 'next/navigation'; 
import { auth } from '@/lib/firebase';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { toast } from 'sonner'; 

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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-2 small text-muted">Verifying secure token...</span>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <article className="card shadow-sm p-4 border-0 rounded-4 w-100 bg-white" style={{ maxWidth: '400px' }}>
        <header className="text-center mb-4">
          <h1 className="h4 fw-bold text-dark">Setup New Password</h1>
          <p className="text-muted small">Enter your secure premium workspace password</p>
        </header>

        {message && <div className="alert bg-light border text-center small rounded-3 mb-3">{message}</div>}

        {isCodeValid && (
          <form onSubmit={handleUpdatePassword} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small fw-semibold text-secondary">New Password</label>
              <input 
                type="password" 
                placeholder="Min 6 characters" 
                className="form-control rounded-3 py-2" 
                required 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)} 
              />
            </div>

            <button type="submit" className="btn btn-primary rounded-pill py-2 fw-medium mt-2" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </article>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}