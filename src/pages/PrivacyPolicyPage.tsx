
import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, make investments, or contact us for support.
            </p>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Personal information:</strong> Name, email, phone number</li>
                <li><strong>Financial information:</strong> Details necessary for mutual fund investments</li>
                <li><strong>Investment preferences:</strong> Your goals and risk appetite</li>
                <li><strong>Communication records:</strong> Support conversations and feedback</li>
              </ul>
            </div>
          </section>

          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li>Process your mutual fund investments</li>
                <li>Provide customer support and account management</li>
                <li>Send you investment updates and statements</li>
                <li>Process and deliver gift card rewards</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties except:
            </p>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>With mutual fund companies:</strong> To process your investments</li>
                <li><strong>With regulatory authorities:</strong> As required by law</li>
                <li><strong>With service providers:</strong> Who assist in our operations under strict confidentiality</li>
              </ul>
            </div>
          </section>

          <section className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed">
                <strong>🔒 Your data is protected:</strong> We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
              </p>
            </div>
          </section>

          <section className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <div className="bg-white p-4 rounded-md">
              <ul className="list-disc pl-6 text-gray-700 space-y-3">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed mb-3">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
            </div>
          </section>

          <section className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:hello@equisculpt.in" className="text-blue-600 hover:underline font-semibold">hello@equisculpt.in</a>{' '}
                or <a href="tel:+917760997030" className="text-blue-600 hover:underline font-semibold">+91 7760997030</a>.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
