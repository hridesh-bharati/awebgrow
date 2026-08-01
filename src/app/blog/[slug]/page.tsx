// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts';
import BlogPostClient from './BlogPostClient';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Generate static paths for SSG
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Enhanced Dynamic Metadata for Google & Social SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found | AWebGrow' };

  const baseUrl = 'https://www.awebgrow.com';
  const pageUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImageUrl = post.image && post.image.trim() !== '' ? post.image : `${baseUrl}/images/og-image.jpg`;

  return {
    title: `${post.title} | AWebGrow Blog`,
    description: post.excerpt,
    keywords: post.keywords || ['web development', 'nextjs', 'seo', 'awebgrow', 'blog'],
    
    // Open Graph (Facebook / LinkedIn)
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: ['Hridesh Bharati', 'AWebGrow Team'],
      tags: post.keywords || [],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      creator: '@awebgrow',
      site: '@awebgrow',
    },
    
    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },
    
    // Search Engine Crawling Rules
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}