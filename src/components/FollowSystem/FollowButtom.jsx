// src/components/FollowButton.jsx
"use client";

import { useEffect, useState } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, onValue, runTransaction } from "firebase/database";

export default function FollowButton({ currentUserId }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen to total followers count
    const countRef = ref(rtdb, "followers/count");
    const unsubscribeCount = onValue(countRef, (snapshot) => {
      setFollowersCount(snapshot.val() || 0);
    });

    // 2. Listen if current user is following
    let unsubscribeUser = () => {};
    if (currentUserId) {
      const userFollowRef = ref(rtdb, `followers/list/${currentUserId}`);
      unsubscribeUser = onValue(userFollowRef, (snapshot) => {
        setIsFollowing(snapshot.exists() && snapshot.val() === true);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => {
      unsubscribeCount();
      unsubscribeUser();
    };
  }, [currentUserId]);

  const handleToggleFollow = async () => {
    if (!currentUserId) {
      alert("Please log in to follow!");
      return;
    }

    setLoading(true);

    const userFollowRef = ref(rtdb, `followers/list/${currentUserId}`);
    const countRef = ref(rtdb, "followers/count");

    try {
      if (isFollowing) {
        // Unfollow action
        await runTransaction(userFollowRef, () => null);
        await runTransaction(countRef, (current) => (current || 1) - 1);
      } else {
        // Follow action
        await runTransaction(userFollowRef, () => true);
        await runTransaction(countRef, (current) => (current || 0) + 1);
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-inline-flex align-items-center gap-2">
      <button
        onClick={handleToggleFollow}
        disabled={loading}
        className={`btn rounded-pill px-4 btn-sm fw-bold ${
          isFollowing ? "btn-outline-danger" : "btn-neon-cta"
        }`}
      >
        <i
          className={`bi ${
            isFollowing ? "bi-person-x-fill" : "bi-person-plus-fill"
          } me-2`}
        ></i>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>

      <span className="badge bg-secondary bg-opacity-20 text-white border border-secondary border-opacity-20 rounded-pill px-3 py-2 small">
        <i className="bi bi-people-fill me-1 text-info"></i>
        {followersCount} Followers
      </span>
    </div>
  );
}