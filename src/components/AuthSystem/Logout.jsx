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
      // 1. Clear Backend Cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      // 2. Clear Firebase Client Auth State
      await signOut(auth);
      
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
      aria-label="Logout account session"
    >
      {asyncRunning ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      ) : (
        <>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </>
      )}
    </button>
  );
}