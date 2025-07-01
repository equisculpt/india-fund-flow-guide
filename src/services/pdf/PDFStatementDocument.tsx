
import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { StatementData } from '../statement/types';
import { styles } from './styles/pdfStyles';
import { getStatementTitle } from './utils/statementTitles';
import { PDFHeader } from './components/PDFHeader';
import { PDFUserInfo } from './components/PDFUserInfo';
import { PDFPortfolioSummary } from './components/PDFPortfolioSummary';
import { AIInsightSection } from './components/AIInsightSection';
import { PDFHoldingsTable } from './components/PDFHoldingsTable';
import { PDFCapitalGainsSection } from './components/PDFCapitalGainsSection';
import { PDFRewardsSection } from './components/PDFRewardsSection';
import { PDFFooter } from './components/PDFFooter';

interface PDFStatementDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

export const PDFStatementDocument: React.FC<PDFStatementDocumentProps> = ({
  statementType,
  statementData,
  generatedAt,
}) => {
  console.log('Creating Enhanced PDFStatementDocument with props:', {
    statementType,
    generatedAt: generatedAt.toISOString(),
    hasUserInfo: !!statementData.userInfo,
    hasPortfolio: !!statementData.portfolio,
    holdingsCount: statementData.holdings?.length || 0,
    hasCapitalGains: !!(statementData.capitalGains?.shortTerm?.length || statementData.capitalGains?.longTerm?.length),
    hasRewards: !!statementData.rewards,
    userSegment: statementData.userInfo?.segment,
    goalName: statementData.portfolio?.goalName
  });

  // Validate required data before rendering
  if (!statementData.userInfo) {
    console.error('Cannot render PDF: Missing user info');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Missing User Information</Text>
        </Page>
      </Document>
    );
  }

  if (!statementData.portfolio) {
    console.error('Cannot render PDF: Missing portfolio info');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Missing Portfolio Information</Text>
        </Page>
      </Document>
    );
  }

  try {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <PDFHeader generatedAt={generatedAt} />

          <Text style={styles.statementTitle}>
            {getStatementTitle(statementType)}
          </Text>

          <PDFUserInfo userInfo={statementData.userInfo} />

          <PDFPortfolioSummary portfolio={statementData.portfolio} />

          <AIInsightSection portfolio={statementData.portfolio} />

          {statementData.holdings && statementData.holdings.length > 0 && (
            <PDFHoldingsTable holdings={statementData.holdings} />
          )}

          {(statementData.capitalGains?.shortTerm?.length || statementData.capitalGains?.longTerm?.length) && (
            <PDFCapitalGainsSection capitalGains={statementData.capitalGains} />
          )}

          {statementData.rewards && (
            <PDFRewardsSection rewards={statementData.rewards} />
          )}

          <PDFFooter generatedAt={generatedAt} />
        </Page>
      </Document>
    );
  } catch (renderError) {
    console.error('Enhanced PDF Document render error:', renderError);
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Failed to Render PDF</Text>
          <Text>Please contact support with error code: PDF_RENDER_ERROR</Text>
        </Page>
      </Document>
    );
  }
};

// Export function that creates the Document element directly
export const createPDFDocument = (props: PDFStatementDocumentProps) => {
  console.log('Enhanced createPDFDocument factory called with:', {
    statementType: props.statementType,
    hasData: !!(props.statementData?.userInfo && props.statementData?.portfolio),
    enhancedFeatures: {
      goalTracking: !!props.statementData?.portfolio?.goalName,
      verifiedUser: !!props.statementData?.userInfo?.isVerified,
      rewardsTier: props.statementData?.rewards?.tier,
      capitalGains: !!(props.statementData?.capitalGains?.shortTerm?.length || props.statementData?.capitalGains?.longTerm?.length)
    }
  });
  
  return <PDFStatementDocument {...props} />;
};
