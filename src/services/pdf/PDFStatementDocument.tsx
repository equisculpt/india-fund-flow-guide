
import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { StatementData } from '../statement/types';
import { styles } from './styles/pdfStyles';
import { getStatementTitle } from './utils/statementTitles';
import { PDFHeader } from './components/PDFHeader';
import { PDFUserInfo } from './components/PDFUserInfo';
import { PDFPortfolioSummary } from './components/PDFPortfolioSummary';
import { AIInsightSection } from './components/AIInsightSection';
import { PDFHoldingsTable } from './components/PDFHoldingsTable';
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
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader generatedAt={generatedAt} />

      <Text style={styles.statementTitle}>
        {getStatementTitle(statementType)}
      </Text>

      <PDFUserInfo userInfo={statementData.userInfo} />

      <PDFPortfolioSummary portfolio={statementData.portfolio} />

      <AIInsightSection portfolio={statementData.portfolio} />

      <PDFHoldingsTable holdings={statementData.holdings} />

      <PDFFooter generatedAt={generatedAt} />
    </Page>
  </Document>
);

// Export function that creates the Document element directly
export const createPDFDocument = (props: PDFStatementDocumentProps) => {
  return <PDFStatementDocument {...props} />;
};
