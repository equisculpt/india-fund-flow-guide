
import AIFundComparison from "@/components/AIFundComparison";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

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
            <Search className="h-5 w-5 text-blue-600" />
            Fund Selected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-lg font-medium text-gray-900 mb-2">
              You have selected: {selectedFund.schemeName}
            </p>
            <p className="text-gray-600 mb-4">
              Switch to the "Selected Fund" tab to view detailed analysis of your chosen fund.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <AIFundComparison />;
};

export default AIComparisonTab;
