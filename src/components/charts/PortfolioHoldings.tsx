import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Building, Briefcase, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AMFIPortfolioService, AMFIPortfolioData } from '@/services/AMFIPortfolioScraper';

interface PortfolioHoldingsProps {
  fundData: any;
}

const PortfolioHoldings = ({ fundData }: PortfolioHoldingsProps) => {
  const [portfolioData, setPortfolioData] = useState<AMFIPortfolioData | null>(null);
  const [recentChanges, setRecentChanges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadPortfolioData();
  }, [fundData.schemeCode]);

  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      console.log('Loading portfolio data for scheme:', fundData.schemeCode);
      
      const data = await AMFIPortfolioService.scrapePortfolioData(fundData.schemeCode);
      const changes = await AMFIPortfolioService.getRecentPortfolioChanges(fundData.schemeCode);
      
      setPortfolioData(data);
      setRecentChanges(changes);
      setLastUpdated(new Date().toLocaleString());
      
      console.log('Portfolio data loaded:', data);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-muted-foreground">Loading portfolio holdings from AMFI...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Unable to load portfolio data</p>
              <Button onClick={loadPortfolioData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Portfolio Overview
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
              <Button size="sm" variant="outline" onClick={loadPortfolioData}>
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹{portfolioData.aum.toFixed(0)} Cr</div>
              <div className="text-sm text-gray-600">Total AUM</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{portfolioData.holdings.length}</div>
              <div className="text-sm text-gray-600">Total Holdings</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{portfolioData.portfolioTurnover.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Portfolio Turnover</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Top Holdings (as of {portfolioData.portfolioDate})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolioData.holdings.slice(0, 10).map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{holding.stockName}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{holding.percentage}%</span>
                      <span className="text-sm text-gray-600">
                        ₹{(holding.marketValue / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{holding.isin}</Badge>
                    <Progress value={holding.percentage} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-green-600" />
            Sector-wise Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioData.sectorAllocation.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{sector.sector}</span>
                  <span className="font-bold">{sector.percentage}%</span>
                </div>
                <Progress 
                  value={sector.percentage} 
                  className="h-3"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Portfolio Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Portfolio Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentChanges.map((change, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={change.action === 'Added' ? 'default' : 
                            change.action === 'Increased' ? 'secondary' : 
                            change.action === 'Reduced' ? 'outline' : 'destructive'}
                  >
                    {change.action}
                  </Badge>
                  <span className="font-medium">{change.stockName}</span>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    change.action === 'Added' || change.action === 'Increased' 
                      ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change.percentageChange}
                  </div>
                  <div className="text-xs text-gray-500">{change.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioHoldings;
