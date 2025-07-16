import React, { useState } from 'react';
import { BarChart3, TrendingUp, Shield, Award, Plus, X, Info, Target, Radar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WorldClassFundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState([
    'HDFC Mid Cap Opportunities Fund',
    'ICICI Prudential Bluechip Fund',
    'SBI Small Cap Fund'
  ]);

  const availableFunds = [
    { name: 'HDFC Mid Cap Opportunities Fund', category: 'Mid Cap', color: 'orange' },
    { name: 'ICICI Prudential Bluechip Fund', category: 'Large Cap', color: 'blue' },
    { name: 'SBI Small Cap Fund', category: 'Small Cap', color: 'green' },
    { name: 'Axis Large Cap Fund', category: 'Large Cap', color: 'blue' },
    { name: 'Mirae Asset Large Cap Fund', category: 'Large Cap', color: 'blue' },
    { name: 'DSP Mid Cap Fund', category: 'Mid Cap', color: 'orange' },
    { name: 'Nippon India Small Cap Fund', category: 'Small Cap', color: 'green' },
    { name: 'HDFC Hybrid Equity Fund', category: 'Hybrid', color: 'purple' }
  ];

  const fundData = {
    'HDFC Mid Cap Opportunities Fund': {
      category: 'Mid Cap',
      color: 'orange',
      rating: 8.3,
      returns: { '1Y': 12.5, '3Y': 15.2, '5Y': 13.8 },
      risk: { volatility: 15.2, maxDrawdown: 18.5, beta: 1.12 },
      cost: { expense: 1.75, exitLoad: '1% if redeemed before 1 year' },
      consistency: 78,
      fundHouse: 'HDFC Mutual Fund',
      taxEfficiency: 85,
      liquidity: 'T+1',
      aum: '₹45,230Cr'
    },
    'ICICI Prudential Bluechip Fund': {
      category: 'Large Cap',
      color: 'blue',
      rating: 7.9,
      returns: { '1Y': 10.2, '3Y': 14.7, '5Y': 13.2 },
      risk: { volatility: 12.8, maxDrawdown: 15.2, beta: 0.95 },
      cost: { expense: 1.65, exitLoad: '1% if redeemed before 1 year' },
      consistency: 85,
      fundHouse: 'ICICI Prudential Mutual Fund',
      taxEfficiency: 82,
      liquidity: 'T+1',
      aum: '₹38,750Cr'
    },
    'SBI Small Cap Fund': {
      category: 'Small Cap',
      color: 'green',
      rating: 8.7,
      returns: { '1Y': 14.1, '3Y': 16.8, '5Y': 15.1 },
      risk: { volatility: 18.5, maxDrawdown: 22.3, beta: 1.25 },
      cost: { expense: 1.85, exitLoad: '1% if redeemed before 1 year' },
      consistency: 72,
      fundHouse: 'SBI Mutual Fund',
      taxEfficiency: 78,
      liquidity: 'T+1',
      aum: '₹29,650Cr'
    }
  };

  const categoryColors = {
    'Large Cap': 'bg-blue-500',
    'Mid Cap': 'bg-orange-500',
    'Small Cap': 'bg-green-500',
    'Hybrid': 'bg-purple-500',
    'Debt': 'bg-teal-500'
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600 bg-green-50';
    if (rating >= 8) return 'text-green-500 bg-green-50';
    if (rating >= 7) return 'text-lime-600 bg-lime-50';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-50';
    if (rating >= 5) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
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

  const getFundByName = (name: string) => availableFunds.find(f => f.name === name);
  const hasMultipleCategories = new Set(selectedFunds.map(fund => getFundByName(fund)?.category)).size > 1;

  const DetailedAnalysisModal = ({ fund }: { fund: string }) => {
    const data = fundData[fund as keyof typeof fundData];
    if (!data) return null;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Info className="h-3 w-3 mr-1" />
            Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${categoryColors[data.category as keyof typeof categoryColors]}`}></div>
              {fund}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
              <TabsTrigger value="consistency">Consistency</TabsTrigger>
              <TabsTrigger value="fundhouse">Fund House</TabsTrigger>
              <TabsTrigger value="tax">Tax</TabsTrigger>
              <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{data.returns['1Y']}%</div>
                  <div className="text-sm text-muted-foreground">1 Year</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{data.returns['3Y']}%</div>
                  <div className="text-sm text-muted-foreground">3 Year</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{data.returns['5Y']}%</div>
                  <div className="text-sm text-muted-foreground">5 Year</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This fund has shown {data.returns['1Y'] > 12 ? 'excellent' : 'good'} performance with consistent returns across different time horizons.
              </p>
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{data.risk.volatility}%</div>
                  <div className="text-sm text-muted-foreground">Volatility</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{data.risk.maxDrawdown}%</div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-info">{data.risk.beta}</div>
                  <div className="text-sm text-muted-foreground">Beta</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Risk profile shows {data.risk.volatility > 15 ? 'higher' : 'moderate'} volatility suitable for {data.category.toLowerCase()} investments.
              </p>
            </TabsContent>
            
            <TabsContent value="cost" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{data.cost.expense}%</div>
                  <div className="text-sm text-muted-foreground">Expense Ratio</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium">{data.cost.exitLoad}</div>
                  <div className="text-sm text-muted-foreground">Exit Load</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="consistency" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">{data.consistency}%</div>
                <div className="text-sm text-muted-foreground">Consistency Score</div>
              </div>
            </TabsContent>
            
            <TabsContent value="fundhouse" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="font-semibold">{data.fundHouse}</div>
                <div className="text-sm text-muted-foreground">AUM: {data.aum}</div>
              </div>
            </TabsContent>
            
            <TabsContent value="tax" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-success">{data.taxEfficiency}%</div>
                <div className="text-sm text-muted-foreground">Tax Efficiency</div>
              </div>
            </TabsContent>
            
            <TabsContent value="liquidity" className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-info">{data.liquidity}</div>
                <div className="text-sm text-muted-foreground">Settlement</div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="pt-4">
            <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground">
              <Target className="h-4 w-4 mr-2" />
              Invest Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section id="fund-comparison-preview" className="py-20 bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            World-Class Fund Comparison
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare up to 5 funds with detailed analytics, AI insights, and comprehensive metrics.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Fund Selector */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Select Funds to Compare ({selectedFunds.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Funds */}
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund) => {
                  const fundInfo = getFundByName(fund);
                  return (
                    <div key={fund} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                      <div className={`w-3 h-3 rounded-full ${categoryColors[fundInfo?.category as keyof typeof categoryColors]}`}></div>
                      <span className="text-sm font-medium">{fund}</span>
                      <button onClick={() => removeFund(fund)} className="text-primary hover:text-primary-glow">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {/* Warning for multiple categories */}
              {hasMultipleCategories && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    You're comparing funds from different categories. This is useful for portfolio diversification, but consider category-specific analysis for better insights.
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Available Funds */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableFunds.filter(f => !selectedFunds.includes(f.name)).map((fund) => (
                  <button
                    key={fund.name}
                    onClick={() => addFund(fund.name)}
                    disabled={selectedFunds.length >= 5}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all text-left ${
                      selectedFunds.length >= 5
                        ? 'border-border bg-muted/50 text-muted-foreground cursor-not-allowed'
                        : 'border-border hover:border-primary/50 text-foreground hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${categoryColors[fund.category as keyof typeof categoryColors]}`}></div>
                      <Badge variant="outline" className="text-xs">{fund.category}</Badge>
                    </div>
                    <div className="text-xs">{fund.name}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison Table */}
          <Card className="border border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Detailed Metrics Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground sticky left-0 bg-muted/50">Metrics</th>
                      {selectedFunds.map((fund) => {
                        const fundInfo = getFundByName(fund);
                        const data = fundData[fund as keyof typeof fundData];
                        return (
                          <th key={fund} className="text-center p-4 font-semibold text-foreground min-w-[200px]">
                            <div className="space-y-2">
                              <div className="flex items-center justify-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${categoryColors[fundInfo?.category as keyof typeof categoryColors]}`}></div>
                                <Badge variant="outline" className="text-xs">{fundInfo?.category}</Badge>
                              </div>
                              <div className="text-sm font-medium">{fund}</div>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-bold ${getRatingColor(data?.rating || 0)}`}>
                                {data?.rating || 0}/10
                              </div>
                              <div className="text-xs text-muted-foreground">{data?.fundHouse}</div>
                              <DetailedAnalysisModal fund={fund} />
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Returns Section */}
                    <tr className="border-t border-border/50 bg-muted/20">
                      <td colSpan={selectedFunds.length + 1} className="p-3 font-semibold text-primary">Performance Returns</td>
                    </tr>
                    {['1Y', '3Y', '5Y'].map((period) => (
                      <tr key={period} className="border-t border-border/50">
                        <td className="p-4 font-medium text-foreground sticky left-0 bg-background">{period} Returns</td>
                        {selectedFunds.map((fund) => {
                          const data = fundData[fund as keyof typeof fundData];
                          const value = data?.returns[period as keyof typeof data.returns] || 0;
                          return (
                            <td key={fund} className="p-4 text-center">
                              <span className="font-semibold text-secondary text-lg">{value}%</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Risk Section */}
                    <tr className="border-t border-border/50 bg-muted/20">
                      <td colSpan={selectedFunds.length + 1} className="p-3 font-semibold text-warning">Risk Metrics</td>
                    </tr>
                    {[
                      { key: 'volatility', label: 'Volatility', suffix: '%' },
                      { key: 'maxDrawdown', label: 'Max Drawdown', suffix: '%' },
                      { key: 'beta', label: 'Beta', suffix: '' }
                    ].map((metric) => (
                      <tr key={metric.key} className="border-t border-border/50">
                        <td className="p-4 font-medium text-foreground sticky left-0 bg-background">{metric.label}</td>
                        {selectedFunds.map((fund) => {
                          const data = fundData[fund as keyof typeof fundData];
                          const value = data?.risk[metric.key as keyof typeof data.risk] || 0;
                          return (
                            <td key={fund} className="p-4 text-center">
                              <span className="font-semibold text-foreground">{value}{metric.suffix}</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Cost Section */}
                    <tr className="border-t border-border/50 bg-muted/20">
                      <td colSpan={selectedFunds.length + 1} className="p-3 font-semibold text-destructive">Cost Analysis</td>
                    </tr>
                    <tr className="border-t border-border/50">
                      <td className="p-4 font-medium text-foreground sticky left-0 bg-background">Expense Ratio</td>
                      {selectedFunds.map((fund) => {
                        const data = fundData[fund as keyof typeof fundData];
                        return (
                          <td key={fund} className="p-4 text-center">
                            <span className="font-semibold text-foreground">{data?.cost.expense || 0}%</span>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Other Metrics */}
                    {[
                      { key: 'consistency', label: 'Consistency Score', suffix: '%', color: 'text-secondary' },
                      { key: 'taxEfficiency', label: 'Tax Efficiency', suffix: '%', color: 'text-success' }
                    ].map((metric) => (
                      <tr key={metric.key} className="border-t border-border/50">
                        <td className="p-4 font-medium text-foreground sticky left-0 bg-background">{metric.label}</td>
                        {selectedFunds.map((fund) => {
                          const data = fundData[fund as keyof typeof fundData];
                          const value = data?.[metric.key as keyof typeof data] as number || 0;
                          return (
                            <td key={fund} className="p-4 text-center">
                              <span className={`font-semibold ${metric.color}`}>{value}{metric.suffix}</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Action Row */}
                    <tr className="border-t border-border/50 bg-muted/20">
                      <td className="p-4 font-medium text-foreground sticky left-0 bg-muted/20">Action</td>
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

          {/* AI Verdict Section */}
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="h-5 w-5 text-accent" />
                AI Verdict & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-semibold text-success">Best for Growth</span>
                  </div>
                  <p className="text-sm text-foreground">SBI Small Cap Fund (8.7/10) - Highest returns potential</p>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Most Stable</span>
                  </div>
                  <p className="text-sm text-foreground">ICICI Bluechip Fund (7.9/10) - Lowest volatility</p>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-warning" />
                    <span className="font-semibold text-warning">Best Balance</span>
                  </div>
                  <p className="text-sm text-foreground">HDFC Mid Cap (8.3/10) - Risk-return balance</p>
                </div>
              </div>
              
              {hasMultipleCategories && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Portfolio Recommendation:</strong> Consider allocating 60% to Large Cap (ICICI), 25% to Mid Cap (HDFC), and 15% to Small Cap (SBI) for balanced growth.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary-glow text-secondary-foreground">
              <Target className="h-4 w-4 mr-2" />
              Start Investing with Selected Funds
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Login for portfolio allocation recommendations and automated rebalancing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldClassFundComparison;
