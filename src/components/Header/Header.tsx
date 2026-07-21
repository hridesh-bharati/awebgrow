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
  const [showSidebar, setShowSidebar] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
      setShowSidebar(false);
    }
  };

  const handleSuggestionClick = (path: string) => {
    router.push(path);
    setSearchQuery('');
    setIsSearchFocused(false);
    setShowSidebar(false);
  };

  const tabs = [
    { path: '/', label: 'Home', hasArrow: false },
    { path: '/services', label: 'Services', hasArrow: true },
    { path: '/team', label: 'Team', hasArrow: true },
    { path: '/faq', label: 'FAQ', hasArrow: false },
    { path: '/contact', label: 'Contact', hasArrow: true },
  ];

  if (!mounted) {
    return <header style={{ height: '90px', backgroundColor: '#1d5ca3' }} className="fixed-top" />;
  }

  return (
    <>
      <header className="fixed-top p-0 w-100" style={{ backgroundColor: '#1d5ca3' }}>
        
        {/* TOP CONTACT & SOCIAL BAR (EMAIL REMOVED) */}
        <div 
          className="d-none d-md-flex align-items-center justify-content-between px-3 px-lg-4 text-white" 
          style={{ height: '36px', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="d-flex align-items-center gap-4">
            <span>
              <i className="bi bi-geo-alt-fill me-1 text-light"></i> Noida, India
            </span>
            <span>
              <i className="bi bi-chat-square-dots-fill me-1"></i> 24 Hour Service – 7 Days a Week
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="fw-semibold">Follow us:</span>
            <a href="#" className="text-white text-decoration-none"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-white text-decoration-none"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white text-decoration-none"><i className="bi bi-linkedin"></i></a>
            <a href="#" className="text-white text-decoration-none"><i className="bi bi-skype"></i></a>
          </div>
        </div>

        {/* MAIN NAVBAR CONTAINER */}
        <div className="d-flex align-items-stretch justify-content-between position-relative" style={{ height: '65px' }}>
          
          {/* BRAND LOGO */}
          <div className="d-flex align-items-center ps-3 ps-md-4 pe-3 z-2">
            <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
              <Image
                src="/icons/logo.png"
                alt="WebGrow Logo"
                width={45}
                height={45}
                className="object-fit-contain"
                priority
              />
              <span className="text-white fw-bold fs-4 tracking-tight">WebGrow</span>
            </Link>
          </div>

          {/* ANGLED WHITE SLANT & NAVIGATION CONTAINER */}
          <div 
            className="flex-grow-1 bg-white d-flex align-items-center justify-content-between px-3 px-lg-4 position-relative"
            style={{
              clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)',
              marginLeft: '-15px'
            }}
          >
            {/* NAVIGATION LINKS */}
            <nav className="d-none d-lg-flex align-items-center ms-5 gap-1" aria-label="Primary Site Navigation">
              {tabs.map((tab) => {
                const isActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.path}
                    href={tab.path}
                    className="text-decoration-none px-3 py-2 fw-bold transition-colors"
                    style={{
                      color: isActive ? '#1d5ca3' : '#2d3748',
                      fontSize: '0.9rem',
                    }}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE ACTION BUTTONS */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              
              {/* DESKTOP SEARCH */}
              <div className="search-wrapper d-none d-md-flex align-items-center position-relative" ref={searchRef} style={{ width: '170px' }}>
                <form onSubmit={handleSearchSubmit} className="w-100 m-0">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="w-100 py-1 ps-3 pe-4 text-dark"
                      style={{
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #cbd5e1',
                        borderRadius: '14px',
                        fontSize: '0.78rem',
                        outline: 'none',
                        height: '32px'
                      }}
                      onFocus={(e) => {
                        setIsSearchFocused(true);
                        e.currentTarget.style.borderColor = '#1d5ca3';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }}
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent text-secondary pe-2">
                      <i className="bi bi-search" style={{ fontSize: '0.72rem' }}></i>
                    </button>
                  </div>
                </form>

                {isSearchFocused && filteredSuggestions.length > 0 && (
                  <div
                    className="position-absolute start-0 py-1 mt-1 text-start shadow-lg z-3"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      width: '240px',
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

              {/* CALL CTA (UPDATED PHONE NUMBER) */}
              <div className="d-none d-xl-flex flex-column text-end pe-2">
                <span className="text-muted" style={{ fontSize: '0.68rem' }}>Need Help Now? Call Us!</span>
                <a href="tel:9304556165" className="fw-black text-decoration-none" style={{ color: '#ff3b30', fontSize: '0.95rem' }}>
                  <i className="bi bi-telephone-fill me-1"></i>9304556165
                </a>
              </div>

              {/* USER PROFILE OR SCHEDULE BUTTON */}
              <div ref={dropdownRef} className="position-relative" style={{ zIndex: 99999 }}>
                {user ? (
                  <>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <Image
                        src={user.profileImage || "/icons/logo.png"}
                        alt="User avatar"
                        width={36}
                        height={36}
                        className="rounded-circle object-fit-cover border border-2 border-primary"
                      />
                    </button>

                    {showDropdown && (
                      <div
                        className="position-fixed text-start shadow-lg"
                        style={{
                          backgroundColor: '#ffffff',
                          minWidth: '160px',
                          borderRadius: '8px',
                          top: '95px', 
                          right: '70px',
                          border: '1px solid rgba(0,0,0,0.08)',
                          zIndex: 99999
                        }}
                      >
                        <div className="px-3 py-2 text-dark fw-bold border-bottom text-truncate" style={{ fontSize: '0.78rem' }}>
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
                    href="/contact"
                    className="btn border-2 fw-bold text-decoration-none px-3 py-2 text-nowrap d-none d-sm-inline-block"
                    style={{
                      borderColor: '#1d5ca3',
                      color: '#1d5ca3',
                      fontSize: '0.85rem',
                      borderRadius: '0px'
                    }}
                  >
                    Schedule Online
                  </Link>
                )}
              </div>

            </div>
          </div>

          {/* LIGHT BLUE SIDEBAR TOGGLE BUTTON */}
          <button 
            onClick={() => setShowSidebar(true)}
            className="btn rounded-0 border-0 d-flex align-items-center justify-content-center px-3 px-md-4 text-white z-2"
            style={{ backgroundColor: '#4ba0e6' }}
            aria-label="Open Sidebar Menu"
          >
            <i className="bi bi-justify fs-1"></i>
          </button>

        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '2.5px', backgroundColor: 'transparent', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scrollProgress}%`, backgroundColor: '#ffbc00' }} />
        </div>
      </header>

      {/* ========================================================= */}
      {/* SIDEBAR OVERLAY & DRAWER */}
      {/* ========================================================= */}
      
      {/* OVERLAY BACKDROP */}
      {showSidebar && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <div 
        className={`position-fixed top-0 start-0 h-100 bg-white shadow-lg d-flex flex-column transition-all duration-300`}
        style={{
          width: '320px',
          maxWidth: '85vw',
          zIndex: 1050,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto'
        }}
      >
        {/* TOP HEADER OF SIDEBAR */}
        <div className="d-flex align-items-center justify-content-between position-relative border-bottom" style={{ height: '70px' }}>
          
          {/* LEFT SLANTED LOGO BACKGROUND */}
          <div 
            className="d-flex align-items-center px-3 h-100"
            style={{
              backgroundColor: '#1d5ca3',
              clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
              width: '180px'
            }}
          >
            <Link href="/" className="text-decoration-none d-flex align-items-center gap-2" onClick={() => setShowSidebar(false)}>
              <Image
                src="/icons/logo.png"
                alt="WebGrow Logo"
                width={36}
                height={36}
                className="object-fit-contain"
              />
              <span className="text-white fw-bold fs-5">WebGrow</span>
            </Link>
          </div>

          {/* TOP PHONE NUMBER & CLOSE BUTTON */}
          <div className="d-flex align-items-center gap-2 pe-0 h-100">
            <a href="tel:9304556165" className="fw-bold text-decoration-none" style={{ color: '#ff3b30', fontSize: '0.82rem' }}>
              <i className="bi bi-telephone-fill me-1"></i>9304556165
            </a>
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setShowSidebar(false)}
              className="btn rounded-0 border-0 h-100 text-white d-flex align-items-center justify-content-center px-3 ms-1"
              style={{ backgroundColor: '#4ba0e6' }}
              aria-label="Close Sidebar"
            >
              <i className="bi bi-x-lg fs-4"></i>
            </button>
          </div>
        </div>

        {/* NAV LINKS SECTION */}
        <div className="py-3 px-4 d-flex flex-column gap-3">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.path}
                href={tab.path}
                onClick={() => setShowSidebar(false)}
                className="text-decoration-none d-flex align-items-center justify-content-between fw-bold fs-6 py-1"
                style={{ color: isActive ? '#1d5ca3' : '#1d5ca3' }}
              >
                <span>{tab.label}</span>
                {tab.hasArrow && <i className="bi bi-chevron-right text-muted" style={{ fontSize: '0.8rem' }}></i>}
              </Link>
            );
          })}

          {/* SCHEDULE ONLINE BUTTON */}
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setShowSidebar(false)}
              className="btn border-2 fw-bold text-decoration-none w-100 py-2"
              style={{
                borderColor: '#1d5ca3',
                color: '#1d5ca3',
                fontSize: '0.9rem',
                borderRadius: '0px'
              }}
            >
              Schedule Online
            </Link>
          </div>
        </div>

        {/* OUR CONTACTS SECTION */}
        <div className="mt-auto px-4 pb-4 pt-3 border-top">
          <h6 className="fw-bold fs-5 text-primary mb-3" style={{ color: '#1d5ca3' }}>Our Contacts</h6>
          
          <div className="d-flex align-items-start gap-3 mb-3">
            <div 
              className="d-flex align-items-center justify-content-center text-white rounded-circle flex-shrink-0"
              style={{ width: '42px', height: '42px', backgroundColor: '#1d5ca3' }}
            >
              <i className="bi bi-geo-alt-fill fs-5"></i>
            </div>
            <div>
              <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>Head Office:</div>
              <div className="text-secondary" style={{ fontSize: '0.8rem' }}>
                Noida, Uttar Pradesh,<br />
                India
              </div>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3">
            <div 
              className="d-flex align-items-center justify-content-center text-white rounded-circle flex-shrink-0"
              style={{ width: '42px', height: '42px', backgroundColor: '#1d5ca3' }}
            >
              <i className="bi bi-telephone-fill fs-5"></i>
            </div>
            <div>
              <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>Phone Numbers:</div>
              <div className="text-secondary" style={{ fontSize: '0.8rem' }}>
                <a href="tel:9304556165" className="text-decoration-none text-secondary d-block">+91 9304556165</a>
                <a href="tel:7267995307" className="text-decoration-none text-secondary d-block">+91 7267995307</a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="position-fixed end-0 m-3 d-flex flex-column align-items-center justify-content-center shadow border-0 z-3"
        style={{
          bottom: '20px',
          backgroundColor: '#1d5ca3',
          color: '#ffffff',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          fontSize: '0.6rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.3s ease'
        }}
        title="Scroll to Top"
      >
        <i className="bi bi-arrow-up" style={{ fontSize: '0.75rem', marginBottom: '-1px' }}></i>
        <span>{scrollProgress}%</span>
      </button>
    </>
  );
}