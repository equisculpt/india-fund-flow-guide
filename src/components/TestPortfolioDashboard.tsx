
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Download } from "lucide-react";
import { TEST_USER_DATA } from '@/services/testData';
import { useNavigate } from 'react-router-dom';
import XIRRAnalytics from './XIRRAnalytics';
import AIPortfolioInsights from './AIPortfolioInsights';
import SIPCenter from './SIPCenter';
import TransactionHistory from './TransactionHistory';
import TaxCenter from './TaxCenter';
import RewardsWallet from './RewardsWallet';
import UserSettings from './UserSettings';
import FundExplorer from './FundExplorer';
import PortfolioSummaryCards from './dashboard/PortfolioSummaryCards';
import QuickActionCards from './dashboard/QuickActionCards';
import HoldingsTab from './dashboard/HoldingsTab';
import PerformanceTab from './dashboard/PerformanceTab';
import AllocationTab from './dashboard/AllocationTab';
import ReferralBanner from './dashboard/ReferralBanner';

const TestPortfolioDashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    if (hideBalance) return "₹****";
    return `₹${amount.toLocaleString()}`;
  };

  const handleInvestMore = () => {
    navigate('/explore');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Portfolio Overview</h2>
          <p className="text-gray-600 mt-1">Welcome back, {TEST_USER_DATA.profile.full_name}!</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setHideBalance(!hideBalance)}>
            {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ReferralBanner />

      <PortfolioSummaryCards hideBalance={hideBalance} formatCurrency={formatCurrency} />

      <QuickActionCards handleInvestMore={handleInvestMore} />

      <Tabs defaultValue="holdings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-10">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="sip-center">SIP Center</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="tax-center">Tax Center</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="xirr-analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="fund-explorer">Explore</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          <HoldingsTab formatCurrency={formatCurrency} handleInvestMore={handleInvestMore} />
        </TabsContent>

        <TabsContent value="sip-center">
          <SIPCenter />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="tax-center">
          <TaxCenter />
        </TabsContent>

        <TabsContent value="rewards">
          <RewardsWallet />
        </TabsContent>

        <TabsContent value="ai-insights">
          <AIPortfolioInsights />
        </TabsContent>

        <TabsContent value="xirr-analytics">
          <XIRRAnalytics />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTab formatCurrency={formatCurrency} />
        </TabsContent>

        <TabsContent value="fund-explorer">
          <FundExplorer />
        </TabsContent>

        <TabsContent value="settings">
          <UserSettings />
        </TabsContent>

        {/* Legacy tabs for backward compatibility */}
        <TabsContent value="allocation">
          <AllocationTab formatCurrency={formatCurrency} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestPortfolioDashboard;
