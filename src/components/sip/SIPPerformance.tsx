
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';

interface SIPPerformanceProps {
  onDownload: (type: string) => void;
}

const SIPPerformance: React.FC<SIPPerformanceProps> = ({ onDownload }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>SIP Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-medium">Average XIRR</span>
              <span className="font-bold text-green-600 text-xl">18.8%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">Platform Percentile</span>
              <span className="font-bold text-blue-600">76th</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="font-medium">Consistency Score</span>
              <span className="font-bold text-purple-600">95%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
              <span className="font-medium">Best Performing SIP</span>
              <span className="font-bold text-orange-600">HDFC Top 100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SIP Streaks & Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="font-semibold text-yellow-900">12-Month Streak</div>
                <div className="text-sm text-yellow-700">Eligible for loyalty bonus</div>
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900 mb-1">₹500</div>
              <div className="text-sm text-blue-700">Consistency Reward Earned</div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => onDownload('performance')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Performance Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPPerformance;
