import OurTeam from "@/components/Team/OurTeam";  

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awebgrow.com';

export const metadata = {
  title: "Meet Our Expert Team | WebGrow",
  description: "Get to know the innovative minds, developers, and creators behind WebGrow delivering next-gen full-stack tech solutions.",
  keywords: [
    "WebGrow Team",
    "WebGrow Developers",
    "Expert Web Developers",
    "Full-Stack Engineering Team",
    "Tech Leaders",
    "WebGrow Experts"
  ],
  openGraph: {
    title: "Meet Our Expert Team | WebGrow",
    description: "Get to know the innovative minds, developers, and creators behind WebGrow delivering next-gen full-stack tech solutions.",
    url: `${siteUrl}/team`,
    siteName: "WebGrow",
    images: [
      {
        url: `${siteUrl}/images/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "WebGrow Tech Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Expert Team | WebGrow",
    description: "Discover the professional developers and digital creators pushing the limits of modern web tech at WebGrow.",
    images: [`${siteUrl}/images/logo.jpg`],
  },
};

export default function TeamPage() {
  return (
    <main className="bg-theme-main text-theme-primary overflow-hidden min-vh-100">
      <OurTeam />
    </main>
  );
}