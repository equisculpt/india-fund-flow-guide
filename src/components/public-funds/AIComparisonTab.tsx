
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp } from "lucide-react";

interface AIComparisonTabProps {
  selectedFund?: any;
}

const AIComparisonTab = ({ selectedFund }: AIComparisonTabProps) => {
  // If a specific fund is selected, show a message directing to the Selected Fund tab
  if (selectedFund) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Fund Analysis Ready
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {selectedFund.schemeName}
              </h3>
              <p className="text-green-700 mb-4">
                Fund successfully selected! Your detailed analysis is now available.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>Switch to "Selected Fund" tab to view complete analysis</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // When no fund is selected, show the comparison interface
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-600" />
          AI Fund Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Search for a Fund to Begin Analysis
            </h3>
            <p className="text-blue-700 mb-4">
              Use the search bar above to find any mutual fund and get instant AI-powered analysis.
            </p>
            <div className="text-sm text-blue-600">
              Try searching for funds like "HDFC Top 100", "SBI Small Cap", or "Axis ELSS"
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default AIComparisonTab;
