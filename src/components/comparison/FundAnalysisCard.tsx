
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Star, Target } from "lucide-react";

interface FundAnalysisCardProps {
  fund: any;
  index: number;
  isWinner: boolean;
  canRemove: boolean;
  onRemove: (schemeCode: string) => void;
}

const FundAnalysisCard = ({ fund, index, isWinner, canRemove, onRemove }: FundAnalysisCardProps) => {
  return (
    <Card className={`border-2 ${isWinner ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-center">{fund.schemeName.substring(0, 30)}...</CardTitle>
          <div className="flex items-center gap-2">
            {isWinner && (
              <Badge className="bg-green-600 text-white">
                <Target className="h-3 w-3 mr-1" />
                Winner
              </Badge>
            )}
            {canRemove && (
              <X 
                className="h-4 w-4 cursor-pointer hover:text-red-500" 
                onClick={() => onRemove(fund.schemeCode)}
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center">
            <span className="text-gray-600">NAV:</span>
            <div className="font-bold">₹{fund.nav.toFixed(4)}</div>
          </div>
          <div className="text-center">
            <span className="text-gray-600">Category:</span>
            <div className="font-semibold text-xs">{fund.category}</div>
          </div>
          <div className="text-center">
            <span className="text-gray-600">1M:</span>
            <div className={`font-bold ${fund.returns1M >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns1M >= 0 ? '+' : ''}{fund.returns1M.toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <span className="text-gray-600">3M:</span>
            <div className={`font-bold ${fund.returns3M >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns3M >= 0 ? '+' : ''}{fund.returns3M.toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <span className="text-gray-600">1Y:</span>
            <div className={`font-bold ${fund.returns1Y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns1Y >= 0 ? '+' : ''}{fund.returns1Y.toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <span className="text-gray-600">Expense:</span>
            <div className="font-bold">{fund.expenseRatio.toFixed(2)}%</div>
          </div>
        </div>
        
        {fund.aiScore && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm">{fund.aiScore}/10</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundAnalysisCard;
