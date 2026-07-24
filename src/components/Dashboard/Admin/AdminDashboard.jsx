"use client";

import { useEffect, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link';

import DashboardHome from './DashboardHome.jsx';
import LiveAnalytics from './LiveAnalytics.jsx';
import UserDirectory from './UserDirectory';
import CouponManager from './CouponManager';
import WebsiteOrders from './WebsiteOrders';
import RecentProjects from './RecentProjects';
import AdminProfile from './AdminProfile';


export default function AdminDashboard({ session, onLogout }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Current Document Theme Fetching
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'dark';
    setTheme(currentTheme);

    const usersRef = ref(rtdb, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      try {
        const dbData = snapshot.val();
        if (dbData) {
          const userList = Object.keys(dbData).map(key => ({
            id: key,
            ...dbData[key]
          }));
          setAllUsers(userList);
        } else {
          setAllUsers([]);
        }
      } catch (err) {
        console.error("User stream parse error:", err);
      }
    }, (error) => {
      console.error("Realtime database error: ", error);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-bs-theme', nextTheme);
  };

  const navItems = [
    { name: 'Dashboard', icon: 'bi-grid-1x2', view: 'dashboard' },
    { name: 'Live Analytics', icon: 'bi-activity', view: 'analytics-live' },
    { name: 'Users Network', icon: 'bi-people', view: 'users' },
    { name: 'Website Coupons', icon: 'bi-graph-up', view: 'analytics' },
    { name: 'Website Orders', icon: 'bi-box-seam', view: 'orders' },
    { name: 'Recent Projects', icon: 'bi-folder', view: 'projects' },
    { name: 'Profile', icon: 'bi-person', view: 'profile' },
  ];

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardHome usersCount={allUsers.length} />;
      case 'analytics-live':
        return <LiveAnalytics />;
      case 'users':
        return <UserDirectory users={allUsers} />;
      case 'analytics':
        return <CouponManager />;
      case 'orders':
        return <WebsiteOrders />;
      case 'projects':
        return <RecentProjects />;
      case 'profile':
        return <AdminProfile session={session} />;
      default:
        return <DashboardHome usersCount={allUsers.length} />;
    }
  };

  const NavigationLinks = ({ isMobile = false }) => (
    <ul className="nav nav-pills flex-column px-3 mt-3 gap-1">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <li key={item.name} className="nav-item">
            <button
              onClick={() => {
                setCurrentView(item.view);
                if (isMobile) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`w-100 btn border-0 text-start d-flex align-items-center rounded-4 ${isActive ? 'btn-neon-cta shadow-lg' : 'btn-secondary-glow'
                }`}
              style={{
                padding: '11px 16px',
                gap: '14px',
                transition: 'all 0.3s ease',
                width: '100%',
                justifyContent: !isSidebarOpen && !isMobile ? 'center' : 'flex-start'
              }}
            >
              <i className={`bi ${item.icon} fs-5 flex-shrink-0`}></i>
              {(isMobile || isSidebarOpen) && (
                <span className="fw-black fs-6 text-nowrap" style={{ fontWeight: 800 }}>
                  {item.name}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="d-flex bg-theme-main text-theme-primary position-relative overflow-hidden" style={{ minHeight: '100vh' }}>

      {/* BACKGROUND NEON GLOW SPHERES */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '600px', height: '600px', top: '-10%', left: '-5%', zIndex: 0 }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '600px', height: '600px', bottom: '-10%', right: '-5%', zIndex: 0 }} />

      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className="d-none d-lg-flex flex-column justify-content-between border-end position-relative z-2"
        style={{
          width: isSidebarOpen ? '260px' : '76px',
          borderColor: 'var(--border-subtle)',
          backgroundColor: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 1030,
          overflowX: 'hidden'
        }}
      >
        <div>
          <div className="d-flex align-items-center justify-content-between px-4 border-bottom" style={{ height: '70px', borderColor: 'var(--border-subtle)' }}>
            {isSidebarOpen ? (
              <h5 className="fw-black m-0 text-theme-primary letter-spacing-1 text-nowrap" style={{ fontWeight: 900 }}>
                AWeb<span className="text-gradient-pink-orange">Grow</span><span className="text-theme-secondary small ms-1 fs-6">.admin</span>
              </h5>
            ) : (
              <h5 className="fw-black m-0 text-gradient-pink-orange text-center w-100" style={{ fontWeight: 900 }}>AG</h5>
            )}
          </div>
          <NavigationLinks isMobile={false} />
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-3 border-top d-flex flex-column gap-1" style={{ borderColor: 'var(--border-subtle)' }}>
          <Link href="/" className="btn-secondary-glow w-100 justify-content-start border-0" style={{ padding: '10px 16px', gap: '14px' }}>
            <i className="bi bi-arrow-left-square fs-5 flex-shrink-0"></i>
            {isSidebarOpen && <span className="small text-nowrap fw-bold">Back to Main</span>}
          </Link>

          <button
            onClick={onLogout}
            className="btn border-0 text-start d-flex align-items-center rounded-pill text-danger hover-bg-danger"
            style={{ padding: '10px 16px', gap: '14px', transition: 'all 0.3s ease' }}
          >
            <i className="bi bi-box-arrow-right fs-5 flex-shrink-0 text-danger"></i>
            {isSidebarOpen && <span className="small text-nowrap fw-black" style={{ fontWeight: 800 }}>Logout</span>}
          </button>

          {isSidebarOpen && (
            <div className="px-3 text-theme-secondary text-nowrap mt-1">
              <small style={{ fontSize: '11px', fontWeight: 600 }}>System Core v2.0.0</small>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MOBILE OFFCANVAS SIDEBAR */}
      <div
        className={`offcanvas offcanvas-start d-lg-none ${isMobileMenuOpen ? 'show' : ''}`}
        tabIndex={-1}
        style={{
          width: '280px',
          backgroundColor: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border-subtle)',
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="offcanvas-header px-4 d-flex align-items-center justify-content-between border-bottom" style={{ height: '70px', borderColor: 'var(--border-subtle)' }}>
          <h5 className="offcanvas-title fw-black text-theme-primary m-0" style={{ fontWeight: 900 }}>
            AWeb<span className="text-gradient-pink-orange">Grow</span><span className="text-theme-secondary small ms-1 fs-6">.admin</span>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setIsMobileMenuOpen(false)}
          ></button>
        </div>
        <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
          <div>
            <NavigationLinks isMobile={true} />
          </div>

          <div className="p-3 border-top d-flex flex-column gap-1" style={{ borderColor: 'var(--border-subtle)' }}>
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary-glow w-100 justify-content-start border-0" style={{ padding: '10px 16px', gap: '14px' }}>
              <i className="bi bi-arrow-left-square fs-5 flex-shrink-0"></i>
              <span className="small fw-bold">Back to Main</span>
            </Link>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="btn border-0 text-start d-flex align-items-center rounded-pill text-danger"
              style={{ padding: '10px 16px', gap: '14px' }}
            >
              <i className="bi bi-box-arrow-right fs-5 flex-shrink-0 text-danger"></i>
              <span className="small fw-black" style={{ fontWeight: 800 }}>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="offcanvas-backdrop fade show d-lg-none"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 1025 }}
        ></div>
      )}

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 position-relative z-1" style={{ overflowX: 'hidden' }}>

        {/* TOP NAVBAR */}
        <nav
          className="navbar navbar-expand border-bottom px-4"
          style={{
            height: '70px',
            position: 'sticky',
            top: 0,
            zIndex: 1020,
            backgroundColor: 'var(--bg-header)',
            backdropFilter: 'blur(16px)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="btn btn-secondary-glow rounded-circle p-0 d-none d-lg-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <i className={`bi ${isSidebarOpen ? 'bi-text-paragraph' : 'bi-list'} fs-5`}></i>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="btn btn-secondary-glow rounded-circle p-0 d-flex d-lg-none align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="bi bi-list fs-4"></i>
              </button>

              <div
                className="d-none d-sm-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                style={{
                  background: 'rgba(255, 0, 128, 0.06)',
                  border: '1px solid rgba(255, 0, 128, 0.2)'
                }}
              >
                <span className="badge-dot-pink" />
                <span className="fw-black text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: '#ff77bc', fontWeight: 800 }}>
                  SYSTEM CONSOLE
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2.5">
              <Link
                href="/"
                className="btn btn-secondary-glow rounded-circle mx-1 p-0 d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                title="Go to Home"
              >
                <i className="bi bi-house fs-5"></i>
              </Link>

              <button
                onClick={toggleTheme}
                className="btn btn-secondary-glow rounded-circle mx-1 p-0 d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                title="Toggle Theme"
              >
                <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-info'} fs-5`}></i>
              </button>

              <button className="btn btn-secondary-glow rounded-circle mx-1 p-0 position-relative d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>

              <div className="d-flex align-items-center gap-3 border-start ps-3 ms-1" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="text-end">
                  <div className="fw-black text-theme-primary small" style={{ fontWeight: 800 }}>{session?.name || 'hridesh'}</div>
                  <div className="text-theme-secondary" style={{ fontSize: '11px', fontWeight: 600 }}>Super Admin</div>
                </div>
              </div>
            </div>

          </div>
        </nav>

        {/* ACTIVE VIEW WRAPPER */}
        <main className="flex-grow-1 px-3 px-md-4 py-4">
          {renderActiveView()}
        </main>
      </div>

      <style jsx>{`
        .hover-bg-danger:hover {
          background-color: rgba(220, 53, 69, 0.15) !important;
        }
      `}</style>
    </div>
  );
}