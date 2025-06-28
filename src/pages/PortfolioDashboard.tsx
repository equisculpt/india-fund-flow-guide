
import React from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';
import KYCGuard from '@/components/KYCGuard';
import PortfolioDashboard from '@/components/PortfolioDashboard';

const PortfolioDashboardPage = () => {
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
        <div className="container mx-auto px-4 py-8">
          <PortfolioDashboard />
        </div>
      </div>
    </KYCGuard>
  );
};

export default PortfolioDashboardPage;
