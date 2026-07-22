import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "./globale.css";
import { Toaster } from 'sonner';
import type { Viewport } from 'next';
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { allKeywords } from "@/app/data/seo-keywords";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: 'swap',
});

const FALLBACK_URL = 'https://awebgrowhb.com';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL;

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Web Development Company India | Website & App Development Services | AWebGrow",
    template: "%s | AWebGrow"
  },

  description: "AWebGrow is a leading web development company in India offering custom website development, eCommerce solutions, mobile app development, UI/UX design, SEO services, digital marketing, and enterprise software development. Hire expert Next.js, React & MERN stack developers.",

  // ✅ 500+ KEYWORDS FROM SEO DATABASE
  keywords: allKeywords,

  authors: [{ name: "Hridesh Bharati", url: "https://github.com/hrideshbharati" }],
  creator: "AWebGrow Team",
  publisher: "AWebGrow Digital Agency",

  manifest: "/manifest.json",

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
    google: "Zce3KX6aOJA6UHKpJVkl9JUMIFTLtLankJbNCvTT0Rw",
  },

  openGraph: {
    title: "Web Development Company India | Website & App Development | AWebGrow",
    description: "Transform your business with India's leading web development company. Custom websites, mobile apps, eCommerce solutions & digital marketing services.",
    url: BASE_URL,
    siteName: "AWebGrow",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWebGrow - Leading Web Development Company in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Web Development Company India | AWebGrow",
    description: "India's trusted web & app development agency. Custom solutions for startups & enterprises.",
    images: ["/images/twitter-image.jpg"],
    creator: "@AWebGrow",
  },

  alternates: {
    canonical: BASE_URL,
  },

  category: "technology",
};

export const viewport: Viewport = {
  themeColor: '#00378a',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AWebGrow",
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/logo.png`,
  "sameAs": [
    "https://github.com/hrideshbharati",
    "https://linkedin.com/company/AWebGrow",
    "https://twitter.com/AWebGrow"
  ],
  "description": "Leading web development company in India offering website, app development, UI/UX design, SEO and digital marketing services.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7267995307",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="google-site-verification" content="Zce3KX6aOJA6UHKpJVkl9JUMIFTLtLankJbNCvTT0Rw" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        {children}
        <PWAInstallPrompt />
        <Toaster position="top-center" richColors closeButton />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}