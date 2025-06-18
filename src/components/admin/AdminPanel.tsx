import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FundTable from './FundTable';
import UserTable from './UserTable';
import AgentTable from './AgentTable';
import CommissionTable from './CommissionTable';
import CommunityContentTable from './CommunityContentTable';
import BlogTable from './BlogTable';
import AnalysisDashboard from './AnalysisDashboard';
import ContactSubmissionsTab from './ContactSubmissionsTab';

const AdminPanel = () => {
  const [funds, setFunds] = useState([]);
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [communityContent, setCommunityContent] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: fundsData, error: fundsError } = await supabase.from('funds').select('*');
      if (fundsError) throw fundsError;
      setFunds(fundsData || []);

      const { data: usersData, error: usersError } = await supabase.from('users').select('*');
      if (usersError) throw usersError;
      setUsers(usersData || []);

      const { data: agentsData, error: agentsError } = await supabase.from('agents').select('*');
      if (agentsError) throw agentsError;
      setAgents(agentsData || []);

      const { data: commissionsData, error: commissionsError } = await supabase.from('commissions').select('*');
      if (commissionsError) throw commissionsError;
      setCommissions(commissionsData || []);

      const { data: communityData, error: communityError } = await supabase.from('community_content').select('*');
      if (communityError) throw communityError;
      setCommunityContent(communityData || []);

      const { data: blogsData, error: blogsError } = await supabase.from('blogs').select('*');
      if (blogsError) throw blogsError;
      setBlogs(blogsData || []);

    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your SIP Brewery platform</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funds">Funds</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Quick statistics and summaries about the platform.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funds">
          <FundTable funds={funds} />
        </TabsContent>

        <TabsContent value="users">
          <UserTable users={users} />
        </TabsContent>

        <TabsContent value="agents">
          <AgentTable agents={agents} />
        </TabsContent>

        <TabsContent value="commissions">
          <CommissionTable commissions={commissions} />
        </TabsContent>

        <TabsContent value="community">
          <CommunityContentTable content={communityContent} />
        </TabsContent>

        <TabsContent value="blogs">
          <BlogTable blogs={blogs} />
        </TabsContent>

        <TabsContent value="analysis">
          <AnalysisDashboard />
        </TabsContent>

        <TabsContent value="contact">
          <ContactSubmissionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
