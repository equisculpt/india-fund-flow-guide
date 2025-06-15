
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Award, Sparkles, ArrowRight, Play, X, DollarSign, Users, Target } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    const element = document.getElementById('calculator');
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
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="h-4 w-4 mr-2" />
              🎉 Limited Time: Earn up to ₹70,000 wallet credits + ₹500 per referral!
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-pulse">
              Mutual Fund
            </span>{" "}
            Journey Today
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            Invest in top-performing mutual funds with professional guidance. 
            Earn up to <span className="font-bold text-green-600">₹20,000</span> wallet credits for 12 uninterrupted SIPs 
            AND up to <span className="font-bold text-blue-600">₹50,000</span> for portfolio transfers!
            <br />
            <span className="text-lg text-purple-600 font-semibold">
              PLUS: Refer friends and earn ₹500 per successful referral!
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Button 
              size="lg" 
              onClick={handleStartInvesting}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              Start Investing with ₹500
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleCalculateReturns}
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              Calculate Returns
              <TrendingUp className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Video Demo Section - Enhanced with actual demo content */}
          <div className="mb-12">
            <button
              onClick={() => setShowVideo(true)}
              className="group inline-flex items-center bg-white bg-opacity-80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600"
            >
              <div className="bg-blue-600 rounded-full p-2 mr-3 group-hover:bg-blue-700 transition-colors">
                <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Watch Complete Demo</div>
                <div className="text-sm text-gray-500">See how to earn ₹70,000+ in rewards (4 mins)</div>
              </div>
            </button>
          </div>

          {/* Key Features - Enhanced */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Higher Returns</h3>
              <p className="text-gray-600 font-medium">Professional fund management with proven track record</p>
            </div>
            
            <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">SEBI Regulated</h3>
              <p className="text-gray-600 font-medium">100% safe & transparent investing platform</p>
            </div>
            
            <div className="group text-center bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Triple Rewards</h3>
              <p className="text-gray-600 font-medium">SIP rewards + Transfer bonus + Referral earnings</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8 opacity-70">
            <div className="text-sm font-medium text-gray-600">Trusted by 50,000+ investors</div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm font-medium text-gray-600">₹500+ Crores invested</div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="text-sm font-medium text-gray-600">4.8★ User Rating</div>
          </div>

          {/* Enhanced Compliance Notice */}
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
                  <strong>Registration Details:</strong> SEBI Registered Investment Advisor | AMFI Compliant Platform | 
                  All wallet credit rewards and referral bonuses are promotional incentives and do not guarantee investment returns.
                </p>
              </div>
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
              <Button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
              >
                I'm an Investor (Client)
              </Button>
              <Button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
              >
                I'm a Financial Advisor (Agent)
              </Button>
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

      {/* Enhanced Video Modal with comprehensive demo content */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold">SIP Brewery Complete Platform Demo</h3>
              <button 
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Main Video Content Area */}
              <div className="aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                
                {/* Video Content Simulation */}
                <div className="text-center text-white relative z-10 p-8 max-w-4xl">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 inline-block mb-6">
                    <Play className="h-16 w-16" />
                  </div>
                  <h4 className="text-3xl font-bold mb-4">Complete SIP Brewery Demo</h4>
                  <p className="text-xl text-gray-200 mb-6">
                    Watch how our platform helps you earn maximum rewards through systematic investing
                  </p>
                  
                  {/* Demo Timeline */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-amber-400 font-bold text-sm">0:00 - 1:00</div>
                      <div className="text-xs">Platform Overview</div>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-green-400 font-bold text-sm">1:00 - 2:30</div>
                      <div className="text-xs">Investment Process</div>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-blue-400 font-bold text-sm">2:30 - 3:30</div>
                      <div className="text-xs">Rewards System</div>
                    </div>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-purple-400 font-bold text-sm">3:30 - 4:00</div>
                      <div className="text-xs">Referral Program</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full inline-block">
                    <strong>🎬 Demo Highlights:</strong> Real investment flows • Live reward calculations • Referral system walkthrough
                  </div>
                </div>
              </div>

              {/* Detailed Feature Breakdown */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                    <h5 className="font-bold text-blue-900">Investment Features</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Start SIP with just ₹500</li>
                    <li>• Choose from 1000+ mutual funds</li>
                    <li>• Auto-debit & smart reminders</li>
                    <li>• Goal-based investment planning</li>
                    <li>• Real-time portfolio tracking</li>
                    <li>• Tax-saving ELSS options</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-green-600" />
                    <h5 className="font-bold text-green-900">Triple Rewards System</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• SIP Streak: Up to ₹20,000 credits</li>
                    <li>• Portfolio Transfer: Up to ₹50,000</li>
                    <li>• Referral Bonus: ₹500 per friend</li>
                    <li>• Achievement milestones</li>
                    <li>• Cashback on transactions</li>
                    <li>• Loyalty program benefits</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-6 w-6 text-purple-600" />
                    <h5 className="font-bold text-purple-900">Referral Program Demo</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• Share unique referral code</li>
                    <li>• Friend invests → You earn ₹500</li>
                    <li>• 0.5% of their first investment</li>
                    <li>• Track referral earnings live</li>
                    <li>• Multiple sharing options</li>
                    <li>• Instant commission updates</li>
                  </ul>
                </div>
              </div>

              {/* Investment Scenarios */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200 mb-6">
                <h5 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Real Investment Scenarios Shown in Demo
                </h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                    <h6 className="font-semibold text-amber-800 mb-2">Scenario 1: Conservative Investor</h6>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• ₹1,000/month SIP in balanced funds</li>
                      <li>• 12-month streak = ₹5,000 wallet credits</li>
                      <li>• Portfolio transfer = ₹25,000 bonus</li>
                      <li>• 3 referrals = ₹1,500 earnings</li>
                      <li><strong>Total rewards: ₹31,500</strong></li>
                    </ul>
                  </div>
                  <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                    <h6 className="font-semibold text-amber-800 mb-2">Scenario 2: Aggressive Investor</h6>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• ₹5,000/month SIP in equity funds</li>
                      <li>• 12-month streak = ₹20,000 wallet credits</li>
                      <li>• Large portfolio transfer = ₹50,000 bonus</li>
                      <li>• 10 referrals = ₹5,000 earnings</li>
                      <li><strong>Total rewards: ₹75,000</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <Button 
                  onClick={() => {
                    setShowVideo(false);
                    handleStartInvesting();
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg"
                >
                  Start Your Journey - Get All These Rewards!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-gray-600 mt-3">
                  Join 50,000+ investors already earning rewards • Start with just ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
