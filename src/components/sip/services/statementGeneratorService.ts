
import { useToast } from '@/hooks/use-toast';
import { statementDataService } from '@/services/statement/statementDataService';
import { format } from 'date-fns';

export class StatementGeneratorService {
  private toast: ReturnType<typeof useToast>['toast'];

  constructor(toast: ReturnType<typeof useToast>['toast']) {
    this.toast = toast;
  }

  private generateDownloadableStatement(statementName: string, statementData: any): string {
    return `SIP BREWERY - ${statementName}
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
  }

  private downloadFile(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async handleDownloadStatement(type: string, params?: any): Promise<void> {
    try {
      console.log('Generating SIP Brewery Statement via BSE STAR MF API:', type, params);
      
      this.toast({
        title: "Generating Your Statement... 📄",
        description: "Fetching live data from BSE STAR MF API and preparing your beautifully designed statement.",
      });
      
      const mockClientCode = 'SB123456';
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
      
      this.toast({
        title: "Statement Ready for Download! 🎉",
        description: `Your ${statementName} has been generated with live BSE STAR MF data and SIP Brewery branding.`,
      });
      
      setTimeout(() => {
        const content = this.generateDownloadableStatement(statementName, statementData);
        const filename = `SIP_Brewery_${statementName.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.txt`;
        
        this.downloadFile(content, filename);
        
        this.toast({
          title: "Download Complete! 📁",
          description: `${statementName} has been downloaded to your device.`,
        });
        
        console.log(`Downloaded: ${statementName} with BSE STAR MF API data`);
      }, 1000);
      
    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      this.toast({
        title: "Statement Generation Failed",
        description: "Unable to generate statement with BSE STAR MF data. Please try again or contact support.",
        variant: "destructive"
      });
    }
  }
}
