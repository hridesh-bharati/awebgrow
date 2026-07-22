import React from 'react';
import type { Metadata } from 'next';
import PortfolioCard from '@/components/Home/PortfolioCard';

// ✅ Page-specific SEO Metadata
export const metadata: Metadata = {
  title: "Our Portfolio | Web Development Projects | AWebGrow",
  description: "Explore AWebGrow's portfolio of web development, mobile app, SEO, and digital marketing projects. See our best work for clients across India, Noida, and Nichlaul.",
  keywords: [
    "web development portfolio",
    "website projects India",
    "AWebGrow portfolio",
    "web design portfolio",
    "app development projects",
    "SEO case studies",
    "digital marketing portfolio",
    "web development company portfolio Noida",
    "website developer portfolio Nichlaul"
  ],
  openGraph: {
    title: "Our Portfolio | Web Development Projects | AWebGrow",
    description: "Explore AWebGrow's best web development, mobile app, and digital marketing projects.",
    url: "https://awebgrowhb.com/portfolio",
    type: "website",
  },
  alternates: {
    canonical: "https://awebgrowhb.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* ✅ Hidden H1 for SEO (H1 already in Hero/Portfolio component) */}
      <h1 className="visually-hidden">
        AWebGrow Portfolio - Web Development & Digital Marketing Projects
      </h1>
      
      <main aria-label="Portfolio page">
        <PortfolioCard />
      </main>
    </>
  );
}