import Contact from "@/components/Contact/Contact";
import Header from "@/components/Header/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webgrowhs.vercel.app/';

export const metadata = {
  title: "Contact Us | Get a Free Quote & Consultation - WebGrow",
  description: "Have a project in mind? Reach out to WebGrow for custom web development, mobile apps, and scalable digital solutions. Let's build something next-gen together.",
  keywords: [
    "Contact WebGrow",
    "Hire Web Developers",
    "Get Web Development Quote",
    "App Development Consultation",
    "WebGrow Support",
    "Custom Software Agency Contact"
  ],
  openGraph: {
    title: "Contact Us | Get a Free Quote & Consultation - WebGrow",
    description: "Get in touch with the WebGrow expert team today. Let's discuss your custom web or application development requirements and scale your business.",
    url: `${siteUrl}/contact`,  
    siteName: "WebGrow",
    images: [
      {
        url: `${siteUrl}/images/logo.jpg`,  
        width: 1200,
        height: 630,
        alt: "Contact WebGrow Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get a Free Quote & Consultation - WebGrow",
    description: "Connect with WebGrow for professional full-stack web development and scalable modern tech ecosystems.",
    images: [`${siteUrl}/images/logo.jpg`], 
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-5">
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
          <Contact />
        </div>
      </main>
    </>
  );
}