import React, { useState } from 'react';
import { BarChart3, TrendingUp, Shield, Award, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FundComparisonPreview = () => {
  const [selectedFunds, setSelectedFunds] = useState([
    'HDFC Top 100 Fund',
    'SBI Bluechip Fund',
    'ICICI Prudential Value Discovery Fund'
  ]);

  const availableFunds = [
    'HDFC Top 100 Fund',
    'SBI Bluechip Fund', 
    'ICICI Prudential Value Discovery Fund',
    'Axis Large Cap Fund',
    'Mirae Asset Large Cap Fund',
    'Kotak Bluechip Fund',
    'Nippon India Large Cap Fund',
    'UTI Mastershare Fund'
  ];

  const fundData = {
    'HDFC Top 100 Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      returns: { '1Y': 12.5, '3Y': 15.2, '5Y': 13.8 },
      expense: 1.05,
      rating: 4.5,
      aiVerdict: 'Strong Buy',
      aum: '₹45,230Cr'
    },
    'SBI Bluechip Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      returns: { '1Y': 11.8, '3Y': 14.7, '5Y': 13.2 },
      expense: 0.98,
      rating: 4.2,
      aiVerdict: 'Buy',
      aum: '₹38,750Cr'
    },
    'ICICI Prudential Value Discovery Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      returns: { '1Y': 13.2, '3Y': 16.1, '5Y': 14.5 },
      expense: 1.15,
      rating: 4.8,
      aiVerdict: 'Strong Buy',
      aum: '₹29,650Cr'
    },
    'Axis Large Cap Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      returns: { '1Y': 10.9, '3Y': 13.8, '5Y': 12.9 },
      expense: 1.02,
      rating: 4.0,
      aiVerdict: 'Hold',
      aum: '₹15,420Cr'
    },
    'Mirae Asset Large Cap Fund': {
      category: 'Large Cap',
      risk: 'Moderate',
      returns: { '1Y': 12.1, '3Y': 15.5, '5Y': 14.1 },
      expense: 1.08,
      rating: 4.4,
      aiVerdict: 'Buy',
      aum: '₹22,890Cr'
    }
  };

  const removeFund = (fund: string) => {
    if (selectedFunds.length > 1) {
      setSelectedFunds(selectedFunds.filter(f => f !== fund));
    }
  };

  const addFund = (fund: string) => {
    if (selectedFunds.length < 5 && !selectedFunds.includes(fund)) {
      setSelectedFunds([...selectedFunds, fund]);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Strong Buy': return 'bg-success text-success-foreground';
      case 'Buy': return 'bg-info text-info-foreground';
      case 'Hold': return 'bg-warning text-warning-foreground';
      case 'Sell': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '☆' : '');
  };

  return (
    <section id="fund-comparison-preview" className="py-20 bg-gradient-to-br from-muted via-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Advanced Fund Comparison
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare up to 5 funds side-by-side with AI-powered insights and comprehensive analytics.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Fund Selection */}
          <Card className="mb-8 border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Select Funds to Compare ({selectedFunds.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableFunds.map((fund) => (
                  <button
                    key={fund}
                    onClick={() => selectedFunds.includes(fund) ? removeFund(fund) : addFund(fund)}
                    disabled={!selectedFunds.includes(fund) && selectedFunds.length >= 5}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                      selectedFunds.includes(fund)
                        ? 'border-primary bg-primary/10 text-primary'
                        : selectedFunds.length >= 5
                        ? 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
                        : 'border-border hover:border-primary/50 text-foreground hover:bg-primary/5'
                    }`}
                  >
                    {fund}
                    {selectedFunds.includes(fund) && (
                      <X className="h-3 w-3 ml-1 inline" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="border border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Detailed Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Metrics</th>
                      {selectedFunds.map((fund) => (
                        <th key={fund} className="text-center p-4 font-semibold text-foreground min-w-[200px]">
                          <div className="space-y-1">
                            <div className="text-sm">{fund}</div>
                            <Badge variant="outline" className="text-xs">
                              {fundData[fund]?.category || 'Large Cap'}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* AI Verdict */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">AI Verdict</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <Badge className={getVerdictColor(fundData[fund]?.aiVerdict || 'Hold')}>
                            {fundData[fund]?.aiVerdict || 'Hold'}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Rating */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">Rating</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <div className="space-y-1">
                            <div className="text-accent text-lg">
                              {getRatingStars(fundData[fund]?.rating || 4.0)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {fundData[fund]?.rating || 4.0}/5
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Returns */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">1Y Returns</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <span className="font-semibold text-secondary">
                            {fundData[fund]?.returns['1Y'] || 12.0}%
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">3Y Returns</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <span className="font-semibold text-secondary">
                            {fundData[fund]?.returns['3Y'] || 14.0}%
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">5Y Returns</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <span className="font-semibold text-secondary">
                            {fundData[fund]?.returns['5Y'] || 13.0}%
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Expense Ratio */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">Expense Ratio</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <span className="font-semibold text-foreground">
                            {fundData[fund]?.expense || 1.0}%
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* AUM */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">AUM</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <span className="font-semibold text-foreground">
                            {fundData[fund]?.aum || '₹20,000Cr'}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Risk */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">Risk Level</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <Badge variant="outline" className="text-warning">
                            {fundData[fund]?.risk || 'Moderate'}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    {/* Action */}
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground">Action</td>
                      {selectedFunds.map((fund) => (
                        <td key={fund} className="p-4 text-center">
                          <Button size="sm" className="bg-primary hover:bg-primary-glow text-primary-foreground">
                            Invest Now
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-8">
            <Button size="lg" className="bg-secondary hover:bg-secondary-glow text-secondary-foreground">
              <Award className="h-4 w-4 mr-2" />
              See Detailed Comparison & Performance Charts
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Login for advanced analytics, risk analysis, and portfolio allocation recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundComparisonPreview;