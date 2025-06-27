
import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInformation from '@/components/contact/ContactInformation';
import GrievanceRedressal from '@/components/contact/GrievanceRedressal';
import RegulatoryInformation from '@/components/contact/RegulatoryInformation';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with our team for support, grievances, or general inquiries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information - Centered */}
            <div className="space-y-6 flex flex-col items-center text-center">
              <ContactInformation />
              <GrievanceRedressal />
              <RegulatoryInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
