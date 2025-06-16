
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, TrendingUp, TrendingDown, Brain, BarChart3, Target, Zap } from 'lucide-react';
import { EnhancedNAVDataService } from '@/services/enhancedNAVDataService';
import AdvancedFundChart from './AdvancedFundChart';

interface AdvancedSchemeData {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
  category: string;
  subCategory: string;
  amcName: string;
  aiScore: number;
  predictedReturn3Month: number;
  riskScore: number;
  volatilityScore: number;
  consistencyScore: number;
  momentumScore: number;
  valuationScore: number;
  benchmarkComparison: number;
  sectorRanking: number;
  confidenceLevel: number;
}

const AIFundComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Large Cap');
  const [schemes, setSchemes] = useState<AdvancedSchemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<AdvancedSchemeData | null>(null);
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);

  const categories = [
    'Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap', 'Flexi Cap', 
    'ELSS', 'Debt', 'Hybrid', 'International', 'Sectoral/Thematic'
  ];

  useEffect(() => {
    fetchAndAnalyzeSchemes();
    loadBenchmarkData();
  }, [selectedCategory]);

  const loadBenchmarkData = async () => {
    try {
      const data = await EnhancedNAVDataService.getRealBenchmarkData();
      setBenchmarkData(data);
    } catch (error) {
      console.error('Error loading benchmark data:', error);
    }
  };

  const fetchAndAnalyzeSchemes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching advanced analysis for category:', selectedCategory);
      
      // Generate mock schemes for demonstration
      const mockSchemes = generateMockSchemes(selectedCategory);
      const analysisResults = await EnhancedNAVDataService.getAdvancedAIAnalysis(mockSchemes, selectedCategory);
      
      setSchemes(analysisResults);
    } catch (err) {
      console.error('Error fetching scheme analysis:', err);
      setError('Failed to fetch advanced analysis. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const generateMockSchemes = (category: string) => {
    const amcNames = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Mirae', 'Franklin', 'Nippon'];
    const schemes = [];
    
    for (let i = 0; i < 12; i++) {
      schemes.push({
        schemeCode: `${category.replace(' ', '')}_${i + 1}`,
        schemeName: `${amcNames[i % amcNames.length]} ${category} Fund ${i % 2 ? 'Direct' : 'Regular'}`,
        nav: 150 + Math.random() * 400,
        date: new Date().toISOString().split('T')[0],
        category,
        subCategory: 'Diversified',
        amcName: amcNames[i % amcNames.length]
      });
    }
    
    return schemes;
  };

  const renderAdvancedStarRating = (rating: number, confidence: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars / 2) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === Math.floor(fullStars / 2) && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-sm font-semibold ml-1">{rating.toFixed(1)}/10</span>
        <span className="text-xs text-muted-foreground">({confidence}% confidence)</span>
      </div>
    );
  };

  const getPerformanceBadge = (predicted: number) => {
    if (predicted >= 8) return { label: 'Strong Buy', variant: 'default' as const, color: 'bg-green-600' };
    if (predicted >= 5) return { label: 'Buy', variant: 'secondary' as const, color: 'bg-blue-600' };
    if (predicted >= 2) return { label: 'Hold', variant: 'outline' as const, color: 'bg-yellow-600' };
    return { label: 'Weak', variant: 'destructive' as const, color: 'bg-red-600' };
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Advanced AI Fund Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Running advanced AI analysis...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-red-600" />
            Advanced AI Fund Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchAndAnalyzeSchemes}>
              Retry Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Advanced AI Fund Analysis
            </CardTitle>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Real-time Benchmark Info */}
          {benchmarkData.length > 0 && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              {benchmarkData.slice(0, 3).map(benchmark => (
                <div key={benchmark.symbol} className="flex items-center gap-1">
                  <span>{benchmark.name}:</span>
                  <span className={benchmark.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {benchmark.price.toFixed(0)} ({benchmark.changePercent >= 0 ? '+' : ''}{benchmark.changePercent.toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {schemes.map((scheme, index) => {
              const performanceBadge = getPerformanceBadge(scheme.predictedReturn3Month);
              
              return (
                <Card key={scheme.schemeCode} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedFund(scheme)}>
                  <div className="grid md:grid-cols-5 gap-4 items-center">
                    {/* Fund Info */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {scheme.amcName}
                        </Badge>
                        <Badge 
                          className={performanceBadge.color + ' text-white'}
                          variant={performanceBadge.variant}
                        >
                          {performanceBadge.label}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm leading-tight mb-1">
                        {scheme.schemeName}
                      </h4>
                      <div className="text-xs text-muted-foreground">
                        Rank #{scheme.sectorRanking} in {selectedCategory}
                      </div>
                    </div>
                    
                    {/* Current NAV & Performance */}
                    <div className="text-center">
                      <div className="text-lg font-bold">₹{scheme.nav.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Current NAV</div>
                      <div className="flex items-center justify-center mt-1">
                        {scheme.predictedReturn3Month >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={`text-xs ${scheme.predictedReturn3Month >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {scheme.predictedReturn3Month >= 0 ? '+' : ''}{scheme.predictedReturn3Month.toFixed(1)}% (3M)
                        </span>
                      </div>
                    </div>
                    
                    {/* AI Rating */}
                    <div className="text-center">
                      {renderAdvancedStarRating(scheme.aiScore, scheme.confidenceLevel)}
                      <div className="text-xs text-muted-foreground mt-1">
                        AI Prediction Score
                      </div>
                    </div>
                    
                    {/* Advanced Metrics */}
                    <div className="space-y-1">
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3 text-blue-600" />
                          <span>Risk: {scheme.riskScore}/10</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-yellow-600" />
                          <span>Momentum: {scheme.momentumScore.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3 text-green-600" />
                          <span>Consistency: {scheme.consistencyScore.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-purple-600" />
                          <span>vs Benchmark: {scheme.benchmarkComparison >= 0 ? '+' : ''}{scheme.benchmarkComparison.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Advanced AI Analysis Summary</span>
            </div>
            <p className="text-sm text-blue-800">
              Our AI analyzes multiple factors: momentum, volatility, consistency, valuation, and benchmark comparison. 
              The confidence level indicates data reliability. Star ratings predict 3-month performance potential 
              considering sector trends, recent performance, and market conditions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Chart for Selected Fund */}
      {selectedFund && (
        <AdvancedFundChart 
          primaryFund={{
            schemeCode: selectedFund.schemeCode,
            schemeName: selectedFund.schemeName,
            category: selectedFund.category,
            nav: selectedFund.nav,
            aiScore: selectedFund.aiScore
          }}
        />
      )}
    </div>
  );
};

export default AIFundComparison;
