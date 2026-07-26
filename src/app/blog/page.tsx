// src/app/blog/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/posts';
import BlogClient from './BlogClient';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: "Web Development Blog | AWebGrow - Latest Trends & Tips",
  description: "Read AWebGrow's blog for the latest insights on web development, SEO, mobile apps, and digital marketing. Expert tips from India's leading web agency.",
  keywords: "web development blog, seo tips india, web design trends 2026, app development guide, digital marketing blog, awebgrow",
  
  openGraph: {
    title: "Web Development Blog | AWebGrow",
    description: "Expert insights on web dev, SEO, and digital growth.",
    url: "https://www.awebgrow.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.awebgrow.com/images/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AWebGrow Blog"
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: "Web Development Blog | AWebGrow",
    description: "Expert insights on web dev, SEO, and digital growth.",
    images: ["https://www.awebgrow.com/images/blog-og-image.jpg"],
  },
  
  alternates: {
    canonical: "https://www.awebgrow.com/blog",
  },
  
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <>
    <Header />
    <BlogClient posts={posts} categories={categories} />;
    </>
  )
  
}