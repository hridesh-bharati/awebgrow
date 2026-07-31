"use client";
// src\app\dashboard\page.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, rtdb } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import AdminDashboard from '@/components/Dashboard/Admin/AdminDashboard';
import UserDashboard from '@/components/Dashboard/User/UserDashboard';
import { toast } from 'sonner';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
];

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    // Direct Realtime Auth State Listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const email = user.email ? user.email.toLowerCase().trim() : '';
          const emailKey = email.replace(/\./g, '_');
          const isMasterAdmin = ADMIN_EMAILS.includes(email);

          let dbData = {};
          if (rtdb) {
            const userRef = ref(rtdb, `users/${emailKey}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              dbData = snapshot.val();
            }
          }

          const userRole = isMasterAdmin ? 'admin' : (dbData.role || 'user');

          setSession({
            uid: user.uid,
            email: email,
            name: dbData.name || user.displayName || email.split('@')[0],
            profileImage: dbData.profileImage || user.photoURL || "/icons/default-avatar.png",
            role: userRole
          });
        } catch (error) {
          console.error("Dashboard Session Error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSession(null);
        setLoading(false);
        router.replace('/login'); // Prevent redirect history loop
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      toast.success("Logged out successfully");
      router.replace('/login');
    } catch (error) {
      toast.error("Logout error: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#020205' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Syncing core views...</span>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <main className="container-fluid p-0 m-0 min-vh-100">
      {session.role === 'admin' ? (
        <AdminDashboard session={session} onLogout={handleLogout} />
      ) : (
        <UserDashboard session={session} onLogout={handleLogout} />
      )}
    </main>
  );
}