
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Fund } from './FundData';

interface FundGridProps {
  funds: Fund[];
}

const FundGrid = ({ funds }: FundGridProps) => {
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

  const handleViewFundDetails = (fund: Fund) => {
    console.log('Navigating to fund details for:', fund.name, 'with correct ID:', fund.id);
    navigate(`/fund/${fund.id}`, {
      state: {
        fundData: {
          id: fund.id,
          scheme_name: fund.name,
          amc_name: fund.fundHouse,
          category: fund.category,
          nav: fund.nav,
          returns_1y: fund.returns1Y,
          returns_3y: fund.returns3Y,
          risk_level: fund.risk,
          min_sip_amount: fund.minSip,
          schemeCode: fund.id
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {funds.map(fund => (
        <Card key={fund.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewFundDetails(fund)}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold line-clamp-2 leading-tight">{fund.name}</CardTitle>
            <CardDescription className="text-xs text-gray-600">{fund.fundHouse}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-xs font-medium">{fund.rating}</span>
              </div>
              <Badge variant="outline" className="text-xs px-1 py-0">
                {fund.category}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">NAV:</span>
                <div className="font-semibold">₹{fund.nav.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-gray-600">Min SIP:</span>
                <div className="font-semibold">₹{fund.minSip}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">1Y Returns:</span>
                <div className={`font-semibold ${fund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns1Y >= 0 ? '+' : ''}{fund.returns1Y}%
                </div>
              </div>
              <div>
                <span className="text-gray-600">3Y Returns:</span>
                <div className={`font-semibold ${fund.returns3Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns3Y >= 0 ? '+' : ''}{fund.returns3Y}%
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge className={getRiskColor(fund.risk)} variant="outline">
                {fund.risk} Risk
              </Badge>
            </div>

            <Button size="sm" className="w-full text-xs h-6" onClick={(e) => {
              e.stopPropagation();
              handleViewFundDetails(fund);
            }}>
              <BarChart3 className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
      {funds.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No funds found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default FundGrid;
