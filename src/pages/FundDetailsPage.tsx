
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, TrendingUp, TrendingDown, Target } from 'lucide-react';
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

interface FundDetailsPageProps {
  // Add any props you need here
}

// Deterministic AI scoring that doesn't change on refresh
const getAIAnalysis = (fundData: any) => {
  const { category, returns1Y, returns3Y, returns5Y, volatility, expenseRatio, aum, schemeCode } = fundData;
  
  // Use scheme code as seed for consistent "randomness"
  const seed = parseInt(schemeCode) || 1000;
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  // Calculate trend score based on performance - deterministic
  const performanceScore = (returns1Y * 0.2 + returns3Y * 0.3 + returns5Y * 0.5) / 10;
  const trendScore = Math.min(10, Math.max(3, performanceScore * 8 + seededRandom(seed) * 2));
  
  // Deterministic AI scoring factors
  const scoringFactors = [
    { 
      name: "Performance Consistency", 
      score: Math.min(10, Math.max(4, trendScore + seededRandom(seed + 1) * 2)), 
      weight: 25
    },
    { 
      name: "Fund Manager Track Record", 
      score: Math.min(10, Math.max(6, 8.5 + seededRandom(seed + 2) * 1.5)), 
      weight: 20
    },
    { 
      name: "Portfolio Quality", 
      score: Math.min(10, Math.max(6, 8.0 + seededRandom(seed + 3) * 1.5)), 
      weight: 20
    },
    { 
      name: "Expense Ratio", 
      score: Math.max(6, 10 - (expenseRatio * 4)), 
      weight: 15
    },
    { 
      name: "Risk Management", 
      score: Math.max(6, 10 - (volatility / 2)), 
      weight: 10
    },
    { 
      name: "Portfolio Turnover", 
      score: Math.min(10, Math.max(5, 7.2 + seededRandom(seed + 4) * 1.8)), 
      weight: 10
    }
  ];

  // Calculate overall score using weighted average - deterministic
  const aiScore = scoringFactors.reduce((acc, factor) => 
    acc + (factor.score * factor.weight / 100), 0
  );

  // Round to one decimal place
  const finalScore = Math.round(aiScore * 10) / 10;
  
  let recommendation = 'HOLD';
  let confidence = 0;
  let reasoning = '';
  
  // Generate recommendation based on AI score - deterministic
  if (finalScore >= 8.5) {
    recommendation = 'STRONG BUY';
    confidence = Math.round(85 + seededRandom(seed + 5) * 10);
    reasoning = 'Exceptional performance with strong fundamentals and low risk profile';
  } else if (finalScore >= 7.0) {
    recommendation = 'BUY';
    confidence = Math.round(70 + seededRandom(seed + 6) * 15);
    reasoning = 'Good performance with solid track record and reasonable risk';
  } else if (finalScore >= 5.5) {
    recommendation = 'HOLD';
    confidence = Math.round(55 + seededRandom(seed + 7) * 20);
    reasoning = 'Average performance, suitable for existing investors';
  } else if (finalScore >= 4.0) {
    recommendation = 'SELL';
    confidence = Math.round(45 + seededRandom(seed + 8) * 25);
    reasoning = 'Below average performance, consider alternatives';
  } else {
    recommendation = 'STRONG SELL';
    confidence = Math.round(65 + seededRandom(seed + 9) * 20);
    reasoning = 'Poor performance with high risk, immediate action recommended';
  }
  
  return { 
    aiScore: finalScore, 
    recommendation, 
    confidence, 
    reasoning,
    performanceRank: Math.max(1, Math.round((10 - finalScore) * 2)),
    trendScore,
    volatilityScore: volatility
  };
};

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [fundData, setFundData] = useState<any>(null);
  const [latestNAV, setLatestNAV] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    if (!fundId) return;

    // Get base fund data from service
    const baseFundData = FundDataService.getMockFundData(fundId);
    setFundData(baseFundData);

    // Fetch latest NAV from API
    console.log('Starting NAV fetch for fundId:', fundId);
    FundDataService.fetchLatestNAV(fundId).then(navData => {
      if (navData) {
        console.log('Successfully fetched NAV data:', navData);
        setLatestNAV(navData);
        
        // Update fund data with real NAV and actual scheme name
        setFundData(prev => ({
          ...prev,
          nav: navData.nav,
          navDate: navData.date,
          // Only update scheme name if it's significantly different and not just a variation
          actualSchemeName: prev.schemeName, // Keep our correct mapping
          actualFundHouse: navData.fundHouse
        }));
      } else {
        console.log('No NAV data received, keeping mock data');
      }
    });

    // Fetch historical data for charts
    FundDataService.fetchHistoricalNAV(fundId, 365).then(historical => {
      setHistoricalData(historical);
      console.log('Historical data loaded:', historical.length, 'records');
    });
  }, [fundId]);

  const handleBackClick = () => {
    console.log('Back button clicked, navigating to funds section');
    
    // Navigate to home page and scroll to funds section
    navigate('/', { replace: true });
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const fundsSection = document.getElementById('funds');
      if (fundsSection) {
        fundsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If funds section doesn't exist, try scrolling to ai-funds tab
        const fundsTab = document.querySelector('[data-state="active"][value="ai-funds"]') || 
                         document.querySelector('[value="ai-funds"]');
        if (fundsTab) {
          (fundsTab as HTMLElement).click();
          setTimeout(() => {
            const fundsSection = document.getElementById('funds');
            if (fundsSection) {
              fundsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    }, 100);
  };

  if (!fundData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading fund details...</div>
        </div>
      </div>
    );
  }

  // Get AI analysis that matches AIFundRanking exactly
  const aiAnalysis = getAIAnalysis(fundData);

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
                {fundData.actualFundHouse || fundData.amc} • {fundData.category}
              </p>
              {latestNAV && latestNAV.actualSchemeName !== fundData.schemeName && (
                <p className="text-sm text-blue-600 mt-1">
                  API scheme: {latestNAV.actualSchemeName}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-2">
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
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">₹{fundData.nav.toFixed(4)}</div>
              <div className="text-sm text-gray-600">Current NAV</div>
              {latestNAV && (
                <div className="text-xs text-green-600 mt-1">
                  Updated: {latestNAV.date}
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
                      <span className="font-semibold ml-1">{aiAnalysis.volatilityScore < 5 ? 'Low' : aiAnalysis.volatilityScore < 7 ? 'Moderate' : 'High'}</span>
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
        </div>

        <Tabs defaultValue="ai-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-analysis">
            <AIFundRanking fundData={{...fundData, ...aiAnalysis}} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioHoldings fundData={{...fundData, ...aiAnalysis}} />
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
                trendScore: aiAnalysis.trendScore
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Investment Action Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle>Ready to Invest?</CardTitle>
            <CardDescription>
              Start your SIP journey with this {aiAnalysis.recommendation.toLowerCase()} rated fund
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
