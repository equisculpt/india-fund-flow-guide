
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Star, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { EnhancedNAVDataService } from '@/services/enhancedNAVDataService';

interface ChartDataPoint {
  date: string;
  fundNAV: number;
  benchmark?: number;
  comparison1?: number;
  comparison2?: number;
  formattedDate: string;
}

interface FundComparison {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
}

interface AdvancedFundChartProps {
  primaryFund: {
    schemeCode: string;
    schemeName: string;
    category: string;
    nav: number;
    aiScore?: number;
  };
  className?: string;
}

const AdvancedFundChart = ({ primaryFund, className = "" }: AdvancedFundChartProps) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [period, setPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y'>('6M');
  const [loading, setLoading] = useState(true);
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);
  const [selectedBenchmark, setSelectedBenchmark] = useState<string>('');
  const [fundComparisons, setFundComparisons] = useState<FundComparison[]>([
    { id: 'benchmark', name: 'Benchmark Index', color: '#10B981', enabled: true },
    { id: 'comparison1', name: 'Top Performer', color: '#F59E0B', enabled: false },
    { id: 'comparison2', name: 'Category Average', color: '#8B5CF6', enabled: false }
  ]);

  useEffect(() => {
    loadChartData();
    loadBenchmarkData();
  }, [primaryFund, period]);

  const loadBenchmarkData = async () => {
    try {
      const data = await EnhancedNAVDataService.getRealBenchmarkData();
      setBenchmarkData(data);
      
      // Auto-select appropriate benchmark based on fund category
      const appropriateBenchmark = data.find(b => 
        b.sector === primaryFund.category || 
        (primaryFund.category.includes('Large') && b.name.includes('NIFTY 50')) ||
        (primaryFund.category.includes('Mid') && b.name.includes('MIDCAP')) ||
        (primaryFund.category.includes('Small') && b.name.includes('SMALLCAP'))
      );
      
      if (appropriateBenchmark) {
        setSelectedBenchmark(appropriateBenchmark.symbol);
      }
    } catch (error) {
      console.error('Error loading benchmark data:', error);
    }
  };

  const loadChartData = async () => {
    setLoading(true);
    try {
      // Generate historical data points based on period
      const days = getDaysForPeriod(period);
      const data: ChartDataPoint[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Generate realistic NAV progression
      let currentNAV = primaryFund.nav * (0.85 + Math.random() * 0.15); // Start 15% lower on average
      const dailyVolatility = getCategoryVolatility(primaryFund.category);
      const trendDirection = Math.random() > 0.3 ? 1 : -1; // 70% chance of upward trend
      
      for (let i = 0; i <= days; i += Math.max(1, Math.floor(days / 50))) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        // Simulate realistic NAV movement
        const randomChange = (Math.random() - 0.5) * dailyVolatility;
        const trendChange = trendDirection * 0.001 * (primaryFund.aiScore || 5);
        currentNAV *= (1 + randomChange + trendChange);
        
        // Generate benchmark data (simulated)
        const benchmarkValue = generateBenchmarkValue(currentDate, primaryFund.category);
        
        data.push({
          date: currentDate.toISOString().split('T')[0],
          fundNAV: Number(currentNAV.toFixed(4)),
          benchmark: benchmarkValue,
          comparison1: currentNAV * (0.95 + Math.random() * 0.1), // Top performer simulation
          comparison2: currentNAV * (0.98 + Math.random() * 0.04), // Category average simulation
          formattedDate: currentDate.toLocaleDateString()
        });
      }

      // Ensure the last point matches current NAV
      if (data.length > 0) {
        data[data.length - 1].fundNAV = primaryFund.nav;
      }

      setChartData(data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysForPeriod = (period: string): number => {
    switch (period) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      case '3Y': return 1095;
      default: return 180;
    }
  };

  const getCategoryVolatility = (category: string): number => {
    const volatilityMap: Record<string, number> = {
      'Large Cap': 0.008,
      'Mid Cap': 0.012,
      'Small Cap': 0.018,
      'ELSS': 0.010,
      'Technology': 0.015,
      'Healthcare': 0.009
    };
    return volatilityMap[category] || 0.010;
  };

  const generateBenchmarkValue = (date: Date, category: string): number => {
    // Simulate benchmark index value
    const baseValue = category.includes('Large') ? 24800 : 
                     category.includes('Mid') ? 58500 : 
                     category.includes('Small') ? 17200 : 25000;
    
    const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    const variation = Math.sin(daysSinceEpoch / 30) * 0.05 + Math.random() * 0.02 - 0.01;
    
    return baseValue * (1 + variation);
  };

  const toggleComparison = (comparisonId: string) => {
    setFundComparisons(prev =>
      prev.map(comp =>
        comp.id === comparisonId
          ? { ...comp, enabled: !comp.enabled }
          : comp
      )
    );
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0 };
    
    const firstValue = data[0].fundNAV;
    const lastValue = data[data.length - 1].fundNAV;
    const returnPct = ((lastValue - firstValue) / firstValue) * 100;
    
    // Calculate simple volatility
    const returns = data.slice(1).map((point, i) =>
      ((point.fundNAV - data[i].fundNAV) / data[i].fundNAV) * 100
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    
    return { return: returnPct, volatility };
  };

  const performance = calculatePerformance(chartData);

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading advanced chart...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              {primaryFund.schemeName}
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              {primaryFund.aiScore && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{primaryFund.aiScore}/10</span>
                  <span className="text-sm text-muted-foreground">AI Score</span>
                </div>
              )}
              <Badge variant={performance.return >= 0 ? "default" : "destructive"}>
                {performance.return >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {performance.return.toFixed(2)}% ({period})
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="6M">6M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
                <SelectItem value="3Y">3Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Chart Controls */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium">Compare with:</span>
            {fundComparisons.map(comp => (
              <div key={comp.id} className="flex items-center space-x-2">
                <Checkbox
                  id={comp.id}
                  checked={comp.enabled}
                  onCheckedChange={() => toggleComparison(comp.id)}
                />
                <label htmlFor={comp.id} className="text-sm cursor-pointer">
                  {comp.name}
                </label>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: comp.color }}
                />
              </div>
            ))}
          </div>
          
          {benchmarkData.length > 0 && (
            <Select value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select benchmark" />
              </SelectTrigger>
              <SelectContent>
                {benchmarkData.map(benchmark => (
                  <SelectItem key={benchmark.symbol} value={benchmark.symbol}>
                    {benchmark.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Advanced Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(value) => `₹${value.toFixed(0)}`}
              />
              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                formatter={(value: number, name: string) => [
                  `₹${value.toFixed(4)}`,
                  name === 'fundNAV' ? primaryFund.schemeName :
                  name === 'benchmark' ? 'Benchmark' :
                  name === 'comparison1' ? 'Top Performer' :
                  name === 'comparison2' ? 'Category Average' : name
                ]}
              />
              <Legend />
              
              {/* Primary Fund Line */}
              <Line
                type="monotone"
                dataKey="fundNAV"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 2 }}
                name={primaryFund.schemeName}
              />
              
              {/* Benchmark Line */}
              {fundComparisons.find(c => c.id === 'benchmark')?.enabled && (
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Benchmark"
                />
              )}
              
              {/* Comparison Lines */}
              {fundComparisons.find(c => c.id === 'comparison1')?.enabled && (
                <Line
                  type="monotone"
                  dataKey="comparison1"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                  name="Top Performer"
                />
              )}
              
              {fundComparisons.find(c => c.id === 'comparison2')?.enabled && (
                <Line
                  type="monotone"
                  dataKey="comparison2"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                  name="Category Average"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-muted-foreground">Current NAV</div>
            <div className="text-xl font-bold text-blue-600">₹{primaryFund.nav.toFixed(4)}</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-muted-foreground">Return ({period})</div>
            <div className={`text-xl font-bold ${performance.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performance.return.toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-muted-foreground">Volatility</div>
            <div className="text-xl font-bold text-purple-600">{performance.volatility.toFixed(2)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFundChart;
