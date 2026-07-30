"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();  

  const handleLogout = async () => {
    setLoading(true);
    try {
      if (auth) {
        await signOut(auth);
      }
      toast.success("Logged out successfully");
      router.replace('/'); 
    } catch (error) {
      toast.error("Logout error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="btn btn-outline-danger rounded-pill px-4 py-1.5 d-inline-flex align-items-center gap-2"
      disabled={loading}
    >
      {loading ? (
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