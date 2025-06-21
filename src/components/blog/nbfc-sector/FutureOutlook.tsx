
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FutureOutlook = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🔮 Future Outlook & Emerging Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-blue-800">2025-2030 Growth Projections</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">18-20%</div>
                <div className="text-sm text-blue-700">Expected CAGR</div>
                <div className="text-xs text-blue-500">Next 5 years</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">₹50L Cr</div>
                <div className="text-sm text-green-700">Projected AUM</div>
                <div className="text-xs text-green-500">By FY30</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">30%</div>
                <div className="text-sm text-purple-700">Credit Market Share</div>
                <div className="text-xs text-purple-500">Target by FY30</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">60%</div>
                <div className="text-sm text-orange-700">Digital Adoption</div>
                <div className="text-xs text-orange-500">Expected penetration</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4">Emerging Opportunities</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">🔋 Green Finance</h4>
                  <p className="text-sm text-green-600">Electric vehicle financing, renewable energy projects, and sustainable business loans</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">🌾 Rural Credit</h4>
                  <p className="text-sm text-green-600">Agricultural equipment finance, farmer producer organizations, and rural entrepreneurship</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">💼 MSME Focus</h4>
                  <p className="text-sm text-green-600">Supply chain financing, working capital solutions, and digitally-enabled lending</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-4">Technology Trends</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">🤖 AI/ML Integration</h4>
                  <p className="text-sm text-purple-600">Automated underwriting, fraud detection, and personalized product offerings</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">🔗 Blockchain Applications</h4>
                  <p className="text-sm text-purple-600">Smart contracts, transparent transactions, and supply chain finance</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">📱 Mobile-First Approach</h4>
                  <p className="text-sm text-purple-600">App-based lending, instant approvals, and seamless customer experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
            <h3 className="font-semibold text-teal-800 mb-4">Strategic Partnerships & Consolidation</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Bank Partnerships</h4>
                <p className="text-sm text-teal-600">Co-lending models expanding across segments</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Fintech Collaboration</h4>
                <p className="text-sm text-teal-600">Technology partnerships for innovation</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Industry Consolidation</h4>
                <p className="text-sm text-teal-600">M&A activity expected to increase</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureOutlook;
