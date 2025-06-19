
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calculator, TrendingUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const SIPCalculatorPage = () => {
  const navigate = useNavigate();
  const [sipAmount, setSipAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [lumpSum, setLumpSum] = useState(600000);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = duration * 12;
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = sipAmount * months;
    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    };
  };

  const calculateLumpSumReturns = () => {
    const futureValue = lumpSum * Math.pow(1 + expectedReturn / 100, duration);
    const totalReturns = futureValue - lumpSum;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: lumpSum,
      totalReturns: Math.round(totalReturns)
    };
  };

  const sipResults = calculateSIP();
  const lumpSumResults = calculateLumpSumReturns();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SIP Calculator India - Compare SIP vs Lump Sum Returns",
    "description": "Free SIP calculator to calculate mutual fund SIP returns, compare SIP vs lump sum investment strategies. Plan your SIP investment with accurate projections.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="SIP Calculator India 2025 | Calculate SIP Returns | SIP vs Lump Sum Comparison | SIP Brewery"
        description="Free SIP calculator India. Calculate mutual fund SIP returns, compare SIP vs lump sum investment strategies. Plan your SIP investment with accurate return projections and start investing."
        keywords="SIP calculator India, SIP return calculator, SIP vs lump sum calculator, mutual fund SIP calculator, SIP investment calculator, calculate SIP returns, SIP planning calculator, investment calculator India"
        structuredData={structuredData}
      />
      
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
              SIP Calculator India - Calculate Your SIP Returns & Compare Investment Strategies
            </h1>
            <p className="text-xl text-gray-600">
              Use our free SIP calculator to plan your mutual fund investments. Compare SIP vs lump sum returns and make informed investment decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* SIP Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">SIP Investment Calculator</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly SIP Amount (₹)</label>
                  <Input
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Investment Duration (Years)</label>
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">SIP Investment Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Investment:</span>
                    <span className="font-semibold">₹{sipResults.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Returns:</span>
                    <span className="font-semibold text-green-600">₹{sipResults.totalReturns.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Maturity Value:</span>
                    <span className="font-bold text-blue-600">₹{sipResults.futureValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lump Sum Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold">Lump Sum Investment Calculator</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Lump Sum Amount (₹)</label>
                  <Input
                    type="number"
                    value={lumpSum}
                    onChange={(e) => setLumpSum(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Investment Duration (Years)</label>
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Annual Return (%)</label>
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Lump Sum Investment Results</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Initial Investment:</span>
                    <span className="font-semibold">₹{lumpSumResults.totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Returns:</span>
                    <span className="font-semibold text-green-600">₹{lumpSumResults.totalReturns.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Maturity Value:</span>
                    <span className="font-bold text-green-600">₹{lumpSumResults.futureValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIP vs Lump Sum Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">SIP vs Lump Sum Comparison</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-2 border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">SIP Investment Advantages</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Rupee Cost Averaging reduces market volatility impact</li>
                  <li>• Disciplined investing through automation</li>
                  <li>• Lower initial capital requirement</li>
                  <li>• Flexibility to increase/decrease amount</li>
                  <li>• Ideal for salaried individuals</li>
                </ul>
              </div>
              
              <div className="p-6 border-2 border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-600 mb-4">Lump Sum Investment Advantages</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Higher potential returns in bull markets</li>
                  <li>• Entire amount works from day one</li>
                  <li>• Suitable when markets are low</li>
                  <li>• No EMI-like monthly commitment</li>
                  <li>• Good for surplus fund investment</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Investment Recommendation</h3>
                <p className="text-gray-700">
                  {sipResults.futureValue > lumpSumResults.futureValue 
                    ? "Based on your inputs, SIP investment shows higher returns due to rupee cost averaging benefits."
                    : "Based on your inputs, lump sum investment shows higher returns. However, SIP provides better risk management."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
            <p className="text-gray-700 mb-6">
              Use our calculator insights to make informed decisions. Start your SIP or lump sum investment with India's best mutual fund platform.
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/best-sip-plans')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Best SIP Plans
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/fund-comparison')}
              >
                Compare Mutual Funds
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">SIP Calculator FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">How accurate is the SIP calculator?</h3>
                <p className="text-gray-700">Our SIP calculator provides accurate projections based on compound interest calculations. However, actual returns may vary due to market conditions.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">What is the minimum amount to start SIP?</h3>
                <p className="text-gray-700">You can start SIP with as low as ₹500 per month in most mutual funds. Some funds allow even ₹100 monthly SIP.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Can I increase my SIP amount later?</h3>
                <p className="text-gray-700">Yes, you can increase your SIP amount anytime. Many funds also offer step-up SIP where amount increases automatically each year.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculatorPage;
