import React from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';
import KYCGuard from '@/components/KYCGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralSystem from '@/components/ReferralSystem';
import TrailCommissionRewards from '@/components/TrailCommissionRewards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReferralPage = () => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <KYCGuard requireKYC={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Dashboard</h1>
            <p className="text-gray-600">
              Earn through referrals and trail commission sharing on your investments
            </p>
          </div>

          <Tabs defaultValue="referrals" className="space-y-6">
            <TabsList>
              <TabsTrigger value="referrals">Referral Program</TabsTrigger>
              <TabsTrigger value="trail-rewards">Investment Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="referrals">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Referral Reward Slabs</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-medium">1-3 Referrals</div>
                    <div className="text-green-600">₹100 each</div>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-medium">4-6 Referrals</div>
                    <div className="text-green-600">₹200 each</div>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-medium">7-16 Referrals</div>
                    <div className="text-green-600">₹300 each</div>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-medium">17-50 Referrals</div>
                    <div className="text-green-600">₹400 each</div>
                  </div>
                  <div className="bg-white p-2 rounded text-center">
                    <div className="font-medium">51+ Referrals</div>
                    <div className="text-green-600">₹500 each</div>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  * Rewards are credited after your referred friend completes KYC and makes their first investment.
                  Only direct customers (self-registered) are eligible for wallet rewards.
                </p>
              </div>

              <ReferralSystem />
            </TabsContent>

            <TabsContent value="trail-rewards">
              <TrailCommissionRewards />
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </KYCGuard>
  );
};

export default ReferralPage;
