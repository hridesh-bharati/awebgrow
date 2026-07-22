import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "./globale.css";
import "./theme.css";
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

const FALLBACK_URL = 'https://www.awebgrow.com';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL;

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Web Development Company India | Website & App Development Services | AWebGrow",
    template: "%s | AWebGrow"
  },

  description: "AWebGrow is a leading web development company in India offering custom website development, eCommerce solutions, mobile app development, UI/UX design, SEO services, digital marketing, and enterprise software development. Hire expert Next.js, React & MERN stack developers.",

  keywords: allKeywords,

  // ✅ Multiple Authors with variations
  authors: [
    { name: "Hridesh Bharati", url: "https://github.com/hrideshbharati" },
    { name: "Hridesh" },
    { name: "Hridesh Nichlaul" },
    { name: "Hrideh Bharati" },
    { name: "Sushant Rai" },
    { name: "Sushant" },
    { name: "Sushant Noida" },
    { name: "Sushant Delhi" },
    { name: "Sushil Kandu" },
    { name: "Sushil" },
  ],
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

// ✅ Organization Schema with Noida + Nichlaul locations
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
  "description": "Leading web development company in India offering website, app development, UI/UX design, SEO and digital marketing services. Serving clients in Noida, Nichlaul, and across India.",

  // ✅ Founders
  "founder": [
    {
      "@type": "Person",
      "name": "Hridesh Bharati",
      "url": "https://github.com/hrideshbharati"
    },
    {
      "@type": "Person",
      "name": "Hridesh"
    },
    {
      "@type": "Person",
      "name": "Hrideh Bharati"
    },
    {
      "@type": "Person",
      "name": "Sushant Rai"
    },
    {
      "@type": "Person",
      "name": "Sushil Kandu"
    }
  ],

  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7267995307",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },

  // ✅ Multiple Locations
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "addressLocality": "Nichlaul",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    }
  ],

  // ✅ Service Areas
  "areaServed": [
    {
      "@type": "City",
      "name": "Noida"
    },
    {
      "@type": "City",
      "name": "Nichlaul"
    },
    {
      "@type": "Country",
      "name": "India"
    }
  ]
};

// ✅ LocalBusiness Schema for Noida
const localBusinessSchemaNoida = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AWebGrow - Web Development Company in Noida",
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/logo.png`,
  "description": "AWebGrow is a top web development company in Noida offering website development, mobile app development, SEO services, and digital marketing.",
  "telephone": "+91-7267995307",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Noida",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://github.com/hrideshbharati",
    "https://linkedin.com/company/AWebGrow",
    "https://twitter.com/AWebGrow"
  ]
};

// ✅ LocalBusiness Schema for Nichlaul
const localBusinessSchemaNichlaul = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AWebGrow - Web Development Company in Nichlaul",
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/logo.png`,
  "description": "AWebGrow is a trusted web development company in Nichlaul offering custom website design, app development, SEO, and digital marketing solutions.",
  "telephone": "+91-7267995307",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nichlaul",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://github.com/hrideshbharati",
    "https://linkedin.com/company/AWebGrow",
    "https://twitter.com/AWebGrow"
  ]
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

        {/* ✅ All 3 Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              localBusinessSchemaNoida,
              localBusinessSchemaNichlaul
            ])
          }}
        />

        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
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