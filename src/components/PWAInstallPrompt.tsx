"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Native browser banner ko prevent karein
      e.preventDefault();
      // Event ko state me store karein taaki baad me use ho sake
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Agar app already installed hai toh prompt chhipayein
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Browser ka install prompt trigger karein
    deferredPrompt.prompt();

    // User ka choice wait karein
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Prompt clear karein
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div 
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 bg-white rounded-4 shadow-lg border border-light animate__animated animate__slideInUp" 
      style={{ 
        zIndex: 1050, 
        width: "90%", 
        maxWidth: "400px",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)"
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {/* WebGrow App Icon Wrapper */}
          <div 
            className="d-flex align-items-center justify-content-center bg-primary text-white rounded-3" 
            style={{ width: "48px", height: "48px", minWidth: "48px" }}
          >
            <i className="bi bi-layers-half fs-4"></i>
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-dark">WebGrow App</h6>
            <small className="text-primary d-block" style={{ fontSize: "12px" }}>
              Better experience & faster access
            </small>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <button 
            onClick={() => setShowPrompt(false)} 
            className="btn btn-danger btn-sm rounded-circle px-2 py-1 text-muted"
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
          <button 
            onClick={handleInstallClick} 
            className="btn btn-primary btn-sm fw-semibold px-3 rounded-pill"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}