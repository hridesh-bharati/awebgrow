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
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.round(progress));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUser(data.user);
            return;
          }
        }
        setUser(null);
      } catch (error) {
        console.error("Session sync failure:", error);
        setUser(null);
      }
    };
    checkAuthStatus();
  }, [pathname]);

  useEffect(() => {
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
  }, []);

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
    }
  };

  const handleSuggestionClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const tabs = [
    { path: '/', label: 'Home', icon: 'bi-house', activeIcon: 'bi-house-fill' },
    { path: '/services', label: 'Services', icon: 'bi-grid', activeIcon: 'bi-grid-fill' },
    { path: '/team', label: 'Team', icon: 'bi-people', activeIcon: 'bi-people-fill' },
    { path: '/faq', label: 'FAQ', icon: 'bi-patch-question', activeIcon: 'bi-patch-question-fill' },
    { path: '/contact', label: 'Contact', icon: 'bi-chat-square-text', activeIcon: 'bi-chat-square-text-fill' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className="fixed-top p-0 transition-all"
        style={{
          zIndex: 1050,
          backgroundColor: '#0a2240',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          '--hover-bg': 'rgba(255, 255, 255, 0.08)'
        } as React.CSSProperties}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between py-2 px-3 px-md-4">

          {/* Left Corner Branding */}
          <div className="d-flex align-items-center flex-shrink-0">
            <Link href="/" className="text-decoration-none" aria-label="WebGrow Home">
              <Image
                src="/images/logo.png"
                alt="WebGrow Logo"
                width={90}
                height={50}
                className="object-fit-cover"
              />
            </Link>
          </div>

          {/* Mobile Center Search Box */}
          <div className="d-flex d-md-none align-items-center flex-grow-1 mx-2 position-relative" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="w-100 m-0">
              <div className="position-relative">
                <input
                  type="text"
                  className="w-100 text-dark py-2 px-1"
                  style={{
                    backgroundColor: '#f0f2f5',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  aria-label="Search mobile"
                />
                <button type="submit" className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent pe-3 text-muted">
                  <i className="bi bi-search" style={{ fontSize: '0.85rem' }}></i>
                </button>
              </div>
            </form>

            {/* Mobile Suggestions Panel */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div
                className="position-absolute start-0 py-2 mt-2 text-start shadow-lg"
                style={{
                  backgroundColor: '#ffffff',
                  zIndex: 1100,
                  borderRadius: '12px',
                  width: '100%',
                  top: '100%',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                {filteredSuggestions.map((item, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-dark small"
                    style={{ cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    onClick={() => handleSuggestionClick(item.path)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center Area: Navlinks (Desktop Only) */}
          <nav className="d-none d-lg-flex align-items-center mx-auto" aria-label="Primary Site Navigation">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  href={tab.path}
                  className="text-decoration-none d-flex align-items-center px-3 py-2 transition-all"
                  style={{
                    color: isActive ? '#ffbc00' : '#ffffff',
                    backgroundColor: isActive ? 'var(--hover-bg)' : 'transparent',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Control Segment */}
          <div className="d-flex align-items-center flex-shrink-0">

            {/* Embedded Desktop Search Input */}
            <div className="search-wrapper d-none d-md-flex align-items-center position-relative" ref={searchRef} style={{ width: '240px' }}>
              <form onSubmit={handleSearchSubmit} className="w-100 m-0">
                <div className="position-relative">
                  <input
                    type="text"
                    className="w-100 py-1.5 ps-3 pe-4 text-white"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', // background standard level opacity fixed
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '18px',
                      fontSize: '0.8rem',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      setIsSearchFocused(true);
                      e.currentTarget.style.borderColor = '#ffbc00';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    placeholder="Search platforms, tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search"
                  />
                  <button type="submit" className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent text-white-50 pe-3">
                    <i className="bi bi-search" style={{ fontSize: '0.75rem' }}></i>
                  </button>
                </div>
              </form>

              {/* Desktop Suggestions Panel - Added left-0 to avoid stretching over profile right-side click zone */}
              {isSearchFocused && filteredSuggestions.length > 0 && (
                <div
                  className="position-absolute start-0 py-1 mt-2 text-start shadow-lg"
                  style={{
                    backgroundColor: '#ffffff',
                    zIndex: 1100,
                    borderRadius: '12px',
                    width: '280px',
                    top: '100%',
                    border: '1px solid rgba(0,0,0,0.08)'
                  }}
                >
                  {filteredSuggestions.map((item, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 text-dark small"
                      style={{ cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                      onClick={() => handleSuggestionClick(item.path)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Profile / Login Block */}
            <div ref={dropdownRef} className="d-flex align-items-center ms-2 position-relative" style={{ zIndex: 1200 }}>
              {user ? (
                <div className="position-relative d-flex align-items-center justify-content-center">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="btn p-0 border-0 d-flex align-items-center justify-content-center overflow-hidden position-relative"
                  >
                    <div className="bg-white rounded-circle" >
                      <Image
                        src={user.profileImage}
                        alt="User profile"
                        width={32}
                        height={32}
                        className="rounded-circle object-fit-cover border border-2 border-white"
                      />
                    </div>
                  </button>

                  {showDropdown && (
                    <div
                      className="position-absolute end-0 z-3 py-1 text-start shadow-lg"
                      style={{
                        backgroundColor: '#ffffff',
                        minWidth: '180px',
                        borderRadius: '12px',
                        top: 'calc(100% + 10px)',
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <div className="px-3 py-2 text-dark fw-bold border-bottom text-truncate" style={{ fontSize: '0.85rem' }}>
                        {user.name}
                      </div>
                      <Link
                        href="/dashboard"
                        className="dropdown-item py-2 px-3 text-dark small d-block text-decoration-none"
                        onClick={() => setShowDropdown(false)}
                        style={{ fontSize: '0.85rem' }}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="dropdown-item py-2 px-3 text-danger small d-block w-100 border-0 bg-transparent text-start fw-semibold"
                        onClick={handleLogout}
                        style={{ fontSize: '0.85rem' }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="btn d-inline-flex align-items-center justify-content-center px-3 py-1 fw-semibold text-decoration-none"
                  style={{
                    backgroundColor: '#0095f6',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    height: '32px',
                    position: 'relative',
                    zIndex: 1210, // Kahi se bhi search overlay handles isse block na karein
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1877f2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0095f6')}
                >
                  <span>Log In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic 3px Custom Border Indicator */}
        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{
            height: '3px',
            backgroundColor: 'transparent',
            overflow: 'hidden'
          }}>
          <div
            style={{
              height: '100%',
              width: `${scrollProgress}%`,
              backgroundColor: '#e2d300',
              transition: 'width 0.1s ease-out'
            }}
          />
        </div>
      </header>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="position-fixed end-0 m-3 d-flex flex-column align-items-center justify-content-center shadow border-0 btn-scroll-top"
        style={{
          bottom: '56px',
          zIndex: 1040,
          backgroundColor: 'rgba(0, 54, 105, 0.95)',
          color: '#ffbc00',
          outline: '2px solid #e9e9e9',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          fontSize: '0.7rem',
          fontWeight: 'bolder',
          cursor: 'pointer',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s ease',
        }}
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <i className="bi bi-arrow-up" style={{ fontSize: '0.85rem', marginBottom: '-2px', color: '#ffbc00' }}></i>
        <span>{Number(scrollProgress).toFixed(0)}%</span>
      </button>

      {/* Mobile Sticky Footer Support Navigation */}
      <nav
        className="fixed-bottom d-block d-lg-none"
        style={{
          backgroundColor: '#0a2240',
          zIndex: 1050,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          height: '60px'
        }}
        aria-label="Mobile Navigation Dashboard"
      >
        <div className="d-flex align-items-center justify-content-around h-100 py-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className="text-decoration-none d-flex flex-column align-items-center justify-content-center"
                style={{ width: '60px', height: '44px' }}
              >
                <i
                  className={`bi ${isActive ? tab.activeIcon : tab.icon}`}
                  style={{
                    fontSize: '1.2rem',
                    color: isActive ? '#ffbc00' : '#ffffff'
                  }}
                ></i>
                <span style={{
                  fontSize: '0.65rem',
                  color: isActive ? '#ffbc00' : '#a1a1aa',
                  fontWeight: 600,
                  marginTop: '1px'
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