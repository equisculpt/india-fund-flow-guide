
import React from 'react';
import { useTestAuth } from '@/contexts/TestAuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import TestPortfolioDashboard from '@/components/TestPortfolioDashboard';
import StatementPDF from '@/components/StatementPDF';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, User } from 'lucide-react';

const TestDashboard = () => {
  const { user, profile, loading, signOut } = useTestAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No test user found, redirecting to test login');
    return <Navigate to="/test-login" replace />;
  }

  console.log('Test user authenticated:', user.email);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Welcome, {profile?.full_name}
                  </h1>
                  <p className="text-sm text-gray-600">KYC Status: {profile?.kyc_status}</p>
                </div>
              </div>
              <Button onClick={signOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Portfolio Dashboard</TabsTrigger>
              <TabsTrigger value="statement">PDF Statement Test</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              <TestPortfolioDashboard />
            </TabsContent>
            
            <TabsContent value="statement" className="mt-6">
              <StatementPDF
                name={profile?.full_name || "Test User"}
                clientCode="SB123456"
                totalInvested={250000}
                currentValue={325000}
                returnsPercentage={30}
                xirr={18.5}
                months={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                values={[250000, 265000, 280000, 295000, 310000, 325000]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TestDashboard;
