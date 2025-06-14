
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Star } from "lucide-react";

interface FundCardProps {
  name: string;
  category: string;
  returns1y: number;
  returns3y: number;
  returns5y: number;
  minSip: number;
  rating: number;
  nav: number;
  riskLevel: "Low" | "Moderate" | "High";
}

const FundCard = ({ 
  name, 
  category, 
  returns1y, 
  returns3y, 
  returns5y, 
  minSip, 
  rating, 
  nav, 
  riskLevel 
}: FundCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 bg-green-100";
      case "Moderate": return "text-yellow-600 bg-yellow-100";
      case "High": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-600">{category}</p>
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">1Y Returns</div>
            <div className="font-semibold text-green-600 flex items-center justify-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {returns1y}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">3Y Returns</div>
            <div className="font-semibold text-green-600">{returns3y}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">5Y Returns</div>
            <div className="font-semibold text-green-600">{returns5y}%</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 text-sm">
          <div>
            <span className="text-gray-500">NAV: </span>
            <span className="font-medium">₹{nav}</span>
          </div>
          <div>
            <span className="text-gray-500">Min SIP: </span>
            <span className="font-medium">₹{minSip}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}>
            {riskLevel} Risk
          </span>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start SIP
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
