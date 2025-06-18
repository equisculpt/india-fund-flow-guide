
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, X, BarChart3 } from "lucide-react";
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
    if (selectedFunds.length >= 5) return;
    
    // Check if fund is already selected
    if (selectedFunds.find(f => f.schemeCode === fund.schemeCode)) return;
    
    const newSelectedFunds = [...selectedFunds, fund];
    setSelectedFunds(newSelectedFunds);
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

  const getFundColors = () => {
    return ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];
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
            Select 2-5 mutual funds for comprehensive AI-powered comparison. Add funds below and click compare when ready.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fund Search */}
          <div>
            <FundSearchAutocomplete
              onFundSelect={handleFundSelect}
              selectedFunds={selectedFunds}
              maxFunds={5}
              placeholder={
                selectedFunds.length === 0 
                  ? "Search and add your first fund..." 
                  : selectedFunds.length >= 5 
                    ? "Maximum 5 funds selected" 
                    : "Search and add another fund..."
              }
            />
          </div>

          {/* Selected Funds Display */}
          {selectedFunds.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected Funds</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedFunds.length}/5 funds</Badge>
                  {selectedFunds.length >= 2 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Ready to Compare
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Fund Cards */}
              <div className="grid gap-3">
                {selectedFunds.map((fund, index) => (
                  <div 
                    key={fund.schemeCode} 
                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: getFundColors()[index] }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{fund.schemeName}</p>
                        <p className="text-xs text-gray-600">
                          {fund.category || 'Unknown Category'} • {fund.fundHouse || 'Unknown AMC'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFund(fund.schemeCode)}
                      className="flex-shrink-0 h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Comparison Button */}
              <div className="pt-4 border-t">
                {selectedFunds.length >= 2 ? (
                  <Button 
                    onClick={handleCompareNow} 
                    className="w-full flex items-center gap-2"
                    size="lg"
                  >
                    <BarChart3 className="h-5 w-5" />
                    Compare {selectedFunds.length} Funds with AI Analysis
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Add {2 - selectedFunds.length} more fund{2 - selectedFunds.length !== 1 ? 's' : ''} to start comparison
                    </p>
                    <Button disabled className="w-full" size="lg">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Compare Funds (Need {2 - selectedFunds.length} more)
                    </Button>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Comparison Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Compare funds from similar categories for better insights</li>
                  <li>• Our AI analyzes performance, expense ratios, and market conditions</li>
                  <li>• Results include investment horizon recommendations</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopLevelFundComparison;
