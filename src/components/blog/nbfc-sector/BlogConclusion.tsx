
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const BlogConclusion = () => {
  const navigate = useNavigate();

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🎯 Conclusion & Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">The NBFC Sector Outlook</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              India's NBFC sector stands at an inflection point, driven by structural growth opportunities, 
              regulatory clarity, and technological transformation. While challenges exist, the sector's 
              ability to serve underbanked segments and provide specialized financial services positions 
              it well for sustained growth.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">Positive</div>
                <div className="text-sm text-green-700">Long-term Outlook</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">Selective</div>
                <div className="text-sm text-blue-700">Investment Approach</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">Diversified</div>
                <div className="text-sm text-purple-700">Portfolio Strategy</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4">For Conservative Investors</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Focus on large, established NBFCs with strong parentage</li>
                <li>• Diversify across different business models and segments</li>
                <li>• Monitor asset quality and capital adequacy closely</li>
                <li>• Consider mutual fund route for professional management</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4">For Growth Investors</h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• Look for digital transformation leaders</li>
                <li>• Focus on niche segment specialists with moats</li>
                <li>• Consider emerging opportunities in green finance</li>
                <li>• Evaluate management quality and execution track record</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Important Reminders</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• This analysis is for educational purposes only</li>
              <li>• Always conduct your own research and due diligence</li>
              <li>• Consider your risk tolerance and investment horizon</li>
              <li>• Consult with a SEBI-registered financial advisor</li>
              <li>• Stay updated with regulatory changes and market dynamics</li>
            </ul>
          </div>

          <div className="text-center py-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Thank you for reading!</div>
              <p className="text-gray-600">
                Stay informed with SIP Brewery's comprehensive sector analysis and investment insights.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/community')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore More Articles
              </button>
              <button
                onClick={() => navigate('/fund-comparison')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Compare Funds
              </button>
              <button
                onClick={() => navigate('/sip-calculator')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                SIP Calculator
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogConclusion;
