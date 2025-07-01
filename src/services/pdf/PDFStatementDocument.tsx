
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
  // Debug log commented out for production
  // console.log('Creating Enhanced PDFStatementDocument with props:', {
  //   statementType,
  //   generatedAt: generatedAt.toISOString(),
  //   hasUserInfo: !!statementData.userInfo,
  //   hasPortfolio: !!statementData.portfolio,
  //   holdingsCount: statementData.holdings?.length || 0,
  //   hasCapitalGains: !!(statementData.capitalGains?.shortTerm?.length || statementData.capitalGains?.longTerm?.length),
  //   hasRewards: !!statementData.rewards,
  //   userSegment: statementData.userInfo?.segment,
  //   goalName: statementData.portfolio?.goalName
  // });

  // Validate required data before rendering
  if (!statementData.userInfo) {
    // console.error('Cannot render PDF: Missing user info');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Missing User Information</Text>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
            Please contact support with error code: USER_INFO_MISSING
          </Text>
        </Page>
      </Document>
    );
  }

  if (!statementData.portfolio) {
    // console.error('Cannot render PDF: Missing portfolio info');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Missing Portfolio Information</Text>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
            Please contact support with error code: PORTFOLIO_INFO_MISSING
          </Text>
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

          {statementData.holdings && statementData.holdings.length > 0 ? (
            <PDFHoldingsTable holdings={statementData.holdings} />
          ) : (
            <View style={{
              marginVertical: 40,
              padding: 25,
              backgroundColor: '#FFF8E7',
              borderRadius: 12,
              borderLeftWidth: 4,
              borderLeftColor: '#FFB800',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#1A1F36',
                marginBottom: 8
              }}>
                🌟 Ready to Start Your Investment Journey?
              </Text>
              <Text style={{
                fontSize: 13,
                color: '#6B7280',
                textAlign: 'center',
                lineHeight: 1.5
              }}>
                You don't have any mutual fund holdings yet. Start investing today to build your wealth!
                Our AI-powered recommendations will help you choose the best funds for your goals.
              </Text>
            </View>
          )}

          {(statementData.capitalGains?.shortTerm?.length || statementData.capitalGains?.longTerm?.length) && (
            <PDFCapitalGainsSection capitalGains={statementData.capitalGains} />
          )}

          {statementData.rewards && (
            <PDFRewardsSection rewards={statementData.rewards} />
          )}

          {/* 
          // Future sections ready for implementation:
          // <PDFRecentTransactions transactions={statementData.recentTransactions} />
          // <PDFUpcomingSIPs upcomingSIPs={statementData.upcomingSIPs} />
          // <PDFGoalTracking goals={statementData.goals} />
          // <PDFTaxSummary taxData={statementData.taxSummary} />
          */}

          <PDFFooter generatedAt={generatedAt} />
        </Page>
      </Document>
    );
  } catch (renderError) {
    // console.error('Enhanced PDF Document render error:', renderError);
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.statementTitle}>Error: Failed to Render PDF</Text>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
            We encountered an issue while generating your statement.
            Please contact support with error code: PDF_RENDER_ERROR
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#9CA3AF' }}>
            Reference: {new Date().toISOString()}
          </Text>
        </Page>
      </Document>
    );
  }
};

// Export function that creates the Document element directly
export const createPDFDocument = (props: PDFStatementDocumentProps) => {
  // Debug log commented out for production
  // console.log('Enhanced createPDFDocument factory called with:', {
  //   statementType: props.statementType,
  //   hasData: !!(props.statementData?.userInfo && props.statementData?.portfolio),
  //   enhancedFeatures: {
  //     goalTracking: !!props.statementData?.portfolio?.goalName,
  //     verifiedUser: !!props.statementData?.userInfo?.isVerified,
  //     rewardsTier: props.statementData?.rewards?.tier,
  //     capitalGains: !!(props.statementData?.capitalGains?.shortTerm?.length || props.statementData?.capitalGains?.longTerm?.length)
  //   }
  // });
  
  return <PDFStatementDocument {...props} />;
};
