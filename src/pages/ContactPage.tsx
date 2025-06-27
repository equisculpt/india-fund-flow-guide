
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import ContactForm from '@/components/contact/ContactForm';
import ContactInformation from '@/components/contact/ContactInformation';
import GrievanceRedressal from '@/components/contact/GrievanceRedressal';
import RegulatoryInformation from '@/components/contact/RegulatoryInformation';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Customer Support & Grievance Redressal | SIP Brewery</title>
        <meta name="description" content="Get in touch with SIP Brewery customer support. Find contact information, grievance redressal procedures, and regulatory compliance details." />
        <meta name="keywords" content="contact support, customer service, grievance redressal, SEBI complaints, mutual fund support" />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
                Contact Us
              </h1>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <ContactForm />
                <ContactInformation />
              </div>
              
              <div className="space-y-8">
                <GrievanceRedressal />
                <RegulatoryInformation />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactPage;
