// src/app/services/[serviceSlug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import { servicesCategorySeo } from '@/app/data/seo-mapping';

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const seoConfig = servicesCategorySeo[serviceSlug];

  if (!seoConfig) {
    const formattedTitle = serviceSlug.replace(/-/g, ' ');
    return {
      title: `${formattedTitle} | AWebGrow Services`,
      description: `Professional ${formattedTitle} services by AWebGrow.`,
    };
  }

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      title: seoConfig.title,
      description: seoConfig.description,
      url: `${siteUrl}/services/${serviceSlug}`,
      siteName: 'AWebGrow',
    },
    alternates: {
      canonical: `${siteUrl}/services/${serviceSlug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const seoConfig = servicesCategorySeo[serviceSlug];

  if (!seoConfig) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container py-5 text-theme-primary min-vh-100 mt-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link href="/services" className="text-decoration-none">Services</Link></li>
            <li className="breadcrumb-item active text-capitalize" aria-current="page">{serviceSlug.replace(/-/g, ' ')}</li>
          </ol>
        </nav>

        <h1 className="display-4 fw-bold mb-3">{seoConfig.title}</h1>
        <p className="lead text-theme-secondary mb-4">{seoConfig.description}</p>
        <Link href="/contact" className="btn-neon-cta px-4 py-3">
          <span>Get Started with {serviceSlug.replace(/-/g, ' ')}</span>
        </Link>
      </main>
    </>
  );
}