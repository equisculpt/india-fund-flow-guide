
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

export class PDFStatementGeneratorService {
  async generatePDF(statementType: string, statementData: StatementData): Promise<Blob> {
    log('PDFStatementGeneratorService: generatePDF called', { 
      statementType,
      userInfo: statementData.userInfo?.name || 'Unknown'
    });
    return generateStatementPDF({
      statementType,
      statementData,
      generatedAt: new Date()
    });
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      log('Starting PDF download process:', { 
        statementType,
        clientCode: statementData.userInfo?.clientCode
      });
      
      const pdfBlob = await this.generatePDF(statementType, statementData);
      
      // Create filename with timestamp and client code
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const clientCode = statementData.userInfo?.clientCode || 'UNKNOWN';
      const filename = `SIPBrewery-${statementType}-${clientCode}-${timestamp}.pdf`;
      
      log('Initiating download:', { filename, blobSize: pdfBlob.size });
      
      try {
        downloadBlobAsFile(pdfBlob, filename);
        log('PDF download completed successfully');
      } catch (downloadError: any) {
        error('Primary download failed, attempting fallback:', downloadError);
        
        // Fallback: Open PDF in new window/tab
        const url = URL.createObjectURL(pdfBlob);
        const newWindow = window.open(url, '_blank');
        
        if (!newWindow) {
          throw new Error('Download failed and popup was blocked. Please allow popups and try again.');
        }
        
        // Clean up URL after a delay to allow window to load
        setTimeout(() => URL.revokeObjectURL(url), 3000);
        log('PDF opened in new window as fallback');
      }
      
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
