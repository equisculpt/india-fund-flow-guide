import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { styles } from './styles/pdfStyles';
import { PDFDataSanitizer } from './utils/dataSanitizer';
import { PDFHeader } from './components/PDFHeader';
import { PDFUserInfo } from './components/PDFUserInfo';
import { PDFPortfolioSummary } from './components/PDFPortfolioSummary';
import { AIInsightSection } from './components/AIInsightSection';
import { PDFHoldingsTable } from './components/PDFHoldingsTable';
import { PDFRecentTransactions } from './components/PDFRecentTransactions';
import { PDFUpcomingSIPs } from './components/PDFUpcomingSIPs';
import { PDFRewards } from './components/PDFRewards';
import { PDFCapitalGains } from './components/PDFCapitalGains';
import { PDFFooter } from './components/PDFFooter';
import { PDFCharts } from './components/PDFCharts';

export const PDFStatementDocument = ({
  statementData,
  generatedAt,
}: any) => {
  // Sanitize all data before rendering
  const cleanData = PDFDataSanitizer.sanitizeStatementData(statementData);
  
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader generatedAt={generatedAt} />
      <Text style={styles.watermark} fixed>SIP BREWERY</Text>

      <PDFUserInfo userInfo={cleanData.userInfo} />
      <Text break />

      <PDFPortfolioSummary portfolio={cleanData.portfolio} />
      <Text break />

      <AIInsightSection portfolio={cleanData.portfolio} />
      <Text break />

      <PDFCharts chartsData={cleanData.chartsData} />
      <Text break />

      <PDFHoldingsTable holdings={cleanData.holdings} />
      <Text break />

      <PDFRecentTransactions transactions={cleanData.transactions} />
      <Text break />

      <PDFUpcomingSIPs sips={cleanData.sips} />
      <Text break />

      <PDFRewards rewards={cleanData.rewards} />
      <Text break />

      <PDFCapitalGains capitalGains={cleanData.capitalGains} />
      <Text break />

      <PDFFooter generatedAt={generatedAt} />
    </Page>
  </Document>
  );
};

export const createPDFDocument = (props: any) => {
  return <PDFStatementDocument {...props} />;
};