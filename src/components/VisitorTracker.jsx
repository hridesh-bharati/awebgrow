"use client";

import { useEffect } from "react";
import { rtdb } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

export default function VisitorTracker() {
  useEffect(() => {
    try {
      // Firebase par live visitors node reference
      const visitorRef = ref(rtdb, 'analytics/live_visitors');
      const newVisitorRef = push(visitorRef);
      
      // Current visitor session log karein
      set(newVisitorRef, {
        ip: "Visitor_" + Math.floor(Math.random() * 8999 + 1000),
        page: window.location.pathname,
        userAgent: navigator.userAgent.includes("Mobile") ? "Mobile Device" : "Desktop Browser",
        timestamp: Date.now()
      });
    } catch (e) {
      console.error("Visitor tracking error:", e);
    }
  }, []);

  return null;
}