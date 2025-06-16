
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, TrendingUp, TrendingDown, Brain, BarChart3, Target, Zap, AlertTriangle } from "lucide-react";
import { EnhancedNAVDataService, AdvancedNAVAnalysis } from "@/services/enhancedNAVDataService";

// Define proper types for the enhanced scheme data
interface AdvancedSchemeData {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
  aiScore: number;
  confidence: number;
  predicted3MonthReturn: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

const AIFundComparison = () => {
  const [funds, setFunds] = useState<AdvancedSchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"aiScore" | "returns" | "risk">("aiScore");

  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    const fetchAndAnalyzeFunds = async () => {
      try {
        setLoading(true);
        console.log("Fetching enhanced fund analysis...");
        
        const analysisData = await navService.getAdvancedAnalysis();
        console.log("Received analysis data:", analysisData.length, "funds");
        
        // Convert AdvancedNAVAnalysis to AdvancedSchemeData format
        const convertedFunds: AdvancedSchemeData[] = analysisData.map(analysis => ({
          schemeCode: analysis.schemeCode,
          schemeName: analysis.schemeName,
          nav: analysis.nav,
          date: analysis.date,
          category: analysis.category,
          subCategory: analysis.subCategory || analysis.category,
          amcName: analysis.amcName,
          aiScore: analysis.aiScore,
          confidence: analysis.confidence,
          predicted3MonthReturn: analysis.predicted3MonthReturn,
          riskLevel: analysis.riskLevel,
          volatilityScore: analysis.volatilityScore,
          sharpeRatio: analysis.sharpeRatio,
          performanceRank: analysis.performanceRank,
          totalSchemes: analysis.totalSchemes
        }));
        
        setFunds(convertedFunds);
      } catch (error) {
        console.error("Error fetching fund analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzeFunds();
  }, []);

  const categories = ["ALL", "Large Cap", "Mid Cap", "Small Cap", "ELSS", "Hybrid", "Debt"];

  const filteredFunds = funds.filter(fund => 
    selectedCategory === "ALL" || fund.category === selectedCategory
  );

  const sortedFunds = [...filteredFunds].sort((a, b) => {
    switch (sortBy) {
      case "aiScore":
        return b.aiScore - a.aiScore;
      case "returns":
        return b.predicted3MonthReturn - a.predicted3MonthReturn;
      case "risk":
        return a.volatilityScore - b.volatilityScore;
      default:
        return b.aiScore - a.aiScore;
    }
  });

  const getStarRating = (score: number) => {
    const stars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < stars
                ? "fill-yellow-400 text-yellow-400"
                : i === stars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-sm font-semibold ml-1">{score.toFixed(1)}</span>
      </div>
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW": return "bg-green-100 text-green-800";
      case "MEDIUM": return "bg-yellow-100 text-yellow-800";
      case "HIGH": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse text-purple-600" />
            AI Fund Analysis Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Fund Rankings & Predictions
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time AI analysis with 3-month return predictions and risk assessment - Updated every 15 minutes
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex gap-4 mb-6">
            <Button
              variant={sortBy === "aiScore" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("aiScore")}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              AI Score
            </Button>
            <Button
              variant={sortBy === "returns" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("returns")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Returns
            </Button>
            <Button
              variant={sortBy === "risk" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("risk")}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Risk
            </Button>
          </div>

          <div className="grid gap-4">
            {sortedFunds.slice(0, 12).map((fund, index) => (
              <Card key={fund.schemeCode} className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <Badge className={getRiskColor(fund.riskLevel)}>
                        {fund.riskLevel}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{fund.schemeName}</h3>
                    <p className="text-xs text-muted-foreground">{fund.category} • {fund.amcName}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">AI Score:</span>
                      {getStarRating(fund.aiScore)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Confidence: {(fund.confidence * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">
                        +{fund.predicted3MonthReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">3-month prediction</div>
                    <div className="text-xs">
                      Current NAV: ₹{fund.nav}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Volatility:</span>
                        <div className="font-medium">{fund.volatilityScore.toFixed(1)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sharpe:</span>
                        <div className="font-medium">{fund.sharpeRatio.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rank: {fund.performanceRank}/{fund.totalSchemes} in category
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">AI Analysis Methodology</h4>
                <div className="text-sm text-purple-800 space-y-1">
                  <p>• <strong>Multi-factor Analysis:</strong> Technical indicators, fundamental metrics, market sentiment</p>
                  <p>• <strong>Risk Assessment:</strong> Volatility analysis, beta calculation, downside protection</p>
                  <p>• <strong>Peer Comparison:</strong> Performance ranking within category and sector analysis</p>
                  <p>• <strong>Predictive Modeling:</strong> 3-month return forecasting with confidence intervals</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFundComparison;
