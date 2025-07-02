import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { styles } from './styles/pdfStyles';
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
}: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader generatedAt={generatedAt} />
      <Text style={styles.watermark} fixed>SIP BREWERY</Text>

      <PDFUserInfo userInfo={statementData.userInfo} />
      <Text break />

      <PDFPortfolioSummary portfolio={statementData.portfolio} />
      <Text break />

      <AIInsightSection portfolio={statementData.portfolio} />
      <Text break />

      <PDFCharts chartsData={statementData.chartsData} />
      <Text break />

      <PDFHoldingsTable holdings={statementData.holdings} />
      <Text break />

      <PDFRecentTransactions transactions={statementData.transactions} />
      <Text break />

      <PDFUpcomingSIPs sips={statementData.sips} />
      <Text break />

      <PDFRewards rewards={statementData.rewards} />
      <Text break />

      <PDFCapitalGains capitalGains={statementData.capitalGains} />
      <Text break />

      <PDFFooter generatedAt={generatedAt} />
    </Page>
  </Document>
);

export const createPDFDocument = (props: any) => {
  return <PDFStatementDocument {...props} />;
};