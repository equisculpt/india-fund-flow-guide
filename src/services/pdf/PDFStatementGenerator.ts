
import { pdf } from '@react-pdf/renderer';
import { StatementData } from '../statement/types';
import { createPDFDocument } from './PDFStatementDocument';

export interface GenerateStatementPDFOptions {
  statementType: string;
  statementData: StatementData;
  generatedAt?: Date;
}

export const generateStatementPDF = async (options: GenerateStatementPDFOptions) => {
  const {
    statementType,
    statementData,
    generatedAt = new Date()
  } = options;

  try {
    console.log('Starting PDF generation with options:', { 
      statementType, 
      generatedAt: generatedAt.toISOString(),
      dataValidation: {
        hasUserInfo: !!statementData.userInfo,
        hasPortfolio: !!statementData.portfolio,
        holdingsCount: statementData.holdings?.length || 0,
        portfolioValue: statementData.portfolio?.currentValue || 0,
        userName: statementData.userInfo?.name || 'Unknown',
        clientCode: statementData.userInfo?.clientCode || 'Unknown'
      }
    });
    
    // Validate essential data before PDF generation
    if (!statementData.userInfo) {
      throw new Error('User information is missing from statement data');
    }
    
    if (!statementData.portfolio) {
      throw new Error('Portfolio information is missing from statement data');
    }
    
    if (!statementData.holdings || statementData.holdings.length === 0) {
      console.warn('No holdings found in statement data');
    }
    
    console.log('Creating PDF document with validated data...');
    
    // Create the PDF document using the factory function
    const document = createPDFDocument({
      statementType,
      statementData,
      generatedAt,
    });

    console.log('PDF document created, generating blob...');
    
    // Generate the PDF
    const pdfInstance = pdf(document);
    const pdfBlob = await pdfInstance.toBlob();
    
    console.log('PDF blob generated successfully:', {
      blob: pdfBlob,
      size: pdfBlob?.size || 0,
      type: pdfBlob?.type || 'unknown',
      sizeInKB: pdfBlob ? Math.round(pdfBlob.size / 1024) : 0,
      isValidBlob: pdfBlob instanceof Blob,
      isValidSize: pdfBlob && pdfBlob.size > 1000
    });
    
    // Enhanced blob validation
    if (!pdfBlob) {
      throw new Error('PDF blob generation returned null or undefined');
    }
    
    if (!(pdfBlob instanceof Blob)) {
      throw new Error('PDF generation did not return a valid Blob object');
    }
    
    if (pdfBlob.size === 0) {
      throw new Error('Generated PDF blob is empty (0 bytes)');
    }
    
    if (pdfBlob.size < 100) {
      throw new Error(`Generated PDF blob is too small (${pdfBlob.size} bytes) - likely invalid`);
    }
    
    if (pdfBlob.type !== 'application/pdf') {
      console.warn(`PDF blob has unexpected MIME type: ${pdfBlob.type}`);
    }
    
    return pdfBlob;
  } catch (error) {
    console.error('Detailed PDF generation error:', {
      error: error.message,
      stack: error.stack,
      statementType,
      timestamp: new Date().toISOString(),
      dataStructure: {
        hasUserInfo: !!statementData.userInfo,
        hasPortfolio: !!statementData.portfolio,
        holdingsCount: statementData.holdings?.length || 0,
        hasTransactions: !!statementData.transactions,
        userInfoKeys: statementData.userInfo ? Object.keys(statementData.userInfo) : [],
        portfolioKeys: statementData.portfolio ? Object.keys(statementData.portfolio) : []
      }
    });
    
    // Provide more specific error messages
    if (error.message.includes('Cannot read property')) {
      throw new Error(`PDF generation failed due to missing data: ${error.message}`);
    }
    
    if (error.message.includes('React')) {
      throw new Error(`PDF component rendering failed: ${error.message}`);
    }
    
    throw new Error(`Failed to generate PDF statement: ${error.message}`);
  }
};

// Create a service class for PDF generation
export class PDFStatementGeneratorService {
  async generatePDF(statementType: string, statementData: StatementData): Promise<Blob> {
    console.log('PDFStatementGeneratorService: generatePDF called', { 
      statementType,
      userInfo: statementData.userInfo?.name || 'Unknown',
      timestamp: new Date().toISOString()
    });
    return generateStatementPDF({
      statementType,
      statementData,
      generatedAt: new Date()
    });
  }

  async downloadPDF(statementType: string, statementData: StatementData): Promise<void> {
    try {
      console.log('PDFStatementGeneratorService: Starting download process', { 
        statementType,
        clientCode: statementData.userInfo?.clientCode,
        timestamp: new Date().toISOString()
      });
      
      const pdfBlob = await this.generatePDF(statementType, statementData);
      
      console.log('PDF blob ready for download:', {
        blobSize: pdfBlob.size,
        blobType: pdfBlob.type,
        sizeInKB: Math.round(pdfBlob.size / 1024),
        isValidBlob: pdfBlob instanceof Blob
      });
      
      // Test blob validity by creating URL
      let url: string;
      try {
        url = URL.createObjectURL(pdfBlob);
        console.log('Object URL created successfully:', url.substring(0, 50) + '...');
      } catch (urlError) {
        console.error('Failed to create object URL:', urlError);
        throw new Error(`Failed to create download URL: ${urlError.message}`);
      }
      
      // Create filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const clientCode = statementData.userInfo?.clientCode || 'UNKNOWN';
      const filename = `SIPBrewery-${statementType}-${clientCode}-${timestamp}.pdf`;
      
      console.log('Preparing download with filename:', filename);
      
      // Enhanced download mechanism
      try {
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        // Add to DOM temporarily
        document.body.appendChild(link);
        
        console.log('Triggering download click...');
        
        // Trigger download
        link.click();
        
        // Enhanced cleanup with delay
        setTimeout(() => {
          try {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
            URL.revokeObjectURL(url);
            console.log('Download cleanup completed successfully');
          } catch (cleanupError) {
            console.warn('Download cleanup warning:', cleanupError);
          }
        }, 1000);
        
        console.log('PDF download process completed successfully');
        
      } catch (downloadError) {
        console.error('Download mechanism failed:', downloadError);
        
        // Fallback: Try opening in new window
        try {
          console.log('Attempting fallback: opening PDF in new window...');
          const newWindow = window.open(url, '_blank');
          if (!newWindow) {
            throw new Error('Popup blocked or failed to open');
          }
          console.log('PDF opened in new window as fallback');
        } catch (fallbackError) {
          console.error('Fallback method also failed:', fallbackError);
          URL.revokeObjectURL(url);
          throw new Error(`All download methods failed. Last error: ${fallbackError.message}`);
        }
      }
      
    } catch (error) {
      console.error('Critical error in PDF download process:', {
        error: error.message,
        stack: error.stack,
        statementType,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}

// Export the service instance
export const pdfStatementGenerator = new PDFStatementGeneratorService();
