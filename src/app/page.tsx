// src/app/page.tsx
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Home/Hero";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Technologies from "@/components/Home/Technologies";
import Process from "@/components/Home/Process";
import OurProjects from "@/components/Home/OurProjects";
import PricingPackages from "@/components/Home/PricingPackages";
import ClientReviews from "@/components/Home/ClientReviews";
import Details from "@/components/Home/Details";
import CTA from "@/components/Home/CTA";
import FeatureCard from "@/components/Home/FeatureCard";
import CustomCursor from "./CustomCursor";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AWebGrow",
  "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://webgrowhs.vercel.app/',
  "logo": "/images/logo.jpg",
  "sameAs": [
    "https://github.com/hrideshbharati",
    "https://linkedin.com/company/AWebGrow",
    "https://twitter.com/AWebGrow"
  ],
  "description": "Professional agency for next-gen web and app development services.",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://AWebGrowhb.vercel.app',
  "name": "AWebGrow",
  "description": "Next-Gen Web & App Development Agency",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://AWebGrowhb.vercel.app'}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <>
      {/* ✅ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify([organizationSchema, websiteSchema]) 
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
          <Technologies />
          <Details />
          <ClientReviews />
        </main>
        <Footer />
      </CustomCursor>
    </>
  );
}