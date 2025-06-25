
import { useEnhancedAdminAuth } from '@/hooks/useEnhancedAdminAuth';
import SecureAdminLogin from '@/components/admin/SecureAdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import SecurityDashboard from '@/components/admin/SecurityDashboard';
import BlogGenerationTab from '@/components/admin/BlogGenerationTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SecureAdminPage = () => {
  const { adminUser, loading, logout, isAuthenticated } = useEnhancedAdminAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "You have been securely logged out",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Validating session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !adminUser) {
    return <SecureAdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secure Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  SIP Brewery Admin Portal
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome, {adminUser.full_name}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Secure Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="blog-generator">Blog Generator</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="blog-generator">
            <BlogGenerationTab />
          </TabsContent>

          <TabsContent value="security">
            <SecurityDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SecureAdminPage;
