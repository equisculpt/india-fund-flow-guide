
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, TrendingUp, DollarSign, Settings, Upload, Download } from 'lucide-react';
import UserManagementTab from './admin/UserManagementTab';
import InvestmentOverviewTab from './admin/InvestmentOverviewTab';
import AgentManagementTab from './admin/AgentManagementTab';
import CommissionManagementTab from './admin/CommissionManagementTab';
import MutualFundManagementTab from './admin/MutualFundManagementTab';

interface DashboardStats {
  totalUsers: number;
  totalAgents: number;
  totalInvestments: number;
  totalCommissions: number;
  pendingCommissions: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAgents: 0,
    totalInvestments: 0,
    totalCommissions: 0,
    pendingCommissions: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'customer');

      // Fetch agent count
      const { count: agentCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'agent');

      // Fetch total investments
      const { data: investments } = await supabase
        .from('investments')
        .select('total_invested');

      const totalInvestments = investments?.reduce((sum, inv) => sum + (inv.total_invested || 0), 0) || 0;

      // Fetch commission data
      const { data: commissions } = await supabase
        .from('commissions')
        .select('calculated_commission, status');

      const totalCommissions = commissions?.reduce((sum, comm) => sum + (comm.calculated_commission || 0), 0) || 0;
      const pendingCommissions = commissions?.filter(c => c.status === 'pending').reduce((sum, comm) => sum + (comm.calculated_commission || 0), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        totalAgents: agentCount || 0,
        totalInvestments,
        totalCommissions,
        pendingCommissions,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
