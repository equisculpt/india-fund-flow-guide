
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AIFundRanking from '@/components/charts/AIFundRanking';
import PortfolioHoldings from '@/components/charts/PortfolioHoldings';
import AdvancedFundChart from '@/components/AdvancedFundChart';
import NAVHistoryChart from '@/components/NAVHistoryChart';

interface FundDetailsTabsProps {
  fundData: any;
  combinedFundDataForComponents: any;
}

const FundDetailsTabs = ({ fundData, combinedFundDataForComponents }: FundDetailsTabsProps) => {
  return (
    <Tabs defaultValue="ai-analysis" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="ai-analysis">
        <AIFundRanking fundData={combinedFundDataForComponents} />
      </TabsContent>

      <TabsContent value="portfolio">
        <PortfolioHoldings fundData={combinedFundDataForComponents} />
      </TabsContent>

      <TabsContent value="performance">
        <NAVHistoryChart 
          fundId={fundData.schemeCode} 
          fundName={fundData.schemeName}
        />
      </TabsContent>

      <TabsContent value="analytics">
        <AdvancedFundChart 
          primaryFund={combinedFundDataForComponents}
        />
      </TabsContent>
    </Tabs>
  );
};

export default FundDetailsTabs;
