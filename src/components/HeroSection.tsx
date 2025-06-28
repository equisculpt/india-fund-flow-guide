
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
  
  // Handle the database error gracefully
  const { data: investorStats, error } = useInvestorStats();
  
  // Log the error but don't crash the app
  if (error) {
    console.warn('Failed to fetch investor stats:', error);
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

  // Optimized stats formatting with memoization and fallback
  const stats = React.useMemo(() => {
    if (investorStats && !error) {
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
    
    // Fallback stats when database is unavailable
    return {
      investors: "Growing Community",
      amount: "₹1Cr+ AUM",
      rating: "4.8★ Rated"
    };
  }, [investorStats, error]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-1000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <HeroContent 
          onStartInvesting={handleStartInvesting}
          onCalculateReturns={handleCalculateReturns}
        />

        {/* Blog Slider with Loading Fallback */}
        <div className="mb-16">
          <Suspense fallback={
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-5xl mx-auto h-56 flex items-center justify-center border border-white/50">
              <div className="text-gray-500 text-lg">Loading blog highlights...</div>
            </div>
          }>
            <BlogSlider />
          </Suspense>
        </div>

        <HeroFeatures />
        <HeroStats stats={stats} />

        {/* Enhanced Compliance Notice */}
        <div id="why-choose-sipbrewery" className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-2xl">
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
                  <strong className="text-purple-600">Rewards Policy:</strong> All consistency rewards, gift cards and referral incentives are promotional benefits subject to terms and conditions as per SEBI guidelines and do not guarantee investment returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
