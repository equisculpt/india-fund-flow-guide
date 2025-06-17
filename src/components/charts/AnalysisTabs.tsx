
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundManagerDetails from './FundManagerDetails';
import PortfolioHoldings from './PortfolioHoldings';
import AIFundRanking from './AIFundRanking';
import MarketTimingAdvice from './MarketTimingAdvice';
import FundComparisonContainer from './FundComparisonContainer';

interface AnalysisTabsProps {
  fundData: any;
  combinedFundData?: any; // Add this to receive the complete fund data with AI analysis
}

const AnalysisTabs = ({ fundData, combinedFundData }: AnalysisTabsProps) => {
  // Use combinedFundData if available (which includes AI analysis), otherwise fallback to fundData
  const dataForComponents = combinedFundData || fundData;

  return (
    <Tabs defaultValue="manager" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="manager">Fund Manager</TabsTrigger>
        <TabsTrigger value="holdings">Portfolio</TabsTrigger>
        <TabsTrigger value="ranking">AI Ranking</TabsTrigger>
        <TabsTrigger value="comparison">AI Compare</TabsTrigger>
        <TabsTrigger value="timing">Market Timing</TabsTrigger>
      </TabsList>

      <TabsContent value="manager">
        <FundManagerDetails fundData={dataForComponents} />
      </TabsContent>

      <TabsContent value="holdings">
        <PortfolioHoldings fundData={dataForComponents} />
      </TabsContent>

      <TabsContent value="ranking">
        <AIFundRanking fundData={dataForComponents} />
      </TabsContent>

      <TabsContent value="comparison">
        <FundComparisonContainer />
      </TabsContent>

      <TabsContent value="timing">
        <MarketTimingAdvice fundData={dataForComponents} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalysisTabs;
