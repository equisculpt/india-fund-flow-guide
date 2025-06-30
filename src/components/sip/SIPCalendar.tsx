
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface UpcomingSIP {
  date: string;
  funds: string[];
  amount: number;
}

interface SIPCalendarProps {
  upcomingSIPs: UpcomingSIP[];
}

const SIPCalendar: React.FC<SIPCalendarProps> = ({ upcomingSIPs }) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming SIP Dates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSIPs.map((upcoming, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900">{upcoming.date}</div>
                  <div className="text-sm text-blue-700">
                    {upcoming.funds.join(', ')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-900">{formatCurrency(upcoming.amount)}</div>
                <div className="text-xs text-blue-600">Auto-debit scheduled</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPCalendar;
