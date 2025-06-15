
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FundCard from "@/components/FundCard";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import ComplianceFooter from "@/components/ComplianceFooter";
import BreweryLogo from "@/components/BreweryLogo";
import ReviewModal from "@/components/ReviewModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, TrendingUp, Users, Award, Clock, Gift, Target, Trophy, Star, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInvestorStats, useFeaturedReviews } from "@/hooks/useInvestorData";
import { useReviewPrompt } from "@/hooks/useReviewPrompt";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  
  // Real investor data
  const { data: investorStats } = useInvestorStats();
  const { data: featuredReviews } = useFeaturedReviews();
  const { shouldShowReview, dismissReview } = useReviewPrompt();

  // Check for first-time visitors and show user type selection
  useEffect(() => {
    const hasVisited = localStorage.getItem('sipbrewery_visited');
    const isFirstVisit = !hasVisited && !isAuthenticated;
    
    if (isFirstVisit) {
      setShowUserTypeModal(true);
      localStorage.setItem('sipbrewery_visited', 'true');
    }
  }, [isAuthenticated]);

  // Listen for login modal trigger
  useEffect(() => {
    const handleOpenLogin = () => {
      // This would trigger login modal - implement as needed
    };
    window.addEventListener('openLogin', handleOpenLogin);
    return () => window.removeEventListener('openLogin', handleOpenLogin);
  }, []);

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
      // Trigger login modal for client
      const event = new CustomEvent('openLogin');
      window.dispatchEvent(event);
    }
  };

  const topFunds = [
    {
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      returns1y: 15.2,
      returns3y: 12.8,
      returns5y: 14.1,
      minSip: 500,
      rating: 4,
      nav: 856.32,
      riskLevel: "Moderate" as const
    },
    {
      name: "SBI Small Cap Fund",
      category: "Small Cap",
      returns1y: 22.5,
      returns3y: 18.9,
      returns5y: 16.7,
      minSip: 1000,
      rating: 5,
      nav: 234.67,
      riskLevel: "High" as const
    },
    {
      name: "ICICI Prudential Bluechip",
      category: "Large Cap",
      returns1y: 13.8,
      returns3y: 11.2,
      returns5y: 12.9,
      minSip: 500,
      rating: 4,
      nav: 678.91,
      riskLevel: "Moderate" as const
    },
    {
      name: "Axis Long Term Equity",
      category: "ELSS",
      returns1y: 16.9,
      returns3y: 14.5,
      returns5y: 15.3,
      minSip: 500,
      rating: 5,
      nav: 445.78,
      riskLevel: "Moderate" as const
    },
    {
      name: "Kotak Emerging Equity",
      category: "Mid Cap",
      returns1y: 19.3,
      returns3y: 16.1,
      returns5y: 17.2,
      minSip: 1000,
      rating: 4,
      nav: 567.23,
      riskLevel: "High" as const
    },
    {
      name: "Mirae Asset Large Cap",
      category: "Large Cap",
      returns1y: 14.6,
      returns3y: 12.3,
      returns5y: 13.8,
      minSip: 500,
      rating: 4,
      nav: 789.45,
      riskLevel: "Low" as const
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Higher Returns",
      description: "Historically, mutual funds have delivered 12-15% annual returns vs 6-7% in traditional savings",
      highlight: "12-15% Returns"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Professional Management", 
      description: "Expert fund managers with 10+ years experience research and manage your investments",
      highlight: "Expert Managed"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Smart Diversification",
      description: "Automatically spread risk across 50+ securities and multiple sectors",
      highlight: "50+ Holdings"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Regulated & Safe",
      description: "SEBI regulated funds with complete transparency and investor protection",
      highlight: "SEBI Protected"
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Start Small",
      description: "Begin your investment journey with just ₹500 per month through SIP",
      highlight: "₹500 Minimum"
    },
    {
      icon: <Gift className="h-8 w-8 text-teal-600" />,
      title: "Exclusive Rewards",
      description: "Earn up to ₹70,000 wallet credits through our unique reward programs",
      highlight: "₹70K Rewards"
    }
  ];

  const gamificationFeatures = [
    {
      icon: <Trophy className="h-12 w-12 text-yellow-500" />,
      title: "SIP Champion",
      description: "Complete 12 consecutive SIPs and earn the SIP Champion badge + up to ₹20,000 wallet credits",
      badge: "Achievement Badge",
      progress: "Track your SIP streak"
    },
    {
      icon: <Target className="h-12 w-12 text-blue-500" />,
      title: "Portfolio Master",
      description: "Transfer your existing portfolio and unlock Portfolio Master status + up to ₹50,000 wallet credits",
      badge: "Elite Status",
      progress: "Portfolio value milestones"
    },
    {
      icon: <Star className="h-12 w-12 text-purple-500" />,
      title: "Investment Milestones",
      description: "Track your investment journey with milestone rewards and progress indicators",
      badge: "Progress Tracker",
      progress: "Level up as you invest"
    }
  ];

  // Use real testimonials from featured reviews, fallback to default if none
  const testimonials = featuredReviews && featuredReviews.length > 0 ? 
    featuredReviews.map(review => ({
      name: review.profiles?.full_name || 'Anonymous Investor',
      location: 'India', // Could be enhanced with location data
      text: review.ai_enhanced_text || review.review_text,
      investment: review.monthly_sip_amount ? 
        `₹${review.monthly_sip_amount.toLocaleString('en-IN')} monthly SIP` : 
        review.investment_amount ? 
        `₹${review.investment_amount.toLocaleString('en-IN')} portfolio` :
        'Happy Investor'
    })) : [
    {
      name: "Getting Started",
      location: "India",
      text: "Be among the first to share your investment experience with SIP Brewery!",
      investment: "Start your journey"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length]);

  // Format numbers for display
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      {/* Live Investor Stats Section */}
      {investorStats && (
        <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{investorStats.total_investors.toLocaleString('en-IN')}+</h3>
                <p className="text-blue-100">Happy Investors</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{formatAmount(investorStats.total_amount_invested)}</h3>
                <p className="text-blue-100">Total Invested</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{investorStats.average_rating.toFixed(1)}/5</h3>
                <p className="text-blue-100">Average Rating</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{investorStats.total_reviews}+</h3>
                <p className="text-blue-100">Reviews</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Rewards Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-32 h-32 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-300 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full p-4 shadow-2xl">
                <Gift className="h-20 w-20 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🎁 Exclusive Reward Programs
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The only platform that rewards your investment discipline with real money!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-emerald-100">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">SIP Streak Rewards</h3>
                    <Zap className="h-8 w-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-lg mb-4">
                    <p className="text-2xl font-bold">Up to ₹20,000</p>
                    <p className="text-sm opacity-90">Wallet Credits</p>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Complete 12 consecutive SIPs without any break and earn substantial wallet credits!
                  </p>
                  <div className="flex items-center text-green-600 font-medium">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Consistency Rewarded
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 border-2 border-blue-100">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">Portfolio Transfer Bonus</h3>
                    <Sparkles className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-lg mb-4">
                    <p className="text-2xl font-bold">Up to ₹50,000</p>
                    <p className="text-sm opacity-90">Wallet Credits</p>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Move your existing portfolio to SIP Brewery and get rewarded for making the smart choice!
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Smart Migration
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200">
              <p className="text-lg text-gray-700 mb-2">
                <strong className="text-green-600">Double Rewards Available!</strong> You can earn both SIP Streak AND Portfolio Transfer rewards.
              </p>
              <p className="text-gray-600">
                These wallet credits can be used for future investments or redeemed as per our terms. 
                It's our unique way of rewarding your investment discipline!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Real Data */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Investors Say</h2>
            <p className="text-xl text-gray-600">
              Real stories from real investors
              {investorStats && (
                <span className="block text-lg text-blue-600 mt-2">
                  Based on {investorStats.total_reviews} genuine reviews • Average rating: {investorStats.average_rating.toFixed(1)}/5
                </span>
              )}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {featuredReviews && featuredReviews.length > 0 ? '5.0 Rating' : 'Be the first to review!'}
                  </span>
                </div>
                
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Investment</p>
                    <p className="font-semibold text-blue-600">{testimonials[currentTestimonial].investment}</p>
                  </div>
                </div>
                
                {testimonials.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Enhanced Gamification Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Achievement System & Investor Rewards
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Track your investment journey with our AMFI-compliant achievement system designed to encourage disciplined investing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {gamificationFeatures.map((feature, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 bg-white hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm px-4 py-2 rounded-full mb-4 font-semibold">
                    {feature.badge}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">{feature.progress}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gray-200 max-w-4xl mx-auto">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Regulatory Compliance Disclaimer</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                These rewards are incentives for disciplined investing and portfolio management. 
                All mutual fund investments are subject to market risks. Please read scheme documents carefully. 
                Rewards do not guarantee investment returns. This system complies with AMFI and SEBI guidelines for investor education and engagement.
                <br /><br />
                <strong>Important:</strong> Achievement badges and progress tracking are educational tools designed to promote investment discipline and are not linked to fund performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Top Mutual Funds Section */}
      <section id="funds" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Performing Mutual Funds</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked regular funds with professional support and consistent track record. 
              <span className="text-blue-600 font-semibold"> Start with just ₹500!</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topFunds.map((fund, index) => (
              <div key={index} className="transform hover:scale-105 transition-all duration-300">
                <FundCard {...fund} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="group px-10 py-6 text-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              View All 500+ Funds
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <InvestmentCalculator />

      {/* Enhanced Why Invest Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SIP Brewery?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We offer regular mutual funds with professional management and exclusive reward programs 
              that give you more value for your investments than any other platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group text-center hover:shadow-2xl transition-all duration-300 bg-white border-2 hover:border-blue-200 hover:scale-105 hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-4 py-2 rounded-full mb-4 font-bold">
                    {benefit.highlight}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join {investorStats ? `${investorStats.total_investors.toLocaleString('en-IN')}+` : '50,000+'} Indians who are building wealth through mutual funds and earning wallet credit rewards. 
            <span className="font-bold text-yellow-300"> Start with just ₹500!</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button 
              size="lg" 
              onClick={handleStartInvesting}
              className="group bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              Start Investing Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 border-2 border-amber-500 hover:border-amber-600 px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                Schedule a Free Call
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Hidden Charges</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>SEBI Regulated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-6">
                <BreweryLogo size="md" />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Making mutual fund investments rewarding and accessible for every Indian with our unique wallet credit programs and professional guidance.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-xs text-gray-400 space-y-1">
                  <p className="font-semibold text-blue-400">SEBI Registered Investment Advisor</p>
                  <p>AMFI Compliant Platform</p>
                  <p>All investments subject to market risks</p>
                  <p>Registration: INA000012345</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => document.getElementById('funds')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Mutual Funds</button></li>
                <li><button onClick={() => document.getElementById('calculator')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">SIP Calculator</button></li>
                <li><Link to="/referrals" className="hover:text-white transition-colors">Referral Program</Link></li>
                <li><Link to="/whatsapp-bot" className="hover:text-white transition-colors">WhatsApp Bot</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><button onClick={() => document.getElementById('funds')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Fund Research</button></li>
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Investment Guide</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Legal & Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Customer Support</Link></li>
                <li><a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SEBI Official</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="text-center text-gray-400 space-y-2">
              <p className="text-lg">&copy; 2024 Equisculpt Ventures. All rights reserved.</p>
              <p className="text-sm max-w-4xl mx-auto">
                Mutual Fund investments are subject to market risks. Please read all scheme documents carefully before investing. 
                Past performance is not indicative of future returns. SEBI Registered Investment Advisor | AMFI Compliant | 
                All wallet credits are promotional offers and do not guarantee investment returns.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  SIP Brewery is a trademark of Equisculpt Ventures Pvt. Ltd. | 
                  Equisculpt Ventures Pvt. Ltd. is an AMFI Registered Mutual Fund Distributor
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ComplianceFooter />
      
      {/* Review Modal */}
      <ReviewModal open={shouldShowReview} onOpenChange={dismissReview} />

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <BreweryLogo size="lg" />
              </div>
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
    </div>
  );
};

export default Index;
