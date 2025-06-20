
import { Star, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import FundMetrics from './FundMetrics';
import TranslatedText from '@/components/TranslatedText';

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
  const getAnalysisColor = (analysis: string) => {
    switch (analysis) {
      case 'SUITABLE': return 'bg-green-600 text-white';
      case 'CONSIDER': return 'bg-green-500 text-white';  
      case 'REVIEW': return 'bg-yellow-500 text-white';
      case 'CAUTION': return 'bg-red-500 text-white';
      case 'AVOID': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getComplianceAnalysis = (originalAnalysis: string) => {
    switch (originalAnalysis) {
      case 'STRONG BUY': return 'SUITABLE';
      case 'BUY': return 'CONSIDER';
      case 'HOLD': return 'REVIEW';
      case 'SELL': return 'CAUTION';
      case 'STRONG SELL': return 'AVOID';
      default: return 'REVIEW';
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
              <TranslatedText text="Expense Ratio:" className="text-gray-600" />
              <span className="font-semibold ml-1">{fundData.expenseRatio}%</span>
            </div>
            <div>
              <TranslatedText text="AUM:" className="text-gray-600" />
              <span className="font-semibold ml-1">₹{fundData.aum} Cr</span>
            </div>
            <div>
              <TranslatedText text="Volatility:" className="text-gray-600" />
              <span className="font-semibold ml-1">{fundData.volatility}%</span>
            </div>
            <div>
              <TranslatedText text="Min SIP:" className="text-gray-600" />
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
                <TranslatedText text="AI analyzing with real performance data..." className="text-sm text-gray-600" />
              </div>
            ) : aiAnalysis ? (
              <>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{aiAnalysis.aiScore}/10</span>
                  <TranslatedText text="AI Score" className="text-sm text-gray-600" />
                </div>
                <Badge className={getAnalysisColor(getComplianceAnalysis(aiAnalysis.recommendation))}>
                  {getComplianceAnalysis(aiAnalysis.recommendation)}
                </Badge>
                <Badge variant="outline">
                  {aiAnalysis.confidence}% <TranslatedText text="Confidence" />
                </Badge>
              </>
            ) : (
              <TranslatedText text="AI analysis unavailable" className="text-sm text-gray-500" />
            )}
          </div>
          
          {aiError && (
            <p className="text-sm text-orange-600 mt-1">
              ⚠️ {aiError}
            </p>
          )}

          {/* AI Research Disclaimer */}
          {aiAnalysis && (
            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
              <strong><TranslatedText text="AI Research Disclaimer:" /></strong> <TranslatedText text="AI research analysis is for informational purposes only. We are AMFI registered distributors and may earn commission on investments. Please read all scheme documents carefully." />
            </div>
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
