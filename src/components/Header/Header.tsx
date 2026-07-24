"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { auth, rtdb } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import './Header.css';

const SEARCH_INDEX = [
  { label: "View Pricing & Packages", path: "/#pricing", keywords: ["price", "cost", "pricing", "budget"] },
  { label: "Our Portfolio & Live Projects", path: "/#portfolio", keywords: ["project", "portfolio", "work", "apps"] },
  { label: "Web & App Development Services", path: "/services", keywords: ["website", "app", "ui", "ux", "services"] },
  { label: "Contact Us", path: "/contact", keywords: ["contact", "hire", "phone", "email"] },
  { label: "About Our Core Expert Team", path: "/team", keywords: ["team", "developer"] },
  { label: "FAQ & Help", path: "/faq", keywords: ["faq", "help"] }
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('app-theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('app-theme', nextTheme);
    document.documentElement.setAttribute('data-bs-theme', nextTheme);
  };

  // ✅ FULLY FIXED MULTI-STAGE AUTH SYNC
  useEffect(() => {
    if (!mounted) return;
    let isCurrent = true;

    // 1. Instant Fast-Load from LocalStorage (Syncs immediately with Login/Register)
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('awebgrow_user_session');
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession);
          if (parsed && isCurrent) {
            setUser({
              name: parsed.name || parsed.email?.split('@')[0],
              profileImage: parsed.profileImage || "/icons/default-avatar.png",
              email: parsed.email,
              role: parsed.role || 'user'
            });
          }
        } catch (e) {
          console.error("Session parse error:", e);
        }
      }
    }

    // 2. Server API Session Check (/api/auth/me)
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user && isCurrent) {
            setUser({
              name: data.user.name || data.user.email?.split('@')[0],
              profileImage: data.user.profileImage || "/icons/default-avatar.png",
              email: data.user.email,
              role: data.user.role
            });
            return;
          }
        }
        // If not authenticated via cookie & localStorage missing -> clear user state
        if (!localStorage.getItem('awebgrow_user_session') && isCurrent) {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth session check error:", error);
      }
    };

    // 3. Client Firebase Auth Observer
    if (!auth) {
      checkAuthStatus();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth!, async (fbUser) => {
      if (fbUser && isCurrent) {
        try {
          const emailKey = fbUser.email?.replace(/\./g, '_');
          let dbUserData = null;
          if (emailKey && rtdb) {
            const userSnap = await get(ref(rtdb!, `users/${emailKey}`));
            if (userSnap.exists()) {
              dbUserData = userSnap.val();
            }
          }

          const userPayload = {
            name: dbUserData?.name || fbUser.displayName || fbUser.email?.split('@')[0] || "User",
            profileImage: dbUserData?.profileImage || fbUser.photoURL || "/icons/default-avatar.png",
            email: fbUser.email,
            role: dbUserData?.role || 'user'
          };

          setUser(userPayload);
          if (typeof window !== 'undefined') {
            localStorage.setItem('awebgrow_user_session', JSON.stringify(userPayload));
          }
        } catch (e) {
          setUser({
            name: fbUser.displayName || fbUser.email?.split('@')[0] || "User",
            profileImage: fbUser.photoURL || "/icons/default-avatar.png",
            email: fbUser.email
          });
        }
      } else {
        checkAuthStatus();
      }
    });

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, [pathname, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const matches = SEARCH_INDEX.filter(item =>
        item.label.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
      setFilteredSuggestions(matches);
    }
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('awebgrow_user_session');
      }
      setUser(null);
      setShowDropdown(false);
      setShowSidebar(false);
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error("Logout failure:", error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/team', label: 'Team' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  if (!mounted) return <header className="fixed-top w-100" style={{ height: '65px', background: '#020203' }} />;

  return (
    <>
      <header className="fixed-top custom-header py-1 px-3 px-md-4">
        <div className="container-fluid max-width-xl d-flex align-items-center justify-content-between">
          {/* BRAND LOGO */}
          <Link href="/" className="text-decoration-none d-flex align-items-center m-0 p-0">
            <Image src="/icons/awebgrow-logo.png" alt="AWEBGROW Logo" width={120} height={50} className="object-fit-contain rounded-2 border border-2 border-dark m-0 p-0" priority />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="d-none d-lg-flex align-items-center nav-capsule">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link key={link.path} href={link.path} className={`nav-link-custom ${isActive ? 'active' : ''}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="d-flex align-items-center gap-2 gap-md-3">

            {/* SEARCH */}
            <div className="position-relative d-none d-md-block" ref={searchRef} style={{ width: '150px' }}>
              <div className="position-relative d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="form-control search-input-dark"
                />
                <i className="bi bi-search position-absolute end-0 pe-3 text-secondary" style={{ fontSize: '0.72rem' }}></i>
              </div>

              {isSearchFocused && filteredSuggestions.length > 0 && (
                <div className="position-absolute bg-dark border p-2 mt-2 end-0 rounded-3 shadow-lg z-3" style={{ width: '220px' }}>
                  {filteredSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => { router.push(item.path); setIsSearchFocused(false); }}
                      className="p-2 small text-light rounded cursor-pointer"
                      style={{ cursor: 'pointer', fontSize: '0.78rem' }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* THEME SWITCHER */}
            <button
              onClick={toggleTheme}
              className="btn btn-icon-glow rounded-circle d-flex align-items-center justify-content-center border-0"
              style={{ width: '36px', height: '36px' }}
              title="Toggle Theme"
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} style={{ fontSize: '0.9rem' }}></i>
            </button>

            {/* AUTH / USER AVATAR */}
            <div ref={dropdownRef} className="position-relative">
              {user ? (
                <>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)} 
                    className="btn p-0 border-0 rounded-circle overflow-hidden shadow-sm" 
                    style={{ width: '38px', height: '38px' }}
                  >
                    <img 
                      src={user.profileImage || "/icons/default-avatar.png"} 
                      alt={user.name || "user"} 
                      width="38" 
                      height="38" 
                      className="rounded-circle object-fit-cover border border-1 border-light"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/icons/default-avatar.png"; }}
                    />
                  </button>

                  {showDropdown && (
                    <div className="position-absolute bg-dark border border-secondary text-start shadow-lg p-2 mt-2 end-0 rounded-3 z-3" style={{ minWidth: '180px' }}>
                      <div className="px-3 py-2 border-bottom text-white">
                        <div className="fw-bold text-truncate" style={{ fontSize: '0.82rem' }}>{user.name}</div>
                        <div className="text-muted text-truncate extra-small" style={{ fontSize: '0.72rem' }}>{user.email}</div>
                      </div>
                      <Link href="/dashboard" className="dropdown-item py-2 px-3 small text-white d-block rounded-2 mt-1" onClick={() => setShowDropdown(false)}>
                        <i className="bi bi-grid-1x2 me-2"></i> Dashboard
                      </Link>
                      <button className="dropdown-item py-2 px-3 text-danger small w-100 border-0 bg-transparent text-start fw-semibold rounded-2 mt-1" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login" className="btn-neon-cta">
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button onClick={() => setShowSidebar(true)} className="btn p-0 border-0 text-white d-lg-none ms-1">
              <i className="bi bi-list fs-2"></i>
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 z-3"
          style={{ backgroundColor: 'rgba(2, 2, 5, 0.75)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div
        className="position-fixed top-0 start-0 h-100 text-white p-4 d-flex flex-column z-3 mobile-sidebar-drawer"
        style={{
          width: '300px',
          backgroundColor: 'var(--bg-card, #0f101a)',
          borderRight: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
          boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="d-flex align-items-center gap-2 fw-bold">
            AWebGrow Solutions
          </div>
          <button onClick={() => setShowSidebar(false)} className="btn-close btn-close-white shadow-none" />
        </div>

        {/* Mobile Search */}
        <div className="mb-4">
          <div className="position-relative d-flex align-items-center">
            <input
              type="text"
              placeholder="Search site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control search-input-dark w-100 py-2"
              style={{ fontSize: '0.85rem' }}
            />
            <i className="bi bi-search position-absolute end-0 pe-3 text-secondary" style={{ fontSize: '0.8rem' }}></i>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="d-flex flex-column gap-2 flex-grow-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setShowSidebar(false)}
                className={`text-decoration-none fw-semibold fs-6 py-2.5 px-3 rounded-3 d-flex align-items-center justify-content-between transition-all ${isActive ? 'text-white' : 'text-secondary'}`}
                style={{
                  backgroundColor: isActive ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <span>{link.label}</span>
                <i className={`bi bi-chevron-right small ${isActive ? 'text-purple' : 'opacity-50'}`} style={{ fontSize: '0.7rem' }}></i>
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer Info */}
        <div className="pt-3 border-top mt-auto text-center" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-secondary small m-0" style={{ fontSize: '0.75rem' }}>© 2026 AWebGrow. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}