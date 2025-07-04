
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
                totalInvested={1250000}
                currentValue={1675000}
                returnsPercentage={34}
                xirr={22.5}
                months={['Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024']}
                values={[250000, 375000, 520000, 680000, 825000, 950000, 1025000, 1150000, 1280000, 1420000, 1550000, 1675000]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TestDashboard;
