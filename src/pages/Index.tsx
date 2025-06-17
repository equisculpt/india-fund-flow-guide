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
  const [selectedSearchFund, setSelectedSearchFund] = useState<any>(null);
  const [loadingSelectedFund, setLoadingSelectedFund] = useState(false);
  
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
    // Handle risk profile completion logic here
  };

  const handleFundSearchSelect = async (fund: any) => {
    console.log('Fund selected from search:', fund);
    setLoadingSelectedFund(true);
    
    try {
      // If we don't have NAV data, fetch it
      if (!fund.nav && fund.schemeCode) {
        console.log('Fetching latest NAV for selected fund:', fund.schemeCode);
        // You could fetch fresh NAV data here if needed
      }
      
      // Create a properly formatted fund object for display
      const enhancedFund = {
        ...fund,
        // Ensure we have all required fields
        id: fund.schemeCode,
        scheme_name: fund.schemeName,
        amc_name: fund.fundHouse || 'Unknown AMC',
        category: fund.category || 'Unknown',
        nav: fund.nav || 0,
        navDate: fund.navDate,
        // Add some mock analysis data (in real app, this would come from your analysis service)
        returns_1y: 15 + Math.random() * 10,
        returns_3y: 12 + Math.random() * 8,
        risk_level: fund.category?.includes('Small') ? 'High' : 
                   fund.category?.includes('Large') ? 'Low' : 'Moderate',
        min_sip_amount: 500
      };
      
      setSelectedSearchFund(enhancedFund);
      console.log('Enhanced selected fund data:', enhancedFund);
    } catch (error) {
      console.error('Error processing selected fund:', error);
    } finally {
      setLoadingSelectedFund(false);
    }
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
              
              {loadingSelectedFund && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-700">Loading fund analysis...</span>
                  </div>
                </div>
              )}
              
              {selectedSearchFund && !loadingSelectedFund && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900">{selectedSearchFund.schemeName || selectedSearchFund.scheme_name}</h3>
                      <p className="text-sm text-blue-700">
                        {selectedSearchFund.category} • NAV: ₹{selectedSearchFund.nav?.toFixed(4) || 'Loading...'}
                      </p>
                      {selectedSearchFund.fundHouse && (
                        <p className="text-xs text-blue-600">Fund House: {selectedSearchFund.amc_name || selectedSearchFund.fundHouse}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="text-green-600">1Y: {selectedSearchFund.returns_1y?.toFixed(1)}%</span>
                        <span className="text-green-600">3Y: {selectedSearchFund.returns_3y?.toFixed(1)}%</span>
                        <span className="text-purple-600">Risk: {selectedSearchFund.risk_level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {selectedSearchFund.navDate && (
                        <p className="text-xs text-blue-600">
                          Updated: {new Date(selectedSearchFund.navDate.split('-').reverse().join('-')).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                
                {loadingSelectedFund && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700">Loading fund analysis...</span>
                    </div>
                  </div>
                )}
                
                {selectedSearchFund && !loadingSelectedFund && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-blue-900">{selectedSearchFund.schemeName || selectedSearchFund.scheme_name}</h3>
                        <p className="text-sm text-blue-700">
                          {selectedSearchFund.category} • NAV: ₹{selectedSearchFund.nav?.toFixed(4) || 'Loading...'}
                        </p>
                        {selectedSearchFund.fundHouse && (
                          <p className="text-xs text-blue-600">Fund House: {selectedSearchFund.amc_name || selectedSearchFund.fundHouse}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-xs">
                          <span className="text-green-600">1Y: {selectedSearchFund.returns_1y?.toFixed(1)}%</span>
                          <span className="text-green-600">3Y: {selectedSearchFund.returns_3y?.toFixed(1)}%</span>
                          <span className="text-purple-600">Risk: {selectedSearchFund.risk_level}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {selectedSearchFund.navDate && (
                          <p className="text-xs text-blue-600">
                            Updated: {new Date(selectedSearchFund.navDate.split('-').reverse().join('-')).toLocaleDateString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
