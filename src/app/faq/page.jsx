import FaqSection from "@/components/Faq/FaqSection";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Frequently Asked Questions | WebGrow",
  description: "Find answers to common questions about WebGrow's web development, design, and digital solutions.",
};

export default function FaqPage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer web development, mobile app development, UI/UX design, SEO optimization, cloud services, and digital marketing solutions tailored to your business needs."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a typical project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary based on complexity. A simple website takes 4-6 weeks, while complex web applications can take 3-6 months. We'll provide a detailed timeline during the consultation."
        }
      },
      {
        "@type": "Question",
        "name": "What is your pricing model?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Each project is custom-quoted based on specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide maintenance services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer comprehensive maintenance and support packages to ensure your application runs smoothly and stays up-to-date with the latest technologies."
        }
      }
    ]
  };

  return (
    <>
      {/* 💡 सर्वर-साइड इंजेक्टेड स्क्रिप्ट जो सीधे सर्च इंजनों को मिलेगी */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      
      <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light pt-5">
        <Header />
        <div className="w-100">
          <FaqSection />
        </div>
      </main>
    </>
  );
}