
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, TrendingUp, TrendingDown, Shield, Target } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AIFundRanking from '@/components/charts/AIFundRanking';
import PortfolioHoldings from '@/components/charts/PortfolioHoldings';
import FundAnalyticsChart from '@/components/FundAnalyticsChart';
import AdvancedFundChart from '@/components/AdvancedFundChart';

interface FundDetailsPageProps {
  // Add any props you need here
}

const Header = () => {
  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold">SIP Brewery</h1>
      </div>
    </div>
  );
};

// AI-based recommendation engine
const getAIRecommendation = (fundData: any) => {
  const { aiScore, category, volatilityScore, trendScore, performanceRank } = fundData;
  
  // Calculate recommendation based on multiple factors
  let recommendation = 'HOLD';
  let confidence = 0;
  let reasoning = '';
  
  if (aiScore >= 8.5) {
    recommendation = 'STRONG BUY';
    confidence = 90 + Math.random() * 10;
    reasoning = 'Exceptional performance with strong fundamentals and low risk';
  } else if (aiScore >= 7.5) {
    recommendation = 'BUY';
    confidence = 75 + Math.random() * 15;
    reasoning = 'Good performance with solid track record and reasonable risk';
  } else if (aiScore >= 6.5) {
    recommendation = 'HOLD';
    confidence = 60 + Math.random() * 20;
    reasoning = 'Average performance, suitable for existing investors';
  } else if (aiScore >= 5.0) {
    recommendation = 'SELL';
    confidence = 50 + Math.random() * 25;
    reasoning = 'Below average performance, consider alternatives';
  } else {
    recommendation = 'STRONG SELL';
    confidence = 70 + Math.random() * 20;
    reasoning = 'Poor performance with high risk, immediate action recommended';
  }
  
  return { recommendation, confidence: confidence.toFixed(0), reasoning };
};

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [fundData, setFundData] = useState<any>(null);

  useEffect(() => {
    // Generate comprehensive fund data based on fundId
    let mockData = {
      schemeCode: fundId,
      schemeName: '',
      amc: '',
      category: '',
      nav: 0,
      aiScore: 0,
      trendScore: 0,
      volatilityScore: 0,
      performanceRank: 0,
      returns1Y: 0,
      returns3Y: 0,
      returns5Y: 0,
      aum: 0,
      expenseRatio: 0,
      minSipAmount: 500
    };

    if (fundId === '120503') {
      mockData = {
        ...mockData,
        schemeName: 'Axis Midcap Fund - Direct Growth',
        amc: 'Axis Mutual Fund',
        category: 'Mid Cap',
        nav: 89.45,
        aiScore: 8.7,
        trendScore: 8.2,
        volatilityScore: 6.5,
        performanceRank: 8,
        returns1Y: 24.5,
        returns3Y: 18.2,
        returns5Y: 16.8,
        aum: 15420,
        expenseRatio: 0.68,
        minSipAmount: 500
      };
    } else if (fundId === '100016') {
      mockData = {
        ...mockData,
        schemeName: 'SBI Bluechip Fund - Direct Growth',
        amc: 'SBI Mutual Fund',
        category: 'Large Cap',
        nav: 76.32,
        aiScore: 7.9,
        trendScore: 7.5,
        volatilityScore: 4.2,
        performanceRank: 12,
        returns1Y: 18.7,
        returns3Y: 15.4,
        returns5Y: 14.2,
        aum: 28650,
        expenseRatio: 0.52,
        minSipAmount: 500
      };
    } else if (fundId === '101206') {
      mockData = {
        ...mockData,
        schemeName: 'HDFC Top 100 Fund - Direct Growth',
        amc: 'HDFC Mutual Fund',
        category: 'Large Cap',
        nav: 832.15,
        aiScore: 8.1,
        trendScore: 7.8,
        volatilityScore: 4.8,
        performanceRank: 6,
        returns1Y: 20.3,
        returns3Y: 16.1,
        returns5Y: 15.7,
        aum: 22340,
        expenseRatio: 0.58,
        minSipAmount: 500
      };
    } else if (fundId === '120601') {
      mockData = {
        ...mockData,
        schemeName: 'SBI Small Cap Fund - Regular Plan - Growth',
        amc: 'SBI Mutual Fund',
        category: 'Small Cap',
        nav: 125.67,
        aiScore: 7.4,
        trendScore: 6.8,
        volatilityScore: 8.2,
        performanceRank: 15,
        returns1Y: 28.9,
        returns3Y: 22.1,
        returns5Y: 19.4,
        aum: 3402,
        expenseRatio: 1.85,
        minSipAmount: 500
      };
    }

    setFundData(mockData);
  }, [fundId]);

  if (!fundData) {
    return <div>Loading...</div>;
  }

  const aiRecommendation = getAIRecommendation(fundData);

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
        <Button variant="ghost" onClick={() => navigate(-1)}>
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
                  <span className="font-bold text-lg">{fundData.aiScore}/10</span>
                  <span className="text-sm text-gray-600">AI Score</span>
                </div>
                <Badge className={getRecommendationColor(aiRecommendation.recommendation)}>
                  {aiRecommendation.recommendation}
                </Badge>
                <Badge variant="outline">
                  {aiRecommendation.confidence}% Confidence
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold">₹{fundData.nav.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Current NAV</div>
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
                  <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getRecommendationColor(aiRecommendation.recommendation)}`}>
                    {aiRecommendation.recommendation}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{aiRecommendation.confidence}% AI Confidence</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-700">{aiRecommendation.reasoning}</p>
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-600">Performance Rank:</span>
                      <span className="font-semibold ml-1">#{fundData.performanceRank}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <span className="font-semibold ml-1">{fundData.volatilityScore < 5 ? 'Low' : fundData.volatilityScore < 7 ? 'Moderate' : 'High'}</span>
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
            <AIFundRanking fundData={fundData} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioHoldings fundData={fundData} />
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
                trendScore: fundData.trendScore
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Investment Action Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle>Ready to Invest?</CardTitle>
            <CardDescription>
              Start your SIP journey with this {aiRecommendation.recommendation.toLowerCase()} rated fund
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
