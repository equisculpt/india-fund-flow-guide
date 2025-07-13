
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/api/analyticsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartGridProps {
  chartData: any[];
  fundComparisons: any[];
  sipAmount: number;
}

const ChartGrid = ({ chartData, fundComparisons, sipAmount }: ChartGridProps) => {
  // Use backend-generated chart data if available, otherwise show loading
  const displayData = chartData || [];

  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Percentage Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Return']} />
              <Line type="monotone" dataKey="return" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SIP Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`₹${value?.toLocaleString()}`, 'Value']} />
              <Area type="monotone" dataKey="sipValue" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartGrid;
