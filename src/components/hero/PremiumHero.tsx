import React, { useState } from 'react';
import { Brain, TrendingUp, Shield, Users, Target, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

const PremiumHero = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const { user } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleInvestNow = () => {
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

  const scrollToAIAnalysis = () => {
    const element = document.getElementById('ai-analysis-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToComparison = () => {
    const element = document.getElementById('fund-comparison-preview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced algorithms analyze 3000+ funds with precision and deliver personalized insights."
    },
    {
      icon: TrendingUp,
      title: "Real-time Performance",
      description: "Live market data and performance tracking with instant notifications and alerts."
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer encryption with SEBI compliance and complete regulatory adherence."
    },
    {
      icon: Target,
      title: "Goal-Based Investing",
      description: "Tailored investment strategies aligned with your financial objectives and timeline."
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Animated Particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-secondary rounded-full opacity-60 animate-floating-particles"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent rounded-full opacity-70 animate-floating-particles" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-secondary-glow rounded-full opacity-50 animate-floating-particles" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary-glow rounded-full opacity-80 animate-floating-particles" style={{ animationDelay: '6s' }}></div>
        
        {/* Luxury Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-gradient-glow rounded-full blur-3xl opacity-25 animate-float" style={{ animationDelay: '5s' }}></div>
        
        {/* Premium Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/20"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Premium Trust Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center glass-panel px-8 py-4 rounded-full mb-8 group hover:shadow-glow transition-all duration-500">
            <Shield className="h-6 w-6 mr-3 text-accent animate-pulse" />
            <span className="text-foreground font-semibold font-heading">
              🏆 AMFI Registered • SEBI Compliant • 12,500+ Happy Investors
            </span>
            <Sparkles className="h-6 w-6 ml-3 text-secondary animate-bounce" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-6xl mx-auto mb-20">
          <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-tight">
            <span className="block bg-gradient-gold bg-clip-text text-transparent animate-liquid-gold" style={{ 
              backgroundSize: '200% 200%',
              filter: 'drop-shadow(0 4px 20px rgba(255, 215, 0, 0.4))',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
            }}>
              Invest Smarter.
            </span>
            <span className="block bg-gradient-glow bg-clip-text text-transparent animate-liquid-gold" style={{ 
              backgroundSize: '200% 200%',
              animationDelay: '1s',
              filter: 'drop-shadow(0 4px 20px rgba(58, 12, 163, 0.4))'
            }}>
              Grow Faster.
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl font-serif text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed" style={{
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
          }}>
            <span className="text-secondary font-medium">India's Most Advanced</span> Mutual Fund Platform
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto font-body opacity-90">
            Experience the future of investing with AI-powered insights, real-time analytics, 
            and a platform trusted by thousands of smart investors.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={handleInvestNow}
              size="lg" 
              className="group bg-gradient-secondary hover:bg-secondary-glow text-secondary-foreground px-10 py-6 text-xl font-bold font-heading rounded-2xl shadow-gold hover:shadow-neon transition-all duration-500 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-1000"></div>
              <Target className="h-6 w-6 mr-3 relative z-10" />
              <span className="relative z-10">Start Brewing Wealth</span>
              <ArrowRight className="h-6 w-6 ml-3 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={scrollToAIAnalysis}
              size="lg" 
              className="glass-button text-foreground hover:text-secondary px-10 py-6 text-xl font-bold font-heading rounded-2xl hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Brain className="h-6 w-6 mr-3" />
              Explore AI Analytics
            </Button>
          </div>

          {/* Premium Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-12 text-muted-foreground mb-16">
            <div className="flex items-center gap-3 group hover:text-secondary transition-colors duration-300">
              <Users className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold font-heading text-lg">12,500+ Investors</span>
            </div>
            <div className="flex items-center gap-3 group hover:text-secondary transition-colors duration-300">
              <TrendingUp className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold font-heading text-lg">₹85Cr+ AUM</span>
            </div>
            <div className="flex items-center gap-3 group hover:text-secondary transition-colors duration-300">
              <Star className="h-6 w-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold font-heading text-lg">4.8★ Rated</span>
            </div>
          </div>
        </div>

        {/* Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="glass-panel border-white/10 hover:border-secondary/40 transition-all duration-500 hover:shadow-floating group hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-primary w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-500 group-hover:rotate-12">
                  <feature.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-4 text-foreground group-hover:text-secondary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="glass-panel rounded-3xl p-12 max-w-md w-full shadow-luxury border-white/20" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-10">
              <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Welcome to SIP Brewery!</h3>
              <p className="text-muted-foreground text-lg font-serif">Choose your investment journey</p>
            </div>
            <div className="space-y-6">
              <Button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-gradient-primary hover:bg-primary-glow text-primary-foreground py-6 px-8 text-lg font-semibold font-heading rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                I'm an Investor
              </Button>
              <Button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full glass-button text-foreground hover:text-secondary py-6 px-8 text-lg font-semibold font-heading rounded-2xl transition-all duration-300 hover:scale-105"
              >
                I'm a Financial Advisor
              </Button>
            </div>
            <button 
              onClick={() => setShowUserTypeModal(false)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-2xl transition-colors duration-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PremiumHero;