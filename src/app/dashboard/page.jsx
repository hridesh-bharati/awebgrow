'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/Dashboard/Admin/AdminDashboard';
import UserDashboard from '@/components/Dashboard/User/UserDashboard';

const ADMIN_EMAILS = [
  'sushantkumar867695@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (!res.ok) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated) {
          setSession(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Dashboard security handshake failed:", error);
        router.push('/login');
      } finally {
        setLoading(false); 
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/'); 
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Syncing core views...</span>
        </div>
      </div>
    );
  }

  const isAdmin = 
    ADMIN_EMAILS.includes(session?.email?.toLowerCase()) || 
    session?.role === 'admin';

  return (
    <main className="container-fluid p-0 m-0 min-vh-100">
      {isAdmin ? (
        <AdminDashboard session={session} onLogout={handleLogout} />
      ) : (
        <UserDashboard session={session} onLogout={handleLogout} />
      )}
    </main>
  );
}