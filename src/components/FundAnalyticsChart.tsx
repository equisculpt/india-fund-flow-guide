
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNAVHistory, useFundIRR } from '@/hooks/useMutualFundAnalytics';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface FundAnalyticsChartProps {
  fundId: string;
  fundName: string;
}

const FundAnalyticsChart = ({ fundId, fundName }: FundAnalyticsChartProps) => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'custom'>('monthly');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
  const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;

  const { data: navHistory, isLoading } = useNAVHistory(
    fundId, 
    period, 
    startDate, 
    endDate
  );

  const { data: irrData } = useFundIRR(
    fundId,
    startDate || format(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    endDate || format(new Date(), 'yyyy-MM-dd')
  );

  const chartData = navHistory?.map(item => ({
    date: format(new Date(item.nav_date), 'MMM dd'),
    nav: parseFloat(item.nav_value.toString()),
    fullDate: item.nav_date
  })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{fundName} - NAV Chart</span>
          <div className="flex gap-2">
            <Select value={period} onValueChange={(value: 'weekly' | 'monthly' | 'custom') => setPeriod(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {period === 'custom' && (
              <DatePickerWithRange 
                dateRange={dateRange} 
                onDateRangeChange={setDateRange}
              />
            )}
          </div>
        </CardTitle>
        {irrData && (
          <div className="text-sm text-muted-foreground">
            IRR: <span className="font-semibold text-green-600">{irrData.toFixed(2)}%</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={(value) => `₹${value.toFixed(2)}`}
                />
                <Tooltip 
                  labelFormatter={(label, payload) => {
                    const dataPoint = payload?.[0]?.payload;
                    return dataPoint ? format(new Date(dataPoint.fullDate), 'PPP') : label;
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(4)}`, 'NAV']}
                />
                <Line 
                  type="monotone" 
                  dataKey="nav" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundAnalyticsChart;
