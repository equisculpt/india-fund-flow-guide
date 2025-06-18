
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Star, Calculator, Shield } from 'lucide-react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const BestSIPPlansPage = () => {
  const navigate = useNavigate();

  const topSIPPlans = [
    {
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns: "15.8%",
      minSIP: "₹500",
      rating: "5 Star"
    },
    {
      name: "SBI Small Cap Fund", 
      category: "Small Cap",
      returns: "22.4%",
      minSIP: "₹500",
      rating: "4 Star"
    },
    {
      name: "Axis Bluechip Fund",
      category: "Large Cap", 
      returns: "16.2%",
      minSIP: "₹500",
      rating: "5 Star"
    },
    {
      name: "Mirae Asset Large Cap Fund",
      category: "Large Cap",
      returns: "14.9%", 
      minSIP: "₹500",
      rating: "4 Star"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best SIP Plans India 2025 - Top Performing Mutual Funds",
    "description": "Discover best SIP plans in India 2025. Start SIP investment with ₹500, get cashback rewards. Compare top performing mutual funds with AI analysis.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": topSIPPlans.map((plan, index) => ({
        "@type": "FinancialProduct",
        "position": index + 1,
        "name": plan.name,
        "category": plan.category,
        "aggregateRating": {
          "@type": "AggregateRating", 
          "ratingValue": plan.rating.includes("5") ? "5" : "4",
          "bestRating": "5"
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Best SIP Plans India 2025 | Top Performing SIP Mutual Funds | Start ₹500 | SIP Brewery"
        description="Discover best SIP plans India 2025. Top performing mutual funds with 15%+ returns. Start SIP investment online with ₹500. Zero commission + cashback rewards. AMFI registered platform."
        keywords="best SIP plans India 2025, top SIP mutual funds, best SIP to start, SIP investment for beginners, highest return SIP plans, SIP ₹500 monthly, best mutual funds for SIP, start SIP now, SIP plans for salaried, best SIP for 2025"
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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">
              Best SIP Plans India 2025 - Start with ₹500 Monthly
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover top performing SIP mutual funds with 15%+ annual returns. Zero commission investment with cashback rewards on every SIP.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Top Rated Funds</h3>
                <p className="text-gray-600">4-5 star rated mutual funds</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">15%+ Returns</h3>
                <p className="text-gray-600">Consistent high performance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Calculator className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Start ₹500</h3>
                <p className="text-gray-600">Minimum SIP amount</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-lg">Zero Commission</h3>
                <p className="text-gray-600">Direct fund investment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Top Performing SIP Plans for 2025</h2>
            <div className="grid gap-6">
              {topSIPPlans.map((plan, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-2">Category: {plan.category}</p>
                      <p className="text-sm text-gray-500">Minimum SIP: {plan.minSIP}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{plan.returns}</div>
                      <div className="text-sm text-gray-500">Annual Returns*</div>
                      <div className="text-sm font-medium text-yellow-600 mt-1">{plan.rating}</div>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" onClick={() => navigate('/fund-comparison')}>
                    Start SIP Investment
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">Why Choose These SIP Plans?</h2>
              <ul className="space-y-3 text-gray-700">
                <li>• <strong>Proven Track Record:</strong> 5+ years of consistent performance</li>
                <li>• <strong>Professional Management:</strong> Experienced fund managers</li>
                <li>• <strong>Diversified Portfolio:</strong> Risk spread across multiple stocks</li>
                <li>• <strong>Low Cost:</strong> Direct plans with minimal expense ratios</li>
                <li>• <strong>Liquidity:</strong> No lock-in period, redeem anytime</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">How to Start SIP Investment?</h2>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1. Sign Up:</strong> Create your account on SIP Brewery</li>
                <li><strong>2. Complete KYC:</strong> Upload documents for verification</li>
                <li><strong>3. Choose SIP Plan:</strong> Select from best performing funds</li>
                <li><strong>4. Set Amount:</strong> Start with just ₹500 monthly</li>
                <li><strong>5. Start Investing:</strong> Automate your wealth building journey</li>
              </ol>
              <Button className="mt-4 w-full" onClick={() => navigate('/')}>
                Start Your SIP Journey Now
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">SIP Investment Benefits - Build Wealth Systematically</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Rupee Cost Averaging</h3>
                <p className="text-gray-700">Reduce impact of market volatility by investing fixed amount regularly</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Power of Compounding</h3>
                <p className="text-gray-700">Your returns generate returns, accelerating wealth creation</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Disciplined Investing</h3>
                <p className="text-gray-700">Automated investments help maintain investment discipline</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600 text-center">
            <p>*Returns are indicative and based on past performance. Mutual fund investments are subject to market risks.</p>
            <p>Please read all scheme related documents carefully before investing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSIPPlansPage;
