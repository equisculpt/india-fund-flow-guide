
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSIPOperations = () => {
  const [sipStatuses, setSipStatuses] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const setProcessingState = (sipId: string, processing: boolean) => {
    setIsProcessing(prev => ({ ...prev, [sipId]: processing }));
  };

  const handlePauseSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Pause SIP', sipId);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentStatus = sipStatuses[sipId] || 'Active';
      const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
      
      setSipStatuses(prev => ({ ...prev, [sipId]: newStatus }));
      
      toast({
        title: `SIP ${newStatus} Successfully! 🎉`,
        description: `Your SIP has been ${newStatus.toLowerCase()} and will reflect in your account shortly.`,
      });
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: "Unable to update SIP status. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStopSIP = async (sipId: string) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Stop SIP', sipId);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSipStatuses(prev => ({ ...prev, [sipId]: 'Stopped' }));
      
      toast({
        title: "SIP Stopped Successfully! ⏹️",
        description: "Your SIP has been permanently stopped. You can start a new SIP anytime.",
      });
    } catch (error) {
      toast({
        title: "Stop SIP Failed",
        description: "Unable to stop SIP. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleModifySIP = async (sipId: string, newAmount?: number) => {
    setProcessingState(sipId, true);
    try {
      console.log('BSE STAR MF API: Modify SIP', sipId, newAmount);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const amount = newAmount || Math.floor(Math.random() * 5000) + 1000;
      
      toast({
        title: "SIP Modified Successfully! ✏️",
        description: `SIP amount has been updated to ₹${amount.toLocaleString()}. Changes will apply from next installment.`,
      });
    } catch (error) {
      toast({
        title: "Modification Failed",
        description: "Unable to modify SIP amount. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStartNewSIP = async () => {
    try {
      console.log('BSE STAR MF API: Start new SIP');
      
      toast({
        title: "Redirecting to Fund Explorer 🚀",
        description: "Choose from 2000+ mutual funds to start your new SIP journey!",
      });
      
      // Simulate navigation delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      toast({
        title: "Navigation Error",
        description: "Unable to navigate to fund explorer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadStatement = async (type: string, params?: any) => {
    try {
      console.log('Generating SIP Brewery Statement:', type, params);
      
      toast({
        title: "Generating Your Statement... 📄",
        description: "Please wait while we prepare your beautifully designed statement.",
      });
      
      // Simulate statement generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const statementTypes: Record<string, string> = {
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
      
      const statementName = statementTypes[type] || 'Investment Statement';
      
      toast({
        title: "Statement Ready for Download! 🎉",
        description: `Your ${statementName} has been generated with SIP Brewery branding and is downloading now.`,
      });
      
      // Simulate file download
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const filename = `SIP_Brewery_${type.replace('-', '_')}_${today}.pdf`;
        
        // Create a mock PDF blob
        const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 100
>>
stream
BT
/F1 24 Tf
72 720 Td
(SIP Brewery ${statementName}) Tj
0 -30 Td
(Brewing Wealth, One SIP at a Time) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000221 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
373
%%EOF`;
        
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`Downloaded: ${filename}`);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Statement Generation Failed",
        description: "Unable to generate statement. Please try again or contact support.",
        variant: "destructive",
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
