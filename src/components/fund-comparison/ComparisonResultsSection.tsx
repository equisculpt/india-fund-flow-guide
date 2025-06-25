
import StabilityIndicator from '@/components/comparison/StabilityIndicator';
import WinnerAnnouncement from '@/components/comparison/WinnerAnnouncement';
import KeyInsights from '@/components/comparison/KeyInsights';
import InvestmentHorizonRecommendations from '@/components/comparison/InvestmentHorizonRecommendations';
import DetailedFundAnalysis from '@/components/comparison/DetailedFundAnalysis';
import MarketRecommendationCard from '@/components/comparison/MarketRecommendationCard';
import AMFIDisclaimer from '@/components/fund-comparison/AMFIDisclaimer';

interface ComparisonResultsSectionProps {
  comparisonResult: any;
  advice: any;
}

const ComparisonResultsSection = ({ comparisonResult, advice }: ComparisonResultsSectionProps) => {
  return (
    <div className="space-y-8">
      <StabilityIndicator isStableResult={comparisonResult.isStableResult} />
      <WinnerAnnouncement 
        bestFund={comparisonResult.bestFund}
        bestScore={comparisonResult.bestScore}
        reasoning={comparisonResult.reasoning}
      />
      <KeyInsights insights={comparisonResult.keyInsights} />
      <InvestmentHorizonRecommendations advice={advice} />
      <DetailedFundAnalysis 
        analysis={comparisonResult.analysis}
        bestFund={comparisonResult.bestFund}
      />
      <MarketRecommendationCard 
        marketRecommendation={comparisonResult.marketRecommendation}
        marketTiming={comparisonResult.marketTiming}
      />
      <AMFIDisclaimer />
    </div>
  );
};

export default ComparisonResultsSection;
