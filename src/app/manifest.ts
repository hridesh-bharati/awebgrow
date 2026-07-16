import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebGrow Digital Agency",
    short_name: "AWebGrow",
    description: "Grow your business digitally with WebGrow",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00378a",
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
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile.png",
        sizes: "1080x2400", 
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/desktop.png",
        sizes: "1920x1080", 
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}