
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFundIRR, useSIPReturns } from '@/hooks/useMutualFundAnalytics';
import { format, subYears, subMonths } from 'date-fns';

const IRRCalculator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [selectedFund, setSelectedFund] = useState('');

  const getPeriodDates = (period: string) => {
    const endDate = new Date();
    let startDate: Date;

    switch (period) {
      case '6M':
        startDate = subMonths(endDate, 6);
        break;
      case '1Y':
        startDate = subYears(endDate, 1);
        break;
      case '3Y':
        startDate = subYears(endDate, 3);
        break;
      case '5Y':
        startDate = subYears(endDate, 5);
        break;
      default:
        startDate = subYears(endDate, 1);
    }

    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    };
  };

  const { startDate, endDate } = getPeriodDates(selectedPeriod);
  
  const { data: irrData, isLoading: irrLoading } = useFundIRR(
    selectedFund, 
    startDate, 
    endDate
  );

  const { data: sipReturns, isLoading: sipLoading } = useSIPReturns(
    'user-id', // This should come from auth context
    selectedFund,
    startDate,
    endDate
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>IRR & XIRR Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Select Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6M">6 Months</SelectItem>
                  <SelectItem value="1Y">1 Year</SelectItem>
                  <SelectItem value="3Y">3 Years</SelectItem>
                  <SelectItem value="5Y">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Select Fund</label>
              <Select value={selectedFund} onValueChange={setSelectedFund}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a fund" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="120601">SBI Small Cap Fund</SelectItem>
                  <SelectItem value="118989">HDFC Top 100 Fund</SelectItem>
                  <SelectItem value="101206">Axis Long Term Equity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedFund && (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {irrLoading ? '...' : `${irrData?.toFixed(2) || '0'}%`}
                    </div>
                    <div className="text-sm text-gray-600">Lumpsum IRR</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {sipLoading ? '...' : `${sipReturns?.xirr?.toFixed(2) || '0'}%`}
                    </div>
                    <div className="text-sm text-gray-600">SIP XIRR</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {sipLoading ? '...' : `₹${sipReturns?.absolute_returns?.toLocaleString() || '0'}`}
                    </div>
                    <div className="text-sm text-gray-600">Absolute Returns</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IRRCalculator;
