
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, BarChart3, TrendingUp, Zap } from "lucide-react";
import AIComparisonTab from "./AIComparisonTab";
import AdvancedChartsTab from "./AdvancedChartsTab";
import LiveNavTab from "./LiveNavTab";
import MarketOverviewTab from "./MarketOverviewTab";

interface PublicFundsTabsProps {
  selectedFund: any;
  onFundSelect: (fund: any) => void;
}

const PublicFundsTabs = ({ selectedFund, onFundSelect }: PublicFundsTabsProps) => {
  return (
    <Tabs defaultValue="ai-comparison" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="ai-comparison" className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          AI Rankings
        </TabsTrigger>
        <TabsTrigger value="advanced-charts" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Advanced Charts
        </TabsTrigger>
        <TabsTrigger value="live-nav" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Live NAV Data
        </TabsTrigger>
        <TabsTrigger value="market-overview" className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Market Overview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ai-comparison">
        <AIComparisonTab />
      </TabsContent>

      <TabsContent value="advanced-charts">
        <AdvancedChartsTab selectedFund={selectedFund} />
      </TabsContent>

      <TabsContent value="live-nav">
        <LiveNavTab selectedFund={selectedFund} onFundSelect={onFundSelect} />
      </TabsContent>

      <TabsContent value="market-overview">
        <MarketOverviewTab />
      </TabsContent>
    </Tabs>
  );
};

export default PublicFundsTabs;
