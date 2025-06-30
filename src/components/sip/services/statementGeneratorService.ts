
import { format } from 'date-fns';

export class StatementGeneratorService {
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

  generateAndDownloadStatement(statementName: string, statementData: any): void {
    const content = this.generateDownloadableStatement(statementName, statementData);
    const filename = `SIP_Brewery_${statementName.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.txt`;
    this.downloadFile(content, filename);
  }
}

export const statementGeneratorService = new StatementGeneratorService();
