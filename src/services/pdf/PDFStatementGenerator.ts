
import { pdf } from '@react-pdf/renderer';
import { StatementData } from '../statement/types';
import { createPDFDocument } from './PDFStatementDocument';

export interface GenerateStatementPDFOptions {
  statementType: string;
  statementData: StatementData;
  generatedAt?: Date;
}

// Set to false in production for cleaner logs
const IS_DEBUG = process.env.NODE_ENV === 'development';

const log = (...args: any[]) => { if (IS_DEBUG) console.log(...args); };
const warn = (...args: any[]) => { if (IS_DEBUG) console.warn(...args); };
const error = (...args: any[]) => { if (IS_DEBUG) console.error(...args); };

// Utility function for downloading blobs
function downloadBlobAsFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const generateStatementPDF = async (options: GenerateStatementPDFOptions): Promise<Blob> => {
  const {
    statementType,
    statementData,
    generatedAt = new Date()
  } = options;

  try {
    log('Starting PDF generation:', { 
      statementType, 
      generatedAt: generatedAt.toISOString(),
      userName: statementData.userInfo?.name || 'Unknown',
      clientCode: statementData.userInfo?.clientCode || 'Unknown'
    });
    
    // Essential data validation
    if (!statementData.userInfo) {
      throw new Error('User information is missing from statement data');
    }
    
    if (!statementData.portfolio) {
      throw new Error('Portfolio information is missing from statement data');
    }
    
    if (!statementData.holdings || statementData.holdings.length === 0) {
      warn('No holdings found in statement data - generating statement anyway');
    }
    
    log('Creating PDF document with validated data...');
    
    // Create and generate the PDF document
    const document = createPDFDocument({
      statementType,
      statementData,
      generatedAt,
    });

    const pdfInstance = pdf(document);
    const pdfBlob = await pdfInstance.toBlob();
    
    // Validate generated blob
    if (!pdfBlob || !(pdfBlob instanceof Blob)) {
      throw new Error('PDF generation returned invalid blob');
    }
    
    if (pdfBlob.size < 100) {
      throw new Error(`Generated PDF is too small (${pdfBlob.size} bytes) - likely corrupted`);
    }
    
    if (pdfBlob.type !== 'application/pdf') {
      warn(`PDF blob has unexpected MIME type: ${pdfBlob.type}`);
    }
    
    log('PDF generated successfully:', {
      size: pdfBlob.size,
      sizeInKB: Math.round(pdfBlob.size / 1024),
      type: pdfBlob.type
    });
    
    return pdfBlob;
  } catch (err: any) {
    error('PDF generation failed:', {
      error: err.message,
      stack: err.stack,
      statementType,
      timestamp: new Date().toISOString(),
      hasUserInfo: !!statementData.userInfo,
      hasPortfolio: !!statementData.portfolio,
      holdingsCount: statementData.holdings?.length || 0
    });
    
    throw new Error(`Failed to generate PDF statement: ${err.message}`);
  }
};

import { DirectPDFService } from './DirectPDFService';

export class PDFStatementGeneratorService {
  private directPDFService: DirectPDFService;

  constructor(toast?: any) {
    this.directPDFService = new DirectPDFService(toast || (() => {}));
  }

  async generatePDF(statementType: string, statementData: StatementData): Promise<void> {
    log('PDFStatementGeneratorService: Using standardized PDF generation', { 
      statementType,
      userInfo: statementData.userInfo?.name || 'Unknown'
    });
    
    // Use standardized PDF generation
    await this.directPDFService.generateDirectPDF(
      statementType, 
      statementData.userInfo?.clientCode || 'SB' + Date.now().toString().slice(-6),
      {
        userName: statementData.userInfo?.name,
        totalInvested: statementData.portfolio?.totalInvested,
        currentValue: statementData.portfolio?.currentValue,
        holdings: statementData.holdings
      }
    );
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      log('PDFStatementGeneratorService: Using standardized PDF download process');
      
      // Use standardized PDF generation and download
      await this.generatePDF(statementType, statementData);
      
      log('PDF download completed successfully');
      
    } catch (err: any) {
      error('Critical error in PDF download process:', {
        error: err.message,
        stack: err.stack,
        statementType,
        timestamp: new Date().toISOString()
      });
      throw err;
    }
  }
}

// Export the service instance
export const pdfStatementGenerator = new PDFStatementGeneratorService();
