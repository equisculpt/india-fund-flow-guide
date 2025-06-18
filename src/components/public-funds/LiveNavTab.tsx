
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star } from "lucide-react";
import EnhancedFundSearch from "@/components/EnhancedFundSearch";

interface LiveNavTabProps {
  selectedFund: any;
  onFundSelect: (fund: any) => void;
}

const LiveNavTab = ({ selectedFund, onFundSelect }: LiveNavTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Live NAV Updates with Real-time Search
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Search for any mutual fund to get real-time NAV data and AI analysis
        </p>
      </CardHeader>
      <CardContent>
        {/* Search Section */}
        <div className="mb-6">
          <EnhancedFundSearch 
            onFundSelect={onFundSelect}
            placeholder="Search any mutual fund for live NAV data (e.g., HDFC Top 100, SBI Small Cap...)"
            className="w-full"
          />
        </div>

        {/* Selected Fund Display */}
        {selectedFund && (
          <div className="mb-6">
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">{selectedFund.schemeName}</h3>
                  <p className="text-sm text-blue-700 mb-2">{selectedFund.category}</p>
                  <div className="text-2xl font-bold text-green-600">₹{selectedFund.nav?.toFixed(4) || 'Loading...'}</div>
                  <p className="text-xs text-gray-600 mt-1">Last updated: {new Date().toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    AI Score: {selectedFund.aiScore?.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Real-time NAV Data:</strong> Search for any mutual fund to get live NAV prices with AI analysis. 
            Use the search bar above to find specific funds and view their current performance metrics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveNavTab;
