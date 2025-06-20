
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from '@/components/TranslatedText';

interface AIAnalysisCardProps {
  aiAnalysis: any;
  fundData: any;
}

const AIAnalysisCard = ({ aiAnalysis, fundData }: AIAnalysisCardProps) => {
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

  if (!aiAnalysis) return null;

  const complianceAnalysis = getComplianceAnalysis(aiAnalysis.recommendation);

  return (
    <Card className="mt-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          🤖 <TranslatedText text="AI Research Analysis (For Information Only)" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${getAnalysisColor(complianceAnalysis)}`}>
              <TranslatedText text={complianceAnalysis} />
            </div>
            <p className="text-sm text-gray-600 mt-1">{aiAnalysis.confidence}% <TranslatedText text="AI Confidence" /></p>
          </div>
          <div className="md:col-span-2">
            <TranslatedText text={aiAnalysis.reasoning} className="text-gray-700" />
            <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
              <div>
                <TranslatedText text="Performance Rank:" className="text-gray-600" />
                <span className="font-semibold ml-1">#{aiAnalysis.performanceRank}</span>
              </div>
              <div>
                <TranslatedText text="Risk Level:" className="text-gray-600" />
                <span className="font-semibold ml-1"><TranslatedText text={aiAnalysis.riskLevel} /></span>
              </div>
              <div>
                <TranslatedText text="Min SIP:" className="text-gray-600" />
                <span className="font-semibold ml-1">₹{fundData.minSipAmount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <p className="text-xs text-yellow-800">
            <strong><TranslatedText text="AI Research Disclaimer:" /></strong> <TranslatedText text="This AI-generated research and analysis is for informational purposes only and should not be considered as investment advice. We are AMFI registered mutual fund distributors and may earn commission if you invest through our platform. Please consult with qualified financial advisors and read all scheme documents before making investment decisions." />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisCard;
