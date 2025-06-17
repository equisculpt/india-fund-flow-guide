
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import RiskProfiling from "@/components/RiskProfiling";
import AIFundComparison from "@/components/AIFundComparison";
import ReferralSystem from "@/components/ReferralSystem";
import WhatsAppIntegration from "@/components/WhatsAppIntegration";
import TrademarkNotice from "@/components/TrademarkNotice";
import ComplianceFooter from "@/components/ComplianceFooter";
import EnhancedFundSearch from "@/components/EnhancedFundSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import ReviewModal from "@/components/ReviewModal";
import { useState, useEffect } from "react";
import { TrendingUp, Calculator, Target, Sparkles, Users, Bot, Search } from "lucide-react";
import { useTopFundsNAV } from "@/hooks/useTopFundsNAV";

const Index = () => {
  const { isAuthenticated, user } = useEnhancedAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Initialize top funds NAV fetching
  const { navData, loading: navLoading, error: navError } = useTopFundsNAV();

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
  };

  const handleFundSearchSelect = (fund: any) => {
    console.log('Fund selected from search - navigating to fund details:', fund);
    // Navigation is handled in EnhancedFundSearch component
  };

  console.log('Index page rendering, isAuthenticated:', isAuthenticated, 'user:', user);
  console.log('Top funds NAV loading:', navLoading, 'error:', navError, 'data size:', navData.size);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <HeroSection />
      
      {/* NAV Loading Status */}
      {navLoading && (
        <div className="container mx-auto px-4 py-2">
          <div className="text-center text-sm text-blue-600">
            Loading latest NAV data for top funds...
          </div>
        </div>
      )}
      
      {navError && (
        <div className="container mx-auto px-4 py-2">
          <div className="text-center text-sm text-red-600">
            Error loading NAV data: {navError}
          </div>
        </div>
      )}
      
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

          {/* Enhanced Fund Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search Any Mutual Fund
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Search for any mutual fund in the market to view detailed analysis, NAV, and performance data
              </p>
            </CardHeader>
            <CardContent>
              <EnhancedFundSearch 
                onFundSelect={handleFundSearchSelect}
                placeholder="Type any mutual fund name (e.g., HDFC Top 100, SBI Small Cap, ICICI Prudential...)"
                className="w-full"
              />
            </CardContent>
          </Card>

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
          {/* Enhanced Fund Search Section for Non-authenticated Users */}
          <section id="funds">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Search Any Mutual Fund
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Search for any mutual fund in the market to view detailed analysis, NAV, and performance data
                </p>
              </CardHeader>
              <CardContent>
                <EnhancedFundSearch 
                  onFundSelect={handleFundSearchSelect}
                  placeholder="Type any mutual fund name (e.g., HDFC Top 100, SBI Small Cap, ICICI Prudential...)"
                  className="w-full"
                />
              </CardContent>
            </Card>

            <AIFundComparison />
          </section>
          
          <section id="calculator">
            <InvestmentCalculator />
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
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
};

export default Index;
