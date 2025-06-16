import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, TrendingUp, TrendingDown, Brain, BarChart3, Target, AlertTriangle, Info } from "lucide-react";
import { EnhancedNAVDataService, AdvancedNAVAnalysis } from "@/services/enhancedNAVDataService";
import FundSearch from "./FundSearch";
import { useNavigate } from "react-router-dom";

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
  historical3MonthData: Array<{date: string, nav: number}>;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  volatilityScore: number;
  sharpeRatio: number;
  performanceRank: number;
  totalSchemes: number;
}

const AIFundComparison = () => {
  const [funds, setFunds] = useState<AdvancedSchemeData[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<AdvancedSchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState<"aiScore" | "returns" | "risk">("aiScore");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fundsPerPage] = useState(25);
  
  const navigate = useNavigate();
  const navService = new EnhancedNAVDataService();

  useEffect(() => {
    const fetchAndAnalyzeFunds = async () => {
      try {
        setLoading(true);
        console.log("Fetching enhanced fund analysis...");
        
        const analysisData = await navService.getAdvancedAnalysis();
        console.log("Received analysis data:", analysisData.length, "funds");
        
        // Convert and filter for Indian funds only
        const convertedFunds: AdvancedSchemeData[] = analysisData
          .map(analysis => ({
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
            historical3MonthData: analysis.historical3MonthData || [],
            riskLevel: analysis.riskLevel,
            volatilityScore: analysis.volatilityScore,
            sharpeRatio: analysis.sharpeRatio,
            performanceRank: analysis.performanceRank,
            totalSchemes: analysis.totalSchemes
          }))
          .filter(fund => {
            // Filter for Indian funds only - exclude international/global funds
            const name = fund.schemeName.toLowerCase();
            return !name.includes('international') && 
                   !name.includes('global') && 
                   !name.includes('overseas') && 
                   !name.includes('foreign') &&
                   !name.includes('us ') &&
                   !name.includes('china') &&
                   !name.includes('japan') &&
                   !name.includes('europe');
          });
        
        setFunds(convertedFunds);
        setFilteredFunds(convertedFunds);
      } catch (error) {
        console.error("Error fetching fund analysis:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzeFunds();
  }, []);

  // Filter funds based on search query and category
  useEffect(() => {
    let filtered = funds;

    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(fund => fund.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(fund => 
        fund.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.amcName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFunds(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [funds, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFundClick = (fund: AdvancedSchemeData) => {
    // Navigate to fund details page for analysis
    navigate(`/fund/${fund.schemeCode}`, { 
      state: { 
        fundData: fund 
      } 
    });
  };

  const categories = ["ALL", "Large Cap", "Mid Cap", "Small Cap", "ELSS", "Hybrid", "Debt"];

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

  // Pagination logic
  const totalPages = Math.ceil(sortedFunds.length / fundsPerPage);
  const startIndex = (currentPage - 1) * fundsPerPage;
  const endIndex = startIndex + fundsPerPage;
  const currentFunds = sortedFunds.slice(startIndex, endIndex);

  const calculateHistoricalReturn = (historicalData: Array<{date: string, nav: number}>) => {
    if (historicalData.length < 2) return 0;
    const oldestNav = historicalData[historicalData.length - 1].nav;
    const latestNav = historicalData[0].nav;
    return ((latestNav - oldestNav) / oldestNav) * 100;
  };

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
          <div className="mt-6 text-center text-sm text-gray-600">
            Loading all Indian mutual funds... This may take a few moments.
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
            AI-Powered Indian Mutual Fund Rankings & Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Comprehensive analysis of all Indian mutual funds with real-time NAV data and historical performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Regulatory Notice */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This analysis is for educational purposes only. AI predictions are based on historical data and do not guarantee future results. 
                Please consult a SEBI-registered financial advisor before making investment decisions.
              </AlertDescription>
            </Alert>

            {/* Search Bar */}
            <div className="flex justify-center">
              <FundSearch 
                onSearch={handleSearch}
                placeholder="Search Indian mutual funds by name, AMC, or category..."
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-1">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Sort Buttons */}
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
                3M Historical
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

            {/* Results Count and Pagination Info */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div>
                Showing {startIndex + 1}-{Math.min(endIndex, sortedFunds.length)} of {sortedFunds.length} Indian mutual funds
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <div>
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Fund List */}
            <div className="grid gap-4">
              {currentFunds.map((fund, index) => {
                const historicalReturn = calculateHistoricalReturn(fund.historical3MonthData);
                
                return (
                  <Card 
                    key={fund.schemeCode} 
                    className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleFundClick(fund)}
                  >
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            #{startIndex + index + 1}
                          </Badge>
                          <Badge className={getRiskColor(fund.riskLevel)}>
                            {fund.riskLevel}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm leading-tight hover:text-blue-600 transition-colors">
                          {fund.schemeName}
                        </h3>
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
                          {historicalReturn >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-semibold ${
                            historicalReturn >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {historicalReturn >= 0 ? '+' : ''}{historicalReturn.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">3-month actual return</div>
                        <div className="text-xs">
                          Current NAV: ₹{fund.nav.toFixed(4)}
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
                          Rank: {fund.performanceRank}/{fund.totalSchemes} in {fund.category}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                          <BarChart3 className="h-3 w-3" />
                          Click to analyze
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {/* Page numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {sortedFunds.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No mutual funds found matching your search criteria.
                </p>
              </div>
            )}

            {/* AI Analysis Methodology */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-2">AI Analysis Methodology</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p>• <strong>Real-time Data:</strong> Current NAV and historical performance from AMFI</p>
                    <p>• <strong>Multi-factor Analysis:</strong> Technical indicators, fundamental metrics, category comparison</p>
                    <p>• <strong>Risk Assessment:</strong> Volatility analysis, consistency scoring, drawdown protection</p>
                    <p>• <strong>Category Ranking:</strong> Performance ranking within specific fund categories</p>
                    <p>• <strong>Historical Returns:</strong> Actual 3-month performance based on NAV changes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Past performance is not indicative of future results. 
                This AI analysis is for educational purposes and should not be considered as investment advice. Please read scheme documents carefully 
                and consult with a SEBI-registered financial advisor before investing.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFundComparison;
