"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UserDashboard({ session, onLogout }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div
      className="container py-4 position-relative overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#020205" }}
    >
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div
        className="position-absolute rounded-circle pointer-events-none glow-sphere-1"
        style={{
          width: "500px",
          height: "500px",
          top: "-10%",
          left: "-5%",
          zIndex: 0,
          background:
            "radial-gradient(circle, rgba(255, 0, 128, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="position-absolute rounded-circle pointer-events-none glow-sphere-2"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-10%",
          right: "-5%",
          zIndex: 0,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-dashboard-card {
          background-color: var(--bg-card, rgba(15, 16, 26, 0.85)) !important;
          border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08)) !important;
          border-radius: 24px !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
      `,
        }}
      />

      <div className="position-relative z-2">
        {/* Minimal Header */}
        <div className="row g-4 mb-4" data-aos="fade-up">
          <div className="col-12">
            <div className="custom-dashboard-card p-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                {/* User Profile Info */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="position-relative"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Image
                      src={session?.profileImage || "/icons/default-avatar.png"}
                      alt="Profile"
                      fill
                      className="rounded-circle object-fit-cover border border-2 border-purple shadow-sm"
                    />
                  </div>
                  <div>
                    <h1
                      className="h5 fw-black text-white m-0"
                      style={{ fontWeight: 800 }}
                    >
                      Welcome back, {session?.name || "User"}!
                    </h1>
                    <p
                      className="text-theme-secondary small m-0"
                      style={{ color: "#9ca3af" }}
                    >
                      {session?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="d-flex align-items-center gap-2">
                  <Link
                    href="/"
                    className="btn btn-outline-light rounded-pill px-3 btn-sm border"
                    style={{
                      backgroundColor: "var(--bg-pill)",
                      borderColor: "var(--border-subtle)",
                      color: "#fff",
                    }}
                  >
                    <i className="bi bi-house-door me-2"></i>Home
                  </Link>
                  <button
                    onClick={onLogout}
                    className="btn btn-danger btn-sm rounded-pill px-3 bg-opacity-20 border border-white border-opacity-20 text-white fw-bold"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Content */}
        <div className="row g-4" data-aos="fade-up" data-aos-delay="100">
          <div className="col-12">
            <div className="custom-dashboard-card p-4 text-theme-primary text-center py-5">
              <h3 className="h5 fw-bold text-white mb-2">User Dashboard</h3>
              <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                You are currently logged in. Your activity and updates will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}