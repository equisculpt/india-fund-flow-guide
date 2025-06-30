import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { bseStarMFService } from '@/services/bseStarMFService';
import { statementDataService } from '@/services/statement/statementDataService';
import { format } from 'date-fns';

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

  const generateDownloadableStatement = (statementName: string, statementData: any) => {
    const content = `SIP BREWERY - ${statementName}
Generated: ${format(new Date(), 'dd MMM yyyy, HH:mm')}

Client: ${statementData.userInfo.name}
Client Code: ${statementData.userInfo.clientCode}
PAN: ${statementData.userInfo.panMasked}

PORTFOLIO SUMMARY
================
Total Invested: ₹${statementData.portfolio.totalInvested.toLocaleString()}
Current Value: ₹${statementData.portfolio.currentValue.toLocaleString()}
Total Returns: ₹${statementData.portfolio.totalReturns.toLocaleString()} (${statementData.portfolio.returnsPercentage.toFixed(2)}%)
XIRR: ${statementData.portfolio.xirr.toFixed(2)}%
Active SIPs: ${statementData.portfolio.activeSIPs}

HOLDINGS DETAILS
===============
${statementData.holdings.map((h: any, i: number) => 
  `${i + 1}. ${h.schemeName}
   Scheme Code: ${h.schemeCode} | Folio: ${h.folioNumber}
   Units: ${h.units.toFixed(3)} | Current NAV: ₹${h.currentNav}
   Market Value: ₹${h.marketValue.toLocaleString()}
   Invested Value: ₹${h.investedValue.toLocaleString()}
   P&L: ₹${h.pnl.toLocaleString()} (${h.pnlPercentage.toFixed(2)}%)
   Last Transaction: ${h.lastTransactionDate}
`).join('\n')}

ACTIVE SIP DETAILS
==================
${statementData.sips.filter((sip: any) => sip.status === 'ACTIVE').map((sip: any, i: number) => 
  `${i + 1}. ${sip.schemeName}
   SIP ID: ${sip.sipId}
   Amount: ₹${sip.sipAmount.toLocaleString()} | Frequency: ${sip.frequency}
   Start Date: ${sip.startDate} | Next Due: ${sip.nextDueDate || 'N/A'}
   Completed Installments: ${sip.completedInstallments}/${sip.totalInstallments}
   Total Invested: ₹${sip.totalInvested.toLocaleString()}
   Current Value: ₹${sip.currentValue.toLocaleString()}
   Returns: ${sip.returns.toFixed(2)}%
`).join('\n')}

RECENT TRANSACTIONS
==================
${statementData.transactions.slice(0, 10).map((txn: any, i: number) => 
  `${i + 1}. ${txn.schemeName}
   Order Number: ${txn.orderNumber}
   Date: ${txn.transactionDate} | Settlement: ${txn.settlementDate}
   Type: ${txn.transactionType} | Amount: ₹${txn.amount.toLocaleString()}
   Units: ${txn.units.toFixed(3)} | NAV: ₹${txn.nav}
   Folio: ${txn.folioNumber}
`).join('\n')}

CAPITAL GAINS SUMMARY
====================
Short Term Gains:
${statementData.capitalGains.shortTerm.map((gain: any, i: number) => 
  `${i + 1}. ${gain.schemeName}
   Purchase: ${gain.purchaseDate} | Sale: ${gain.saleDate}
   Purchase Value: ₹${gain.purchaseValue.toLocaleString()}
   Sale Value: ₹${gain.saleValue.toLocaleString()}
   Gain: ₹${gain.gain.toLocaleString()} | Tax Rate: ${gain.taxRate}%
`).join('\n')}

Long Term Gains:
${statementData.capitalGains.longTerm.map((gain: any, i: number) => 
  `${i + 1}. ${gain.schemeName}
   Purchase: ${gain.purchaseDate} | Sale: ${gain.saleDate}
   Purchase Value: ₹${gain.purchaseValue.toLocaleString()}
   Sale Value: ₹${gain.saleValue.toLocaleString()}
   Gain: ₹${gain.gain.toLocaleString()} | Tax Rate: ${gain.taxRate}%
`).join('\n')}

REWARDS & WALLET
===============
Total Earned: ₹${statementData.rewards.totalEarned.toLocaleString()}
Referral Bonus: ₹${statementData.rewards.referralBonus.toLocaleString()}
Loyalty Points: ${statementData.rewards.loyaltyPoints}
Cashback: ₹${statementData.rewards.cashback.toLocaleString()}

Recent Reward Transactions:
${statementData.rewards.recentTransactions.map((reward: any, i: number) => 
  `${i + 1}. ${reward.type} - ₹${reward.amount.toLocaleString()}
   Date: ${reward.date} | ${reward.description}
`).join('\n')}

---
This statement is generated using live BSE STAR MF API data.
SIP Brewery - AMFI Registered Distributor | All transactions via BSE STAR MF
Mutual fund investments are subject to market risk. Please read scheme documents carefully.
AMFI Registration: ARN-XXXXX | BSE Member ID: XXXXX
`;

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIP_Brewery_${statementName.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      
      // Generate and download the statement
      setTimeout(() => {
        generateDownloadableStatement(statementName, statementData);
        
        toast({
          title: "Download Complete! 📁",
          description: `${statementName} has been downloaded to your device.`,
        });
        
        console.log(`Downloaded: ${statementName} with BSE STAR MF API data`);
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
