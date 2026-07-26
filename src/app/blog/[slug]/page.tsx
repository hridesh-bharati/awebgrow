// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts';
import BlogPostClient from './BlogPostClient';

// Generate static paths
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ Enhanced Metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  const baseUrl = 'https://www.awebgrow.com';
  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  
  return {
    title: `${post.title} | AWebGrow Blog`,
    description: post.excerpt,
    keywords: post.keywords || ['web development', 'awebgrow', 'blog'],
    
    // ✅ Open Graph for social sharing
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: ['AWebGrow Team'],
      tags: post.keywords || [],
      images: [
        {
          url: post.image || `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    
    // ✅ Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image || `${baseUrl}/images/og-image.jpg`],
      creator: '@awebgrow',
      site: '@awebgrow',
    },
    
    // ✅ Canonical URL
    alternates: {
      canonical: pageUrl,
    },
    
    // ✅ Robots
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
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const relatedPosts = getRelatedPosts(params.slug, 3);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}