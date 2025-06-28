
import React, { useState, lazy, Suspense } from 'react';
import { Shield } from "lucide-react";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";
import { useInvestorStats } from "@/hooks/useInvestorData";
import HeroContent from "./hero/HeroContent";
import HeroFeatures from "./hero/HeroFeatures";
import HeroStats from "./hero/HeroStats";

// Lazy load heavy components
const BlogSlider = lazy(() => import("./BlogSlider"));

const HeroSection = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();
  
  // Handle the database error gracefully with fallback
  const { data: investorStats, error, isLoading } = useInvestorStats();
  
  // Log the error but don't crash the app
  if (error) {
    console.warn('Failed to fetch investor stats, using fallback data:', error);
  }

  const handleStartInvesting = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowUserTypeModal(true);
    }
  };

  const handleUserTypeSelection = (userType: 'client' | 'agent') => {
    setShowUserTypeModal(false);
    if (userType === 'agent') {
      navigate('/agent');
    } else {
      const event = new CustomEvent('openLogin');
      window.dispatchEvent(event);
    }
  };

  const handleCalculateReturns = () => {
    const element = document.getElementById('sip-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Enhanced stats formatting with better fallback handling
  const stats = React.useMemo(() => {
    if (investorStats && !error && !isLoading) {
      const formatAmount = (amount: number) => {
        if (amount >= 10000000) {
          return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
          return `₹${(amount / 100000).toFixed(1)}L`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
      };

      return {
        investors: `${investorStats.total_investors.toLocaleString('en-IN')}+`,
        amount: formatAmount(investorStats.total_amount_invested),
        rating: `${investorStats.average_rating.toFixed(1)}★`
      };
    }
    
    // Enhanced fallback stats when database is unavailable
    return {
      investors: "10,000+",
      amount: "₹2.5Cr+ AUM",
      rating: "4.9★ Rated"
    };
  }, [investorStats, error, isLoading]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <HeroContent 
          onStartInvesting={handleStartInvesting}
          onCalculateReturns={handleCalculateReturns}
        />

        {/* Blog Slider with Enhanced Loading */}
        <div className="mb-16">
          <Suspense fallback={
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-5xl mx-auto h-56 flex items-center justify-center border border-gray-200">
              <div className="text-gray-600 text-lg font-medium">Loading latest insights...</div>
            </div>
          }>
            <BlogSlider />
          </Suspense>
        </div>

        <HeroFeatures />
        <HeroStats stats={stats} />

        {/* Enhanced Compliance Notice */}
        <div id="why-choose-sipbrewery" className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-2xl border border-blue-200">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-xl text-gray-900 mb-3">Regulatory Compliance & Risk Disclosure</h4>
              <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                <p>
                  <strong className="text-blue-600">Risk Disclosure:</strong> Mutual funds are subject to market risks. 
                  Please read all scheme related documents carefully before investing. 
                  Past performance is not indicative of future returns.
                </p>
                <p>
                  <strong className="text-green-600">Registration Details:</strong> AMFI Registered Mutual Fund Distributor | 
                  All investments are regulated by SEBI and compliant with AMFI guidelines.
                </p>
                <p>
                  <strong className="text-purple-600">AI Research Disclaimer:</strong> All AI-generated research and analysis are for informational purposes only and do not constitute investment advice. Platform rewards and referral incentives are promotional benefits subject to terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Welcome to SIP Brewery!</h3>
              <p className="text-gray-600 text-lg">Please select your account type to continue</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                I'm an Investor (Client)
              </button>
              <button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                I'm a Financial Advisor (Agent)
              </button>
            </div>
            <button 
              onClick={() => setShowUserTypeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
