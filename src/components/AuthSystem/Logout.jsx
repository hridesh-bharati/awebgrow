"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

export default function Logout() {
  const [asyncRunning, setAsyncRunning] = useState(false);
  const router = useRouter();  

  const performClearance = async () => {
    setAsyncRunning(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await signOut(auth);

      if (typeof window !== 'undefined') {
        localStorage.removeItem('awebgrow_user_session');
      }
      
      toast.success("Logged out successfully");
      router.push('/login'); 
      router.refresh();
    } catch (error) {
      toast.error("Logout error: " + error.message);
    } finally {
      setAsyncRunning(false);
    }
  };

  return (
    <button 
      onClick={performClearance} 
      className="btn btn-outline-danger rounded-pill px-4 py-1.5 d-inline-flex align-items-center gap-2"
      disabled={asyncRunning}
    >
      {asyncRunning ? (
        <span className="spinner-border spinner-border-sm" role="status"></span>
      ) : (
        <>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </>
      )}
    </button>
  );
}