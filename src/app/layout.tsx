// src/app/layout.tsx
import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "./globale.css";

import AOSInit from "@/components/AOSInit";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: 'swap', // ✅ Performance boost
});

// ✅ Metadata moved here (single source of truth)
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://AWebGrowhb.vercel.app'),
  title: {
    default: "AWebGrow | Next-Gen Web & App Development Agency",
    template: "%s | AWebGrow"
  },
  description:
    "AWebGrow builds high-performance custom web applications, mobile apps, and scalable digital tech ecosystems. Explore our flexible software solution packages.",
  keywords: [
    "AWebGrow", "AWebGrow India", "Next-Gen Web Applications",
    "Full-Stack Software Development", "Mobile App Development Agency",
    "UI/UX Design Services", "Affordable Website Packages",
    "MERN Stack Developers", "Next.js Development Agency",
    "Hridesh Bharati", "Web Development Agency India"
  ],
  authors: [{ name: "Hridesh Bharati", url: "https://github.com/hrideshbharati" }],
  creator: "AWebGrow Team",
  publisher: "AWebGrow Digital Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "gma_OXLu0vgVhM9yr9T2fn7qO1yM2nzeiQpDAIahuBs",
  },
  openGraph: {
    title: "AWebGrow | Next-Gen Web & App Development Agency",
    description:
      "Transform your business with high-performance custom websites, Android/iOS apps, and enterprise-grade tech stacks.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://AWebGrowhb.vercel.app',
    siteName: "AWebGrow",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWebGrow Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWebGrow | Next-Gen Web & App Development Agency",
    description:
      "Accelerate your digital transformation with AWebGrow's professional developers.",
    images: ["/images/twitter-image.jpg"],
    creator: "@AWebGrow",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://AWebGrowhb.vercel.app',
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        <AOSInit />
        {children}
        <Toaster position="top-center" richColors closeButton />
        
        {/* ✅ Bootstrap - Optimized loading */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" 
          strategy="afterInteractive"
          integrity="sha384-cY1w2S5s6C6zgC9Ew7hPHCoj9J/4e7KuC/3EZfLZP2VpzQj7eB8vUqT5w0nFDR1"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}