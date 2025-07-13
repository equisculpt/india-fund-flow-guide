import React, { useState } from 'react';
import { Brain, Search, TrendingUp, AlertTriangle, Target, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AIAnalysisPreview = () => {
  const [selectedFund, setSelectedFund] = useState('HDFC Top 100 Fund');
  const [searchQuery, setSearchQuery] = useState('');

  const sampleFunds = [
    'HDFC Top 100 Fund',
    'SBI Bluechip Fund',
    'ICICI Prudential Value Discovery Fund',
    'Axis Large Cap Fund',
    'Mirae Asset Large Cap Fund'
  ];

  const filteredFunds = sampleFunds.filter(fund => 
    fund.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const analysisData = {
    'HDFC Top 100 Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      riskScore: 3,
      returns: {
        '1Y': 12.5,
        '3Y': 15.2,
        '5Y': 13.8
      },
      aiScore: 85,
      aiInsight: "Strong fundamentally sound large-cap fund with consistent performance. Suitable for conservative investors seeking steady growth.",
      pros: [
        "Experienced fund management team",
        "Low expense ratio of 1.05%",
        "Consistent top-quartile performance"
      ],
      cons: [
        "Large fund size may impact agility",
        "Lower allocation to mid-cap opportunities"
      ],
      recommendation: "Buy",
      suitability: "Conservative to Moderate investors with 3+ year horizon"
    }
  };

  const currentAnalysis = analysisData[selectedFund] || analysisData['HDFC Top 100 Fund'];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'buy': return 'bg-success text-success-foreground';
      case 'hold': return 'bg-warning text-warning-foreground';
      case 'sell': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="ai-analysis-preview" className="py-20 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            AI-Powered Fund Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant AI insights on any mutual fund. No login required - explore our intelligent analysis tools.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fund Search */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Search Any Mutual Fund
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search from 3000+ mutual funds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Popular Funds:</p>
                  {filteredFunds.slice(0, 5).map((fund) => (
                    <button
                      key={fund}
                      onClick={() => setSelectedFund(fund)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedFund === fund 
                          ? 'border-primary bg-primary/5 text-foreground' 
                          : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {fund}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Results */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fund Header */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground">{selectedFund}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{currentAnalysis.category}</Badge>
                    <Badge className={getRiskColor(currentAnalysis.risk)}>
                      {currentAnalysis.risk} Risk
                    </Badge>
                  </div>
                </div>

                {/* AI Score */}
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">AI Investment Score</p>
                    <p className="text-2xl font-bold text-primary">{currentAnalysis.aiScore}/100</p>
                  </div>
                  <Badge className={getRecommendationColor(currentAnalysis.recommendation)}>
                    {currentAnalysis.recommendation}
                  </Badge>
                </div>

                {/* Returns */}
                <div>
                  <p className="font-semibold text-foreground mb-2">Historical Returns</p>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(currentAnalysis.returns).map(([period, return_]) => (
                      <div key={period} className="text-center">
                        <p className="text-sm text-muted-foreground">{period}</p>
                        <p className="font-semibold text-secondary">{return_ as number}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insight */}
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground">{currentAnalysis.aiInsight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="mt-8 border border-border/50">
            <CardHeader>
              <CardTitle>Detailed AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div>
                  <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {currentAnalysis.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="font-semibold text-warning mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Considerations
                  </h4>
                  <ul className="space-y-2">
                    {currentAnalysis.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suitability */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Investor Suitability
                </h4>
                <p className="text-sm text-muted-foreground">{currentAnalysis.suitability}</p>
              </div>

              {/* CTA */}
              <div className="mt-6 text-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground">
                  <Star className="h-4 w-4 mr-2" />
                  See Full Analysis & Invest
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Login required for detailed portfolio analysis and investment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIAnalysisPreview;