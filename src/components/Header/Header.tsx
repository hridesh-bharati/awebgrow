"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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

  useEffect(() => {
    if (!mounted) return;
    let isCurrent = true;

    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && isCurrent) {
            setUser(data.user);
            return;
          }
        }
        if (isCurrent) setUser(null);
      } catch (error) {
        if (isCurrent) setUser(null);
      }
    };

    checkAuthStatus();
    return () => { isCurrent = false; };
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
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
        setShowDropdown(false);
        setShowSidebar(false);
        router.push('/');
        router.refresh();
      }
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
      <header className="fixed-top custom-header py-2 px-3 px-md-4">
        <div className="container-fluid max-width-xl d-flex align-items-center justify-content-between">
          
          {/* BRAND LOGO */}
          <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
            <div 
              className="d-flex align-items-center justify-content-center rounded-3 p-1"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
                width: '36px',
                height: '36px'
              }}
            >
              <div className="bg-dark w-100 h-100 rounded-3 d-flex align-items-center justify-content-center">
                <Image src="/icons/logo.png" alt="AWEBGROW Logo" width={20} height={22} className="object-fit-contain" priority />
              </div>
            </div>
            <span className="text-gradient-purple fs-4 fw-extrabold text-uppercase tracking-tight">AWEBGROW</span>
          </Link>

          {/* DESKTOP NAVIGATION (Pill Container) */}
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
                  <button onClick={() => setShowDropdown(!showDropdown)} className="btn p-0 border-0 rounded-circle" style={{ width: '36px', height: '36px' }}>
                    <Image src={user.profileImage || "/icons/logo.png"} alt="User Avatar" width={36} height={36} className="rounded-circle object-fit-cover border border-2 border-danger" />
                  </button>

                  {showDropdown && (
                    <div className="position-absolute bg-dark border text-start shadow-lg p-2 mt-2 end-0 rounded-3 z-3" style={{ minWidth: '160px' }}>
                      <div className="px-3 py-1.5 fw-bold border-bottom text-truncate text-white" style={{ fontSize: '0.78rem' }}>{user.name}</div>
                      <Link href="/dashboard" className="dropdown-item py-1.5 px-3 small text-white d-block rounded-2 mt-1" onClick={() => setShowDropdown(false)}>
                        Dashboard
                      </Link>
                      <button className="dropdown-item py-1.5 px-3 text-danger small w-100 border-0 bg-transparent text-start fw-semibold rounded-2" onClick={handleLogout}>
                        Logout
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

      {/* MOBILE DRAWER */}
      {showSidebar && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-3" onClick={() => setShowSidebar(false)} />
      )}
      <div 
        className="position-fixed top-0 start-0 h-100 bg-dark text-white p-4 d-flex flex-column z-3" 
        style={{ width: '280px', transition: 'transform 0.3s ease', transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
          <span className="fw-bold fs-5 text-gradient-purple">AWEBGROW</span>
          <button onClick={() => setShowSidebar(false)} className="btn-close btn-close-white" />
        </div>
        <div className="d-flex flex-column gap-3">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={() => setShowSidebar(false)} className="text-decoration-none fw-semibold text-light fs-6 py-1">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}