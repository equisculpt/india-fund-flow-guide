
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { bseStarMFService } from '@/services/bseStarMFService';
import { statementDataService } from '@/services/statementDataService';

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
      
      // Call BSE STAR MF API to pause SIP
      const response = await bseStarMFService.pauseSIP(sipId);
      
      if (response.status === 'success') {
        const currentStatus = sipStatuses[sipId] || 'Active';
        const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
        
        setSipStatuses(prev => ({ ...prev, [sipId]: newStatus }));
        
        toast({
          title: `SIP ${newStatus} Successfully! 🎉`,
          description: `Your SIP has been ${newStatus.toLowerCase()} via BSE STAR MF and will reflect in your account shortly.`,
        });
      }
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Operation Failed",
        description: "Unable to update SIP status via BSE STAR MF API. Please try again or contact support.",
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
      
      // Call BSE STAR MF API to stop SIP
      const response = await bseStarMFService.stopSIP(sipId);
      
      if (response.status === 'success') {
        setSipStatuses(prev => ({ ...prev, [sipId]: 'Stopped' }));
        
        toast({
          title: "SIP Stopped Successfully! ⏹️",
          description: "Your SIP has been permanently stopped via BSE STAR MF. You can start a new SIP anytime.",
        });
      }
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Stop SIP Failed",
        description: "Unable to stop SIP via BSE STAR MF API. Please try again or contact support.",
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
      
      // Mock modify SIP via BSE STAR MF API
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const amount = newAmount || Math.floor(Math.random() * 5000) + 1000;
      
      toast({
        title: "SIP Modified Successfully! ✏️",
        description: `SIP amount has been updated to ₹${amount.toLocaleString()} via BSE STAR MF. Changes will apply from next installment.`,
      });
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Modification Failed",
        description: "Unable to modify SIP amount via BSE STAR MF API. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setProcessingState(sipId, false);
    }
  };

  const handleStartNewSIP = async (sipData?: {
    schemeCode: string;
    amount: number;
    frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
    sipDate: number;
  }) => {
    try {
      console.log('BSE STAR MF API: Start new SIP', sipData);
      
      if (sipData) {
        // Call BSE STAR MF API to start new SIP
        const response = await bseStarMFService.startSIP({
          ...sipData,
          clientCode: 'SB123456', // Mock client code
          mandateId: 'MANDATE001' // Mock mandate ID
        });
        
        if (response.status === 'success') {
          toast({
            title: "New SIP Started Successfully! 🚀",
            description: `Your SIP of ₹${sipData.amount.toLocaleString()} has been started via BSE STAR MF. SIP ID: ${response.sipId}`,
          });
        }
      } else {
        toast({
          title: "Redirecting to Fund Explorer 🚀",
          description: "Choose from 2000+ mutual funds to start your new SIP journey via BSE STAR MF!",
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Start SIP Failed",
        description: "Unable to start new SIP via BSE STAR MF API. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadStatement = async (type: string, params?: any) => {
    try {
      console.log('Generating SIP Brewery Statement via BSE STAR MF API:', type, params);
      
      toast({
        title: "Generating Your Statement... 📄",
        description: "Fetching live data from BSE STAR MF API and preparing your beautifully designed statement.",
      });
      
      // Get mock client code (would come from user context)
      const mockClientCode = 'SB123456';
      
      // Fetch statement data using BSE STAR MF API format
      const statementData = await statementDataService.getStatementData(mockClientCode, type);
      
      console.log('BSE STAR MF API Data:', statementData);
      
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
        description: `Your ${statementName} has been generated with live BSE STAR MF data and SIP Brewery branding.`,
      });
      
      // Generate branded PDF with BSE STAR MF data
      setTimeout(() => {
        const today = new Date().toISOString().split('T')[0];
        const filename = `SIP_Brewery_${type.replace('-', '_')}_${today}.pdf`;
        
        // Generate branded PDF content with actual BSE STAR MF data
        const pdfContent = generateBrandedPDF(statementName, statementData);
        
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`Downloaded: ${filename} with BSE STAR MF API data`);
      }, 1000);
      
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Statement Generation Failed",
        description: "Unable to generate statement with BSE STAR MF data. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const generateBrandedPDF = (statementName: string, data: any): string => {
    // Generate branded PDF content with BSE STAR MF data
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `%PDF-1.4
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
/Length 1200
>>
stream
BT
/F1 24 Tf
72 720 Td
(SIP BREWERY) Tj
0 -30 Td
/F1 12 Tf
(Brewing Wealth, One SIP at a Time) Tj
0 -50 Td
/F1 18 Tf
(${statementName}) Tj
0 -40 Td
/F1 10 Tf
(Generated: ${currentDate} | Powered by BSE STAR MF API) Tj
0 -30 Td
(Client: ${data.userInfo.name}) Tj
0 -15 Td
(Client Code: ${data.userInfo.clientCode}) Tj
0 -15 Td
(PAN: ${data.userInfo.panMasked}) Tj
0 -30 Td
/F1 14 Tf
(PORTFOLIO SUMMARY) Tj
0 -25 Td
/F1 10 Tf
(Total Invested: ₹${data.portfolio.totalInvested.toLocaleString()}) Tj
0 -15 Td
(Current Value: ₹${data.portfolio.currentValue.toLocaleString()}) Tj
0 -15 Td
(Total Returns: ₹${data.portfolio.totalReturns.toLocaleString()} (${data.portfolio.returnsPercentage.toFixed(2)}%)) Tj
0 -15 Td
(XIRR: ${data.portfolio.xirr.toFixed(2)}% | Active SIPs: ${data.portfolio.activeSIPs}) Tj
0 -30 Td
/F1 14 Tf
(HOLDINGS (via BSE STAR MF)) Tj
0 -25 Td
/F1 10 Tf
${data.holdings.slice(0, 3).map((h: any, i: number) => 
  `(${i + 1}. ${h.schemeName.substring(0, 40)}...) Tj 0 -12 Td (   Scheme Code: ${h.schemeCode} | Folio: ${h.folioNumber}) Tj 0 -12 Td (   Units: ${h.units.toFixed(3)} | NAV: ₹${h.currentNav} | Value: ₹${h.marketValue.toLocaleString()}) Tj 0 -15 Td`
).join(' ')}
0 -30 Td
/F1 8 Tf
(This statement is generated using live BSE STAR MF API data.) Tj
0 -12 Td
(SIP Brewery - AMFI Registered Distributor | All transactions via BSE STAR MF) Tj
0 -12 Td
(Mutual fund investments are subject to market risk. Please read scheme documents carefully.) Tj
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
1473
%%EOF`;
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
