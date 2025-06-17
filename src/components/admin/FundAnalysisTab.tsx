
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FundAnalysisService } from '@/services/fundAnalysisService';
import { 
  TrendingUp, 
  BarChart3, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Star,
  Building
} from 'lucide-react';

interface AnalysisProgress {
  stage: string;
  progress: number;
  message: string;
}

const FundAnalysisTab = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({
    stage: 'idle',
    progress: 0,
    message: ''
  });
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<string>('');
  const { toast } = useToast();

  // Load cached results on component mount
  useState(() => {
    const cachedResults = FundAnalysisService.loadAnalysisResults();
    if (cachedResults) {
      setAnalysisResults(cachedResults);
      const timestamp = localStorage.getItem('fund_analysis_timestamp');
      if (timestamp) {
        setLastAnalysisTime(new Date(parseInt(timestamp)).toLocaleString());
      }
    }
  });

  const startFullAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress({ stage: 'starting', progress: 0, message: 'Initializing market analysis...' });

    try {
      // Update progress periodically during analysis
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
          message: getProgressMessage(prev.progress)
        }));
      }, 3000);

      // Perform the analysis
      const results = await FundAnalysisService.performFullMarketAnalysis();
      
      clearInterval(progressInterval);
      
      // Save results
      FundAnalysisService.saveAnalysisResults(results);
      
      setAnalysisResults(results);
      setLastAnalysisTime(new Date().toLocaleString());
      setAnalysisProgress({ stage: 'completed', progress: 100, message: 'Analysis completed successfully!' });

      toast({
        title: "Analysis Completed",
        description: `Successfully analyzed ${results.reduce((sum, cat) => sum + cat.funds.length, 0)} top funds across ${results.length} categories.`,
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisProgress({ stage: 'error', progress: 0, message: 'Analysis failed. Please try again.' });
      
      toast({
        title: "Analysis Failed",
        description: "There was an error during the market analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => {
        setAnalysisProgress({ stage: 'idle', progress: 0, message: '' });
      }, 5000);
    }
  };

  const getProgressMessage = (progress: number): string => {
    if (progress < 20) return 'Fetching fund list from market data...';
    if (progress < 40) return 'Analyzing fund performance metrics...';
    if (progress < 60) return 'Calculating AI scores and rankings...';
    if (progress < 80) return 'Categorizing and sorting funds...';
    return 'Finalizing top 10 selections...';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Large Cap': return <Building className="h-4 w-4" />;
      case 'Mid Cap': return <TrendingUp className="h-4 w-4" />;
      case 'Small Cap': return <Zap className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Large Cap': return 'bg-blue-100 text-blue-800';
      case 'Mid Cap': return 'bg-green-100 text-green-800';
      case 'Small Cap': return 'bg-red-100 text-red-800';
      case 'ELSS': return 'bg-purple-100 text-purple-800';
      case 'Debt': return 'bg-gray-100 text-gray-800';
      case 'Hybrid': return 'bg-orange-100 text-orange-800';
      case 'Index': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Fund Market Analysis
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Analyze the entire mutual fund market and generate top 10 funds for each category based on AI scoring.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Market Analysis Status</h3>
              {lastAnalysisTime ? (
                <p className="text-sm text-muted-foreground">
                  Last analysis: {lastAnalysisTime}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No previous analysis found
                </p>
              )}
            </div>
            
            <Button 
              onClick={startFullAnalysis} 
              disabled={isAnalyzing}
              className="min-w-32"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Analysis
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Progress value={analysisProgress.progress} className="flex-1" />
                <span className="text-sm font-medium">{analysisProgress.progress}%</span>
              </div>
              <p className="text-sm text-muted-foreground">{analysisProgress.message}</p>
            </div>
          )}

          {analysisProgress.stage === 'completed' && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Analysis completed successfully!</span>
            </div>
          )}

          {analysisProgress.stage === 'error' && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Analysis failed. Please try again.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analysis Results</h2>
          
          <div className="grid gap-4">
            {analysisResults.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category.category)}
                    {category.category}
                    <Badge variant="secondary" className={getCategoryColor(category.category)}>
                      {category.funds.length} funds
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {category.funds.slice(0, 5).map((fund: any, fundIndex: number) => (
                      <div 
                        key={fundIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{fund.schemeName}</h4>
                          <p className="text-xs text-muted-foreground">{fund.fundHouse}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            {fund.aiScore}
                          </Badge>
                          <div className="text-right">
                            <div className="text-sm font-bold">₹{fund.nav.toFixed(4)}</div>
                            <div className="text-xs text-muted-foreground">#{fundIndex + 1}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {category.funds.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center py-2">
                        +{category.funds.length - 5} more funds analyzed
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FundAnalysisTab;
