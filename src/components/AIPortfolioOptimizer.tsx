
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchemeAnalysis {
  currentScheme: string;
  currentReturns: number;
  suggestedScheme: string;
  suggestedReturns: number;
  reason: string;
  projectedGain: number;
  risk: 'Low' | 'Medium' | 'High';
  confidence: number;
}

interface PortfolioSuggestion {
  id: string;
  type: 'underperforming' | 'better_alternative' | 'rebalance' | 'market_opportunity';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  analysis: SchemeAnalysis;
  impact: string;
}

const AIPortfolioOptimizer = () => {
  const [suggestions, setSuggestions] = useState<PortfolioSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate AI analysis on component mount
    analyzePortfolio();
  }, []);

  const analyzePortfolio = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI suggestions based on market analysis
    const mockSuggestions: PortfolioSuggestion[] = [
      {
        id: '1',
        type: 'underperforming',
        priority: 'high',
        title: 'ICICI Prudential Bluechip Underperforming',
        description: 'Your investment in ICICI Prudential Bluechip has been underperforming compared to category average by 3.2% over the last 6 months.',
        analysis: {
          currentScheme: 'ICICI Prudential Bluechip',
          currentReturns: 11.2,
          suggestedScheme: 'HDFC Top 100 Fund',
          suggestedReturns: 15.2,
          reason: 'Better fund management and consistent performance track record',
          projectedGain: 28500,
          risk: 'Medium',
          confidence: 87
        },
        impact: 'Potential additional returns of ₹28,500 over next 12 months'
      },
      {
        id: '2',
        type: 'better_alternative',
        priority: 'medium',
        title: 'Tech Sector Opportunity',
        description: 'AI analysis shows technology sector funds are showing strong momentum. Consider adding tech-focused allocation.',
        analysis: {
          currentScheme: 'Current Portfolio Mix',
          currentReturns: 12.8,
          suggestedScheme: 'Mirae Asset Digital India Fund',
          suggestedReturns: 18.5,
          reason: 'Digital transformation trends and strong IT sector fundamentals',
          projectedGain: 45200,
          risk: 'High',
          confidence: 72
        },
        impact: 'Potential portfolio enhancement of 5.7% annual returns'
      },
      {
        id: '3',
        type: 'rebalance',
        priority: 'low',
        title: 'Portfolio Rebalancing Recommended',
        description: 'Your portfolio allocation has drifted from optimal targets due to market movements.',
        analysis: {
          currentScheme: 'Overall Portfolio',
          currentReturns: 13.5,
          suggestedScheme: 'Rebalanced Portfolio',
          suggestedReturns: 15.1,
          reason: 'Maintain risk-return optimization and reduce concentration risk',
          projectedGain: 12300,
          risk: 'Low',
          confidence: 94
        },
        impact: 'Better risk-adjusted returns and reduced volatility'
      }
    ];
    
    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  const handleSuggestionAction = (suggestion: PortfolioSuggestion, action: 'implement' | 'dismiss') => {
    if (action === 'implement') {
      toast({
        title: "Suggestion Implemented",
        description: `Initiated transfer from ${suggestion.analysis.currentScheme} to ${suggestion.analysis.suggestedScheme}`,
      });
      // TODO: Implement actual fund transfer logic
    } else {
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
      toast({
        title: "Suggestion Dismissed",
        description: "We'll remember your preference for future recommendations",
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'underperforming': return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'better_alternative': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'rebalance': return <Target className="h-5 w-5 text-blue-600" />;
      case 'market_opportunity': return <Lightbulb className="h-5 w-5 text-amber-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Portfolio Optimizer</h2>
          <p className="text-gray-600">AI-powered suggestions to enhance your investment performance</p>
        </div>
        <Button onClick={analyzePortfolio} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Re-analyze Portfolio'}
        </Button>
      </div>

      {isAnalyzing ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">AI is analyzing your portfolio performance...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Lightbulb className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Optimized!</h3>
                <p className="text-gray-600">Your current portfolio allocation looks good. We'll notify you if any optimization opportunities arise.</p>
              </CardContent>
            </Card>
          ) : (
            suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(suggestion.type)}
                      <div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <span className="text-sm text-gray-600">
                            Confidence: {suggestion.analysis.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{suggestion.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Current: {suggestion.analysis.currentScheme}</p>
                        <p className="font-medium">{suggestion.analysis.currentReturns}% returns</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Suggested: {suggestion.analysis.suggestedScheme}</p>
                        <p className="font-medium text-green-600">{suggestion.analysis.suggestedReturns}% returns</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Reason:</p>
                      <p className="text-sm">{suggestion.analysis.reason}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Risk Level: 
                        <span className={`ml-1 font-medium ${
                          suggestion.analysis.risk === 'High' ? 'text-red-600' :
                          suggestion.analysis.risk === 'Medium' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {suggestion.analysis.risk}
                        </span>
                      </span>
                      <span className="font-medium text-green-600">{suggestion.impact}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSuggestionAction(suggestion, 'implement')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Implement Suggestion
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleSuggestionAction(suggestion, 'dismiss')}
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AIPortfolioOptimizer;
