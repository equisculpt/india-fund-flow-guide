
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TEST_USER_DATA } from '@/services/testData';

interface AllocationTabProps {
  formatCurrency: (amount: number) => string;
}

const AllocationTab = ({ formatCurrency }: AllocationTabProps) => {
  const { portfolioAnalytics } = TEST_USER_DATA;

  const allocationData = [
    { name: 'Large Cap', value: 60100, color: '#3B82F6' },
    { name: 'Small Cap', value: 42350, color: '#10B981' }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Investment Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">Risk Score</span>
              <span className="font-bold text-blue-600">{portfolioAnalytics.riskScore}/10</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-medium">Peer Ranking</span>
              <span className="font-bold text-green-600">Top {100 - portfolioAnalytics.peerPercentile}%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
              <span className="font-medium">Volatility</span>
              <span className="font-bold text-purple-600">{portfolioAnalytics.volatility}%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
              <span className="font-medium">Sharpe Ratio</span>
              <span className="font-bold text-orange-600">{portfolioAnalytics.sharpeRatio}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllocationTab;
