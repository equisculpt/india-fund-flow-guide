import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export class DirectPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Simple and reliable direct PDF download
   * Opens statement, captures it, downloads PDF - all automatic!
   */
  async generateDirectPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('DirectPDFService: Starting simple direct PDF capture');

      this.toast({
        title: "Opening Statement for Capture...",
        description: "Opening your beautiful statement to capture it as PDF.",
      });

      // Step 1: Create the statement URL
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        autoCapture: 'true', // Special flag to indicate auto-capture mode
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;

      // Step 2: Open statement in new window for capture
      const newWindow = window.open(statementUrl, '_blank', 'width=1200,height=800');
      
      if (!newWindow) {
        throw new Error('Popup blocked - please allow popups and try again');
      }

      // Step 3: Wait for window to load, then send capture command
      let captureAttempts = 0;
      const maxAttempts = 10;

      const checkAndCapture = () => {
        captureAttempts++;
        
        if (captureAttempts > maxAttempts) {
          this.toast({
            title: "Manual Download Available",
            description: "Auto-capture timed out. Use the Download PDF button on the opened page.",
          });
          return;
        }

        try {
          if (newWindow.document && newWindow.document.readyState === 'complete') {
            // Send message to the opened window to trigger capture
            newWindow.postMessage({ action: 'startCapture' }, '*');
            
            this.toast({
              title: "Capturing Statement...",
              description: "Converting your beautiful statement to PDF automatically.",
            });
          } else {
            setTimeout(checkAndCapture, 1000);
          }
        } catch (error) {
          // Cross-origin issues - fallback to manual
          this.toast({
            title: "Manual Download Available",
            description: "Use the Download PDF button on the opened statement page.",
          });
        }
      };

      // Start checking after a short delay
      setTimeout(checkAndCapture, 2000);

    } catch (error) {
      console.error('DirectPDFService: Error:', error);
      
      this.toast({
        title: "Opening Statement Preview",
        description: error instanceof Error ? error.message : "Use the Download PDF button on the preview page.",
        variant: "destructive"
      });

      // Fallback: Open preview normally
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
      
      window.open(statementUrl, '_blank');
    }
  }

  /**
   * Capture the current page as PDF (called from statement preview page)
   */
  async captureCurrentPageAsPDF(): Promise<void> {
    try {
      console.log('DirectPDFService: Capturing current page as PDF');

      this.toast({
        title: "Capturing Beautiful Statement...",
        description: "Converting your statement to PDF automatically.",
      });

      // Find the statement container
      const statementContainer = document.querySelector('.statement-container');
      if (!statementContainer) {
        throw new Error('Statement container not found');
      }

      // Hide the floating buttons during capture
      const floatingButtons = document.querySelectorAll('.no-print');
      floatingButtons.forEach(btn => {
        (btn as HTMLElement).style.display = 'none';
      });

      // Wait a moment for any dynamic content
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.toast({
        title: "Creating PDF...",
        description: "Generating high-quality PDF from your statement.",
      });

      // Capture the statement as canvas
      const canvas = await html2canvas(statementContainer as HTMLElement, {
        useCORS: true,
        allowTaint: true,
        scale: 1.5, // Good quality without being too large
        backgroundColor: '#ffffff',
        height: statementContainer.scrollHeight,
        width: statementContainer.scrollWidth
      });

      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit the page
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to PDF, splitting across pages if needed
      if (imgHeight > pdfHeight) {
        let position = 0;
        let pageHeight = pdfHeight;

        while (position < imgHeight) {
          if (position > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
          position += pageHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

      // Download the PDF
      const fileName = `SIPBrewery-Beautiful-Statement-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Show floating buttons again
      floatingButtons.forEach(btn => {
        (btn as HTMLElement).style.display = '';
      });

      this.toast({
        title: "PDF Downloaded! 🎉",
        description: "Your beautiful statement has been downloaded as PDF successfully!",
      });

      // Close the window after successful download
      setTimeout(() => {
        window.close();
      }, 2000);

    } catch (error) {
      console.error('DirectPDFService: Capture error:', error);
      
      this.toast({
        title: "Auto-capture failed",
        description: "Please use the Download PDF button manually.",
        variant: "destructive"
      });

      // Show floating buttons again
      const floatingButtons = document.querySelectorAll('.no-print');
      floatingButtons.forEach(btn => {
        (btn as HTMLElement).style.display = '';
      });
    }
  }
}