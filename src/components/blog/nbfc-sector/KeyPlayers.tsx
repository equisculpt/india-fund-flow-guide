
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KeyPlayers = () => {
  const topNBFCs = [
    { name: 'Bajaj Finance', aum: '3.1', segment: 'Consumer Finance', strength: 'Digital Leadership' },
    { name: 'Shriram Finance', aum: '2.1', segment: 'Vehicle Finance', strength: 'Rural Reach' },
    { name: 'Mahindra Finance', aum: '1.1', segment: 'Vehicle Finance', strength: 'Auto Ecosystem' },
    { name: 'Cholamandalam Finance', aum: '1.0', segment: 'Vehicle/Home Finance', strength: 'Diversified Portfolio' },
    { name: 'Tata Capital', aum: '0.8', segment: 'Diversified', strength: 'Tata Group Brand' },
    { name: 'L&T Finance', aum: '0.7', segment: 'Infrastructure Finance', strength: 'Project Finance' },
  ];

  const emergingPlayers = [
    { name: 'Payme India', focus: 'Digital Lending', growth: '85%' },
    { name: 'Lendingkart', focus: 'MSME Finance', growth: '70%' },
    { name: 'Capital Float', focus: 'Working Capital', growth: '65%' },
    { name: 'FlexiLoans', focus: 'SME Loans', growth: '60%' },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          🏆 Key Players & Market Leaders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Top NBFCs */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Top NBFCs by AUM (₹ Lakh Crore)</h3>
            <div className="grid gap-4">
              {topNBFCs.map((nbfc, index) => (
                <div key={nbfc.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{nbfc.name}</div>
                      <div className="text-sm text-gray-600">{nbfc.segment}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-blue-600">₹{nbfc.aum}L Cr</div>
                    <div className="text-xs text-gray-500">{nbfc.strength}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Share Visualization */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg mb-4">Market Concentration</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Top 5 NBFCs</span>
                <span className="text-sm font-bold text-blue-600">42% Market Share</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{width: '42%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Top 10 NBFCs</span>
                <span className="text-sm font-bold text-green-600">65% Market Share</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{width: '65%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Remaining NBFCs</span>
                <span className="text-sm font-bold text-gray-600">35% Market Share</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gray-400 h-3 rounded-full" style={{width: '35%'}}></div>
              </div>
            </div>
          </div>

          {/* Emerging Players */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 text-green-800">Emerging Digital Players</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {emergingPlayers.map((player) => (
                <div key={player.name} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-gray-900">{player.name}</div>
                    <div className="text-green-600 font-bold text-sm">+{player.growth}</div>
                  </div>
                  <div className="text-sm text-gray-600">{player.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Dynamics */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">Consolidation</div>
              <div className="text-sm text-purple-700">Large players gaining market share</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">Innovation</div>
              <div className="text-sm text-orange-700">Digital transformation accelerating</div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-teal-600">Partnerships</div>
              <div className="text-sm text-teal-700">Co-lending with banks increasing</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyPlayers;
