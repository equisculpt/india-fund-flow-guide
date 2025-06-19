
import React from 'react';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';
import { Navigate } from 'react-router-dom';
import AIInsightsDashboard from '@/components/AIInsightsDashboard';

const AIPortfolioDashboard = () => {
  const { user, loading } = useSupabaseAuthContext();

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AIInsightsDashboard />
      </div>
    </div>
  );
};

export default AIPortfolioDashboard;
