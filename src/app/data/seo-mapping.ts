// src/data/seo-mapping.ts
import { seoKeywords } from './seo-keywords';

export interface RouteSeoConfig {
  title: string;
  description: string;
  keywords: string[];
}

// 1. Static Routes (Main Pages) Mapping
export const staticRoutesSeo: Record<string, RouteSeoConfig> = {
  '/services': {
    title: 'Next-Gen Web & App Development Services | AWebGrow',
    description: 'Accelerate your digital growth with professional full-stack web development, mobile apps, and scalable digital ecosystems tailored for modern businesses.',
    keywords: [
      ...seoKeywords.brandKeywords.slice(0, 3),
      ...seoKeywords.websiteDevelopment.slice(0, 3),
      ...seoKeywords.seoServices.slice(0, 3),
      ...seoKeywords.mobileAppDevelopment.slice(0, 3),
      ...seoKeywords.uiUxDesign.slice(0, 2),
      ...seoKeywords.digitalMarketing.slice(0, 2),
    ],
  },
  '/about': {
    title: 'About AWebGrow | Leading Digital & Web Development Agency',
    description: 'Learn more about AWebGrow team, mission, and how we empower modern enterprises with high-performance digital ecosystems.',
    keywords: [
      ...seoKeywords.brandKeywords.slice(0, 5),
      ...seoKeywords.businessEnterprise.slice(0, 5),
      ...seoKeywords.hireDevelopers.slice(0, 5),
    ],
  },
};

// 2. Services Dynamic Sub-routes Mapping
export const servicesCategorySeo: Record<string, RouteSeoConfig> = {
  'enterprise-web-development': {
    title: 'Enterprise Web Development Services | AWebGrow',
    description: 'Custom React, Next.js, and MERN stack website development engineered for maximum scalability, speed, and security.',
    keywords: seoKeywords.websiteDevelopment.slice(0, 15),
  },
  'technical-seo-optimization': {
    title: 'Technical SEO & Search Ranking Services | AWebGrow',
    description: 'Dominate Google search results with Core Web Vitals optimizations, rich JSON-LD schemas, and organic traffic growth strategies.',
    keywords: seoKeywords.seoServices.slice(0, 15),
  },
  'mobile-ux-architecture': {
    title: 'Mobile App Development & UI/UX Architecture | AWebGrow',
    description: 'High-performance Android, iOS, Flutter, and React Native mobile applications built for seamless user experience.',
    keywords: seoKeywords.mobileAppDevelopment.slice(0, 15),
  },
  'ui-ux-design': {
    title: 'UI/UX & Modern Web Design Services | AWebGrow',
    description: 'Figma wireframing, responsive interface designs, and interactive brand identities designed to maximize customer conversion.',
    keywords: seoKeywords.uiUxDesign.slice(0, 15),
  },
  'digital-marketing': {
    title: 'Performance Digital Marketing & PPC Services | AWebGrow',
    description: 'Data-driven marketing campaigns, Google Ads management, social media optimization, and revenue scaling funnels.',
    keywords: seoKeywords.digitalMarketing.slice(0, 15),
  },
  'ecommerce-development': {
    title: 'E-commerce Website & Store Development | AWebGrow',
    description: 'High-converting custom e-commerce web stores, Shopify setups, WooCommerce integrations, and payment gateways.',
    keywords: seoKeywords.ecommerce.slice(0, 15),
  },
};

// 3. Location Pages Mapping (Noida, Nichlaul, UP)
export const locationRoutesSeo: Record<string, RouteSeoConfig> = {
  noida: {
    title: 'Best Website & App Development Company in Noida | AWebGrow',
    description: 'Top IT agency in Noida delivering custom website development, local SEO optimization, and enterprise software solutions.',
    keywords: [
      ...seoKeywords.websiteDevelopment.filter((k) => k.includes('noida')),
      ...seoKeywords.seoServices.filter((k) => k.includes('noida')),
      ...seoKeywords.mobileAppDevelopment.filter((k) => k.includes('noida')),
    ].slice(0, 15),
  },
  nichlaul: {
    title: 'Leading Web Development & Digital Agency in Nichlaul | AWebGrow',
    description: 'Reliable IT & digital solutions provider in Nichlaul. Custom websites, SEO ranking, and business growth services.',
    keywords: [
      ...seoKeywords.websiteDevelopment.filter((k) => k.includes('nichlaul')),
      ...seoKeywords.seoServices.filter((k) => k.includes('nichlaul')),
      ...seoKeywords.mobileAppDevelopment.filter((k) => k.includes('nichlaul')),
    ].slice(0, 15),
  },
  'uttar-pradesh': {
    title: 'Web Development & Software Agency in Uttar Pradesh | AWebGrow',
    description: 'Custom full-stack web development and software engineering services across Uttar Pradesh (UP).',
    keywords: seoKeywords.websiteDevelopment.filter((k) => k.includes('uttar pradesh') || k.includes('up')).slice(0, 15),
  },
};