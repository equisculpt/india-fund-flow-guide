
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EnhancedNAVDataService, ExtendedNAVHistory, SIPCalculationResult } from '@/services/enhancedNAVDataService';
import { format } from 'date-fns';
import { Plus, X, TrendingUp, Calculator } from 'lucide-react';

interface EnhancedFundChartProps {
  initialFundCode: string;
  initialFundName: string;
}

interface ComparisonFund {
  code: string;
  name: string;
  color: string;
}

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316'];

const EnhancedFundChart = ({ initialFundCode, initialFundName }: EnhancedFundChartProps) => {
  const [period, setPeriod] = useState<'1W' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | '10Y'>('3M');
  const [comparisonFunds, setComparisonFunds] = useState<ComparisonFund[]>([
    { code: initialFundCode, name: initialFundName, color: COLORS[0] }
  ]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [sipReturns, setSipReturns] = useState<Record<string, SIPCalculationResult | null>>({});
  const [lumpsumReturns, setLumpsumReturns] = useState<Record<string, { absoluteReturn: number; irrReturn: number } | null>>({});
  const [loading, setLoading] = useState(false);
  const [showSIPData, setShowSIPData] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  useEffect(() => {
    loadChartData();
  }, [period, comparisonFunds]);

  const loadAvailableFunds = async () => {
    try {
      const funds = await navService.getAdvancedAnalysis();
      setAvailableFunds(funds.slice(0, 50));
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  const loadChartData = async () => {
    if (comparisonFunds.length === 0) return;
    
    setLoading(true);
    try {
      const allNavData: Record<string, ExtendedNAVHistory[]> = {};
      const allSipReturns: Record<string, SIPCalculationResult | null> = {};
      const allLumpsumReturns: Record<string, { absoluteReturn: number; irrReturn: number } | null> = {};

      for (const fund of comparisonFunds) {
        const navHistory = await navService.getExtendedNAVHistory(fund.code, period);
        allNavData[fund.code] = navHistory;

        const sipReturn = await navService.calculateSIPReturns(fund.code, period, 10000);
        allSipReturns[fund.code] = sipReturn;

        const lumpsumReturn = await navService.calculateLumpsumReturns(fund.code, period);
        allLumpsumReturns[fund.code] = lumpsumReturn;
      }

      const mergedData = mergeChartData(allNavData);
      setChartData(mergedData);
      setSipReturns(allSipReturns);
      setLumpsumReturns(allLumpsumReturns);

    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const mergeChartData = (allNavData: Record<string, ExtendedNAVHistory[]>) => {
    const allDates = new Set<string>();
    
    Object.values(allNavData).forEach(navHistory => {
      navHistory.forEach(item => allDates.add(item.nav_date));
    });

    const sortedDates = Array.from(allDates).sort();
    
    // Calculate percentage changes
    const fundStartValues: Record<string, number> = {};
    comparisonFunds.forEach(fund => {
      const navData = allNavData[fund.code] || [];
      if (navData.length > 0) {
        fundStartValues[fund.code] = Number(navData[navData.length - 1].nav_value);
      }
    });
    
    return sortedDates.map(date => {
      const dataPoint: any = {
        date: format(new Date(date), 'MMM dd, yyyy'),
        fullDate: date
      };

      comparisonFunds.forEach(fund => {
        const navData = allNavData[fund.code] || [];
        const navItem = navData.find(item => item.nav_date === date);
        if (navItem) {
          const navValue = Number(navItem.nav_value);
          dataPoint[fund.code] = navValue;
          
          // Calculate percentage change from start
          const startValue = fundStartValues[fund.code];
          if (startValue) {
            const percentChange = ((navValue - startValue) / startValue) * 100;
            dataPoint[`${fund.code}_percent`] = Number(percentChange.toFixed(2));
          }
        }
      });

      return dataPoint;
    });
  };

  const addFundForComparison = (fundCode: string, fundName: string) => {
    if (comparisonFunds.length >= 6) return;
    
    const newFund: ComparisonFund = {
      code: fundCode,
      name: fundName,
      color: COLORS[comparisonFunds.length]
    };
    
    setComparisonFunds([...comparisonFunds, newFund]);
  };

  const removeFund = (fundCode: string) => {
    if (comparisonFunds.length <= 1) return;
    setComparisonFunds(comparisonFunds.filter(fund => fund.code !== fundCode));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0]?.payload;
    if (!data) return null;

    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{format(new Date(data.fullDate), 'PPP')}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}:</span>
            <span className="font-medium">
              {showPercentage 
                ? `${entry.value >= 0 ? '+' : ''}${entry.value.toFixed(2)}%`
                : `₹${entry.value.toFixed(4)}`
              }
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Enhanced Fund Performance Chart</span>
            <div className="flex gap-2">
              <Button
                variant={showPercentage ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPercentage(!showPercentage)}
              >
                {showPercentage ? 'Show Value' : 'Show %'}
              </Button>
              <Button
                variant={showSIPData ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSIPData(!showSIPData)}
              >
                <Calculator className="h-4 w-4 mr-2" />
                {showSIPData ? 'Hide' : 'Show'} SIP Data
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Period Selection */}
            <div className="flex gap-2 flex-wrap">
              {(['1W', '1M', '3M', '6M', '1Y', '3Y', '5Y', '10Y'] as const).map((p) => (
                <Button
                  key={p}
                  variant={period === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            {/* Fund Comparison Management */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Comparing Funds:</span>
                {comparisonFunds.length < 6 && (
                  <Select onValueChange={(value) => {
                    const [code, name] = value.split('|');
                    if (code && name && !comparisonFunds.find(f => f.code === code)) {
                      addFundForComparison(code, name);
                    }
                  }}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Add fund to compare" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFunds
                        .filter(fund => !comparisonFunds.find(f => f.code === fund.schemeCode))
                        .map(fund => (
                          <SelectItem key={fund.schemeCode} value={`${fund.schemeCode}|${fund.schemeName}`}>
                            {fund.schemeName.substring(0, 60)}...
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {comparisonFunds.map((fund, index) => (
                  <Badge key={fund.code} variant="secondary" className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: fund.color }}
                    />
                    <span className="max-w-32 truncate">{fund.name}</span>
                    {comparisonFunds.length > 1 && (
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeFund(fund.code)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>NAV Performance Comparison ({period})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => showPercentage ? `${value.toFixed(1)}%` : `₹${value.toFixed(0)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {comparisonFunds.map((fund) => (
                    <Line
                      key={fund.code}
                      type="monotone"
                      dataKey={showPercentage ? `${fund.code}_percent` : fund.code}
                      stroke={fund.color}
                      strokeWidth={2}
                      name={fund.name.substring(0, 30) + '...'}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Returns Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lumpsum Returns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Lumpsum Investment Returns ({period})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparisonFunds.map((fund) => {
                const returns = lumpsumReturns[fund.code];
                return (
                  <div key={fund.code} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: fund.color }}
                      />
                      <span className="font-medium text-sm">{fund.name.substring(0, 40)}...</span>
                    </div>
                    {returns ? (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Absolute Return:</span>
                          <div className={`font-bold ${returns.absoluteReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returns.absoluteReturn >= 0 ? '+' : ''}{returns.absoluteReturn.toFixed(2)}%
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">IRR (Annualized):</span>
                          <div className={`font-bold ${returns.irrReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {returns.irrReturn >= 0 ? '+' : ''}{returns.irrReturn.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Historical data available tomorrow</div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* SIP Returns */}
        {showSIPData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                SIP Returns (₹10,000/month for {period})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisonFunds.map((fund) => {
                  const returns = sipReturns[fund.code];
                  return (
                    <div key={fund.code} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: fund.color }}
                        />
                        <span className="font-medium text-sm">{fund.name.substring(0, 40)}...</span>
                      </div>
                      {returns ? (
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-600">Invested:</span>
                            <div className="font-bold">₹{returns.total_invested.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Current Value:</span>
                            <div className="font-bold">₹{returns.final_value.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Absolute Return:</span>
                            <div className={`font-bold ${returns.absolute_return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{returns.absolute_return.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">IRR:</span>
                            <div className={`font-bold ${returns.irr_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {returns.irr_percentage >= 0 ? '+' : ''}{returns.irr_percentage.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Historical data available tomorrow</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedFundChart;
