
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FundCardProps {
  fund: {
    id: string;
    scheme_name: string;
    amc_name: string;
    category: string;
    nav: number;
    returns_1y: number;
    returns_3y: number;
    risk_level: string;
    min_sip_amount: number;
  };
}

const FundCard = ({ fund }: FundCardProps) => {
  const navigate = useNavigate();
  
  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = () => {
    navigate(`/fund/${fund.id}`, {
      state: {
        fundData: fund
      }
    });
  };

  const handleCardClick = () => {
    handleViewDetails();
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:bg-gray-50"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-1 hover:text-blue-600 transition-colors">
              {fund.scheme_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{fund.amc_name}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {fund.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Current NAV</p>
            <p className="text-xl font-bold">₹{fund.nav?.toFixed(2) || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Min SIP</p>
            <p className="text-lg font-semibold">₹{fund.min_sip_amount}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {fund.returns_1y >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm text-muted-foreground ml-1">1Y</span>
            </div>
            <span className={`font-semibold ${fund.returns_1y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns_1y >= 0 ? '+' : ''}{fund.returns_1y?.toFixed(1) || 'N/A'}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {fund.returns_3y >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm text-muted-foreground ml-1">3Y</span>
            </div>
            <span className={`font-semibold ${fund.returns_3y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns_3y >= 0 ? '+' : ''}{fund.returns_3y?.toFixed(1) || 'N/A'}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={getRiskColor(fund.risk_level)}>
            {fund.risk_level || 'Unknown'} Risk
          </Badge>
          <div className="flex items-center gap-1 text-sm text-blue-600 font-medium">
            <BarChart3 className="h-4 w-4" />
            Click to analyze
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              // Handle invest action
              console.log('Invest clicked for fund:', fund.id);
            }}
          >
            Invest Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
