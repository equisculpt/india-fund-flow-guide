
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Star, TrendingUp, TrendingDown, BarChart3, Calculator, Search, Plus, X } from 'lucide-react';
import { EnhancedNAVDataService } from '@/services/enhancedNAVDataService';

interface ChartDataPoint {
  date: string;
  fundPercentage: number;
  fundSIPValue: number;
  benchmarkPercentage?: number;
  benchmarkSIPValue?: number;
  comparison1Percentage?: number;
  comparison1SIPValue?: number;
  comparison2Percentage?: number;
  comparison2SIPValue?: number;
  formattedDate: string;
}

interface FundComparison {
  id: string;
  name: string;
  schemeCode: string;
  color: string;
  enabled: boolean;
}

interface AdvancedFundChartProps {
  primaryFund: {
    schemeCode: string;
    schemeName: string;
    category: string;
    nav: number;
    trendScore?: number;
  };
  className?: string;
}

const AdvancedFundChart = ({ primaryFund, className = "" }: AdvancedFundChartProps) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [period, setPeriod] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y'>('1Y');
  const [loading, setLoading] = useState(true);
  const [sipAmount, setSipAmount] = useState<number>(100000);
  const [showSIPChart, setShowSIPChart] = useState(false);
  const [fundComparisons, setFundComparisons] = useState<FundComparison[]>([
    { 
      id: 'primary', 
      name: primaryFund.schemeName, 
      schemeCode: primaryFund.schemeCode,
      color: '#3B82F6', 
      enabled: true 
    }
  ]);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFundSearch, setShowFundSearch] = useState(false);

  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  useEffect(() => {
    loadChartData();
  }, [primaryFund, period, sipAmount, fundComparisons]);

  const loadAvailableFunds = async () => {
    try {
      const funds = await navService.getAdvancedAnalysis();
      // Filter to show only funds from the same category for better comparison
      const categoryFunds = funds.filter(fund => 
        fund.category === primaryFund.category && 
        fund.schemeCode !== primaryFund.schemeCode
      );
      setAvailableFunds(categoryFunds);
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  const loadChartData = async () => {
    setLoading(true);
    try {
      const days = getDaysForPeriod(period);
      const data: ChartDataPoint[] = [];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Generate monthly SIP dates
      const sipDates: Date[] = [];
      let currentSipDate = new Date(startDate);
      while (currentSipDate <= new Date()) {
        sipDates.push(new Date(currentSipDate));
        currentSipDate.setMonth(currentSipDate.getMonth() + 1);
      }

      // Initialize fund data for all comparison funds
      const fundData: Record<string, {
        navHistory: Array<{date: Date, nav: number}>;
        sipInvestments: Array<{date: Date, amount: number, nav: number, units: number}>;
        startNAV: number;
      }> = {};

      // Generate data for each fund
      for (const fund of fundComparisons.filter(f => f.enabled)) {
        const startNAV = await generateStartNAV(fund.schemeCode, fund.name);
        fundData[fund.id] = {
          navHistory: [],
          sipInvestments: [],
          startNAV: startNAV
        };

        // Generate NAV history
        let currentNAV = startNAV;
        const dailyVolatility = getCategoryVolatility(primaryFund.category);
        const trendDirection = Math.random() > 0.3 ? 1 : -1;

        for (let i = 0; i <= days; i += Math.max(1, Math.floor(days / 100))) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          const randomChange = (Math.random() - 0.5) * dailyVolatility;
          const trendChange = trendDirection * 0.001 * (fund.id === 'primary' ? (primaryFund.trendScore || 5) : 6);
          currentNAV *= (1 + randomChange + trendChange);
          
          fundData[fund.id].navHistory.push({
            date: new Date(currentDate),
            nav: currentNAV
          });
        }

        // Calculate SIP investments
        let totalUnits = 0;
        for (const sipDate of sipDates) {
          const navOnDate = findNAVOnDate(fundData[fund.id].navHistory, sipDate);
          if (navOnDate > 0) {
            const units = sipAmount / navOnDate;
            totalUnits += units;
            fundData[fund.id].sipInvestments.push({
              date: sipDate,
              amount: sipAmount,
              nav: navOnDate,
              units: units
            });
          }
        }
      }

      // Generate chart data points
      const primaryFundData = fundData['primary'];
      if (!primaryFundData) return;

      for (let i = 0; i < primaryFundData.navHistory.length; i += Math.max(1, Math.floor(primaryFundData.navHistory.length / 50))) {
        const navPoint = primaryFundData.navHistory[i];
        
        const dataPoint: ChartDataPoint = {
          date: navPoint.date.toISOString().split('T')[0],
          fundPercentage: ((navPoint.nav - primaryFundData.startNAV) / primaryFundData.startNAV) * 100,
          fundSIPValue: calculateSIPValueAtDate(primaryFundData.sipInvestments, navPoint.date, navPoint.nav),
          formattedDate: navPoint.date.toLocaleDateString()
        };

        // Add comparison fund data
        fundComparisons.forEach((fund, index) => {
          if (fund.enabled && fund.id !== 'primary' && fundData[fund.id]) {
            const compFundData = fundData[fund.id];
            const compNavPoint = findNAVOnDate(compFundData.navHistory, navPoint.date);
            
            if (index === 1) {
              dataPoint.benchmarkPercentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
              dataPoint.benchmarkSIPValue = calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
            } else if (index === 2) {
              dataPoint.comparison1Percentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
              dataPoint.comparison1SIPValue = calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
            } else if (index === 3) {
              dataPoint.comparison2Percentage = ((compNavPoint - compFundData.startNAV) / compFundData.startNAV) * 100;
              dataPoint.comparison2SIPValue = calculateSIPValueAtDate(compFundData.sipInvestments, navPoint.date, compNavPoint);
            }
          }
        });

        data.push(dataPoint);
      }

      setChartData(data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateStartNAV = async (schemeCode: string, schemeName: string): Promise<number> => {
    // Generate realistic starting NAV based on fund type and name
    if (schemeName.toLowerCase().includes('large')) return 50 + Math.random() * 100;
    if (schemeName.toLowerCase().includes('mid')) return 30 + Math.random() * 80;
    if (schemeName.toLowerCase().includes('small')) return 20 + Math.random() * 60;
    return 40 + Math.random() * 90;
  };

  const findNAVOnDate = (navHistory: Array<{date: Date, nav: number}>, targetDate: Date): number => {
    const closestNav = navHistory.reduce((prev, curr) => {
      return Math.abs(curr.date.getTime() - targetDate.getTime()) < Math.abs(prev.date.getTime() - targetDate.getTime()) ? curr : prev;
    });
    return closestNav?.nav || 0;
  };

  const calculateSIPValueAtDate = (sipInvestments: Array<{date: Date, amount: number, nav: number, units: number}>, targetDate: Date, currentNAV: number): number => {
    const investmentsTillDate = sipInvestments.filter(inv => inv.date <= targetDate);
    const totalUnits = investmentsTillDate.reduce((sum, inv) => sum + inv.units, 0);
    return totalUnits * currentNAV;
  };

  const getDaysForPeriod = (period: string): number => {
    switch (period) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      case '3Y': return 1095;
      case '5Y': return 1825;
      default: return 365;
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

  const addFundForComparison = (fund: any) => {
    if (fundComparisons.length >= 4) return; // Limit to 4 funds
    
    const newComparison: FundComparison = {
      id: `comparison_${fundComparisons.length}`,
      name: fund.schemeName,
      schemeCode: fund.schemeCode,
      color: ['#10B981', '#F59E0B', '#8B5CF6'][fundComparisons.length - 1],
      enabled: true
    };
    
    setFundComparisons([...fundComparisons, newComparison]);
    setShowFundSearch(false);
    setSearchQuery('');
  };

  const removeFund = (fundId: string) => {
    if (fundId === 'primary' || fundComparisons.length <= 1) return;
    setFundComparisons(fundComparisons.filter(fund => fund.id !== fundId));
  };

  const filteredFunds = availableFunds.filter(fund =>
    fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{new Date(data.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}:</span>
            <span className="font-medium">
              {showSIPChart 
                ? `₹${entry.value.toLocaleString()}`
                : `${entry.value >= 0 ? '+' : ''}${entry.value.toFixed(2)}%`
              }
            </span>
          </div>
        ))}
      </div>
    );
  };

  const calculatePerformance = (data: ChartDataPoint[]) => {
    if (data.length < 2) return { return: 0, volatility: 0, sipReturn: 0 };
    
    const lastPoint = data[data.length - 1];
    const returnPct = lastPoint.fundPercentage;
    
    const returns = data.slice(1).map((point, i) =>
      point.fundPercentage - data[i].fundPercentage
    );
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance);
    
    // Calculate SIP returns
    const totalInvested = sipAmount * Math.floor(getDaysForPeriod(period) / 30);
    const sipReturn = totalInvested > 0 ? ((lastPoint.fundSIPValue - totalInvested) / totalInvested) * 100 : 0;
    
    return { return: returnPct, volatility, sipReturn, totalInvested, sipValue: lastPoint.fundSIPValue };
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
              Advanced Fund Performance Analysis
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              {primaryFund.trendScore && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{primaryFund.trendScore}/10</span>
                  <span className="text-sm text-muted-foreground">Trend Score</span>
                </div>
              )}
              <Badge variant={performance.return >= 0 ? "default" : "destructive"}>
                {performance.return >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {performance.return.toFixed(2)}% ({period})
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showSIPChart ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSIPChart(!showSIPChart)}
            >
              <Calculator className="h-4 w-4 mr-2" />
              {showSIPChart ? "% Returns" : "SIP Value"}
            </Button>
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
                <SelectItem value="5Y">5Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* SIP Configuration */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="sipAmount">Monthly SIP Amount:</Label>
              <Input
                id="sipAmount"
                type="number"
                value={sipAmount}
                onChange={(e) => setSipAmount(Number(e.target.value))}
                className="w-32"
                min="1000"
                step="1000"
              />
            </div>
          </div>
        </div>

        {/* Fund Comparison Management */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Comparing Funds:</span>
            {fundComparisons.length < 4 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFundSearch(!showFundSearch)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Fund
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {fundComparisons.map((fund) => (
              <Badge key={fund.id} variant="secondary" className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: fund.color }}
                />
                <span className="max-w-32 truncate">{fund.name}</span>
                {fund.id !== 'primary' && (
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeFund(fund.id)}
                  />
                )}
              </Badge>
            ))}
          </div>

          {/* Fund Search */}
          {showFundSearch && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search funds by name or type first few letters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {filteredFunds.slice(0, 10).map((fund) => (
                  <div
                    key={fund.schemeCode}
                    className="p-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
                    onClick={() => addFundForComparison(fund)}
                  >
                    <div className="font-medium">{fund.schemeName.substring(0, 60)}...</div>
                    <div className="text-gray-500 text-xs">{fund.category} • {fund.amcName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                tickFormatter={(value) => 
                  showSIPChart 
                    ? `₹${(value / 100000).toFixed(1)}L`
                    : `${value.toFixed(1)}%`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Primary Fund Line */}
              <Line
                type="monotone"
                dataKey={showSIPChart ? "fundSIPValue" : "fundPercentage"}
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
                name={fundComparisons[0]?.name || "Primary Fund"}
              />
              
              {/* Comparison Lines */}
              {fundComparisons.slice(1).map((fund, index) => {
                if (!fund.enabled) return null;
                
                const dataKey = showSIPChart 
                  ? index === 0 ? "benchmarkSIPValue" : index === 1 ? "comparison1SIPValue" : "comparison2SIPValue"
                  : index === 0 ? "benchmarkPercentage" : index === 1 ? "comparison1Percentage" : "comparison2Percentage";
                
                return (
                  <Line
                    key={fund.id}
                    type="monotone"
                    dataKey={dataKey}
                    stroke={fund.color}
                    strokeWidth={2}
                    dot={false}
                    name={fund.name.substring(0, 30) + '...'}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Stats */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-muted-foreground">Current NAV</div>
            <div className="text-xl font-bold text-blue-600">₹{primaryFund.nav.toFixed(4)}</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-muted-foreground">Performance ({period})</div>
            <div className={`text-xl font-bold ${performance.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performance.return.toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-muted-foreground">SIP Returns</div>
            <div className={`text-xl font-bold ${performance.sipReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {performance.sipReturn.toFixed(2)}%
            </div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-sm text-muted-foreground">SIP Value</div>
            <div className="text-xl font-bold text-orange-600">₹{performance.sipValue?.toLocaleString() || '0'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFundChart;
