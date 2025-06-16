
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Info, Zap } from "lucide-react";
import { EnhancedNAVDataService, AdvancedNAVAnalysis } from "@/services/enhancedNAVDataService";

const FundDetailsPage = () => {
  const { fundId } = useParams();
  const location = useLocation();
  const [fundData, setFundData] = useState<AdvancedNAVAnalysis | null>(null);
  const [historicalData, setHistoricalData] = useState<Array<{date: string, nav: number}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFundData = async () => {
      try {
        setLoading(true);
        
        // Check if fund data was passed via navigation state
        if (location.state?.fundData) {
          const fund = location.state.fundData;
          setFundData(fund);
          
          // If historical data is available, use it
          if (fund.historical3MonthData && fund.historical3MonthData.length > 0) {
            setHistoricalData(fund.historical3MonthData);
          } else {
            // Fetch historical data separately
            const response = await fetch(`https://api.mfapi.in/mf/${fundId}`);
            if (response.ok) {
              const data = await response.json();
              if (data.data && data.data.length > 0) {
                const last3Months = data.data.slice(0, 90).map((record: any) => ({
                  date: record.date,
                  nav: parseFloat(record.nav)
                }));
                setHistoricalData(last3Months);
              }
            }
          }
        } else if (fundId) {
          // Fetch fund data if not available in state
          const navService = new EnhancedNAVDataService();
          const allFunds = await navService.getAdvancedAnalysis();
          const fund = allFunds.find(f => f.schemeCode === fundId);
          
          if (fund) {
            setFundData(fund);
            setHistoricalData(fund.historical3MonthData || []);
          }
        }
      } catch (error) {
        console.error("Error loading fund data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFundData();
  }, [fundId, location.state]);

  const chartData = historicalData.slice().reverse().map((item, index) => ({
    ...item,
    index,
    formattedDate: new Date(item.date).toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short' 
    })
  }));

  const calculateReturn = (startNav: number, endNav: number) => {
    return ((endNav - startNav) / startNav) * 100;
  };

  const getReturnColor = (returnValue: number) => {
    if (returnValue > 5) return '#10B981'; // Green
    if (returnValue > 0) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const getPredictionColor = (prediction: number) => {
    if (prediction > 10) return '#10B981'; // Strong positive - Green
    if (prediction > 5) return '#84CC16'; // Moderate positive - Light Green
    if (prediction > 0) return '#F59E0B'; // Weak positive - Yellow
    return '#EF4444'; // Negative - Red
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fund analysis...</p>
        </div>
      </div>
    );
  }

  if (!fundData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Fund Not Found</h2>
          <p className="text-gray-600 mb-4">The requested mutual fund could not be found.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Funds
          </Button>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{fundData.schemeName}</h1>
                <div className="flex gap-3 items-center">
                  <Badge variant="secondary">{fundData.category}</Badge>
                  <Badge className={
                    fundData.riskLevel === 'LOW' ? 'bg-green-100 text-green-800' :
                    fundData.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {fundData.riskLevel} Risk
                  </Badge>
                  <span className="text-sm text-gray-600">AMC: {fundData.amcName}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">₹{fundData.nav.toFixed(4)}</div>
                <div className="text-sm text-gray-500">Current NAV</div>
                <div className="text-xs text-gray-400">as on {fundData.date}</div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-blue-600">{fundData.aiScore.toFixed(1)}/10</div>
                <div className="text-xs text-gray-600">AI Score</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-purple-600">{fundData.performanceRank}</div>
                <div className="text-xs text-gray-600">Rank in {fundData.category}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-green-600">{(fundData.confidence * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-600">Confidence</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-amber-600">{fundData.volatilityScore.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Volatility</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-indigo-600">{fundData.sharpeRatio.toFixed(2)}</div>
                <div className="text-xs text-gray-600">Sharpe Ratio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance Chart</TabsTrigger>
            <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
            <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="disclaimer">Important Info</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>3-Month Historical Performance</CardTitle>
                <p className="text-sm text-gray-600">
                  NAV movement over the last 3 months (90 trading days)
                </p>
              </CardHeader>
              <CardContent>
                {chartData.length > 0 ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="formattedDate" 
                          tick={{ fontSize: 12 }}
                          interval="preserveStartEnd"
                        />
                        <YAxis 
                          domain={['dataMin - 1', 'dataMax + 1']}
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `₹${value.toFixed(2)}`}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toFixed(4)}`, 'NAV']}
                          labelFormatter={(label, payload) => {
                            const dataPoint = payload?.[0]?.payload;
                            return dataPoint ? new Date(dataPoint.date).toLocaleDateString('en-IN', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : label;
                          }}
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
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-gray-500">Historical data not available</p>
                  </div>
                )}
                
                {chartData.length > 1 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">3-Month Performance Summary</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Starting NAV:</span>
                        <div className="font-semibold">₹{chartData[0]?.nav.toFixed(4)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Current NAV:</span>
                        <div className="font-semibold">₹{chartData[chartData.length - 1]?.nav.toFixed(4)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Return:</span>
                        <div className={`font-semibold ${
                          calculateReturn(chartData[0]?.nav, chartData[chartData.length - 1]?.nav) >= 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {calculateReturn(chartData[0]?.nav, chartData[chartData.length - 1]?.nav).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prediction">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  AI-Based Future Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Prediction Visualization */}
                  <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">3-Month Return Prediction</h3>
                    <div 
                      className="text-4xl font-bold mb-2"
                      style={{ color: getPredictionColor(fundData.predicted3MonthReturn) }}
                    >
                      {fundData.predicted3MonthReturn >= 0 ? '+' : ''}{fundData.predicted3MonthReturn.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on AI analysis of historical performance, market trends, and fund characteristics
                    </div>
                  </div>

                  {/* Prediction Confidence */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Prediction Confidence</h4>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {(fundData.confidence * 100).toFixed(0)}%
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on data quality, consistency, and model reliability
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Risk Assessment</h4>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={
                          fundData.riskLevel === 'LOW' ? 'bg-green-100 text-green-800' :
                          fundData.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {fundData.riskLevel} RISK
                        </Badge>
                        <span className="text-sm">({fundData.volatilityScore.toFixed(1)}/10)</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Volatility score based on historical price movements
                      </p>
                    </div>
                  </div>

                  {/* Important Notice */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Regulatory Disclaimer:</strong> This AI prediction is purely based on historical performance analysis and mathematical models. 
                      Past performance does not guarantee future results. Market conditions, economic factors, and fund management decisions can significantly 
                      impact actual returns. This analysis should not be considered as investment advice. Please consult with a qualified financial advisor 
                      before making investment decisions.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">AI Score</span>
                      <span className="font-semibold">{fundData.aiScore.toFixed(1)}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category Rank</span>
                      <span className="font-semibold">{fundData.performanceRank} of {fundData.totalSchemes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Volatility Score</span>
                      <span className="font-semibold">{fundData.volatilityScore.toFixed(1)}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sharpe Ratio</span>
                      <span className="font-semibold">{fundData.sharpeRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Confidence Level</span>
                      <span className="font-semibold">{(fundData.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fund Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600 block">Scheme Code</span>
                      <span className="font-semibold">{fundData.schemeCode}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Category</span>
                      <span className="font-semibold">{fundData.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Sub-Category</span>
                      <span className="font-semibold">{fundData.subCategory}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">AMC Name</span>
                      <span className="font-semibold">{fundData.amcName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Last Updated</span>
                      <span className="font-semibold">{fundData.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="disclaimer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Important Disclaimers & Regulatory Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>SEBI/AMFI Compliance Notice:</strong> This platform provides information and analysis tools for educational purposes only. 
                      We are not a SEBI registered investment advisor. All investment decisions should be made after consulting with a qualified, 
                      SEBI-registered financial advisor who can assess your specific financial situation and risk tolerance.
                    </AlertDescription>
                  </Alert>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-yellow-800">AI Prediction Disclaimer</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• AI predictions are based solely on historical performance analysis and mathematical models</li>
                      <li>• Past performance does not guarantee future results</li>
                      <li>• Market volatility, economic conditions, and fund management changes can significantly impact returns</li>
                      <li>• These predictions should not be considered as investment advice or recommendations</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">Investment Risks</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Mutual fund investments are subject to market risks</li>
                      <li>• The value of investments may go up or down based on market conditions</li>
                      <li>• There is no guarantee of returns or capital protection</li>
                      <li>• Please read the scheme information document carefully before investing</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Data Sources & Methodology</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• NAV data sourced from AMFI (Association of Mutual Funds in India)</li>
                      <li>• Historical performance data used for analysis</li>
                      <li>• AI scoring based on multiple technical and fundamental factors</li>
                      <li>• Rankings are category-specific and based on our proprietary scoring system</li>
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500 mt-6 p-3 bg-gray-100 rounded">
                    <strong>Legal Notice:</strong> This website and its content are for informational purposes only. 
                    We do not provide investment advisory services. Users should verify all information independently 
                    and consult with qualified professionals before making any investment decisions. We are not liable 
                    for any financial losses that may occur from using this information.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FundDetailsPage;
