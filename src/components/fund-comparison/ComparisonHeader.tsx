
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ComparisonHeaderProps {
  onNewComparison: () => void;
  onBackToHome: () => void;
  showNewComparison?: boolean;
}

const ComparisonHeader = ({ onNewComparison, onBackToHome, showNewComparison = false }: ComparisonHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={showNewComparison ? onNewComparison : onBackToHome}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        {showNewComparison ? 'New Comparison' : 'Back to Home'}
      </Button>
      <h1 className="text-2xl font-bold">🤖 AI Fund Research & Comparison</h1>
      {showNewComparison ? (
        <Button variant="ghost" onClick={onBackToHome}>
          Home
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ComparisonHeader;
