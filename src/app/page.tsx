import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Process from "@/components/Home/Process";
import OurProjects from "@/components/Home/OurProjects";
import PricingPackages from "@/components/Home/PricingPackages";
import ClientReviews from "@/components/Home/ClientReviews";
import CTA from "@/components/Home/CTA";
import FeatureCard from "@/components/Home/FeatureCard";
import CustomCursor from "./CustomCursor";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com';

// ✅ COMPLETE SCHEMA COLLECTION
const schemas = [
  // Organization Schema
  {
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
    "description": "Leading web development company in India specializing in custom websites, mobile apps, and enterprise software solutions.",
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
  },

  // ✅ LOCAL BUSINESS SCHEMA (Important for local SEO)
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AWebGrow",
    "image": `${BASE_URL}/images/logo.png`,
    "url": BASE_URL,
    "telephone": "+91-7267995307",
    "description": "Professional web development company in India offering website design, mobile app development, and digital marketing services.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  },

  // WebSite Schema
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": BASE_URL,
    "name": "AWebGrow",
    "description": "Professional web development company in India",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },

  // ✅ SERVICE SCHEMA
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development",
    "provider": {
      "@type": "Organization",
      "name": "AWebGrow"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "description": "Professional custom website development using modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "description": "Native and cross-platform mobile application development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "eCommerce Development",
            "description": "Full-featured eCommerce website development"
          }
        }
      ]
    }
  },

  // ✅ BREADCRUMB SCHEMA
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }]
  }
];

export default function Home() {
  return (
    <>
      {/* ✅ ALL SCHEMAS INJECTED */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas)
        }}
      />

      <CustomCursor>
        <Header />
        <main>
          <Hero />
          <WhyChooseUs />
          <FeatureCard />
          <OurProjects />
          <Process />
          <CTA />
          <PricingPackages />
          <ClientReviews />
        </main>
        <Footer />
      </CustomCursor>
    </>
  );
}