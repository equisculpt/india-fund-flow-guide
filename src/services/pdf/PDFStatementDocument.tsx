import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from './styles/pdfStyles';
import { PDFDataSanitizer } from './utils/dataSanitizer';
import { ProfessionalPDFHeader } from './components/ProfessionalPDFHeader';
import { ProfessionalPDFFooter } from './components/ProfessionalPDFFooter';
import { ProfessionalPDFPortfolioSummary } from './components/ProfessionalPDFPortfolioSummary';
import { ProfessionalPDFHoldingsTable } from './components/ProfessionalPDFHoldingsTable';
import { PDFUserInfo } from './components/PDFUserInfo';
import { AIInsightSection } from './components/AIInsightSection';
import { PDFRecentTransactions } from './components/PDFRecentTransactions';
import { PDFUpcomingSIPs } from './components/PDFUpcomingSIPs';
import { PDFRewards } from './components/PDFRewards';
import { PDFCapitalGains } from './components/PDFCapitalGains';
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
      <ProfessionalPDFHeader 
        generatedAt={generatedAt} 
        statementType="Comprehensive Portfolio Statement"
        documentTitle="Portfolio Statement"
      />

      <PDFUserInfo userInfo={cleanData.userInfo} />
      
      <View break />

      <ProfessionalPDFPortfolioSummary portfolio={cleanData.portfolio} />
      
      <View break />

      <AIInsightSection portfolio={cleanData.portfolio} />
      
      <View break />

      <ProfessionalPDFHoldingsTable holdings={cleanData.holdings} />
      
      <View break />

      <PDFRecentTransactions transactions={cleanData.transactions} />
      
      <View break />

      <PDFUpcomingSIPs sips={cleanData.sips} />
      
      <View break />

      <PDFRewards rewards={cleanData.rewards} />
      
      <View break />

      <PDFCapitalGains capitalGains={cleanData.capitalGains} />

      <ProfessionalPDFFooter 
        generatedAt={generatedAt}
        pageNumber={1}
        totalPages={1}
      />
    </Page>
  </Document>
  );
};

export const createPDFDocument = (props: any) => {
  return <PDFStatementDocument {...props} />;
};