// DirectPDFService - Browser print-to-PDF for text-selectable documents

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
   * Capture the current page as PDF using browser's print-to-PDF (preserves text selection)
   */
  async captureCurrentPageAsPDF(): Promise<void> {
    try {
      console.log('DirectPDFService: Using browser print-to-PDF for text-selectable PDF');

      this.toast({
        title: "Opening Print Dialog...",
        description: "Use browser's Save as PDF for text-selectable PDF.",
      });

      // Hide the floating buttons during print
      const floatingButtons = document.querySelectorAll('.no-print');
      floatingButtons.forEach(btn => {
        (btn as HTMLElement).style.display = 'none';
      });

      // Wait a moment for UI updates
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use browser's native print which creates text-selectable PDFs
      window.print();

      // Show floating buttons again after print dialog closes
      setTimeout(() => {
        floatingButtons.forEach(btn => {
          (btn as HTMLElement).style.display = '';
        });
      }, 1000);

      this.toast({
        title: "PDF Print Dialog Opened! 📄",
        description: "Choose 'Save as PDF' in destination to get text-selectable PDF.",
      });

    } catch (error) {
      console.error('DirectPDFService: Print error:', error);
      
      this.toast({
        title: "Print dialog failed",
        description: "Please use Ctrl+P to print manually.",
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