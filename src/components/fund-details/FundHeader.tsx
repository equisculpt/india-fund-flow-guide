
import { Star, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import FundMetrics from './FundMetrics';

interface FundHeaderProps {
  fundData: any;
  latestNAV: any;
  navError: string;
  aiAnalysis: any;
  aiLoading: boolean;
  aiError: string;
}

const FundHeader = ({ 
  fundData, 
  latestNAV, 
  navError, 
  aiAnalysis, 
  aiLoading, 
  aiError 
}: FundHeaderProps) => {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'STRONG BUY': return 'bg-green-600 text-white';
      case 'BUY': return 'bg-green-500 text-white';
      case 'HOLD': return 'bg-yellow-500 text-white';
      case 'SELL': return 'bg-red-500 text-white';
      case 'STRONG SELL': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            {fundData.schemeName}
          </h2>
          <p className="text-gray-600">
            {fundData.fundHouse} • {fundData.category}
          </p>
          
          {/* Enhanced Fund Metrics */}
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Expense Ratio:</span>
              <span className="font-semibold ml-1">{fundData.expenseRatio}%</span>
            </div>
            <div>
              <span className="text-gray-600">AUM:</span>
              <span className="font-semibold ml-1">₹{fundData.aum} Cr</span>
            </div>
            <div>
              <span className="text-gray-600">Volatility:</span>
              <span className="font-semibold ml-1">{fundData.volatility}%</span>
            </div>
            <div>
              <span className="text-gray-600">Min SIP:</span>
              <span className="font-semibold ml-1">₹{fundData.minSipAmount}</span>
            </div>
          </div>
          
          {navError && (
            <p className="text-sm text-green-600 mt-1">
              {navError}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            {aiLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                <span className="text-sm text-gray-600">AI analyzing with real performance data...</span>
              </div>
            ) : aiAnalysis ? (
              <>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{aiAnalysis.aiScore}/10</span>
                  <span className="text-sm text-gray-600">AI Score</span>
                </div>
                <Badge className={getRecommendationColor(aiAnalysis.recommendation)}>
                  {aiAnalysis.recommendation}
                </Badge>
                <Badge variant="outline">
                  {aiAnalysis.confidence}% Confidence
                </Badge>
              </>
            ) : (
              <div className="text-sm text-gray-500">AI analysis unavailable</div>
            )}
          </div>
          
          {aiError && (
            <p className="text-sm text-orange-600 mt-1">
              ⚠️ {aiError}
            </p>
          )}
        </div>
        
        <FundMetrics 
          fundData={fundData}
          latestNAV={latestNAV}
          navError={navError}
        />
      </div>
    </div>
  );
};

export default FundHeader;
