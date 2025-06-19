
import React, { useEffect } from 'react';
import Footer from "@/components/Footer";

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using SIP Brewery (a trademark of Equisculpt Ventures Pvt. Ltd.) services, you accept and agree to be bound by the terms and provisions of this agreement. These terms are subject to applicable AMFI regulations for mutual fund distribution.
            </p>
          </section>

          <section className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Services</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Equisculpt Ventures Pvt. Ltd. is an AMFI registered Mutual Fund Distributor providing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Mutual fund distribution services</li>
              <li>Educational content and market insights</li>
              <li>AI-powered research and analysis (for informational purposes only)</li>
              <li>Portfolio tracking and reporting tools</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our services are provided in accordance with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Association of Mutual Funds in India (AMFI) guidelines for distributors</li>
              <li>All applicable laws and regulations governing mutual fund distribution in India</li>
              <li>We are NOT investment advisors and do not provide investment advisory services</li>
            </ul>
          </section>

          <section className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Risks and Disclaimers</h2>
            <div className="bg-red-100 p-4 rounded-md mb-4">
              <p className="text-red-800 font-semibold text-lg">
                ⚠️ Important: Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
              </p>
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>Past performance does not guarantee future returns</li>
              <li>The value of investments may go up or down based on market conditions</li>
              <li>You may receive back less than you invested</li>
              <li>There is no assurance that the investment objectives will be achieved</li>
              <li>AI-generated research and analysis are for informational purposes only and should not be considered as investment advice</li>
            </ul>
          </section>

          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Distribution Fees and Commission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              As an AMFI registered distributor:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>We may receive distribution commissions from mutual fund companies as per AMFI regulations</li>
              <li>Commission payments do not affect the NAV or returns you receive from mutual funds</li>
              <li>All fees and charges will be communicated transparently before investment</li>
              <li>We follow AMFI guidelines on commission disclosure and investor protection</li>
            </ul>
          </section>

          <section className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Responsibilities</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              As our client, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>Provide accurate and complete information for KYC compliance</li>
              <li>Read and understand all scheme documents before investing</li>
              <li>Make investment decisions based on your own risk appetite and financial goals</li>
              <li>Comply with all applicable tax obligations</li>
            </ul>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Grievance Redressal</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For any complaints or grievances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>Contact us directly at <a href="mailto:hello@equisculpt.in" className="text-blue-600 hover:underline">hello@equisculpt.in</a></li>
              <li>If not resolved, you may approach SEBI/AMFI grievance redressal mechanisms</li>
              <li>Details of our grievance officer are available on request</li>
            </ul>
          </section>

          <section className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to protecting your personal information in accordance with applicable data protection laws and SEBI regulations on client confidentiality.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Our liability is limited to the extent permitted by applicable laws and SEBI regulations. We shall not be liable for market losses or investment performance variations.
            </p>
          </section>

          <section className="bg-white p-6 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms may be updated from time to time to comply with regulatory changes. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For any questions regarding these terms or our services, please contact us at{' '}
              <a href="mailto:hello@equisculpt.in" className="text-blue-600 hover:underline font-semibold">hello@equisculpt.in</a>{' '}
              or <a href="tel:+917760997030" className="text-blue-600 hover:underline font-semibold">+91 7760997030</a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
