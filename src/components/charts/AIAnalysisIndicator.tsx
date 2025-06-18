
import { Badge } from '@/components/ui/badge';
import { Zap, AlertCircle } from 'lucide-react';

interface AIAnalysisIndicatorProps {
  hasRealAI: boolean;
  confidence?: number;
}

const AIAnalysisIndicator = ({ hasRealAI, confidence }: AIAnalysisIndicatorProps) => {
  return (
    <div className={`p-3 rounded-lg ${hasRealAI ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
      <div className="flex items-center gap-2 text-sm">
        {hasRealAI ? (
          <>
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-green-800 font-medium">Real AI Analysis Completed</span>
            {confidence && <Badge variant="outline" className="text-xs">{confidence}% Confidence</Badge>}
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-yellow-800 font-medium">Using Mathematical Analysis</span>
            <span className="text-yellow-700 text-xs">(AI analysis unavailable)</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAnalysisIndicator;
