
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FundCategories from '@/components/FundCategories';
import IndexPageSections from '@/components/IndexPageSections';
import SEOHead from '@/components/SEOHead';
import { useFundData } from '@/components/FundData';

const Index = () => {
  const { allFunds } = useFundData();

  const handleRiskProfilingComplete = (result: any) => {
    console.log('Risk profiling completed:', result);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SIP Brewery",
    "description": "India's #1 mutual fund distributor and SIP investment platform with zero commission, cashback rewards, and AI-powered analysis",
    "url": "https://sipbrewery.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sipbrewery.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "FinancialService",
      "name": "SIP Brewery - Best Mutual Fund Platform India",
      "serviceType": "Mutual Fund Distribution & SIP Investment Platform",
      "areaServed": "India",
      "offers": [
        {
          "@type": "Offer",
          "name": "Zero Commission SIP Investment",
          "description": "Start SIP with ₹500, get cashback rewards and track performance"
        },
        {
          "@type": "Offer", 
          "name": "Best SIP Plans India 2025",
          "description": "Top performing mutual funds with AI recommendations"
        },
        {
          "@type": "Offer",
          "name": "SIP Calculator & Comparison Tool",
          "description": "Compare 1000+ mutual funds and calculate SIP returns"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mutual Fund Investment Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Best SIP Plans India 2025",
              "description": "Start SIP investment online with top performing mutual funds. Zero commission, cashback rewards, AMFI registered distributor."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Direct Mutual Fund Investment Platform",
              "description": "Invest in direct mutual funds online with SIP calculator, performance tracker, and refer & earn program"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SIP vs Lump Sum Calculator",
              "description": "Compare SIP vs lump sum investment strategies with AI-powered recommendations"
            }
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Best Mutual Fund Platform India 2025 | Start SIP ₹500 | Zero Commission + Cashback | SIP Brewery"
        description="India's #1 mutual fund distributor & SIP investment platform. Start SIP online with ₹500, get cashback rewards. AMFI registered, zero commission, AI-powered fund analysis. Best SIP plans 2025."
        keywords="mutual fund distributor India, best SIP plans India 2025, invest in mutual funds online, SIP investment platform, start SIP online, best mutual fund platform India, SIP calculator India, SIP vs lump sum, zero commission mutual fund app, direct mutual funds India, SIP cashback offer, AMFI registered distributor, SIP rewards India, mutual fund comparison tool"
        structuredData={structuredData}
      />
      
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* SEO Content Section for Keywords */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">India's Best Mutual Fund Distributor & SIP Investment Platform</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Start SIP Online - ₹500 Monthly</h3>
                <p className="text-gray-700">Begin your SIP investment journey with India's top mutual fund platform. Zero commission, instant portfolio tracking, and cashback rewards on every SIP.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-600">Best SIP Plans India 2025</h3>
                <p className="text-gray-700">Discover top-performing SIP plans with AI-powered recommendations. Compare mutual funds, calculate returns, and invest in direct schemes with zero fees.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">SIP Calculator & Comparison</h3>
                <p className="text-gray-700">Use our advanced SIP calculator to compare SIP vs lump sum strategies. Track fund performance and get personalized investment recommendations.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Why Choose SIP Brewery - India's #1 SIP Investment Platform?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-lg mb-2">🏆 AMFI Registered Mutual Fund Distributor</h4>
                  <p className="text-gray-700 mb-4">Fully regulated and registered with AMFI. Your investments are safe and secure with India's most trusted mutual fund platform.</p>
                  
                  <h4 className="font-semibold text-lg mb-2">💰 Zero Commission + SIP Cashback Rewards</h4>
                  <p className="text-gray-700 mb-4">Invest in direct mutual funds with zero commission. Earn cashback on every SIP and refer friends to earn more rewards.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">🤖 AI-Powered Fund Analysis & Recommendations</h4>
                  <p className="text-gray-700 mb-4">Get personalized mutual fund recommendations based on your risk profile, goals, and market conditions using advanced AI algorithms.</p>
                  
                  <h4 className="font-semibold text-lg mb-2">📊 Advanced SIP Calculator & Performance Tracker</h4>
                  <p className="text-gray-700 mb-4">Calculate SIP returns, compare SIP vs lump sum, track portfolio performance, and get detailed fund analysis reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Mutual Funds - Restored Original with Categories */}
      <FundCategories allFunds={allFunds} />

      {/* All Other Page Sections */}
      <IndexPageSections onRiskProfilingComplete={handleRiskProfilingComplete} />
      
      {/* Additional SEO Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions - SIP Investment India</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">How to Start SIP Online with SIP Brewery?</h3>
                <p className="text-gray-700">Starting SIP online is simple with SIP Brewery. Just sign up, complete your KYC, choose from best SIP plans in India, and start investing with just ₹500 monthly. Our platform offers zero commission direct mutual fund investment with cashback rewards.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Which are the Best SIP Plans to Start in 2025?</h3>
                <p className="text-gray-700">The best SIP plans for 2025 include top-performing large cap, mid cap, and small cap mutual funds. Our AI-powered platform analyzes 1000+ mutual funds to recommend the best SIP plans based on your investment goals and risk appetite.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">SIP vs Lump Sum - Which is Better for Investment?</h3>
                <p className="text-gray-700">SIP investment is generally better for beginners as it provides rupee cost averaging and reduces market timing risk. Use our SIP calculator to compare SIP vs lump sum returns and make informed investment decisions.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Can I Get Cashback on SIP Investment?</h3>
                <p className="text-gray-700">Yes! SIP Brewery offers cashback rewards on every SIP investment. Our refer and earn program also provides additional rewards when you invite friends to start their SIP journey with India's best mutual fund platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
