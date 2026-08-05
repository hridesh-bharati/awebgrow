import { Inter } from "next/font/google";
import Script from "next/script";
import type { Viewport } from "next";
import { Toaster } from "sonner";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";

import "./globale.css";
import "./rotating-border.css";
import "./theme.css";

import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import VisitorTracker from "@/components/VisitorTracker";
import { allKeywords } from "@/app/data/seo-keywords";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const FALLBACK_URL = "https://www.awebgrow.com";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Web Development Company India | Website & App Development Services | AWebGrow",
    template: "%s | AWebGrow",
  },
  description:
    "AWebGrow is a professional web development company in India providing website development, mobile app development, ecommerce solutions, UI UX design, SEO and digital marketing services.",
  keywords: allKeywords,
  authors: [{ name: "AWebGrow Team", url: BASE_URL }],
  creator: "AWebGrow Team",
  publisher: "AWebGrow Digital Agency",
  applicationName: "AWebGrow",
  generator: "Next.js",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
  verification: {
    google: "Zce3KX6aOJA6UHKpJVkl9JUMIFTLtLankJbNCvTT0Rw",
  },
  openGraph: {
    title: "Web Development Company India | AWebGrow",
    description: "Professional website development, app development, ecommerce and digital marketing services.",
    url: BASE_URL,
    siteName: "AWebGrow",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWebGrow Web Development Company",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWebGrow Web Development Company",
    description: "India's trusted web and app development agency.",
    images: ["/images/twitter-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#00378a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AWebGrow",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/images/awebgrow-logo-art-letter.png`,
  },
  "description":
    "AWebGrow is a web development company in India providing website development, mobile apps, ecommerce solutions, UI UX design, SEO and digital marketing services.",
  "founder": {
    "@type": "Person",
    "name": "Hridesh Bharati",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7267995307",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"],
  },
  "sameAs": [
    "https://github.com/hrideshbharati",
    "https://linkedin.com/company/AWebGrow",
    "https://twitter.com/AWebGrow",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AWebGrow - Web Development Company",
  "url": BASE_URL,
  "image": `${BASE_URL}/images/awebgrow-logo-art-letter.png`,
  "description":
    "AWebGrow provides professional website development, app development, SEO and digital marketing services in India.",
  "telephone": "+91-7267995307",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN",
  },
  "areaServed": {
    "@type": "Country",
    "name": "India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AWebGrow",
  "url": BASE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="Zce3KX6aOJA6UHKpJVkl9JUMIFTLtLankJbNCvTT0Rw"
        />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

        {/* Google AdSense - strategy="beforeInteractive" head ke andar valid hai */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2660059673395664"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
      </head>

      <body
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
        suppressHydrationWarning
      >
        <VisitorTracker />

        {children}

        <PWAInstallPrompt />

        <Toaster position="top-center" richColors closeButton />

        {/* Structured Data (Schema) */}
        <script
          id="jsonld-schema"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              localBusinessSchema,
              websiteSchema,
            ]),
          }}
        />

        {/* Bootstrap JS Bundle */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}