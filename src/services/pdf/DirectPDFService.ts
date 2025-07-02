import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export class DirectPDFService {
  private toast: any;

  constructor(toast: any) {
    this.toast = toast;
  }

  /**
   * Directly capture and download the beautiful web statement as PDF
   * NO manual steps - fully automatic!
   */
  async generateDirectPDF(
    statementType: string,
    clientCode: string,
    additionalParams: Record<string, string> = {}
  ): Promise<void> {
    try {
      console.log('DirectPDFService: Starting direct PDF capture and download');

      this.toast({
        title: "Capturing Beautiful Statement...",
        description: "Converting your modern design to PDF automatically. Please wait...",
      });

      // Step 1: Create params for statement URL
      const params = new URLSearchParams({
        type: statementType,
        client: clientCode,
        ...additionalParams
      });

      const baseUrl = window.location.origin;
      const statementUrl = `${baseUrl}/statement-preview?${params.toString()}`;

      // Step 2: Open statement in hidden iframe and capture it
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '210mm'; // A4 width
      iframe.style.height = '297mm'; // A4 height
      iframe.style.transform = 'scale(1)';
      iframe.src = statementUrl;
      
      document.body.appendChild(iframe);

      // Step 3: Wait for iframe to load, then capture and convert
      iframe.onload = async () => {
        try {
          // Wait for content to fully render
          await new Promise(resolve => setTimeout(resolve, 3000));

          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDocument) {
            throw new Error('Cannot access iframe content');
          }

          // Get the statement container
          const statementContainer = iframeDocument.querySelector('.statement-container');
          if (!statementContainer) {
            throw new Error('Statement container not found');
          }

          this.toast({
            title: "Creating PDF...",
            description: "Capturing the beautiful design and generating PDF...",
          });

          // Step 4: Capture the statement as canvas
          const canvas = await html2canvas(statementContainer as HTMLElement, {
            useCORS: true,
            allowTaint: true,
            scale: 2, // High quality
            width: 794, // A4 width in pixels at 96 DPI
            height: 1123, // A4 height in pixels at 96 DPI
            backgroundColor: '#ffffff'
          });

          // Step 5: Create PDF from canvas
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

          // If content is taller than one page, split it
          if (imgHeight > pdfHeight) {
            let position = 0;
            let pageHeight = pdfHeight;

            while (position < imgHeight) {
              // Add new page if not the first one
              if (position > 0) {
                pdf.addPage();
              }

              // Calculate the portion of image to use for this page
              const sourceY = (position / imgHeight) * canvas.height;
              const sourceHeight = Math.min((pageHeight / imgHeight) * canvas.height, canvas.height - sourceY);

              // Create a temporary canvas for this page
              const pageCanvas = document.createElement('canvas');
              pageCanvas.width = canvas.width;
              pageCanvas.height = sourceHeight;
              
              const pageCtx = pageCanvas.getContext('2d');
              if (pageCtx) {
                pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
                const pageImgData = pageCanvas.toDataURL('image/png');
                pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, pageHeight);
              }

              position += pageHeight;
            }
          } else {
            // Single page
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          }

          // Step 6: Download the PDF
          const fileName = `SIPBrewery-Beautiful-${statementType}-${clientCode}-${new Date().toISOString().split('T')[0]}.pdf`;
          pdf.save(fileName);

          // Clean up
          document.body.removeChild(iframe);

          this.toast({
            title: "PDF Downloaded! 🎉",
            description: "Your beautiful statement has been automatically downloaded as PDF!",
          });

          console.log('DirectPDFService: Beautiful PDF downloaded successfully');

        } catch (captureError) {
          console.error('DirectPDFService: Capture error:', captureError);
          
          // Clean up
          document.body.removeChild(iframe);
          
          // Fallback: Open preview with download button
          this.toast({
            title: "Opening Beautiful Preview",
            description: "Automatic capture failed. Use the Download PDF button on the preview page.",
          });
          
          window.open(statementUrl, '_blank');
        }
      };

    } catch (error) {
      console.error('DirectPDFService: Error:', error);
      
      this.toast({
        title: "Opening Beautiful Preview",
        description: error instanceof Error ? error.message : "Use the Download PDF button on the preview page.",
        variant: "destructive"
      });

      // Fallback: Open preview
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