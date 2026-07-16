"use client";

import { useState, useEffect } from "react";
import { ref, remove } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { toast, Toaster } from "sonner"; 

const ADMIN_EMAILS = [
  "sushantkumar867695@gmail.com",
  "hridesh027@gmail.com",
  "kandusushil9@gmail.com"
];

export default function UserDirectory({ users = [] }) {
  const [search, setSearch] = useState("");
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const filtered = localUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (user) => {
    const userEmailClean = user.email?.toLowerCase();
    if (ADMIN_EMAILS.includes(userEmailClean)) {
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
    <div className="card border-0 shadow-sm rounded-3 bg-white">
      <Toaster position="top-right" richColors />

      <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h5 className="fw-bold m-0">User System Registry</h5>
          <span className="text-secondary small">Realtime Database User Management</span>
        </div>

        <input
          type="text"
          placeholder="Search user..."
          className="form-control border-secondary-subtle"
          style={{ maxWidth: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle m-0">
          <thead className="table-light text-secondary small">
            <tr>
              <th className="px-4">AVATAR</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>UID</th>
              <th>ROLE</th>
              <th className="text-end px-4">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => {
                const isAdmin = ADMIN_EMAILS.includes(u.email?.toLowerCase());

                return (
                  <tr key={u.uid || u.email}>
                    <td className="px-4">
                      <img
                        src={u.profileImage || "/images/default-avatar.jpg"}
                        alt="avatar"
                        className="rounded-circle border"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-medium text-dark">{u.name || "Anonymous User"}</td>
                    <td className="text-secondary">{u.email}</td>
                    <td>
                      <code className="bg-light border text-dark rounded px-2 py-1 small">{u.uid}</code>
                    </td>
                    <td>
                      <span className={`badge px-2 py-1.5 fw-normal rounded ${isAdmin ? "bg-danger-subtle text-danger border border-danger-subtle" : "bg-success-subtle text-success border border-success-subtle"}`}>
                        {isAdmin ? "System Admin" : "Active Client"}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      {!isAdmin && (
                        <button className="btn btn-sm btn-outline-danger px-3" onClick={() => handleDelete(u)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-secondary">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table th, .table td {
          padding: 14px 12px;
        }
      `}</style>
    </div>
  );
}