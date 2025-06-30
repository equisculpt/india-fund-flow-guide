
import { useState } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { statementDataService } from '@/services/statement/statementDataService';
import { StatementFormData } from './types';
import { statementTypes } from './statementTypes';
import { generateStatementContent, downloadStatementFile } from './statementFileGenerator';

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

      const mockClientCode = 'SB123456';
      
      toast({
        title: "Fetching data from BSE STAR MF API...",
        description: "Gathering your investment data for statement generation",
      });

      const statementData = await statementDataService.getStatementData(mockClientCode, formData.selectedStatement);
      
      console.log('BSE STAR MF API Response:', statementData);

      const selectedStatementData = statementTypes.find(s => s.id === formData.selectedStatement);
      
      toast({
        title: "Statement Generated Successfully! 🎉",
        description: `Your ${selectedStatementData?.name} is being downloaded with SIP Brewery branding.`,
      });

      if (onGenerateStatement) {
        onGenerateStatement(formData.selectedStatement, { ...params, data: statementData });
      }

      setTimeout(() => {
        const content = generateStatementContent(selectedStatementData?.name || 'Investment Statement', statementData);
        downloadStatementFile(selectedStatementData?.name || 'Investment Statement', content);
        
        console.log('Statement downloaded with BSE STAR MF data integration');
        
        toast({
          title: "Download Complete! 📁",
          description: "Your statement has been downloaded to your device.",
        });
      }, 1000);

    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error fetching data from BSE STAR MF API. Please try again.",
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
