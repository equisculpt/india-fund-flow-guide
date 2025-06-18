
import AdvancedFundChart from "@/components/AdvancedFundChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface AdvancedChartsTabProps {
  selectedFund: any;
}

const AdvancedChartsTab = ({ selectedFund }: AdvancedChartsTabProps) => {
  const demoFund = {
    schemeCode: "DEMO001",
    schemeName: "HDFC Top 100 Fund - Direct Plan",
    category: "Large Cap",
    nav: 856.32,
    aiScore: 8.5
  };

  const handleDemoClick = () => {
    // This would be handled by the parent component
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Fund Performance Charts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Search and analyze any mutual fund with real-time data and AI insights
          </p>
        </CardHeader>
        <CardContent>
          {selectedFund ? (
            <div className="space-y-4">
              {/* Selected Fund Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-900">{selectedFund.schemeName}</h3>
                    <p className="text-sm text-blue-700">
                      {selectedFund.category} • NAV: ₹{selectedFund.nav?.toFixed(4) || 'Loading...'}
                    </p>
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    AI Score: {selectedFund.aiScore?.toFixed(1)}
                  </Badge>
                </div>
              </div>
              
              <AdvancedFundChart 
                primaryFund={selectedFund}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Search for any mutual fund above to view detailed charts and analysis
              </p>
              <Button 
                variant="outline"
                onClick={handleDemoClick}
              >
                View Demo Chart
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedChartsTab;
