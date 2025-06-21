
import React from 'react';
import NBFCSectorHeader from './NBFCSectorHeader';
import ComplianceDisclaimer from './ComplianceDisclaimer';
import NBFCIntroduction from './NBFCIntroduction';
import NBFCTypes from './NBFCTypes';
import MarketSize from './MarketSize';
import KeyPlayers from './KeyPlayers';
import RegulatoryLandscape from './RegulatoryLandscape';
import GrowthDrivers from './GrowthDrivers';
import BusinessModels from './BusinessModels';
import FinancialPerformance from './FinancialPerformance';
import InvestmentThesis from './InvestmentThesis';
import RisksAndChallenges from './RisksAndChallenges';
import FutureOutlook from './FutureOutlook';
import InvestmentStrategies from './InvestmentStrategies';
import BlogConclusion from './BlogConclusion';

const NBFCSectorBlogContent = () => {
  return (
    <>
      <NBFCSectorHeader />
      <ComplianceDisclaimer />
      <NBFCIntroduction />
      <NBFCTypes />
      <MarketSize />
      <KeyPlayers />
      <RegulatoryLandscape />
      <GrowthDrivers />
      <BusinessModels />
      <FinancialPerformance />
      <InvestmentThesis />
      <RisksAndChallenges />
      <FutureOutlook />
      <InvestmentStrategies />
      <BlogConclusion />
    </>
  );
};

export default NBFCSectorBlogContent;
