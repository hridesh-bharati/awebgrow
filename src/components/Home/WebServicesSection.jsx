import React from 'react';

const WebServicesSection = () => {
  const services = [
    "SEO Optimization", "Digital Marketing", "Full-Stack Coding", "Website Development",
    "UI/UX Design", "E-commerce Solutions", "Mobile App Development", "Cloud Hosting",
    "AI Integration", "Custom ERP Systems", "Brand Identity", "Social Media Management",
    "Content Writing", "Cybersecurity", "Database Management", "SaaS Development",
    "Performance Optimization", "PWA Development", "IT Consulting", "API Integration",
    "Tech Support", "Digital Transformation"
  ];

  return (
    <section className="relative w-full min-h-[100px] flex items-center justify-center bg-[#0a192f] overflow-hidden py-6">
      {/* ऑटोमैटिक स्क्रॉलिंग कन्टिन्यूअस मार्की */}
      <div className="w-full flex overflow-x-hidden whitespace-nowrap group">
        <div className="inline-block animate-marquee flex items-center gap-12 text-sm font-semibold uppercase tracking-wider text-[#64ffda]">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3">
              <span>{service}</span>
              <span className="text-[#8892b0]">•</span>
            </div>
          ))}
        </div>
        
        {/* कन्टिन्यूअस लूप बनाए रखने के लिए डुप्लिकेट लिस्ट */}
        <div className="inline-block animate-marquee flex items-center gap-12 text-sm font-semibold uppercase tracking-wider text-[#64ffda] absolute top-1/2 -translate-y-1/2 pl-[100%]">
          {services.map((service, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3">
              <span>{service}</span>
              <span className="text-[#8892b0]">•</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default WebServicesSection;