
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import ErrorBoundary from '@/components/ErrorBoundary';

const Index = () => {
  console.log('🏠 Index page loading...');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SIP Brewery",
    "description": "India's #1 SEBI registered mutual fund investment platform for smart SIP investments and wealth building.",
    "url": "https://sipbrewery.com",
    "logo": "https://sipbrewery.com/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png",
    "serviceType": "Mutual Fund Investment Advisory",
    "areaServed": "India"
  };

  return (
    <ErrorBoundary>
      <Layout
        pageType="homepage"
        title="SIP Brewery - Best Mutual Fund Investment Platform India | SEBI Registered"
        description="India's #1 SEBI registered mutual fund investment platform for smart SIP investments. Compare funds, get AI insights, and build your wealth with expert guidance."
        keywords="mutual funds india, SIP investment, SEBI registered platform, best mutual funds, SIP calculator"
        canonicalUrl="https://sipbrewery.com/"
        schemaData={structuredData}
      >
        {/* Hero Section */}
        <ErrorBoundary fallback={
          <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">SIP Brewery</h1>
              <p className="text-gray-600">India's #1 Mutual Fund Investment Platform</p>
            </div>
          </div>
        }>
          <HeroSection />
        </ErrorBoundary>

        {/* Simple SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose SIP Brewery for Your Investment Journey?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">SEBI Registered</h3>
                  <p className="text-gray-600">Fully compliant with regulatory guidelines</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                  <p className="text-gray-600">Smart analysis for better investment decisions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                  <p className="text-gray-600">Professional support for your wealth building</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is SIP Brewery SEBI registered?
                  </h3>
                  <p className="text-gray-600">
                    Yes, SIP Brewery is a SEBI registered mutual fund distributor, ensuring full compliance with regulatory guidelines.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How does the AI fund comparison work?
                  </h3>
                  <p className="text-gray-600">
                    Our AI analyzes multiple parameters including historical performance, risk metrics, and market conditions to provide comprehensive fund comparisons.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What are the fees for using SIP Brewery?
                  </h3>
                  <p className="text-gray-600">
                    SIP Brewery is free to use. We earn through distributor commissions from fund houses, which doesn't affect your returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </ErrorBoundary>
  );
};

export default Index;
