"use client";
// src/components/Dashboard/Admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import Link from 'next/link';

import DashboardHome from './DashboardHome.jsx';
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

  useEffect(() => {
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
        console.error("Payload extraction failed inside real-time registry stream:", err);
      }
    }, (error) => {
      console.error("Database linkage failed: ", error);
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: 'bi-grid-1x2', view: 'dashboard' },
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
              className={`w-100 btn border-0 text-start d-flex align-items-center rounded-3 text-white ${isActive ? 'active-link' : 'hover-link'}`}
              style={{ padding: '12px 16px', gap: '16px', transition: 'background-color 0.2s' }}
            >
              <i className={`bi ${item.icon} fs-5 icon-color flex-shrink-0`}></i>
              {(isMobile || isSidebarOpen) && (
                <span className="fw-medium fs-6 text-nowrap label-text text-color">
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
    <div className="d-flex bg-light-alt" style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className="d-none d-lg-flex flex-column justify-content-between border-end border-opacity-10 sidebar-gradient"
        style={{
          width: isSidebarOpen ? '260px' : '72px',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 1030,
          overflowX: 'hidden'
        }}
      >
        <div>
          <div className="d-flex align-items-center justify-content-between px-4" style={{ height: '70px' }}>
            {isSidebarOpen ? (
              <h5 className="fw-bold m-0 text-white letter-spacing-1 text-nowrap">
                Web<span className="text-warning">Grow</span><span className="text-white-50 small ms-1 fs-6">.vercel.app</span>
              </h5>
            ) : (
              <h5 className="fw-bold m-0 text-warning text-center w-100">WG</h5>
            )}
          </div>
          <NavigationLinks isMobile={false} />
        </div>

        {/* BOTTOM PANEL WITH LOGOUT */}
        <div className="p-3 border-top border-white border-opacity-10 d-flex flex-column gap-1">
          <Link href="/" className="nav-link text-white-50 d-flex align-items-center rounded-3 hover-link" style={{ padding: '10px 16px', gap: '16px' }}>
            <i className="bi bi-arrow-left-square fs-5 flex-shrink-0 text-white-50"></i>
            {isSidebarOpen && <span className="text-white small text-nowrap">Back to Main</span>}
          </Link>

          <button
            onClick={onLogout}
            className="btn border-0 text-start d-flex align-items-center rounded-3 text-danger logout-hover"
            style={{ padding: '10px 16px', gap: '16px' }}
          >
            <i className="bi bi-box-arrow-right fs-5 flex-shrink-0 text-danger"></i>
            {isSidebarOpen && <span className="small text-nowrap fw-medium">Logout</span>}
          </button>

          {isSidebarOpen && (
            <div className="px-3 opacity-50 text-white text-nowrap mt-1">
              <small style={{ fontSize: '11px' }}>System Version 2.0.0</small>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MOBILE BOOTSTRAP OFFCANVAS MENU */}
      <div
        className={`offcanvas offcanvas-start sidebar-gradient d-lg-none ${isMobileMenuOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{
          width: '280px',
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="offcanvas-header px-4 d-flex align-items-center justify-content-between" style={{ height: '70px' }}>
          <h5 className="offcanvas-title fw-bold text-white m-0">
            Web<span className="text-warning">Grow</span><span className="text-white-50 small ms-1 fs-6">.io</span>
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

          <div className="p-3 border-top border-white border-opacity-10 d-flex flex-column gap-1">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link text-white-50 d-flex align-items-center rounded-3 hover-link" style={{ padding: '10px 16px', gap: '16px' }}>
              <i className="bi bi-arrow-left-square fs-5 flex-shrink-0 text-white-50"></i>
              <span className="text-white small">Back to Main</span>
            </Link>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="btn border-0 text-start d-flex align-items-center rounded-3 text-danger logout-hover"
              style={{ padding: '10px 16px', gap: '16px' }}
            >
              <i className="bi bi-box-arrow-right fs-5 flex-shrink-0 text-danger"></i>
              <span className="small fw-medium">Logout</span>
            </button>

            <div className="px-3 opacity-50 text-white mt-1">
              <small style={{ fontSize: '11px' }}>System Version 2.0.0</small>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="offcanvas-backdrop fade show d-lg-none"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 1025 }}
        ></div>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100" style={{ overflowX: 'hidden' }}>

        {/* TOP NAVBAR */}
        <nav className="navbar navbar-expand navbar-white bg-white border-bottom px-4" style={{ height: '70px', position: 'sticky', top: 0, zIndex: 1020 }}>
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="btn btn-light rounded-circle border-0 d-none d-lg-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <i className={`bi ${isSidebarOpen ? 'bi-text-paragraph' : 'bi-list'} fs-5`}></i>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="btn btn-light rounded-circle border-0 d-flex d-lg-none align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
              >
                <i className="bi bi-list fs-4"></i>
              </button>

              <span className="text-muted d-none d-sm-inline-block small fw-medium">Console / System Management</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* ✅ होम (Home) बटन - नोटिफिकेशन बेल से ठीक पहले */}
              <Link 
                href="/" 
                className="btn btn-link text-muted p-1 border-0 d-flex align-items-center justify-content-center" 
                title="Go to Home"
              >
                <i className="bi bi-house fs-5"></i>
              </Link>

              {/* नोटिफिकेशन बेल */}
              <button className="btn btn-link text-muted position-relative p-1 border-0">
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
              </button>

              <div className="d-flex align-items-center gap-3 border-start ps-3">
                <div className="text-end">
                  <div className="fw-semibold text-dark small">{session?.name || 'Hridesh'}</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>Super Admin</div>
                </div>
              </div>
            </div>

          </div>
        </nav>

        {/* COMPONENT LOADING BOUNDARY */}
        <main
          className="flex-grow-1 px-3 py-4"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #d1fde1 50%, #ccd5ff 100%)',
            minHeight: '100vh'
          }}
        >
          {renderActiveView()}
        </main>
      </div>

      <style jsx>{`
        .bg-light-alt { background-color: #f8fafc; }
        
        .sidebar-gradient {
          background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 50%, #1a0b44 100%) !important;
        }

        .icon-color { color: rgba(255, 255, 255, 0.5) !important; }
        .text-color { color: rgba(255, 255, 255, 0.85) !important; }
        
        .active-link { background-color: rgba(255, 193, 7, 0.18) !important; }
        .active-link .icon-color, .active-link .text-color { color: #ffc107 !important; }
        
        .hover-link:hover { background-color: rgba(255, 255, 255, 0.08) !important; }
        .hover-link:hover .icon-color, .hover-link:hover .text-color { color: #ffffff !important; }

        .logout-hover:hover {
          background-color: rgba(220, 53, 69, 0.15) !important;
        }

        .label-text {
          animation: fadeIn 0.15s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}