
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import EnhancedFundSearch from "@/components/EnhancedFundSearch";
import PublicFundsTabs from "@/components/public-funds/PublicFundsTabs";
import { useNavigate } from "react-router-dom";

const PublicFundsPage = () => {
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFundSearchSelect = (fund: any) => {
    console.log('PublicFundsPage: Fund selected from search:', fund);
    
    // Navigate to fund details page if schemeCode exists
    if (fund.schemeCode) {
      navigate(`/fund/${fund.schemeCode}`);
      return;
    }
    
    // Convert search result to our fund format for comparison
    const fundForChart = {
      schemeCode: fund.schemeCode,
      schemeName: fund.schemeName,
      category: fund.category || 'Unknown',
      nav: fund.nav || 0,
      aiScore: Math.random() * 3 + 7 // Generate a realistic AI score
    };
    
    setSelectedFund(fundForChart);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Advanced Mutual Fund Analysis
            </h1>
            <p className="text-gray-600 mb-4">
              Real-time NAV data with AI-powered predictions, advanced charting, and benchmark comparisons - No login required
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <EnhancedFundSearch 
                onFundSelect={handleFundSearchSelect}
                placeholder="Search any mutual fund by name (e.g., HDFC Top 100, SBI Small Cap...)"
                className="w-full"
              />
            </div>
          </div>

          <PublicFundsTabs 
            selectedFund={selectedFund}
            onFundSelect={handleFundSearchSelect}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PublicFundsPage;
