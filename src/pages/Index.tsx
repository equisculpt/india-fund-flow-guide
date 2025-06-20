
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FundCategories from '@/components/FundCategories';
import IndexPageSections from '@/components/IndexPageSections';
import PlatformComparisonTable from '@/components/PlatformComparisonTable';
import Footer from '@/components/Footer';
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
    "description": "India's #1 SEBI registered mutual fund distributor offering regular mutual funds with professional advisory and consistency rewards",
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
          "name": "Regular Mutual Fund SIP Investment",
          "description": "Start SIP with ₹500, get consistency rewards and professional advisory"
        },
        {
          "@type": "Offer", 
          "name": "Best SIP Plans India 2025",
          "description": "Top performing regular mutual funds with professional recommendations"
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
              "description": "Start SIP investment online with top performing regular mutual funds. Professional advisory, consistency rewards, SEBI & AMFI registered distributor."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Regular Mutual Fund Investment Platform",
              "description": "Invest in regular mutual funds online with SIP calculator, performance tracker, and refer & earn program"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SIP vs Lump Sum Calculator",
              "description": "Compare SIP vs lump sum investment strategies with professional recommendations"
            }
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Best Mutual Fund Platform India 2025 | Start SIP ₹500 | AMFI Registered | SIP Brewery"
        description="India's trusted AMFI registered mutual fund distributor & SIP investment platform. Start SIP online with ₹500, get consistency rewards. Professional advisory, regular mutual funds, best SIP plans 2025."
        keywords="mutual fund distributor India, best SIP plans India 2025, invest in mutual funds online, SIP investment platform, start SIP online, best mutual fund platform India, SIP calculator India, SIP vs lump sum, regular mutual fund app, mutual funds India, SIP consistency rewards, AMFI registered distributor, SIP rewards India, mutual fund comparison tool"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <HeroSection />

      {/* SEO Content Section for Keywords */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">India's Trusted AMFI Registered Mutual Fund Distributor & SIP Investment Platform</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Start SIP Online - ₹500 Monthly</h3>
                <p className="text-gray-700">Begin your SIP investment journey with India's top mutual fund platform. Professional advisory, instant portfolio tracking, and consistency rewards on regular SIPs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-600">Best SIP Plans India 2025</h3>
                <p className="text-gray-700">Discover top-performing SIP plans with professional recommendations. Compare mutual funds, calculate returns, and invest in regular schemes with expert guidance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">SIP Calculator & Comparison</h3>
                <p className="text-gray-700">Use our advanced SIP calculator to compare SIP vs lump sum strategies. Track fund performance and get personalized investment recommendations.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Why Choose SIP Brewery - India's Trusted SIP Investment Platform?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-lg mb-2">🏆 AMFI Registered & Compliant Mutual Fund Distributor</h4>
                  <p className="text-gray-700 mb-4">Fully regulated and registered with AMFI. Your investments are safe and secure with India's most trusted mutual fund platform.</p>
                  
                  <h4 className="font-semibold text-lg mb-2">💰 Regular Mutual Funds + SIP Consistency Rewards</h4>
                  <p className="text-gray-700 mb-4">Invest in regular mutual funds with professional advisory. Earn consistency rewards and gift cards for maintaining regular SIPs. Terms apply as per SEBI guidelines.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">👨‍💼 Professional Fund Recommendations</h4>
                  <p className="text-gray-700 mb-4">Get personalized mutual fund recommendations based on your risk profile, goals, and market conditions from experienced professionals.</p>
                  
                  <h4 className="font-semibold text-lg mb-2">📊 Advanced SIP Calculator & Performance Tracker</h4>
                  <p className="text-gray-700 mb-4">Calculate SIP returns, compare SIP vs lump sum, track portfolio performance, and get detailed fund analysis reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison Table */}
      <PlatformComparisonTable />

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
                <p className="text-gray-700">Starting SIP online is simple with SIP Brewery. Just sign up, complete your KYC, choose from best SIP plans in India, and start investing with just ₹500 monthly. Our platform offers regular mutual fund investment with professional advisory and consistency rewards.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Which are the Best SIP Plans to Start in 2025?</h3>
                <p className="text-gray-700">The best SIP plans for 2025 include top-performing large cap, mid cap, and small cap mutual funds. Our professional advisors analyze 1000+ mutual funds to recommend the best SIP plans based on your investment goals and risk appetite.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">SIP vs Lump Sum - Which is Better for Investment?</h3>
                <p className="text-gray-700">SIP investment is generally better for beginners as it provides rupee cost averaging and reduces market timing risk. Use our SIP calculator to compare SIP vs lump sum returns and make informed investment decisions.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Can I Get Rewards on SIP Investment?</h3>
                <p className="text-gray-700">Yes! SIP Brewery offers consistency rewards and gift cards for maintaining regular SIP investments. Our refer and earn program also provides rewards when you invite friends to start their SIP journey. All rewards are subject to terms and conditions as per SEBI guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
