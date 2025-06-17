
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

    console.log('FundDetailsPage: Starting data fetch for fundId:', fundId);
    loadFundData();
  }, [fundId]);

  const loadFundData = async () => {
    try {
      // First get API details to have accurate category and fund house
      console.log('FundDetailsPage: Fetching API details for fundId:', fundId);
      const apiDetails = await MutualFundSearchService.getFundDetails(fundId);
      
      if (apiDetails) {
        console.log('FundDetailsPage: API details loaded:', apiDetails);
        
        // Use API data as primary source, fallback to mock data for missing fields
        const baseFundData = FundDataService.getMockFundData(fundId);
        
        const combinedFundData = {
          schemeCode: fundId,
          schemeName: apiDetails.schemeName,
          category: apiDetails.category || 'Unknown', // Use API category
          fundHouse: apiDetails.fundHouse || 'Unknown', // Use API fund house
          nav: apiDetails.nav,
          navDate: apiDetails.navDate,
          // Fallback to mock data for these fields if not in API
          returns1Y: baseFundData.returns1Y,
          returns3Y: baseFundData.returns3Y,
          returns5Y: baseFundData.returns5Y,
          expenseRatio: baseFundData.expenseRatio,
          aum: baseFundData.aum,
          minSipAmount: baseFundData.minSipAmount,
          volatility: baseFundData.volatility,
          amc: apiDetails.fundHouse || baseFundData.amc
        };

        console.log('FundDetailsPage: Combined fund data:', combinedFundData);
        setFundData(combinedFundData);
        setLatestNAV(apiDetails);
        setNavError('');

        // Trigger AI analysis with the combined data
        await performAIAnalysis(combinedFundData);
      } else {
        // Fallback to mock data if API fails
        console.log('FundDetailsPage: API failed, using mock data for fundId:', fundId);
        const baseFundData = FundDataService.getMockFundData(fundId);
        setFundData(baseFundData);
        setNavError('Using mock data - API unavailable');
        
        // Still try AI analysis with mock data
        await performAIAnalysis(baseFundData);
      }

      // Fetch historical data for charts
      FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
        setHistoricalData(historical);
        console.log('FundDetailsPage: Historical data loaded:', historical.length, 'records');
      }).catch(error => {
        console.error('FundDetailsPage: Historical data error:', error);
      });

    } catch (error) {
      console.error('FundDetailsPage: Error loading fund data:', error);
      setNavError('Failed to load fund data');
    }
  };

  const performAIAnalysis = async (fundDataForAnalysis: any) => {
    setAiLoading(true);
    setAiError('');
    
    try {
      console.log('FundDetailsPage: Starting AI analysis for:', fundDataForAnalysis.schemeName);
      
      const { data, error } = await supabase.functions.invoke('ai-fund-analysis', {
        body: { fundData: fundDataForAnalysis }
      });

      if (error) {
        throw new Error(`AI Analysis failed: ${error.message}`);
      }

      if (data.success) {
        console.log('FundDetailsPage: AI analysis completed:', data.analysis);
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
            <div>Loading fund details...</div>
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
        
        {/* Fund Header */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                {fundData.schemeName}
              </h2>
              <p className="text-gray-600">
                {fundData.fundHouse} • {fundData.category}
              </p>
              
              {/* Show NAV error if any */}
              {navError && (
                <p className="text-sm text-orange-600 mt-1">
                  ⚠️ {navError}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-2">
                {aiLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">AI analyzing...</span>
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
                Current NAV {latestNAV ? '(Live)' : '(Mock)'}
              </div>
              {latestNAV && (
                <div className="text-xs text-green-600 mt-1">
                  Updated: {latestNAV.navDate}
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                {fundData.returns1Y >= 0 ? 
                  <TrendingUp className="h-4 w-4 text-green-600" /> : 
                  <TrendingDown className="h-4 w-4 text-red-600" />
                }
                <span className={`font-semibold ${fundData.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fundData.returns1Y >= 0 ? '+' : ''}{fundData.returns1Y}% (1Y)
                </span>
              </div>
            </div>
          </div>

          {/* AI Recommendation Card */}
          {aiAnalysis && (
            <Card className="mt-4 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  AI Investment Recommendation
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
              primaryFund={{
                schemeCode: fundData.schemeCode,
                schemeName: fundData.schemeName,
                category: fundData.category,
                nav: fundData.nav,
                trendScore: aiAnalysis?.analysis?.performanceScore || 7
              }}
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
