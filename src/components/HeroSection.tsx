
import React, { useState } from 'react';
import { Shield } from "lucide-react";

const HeroSection = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);

  const handleStartInvesting = () => {
    // Simple scroll to SIP calculator section
    const element = document.getElementById('sip-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If calculator not found, show modal
      setShowUserTypeModal(true);
    }
  };

  const handleCalculateReturns = () => {
    const element = document.getElementById('sip-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-amber-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            India's #1 <span className="text-blue-600">AI-Powered</span><br />
            Mutual Fund Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Start your wealth building journey with SEBI-registered platform. 
            Compare funds with AI insights, calculate SIP returns, and invest smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleStartInvesting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Start Investing Today
            </button>
            <button 
              onClick={handleCalculateReturns}
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 text-lg rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Calculate SIP Returns
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">1000+</div>
              <div className="text-gray-600 text-sm">Happy Investors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">₹50Cr+</div>
              <div className="text-gray-600 text-sm">Assets Under Management</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">4.8★</div>
              <div className="text-gray-600 text-sm">User Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600 mb-1">SEBI</div>
              <div className="text-gray-600 text-sm">Registered Platform</div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Fund Analysis</h3>
            <p className="text-gray-600">
              Advanced AI algorithms analyze fund performance, risks, and market trends to help you make informed decisions.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Comparison</h3>
            <p className="text-gray-600">
              Compare multiple mutual funds side-by-side with detailed metrics and AI-powered recommendations.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Goal Planning</h3>
            <p className="text-gray-600">
              Set financial goals and get personalized SIP recommendations to achieve your dreams.
            </p>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
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
                All consistency rewards, gift cards and referral incentives are promotional benefits subject to terms and conditions.
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
              <p className="text-gray-600">Get started with your investment journey</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => {
                  setShowUserTypeModal(false);
                  window.location.href = '/fund-comparison';
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-lg transition-colors"
              >
                Explore Fund Comparison
              </button>
              <button 
                onClick={() => {
                  setShowUserTypeModal(false);
                  window.location.href = '/sip-calculator';
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-lg transition-colors"
              >
                Try SIP Calculator
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
