
import { format } from 'date-fns';

export const generateStatementContent = (statementName: string, data: any): string => {
  return `SIP BREWERY - ${statementName}
Generated: ${format(new Date(), 'dd MMM yyyy, HH:mm')}
Download ID: ${Math.random().toString(36).substring(7).toUpperCase()}

CLIENT INFORMATION
==================
Name: ${data.userInfo.name}
Client Code: ${data.userInfo.clientCode}
PAN: ${data.userInfo.panMasked}
Email: ${data.userInfo.email}
Mobile: ${data.userInfo.mobile}
SIP Brewery ID: ${data.userInfo.sipBreweryId}

PORTFOLIO SUMMARY
================
Total Invested: ₹${data.portfolio.totalInvested.toLocaleString()}
Current Value: ₹${data.portfolio.currentValue.toLocaleString()}
Total Returns: ₹${data.portfolio.totalReturns.toLocaleString()} (${data.portfolio.returnsPercentage.toFixed(2)}%)
XIRR: ${data.portfolio.xirr.toFixed(2)}%
Active SIPs: ${data.portfolio.activeSIPs}
Completed SIPs: ${data.portfolio.completedSIPs}

HOLDINGS DETAILS
===============
${data.holdings.map((h: any, i: number) => 
  `${i + 1}. ${h.schemeName}
   Scheme Code: ${h.schemeCode} | Folio: ${h.folioNumber}
   Units: ${h.units.toFixed(3)} | Current NAV: ₹${h.currentNav.toFixed(2)}
   Market Value: ₹${h.marketValue.toLocaleString()}
   Invested Value: ₹${h.investedValue.toLocaleString()}
   P&L: ₹${h.pnl.toLocaleString()} (${h.pnlPercentage.toFixed(2)}%)
   Last Transaction: ${h.lastTransactionDate}
   ${h.sipStatus ? `SIP Status: ${h.sipStatus}` : ''}
   ${h.sipAmount ? `SIP Amount: ₹${h.sipAmount.toLocaleString()}` : ''}
   ${h.nextSIPDate ? `Next SIP Date: ${h.nextSIPDate}` : ''}
`).join('\n')}

ACTIVE SIP DETAILS
==================
${data.sips.filter((sip: any) => sip.status === 'ACTIVE').map((sip: any, i: number) => 
  `${i + 1}. ${sip.schemeName}
   SIP ID: ${sip.sipId}
   Scheme Code: ${sip.schemeCode}
   Amount: ₹${sip.sipAmount.toLocaleString()} | Frequency: ${sip.frequency}
   Start Date: ${sip.startDate} | End Date: ${sip.endDate || 'Perpetual'}
   Next Due: ${sip.nextDueDate || 'N/A'}
   Completed Installments: ${sip.completedInstallments}/${sip.totalInstallments}
   Total Invested: ₹${sip.totalInvested.toLocaleString()}
   Current Value: ₹${sip.currentValue.toLocaleString()}
   Returns: ${sip.returns.toFixed(2)}%
`).join('\n')}

ALL SIP DETAILS (Including Paused/Stopped)
==========================================
${data.sips.map((sip: any, i: number) => 
  `${i + 1}. ${sip.schemeName}
   SIP ID: ${sip.sipId} | Status: ${sip.status}
   Amount: ₹${sip.sipAmount.toLocaleString()} | Frequency: ${sip.frequency}
   Period: ${sip.startDate} to ${sip.endDate || 'Perpetual'}
   Installments: ${sip.completedInstallments}/${sip.totalInstallments}
   Total Invested: ₹${sip.totalInvested.toLocaleString()}
   Current Value: ₹${sip.currentValue.toLocaleString()}
   Returns: ${sip.returns.toFixed(2)}%
`).join('\n')}

RECENT TRANSACTIONS
==================
${data.transactions.slice(0, 15).map((txn: any, i: number) => 
  `${i + 1}. ${txn.schemeName}
   Order Number: ${txn.orderNumber}
   Transaction Date: ${txn.transactionDate}
   Settlement Date: ${txn.settlementDate}
   Type: ${txn.transactionType}
   Amount: ₹${txn.amount.toLocaleString()}
   Units: ${txn.units.toFixed(3)}
   NAV: ₹${txn.nav.toFixed(2)}
   Folio: ${txn.folioNumber}
`).join('\n')}

CAPITAL GAINS SUMMARY
====================
Short Term Capital Gains:
${data.capitalGains.shortTerm.map((gain: any, i: number) => 
  `${i + 1}. ${gain.schemeName}
   Purchase Date: ${gain.purchaseDate} | Sale Date: ${gain.saleDate}
   Purchase Value: ₹${gain.purchaseValue.toLocaleString()}
   Sale Value: ₹${gain.saleValue.toLocaleString()}
   Short Term Gain: ₹${gain.gain.toLocaleString()}
   Tax Rate: ${gain.taxRate}% | Tax Payable: ₹${(gain.gain * gain.taxRate / 100).toLocaleString()}
`).join('\n')}

Long Term Capital Gains:
${data.capitalGains.longTerm.map((gain: any, i: number) => 
  `${i + 1}. ${gain.schemeName}
   Purchase Date: ${gain.purchaseDate} | Sale Date: ${gain.saleDate}
   Purchase Value: ₹${gain.purchaseValue.toLocaleString()}
   Sale Value: ₹${gain.saleValue.toLocaleString()}
   Long Term Gain: ₹${gain.gain.toLocaleString()}
   Tax Rate: ${gain.taxRate}% | Tax Payable: ₹${(gain.gain * gain.taxRate / 100).toLocaleString()}
`).join('\n')}

REWARDS & WALLET SUMMARY
========================
Total Rewards Earned: ₹${data.rewards.totalEarned.toLocaleString()}
Referral Bonus: ₹${data.rewards.referralBonus.toLocaleString()}
Loyalty Points: ${data.rewards.loyaltyPoints}
Cashback Earned: ₹${data.rewards.cashback.toLocaleString()}

Recent Reward Transactions:
${data.rewards.recentTransactions.map((reward: any, i: number) => 
  `${i + 1}. ${reward.type} - ₹${reward.amount.toLocaleString()}
   Date: ${reward.date}
   Description: ${reward.description}
`).join('\n')}

PERFORMANCE METRICS
==================
Portfolio XIRR: ${data.portfolio.xirr.toFixed(2)}%
Total Return %: ${data.portfolio.returnsPercentage.toFixed(2)}%
Active Investment Count: ${data.holdings.length}
Active SIP Count: ${data.portfolio.activeSIPs}
Completed SIP Count: ${data.portfolio.completedSIPs}

COMPLIANCE INFORMATION
=====================
Statement Generation: BSE STAR MF API Integration
Data Source: Live BSE STAR MF API
Statement Type: ${statementName}
Generated By: SIP Brewery Platform
AMFI Registration: ARN-XXXXX
BSE Member ID: XXXXX

IMPORTANT DISCLAIMERS
====================
• This statement is generated using live data from BSE STAR MF API
• All transactions are processed via BSE STAR MF platform
• Mutual fund investments are subject to market risks
• Please read all scheme related documents carefully
• Past performance is not indicative of future returns
• SIP Brewery is an AMFI registered mutual fund distributor
• We may earn commission when you invest through our platform
• AI-generated insights are for informational purposes only
• Please consult your financial advisor for investment decisions

---
SIP Brewery - Your Trusted Investment Partner
AMFI Registered Distributor | BSE STAR MF Member
Generated: ${format(new Date(), 'dd MMM yyyy, HH:mm:ss')}
End of Statement
`;
};

export const downloadStatementFile = (statementName: string, content: string): void => {
  try {
    console.log(`Starting download for: ${statementName}`);
    
    // Create blob with UTF-8 encoding
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create download element
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIP_Brewery_${statementName.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.txt`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`Download completed for: ${statementName}`);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error(`Failed to download ${statementName}: ${error.message}`);
  }
};
