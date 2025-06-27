
import React from 'react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/contact/ContactForm';
import ContactInformation from '@/components/contact/ContactInformation';
import GrievanceRedressal from '@/components/contact/GrievanceRedressal';
import RegulatoryInformation from '@/components/contact/RegulatoryInformation';

const ContactPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact SIP Brewery",
    "description": "Get in touch with SIP Brewery for investment support, customer service, and expert guidance.",
    "url": "https://sipbrewery.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "SIP Brewery",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  return (
    <Layout
      pageType="info"
      title="Contact SIP Brewery - Investment Support & Customer Service"
      description="Get in touch with SIP Brewery for investment support, customer service, and expert guidance. SEBI registered investment platform support."
      keywords="contact SIP Brewery, investment support, customer service, investment help"
      canonicalUrl="https://sipbrewery.com/contact"
      schemaData={structuredData}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help you with your investment journey. Reach out to our expert team for personalized guidance and support.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <ContactForm />
              <ContactInformation />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <GrievanceRedressal />
              <RegulatoryInformation />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
