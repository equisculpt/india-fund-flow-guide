import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Info, BarChart3 } from "lucide-react";
import { EnhancedNAVDataService, AdvancedNAVAnalysis } from "@/services/enhancedNAVDataService";
import AdvancedFundChart from "@/components/AdvancedFundChart";

const FundDetailsPage = () => {
  const { fundId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [fundData, setFundData] = useState<AdvancedNAVAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFundData = async () => {
      try {
        setLoading(true);
        
        // Check if fund data was passed via navigation state
        if (location.state?.fundData) {
          setFundData(location.state.fundData);
        } else if (fundId) {
          // Fetch fund data if not available in state
          const navService = new EnhancedNAVDataService();
          const allFunds = await navService.getAdvancedAnalysis();
          const fund = allFunds.find(f => f.schemeCode === fundId);
          
          if (fund) {
            setFundData(fund);
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

  const getHistoricalColor = (historical: number) => {
    if (historical > 10) return '#10B981'; // Strong positive - Green
    if (historical > 5) return '#84CC16'; // Moderate positive - Light Green
    if (historical > 0) return '#F59E0B'; // Weak positive - Yellow
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
          <Button onClick={() => navigate('/')}>Go Back to Funds</Button>
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
            onClick={() => navigate('/')}
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
                <div className="text-lg font-bold text-blue-600">{fundData.trendScore.toFixed(1)}/10</div>
                <div className="text-xs text-gray-600">Trend Score</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-purple-600">{fundData.performanceRank}</div>
                <div className="text-xs text-gray-600">Rank in {fundData.category}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-lg font-bold text-green-600">{(fundData.confidence * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-600">Data Quality</div>
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

        {/* Advanced Fund Chart - This is where the comprehensive analysis will show */}
        <AdvancedFundChart 
          primaryFund={{
            schemeCode: fundData.schemeCode,
            schemeName: fundData.schemeName,
            category: fundData.category,
            nav: fundData.nav,
            trendScore: fundData.trendScore
          }}
        />

        {/* Analysis Tabs */}
        <Tabs defaultValue="historical" className="space-y-6 mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="historical">Historical Analysis</TabsTrigger>
            <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="disclaimer">Important Info</TabsTrigger>
          </TabsList>

          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Historical Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Historical 3-Month Analysis */}
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Average 3-Month Historical Return</h3>
                    <div 
                      className="text-4xl font-bold mb-2"
                      style={{ color: getHistoricalColor(fundData.historical3MonthAverage) }}
                    >
                      {fundData.historical3MonthAverage >= 0 ? '+' : ''}{fundData.historical3MonthAverage.toFixed(2)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on historical 3-month rolling returns analysis (2020-2024)
                    </div>
                  </div>

                  {/* Backtest Data */}
                  {fundData.backtestData && (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">SIP Backtest (Jan 2020 - 2024)</h4>
                        <div className="text-sm space-y-1">
                          <div>Invested: ₹{fundData.backtestData.sipFrom2020.invested.toLocaleString()}</div>
                          <div>Current Value: ₹{fundData.backtestData.sipFrom2020.currentValue.toLocaleString()}</div>
                          <div className="text-green-600 font-bold">
                            Returns: {fundData.backtestData.sipFrom2020.returns.toFixed(1)}%
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          ₹10,000 monthly SIP for 48 months
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Best Quarter Performance</h4>
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          +{fundData.backtestData.bestQuarterReturn.toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-600">
                          Highest 3-month return during market uptrend
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Worst Quarter Performance</h4>
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {fundData.backtestData.worstQuarterReturn.toFixed(1)}%
                        </div>
                        <p className="text-xs text-gray-600">
                          Lowest 3-month return during market correction
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Historical Context */}
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-yellow-800">Historical Context</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• This fund showed strong 3-month returns after Fed rate cuts historically</li>
                      <li>• Average 3-month return during high inflation (2018-2024): {fundData.historical3MonthAverage.toFixed(1)}%</li>
                      <li>• Fund demonstrated resilience during market corrections of 2020 and 2022</li>
                      <li>• Trend score: {fundData.trendScore.toFixed(0)} (based on asset rotation and volatility patterns)</li>
                    </ul>
                  </div>

                  {/* Important Notice */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> This analysis is based on historical performance data only. 
                      Past performance does not guarantee future results. Market conditions can significantly 
                      impact actual returns. This analysis should not be considered as investment advice.
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
                      <span className="text-gray-600">Trend Score</span>
                      <span className="font-semibold">{fundData.trendScore.toFixed(1)}/10</span>
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
                      <span className="text-gray-600">Data Quality</span>
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

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">Historical Analysis Disclaimer</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• All analysis is based solely on historical performance data and mathematical models</li>
                      <li>• Past performance does not guarantee future results</li>
                      <li>• Market volatility, economic conditions, and fund management changes can significantly impact returns</li>
                      <li>• This analysis should not be considered as investment advice or recommendations</li>
                      <li>• No predictions of future returns are made - only historical patterns are analyzed</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-800">Investment Risks</h4>
                    <ul className="text-sm text-red-700 space-y-1">
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
                      <li>• Trend scoring based on multiple technical and fundamental factors</li>
                      <li>• Rankings are category-specific and based on our proprietary scoring system</li>
                      <li>• All backtesting results are based on historical NAV data</li>
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
