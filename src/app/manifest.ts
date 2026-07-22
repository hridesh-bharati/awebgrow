import { MetadataRoute } from "next";
// src\app\manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com';
  
  return {
    name: "AWebGrow - Web Development Company India",
    short_name: "AWebGrow",
    description: "Leading web development company in India offering website, app development & digital marketing services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00378a",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-IN",
    categories: ["business", "development", "technology"],
    
    // ✅ PREFER RELATED APPLICATIONS (optional)
    prefer_related_applications: false,
    
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    
    // ✅ SCREENSHOTS for PWA install prompt
    screenshots: [
      {
        src: "/screenshots/mobile.png",
        sizes: "1080x2400",
        type: "image/png",
        form_factor: "narrow",
        label: "AWebGrow mobile experience",
      },
      {
        src: "/screenshots/desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "AWebGrow desktop experience",
      },
    ],
  };
}