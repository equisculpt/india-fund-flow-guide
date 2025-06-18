
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FundSearchAutocomplete from "./charts/FundSearchAutocomplete";

interface FundSearchResult {
  schemeCode: string;
  schemeName: string;
  category?: string;
  fundHouse?: string;
}

const TopLevelFundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState<FundSearchResult[]>([]);
  const navigate = useNavigate();

  const handleFundSelect = (fund: FundSearchResult) => {
    const newSelectedFunds = [...selectedFunds, fund];
    setSelectedFunds(newSelectedFunds);
    
    // Automatically navigate to comparison page when 2+ funds are selected
    if (newSelectedFunds.length >= 2) {
      navigate('/fund-comparison', { 
        state: { funds: newSelectedFunds }
      });
    }
  };

  const removeFund = (schemeCode: string) => {
    setSelectedFunds(prev => prev.filter(f => f.schemeCode !== schemeCode));
  };

  const handleCompareNow = () => {
    if (selectedFunds.length >= 2) {
      navigate('/fund-comparison', { 
        state: { funds: selectedFunds }
      });
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
            Compare up to 5 mutual funds with AI-powered analysis. Comparison will start automatically when you select 2 funds.
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

              {selectedFunds.length >= 2 && (
                <Button onClick={handleCompareNow} className="w-full">
                  Compare {selectedFunds.length} Funds with AI Analysis
                </Button>
              )}

              {selectedFunds.length === 1 && (
                <p className="text-sm text-gray-600">Add one more fund to start comparison</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopLevelFundComparison;
