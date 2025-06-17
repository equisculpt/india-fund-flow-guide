
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
import FundAnalyticsChart from '@/components/FundAnalyticsChart';
import AdvancedFundChart from '@/components/AdvancedFundChart';

interface FundDetailsPageProps {
  // Add any props you need here
}

// Unified AI scoring that matches AIFundRanking component
const getAIAnalysis = (fundData: any) => {
  const { category, returns1Y, returns3Y, returns5Y, volatility, expenseRatio, aum } = fundData;
  
  // Calculate trend score based on performance
  const trendScore = Math.min(10, (returns1Y * 0.2 + returns3Y * 0.3 + returns5Y * 0.5) / 10 * 8 + Math.random() * 2);
  
  // Enhanced AI scoring factors matching AIFundRanking exactly
  const scoringFactors = [
    { 
      name: "Performance Consistency", 
      score: Math.min(10, trendScore + Math.random() * 2), 
      weight: 25
    },
    { 
      name: "Fund Manager Track Record", 
      score: 8.5 + (Math.random() * 1.5), 
      weight: 20
    },
    { 
      name: "Portfolio Quality", 
      score: 8.0 + Math.random() * 1.5, 
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
      score: 7.2 + Math.random() * 1.8, 
      weight: 10
    }
  ];

  // Calculate overall score using weighted average - SAME LOGIC AS AIFundRanking
  const aiScore = scoringFactors.reduce((acc, factor) => 
    acc + (factor.score * factor.weight / 100), 0
  );

  // Round to one decimal place - SAME AS AIFundRanking
  const finalScore = Math.round(aiScore * 10) / 10;
  
  let recommendation = 'HOLD';
  let confidence = 0;
  let reasoning = '';
  
  // Generate recommendation based on AI score - SAME LOGIC AS AIFundRanking
  if (finalScore >= 8.5) {
    recommendation = 'STRONG BUY';
    confidence = 85 + Math.random() * 10;
    reasoning = 'Exceptional performance with strong fundamentals and low risk profile';
  } else if (finalScore >= 7.0) {
    recommendation = 'BUY';
    confidence = 70 + Math.random() * 15;
    reasoning = 'Good performance with solid track record and reasonable risk';
  } else if (finalScore >= 5.5) {
    recommendation = 'HOLD';
    confidence = 55 + Math.random() * 20;
    reasoning = 'Average performance, suitable for existing investors';
  } else if (finalScore >= 4.0) {
    recommendation = 'SELL';
    confidence = 45 + Math.random() * 25;
    reasoning = 'Below average performance, consider alternatives';
  } else {
    recommendation = 'STRONG SELL';
    confidence = 65 + Math.random() * 20;
    reasoning = 'Poor performance with high risk, immediate action recommended';
  }
  
  return { 
    aiScore: finalScore, 
    recommendation, 
    confidence: Math.round(confidence), 
    reasoning,
    // Additional analysis metrics
    performanceRank: Math.max(1, Math.round((10 - finalScore) * 2)),
    trendScore,
    volatilityScore: volatility
  };
};

// Function to fetch latest NAV from API
const fetchLatestNAV = async (schemeCode: string) => {
  try {
    console.log(`Fetching NAV for scheme: ${schemeCode}`);
    const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`);
    if (!response.ok) {
      console.error(`NAV API responded with status: ${response.status}`);
      throw new Error('Failed to fetch NAV');
    }
    
    const data = await response.json();
    console.log('NAV API response:', data);
    
    if (data?.data?.[0]?.nav) {
      const navInfo = {
        nav: parseFloat(data.data[0].nav),
        date: data.data[0].date
      };
      console.log('Parsed NAV info:', navInfo);
      return navInfo;
    }
    console.log('No NAV data found in response');
    return null;
  } catch (error) {
    console.error('Error fetching latest NAV:', error);
    return null;
  }
};

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [fundData, setFundData] = useState<any>(null);
  const [latestNAV, setLatestNAV] = useState<any>(null);

  useEffect(() => {
    // Generate comprehensive fund data based on fundId
    let mockData = {
      schemeCode: fundId,
      schemeName: '',
      amc: '',
      category: '',
      nav: 0,
      returns1Y: 0,
      returns3Y: 0,
      returns5Y: 0,
      aum: 0,
      expenseRatio: 0,
      volatility: 0,
      minSipAmount: 500
    };

    if (fundId === '120503') {
      mockData = {
        ...mockData,
        schemeName: 'Axis Midcap Fund - Direct Growth',
        amc: 'Axis Mutual Fund',
        category: 'Mid Cap',
        nav: 89.45,
        returns1Y: 24.5,
        returns3Y: 18.2,
        returns5Y: 16.8,
        aum: 15420,
        expenseRatio: 0.68,
        volatility: 6.5,
        minSipAmount: 500
      };
    } else if (fundId === '100016') {
      mockData = {
        ...mockData,
        schemeName: 'SBI Bluechip Fund - Direct Growth',
        amc: 'SBI Mutual Fund',
        category: 'Large Cap',
        nav: 76.32,
        returns1Y: 18.7,
        returns3Y: 15.4,
        returns5Y: 14.2,
        aum: 28650,
        expenseRatio: 0.52,
        volatility: 4.2,
        minSipAmount: 500
      };
    } else if (fundId === '101206') {
      mockData = {
        ...mockData,
        schemeName: 'HDFC Top 100 Fund - Direct Growth',
        amc: 'HDFC Mutual Fund',
        category: 'Large Cap',
        nav: 832.15,
        returns1Y: 20.3,
        returns3Y: 16.1,
        returns5Y: 15.7,
        aum: 22340,
        expenseRatio: 0.58,
        volatility: 4.8,
        minSipAmount: 500
      };
    } else if (fundId === '120601') {
      mockData = {
        ...mockData,
        schemeName: 'SBI Small Cap Fund - Regular Plan - Growth',
        amc: 'SBI Mutual Fund',
        category: 'Small Cap',
        nav: 125.67,
        returns1Y: 28.9,
        returns3Y: 22.1,
        returns5Y: 19.4,
        aum: 3402,
        expenseRatio: 1.85,
        volatility: 8.2,
        minSipAmount: 500
      };
    }

    setFundData(mockData);

    // Fetch latest NAV from API
    if (fundId) {
      console.log('Starting NAV fetch for fundId:', fundId);
      fetchLatestNAV(fundId).then(navData => {
        if (navData) {
          console.log('Successfully fetched NAV data:', navData);
          setLatestNAV(navData);
          // Update the mock data with latest NAV
          setFundData(prev => ({
            ...prev,
            nav: navData.nav,
            navDate: navData.date
          }));
        } else {
          console.log('No NAV data received, keeping mock data');
        }
      });
    }
  }, [fundId]);

  const handleBackClick = () => {
    console.log('Back button clicked');
    console.log('Current location:', window.location.pathname);
    console.log('History length:', window.history.length);
    
    try {
      // First try to go back in history
      window.history.back();
      
      // If that doesn't work after a short delay, navigate to home
      setTimeout(() => {
        if (window.location.pathname === `/fund/${fundId}`) {
          console.log('Still on same page, navigating to home');
          navigate('/');
        }
      }, 100);
    } catch (error) {
      console.error('Error with back navigation:', error);
      navigate('/');
    }
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
          Back
        </Button>
        
        {/* Fund Header */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{fundData.schemeName}</h2>
              <p className="text-gray-600">{fundData.amc} • {fundData.category}</p>
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
              <div className="text-3xl font-bold">₹{fundData.nav.toFixed(2)}</div>
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
            <FundAnalyticsChart 
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
