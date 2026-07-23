// src/app/services/page.jsx
import Services from "@/components/Home/Services";
import Header from "@/components/Header/Header";
import { seoKeywords } from "@/app/data/seo-keywords"; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com/';

export const metadata = {
  title: "Next-Gen Web & App Development Services | AWebGrow",
  description: "Accelerate your digital growth with professional full-stack web development, mobile apps, and scalable digital ecosystems tailored for modern businesses.",
  
  // ✅ Yahan humne saare keywords ya specific categories ko combine karke array bana diya hai
  keywords: [
    ...seoKeywords.brandKeywords,
    ...seoKeywords.websiteDevelopment,
    ...seoKeywords.seoServices,
    ...seoKeywords.mobileAppDevelopment,
    ...seoKeywords.uiUxDesign,
    ...seoKeywords.digitalMarketing,
    ...seoKeywords.ecommerce,
    ...seoKeywords.technologyStack,
    ...seoKeywords.hireDevelopers,
    ...seoKeywords.businessEnterprise
  ],

  openGraph: {
    title: "Next-Gen Web & App Development Services | AWebGrow",
    description: "From custom web applications to scalable digital ecosystems, explore professional pricing plans and modern tech solutions.",
    url: `${siteUrl}/services`, 
    siteName: "AWebGrow",
    images: [
      {
        url: `${siteUrl}/images/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "AWebGrow Next-Gen Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next-Gen Web & App Development Services | AWebGrow",
    description: "Scale your digital footprint with modern tech ecosystem and flexible service packages.",
    images: [`${siteUrl}/images/logo.jpg`],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Services />
      </main>
    </>
  );
}