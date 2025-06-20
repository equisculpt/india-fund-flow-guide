
import React, { useState, lazy, Suspense } from 'react';
import { Shield } from "lucide-react";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { useNavigate } from "react-router-dom";
import { useInvestorStats } from "@/hooks/useInvestorData";
import HeroContent from "./hero/HeroContent";
import HeroFeatures from "./hero/HeroFeatures";
import HeroStats from "./hero/HeroStats";

// Lazy load heavy components
const BlogSlider = lazy(() => import("./BlogSlider"));

const HeroSection = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const { isAuthenticated } = useEnhancedAuth();
  const navigate = useNavigate();
  const { data: investorStats } = useInvestorStats();

  const handleStartInvesting = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowUserTypeModal(true);
    }
  };

  const handleUserTypeSelection = (userType: 'client' | 'agent') => {
    setShowUserTypeModal(false);
    if (userType === 'agent') {
      navigate('/agent-home');
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

  // Optimized stats formatting with memoization
  const stats = React.useMemo(() => {
    if (investorStats) {
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
    
    return {
      investors: "Growing Community",
      amount: "₹1Cr+ AUM",
      rating: "4.8★ Rated"
    };
  }, [investorStats]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      {/* Simplified Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <HeroContent 
          onStartInvesting={handleStartInvesting}
          onCalculateReturns={handleCalculateReturns}
        />

        {/* Blog Slider with Loading Fallback */}
        <div className="mb-12">
          <Suspense fallback={
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-4xl mx-auto h-48 flex items-center justify-center">
              <div className="text-gray-500">Loading blog highlights...</div>
            </div>
          }>
            <BlogSlider />
          </Suspense>
        </div>

        <HeroFeatures />
        <HeroStats stats={stats} />

        {/* Compliance Notice */}
        <div id="why-choose-sipbrewery" className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 mb-2">Regulatory Compliance & Risk Disclosure</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Risk Disclosure:</strong> Mutual funds are subject to market risks. 
                Please read all scheme related documents carefully before investing. 
                Past performance is not indicative of future returns. All investments are regulated by SEBI and compliant with AMFI guidelines.
                <br /><br />
                <strong>Registration Details:</strong> AMFI Registered Mutual Fund Distributor | 
                All consistency rewards, gift cards and referral incentives are promotional benefits subject to terms and conditions as per SEBI guidelines and do not guarantee investment returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SIP Brewery!</h3>
              <p className="text-gray-600">Please select your account type to continue</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-lg transition-colors"
              >
                I'm an Investor (Client)
              </button>
              <button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-lg transition-colors"
              >
                I'm a Financial Advisor (Agent)
              </button>
            </div>
            <button 
              onClick={() => setShowUserTypeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
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
