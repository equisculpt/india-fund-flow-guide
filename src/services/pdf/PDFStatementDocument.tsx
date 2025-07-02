
import React from 'react';
import { StatementData } from '../statement/types';
import { ModernPDFDocument } from './components/modern/ModernPDFDocument';

interface PDFStatementDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

export const PDFStatementDocument: React.FC<PDFStatementDocumentProps> = (props) => {
  return <ModernPDFDocument {...props} />;
};

export const createPDFDocument = (props: PDFStatementDocumentProps) => {
  return <PDFStatementDocument {...props} />;
};
