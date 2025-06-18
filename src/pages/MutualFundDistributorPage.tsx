
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Award, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const MutualFundDistributorPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "AMFI Registered",
      description: "Fully regulated and registered with Association of Mutual Funds in India (AMFI)"
    },
    {
      icon: Award,
      title: "Zero Commission",
      description: "Direct mutual fund investment with no hidden charges or commission fees"
    },
    {
      icon: Users,
      title: "50,000+ Investors",
      description: "Trusted by thousands of investors across India for mutual fund investments"
    },
    {
      icon: TrendingUp,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms for fund analysis and personalized recommendations"
    }
  ];

  const services = [
    "Direct Mutual Fund Investment",
    "SIP & Lump Sum Investment Options", 
    "Portfolio Tracking & Analysis",
    "Tax Saving ELSS Funds",
    "Goal-Based Investment Planning",
    "Fund Performance Comparison",
    "SIP Calculator & Tools",
    "Expert Investment Advisory"
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "SIP Brewery - Mutual Fund Distributor India",
    "description": "AMFI registered mutual fund distributor offering zero commission direct fund investment, SIP plans, and AI-powered fund analysis",
    "serviceType": "Mutual Fund Distribution",
    "areaServed": "India",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "AMFI Registration"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Best Mutual Fund Distributor India | AMFI Registered | Zero Commission | SIP Brewery"
        description="India's leading AMFI registered mutual fund distributor. Zero commission direct fund investment, best SIP plans, AI-powered analysis. Start investing with ₹500. 50,000+ happy investors."
        keywords="mutual fund distributor India, AMFI registered distributor, zero commission mutual fund, direct mutual fund platform, best mutual fund distributor, SIP investment distributor, mutual fund advisory India"
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
              India's Leading AMFI Registered Mutual Fund Distributor
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Zero commission direct mutual fund investment platform trusted by 50,000+ investors. Start your SIP journey with India's most advanced fund distributor.
            </p>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Why Choose SIP Brewery as Your Mutual Fund Distributor?</h2>
              <p className="text-lg opacity-90">
                AMFI registered, zero commission, AI-powered fund analysis, and personalized investment advisory - everything you need for successful mutual fund investing.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Our Mutual Fund Distribution Services</h2>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" onClick={() => navigate('/')}>
                Start Investing Now
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">AMFI Registration & Compliance</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-semibold text-lg">Regulatory Compliance</h3>
                  <p className="text-gray-700">Fully compliant with SEBI and AMFI regulations for mutual fund distribution</p>
                </div>
                
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-lg">Investor Protection</h3>
                  <p className="text-gray-700">Your investments are protected under regulatory framework and investor grievance mechanisms</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-semibold text-lg">Transparency</h3>
                  <p className="text-gray-700">Complete transparency in fee structure, fund performance, and investment process</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">How We're Different from Traditional Mutual Fund Distributors</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-left py-3 px-4">SIP Brewery</th>
                    <th className="text-left py-3 px-4">Traditional Distributors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Commission</td>
                    <td className="py-3 px-4 text-green-600">Zero Commission</td>
                    <td className="py-3 px-4 text-red-600">1-3% Commission</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Fund Analysis</td>
                    <td className="py-3 px-4 text-green-600">AI-Powered Analysis</td>
                    <td className="py-3 px-4 text-gray-600">Basic Research</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Platform</td>
                    <td className="py-3 px-4 text-green-600">Digital Platform</td>
                    <td className="py-3 px-4 text-gray-600">Paperwork Based</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Minimum Investment</td>
                    <td className="py-3 px-4 text-green-600">₹500 SIP</td>
                    <td className="py-3 px-4 text-gray-600">₹1000+ SIP</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Portfolio Tracking</td>
                    <td className="py-3 px-4 text-green-600">Real-time Tracking</td>
                    <td className="py-3 px-4 text-gray-600">Monthly Statements</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Why Direct Mutual Funds are Better?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
                <h3 className="font-semibold mb-2">Commission Fees</h3>
                <p className="text-gray-700">No distribution commission means more money working for you</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">0.5%</div>
                <h3 className="font-semibold mb-2">Lower Expense Ratio</h3>
                <p className="text-gray-700">Direct plans have lower expense ratios compared to regular plans</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">20%+</div>
                <h3 className="font-semibold mb-2">Higher Returns</h3>
                <p className="text-gray-700">Lower costs translate to higher returns over long term</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Start Your Investment Journey with India's Best Mutual Fund Distributor</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Beginners</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Start SIP with just ₹500</li>
                  <li>• Get personalized fund recommendations</li>
                  <li>• Learn through educational content</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">For Experienced Investors</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced portfolio analysis tools</li>
                  <li>• Tax optimization strategies</li>
                  <li>• Goal-based investment planning</li>
                  <li>• Direct fund switching options</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Start Investing with SIP Brewery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundDistributorPage;
