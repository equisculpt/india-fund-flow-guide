import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ReportService } from '@/services/reports/ReportService';

interface ReportButtonsProps {
  reportName: string;
  category: 'tax' | 'sip' | 'portfolio' | 'transaction' | 'performance';
  variant?: 'default' | 'outline' | 'compact';
  className?: string;
}

export const ReportButtons: React.FC<ReportButtonsProps> = ({
  reportName,
  category,
  variant = 'default',
  className = ''
}) => {
  const { toast } = useToast();
  const reportService = new ReportService(toast);

  const handleHTMLReport = async () => {
    try {
      switch (category) {
        case 'tax':
          await reportService.generateTaxReport(reportName, 'html');
          break;
        case 'sip':
          await reportService.generateSIPReport(reportName, 'html');
          break;
        case 'portfolio':
          await reportService.generatePortfolioReport(reportName, 'html');
          break;
        case 'transaction':
          await reportService.generateTransactionReport(reportName, 'html');
          break;
        case 'performance':
          await reportService.generatePerformanceReport(reportName, 'html');
          break;
      }
    } catch (error) {
      toast({
        title: "HTML Report Failed",
        description: "Unable to generate HTML report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePDFReport = async () => {
    try {
      switch (category) {
        case 'tax':
          await reportService.generateTaxReport(reportName, 'pdf');
          break;
        case 'sip':
          await reportService.generateSIPReport(reportName, 'pdf');
          break;
        case 'portfolio':
          await reportService.generatePortfolioReport(reportName, 'pdf');
          break;
        case 'transaction':
          await reportService.generateTransactionReport(reportName, 'pdf');
          break;
        case 'performance':
          await reportService.generatePerformanceReport(reportName, 'pdf');
          break;
      }
    } catch (error) {
      toast({
        title: "PDF Report Failed",
        description: "Unable to generate PDF report. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button variant="outline" size="sm" onClick={handleHTMLReport}>
          <Eye className="h-4 w-4 mr-2" />
          HTML
        </Button>
        <Button variant="outline" size="sm" onClick={handlePDFReport}>
          <Download className="h-4 w-4 mr-2" />
          PDF
        </Button>
      </div>
    );
  }

  if (variant === 'outline') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button variant="outline" onClick={handleHTMLReport}>
          <FileText className="h-4 w-4 mr-2" />
          HTML Report
        </Button>
        <Button variant="outline" onClick={handlePDFReport}>
          <Download className="h-4 w-4 mr-2" />
          PDF Report
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button variant="secondary" onClick={handleHTMLReport}>
        <FileText className="h-4 w-4 mr-2" />
        HTML Report
      </Button>
      <Button onClick={handlePDFReport}>
        <Download className="h-4 w-4 mr-2" />
        PDF Report
      </Button>
    </div>
  );
};