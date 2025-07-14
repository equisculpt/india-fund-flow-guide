import React, { useState } from 'react';
import { Brain, TrendingUp, Shield, Users, Search, BarChart3, Target, Sparkles, Award, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';

const WorldClassHero = () => {
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
      title: "AI-Powered Mutual Fund Analysis",
      description: "Get instant AI insights on 3000+ funds with risk assessment, return predictions, and personalized recommendations."
    },
    {
      icon: BarChart3,
      title: "Comprehensive Fund Comparison",
      description: "Compare up to 5 funds side-by-side with advanced analytics, performance charts, and AI verdicts."
    },
    {
      icon: Target,
      title: "Goal-Based Investing",
      description: "Create investment plans tailored to your financial goals with automated rebalancing and progress tracking."
    },
    {
      icon: Shield,
      title: "100% Secure & SEBI Compliant",
      description: "Bank-grade security, SEBI registered, AMFI compliant platform with complete transparency."
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-muted via-background to-muted py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-secondary rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-accent rounded-full blur-3xl opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Trust Badge */}
        <div className="text-center mb-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm font-semibold px-6 py-2">
            <Shield className="h-4 w-4 mr-2" />
            🎉 AMFI Registered | SEBI Compliant | 3000+ Funds | Real Human Support
            <Sparkles className="h-4 w-4 ml-2 text-accent" />
          </Badge>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-6xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 leading-tight">
            Invest Smarter.<br />
            Grow Faster.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            <span className="inline-block animate-pulse bg-gradient-primary bg-clip-text text-transparent font-semibold">
              India's Most Advanced Mutual Fund Platform
            </span>
          </p>
          <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-4xl mx-auto">
            AI-powered insights, transparent analytics, and effortless investing. 
            Join thousands of smart investors who trust our platform for their financial growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToAIAnalysis}
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Brain className="h-5 w-5 mr-2" />
              Explore AI Analysis
            </Button>
            <Button 
              onClick={scrollToComparison}
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Compare Funds
            </Button>
            <Button 
              onClick={handleInvestNow}
              size="lg"
              className="bg-gradient-secondary hover:opacity-90 text-secondary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Target className="h-5 w-5 mr-2" />
              Invest Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground mb-16">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">12,500+ Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="font-semibold">₹85Cr+ AUM</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              <span className="font-semibold">4.6★ Rated</span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">AI-Driven Insights</h3>
              <p className="text-muted-foreground">Advanced algorithms analyze market data to provide personalized investment recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">100% Secure</h3>
              <p className="text-muted-foreground">Bank-grade security with complete regulatory compliance and transparency</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Real human support from certified financial advisors whenever you need help</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserTypeModal(false)}>
          <div className="bg-card rounded-3xl p-10 max-w-md w-full shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-8">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-card-foreground mb-3">Welcome!</h3>
              <p className="text-muted-foreground text-lg">Please select your account type to continue</p>
            </div>
            <div className="space-y-4">
              <Button 
                onClick={() => handleUserTypeSelection('client')}
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                I'm an Investor (Client)
              </Button>
              <Button 
                onClick={() => handleUserTypeSelection('agent')}
                className="w-full bg-secondary hover:bg-secondary-glow text-secondary-foreground py-5 px-6 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                I'm a Financial Advisor (Agent)
              </Button>
            </div>
            <button 
              onClick={() => setShowUserTypeModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-3xl font-light transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorldClassHero;