import React, { useState } from 'react';
import { Brain, TrendingUp, Shield, Users, Target, Sparkles, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBackendAuth } from '@/contexts/BackendAuthContext';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import asiBotAnimation from '@/assets/asi-brew-bot-hero-animation.png';

const PremiumHero = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const { user } = useBackendAuth();
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
      background: 'linear-gradient(135deg, #0B132B 0%, #3A0CA3 50%, #1a1a2e 100%)'
    }}>
      {/* Soft radial light effect behind text */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Glassmorphic Trust Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400/50 transition-all duration-300 mb-12 hover:shadow-[0_0_30px_rgba(0,245,212,0.3)]">
            <span className="text-white font-medium text-lg">
              🏆 AMFI Registered | SEBI Compliant | 3000+ Funds
            </span>
          </div>
        </div>

        {/* Hero Content with Left-Right Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Text and CTA */}
          <div className="text-left">
            {/* Sharp Headline with Gold + Neon Teal Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-tight">
              <span className="block mb-4" style={{ 
                background: 'linear-gradient(90deg, #FFD700 0%, #00F5D4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
              }}>
                Invest Smarter.
              </span>
              <span className="block" style={{ 
                background: 'linear-gradient(90deg, #FFD700 0%, #00F5D4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(0, 245, 212, 0.4))'
              }}>
                Grow Faster
              </span>
            </h1>
            
            {/* Clean Subheadline */}
            <p className="text-xl md:text-2xl font-serif mb-8 leading-relaxed" style={{
              color: '#FFD700',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
            }}>
              Meet ASI Brew Bot – Your AI-Powered SIP Assistant
            </p>

            <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-2xl">
              Dynamic SIP adapts intelligently to market conditions, helping you earn 
              <span className="text-secondary font-semibold"> +9.4% higher growth</span> compared 
              to traditional static SIP investments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleInvestNow}
                className="group px-8 py-4 text-lg font-bold font-heading rounded-full transition-all duration-500 hover:scale-105 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))',
                  border: '2px solid',
                  borderImage: 'linear-gradient(90deg, #FFD700, #00F5D4) 1',
                  color: '#FFD700',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Dynamic SIP <ArrowRight className="h-5 w-5" />
                </span>
              </button>
              
              <button 
                onClick={scrollToComparison}
                className="px-8 py-4 text-lg font-semibold text-white/90 border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Compare Returns
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">₹9.3L</div>
                <div className="text-sm text-white/70">Dynamic SIP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white/60">₹8.5L</div>
                <div className="text-sm text-white/70">Static SIP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">+9.4%</div>
                <div className="text-sm text-white/70">Better Returns</div>
              </div>
            </div>
          </div>

          {/* Right Side - Animation Video */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-4">
              <OptimizedImage
                src={asiBotAnimation}
                alt="ASI Brew Bot Dynamic SIP Animation"
                width={800}
                height={450}
                className="w-full h-auto rounded-2xl"
                priority={true}
              />
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <span className="text-white/90 text-sm font-medium">AI Analyzing 1M+ Data Points</span>
              </div>
              
              <div className="absolute bottom-8 right-8 bg-gradient-to-r from-secondary/20 to-accent/20 backdrop-blur-md rounded-lg px-4 py-2 border border-secondary/30">
                <span className="text-white text-sm font-medium">Dynamic SIP in Action</span>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-accent/20 rounded-3xl blur-2xl -z-10"></div>
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