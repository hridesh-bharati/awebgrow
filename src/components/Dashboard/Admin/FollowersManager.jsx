// src/components/Dashboard/Admin/FollowersManager.jsx
"use client";

import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export default function FollowersManager() {
  const [followersCount, setFollowersCount] = useState(0);
  const [followersList, setFollowersList] = useState([]);

  useEffect(() => {
    const countRef = ref(rtdb, "followers/count");
    const listRef = ref(rtdb, "followers/list");

    const unsubCount = onValue(countRef, (snapshot) => {
      setFollowersCount(snapshot.val() || 0);
    });

    const unsubList = onValue(listRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFollowersList(Object.keys(data));
      } else {
        setFollowersList([]);
      }
    });

    return () => {
      unsubCount();
      unsubList();
    };
  }, []);

  return (
    <div className="custom-dashboard-card p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-black text-white m-0">
          <i className="bi bi-people-fill me-2 text-primary"></i>
          Website Followers Data
        </h4>
        <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
          Total Followers: {followersCount}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User ID / Key</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {followersList.length > 0 ? (
              followersList.map((userId, index) => (
                <tr key={userId}>
                  <td>{index + 1}</td>
                  <td><code>{userId}</code></td>
                  <td>
                    <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-20">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-secondary py-4">
                  No followers recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}