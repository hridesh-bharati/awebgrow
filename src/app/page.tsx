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
// src\app\page.tsx
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webgrowhb.vercel.app';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AWebGrow",
  "url": BASE_URL, // Fixed domain mismatch here
  "logo": `${BASE_URL}/images/logo.png`, // Matches your actual structure
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
  "url": BASE_URL,
  "name": "AWebGrow",
  "description": "Next-Gen Web & App Development Agency",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <>
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