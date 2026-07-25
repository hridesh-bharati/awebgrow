"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/Dashboard/Admin/AdminDashboard';
import UserDashboard from '@/components/Dashboard/User/UserDashboard';

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();

        if (data.authenticated) {
          setSession(data.user);
        } else {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    verifySession();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('awebgrow_user_session');
    }
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Strict Role Check: Render Admin Panel ONLY for defined admins
  if (session.role === 'admin') {
    return <AdminDashboard session={session} onLogout={handleLogout} />;
  }

  return <UserDashboard session={session} onLogout={handleLogout} />;
}