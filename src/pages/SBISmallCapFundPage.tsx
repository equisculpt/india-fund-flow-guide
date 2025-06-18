
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const SBISmallCapFundPage = () => {
  const navigate = useNavigate();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "SBI Small Cap Fund",
    "description": "SBI Small Cap Fund - Direct Growth mutual fund with high growth potential. Complete analysis, NAV, performance review and investment guidance.",
    "provider": {
      "@type": "Organization",
      "name": "SBI Mutual Fund"
    },
    "category": "Small Cap Mutual Fund",
    "offers": {
      "@type": "Offer",
      "price": "Current NAV",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.2",
      "reviewCount": "500+"
    }
  };

  const handleViewDetails = () => {
    navigate('/fund/sbi-small-cap-fund');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="SBI Small Cap Fund - NAV, Performance Review & Analysis 2024 | SIP Brewery"
        description="SBI Small Cap Fund complete analysis - Current NAV, performance review, returns, portfolio holdings. Best small cap mutual fund investment guide. Start SIP ₹500."
        keywords="SBI Small Cap Fund, SBI small cap mutual fund, SBI small cap fund NAV, SBI small cap fund performance, SBI small cap fund review, small cap mutual funds, best small cap funds 2024"
        structuredData={structuredData}
      />
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            SBI Small Cap Fund - Complete Analysis & Review 2024
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About SBI Small Cap Fund</h2>
            <p className="text-gray-700 mb-4">
              SBI Small Cap Fund is one of India's most popular small cap mutual funds, managed by SBI Mutual Fund. 
              This equity scheme primarily invests in small-cap companies with high growth potential, offering investors 
              an opportunity to participate in India's emerging business landscape.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Fund Highlights</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Category: Small Cap Equity Fund</li>
                  <li>• Fund House: SBI Mutual Fund</li>
                  <li>• Minimum SIP: ₹500</li>
                  <li>• Risk Level: High Risk, High Return</li>
                  <li>• Lock-in Period: None</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Performance Metrics</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• 1 Year Return: 25.4%*</li>
                  <li>• 3 Year Return: 18.7%*</li>
                  <li>• 5 Year Return: 22.1%*</li>
                  <li>• AUM: ₹15,000+ Crores</li>
                  <li>• Expense Ratio: 1.25%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose SBI Small Cap Fund?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. High Growth Potential</h3>
                <p className="text-gray-700">Small cap companies often deliver superior returns over the long term, making this fund ideal for wealth creation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Expert Fund Management</h3>
                <p className="text-gray-700">Managed by experienced fund managers at SBI Mutual Fund with a proven track record in small cap investing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Diversified Portfolio</h3>
                <p className="text-gray-700">Well-diversified across sectors and companies to minimize concentration risk while maximizing growth opportunities.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Invest in SBI Small Cap Fund?</h2>
            <p className="text-gray-700 mb-6">
              Get detailed analysis, real-time NAV, portfolio insights and start your SIP journey with SIP Brewery's AI-powered platform.
            </p>
            <Button 
              size="lg" 
              onClick={handleViewDetails}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              View Detailed Analysis & Start SIP
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>*Returns are indicative and subject to market risks. Past performance is not indicative of future results.</p>
            <p>Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SBISmallCapFundPage;
