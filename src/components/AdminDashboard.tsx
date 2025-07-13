
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAdminDashboard } from '@/services/api/analyticsService';
import { Users, TrendingUp, DollarSign, Settings } from 'lucide-react';
import UserManagementTab from './admin/UserManagementTab';
import InvestmentOverviewTab from './admin/InvestmentOverviewTab';
import AgentManagementTab from './admin/AgentManagementTab';
import CommissionManagementTab from './admin/CommissionManagementTab';
import MutualFundManagementTab from './admin/MutualFundManagementTab';
import FundAnalysisTab from './admin/FundAnalysisTab';
import PortfolioManagementTab from './admin/PortfolioManagementTab';

interface DashboardStats {
  totalUsers: number;
  totalAgents: number;
  totalInvestments: number;
  totalCommissions: number;
  pendingCommissions: number;
  activeUsers: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAgents: 0,
    totalInvestments: 0,
    totalCommissions: 0,
    pendingCommissions: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      console.log('Fetching dashboard stats from backend API...');
      
      const response = await getAdminDashboard();
      
      if (response.success) {
        setStats({
          totalUsers: response.data.totalUsers || 0,
          totalAgents: response.data.totalAgents || 0,
          totalInvestments: response.data.totalInvestments || 0,
          totalCommissions: response.data.totalCommissions || 0,
          pendingCommissions: response.data.pendingCommissions || 0,
          activeUsers: response.data.activeUsers || 0,
        });

        console.log('Dashboard stats loaded successfully:', response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch stats');
      }

    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics. Using backend API for calculations.",
        variant: "destructive",
      });
      
      // Set default stats to prevent UI crashes
      setStats({
        totalUsers: 0,
        totalAgents: 0,
        totalInvestments: 0,
        totalCommissions: 0,
        pendingCommissions: 0,
        activeUsers: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={fetchDashboardStats} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground">Active agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalInvestments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total AUM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commissions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.pendingCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">of ₹{stats.totalCommissions.toLocaleString()} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="agents">
          <AgentManagementTab />
        </TabsContent>

        <TabsContent value="investments">
          <InvestmentOverviewTab />
        </TabsContent>

        <TabsContent value="commissions">
          <CommissionManagementTab />
        </TabsContent>

        <TabsContent value="funds">
          <MutualFundManagementTab />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioManagementTab />
        </TabsContent>

        <TabsContent value="analysis">
          <FundAnalysisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
