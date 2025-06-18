import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, TrendingUp, TrendingDown, Target, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Header from '@/components/Header';
import AIFundRanking from '@/components/charts/AIFundRanking';
import PortfolioHoldings from '@/components/charts/PortfolioHoldings';
import AdvancedFundChart from '@/components/AdvancedFundChart';
import NAVHistoryChart from '@/components/NAVHistoryChart';
import { FundDataService } from '@/services/fundDataService';
import { MutualFundSearchService } from '@/services/mutualFundSearchService';
import { supabase } from '@/integrations/supabase/client';

interface FundDetailsPageProps {
  // Add any props you need here
}

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [fundData, setFundData] = useState<any>(null);
  const [latestNAV, setLatestNAV] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [navError, setNavError] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string>('');

  useEffect(() => {
    if (!fundId) return;

    console.log('FundDetailsPage: Starting enhanced data fetch for fundId:', fundId);
    loadEnhancedFundData();
  }, [fundId]);

  const loadEnhancedFundData = async () => {
    try {
      console.log('FundDetailsPage: Fetching enhanced fund details for fundId:', fundId);
      
      // Get enhanced fund details with calculated performance data
      const enhancedDetails = await MutualFundSearchService.getEnhancedFundDetails(fundId);
      
      if (enhancedDetails) {
        console.log('FundDetailsPage: Enhanced details loaded:', enhancedDetails);
        
        const combinedFundData = {
          schemeCode: fundId,
          schemeName: enhancedDetails.schemeName,
          category: enhancedDetails.category || 'Unknown',
          fundHouse: enhancedDetails.fundHouse || 'Unknown',
          nav: enhancedDetails.nav || 0,
          navDate: enhancedDetails.navDate,
          returns1Y: enhancedDetails.returns1Y,
          returns3Y: enhancedDetails.returns3Y,
          returns5Y: enhancedDetails.returns5Y,
          expenseRatio: enhancedDetails.expenseRatio,
          aum: enhancedDetails.aum,
          minSipAmount: 500,
          volatility: enhancedDetails.volatility,
          amc: enhancedDetails.fundHouse || 'Unknown'
        };

        console.log('FundDetailsPage: Combined enhanced fund data with calculated returns:', {
          returns1Y: combinedFundData.returns1Y,
          returns3Y: combinedFundData.returns3Y,
          returns5Y: combinedFundData.returns5Y,
          expenseRatio: combinedFundData.expenseRatio,
          aum: combinedFundData.aum
        });

        setFundData(combinedFundData);
        setLatestNAV(enhancedDetails);
        setNavError('✓ Performance calculated from NAV history');

        // Trigger AI analysis with the enhanced data containing real performance metrics
        await performAIAnalysis(combinedFundData);
      } else {
        // Fallback to basic API details if enhanced fails
        console.log('FundDetailsPage: Enhanced details failed, trying basic API for fundId:', fundId);
        const apiDetails = await MutualFundSearchService.getFundDetails(fundId);
        
        if (apiDetails) {
          console.log('FundDetailsPage: Basic API details loaded:', apiDetails);
          
          const baseFundData = await FundDataService.getMockFundData(fundId);
          
          const combinedFundData = {
            schemeCode: fundId,
            schemeName: apiDetails.schemeName,
            category: apiDetails.category || 'Unknown',
            fundHouse: apiDetails.fundHouse || 'Unknown',
            nav: apiDetails.nav || 0,
            navDate: apiDetails.navDate,
            returns1Y: baseFundData.returns1Y,
            returns3Y: baseFundData.returns3Y,
            returns5Y: baseFundData.returns5Y,
            expenseRatio: baseFundData.expenseRatio,
            aum: baseFundData.aum,
            minSipAmount: baseFundData.minSipAmount,
            volatility: baseFundData.volatility,
            amc: apiDetails.fundHouse || baseFundData.amc
          };

          console.log('FundDetailsPage: Combined fallback fund data:', combinedFundData);
          setFundData(combinedFundData);
          setLatestNAV(apiDetails);
          setNavError('Using calculated performance data from NAV history');
          
          await performAIAnalysis(combinedFundData);
        } else {
          console.log('FundDetailsPage: All API calls failed, using mock data for fundId:', fundId);
          const baseFundData = await FundDataService.getMockFundData(fundId);
          setFundData(baseFundData);
          setNavError('Using mock data - API unavailable');
          
          await performAIAnalysis(baseFundData);
        }
      }

      // Fetch historical data for charts
      FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
        setHistoricalData(historical);
        console.log('FundDetailsPage: Historical data loaded:', historical.length, 'records');
      }).catch(error => {
        console.error('FundDetailsPage: Historical data error:', error);
      });

    } catch (error) {
      console.error('FundDetailsPage: Error loading enhanced fund data:', error);
      setNavError('Failed to load fund data');
    }
  };

  const performAIAnalysis = async (fundDataForAnalysis: any) => {
    setAiLoading(true);
    setAiError('');
    
    try {
      console.log('FundDetailsPage: Starting AI analysis with enhanced data:', {
        schemeName: fundDataForAnalysis.schemeName,
        returns1Y: fundDataForAnalysis.returns1Y,
        returns3Y: fundDataForAnalysis.returns3Y,
        returns5Y: fundDataForAnalysis.returns5Y,
        expenseRatio: fundDataForAnalysis.expenseRatio,
        aum: fundDataForAnalysis.aum,
        hasRealPerformanceData: fundDataForAnalysis.returns1Y > 0 || fundDataForAnalysis.returns3Y > 0 || fundDataForAnalysis.returns5Y > 0
      });
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData: fundDataForAnalysis }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      if (data.success) {
        console.log('FundDetailsPage: AI analysis completed with real performance data:', data.analysis);
        setAiAnalysis(data.analysis);
      } else {
        console.log('FundDetailsPage: AI analysis failed, using fallback:', data.fallbackAnalysis);
        setAiAnalysis(data.fallbackAnalysis);
        setAiError('AI analysis partially failed, showing fallback assessment');
      }
    } catch (error) {
      console.error('FundDetailsPage: AI analysis error:', error);
      setAiError('AI analysis unavailable');
      
      // Fallback analysis
      setAiAnalysis({
        aiScore: 6.5,
        recommendation: 'HOLD',
        confidence: 60,
        reasoning: 'AI analysis service temporarily unavailable. Manual review recommended.',
        riskLevel: 'Moderate',
        strengths: ['Available for investment'],
        concerns: ['Analysis service unavailable'],
        performanceRank: 50,
        analysis: {
          performanceScore: 6.5,
          volatilityScore: 6.0,
          expenseScore: 7.0,
          fundManagerScore: 6.5,
          portfolioQualityScore: 6.5
        }
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleBackClick = () => {
    console.log('Back button clicked, navigating to funds section');
    
    // Navigate to home page and scroll to funds section
    navigate('/', { replace: true });
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const fundsSection = document.getElementById('funds');
      if (fundsSection) {
        fundsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!fundData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <div>Loading enhanced fund details...</div>
          </div>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'STRONG BUY': return 'bg-green-600 text-white';
      case 'BUY': return 'bg-green-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'STRONG SELL': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Create the combined fund data for components - merge fund data with AI analysis
  const combinedFundDataForComponents = {
    ...fundData,
    ...(aiAnalysis || {})
  };

  console.log('FundDetailsPage: Combined data for components:', combinedFundDataForComponents);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBackClick} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Funds
        </Button>
        
        {/* Fund Header with Enhanced Data */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {fundData.schemeName}
              </h2>
              <p className="text-gray-600">
                {fundData.fundHouse} • {fundData.category}
              </p>
              
              {/* Enhanced Fund Metrics */}
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Expense Ratio:</span>
                  <span className="font-semibold ml-1">{fundData.expenseRatio}%</span>
                </div>
                <div>
                  <span className="text-gray-600">AUM:</span>
                  <span className="font-semibold ml-1">₹{fundData.aum} Cr</span>
                </div>
                <div>
                  <span className="text-gray-600">Volatility:</span>
                  <span className="font-semibold ml-1">{fundData.volatility}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Min SIP:</span>
                  <span className="font-semibold ml-1">₹{fundData.minSipAmount}</span>
                </div>
              </div>
              
              {navError && (
                <p className="text-sm text-green-600 mt-1">
                  {navError}
                </p>
              )}
              
              <div className="flex items-center gap-2 mt-2">
                {aiLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">AI analyzing with real performance data...</span>
                  </div>
                ) : aiAnalysis ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{aiAnalysis.aiScore}/10</span>
                      <span className="text-sm text-gray-600">AI Score</span>
                    </div>
                    <Badge className={getRecommendationColor(aiAnalysis.recommendation)}>
                      {aiAnalysis.recommendation}
                    </Badge>
                    <Badge variant="outline">
                      {aiAnalysis.confidence}% Confidence
                    </Badge>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">AI analysis unavailable</div>
                )}
              </div>
              
              {aiError && (
                <p className="text-sm text-orange-600 mt-1">
                  ⚠️ {aiError}
                </p>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">₹{fundData.nav.toFixed(4)}</div>
              <div className="text-sm text-gray-600">
                Current NAV {latestNAV ? '(Live)' : '(Calculated)'}
              </div>
              {latestNAV && (
                <div className="text-xs text-green-600 mt-1">
                  Updated: {latestNAV.navDate}
                </div>
              )}
              
              {/* Enhanced Performance Display */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  {fundData.returns1Y >= 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-600" /> : 
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  }
                  <span className={`font-semibold ${fundData.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fundData.returns1Y >= 0 ? '+' : ''}{fundData.returns1Y.toFixed(2)}% (1Y)
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  3Y: {fundData.returns3Y.toFixed(2)}% | 5Y: {fundData.returns5Y.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendation Card */}
          {aiAnalysis && (
            <Card className="mt-4 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  AI Investment Recommendation (Based on Real Performance Data)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getRecommendationColor(aiAnalysis.recommendation)}`}>
                      {aiAnalysis.recommendation}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{aiAnalysis.confidence}% AI Confidence</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-700">{aiAnalysis.reasoning}</p>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-gray-600">Performance Rank:</span>
                        <span className="font-semibold ml-1">#{aiAnalysis.performanceRank}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Risk Level:</span>
                        <span className="font-semibold ml-1">{aiAnalysis.riskLevel}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Min SIP:</span>
                        <span className="font-semibold ml-1">₹{fundData.minSipAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="ai-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-analysis">
            <AIFundRanking fundData={combinedFundDataForComponents} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioHoldings fundData={combinedFundDataForComponents} />
          </TabsContent>

          <TabsContent value="performance">
            <NAVHistoryChart 
              fundId={fundData.schemeCode} 
              fundName={fundData.schemeName}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedFundChart 
              primaryFund={combinedFundDataForComponents}
            />
          </TabsContent>
        </Tabs>

        {/* Investment Action Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle>Ready to Invest?</CardTitle>
            <CardDescription>
              Start your SIP journey with this {aiAnalysis?.recommendation?.toLowerCase() || 'available'} fund
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button size="lg" className="flex-1">
                Start SIP (₹{fundData.minSipAmount}/month)
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                One-time Investment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FundDetailsPage;
