
import { useState } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';
import { StatementFormData } from './types';

export const useStatementGenerator = (onGenerateStatement?: (type: string, params: any) => void) => {
  const [formData, setFormData] = useState<StatementFormData>({
    selectedStatement: '',
    financialYear: '',
    language: 'english',
    downloadFormat: 'pdf'
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const pdfDownloadService = new PDFDownloadService(toast);

  const updateFormData = (field: keyof StatementFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateStatement = async () => {
    if (!formData.selectedStatement) {
      toast({
        title: "Please select a statement type",
        description: "Choose the type of statement you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const params = {
        startDate: formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : undefined,
        endDate: formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : undefined,
        financialYear: formData.financialYear,
        language: formData.language,
        format: formData.downloadFormat
      };

      console.log(`Generating statement: ${formData.selectedStatement} with params:`, params);

      // Call the callback if provided
      if (onGenerateStatement) {
        onGenerateStatement(formData.selectedStatement, params);
      }

      // Generate PDF statement
      await pdfDownloadService.downloadPDFStatement(formData.selectedStatement, params);

    } catch (error) {
      console.error('Statement generation error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your statement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    formData,
    selectedCategory,
    isGenerating,
    updateFormData,
    setSelectedCategory,
    handleGenerateStatement
  };
};
