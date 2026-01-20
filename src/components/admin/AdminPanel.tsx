import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockDb, Profile, MutualFund, Investment, Commission, CommunityQuestion, BlogPost } from '@/services/mockDatabase';
import ContactSubmissionsTab from './ContactSubmissionsTab';
import ChatSupportTab from './ChatSupportTab';
import FileManagementTab from './FileManagementTab';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [mutualFunds, setMutualFunds] = useState<MutualFund[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profilesRes, fundsRes, investmentsRes, commissionsRes, questionsRes, blogsRes] = await Promise.all([
        mockDb.getProfiles(),
        mockDb.getMutualFunds(),
        mockDb.getInvestments(),
        mockDb.getCommissions(),
        mockDb.getCommunityQuestions(),
        mockDb.getBlogPosts()
      ]);

      setProfiles(profilesRes.data || []);
      setMutualFunds(fundsRes.data || []);
      setInvestments(investmentsRes.data || []);
      setCommissions(commissionsRes.data || []);
      setCommunityQuestions(questionsRes.data || []);
      setBlogPosts(blogsRes.data || []);

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
        <TabsList className="grid w-full grid-cols-11">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funds">Funds</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="chat">Chat Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{profiles.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Mutual Funds</h3>
                  <p className="text-2xl font-bold text-green-600">{mutualFunds.length}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800">Investments</h3>
                  <p className="text-2xl font-bold text-purple-600">{investments.length}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800">Blog Posts</h3>
                  <p className="text-2xl font-bold text-orange-600">{blogPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funds">
          <Card>
            <CardHeader>
              <CardTitle>Mutual Funds Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage mutual funds data, NAV updates, and fund information.</p>
              <p className="text-sm text-gray-600 mt-2">Total Funds: {mutualFunds.length}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage user accounts, profiles, and KYC status.</p>
              <p className="text-sm text-gray-600 mt-2">Total Users: {profiles.length}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage agent accounts, commission rates, and performance.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Commission Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track and manage commission payments and rates.</p>
              <p className="text-sm text-gray-600 mt-2">Total Commissions: {commissions.length}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle>Community Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage community questions, answers, and expert status.</p>
              <p className="text-sm text-gray-600 mt-2">Total Questions: {communityQuestions.length}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <CardTitle>Blog Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage blog posts, content moderation, and publishing.</p>
              <p className="text-sm text-gray-600 mt-2">Total Posts: {blogPosts.length}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View analytics, performance metrics, and insights.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <FileManagementTab />
        </TabsContent>

        <TabsContent value="contact">
          <ContactSubmissionsTab />
        </TabsContent>

        <TabsContent value="chat">
          <ChatSupportTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
