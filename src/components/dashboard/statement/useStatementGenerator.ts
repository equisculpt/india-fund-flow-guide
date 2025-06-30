
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
    downloadFormat: 'txt'
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

      console.log(`Generating statement: ${formData.selectedStatement} with params:`, params);
      
      // Fetch statement data using BSE STAR MF API format
      const statementData = await statementDataService.getStatementData(mockClientCode, formData.selectedStatement);
      
      console.log('BSE STAR MF API Response:', statementData);

      // Find selected statement details
      const selectedStatementData = statementTypes.find(s => s.id === formData.selectedStatement);
      const statementName = selectedStatementData?.name || 'Investment Statement';
      
      toast({
        title: "Statement Generated Successfully! 🎉",
        description: `Your ${statementName} is being downloaded with SIP Brewery branding.`,
      });

      // Call the callback if provided
      if (onGenerateStatement) {
        onGenerateStatement(formData.selectedStatement, { ...params, data: statementData });
      }

      // Generate and download the statement immediately
      const content = generateStatementContent(statementName, statementData);
      
      console.log(`Generated content length: ${content.length} characters`);
      
      // Download with a small delay to show the success message
      setTimeout(() => {
        try {
          downloadStatementFile(statementName, content);
          
          toast({
            title: "Download Complete! 📁",
            description: `Your ${statementName} has been downloaded to your device.`,
          });
          
          console.log(`Successfully downloaded: ${statementName}`);
        } catch (downloadError) {
          console.error('Download error:', downloadError);
          toast({
            title: "Download Failed",
            description: `Error downloading ${statementName}. Please try again.`,
            variant: "destructive"
          });
        }
      }, 1500);

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
