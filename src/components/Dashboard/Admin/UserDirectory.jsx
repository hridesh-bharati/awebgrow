"use client";

import { useState, useEffect } from "react";
import { ref, remove } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { toast, Toaster } from "sonner";

const ADMIN_EMAILS = new Set([
  "webgrow@gmail.com",
  "hridesh027@gmail.com",
  "kandusushil9@gmail.com"
]);

// Helper styles (DRY Principle)
const STYLES = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderColor: 'var(--border-subtle)',
    boxShadow: '0 10px 30px var(--shadow-color)'
  },
  pillInput: {
    maxWidth: "260px",
    backgroundColor: 'var(--bg-pill)',
    borderColor: 'var(--border-subtle)',
    color: 'var(--text-primary)'
  },
  headerRow: {
    borderColor: 'var(--border-subtle)',
    backgroundColor: 'var(--bg-pill)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em'
  }
};

export default function UserDirectory({ users = [] }) {
  const [search, setSearch] = useState("");
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const searchLower = search.toLowerCase();
  const filtered = localUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchLower) ||
      u.email?.toLowerCase().includes(searchLower)
  );

  const handleDelete = async (user) => {
    const userEmailClean = user.email?.toLowerCase();
    
    if (ADMIN_EMAILS.has(userEmailClean)) {
      toast.error("Admin account cannot be deleted.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${user.name || user.email}?`)) return;
    const toastId = toast.loading("Deleting user...");

    try {
      const userKey = userEmailClean.replace(/\./g, "_");
      await remove(ref(rtdb, `users/${userKey}`));
      setLocalUsers((prev) => prev.filter((u) => u.email !== user.email));
      toast.success("User deleted successfully.", { id: toastId });
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete user.", { id: toastId });
    }
  };

  return (
    <div className="rounded-4 border overflow-hidden text-theme-primary position-relative z-2" style={STYLES.card}>
      <Toaster position="top-right" richColors />

      {/* Header & Search Bar */}
      <div className="p-3 p-md-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <h5 className="fw-black m-0 text-theme-primary" style={{ fontWeight: 800 }}>User System Registry</h5>
          <span className="text-theme-secondary small" style={{ fontWeight: 500 }}>Realtime Database User Management</span>
        </div>

        <input
          type="text"
          placeholder="Search user..."
          className="form-control text-theme-primary border rounded-pill px-3 py-2 w-100 w-md-auto"
          style={STYLES.pillInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Responsive Container */}
      <div className="w-100 overflow-auto">
        <div style={{ minWidth: "100%" }}>

          {/* Table Header (Hidden on small screens) */}
          <div className="d-none d-md-flex align-items-center px-4 py-3 border-bottom text-theme-secondary fw-bold small" style={STYLES.headerRow}>
            <div style={{ width: '15%' }}>AVATAR</div>
            <div style={{ width: '30%' }}>NAME</div>
            <div style={{ width: '35%' }}>EMAIL</div>
            <div style={{ width: '12%' }}>ROLE</div>
            <div style={{ width: '8%' }} className="text-end">ACTION</div>
          </div>

          {/* Table Body / Mobile Cards */}
          {filtered.length > 0 ? (
            filtered.map((u, index) => {
              const isAdmin = ADMIN_EMAILS.has(u.email?.toLowerCase());

              return (
                <div
                  key={u.uid || u.email || index}
                  className="d-flex flex-column flex-md-row align-md-items-center px-3 px-md-4 py-3 border-bottom text-theme-primary gap-3 gap-md-0"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.88rem'
                  }}
                >
                  {/* Mobile Top Row / Desktop Columns */}
                  <div className="d-flex align-items-center justify-content-between w-100 d-md-contents">
                    
                    {/* Avatar & Name Group for Mobile */}
                    <div className="d-flex align-items-center gap-3 w-100 w-md-auto" style={{ width: '45%' }}>
                      <div style={{ minWidth: '38px' }}>
                        <img
                          src={u.profileImage || "/icons/default-avatar.png"}
                          alt="avatar"
                          className="rounded-circle border"
                          style={{ width: "38px", height: "38px", objectFit: "cover", borderColor: 'var(--border-subtle)' }}
                        />
                      </div>
                      <div className="d-flex flex-column text-truncate">
                        <div className="fw-bold text-theme-primary text-truncate">
                          {u.name || "Anonymous User"}
                        </div>
                        {/* Email displayed underneath on mobile screens */}
                        <div className="text-theme-secondary small text-truncate d-md-none">
                          {u.email || "No Email"}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Email Column */}
                    <div className="d-none d-md-block text-theme-secondary text-truncate pe-2" style={{ width: '35%' }}>
                      {u.email || "No Email"}
                    </div>

                    {/* Role & Action (Mobile Header Right / Desktop Separate Columns) */}
                    <div className="d-flex align-items-center justify-content-between justify-content-md-start w-100 w-md-auto mt-2 mt-md-0">
                      <div  className="d-md-block" style={{ width: '100%', maxWidth: '100px' }}>
                        <span
                          className={`badge px-2.5 py-1.5 fw-bold rounded-pill text-white ${
                            isAdmin ? "bg-danger bg-opacity-20" : "bg-success bg-opacity-20"
                          }`}
                          style={{ fontSize: '0.68rem' }}
                        >
                          {isAdmin ? "System Admin" : "Active Client"}
                        </span>
                      </div>

                      <div className="text-end" style={{ width: 'auto' }}>
                        {!isAdmin && (
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold"
                            style={{ fontSize: '0.72rem' }}
                            onClick={() => handleDelete(u)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-5 text-theme-secondary fw-medium">
              No users found in database registry.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}