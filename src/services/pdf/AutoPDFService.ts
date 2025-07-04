export class AutoPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Generate PDF from the beautiful web statement automatically
   */
  async generateStatementPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('AutoPDFService: Converting beautiful web statement to PDF automatically');

      this.toast({
        title: "Generating Beautiful PDF...",
        description: "Converting your modern statement design to PDF automatically.",
      });

      // Step 1: Open the beautiful statement in a hidden iframe
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;
      
      console.log('Opening beautiful statement for PDF conversion:', statementUrl);

      // Step 2: Create hidden iframe to load the statement
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm'; // A4 width
      iframe.style.height = '297mm'; // A4 height
      iframe.src = statementUrl;
      
      document.body.appendChild(iframe);

      // Step 3: Wait for iframe to load then trigger print
      iframe.onload = () => {
        setTimeout(() => {
          // Trigger browser's print-to-PDF from the iframe
          iframe.contentWindow?.print();
          
          // Clean up
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);

          this.toast({
            title: "PDF Ready!",
            description: "Your beautiful statement is ready to save as PDF. Use Ctrl+P → Save as PDF.",
          });

          console.log('AutoPDFService: Print dialog opened for beautiful statement');
        }, 2000); // Wait for content to fully load
      };

    } catch (error) {
      console.error('AutoPDFService: Error:', error);
      
      this.toast({
        title: "Opening Beautiful Statement",
        description: "Opening the modern statement design. Use the Download PDF button on the page.",
        variant: "default"
      });

      // Fallback: Open beautiful preview directly
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
}