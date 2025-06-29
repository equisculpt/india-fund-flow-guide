
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TEST_USER_DATA } from '@/services/testData';

interface HoldingsTabProps {
  formatCurrency: (amount: number) => string;
  handleInvestMore: () => void;
}

const HoldingsTab = ({ formatCurrency, handleInvestMore }: HoldingsTabProps) => {
  const { investments } = TEST_USER_DATA;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          My Investment Holdings
          <Button size="sm" onClick={handleInvestMore}>
            <Plus className="h-4 w-4 mr-2" />
            Invest More
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investments.map((holding, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-lg">{holding.fund_name}</h4>
                  <p className="text-sm text-gray-600">{holding.units_allotted.toFixed(3)} units • {holding.investment_type}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Invested</p>
                  <p className="font-medium text-lg">{formatCurrency(holding.total_invested)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Value</p>
                  <p className="font-medium text-lg">{formatCurrency(holding.current_value)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Gains</p>
                  <p className="font-medium text-lg text-green-600">
                    {formatCurrency(holding.gains)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Returns</p>
                  <p className="font-bold text-lg text-green-600">+{holding.gainPercentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HoldingsTab;
