
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
      investors: "50,000+",
      amount: "₹2.5Cr+ AUM",
      rating: "4.9★ Rated"
    };
  }, [investorStats, error, isLoading]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 overflow-hidden">
      {/* Mesmerizing Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse opacity-70"></div>
          <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000 opacity-60"></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-2000 opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-violet-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-500 opacity-40"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 animate-pulse"></div>
        
        {/* Subtle animated lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse delay-1000"></div>
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
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto h-56 flex items-center justify-center border border-white/20">
              <div className="text-white/80 text-lg font-medium">Loading latest insights...</div>
            </div>
          }>
            <BlogSlider />
          </Suspense>
        </div>

        <HeroFeatures />
        <HeroStats stats={stats} />

        {/* Enhanced Compliance Notice with Glassmorphism */}
        <div id="why-choose-sipbrewery" className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 max-w-5xl mx-auto hover:border-white/30">
          <div className="flex items-start space-x-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div className="text-left flex-1">
              <h4 className="font-bold text-xl text-white mb-3">Regulatory Compliance & Risk Disclosure</h4>
              <div className="text-sm text-white/80 leading-relaxed space-y-2">
                <p>
                  <strong className="text-blue-300">Risk Disclosure:</strong> Mutual funds are subject to market risks. 
                  Please read all scheme related documents carefully before investing. 
                  Past performance is not indicative of future returns.
                </p>
                <p>
                  <strong className="text-green-300">Registration Details:</strong> AMFI Registered Mutual Fund Distributor | 
                  All investments are regulated by SEBI and compliant with AMFI guidelines.
                </p>
                <p>
                  <strong className="text-purple-300">Rewards Policy:</strong> All platform rewards and referral incentives are promotional benefits subject to terms and conditions as per SEBI guidelines and do not guarantee investment returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced User Type Selection Modal with Glassmorphism */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl border border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Welcome to SIP Brewery!</h3>
              <p className="text-white/80 text-lg">Please select your account type to continue</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20"
              >
                I'm an Investor (Client)
              </button>
              <button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20"
              >
                I'm a Financial Advisor (Agent)
              </button>
            </div>
            <button 
              onClick={() => setShowUserTypeModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-light transition-colors"
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
