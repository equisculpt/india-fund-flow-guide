
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { useState } from "react";
import FundSearchAutocomplete from "./charts/FundSearchAutocomplete";
import { MutualFundSearchService } from "@/services/mutualFundSearchService";
import { FundComparisonLogic, FundWithDetails } from "./comparison/FundComparisonLogic";
import ComparisonResult from "./comparison/ComparisonResult";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
}

const TopLevelFundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundSearchResult[]>([]);
  const [fundsWithDetails, setFundsWithDetails] = useState<FundWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  const handleFundSelect = async (fund: FundSearchResult) => {
    const newSelectedFunds = [...selectedFunds, fund];
    setSelectedFunds(newSelectedFunds);
    
    setLoading(true);
    try {
      // Fetch detailed fund information
      const details = await MutualFundSearchService.getFundDetails(fund.schemeCode);
      if (details) {
        const fundWithDetails: FundWithDetails = {
          ...fund,
          nav: details.nav,
          navDate: details.navDate,
          category: details.category,
          fundHouse: details.fundHouse,
          // Mock performance data - in real app, fetch from your API
          returns1M: Math.random() * 10 - 5,
          returns2M: Math.random() * 15 - 7,
          returns3M: Math.random() * 20 - 10,
          returns6M: Math.random() * 25 - 12,
          returns1Y: Math.random() * 30 - 15,
          returns3Y: Math.random() * 20 + 5,
          returns5Y: Math.random() * 15 + 8,
          expenseRatio: Math.random() * 2 + 0.5,
          aum: Math.random() * 50000 + 1000,
        };
        
        setFundsWithDetails(prev => [...prev, fundWithDetails]);
        
        // If we have 2 or more funds, perform comparison
        if (newSelectedFunds.length >= 2) {
          const comparison = FundComparisonLogic.performComparison([...fundsWithDetails, fundWithDetails]);
          setComparisonResult(comparison);
        }
      }
    } catch (error) {
      console.error('Error fetching fund details:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFund = (schemeCode: string) => {
    setSelectedFunds(prev => prev.filter(f => f.schemeCode !== schemeCode));
    setFundsWithDetails(prev => prev.filter(f => f.schemeCode !== schemeCode));
    
    const remainingFunds = fundsWithDetails.filter(f => f.schemeCode !== schemeCode);
    if (remainingFunds.length >= 2) {
      const comparison = FundComparisonLogic.performComparison(remainingFunds);
      setComparisonResult(comparison);
    } else {
      setComparisonResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            AI Fund Comparison Tool
          </CardTitle>
          <p className="text-muted-foreground">
            Compare up to 5 mutual funds with AI-powered analysis. Focus on portfolio quality, recent performance trends, and market conditions.
          </p>
        </CardHeader>
        <CardContent>
          <FundSearchAutocomplete
            onFundSelect={handleFundSelect}
            selectedFunds={selectedFunds}
            maxFunds={5}
            placeholder="Search and add funds to compare..."
          />

          {selectedFunds.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected Funds</h3>
                <Badge variant="outline">{selectedFunds.length}/5 funds</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedFunds.map((fund, index) => (
                  <Badge 
                    key={fund.schemeCode} 
                    variant="secondary" 
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-red-100"
                    onClick={() => removeFund(fund.schemeCode)}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index] }}
                    />
                    <span className="max-w-32 truncate">{fund.schemeName}</span>
                    <span className="text-xs text-gray-500">×</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Analyzing funds...</p>
            </div>
          )}

          {comparisonResult && (
            <ComparisonResult 
              comparisonResult={comparisonResult} 
              selectedFunds={selectedFunds}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopLevelFundComparison;
