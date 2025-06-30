
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Calendar, TrendingUp, Zap } from 'lucide-react';

interface SIPOverviewCardsProps {
  activeSIPsCount: number;
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
}

const SIPOverviewCards: React.FC<SIPOverviewCardsProps> = ({
  activeSIPsCount,
  totalInvested,
  currentValue,
  totalReturns
}) => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Active SIPs</p>
              <p className="text-3xl font-bold text-blue-900">{activeSIPsCount}</p>
            </div>
            <Play className="h-10 w-10 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Monthly Investment</p>
              <p className="text-3xl font-bold text-green-900">₹10,000</p>
            </div>
            <Calendar className="h-10 w-10 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Total Invested</p>
              <p className="text-3xl font-bold text-purple-900">₹{totalInvested.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-10 w-10 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700 font-medium">Current Value</p>
              <p className="text-3xl font-bold text-emerald-900 mb-1">₹{currentValue.toLocaleString()}</p>
              <span className="text-sm text-emerald-700 bg-emerald-200 px-2 py-1 rounded-full">
                +{totalReturns}%
              </span>
            </div>
            <div className="text-right">
              <Zap className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPOverviewCards;
