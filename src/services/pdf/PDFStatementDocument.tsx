
import React from 'react';
import { StatementData } from '../statement/types';
import { ComprehensivePDFDocument } from './components/modern/ComprehensivePDFDocument';

interface PDFStatementDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

export const PDFStatementDocument: React.FC<PDFStatementDocumentProps> = (props) => {
  return <ComprehensivePDFDocument {...props} />;
};

export const createPDFDocument = (props: PDFStatementDocumentProps) => {
  return <PDFStatementDocument {...props} />;
};
