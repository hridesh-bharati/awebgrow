"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
// import './Header.css'; // Apne custom css file se link rakhein

const SEARCH_INDEX = [
  { label: "View Pricing & Packages", path: "/#pricing", keywords: ["price", "cost", "pricing", "budget"] },
  { label: "Our Portfolio & Live Projects", path: "/#portfolio", keywords: ["project", "portfolio", "work", "apps"] },
  { label: "Web & App Development Services", path: "/services", keywords: ["website", "app", "ui", "ux", "services"] },
  { label: "Contact Us", path: "/contact", keywords: ["contact", "hire", "phone", "email"] },
  { label: "About Our Core Expert Team", path: "/team", keywords: ["team", "developer", "hridesh"] },
  { label: "FAQ & Help", path: "/faq", keywords: ["faq", "help"] }
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Sync User Auth State
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

  // Outside click listener for dropdown & search
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

  // Filter Search
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
    // { path: '/#portfolio', label: 'Portfolio' },
    { path: '/team', label: 'Team' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  if (!mounted) {
    return <header className="fixed-top w-100" style={{ height: '70px', backgroundColor: '#090a0f' }} />;
  }

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
                width: '38px',
                height: '38px'
              }}
            >
              <div className="bg-dark w-100 h-100 rounded-3 d-flex align-items-center justify-content-center">
                <Image
                  src="/icons/logo.png"
                  alt="AWEBGROW Logo"
                  width={22}
                  height={22}
                  className="object-fit-contain"
                  priority
                />
              </div>
            </div>
            <span className="brand-text fs-4 text-uppercase">AWEBGROW</span>
          </Link>

          {/* DESKTOP NAVIGATION (NAV CAPSULE) */}
          <nav className="d-none d-lg-flex align-items-center nav-capsule gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`nav-link-custom ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="d-flex align-items-center gap-3">
            
            {/* SEARCH BOX */}
            <div className="position-relative d-none d-md-block" ref={searchRef} style={{ width: '160px' }}>
              <div className="position-relative d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="form-control search-input-dark"
                />
                <i className="bi bi-search position-absolute end-0 pe-3 text-secondary" style={{ fontSize: '0.75rem' }}></i>
              </div>

              {/* SEARCH SUGGESTIONS */}
              {isSearchFocused && filteredSuggestions.length > 0 && (
                <div className="position-absolute search-suggestions-box p-2 mt-2 z-3">
                  {filteredSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        router.push(item.path);
                        setIsSearchFocused(false);
                      }}
                      className="suggestion-item"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* USER LOGIN / PROFILE SECTION */}
            <div ref={dropdownRef} className="position-relative">
              {user ? (
                <>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <Image
                      src={user.profileImage || "/icons/logo.png"}
                      alt="User Avatar"
                      width={38}
                      height={38}
                      className="rounded-circle object-fit-cover border border-2 border-primary"
                    />
                  </button>

                  {/* USER DROPDOWN */}
                  {showDropdown && (
                    <div
                      className="position-absolute text-start shadow-lg p-2 mt-2 end-0"
                      style={{
                        backgroundColor: '#12131c',
                        minWidth: '170px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        zIndex: 99999
                      }}
                    >
                      <div className="px-3 py-2 text-white fw-bold border-bottom border-secondary text-truncate" style={{ fontSize: '0.8rem' }}>
                        {user.name}
                      </div>
                      <Link
                        href="/dashboard"
                        className="dropdown-item py-2 px-3 text-white small d-block text-decoration-none rounded-2 mt-1"
                        onClick={() => setShowDropdown(false)}
                        style={{ fontSize: '0.8rem' }}
                      >
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                      </Link>
                      <button
                        className="dropdown-item py-2 px-3 text-danger small d-block w-100 border-0 bg-transparent text-start fw-semibold rounded-2"
                        onClick={handleLogout}
                        style={{ fontSize: '0.8rem' }}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* LOGIN BUTTON */
                <Link href="/login" className="btn-neon-cta">
                  <i className="bi bi-person-fill"></i>
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="btn p-0 border-0 text-white d-lg-none ms-1"
              aria-label="Toggle Navigation"
            >
              <i className={`bi ${showSidebar ? 'bi-x-lg' : 'bi-list'} fs-2`}></i>
            </button>

          </div>

        </div>
      </header>
    </>
  );
}