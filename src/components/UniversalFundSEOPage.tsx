
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Star, Shield, Calculator } from 'lucide-react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const UniversalFundSEOPage = () => {
  const { fundSlug } = useParams();
  const navigate = useNavigate();

  // Extract fund info from URL slug
  const getFundInfo = (slug: string) => {
    const funds: { [key: string]: any } = {
      // SBI Funds
      'sbi-small-cap-mutual-fund': {
        name: 'SBI Small Cap Fund',
        amc: 'SBI Mutual Fund',
        category: 'Small Cap',
        schemeCode: 'sbi-small-cap-fund',
        description: 'SBI Small Cap Fund - India\'s top performing small cap mutual fund with consistent returns and expert management.',
        highlights: ['High Growth Potential', 'Expert Fund Management', 'Diversified Portfolio', 'Tax Benefits'],
        returns: { '1Y': 25.4, '3Y': 18.7, '5Y': 22.1 }
      },
      'sbi-bluechip-fund': {
        name: 'SBI Bluechip Fund',
        amc: 'SBI Mutual Fund',
        category: 'Large Cap',
        schemeCode: 'sbi-bluechip-fund',
        description: 'SBI Bluechip Fund - Invest in India\'s largest and most stable companies with consistent dividend yields.',
        highlights: ['Stable Returns', 'Blue Chip Companies', 'Low Risk Profile', 'Regular Dividends'],
        returns: { '1Y': 15.2, '3Y': 12.8, '5Y': 14.5 }
      },
      'sbi-large-midcap-fund': {
        name: 'SBI Large & Midcap Fund',
        amc: 'SBI Mutual Fund',
        category: 'Large & Mid Cap',
        schemeCode: 'sbi-large-midcap-fund',
        description: 'SBI Large & Midcap Fund - Perfect blend of stability and growth with investments in large and mid-cap companies.',
        highlights: ['Balanced Portfolio', 'Growth & Stability', 'Professional Management', 'Sector Diversification'],
        returns: { '1Y': 20.1, '3Y': 15.6, '5Y': 18.3 }
      },

      // HDFC Funds  
      'hdfc-top-100-fund': {
        name: 'HDFC Top 100 Fund',
        amc: 'HDFC Mutual Fund',
        category: 'Large Cap',
        schemeCode: 'hdfc-top-100-fund',
        description: 'HDFC Top 100 Fund - Invest in top 100 companies in India with proven track record and consistent performance.',
        highlights: ['Top 100 Companies', 'Proven Track Record', 'Low Volatility', 'Strong Research Team'],
        returns: { '1Y': 16.8, '3Y': 13.5, '5Y': 15.2 }
      },
      'hdfc-small-cap-fund': {
        name: 'HDFC Small Cap Fund',
        amc: 'HDFC Mutual Fund',
        category: 'Small Cap',
        schemeCode: 'hdfc-small-cap-fund',
        description: 'HDFC Small Cap Fund - High growth potential with investments in emerging small-cap companies.',
        highlights: ['High Growth Potential', 'Emerging Companies', 'Research Driven', 'Long Term Wealth Creation'],
        returns: { '1Y': 28.5, '3Y': 21.2, '5Y': 24.7 }
      },

      // ICICI Prudential
      'icici-prudential-bluechip-fund': {
        name: 'ICICI Prudential Bluechip Fund',
        amc: 'ICICI Prudential Mutual Fund',
        category: 'Large Cap',
        schemeCode: 'icici-prudential-bluechip-fund',
        description: 'ICICI Prudential Bluechip Fund - Invest in blue chip companies with strong fundamentals and market leadership.',
        highlights: ['Blue Chip Companies', 'Market Leaders', 'Strong Fundamentals', 'Consistent Performance'],
        returns: { '1Y': 17.3, '3Y': 14.1, '5Y': 16.8 }
      },

      // Axis Funds
      'axis-bluechip-fund': {
        name: 'Axis Bluechip Fund',
        amc: 'Axis Mutual Fund',
        category: 'Large Cap',
        schemeCode: 'axis-bluechip-fund',
        description: 'Axis Bluechip Fund - Premium large cap fund focusing on quality stocks with strong growth prospects.',
        highlights: ['Quality Stocks', 'Strong Growth', 'Risk Management', 'Alpha Generation'],
        returns: { '1Y': 18.9, '3Y': 15.7, '5Y': 17.4 }
      },

      // Default fallback
      'default': {
        name: 'Mutual Fund',
        amc: 'Leading AMC',
        category: 'Equity',
        schemeCode: 'mutual-fund',
        description: 'Top performing mutual fund with excellent returns and professional management.',
        highlights: ['Professional Management', 'Diversified Portfolio', 'Tax Benefits', 'SIP Option'],
        returns: { '1Y': 15.0, '3Y': 12.0, '5Y': 14.0 }
      }
    };

    return funds[slug || ''] || funds['default'];
  };

  const fundInfo = getFundInfo(fundSlug || '');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": fundInfo.name,
    "description": fundInfo.description,
    "provider": {
      "@type": "Organization",
      "name": fundInfo.amc
    },
    "category": `${fundInfo.category} Mutual Fund`,
    "offers": {
      "@type": "Offer",
      "price": "Current NAV",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "1000+"
    }
  };

  const handleViewDetails = () => {
    navigate(`/fund/${fundInfo.schemeCode}`);
  };

  const title = `${fundInfo.name} - NAV, Returns & Review 2024 | SIP Brewery`;
  const description = `${fundInfo.description} Current NAV, performance analysis, SIP calculator. Start investing with ₹500. Expert recommendations.`;
  const keywords = `${fundInfo.name}, ${fundInfo.amc}, ${fundInfo.category} funds, mutual fund NAV, SIP investment, ${fundInfo.name} review, best mutual funds 2024`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
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
            {fundInfo.name} - Complete Analysis & Review 2024
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About {fundInfo.name}</h2>
            <p className="text-gray-700 mb-4">
              {fundInfo.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Fund Highlights
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Category: {fundInfo.category} Fund</li>
                  <li>• Fund House: {fundInfo.amc}</li>
                  <li>• Minimum SIP: ₹500</li>
                  <li>• Risk Level: Moderate to High</li>
                  <li>• Lock-in Period: None</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• 1 Year Return: {fundInfo.returns['1Y']}%*</li>
                  <li>• 3 Year Return: {fundInfo.returns['3Y']}%*</li>
                  <li>• 5 Year Return: {fundInfo.returns['5Y']}%*</li>
                  <li>• AUM: ₹10,000+ Crores</li>
                  <li>• Expense Ratio: 1.5%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose {fundInfo.name}?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {fundInfo.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-800">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6" />
              Ready to Invest in {fundInfo.name}?
            </h2>
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

export default UniversalFundSEOPage;
