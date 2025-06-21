
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RisksAndChallenges = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          ⚠️ Key Risks & Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-4">Sector-Specific Risks</h3>
              <ul className="space-y-3 text-sm text-red-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-lg">•</span>
                  <div>
                    <strong>Asset-Liability Mismatch:</strong> Borrowing short-term to lend long-term creates liquidity risks
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-lg">•</span>
                  <div>
                    <strong>Credit Risk:</strong> Higher exposure to riskier borrower segments compared to banks
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 text-lg">•</span>
                  <div>
                    <strong>Funding Concentration:</strong> Heavy dependence on wholesale funding sources
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-4">Market Risks</h3>
              <ul className="space-y-3 text-sm text-orange-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-lg">•</span>
                  <div>
                    <strong>Interest Rate Sensitivity:</strong> Rising rates can impact margins and demand
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-lg">•</span>
                  <div>
                    <strong>Economic Cycles:</strong> Vulnerable to economic downturns and credit cycles
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 text-lg">•</span>
                  <div>
                    <strong>Competition:</strong> Intense competition from banks, fintechs, and other NBFCs
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-4">Regulatory & Operational Risks</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Regulatory Changes</h4>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Frequent policy modifications</li>
                  <li>• Compliance cost increases</li>
                  <li>• Capital requirement changes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Technology Disruption</h4>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Fintech competition</li>
                  <li>• Digital transformation costs</li>
                  <li>• Cybersecurity threats</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Operational Challenges</h4>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Collection efficiency issues</li>
                  <li>• Geographic concentration</li>
                  <li>• Talent acquisition challenges</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Risk Mitigation Strategies</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">For Investors</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Diversify across different NBFC types</li>
                  <li>• Focus on quality management teams</li>
                  <li>• Monitor asset quality trends closely</li>
                  <li>• Avoid over-leveraged companies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">For NBFCs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Diversify funding sources</li>
                  <li>• Implement robust risk management</li>
                  <li>• Invest in technology and analytics</li>
                  <li>• Maintain adequate capital buffers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RisksAndChallenges;
