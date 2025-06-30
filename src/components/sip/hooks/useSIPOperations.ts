
import { useToast } from '@/hooks/use-toast';
import { useSIPStatusManager } from './useSIPStatusManager';
import { SIPOperationService } from '../services/sipOperationService';
import { statementDataService } from '@/services/statement/statementDataService';
import { generateStatementContent, downloadStatementFile } from '@/components/dashboard/statement/statementFileGenerator';
import { statementTypes } from '@/components/dashboard/statement/statementTypes';
import type { SIPOperationHooks, SIPData } from './types';

export const useSIPOperations = (): SIPOperationHooks => {
  const { toast } = useToast();
  const {
    sipStatuses,
    isProcessing,
    setProcessingState,
    updateSIPStatus
  } = useSIPStatusManager();

  const sipOperationService = new SIPOperationService(toast);

  const handlePauseSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      const result = await sipOperationService.pauseSIP(sipId);
      if (result.success) {
        const currentStatus = sipStatuses[sipId] || 'Active';
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
        updateSIPStatus(sipId, newStatus);
      }
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStopSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      const result = await sipOperationService.stopSIP(sipId);
      if (result.success) {
        updateSIPStatus(sipId, 'Stopped');
      }
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleModifySIP = async (sipId: string, newAmount?: number) => {
    setProcessingState(sipId, true);
    try {
      await sipOperationService.modifySIP(sipId, newAmount);
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStartNewSIP = async (sipData?: SIPData) => {
    await sipOperationService.startNewSIP(sipData);
  };

  const handleDownloadStatement = async (type: string, params?: any) => {
    try {
      console.log('Generating SIP Brewery Statement via BSE STAR MF API:', type, params);
      
      toast({
        title: "Generating Your Statement... 📄",
        description: "Fetching live data from BSE STAR MF API and preparing your beautifully designed statement.",
      });
      
      const mockClientCode = 'SB123456';
      const statementData = await statementDataService.getStatementData(mockClientCode, type);
      
      console.log('BSE STAR MF API Data:', statementData);
      
      const statementTypeNames: Record<string, string> = {
        'sip-details': 'SIP Details Statement',
        'comprehensive': 'Comprehensive Portfolio Statement',
        'tax': 'Tax Statement',
        'portfolio': 'Portfolio Summary',
        'performance': 'Performance Report',
        'portfolio-summary': 'Portfolio Summary Statement',
        'holdings-statement': 'Holdings Statement',
        'transaction-statement': 'Transaction Statement',
        'capital-gains': 'Capital Gains Statement',
        'sip-statement': 'SIP Statement',
        'annual-returns': 'Annual Returns Statement',
        'rewards-statement': 'Rewards Statement',
        'tax-proof-elss': 'Tax Proof Statement',
        'referral-statement': 'Referral Statement',
        'custom-statement': 'Custom Statement',
        'ai-summary-report': 'AI Summary Report'
      };
      
      const statementName = statementTypeNames[type] || 'Investment Statement';
      
      toast({
        title: "Statement Ready for Download! 🎉",
        description: `Your ${statementName} has been generated with live BSE STAR MF data and SIP Brewery branding.`,
      });
      
      setTimeout(() => {
        try {
          const content = generateStatementContent(statementName, statementData);
          downloadStatementFile(statementName, content);
          
          toast({
            title: "Download Complete! 📁",
            description: `${statementName} has been downloaded to your device.`,
          });
          
          console.log(`Downloaded: ${statementName} with BSE STAR MF API data`);
        } catch (downloadError) {
          console.error('Download error:', downloadError);
          toast({
            title: "Download Failed",
            description: `Error downloading ${statementName}. Please try again.`,
            variant: "destructive"
          });
        }
      }, 1000);
      
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Statement Generation Failed",
        description: "Unable to generate statement with BSE STAR MF data. Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  return {
    sipStatuses,
    isProcessing,
    handlePauseSIP,
    handleStopSIP,
    handleModifySIP,
    handleStartNewSIP,
    handleDownloadStatement
  };
};
