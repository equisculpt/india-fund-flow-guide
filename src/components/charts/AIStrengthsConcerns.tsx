
import { TrendingUp, Shield } from 'lucide-react';

interface AIStrengthsConcernsProps {
  strengths: string[];
  concerns: string[];
  hasRealAI: boolean;
  fundData: any;
}

const AIStrengthsConcerns = ({ strengths, concerns, hasRealAI, fundData }: AIStrengthsConcernsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="font-semibold text-green-700 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Key Strengths
        </h4>
        <ul className="text-sm space-y-1 text-green-600">
          {strengths.map((strength, index) => (
            <li key={index}>• {strength}</li>
          ))}
          {hasRealAI && fundData.performanceRank && (
            <li>• Performance rank: #{fundData.performanceRank}</li>
          )}
        </ul>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-amber-700 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Areas of Attention
        </h4>
        <ul className="text-sm space-y-1 text-amber-600">
          {concerns.length > 0 ? concerns.map((concern, index) => (
            <li key={index}>• {concern}</li>
          )) : (
            <li>• No major concerns identified</li>
          )}
          <li>• Monitor market conditions for {fundData.category}</li>
          <li>• Regular portfolio review suggested</li>
        </ul>
      </div>
    </div>
  );
};

export default AIStrengthsConcerns;
