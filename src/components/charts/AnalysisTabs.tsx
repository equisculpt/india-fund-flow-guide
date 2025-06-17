
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundManagerDetails from './FundManagerDetails';
import PortfolioHoldings from './PortfolioHoldings';
import AIFundRanking from './AIFundRanking';
import MarketTimingAdvice from './MarketTimingAdvice';

interface AnalysisTabsProps {
  fundData: any;
}

const AnalysisTabs = ({ fundData }: AnalysisTabsProps) => {
  return (
    <Tabs defaultValue="manager" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="manager">Fund Manager</TabsTrigger>
        <TabsTrigger value="holdings">Portfolio</TabsTrigger>
        <TabsTrigger value="ranking">AI Ranking</TabsTrigger>
        <TabsTrigger value="timing">Market Timing</TabsTrigger>
      </TabsList>

      <TabsContent value="manager">
        <FundManagerDetails fundData={fundData} />
      </TabsContent>

      <TabsContent value="holdings">
        <PortfolioHoldings fundData={fundData} />
      </TabsContent>

      <TabsContent value="ranking">
        <AIFundRanking fundData={fundData} />
      </TabsContent>

      <TabsContent value="timing">
        <MarketTimingAdvice fundData={fundData} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalysisTabs;
