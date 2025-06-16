
import HeroSection from "@/components/HeroSection";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import RiskProfiling from "@/components/RiskProfiling";
import AIFundComparison from "@/components/AIFundComparison";
import ReferralSystem from "@/components/ReferralSystem";
import WhatsAppIntegration from "@/components/WhatsAppIntegration";
import TrademarkNotice from "@/components/TrademarkNotice";
import ComplianceFooter from "@/components/ComplianceFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import ReviewModal from "@/components/ReviewModal";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calculator, Target, Sparkles, Users, Bot } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user } = useEnhancedAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Check for review prompt after investment activities
  useEffect(() => {
    const checkReviewPrompt = () => {
      const lastReviewPrompt = localStorage.getItem('lastReviewPrompt');
      const investmentCount = localStorage.getItem('investmentCount') || '0';
      
      if (isAuthenticated && parseInt(investmentCount) >= 3 && 
          (!lastReviewPrompt || Date.now() - parseInt(lastReviewPrompt) > 7 * 24 * 60 * 60 * 1000)) {
        setShowReviewModal(true);
      }
    };

    checkReviewPrompt();
  }, [isAuthenticated]);

  const handleReviewSubmitted = () => {
    localStorage.setItem('lastReviewPrompt', Date.now().toString());
    setShowReviewModal(false);
  };

  const handleRiskProfileComplete = (riskProfile: any) => {
    console.log('Risk profile completed:', riskProfile);
    // Handle risk profile completion logic here
  };

  console.log('Index page rendering, isAuthenticated:', isAuthenticated, 'user:', user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeroSection />
      
      {isAuthenticated ? (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.name || 'Investor'}! 👋
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continue your investment journey with our AI-powered tools and personalized recommendations.
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-1 bg-white/70 backdrop-blur-sm p-2 rounded-xl shadow-lg">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Risk Profile</span>
              </TabsTrigger>
              <TabsTrigger value="ai-funds" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI Funds</span>
              </TabsTrigger>
              <TabsTrigger value="referral" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Referrals</span>
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <PortfolioDashboard />
            </TabsContent>
            
            <TabsContent value="calculator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvestmentCalculator />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-6">
              <RiskProfiling onComplete={handleRiskProfileComplete} />
            </TabsContent>
            
            <TabsContent value="ai-funds" className="space-y-6">
              <AIFundComparison />
            </TabsContent>
            
            <TabsContent value="referral" className="space-y-6">
              <ReferralSystem />
            </TabsContent>
            
            <TabsContent value="whatsapp" className="space-y-6">
              <WhatsAppIntegration />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 space-y-16">
          <section id="calculator">
            <InvestmentCalculator />
          </section>
          
          <section id="funds">
            <AIFundComparison />
          </section>
          
          <section id="risk-profile">
            <RiskProfiling onComplete={handleRiskProfileComplete} />
          </section>
        </div>
      )}
      
      <TrademarkNotice />
      <ComplianceFooter />
      
      <ReviewModal 
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
      />
    </div>
  );
};

export default Index;
