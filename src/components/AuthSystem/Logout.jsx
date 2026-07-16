"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function Logout() {
  const [asyncRunning, setAsyncRunning] = useState(false);
  const router = useRouter();  

  const performClearance = async () => {
    setAsyncRunning(true);
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/'); 
      }
    } catch (error) {
      console.error("Logout execution fault: ", error);
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