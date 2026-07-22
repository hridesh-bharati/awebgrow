// src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutClient from '@/components/About/AboutClient';

export const metadata: Metadata = {
  title: "About Us | AWebGrow - Web Development Company India",
  description: "Learn about AWebGrow - a leading web development company in India. Meet our team, our mission, and why 150+ clients trust us for website development, SEO, and mobile apps.",
  keywords: [
    "about AWebGrow",
    "web development company India",
    "AWebGrow team",
    "web developers India",
    "SEO company about us",
    "digital agency India team",
    "Hridesh Bharati",
    "Sushant Rai",
    "Sushil Kandu",
    "web development company Noida",
    "website developer Nichlaul"
  ],
  openGraph: {
    title: "About AWebGrow | Web Development Company India",
    description: "Meet the team behind AWebGrow - India's trusted web development and digital marketing agency.",
    url: "https://www.awebgrow.com/about",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWebGrow Team - Web Development Company India"
      }
    ]
  },
  alternates: {
    canonical: "https://www.awebgrow.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}