
import { useState, useEffect } from 'react';
import AIFundComparison from './AIFundComparison';
import { FundDataService } from '@/services/fundDataService';
import { FundAnalysisService } from '@/services/fundAnalysisService';

const FundComparisonContainer = () => {
  const [availableFunds, setAvailableFunds] = useState<any[]>([]);

  useEffect(() => {
    loadAvailableFunds();
  }, []);

  const loadAvailableFunds = () => {
    try {
      // Get funds from analysis results
      const analysisResults = FundAnalysisService.loadAnalysisResults();
      
      if (analysisResults && analysisResults.length > 0) {
        const allFunds = analysisResults.flatMap(category => category.funds);
        setAvailableFunds(allFunds);
        console.log('Loaded funds for comparison:', allFunds.length);
      } else {
        // Fallback to top funds
        const topFunds = FundDataService.TOP_FUNDS.map(fund => ({
          schemeCode: fund.schemeCode,
          schemeName: fund.name
        }));
        setAvailableFunds(topFunds);
      }
    } catch (error) {
      console.error('Error loading available funds:', error);
    }
  };

  return (
    <AIFundComparison
      fund1={null}
      fund2={null}
      onFund1Change={() => {}} // Not used in new implementation
      onFund2Change={() => {}} // Not used in new implementation
      availableFunds={availableFunds}
    />
  );
};

export default FundComparisonContainer;
