"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const SEARCH_INDEX = [
  {
    label: "View Pricing & Packages (Budget, Website Cost)",
    path: "/#pricing",
    keywords: ["price", "cost", "pricing", "package", "rate", "budget", "paisa", "fees", "cheap", "plan", "recharge", "software cost"]
  },
  {
    label: "Our Portfolio & Live Projects (Eldurato, JIFSA)",
    path: "/#portfolio",
    keywords: ["project", "portfolio", "work", "example", "clients", "live site", "jifsa", "eldurato", "demo", "case study", "apps"]
  },
  {
    label: "Web & App Development Services (MERN, Next.js)",
    path: "/services",
    keywords: ["website", "app", "android", "ios", "design", "ui", "ux", "develop", "code", "software", "making", "banwana", "services"]
  },
  {
    label: "Contact Us (Hire Developers, Get a Quote)",
    path: "/contact",
    keywords: ["contact", "hire", "call", "phone", "email", "support", "meet", "office", "address", "whatsapp", "talk", "help desk"]
  },
  {
    label: "About Our Core Expert Team",
    path: "/team",
    keywords: ["team", "owner", "developer", "founder", "hridesh", "who we are", "expert", "staff", "bharti"]
  },
  {
    label: "Frequently Asked Questions & Help",
    path: "/faq",
    keywords: ["faq", "help", "question", "doubt", "time", "delivery", "security", "refund", "maintenance"]
  }
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearchRow, setShowMobileSearchRow] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.round(progress));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

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
        console.error("Session sync failure:", error);
        if (isCurrent) setUser(null);
      }
    };
    
    checkAuthStatus();
    return () => {
      isCurrent = false;
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
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)) {
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
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failure:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
      setShowMobileSearchRow(false);
    }
  };

  const handleSuggestionClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setIsSearchFocused(false);
    setShowMobileSearchRow(false);
  };

  const tabs = [
    { path: '/', label: 'Home', icon: 'bi-house', activeIcon: 'bi-house-fill' },
    { path: '/services', label: 'Services', icon: 'bi-grid', activeIcon: 'bi-grid-fill' },
    { path: '/team', label: 'Team', icon: 'bi-people', activeIcon: 'bi-people-fill' },
    { path: '/faq', label: 'FAQ', icon: 'bi-patch-question', activeIcon: 'bi-patch-question-fill' },
    { path: '/contact', label: 'Contact', icon: 'bi-chat-square-text', activeIcon: 'bi-chat-square-text-fill' },
  ];

  if (!mounted) {
    return <header style={{ height: '70px', backgroundColor: '#0a2240' }} className="fixed-top" />;
  }

  return (
    <>
      <header
        className="fixed-top p-0"
        style={{
          zIndex: 1050,
          backgroundColor: '#0a2240',
          boxShadow: isScrolled ? '0 4px 15px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-3 px-md-4" style={{ height: '70px' }}>

          {/* Branding Left - Bigger Logo */}
          <div className="d-flex align-items-center flex-shrink-0">
            <Link href="/" className="text-decoration-none d-flex align-items-center" aria-label="WebGrow Home">
              <Image
                src="/icons/logo.png"
                alt="WebGrow Logo"
                width={70} 
                height={58}
                className="object-fit-contain"
                priority
              />
            </Link>
          </div>

          {/* Mobile Center Text Banner */}
          <div className="d-block d-md-none text-center flex-grow-1 mx-2 text-truncate">
            <span className="text-white fw-semibold small">
              Next-Gen web services
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="d-none d-lg-flex align-items-center mx-auto" aria-label="Primary Site Navigation">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  href={tab.path}
                  className="text-decoration-none d-flex align-items-center px-3 py-2 mx-1"
                  style={{
                    color: isActive ? '#ffbc00' : '#ffffff',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="d-flex align-items-center flex-shrink-0 gap-3">

            {/* Desktop Inline Search */}
            <div className="search-wrapper d-none d-md-flex align-items-center position-relative" ref={searchRef} style={{ width: '210px' }}>
              <form onSubmit={handleSearchSubmit} className="w-100 m-0">
                <div className="position-relative">
                  <input
                    type="text"
                    className="w-100 py-1 ps-3 text-white"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '14px',
                      fontSize: '0.78rem',
                      outline: 'none',
                      height: '32px'
                    }}
                    onFocus={(e) => {
                      setIsSearchFocused(true);
                      e.currentTarget.style.borderColor = '#ffbc00';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    placeholder="Search platforms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search"
                  />
                  <button type="submit" className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent text-white-50 pe-2.5">
                    <i className="bi bi-search" style={{ fontSize: '0.72rem' }}></i>
                  </button>
                </div>
              </form>

              {isSearchFocused && filteredSuggestions.length > 0 && (
                <div
                  className="position-absolute start-0 py-1 mt-1 text-start shadow-lg"
                  style={{
                    backgroundColor: '#ffffff',
                    zIndex: 1100,
                    borderRadius: '8px',
                    width: '260px',
                    top: '100%',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  {filteredSuggestions.map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-1.5 text-dark small"
                      style={{ cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '0.78rem' }}
                      onClick={() => handleSuggestionClick(item.path)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search Trigger Icon */}
            <button
              onClick={() => setShowMobileSearchRow(!showMobileSearchRow)}
              className="btn p-1 border-0 d-inline-block d-md-none text-white-50"
              style={{ fontSize: '1.1rem' }}
              aria-label="Toggle Search"
            >
              <i className={showMobileSearchRow ? "bi bi-x-lg text-danger bg-white rounded-1" : "bi bi-search"}></i>
            </button>

            {/* Auth Dropdown Input Endpoint - Fixed Mobile Clickability */}
            <div ref={dropdownRef} className="position-relative" style={{ zIndex: 1300 }}>
              {user ? (
                <>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '34px', height: '34px', position: 'relative', zIndex: 1350 }}
                  >
                    <Image
                      src={user.profileImage || "/icons/logo.png"}
                      alt="User avatar"
                      width={34}
                      height={34}
                      className="rounded-circle object-fit-cover border border-1 border-light"
                    />
                  </button>

                  {showDropdown && (
                    <div
                      className="position-absolute end-0 z-3 py-1 text-start shadow-lg"
                      style={{
                        backgroundColor: '#ffffff',
                        minWidth: '160px',
                        borderRadius: '8px',
                        top: 'calc(100% + 8px)',
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <div className="px-3 py-1.5 text-dark fw-bold border-bottom text-truncate" style={{ fontSize: '0.78rem' }}>
                        {user.name}
                      </div>
                      <Link
                        href="/dashboard"
                        className="dropdown-item py-1.5 px-3 text-dark small d-block text-decoration-none"
                        onClick={() => setShowDropdown(false)}
                        style={{ fontSize: '0.78rem' }}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="dropdown-item py-1.5 px-3 text-danger small d-block w-100 border-0 bg-transparent text-start fw-semibold"
                        onClick={handleLogout}
                        style={{ fontSize: '0.78rem' }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="d-flex align-items-center justify-content-center text-white-50 rounded-circle text-decoration-none"
                  style={{ width: '34px', height: '34px', backgroundColor: 'rgba(255,255,255,0.12)', position: 'relative', zIndex: 1350 }}
                  aria-label="Login Panel"
                >
                  <i className="bi bi-person-circle" style={{ fontSize: '1.25rem' }}></i>
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Drop-down Drawer */}
        {showMobileSearchRow && (
          <div className="w-100 px-3 pb-2 bg-inherit d-block d-md-none" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="w-100 m-0">
              <div className="position-relative">
                <input
                  type="text"
                  className="w-100 text-dark py-1 px-3"
                  style={{
                    backgroundColor: '#f0f2f5',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    outline: 'none',
                    height: '32px'
                  }}
                  placeholder="Type parameters to scan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {isSearchFocused && filteredSuggestions.length > 0 && (
                  <div
                    className="position-absolute start-0 py-1 mt-1 text-start shadow-lg w-100"
                    style={{ backgroundColor: '#ffffff', zIndex: 1100, borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }}
                  >
                    {filteredSuggestions.map((item, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 text-dark small"
                        style={{ cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '0.78rem' }}
                        onClick={() => handleSuggestionClick(item.path)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Scroll Progress line */}
        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '2.5px', backgroundColor: 'transparent', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scrollProgress}%`, backgroundColor: '#e2d300' }} />
        </div>
      </header>

      {/* Back To Top Action Trigger */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="position-fixed end-0 m-3 d-flex flex-column align-items-center justify-content-center shadow border-0"
        style={{
          bottom: '58px',
          zIndex: 1040,
          backgroundColor: 'rgba(0, 54, 105, 0.9)',
          color: '#ffbc00',
          outline: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          fontSize: '0.6rem',
          fontWeight: 'bolder',
          cursor: 'pointer',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'scale(1)' : 'scale(0.8)',
        }}
        title="Scroll to Top"
      >
        <i className="bi bi-arrow-up" style={{ fontSize: '0.75rem', marginBottom: '-1px' }}></i>
        <span>{scrollProgress}%</span>
      </button>

      {/* Fixed Compact Bottom App Bar */}
      <nav
        className="fixed-bottom d-block d-lg-none"
        style={{
          backgroundColor: '#0a2240',
          zIndex: 1050,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          height: '48px'
        }}
      >
        <div className="d-flex align-items-center justify-content-around h-100 py-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className="text-decoration-none d-flex flex-column align-items-center justify-content-center"
                style={{ width: '50px', height: '38px' }}
              >
                <i
                  className={`bi ${isActive ? tab.activeIcon : tab.icon}`}
                  style={{
                    fontSize: '1.05rem',
                    color: isActive ? '#ffbc00' : '#ffffff'
                  }}
                ></i>
                <span style={{
                  fontSize: '0.6rem',
                  color: isActive ? '#ffbc00' : '#a1a1aa',
                  fontWeight: 600,
                }}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}