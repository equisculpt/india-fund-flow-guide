import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from 'lucide-react';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import InvestmentOverviewTab from '@/components/admin/InvestmentOverviewTab';
import MutualFundManagementTab from '@/components/admin/MutualFundManagementTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
import AgentManagementTab from '@/components/admin/AgentManagementTab';
import CommissionManagementTab from '@/components/admin/CommissionManagementTab';
import FundAnalysisTab from '@/components/admin/FundAnalysisTab';
import CommunityManagementTab from '@/components/admin/CommunityManagementTab';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { signOut } = useSupabaseAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">SIP Brewery Admin Portal</h1>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funds">Funds</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <InvestmentOverviewTab />
          </TabsContent>

          <TabsContent value="funds" className="space-y-6">
            <MutualFundManagementTab />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagementTab />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentManagementTab />
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <CommissionManagementTab />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <FundAnalysisTab />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <CommunityManagementTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
