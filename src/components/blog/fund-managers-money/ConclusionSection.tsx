
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ConclusionSection = () => {
  const navigate = useNavigate();

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4">The Bottom Line: Value Over Cost</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            While direct plans have lower expense ratios, the evidence consistently shows that most investors achieve better outcomes through regular plans with professional guidance. The key is choosing the right distributor who adds genuine value.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Remember These Key Points:</h4>
            <ol className="space-y-2 text-gray-700">
              <li><strong>1.</strong> Professional guidance typically adds 3-4% annual value through better decisions</li>
              <li><strong>2.</strong> The 0.5-1% additional cost in regular plans is often recovered many times over</li>
              <li><strong>3.</strong> Behavioral coaching during market volatility is invaluable</li>
              <li><strong>4.</strong> Most successful investors work with professional advisors</li>
              <li><strong>5.</strong> DIY investing requires significant time, knowledge, and emotional discipline</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-green-600">For New Investors:</h5>
              <p className="text-sm text-gray-700">Regular plans with good distributors are almost always the better choice. The learning curve for successful DIY investing is steep and expensive.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-blue-600">For Experienced Investors:</h5>
              <p className="text-sm text-gray-700">Consider the value of behavioral coaching and professional oversight, especially during market extremes. Many seasoned investors still benefit from regular plans.</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-6">
            <p className="text-yellow-800 font-medium">💡 Final Thought: Focus on building wealth, not just minimizing costs. The right professional guidance can be worth many times more than the additional fees you pay.</p>
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
              <p className="text-lg mb-6">Want a personalized fund recommendation based on your goals? Try SIP Brewery's Smart SIP Suggestor today.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/')} 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Get Personalized Recommendations
                </Button>
                <Button 
                  onClick={() => navigate('/funds')} 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-6 py-3"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Compare Mutual Funds
                </Button>
              </div>
            </div>
          </div>

          {/* Internal Links Section */}
          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <h4 className="font-semibold mb-4 text-center">Learn More About SIP Brewery</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/#why-choose-sipbrewery')} 
                className="w-full"
              >
                Why Choose SIP Brewery
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/funds')} 
                className="w-full"
              >
                Fund Comparison Tool
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const event = new CustomEvent('openLogin');
                  window.dispatchEvent(event);
                }} 
                className="w-full"
              >
                <Users className="mr-2 h-4 w-4" />
                Start Investing Today
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConclusionSection;
