
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Star, Filter, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useTopFundsNAV } from "@/hooks/useTopFundsNAV";
import { FundDataService } from "@/services/fundDataService";
import FundCard from "./FundCard";

interface FundDisplayData {
  id: string;
  scheme_name: string;
  amc_name: string;
  category: string;
  nav: number;
  returns_1y: number;
  returns_3y: number;
  risk_level: string;
  min_sip_amount: number;
  schemeCode: string;
}

const AIFundComparison = () => {
  const { navData, loading: navLoading } = useTopFundsNAV();
  const [fundsData, setFundsData] = useState<FundDisplayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareFundsData = () => {
      console.log('🔄 AI FUND COMPARISON - Preparing display data from NAV data...');
      
      const funds: FundDisplayData[] = [];
      
      // Convert NAV data to display format using FundDataService mock data
      FundDataService.TOP_FUNDS.forEach(topFund => {
        const navInfo = navData.get(topFund.schemeCode);
        const mockData = FundDataService.getMockFundData(topFund.schemeCode);
        
        const fund: FundDisplayData = {
          id: topFund.schemeCode,
          scheme_name: navInfo?.actualSchemeName || mockData.schemeName,
          amc_name: navInfo?.fundHouse || mockData.amc,
          category: mockData.category,
          nav: navInfo?.nav || mockData.nav,
          returns_1y: mockData.returns1Y,
          returns_3y: mockData.returns3Y,
          risk_level: getRiskLevel(mockData.category),
          min_sip_amount: mockData.minSipAmount,
          schemeCode: topFund.schemeCode
        };
        
        funds.push(fund);
      });
      
      console.log('✅ AI FUND COMPARISON - Prepared', funds.length, 'funds for display');
      setFundsData(funds);
      setLoading(false);
    };

    if (!navLoading) {
      prepareFundsData();
    }
  }, [navData, navLoading]);

  const getRiskLevel = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'small cap':
        return 'High';
      case 'mid cap':
        return 'Moderate';
      case 'large cap':
        return 'Low';
      case 'elss':
        return 'Moderate';
      case 'debt - overnight':
      case 'debt scheme - dynamic bond':
        return 'Low';
      case 'hybrid - aggressive':
      case 'hybrid - conservative':
        return 'Moderate';
      default:
        return 'Moderate';
    }
  };

  const categorizedFunds = {
    all: fundsData,
    largecap: fundsData.filter(f => f.category.toLowerCase().includes('large')),
    midcap: fundsData.filter(f => f.category.toLowerCase().includes('mid')),
    smallcap: fundsData.filter(f => f.category.toLowerCase().includes('small')),
    elss: fundsData.filter(f => f.category.toLowerCase().includes('elss')),
    debt: fundsData.filter(f => f.category.toLowerCase().includes('debt')),
    hybrid: fundsData.filter(f => f.category.toLowerCase().includes('hybrid')),
    index: fundsData.filter(f => f.category.toLowerCase().includes('index'))
  };

  if (loading || navLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            Loading Mutual Funds...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Fetching latest fund data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Mutual Funds
            </CardTitle>
            <Badge variant="secondary">
              {fundsData.length} Funds Available
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="largecap">Large Cap</TabsTrigger>
              <TabsTrigger value="midcap">Mid Cap</TabsTrigger>
              <TabsTrigger value="smallcap">Small Cap</TabsTrigger>
              <TabsTrigger value="elss">ELSS</TabsTrigger>
              <TabsTrigger value="debt">Debt</TabsTrigger>
              <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              <TabsTrigger value="index">Index</TabsTrigger>
            </TabsList>

            {Object.entries(categorizedFunds).map(([category, funds]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">
                      {category === 'all' ? 'All Funds' : `${category.replace(/([A-Z])/g, ' $1')} Funds`}
                    </h3>
                    <Badge variant="outline">
                      {funds.length} fund{funds.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  {funds.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {funds.map((fund) => (
                        <FundCard key={fund.id} fund={fund} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                          No {category === 'all' ? '' : category} funds available
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                          We're working on adding more funds to this category.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFundComparison;
