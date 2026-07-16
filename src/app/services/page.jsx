import Services from "@/components/Home/Services";
import Header from "@/components/Header/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webgrowhs.vercel.app/';

export const metadata = {
  title: "Next-Gen Web & App Development Services | WebGrow",
  description: "Accelerate your digital growth with WebGrow's professional full-stack web development, mobile apps, and scalable digital ecosystems tailored for modern businesses.",
  keywords: [
    "WebGrow",
    "WebGrow Services",
    "Next-Gen Web Development",
    "Mobile App Development",
    "Custom Software Solutions",
    "Affordable Website Packages",
    "Scalable Web Apps",
    "Full-Stack Development"
  ],
  openGraph: {
    title: "Next-Gen Web & App Development Services | WebGrow",
    description: "From custom web applications to scalable digital ecosystems, explore WebGrow's professional pricing plans and modern tech solutions.",
    url: `${siteUrl}/services`, 
    siteName: "WebGrow",
    images: [
      {
        url: `${siteUrl}/images/logo.jpg`,
        width: 1200,
        height: 630,
        alt: "WebGrow Next-Gen Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next-Gen Web & App Development Services | WebGrow",
    description: "Scale your digital footprint with WebGrow's modern tech ecosystem and flexible service packages.",
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