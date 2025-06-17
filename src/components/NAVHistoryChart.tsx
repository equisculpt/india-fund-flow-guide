
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FundDataService } from '@/services/fundDataService';

interface NAVHistoryChartProps {
  fundId: string;
  fundName: string;
}

const NAVHistoryChart = ({ fundId, fundName }: NAVHistoryChartProps) => {
  const [period, setPeriod] = useState<'1M' | '3M' | '6M' | '1Y'>('1Y');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoricalData = async () => {
      setLoading(true);
      try {
        console.log('Loading historical NAV for fund:', fundId);
        
        const days = period === '1M' ? 30 : period === '3M' ? 90 : period === '6M' ? 180 : 365;
        const historicalData = await FundDataService.fetchHistoricalNAV(fundId, days);
        
        console.log('Historical data received:', historicalData.length, 'records');
        
        // Transform data for chart
        const transformedData = historicalData.map((item: any) => ({
          date: item.date,
          nav: parseFloat(item.nav),
          formattedDate: new Date(item.date.split('-').reverse().join('-')).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short'
          })
        })).reverse(); // Reverse to show chronological order
        
        setChartData(transformedData);
        console.log('Chart data prepared:', transformedData.length, 'points');
      } catch (error) {
        console.error('Error loading historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (fundId) {
      loadHistoricalData();
    }
  }, [fundId, period]);

  const calculateReturns = () => {
    if (chartData.length < 2) return { return: 0, volatility: 0 };
    
    const firstNav = chartData[0]?.nav || 0;
    const lastNav = chartData[chartData.length - 1]?.nav || 0;
    
    if (firstNav === 0) return { return: 0, volatility: 0 };
    
    const totalReturn = ((lastNav - firstNav) / firstNav) * 100;
    
    return { return: totalReturn, volatility: 0 };
  };

  const performance = calculateReturns();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{fundName} - NAV Performance</CardTitle>
          <div className="flex gap-2 items-center">
            <Select value={period} onValueChange={(value: '1M' | '3M' | '6M' | '1Y') => setPeriod(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
              </SelectContent>
            </Select>
            <div className={`text-sm font-semibold ${performance.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performance.return >= 0 ? '+' : ''}{performance.return.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-muted-foreground">Loading NAV history...</div>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">No historical data available</div>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  domain={['dataMin - 0.1', 'dataMax + 0.1']}
                  tickFormatter={(value) => `₹${value.toFixed(2)}`}
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  tickLine={{ stroke: '#e0e0e0' }}
                />
                <Tooltip 
                  labelFormatter={(label, payload) => {
                    const dataPoint = payload?.[0]?.payload;
                    return dataPoint ? new Date(dataPoint.date.split('-').reverse().join('-')).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : label;
                  }}
                  formatter={(value: number) => [`₹${value.toFixed(4)}`, 'NAV']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nav" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NAVHistoryChart;
