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
    <section className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)'
    }}>
      {/* Exact Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/20"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Premium Trust Badge - Exact Match */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-8 py-4 rounded-full border-2 border-cyan-400/50 bg-black/20 backdrop-blur-sm mb-12">
            <span className="text-white font-medium text-lg">
              🏆 AMFI Registered | SEBI Compliant | 3000+ Funds
            </span>
          </div>
        </div>

        {/* Hero Content - Exact Match */}
        <div className="text-center max-w-6xl mx-auto mb-20">
          <h1 className="text-7xl md:text-9xl font-heading font-black mb-8 leading-tight">
            <span className="block mb-4" style={{ 
              background: 'linear-gradient(90deg, #FFD700 0%, #FFED4A 25%, #68D391 50%, #4FD1C7 75%, #63B3ED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: '#FFD700',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}>
              Invest Smarter.
            </span>
            <span className="block" style={{ 
              background: 'linear-gradient(90deg, #FFD700 0%, #FFED4A 25%, #68D391 50%, #4FD1C7 75%, #63B3ED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: '#4FD1C7',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(79, 209, 197, 0.6), 0 0 40px rgba(79, 209, 197, 0.4)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}>
              Grow Faster
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl font-serif mb-12 max-w-4xl mx-auto leading-relaxed" style={{
            color: '#FFD700',
            filter: 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.4))',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            India's Most Advanced Mutual Fund Platform
          </p>

          {/* Premium CTA Button - Exact Match */}
          <div className="flex justify-center mb-16">
            <Button 
              onClick={handleInvestNow}
              size="lg" 
              className="group px-12 py-6 text-2xl font-bold font-heading rounded-full border-2 transition-all duration-500 hover:scale-105 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)',
                borderImage: 'linear-gradient(90deg, #FFD700, #4FD1C7) 1',
                color: '#FFD700',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              Get Started
            </Button>
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