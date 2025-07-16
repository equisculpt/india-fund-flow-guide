
import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInformation from '@/components/contact/ContactInformation';
import GrievanceRedressal from '@/components/contact/GrievanceRedressal';
import RegulatoryInformation from '@/components/contact/RegulatoryInformation';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent" style={{ 
              filter: 'drop-shadow(0 0 20px hsl(var(--secondary-glow) / 0.6))',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Contact Us
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              Get in touch with our team for support, grievances, or general inquiries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-luxury hover:shadow-glow transition-all duration-500">
              <ContactForm />
            </div>

            {/* Contact Information - Centered */}
            <div className="space-y-6 flex flex-col items-center text-center">
              <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-luxury w-full">
                <ContactInformation />
              </div>
              <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-luxury w-full">
                <GrievanceRedressal />
              </div>
              <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-primary/20 shadow-luxury w-full">
                <RegulatoryInformation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
