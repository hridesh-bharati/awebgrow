"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user recently dismissed the prompt (Dismiss for 24 hours)
    const isDismissed = localStorage.getItem("pwa_prompt_dismissed");
    if (isDismissed) {
      const dismissedTime = parseInt(isDismissed, 10);
      const currentTime = Date.now();
      if (currentTime - dismissedTime < 24 * 60 * 60 * 1000) {
        return; // Don't show if dismissed within last 24 hours
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => {
        setShowPrompt(true);
      }, 2500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Hide prompt if app is already running in standalone mode (PWA installed)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the PWA install prompt");
    } else {
      console.log("User dismissed the PWA install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa_prompt_dismissed", Date.now().toString());
  };

  if (!mounted || !showPrompt) return null;

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-3 mb-md-4 p-3 rounded-4 shadow-lg border animate__animated animate__slideInUp"
      style={{
        zIndex: 1050,
        width: "92%",
        maxWidth: "420px",
        backgroundColor: "rgba(18, 19, 28, 0.95)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.6)",
      }}
    >
      <div className="d-flex align-items-center justify-content-between gap-2">
        
        {/* App Info Left */}
        <div className="d-flex align-items-center gap-3 overflow-hidden">
          <div
            className="d-flex align-items-center justify-content-center bg-white rounded-3 overflow-hidden flex-shrink-0"
            style={{
              width: "46px",
              height: "46px",
              boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
            }}
          >
            <Image
              src="/icons/apple-touch-icon.png"
              alt="AWebGrow App"
              width={46}
              height={46}
              className="object-fit-cover"
              onError={(e) => {
                // Fallback to Icon if image fails
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="text-truncate">
            <h6 className="mb-0 fw-bold text-white fs-6 text-truncate">AWebGrow App</h6>
            <small className="text-secondary d-block text-truncate" style={{ fontSize: "11px" }}>
              Faster access & smooth app experience
            </small>
          </div>
        </div>

        {/* Action Buttons Right */}
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDismiss}
            className="btn p-0 border-0 text-secondary d-flex align-items-center justify-content-center"
            style={{ width: "28px", height: "28px" }}
            aria-label="Close"
          >
            <i className="bi bi-x-lg fs-6"></i>
          </button>

          <button
            onClick={handleInstallClick}
            className="btn-neon-cta py-1 px-3"
            style={{ fontSize: "0.8rem" }}
          >
            Install
          </button>
        </div>

      </div>
    </div>
  );
}