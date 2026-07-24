"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserDashboard({ session, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to your dashboard!", time: "Just now", read: false },
    { id: 2, message: "Your profile has been verified", time: "2 hours ago", read: false },
    { id: 3, message: "New feature available: Analytics", time: "1 day ago", read: true }
  ]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  // Stats data
  const stats = [
    { label: "Projects", value: "12", icon: "bi-folder", color: "text-purple" },
    { label: "Tickets", value: "5", icon: "bi-ticket", color: "text-warning" },
    { label: "Messages", value: "8", icon: "bi-envelope", color: "text-info" },
    { label: "Tasks", value: "23", icon: "bi-check-circle", color: "text-success" }
  ];

  // Recent activity data
  const recentActivity = [
    { action: "Completed project setup", time: "2 hours ago", status: "completed" },
    { action: "Updated profile settings", time: "5 hours ago", status: "updated" },
    { action: "New message from support", time: "1 day ago", status: "new" },
    { action: "Logged in from new device", time: "2 days ago", status: "info" }
  ];

  // Quick actions
  const quickActions = [
    { label: "Create Project", icon: "bi-plus-circle", href: "/projects/new", gradient: "linear-gradient(135deg, #a855f7, #3b82f6)" },
    { label: "View Tickets", icon: "bi-ticket", href: "/tickets", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
    { label: "Edit Profile", icon: "bi-person-gear", href: "/profile", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
    { label: "Help Center", icon: "bi-question-circle", href: "/help", gradient: "linear-gradient(135deg, #10b981, #06b6d4)" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed": return "bg-success bg-opacity-20 text-white border border-success border-opacity-20";
      case "updated": return "bg-info bg-opacity-20 text-white border border-info border-opacity-20";
      case "new": return "bg-danger bg-opacity-20 text-white border border-danger border-opacity-20";
      default: return "bg-secondary bg-opacity-20 text-white border border-secondary border-opacity-20";
    }
  };

  return (
    <div className="container py-4 position-relative overflow-hidden" style={{ minHeight: '100vh', backgroundColor: '#020205' }}>
      
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-1" style={{ width: '500px', height: '500px', top: '-10%', left: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="position-absolute rounded-circle pointer-events-none glow-sphere-2" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', zIndex: 0, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-dashboard-card {
          background-color: var(--bg-card, rgba(15, 16, 26, 0.85)) !important;
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
          border-radius: 24px !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .dashboard-nav-link {
          color: var(--text-secondary, #9ca3af) !important;
          transition: all 0.25s ease;
          border: 1px solid transparent;
        }
        .dashboard-nav-link:hover, .dashboard-nav-link.active {
          background: rgba(168, 85, 247, 0.15) !important;
          color: #ffffff !important;
          border-color: rgba(168, 85, 247, 0.3) !important;
        }
      `}} />

      <div className="position-relative z-2">
        
        {/* Dashboard Header */}
        <div className="row g-4 mb-4" data-aos="fade-up">
          <div className="col-12">
            <div className="custom-dashboard-card p-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                
                {/* User Profile Info */}
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative" style={{ width: '70px', height: '70px' }}>
                    <Image 
                      src={session?.profileImage || "/icos/default-avatar.png"} 
                      alt="Profile" 
                      fill
                      className="rounded-circle object-fit-cover border border-2 border-purple shadow-sm"
                    />
                    <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle p-1.5" title="Active"></span>
                  </div>
                  <div>
                    <h1 className="h4 fw-black text-white m-0" style={{ fontWeight: 900 }}>Welcome back, {session?.name || "User"}!</h1>
                    <p className="text-theme-secondary small m-0" style={{ color: '#9ca3af' }}>{session?.email || "user@example.com"}</p>
                    <span className="badge rounded-pill mt-1" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', fontSize: '0.7rem' }}>
                      <i className="bi bi-shield-check me-1"></i> Premium User
                    </span>
                  </div>
                </div>

                {/* Quick Stats Mini Bar */}
                <div className="d-flex gap-3 bg-pill p-2 rounded-4 border" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.03))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                  <div className="text-center px-3">
                    <div className="h5 fw-bold text-white mb-0">12</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Projects</small>
                  </div>
                  <div className="text-center px-3 border-start" style={{ borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                    <div className="h5 fw-bold text-warning mb-0">5</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Tickets</small>
                  </div>
                  <div className="text-center px-3 border-start" style={{ borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                    <div className="h5 fw-bold text-success mb-0">98%</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Rating</small>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="100">
          {stats.map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="custom-dashboard-card p-3 text-center h-100">
                <div className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <i className={`bi ${stat.icon} fs-5 ${stat.color}`}></i>
                </div>
                <h3 className="h4 fw-black text-white mb-0" style={{ fontWeight: 800 }}>{stat.value}</h3>
                <small className="text-secondary" style={{ fontSize: '0.8rem' }}>{stat.label}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="row g-4">
          
          {/* Sidebar Navigation */}
          <div className="col-md-3" data-aos="fade-right">
            <div className="custom-dashboard-card p-3">
              <nav className="nav flex-column gap-2">
                <button 
                  className={`nav-link text-start rounded-3 py-2.5 px-3 dashboard-nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="bi bi-grid me-2"></i>Overview
                </button>
                <button 
                  className={`nav-link text-start rounded-3 py-2.5 px-3 dashboard-nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  <i className="bi bi-folder me-2"></i>Projects
                </button>
                <button 
                  className={`nav-link text-start rounded-3 py-2.5 px-3 dashboard-nav-link ${activeTab === 'tickets' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tickets')}
                >
                  <i className="bi bi-ticket me-2"></i>Tickets
                  <span className="badge bg-danger float-end mt-1">3</span>
                </button>
                <button 
                  className={`nav-link text-start rounded-3 py-2.5 px-3 dashboard-nav-link ${activeTab === 'messages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  <i className="bi bi-envelope me-2"></i>Messages
                  <span className="badge bg-primary float-end mt-1">5</span>
                </button>
                <button 
                  className={`nav-link text-start rounded-3 py-2.5 px-3 dashboard-nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="bi bi-gear me-2"></i>Settings
                </button>
                <div className="border-top my-2" style={{ borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}></div>
                <button 
                  onClick={onLogout}
                  className="nav-link text-start rounded-3 py-2.5 px-3 text-danger dashboard-nav-link"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Display Panel */}
          <div className="col-md-9" data-aos="fade-left">
            <div className="custom-dashboard-card p-4 text-theme-primary">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  <h3 className="h5 fw-bold mb-4 text-white">
                    <i className="bi bi-grid me-2 text-purple" style={{ color: '#a855f7' }}></i>Dashboard Overview
                  </h3>

                  {/* Recent Activity */}
                  <div className="mb-4">
                    <h4 className="h6 fw-bold text-secondary mb-3">Recent Activity</h4>
                    <div className="d-flex flex-column gap-2">
                      {recentActivity.map((item, index) => (
                        <div key={index} className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.02))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                          <div className="d-flex align-items-center gap-2">
                            <span className={`badge rounded-pill px-2.5 py-1 ${getStatusBadge(item.status)}`}>
                              {item.status}
                            </span>
                            <span className="text-white small">{item.action}</span>
                          </div>
                          <small className="text-secondary" style={{ fontSize: '0.78rem' }}>{item.time}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="h6 fw-bold text-secondary mb-3">Quick Actions</h4>
                    <div className="row g-3">
                      {quickActions.map((action, index) => (
                        <div key={index} className="col-12 col-sm-6">
                          <Link 
                            href={action.href}
                            className="btn w-100 text-start rounded-3 py-2.5 px-3 fw-bold text-white d-flex align-items-center justify-content-between border-0 shadow-sm"
                            style={{ background: action.gradient, fontSize: '0.9rem' }}
                          >
                            <span><i className={`bi ${action.icon} me-2`}></i>{action.label}</span>
                            <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <>
                  <h3 className="h5 fw-bold mb-4 text-white">
                    <i className="bi bi-folder me-2 text-purple" style={{ color: '#a855f7' }}></i>Your Projects
                  </h3>
                  <div className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-secondary opacity-50"></i>
                    <p className="text-secondary mt-3">You have 12 active projects in development.</p>
                    <button className="btn rounded-pill px-4 fw-bold text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                      <i className="bi bi-plus-circle me-2"></i>Create New Project
                    </button>
                  </div>
                </>
              )}

              {/* Tickets Tab */}
              {activeTab === 'tickets' && (
                <>
                  <h3 className="h5 fw-bold mb-4 text-white">
                    <i className="bi bi-ticket me-2 text-warning"></i>Support Tickets
                  </h3>
                  <div className="d-flex flex-column gap-2">
                    <div className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.02))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                      <div>
                        <span className="badge bg-danger bg-opacity-20 text-white border border-danger border-opacity-20 me-2">High</span>
                        <span className="text-white small">Login issue on mobile interface</span>
                      </div>
                      <span className="badge bg-warning bg-opacity-20 text-white border border-warning border-opacity-20">Open</span>
                    </div>
                    <div className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.02))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                      <div>
                        <span className="badge bg-warning bg-opacity-20 text-white border border-warning border-opacity-20 me-2">Medium</span>
                        <span className="text-white small">Feature request: Cyberpunk Theme options</span>
                      </div>
                      <span className="badge bg-info bg-opacity-20 text-white border border-info border-opacity-20">In Progress</span>
                    </div>
                    <div className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.02))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                      <div>
                        <span className="badge bg-success bg-opacity-20 text-white border border-success border-opacity-20 me-2">Low</span>
                        <span className="text-white small">Billing subscription receipt</span>
                      </div>
                      <span className="badge bg-success bg-opacity-20 text-white border border-success border-opacity-20">Resolved</span>
                    </div>
                  </div>
                </>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <>
                  <h3 className="h5 fw-bold mb-4 text-white">
                    <i className="bi bi-envelope me-2 text-info"></i>Messages &amp; Notifications
                  </h3>
                  <div className="d-flex flex-column gap-2">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 rounded-3 border d-flex justify-content-between align-items-center" style={{ backgroundColor: !notif.read ? 'rgba(168, 85, 247, 0.08)' : 'var(--bg-pill, rgba(255,255,255,0.02))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }}>
                        <div>
                          <p className="mb-0 text-white small fw-medium">{notif.message}</p>
                          <small className="text-secondary" style={{ fontSize: '0.75rem' }}>{notif.time}</small>
                        </div>
                        {!notif.read && <span className="badge rounded-pill" style={{ background: '#a855f7' }}>New</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <>
                  <h3 className="h5 fw-bold mb-4 text-white">
                    <i className="bi bi-gear me-2 text-secondary"></i>Account Settings
                  </h3>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Display Name</label>
                    <input type="text" className="form-control text-white border" defaultValue={session?.name || "User"} style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.03))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Email Address</label>
                    <input type="email" className="form-control text-white border" defaultValue={session?.email || "user@example.com"} disabled style={{ backgroundColor: 'var(--bg-pill, rgba(255,255,255,0.03))', borderColor: 'var(--border-subtle, rgba(255,255,255,0.08))' }} />
                  </div>
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="notifications" defaultChecked style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }} />
                    <label className="form-check-label text-secondary small" htmlFor="notifications">
                      Receive automated security alerts &amp; updates via email
                    </label>
                  </div>
                  <button className="btn rounded-pill px-4 fw-bold text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                    <i className="bi bi-save me-2"></i>Save Changes
                  </button>
                </>
              )}

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="row mt-4" data-aos="fade-up">
          <div className="col-12">
            <div className="custom-dashboard-card p-3 d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <Link href="/" className="btn btn-outline-light rounded-pill px-4 btn-sm border" style={{ backgroundColor: 'var(--bg-pill)', borderColor: 'var(--border-subtle)', color: '#fff' }}>
                <i className="bi bi-house-door me-2"></i>Back to Home
              </Link>
              <button onClick={onLogout} className="btn btn-danger btn-sm rounded-pill px-4 bg-opacity-20 border border-danger border-opacity-20 text-danger fw-bold">
                <i className="bi bi-box-arrow-right me-2"></i>Sign Out
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}