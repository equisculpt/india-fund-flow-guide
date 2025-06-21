
import React from 'react';

const FAQSection = () => {
  const faqs = [
    {
      question: "How to Start SIP Online with SIP Brewery?",
      answer: "Starting SIP online is simple with SIP Brewery. Just sign up, complete your KYC, choose from best SIP plans in India, and start investing with just ₹500 monthly. Our platform offers regular mutual fund investment with professional advisory and consistency rewards."
    },
    {
      question: "Which are the Best SIP Plans to Start in 2025?",
      answer: "The best SIP plans for 2025 include top-performing large cap, mid cap, and small cap mutual funds. Our professional advisors analyze 1000+ mutual funds to recommend the best SIP plans based on your investment goals and risk appetite."
    },
    {
      question: "SIP vs Lump Sum - Which is Better for Investment?",
      answer: "SIP investment is generally better for beginners as it provides rupee cost averaging and reduces market timing risk. Use our SIP calculator to compare SIP vs lump sum returns and make informed investment decisions."
    },
    {
      question: "Can I Get Rewards on SIP Investment?",
      answer: "Yes! SIP Brewery offers consistency rewards and gift cards for maintaining regular SIP investments. Our refer and earn program also provides rewards when you invite friends to start their SIP journey. All rewards are subject to terms and conditions as per SEBI guidelines."
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white mobile-optimized">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Frequently Asked Questions - SIP Investment India</h2>
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-700 text-sm md:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
