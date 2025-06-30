
import { format } from 'date-fns';

export const generateStatementContent = (statementName: string, data: any): string => {
  return `SIP BREWERY - ${statementName}
Generated: ${format(new Date(), 'dd MMM yyyy, HH:mm')}

Client: ${data.userInfo.name}
Client Code: ${data.userInfo.clientCode}
PAN: ${data.userInfo.panMasked}

PORTFOLIO SUMMARY
================
Total Invested: ₹${data.portfolio.totalInvested.toLocaleString()}
Current Value: ₹${data.portfolio.currentValue.toLocaleString()}
Total Returns: ₹${data.portfolio.totalReturns.toLocaleString()} (${data.portfolio.returnsPercentage.toFixed(2)}%)
XIRR: ${data.portfolio.xirr.toFixed(2)}%
Active SIPs: ${data.portfolio.activeSIPs}

HOLDINGS
========
${data.holdings.map((h: any, i: number) => 
  `${i + 1}. ${h.schemeName}
   Scheme Code: ${h.schemeCode} | Folio: ${h.folioNumber}
   Units: ${h.units.toFixed(3)} | NAV: ₹${h.currentNav} | Value: ₹${h.marketValue.toLocaleString()}
   P&L: ₹${h.pnl.toLocaleString()} (${h.pnlPercentage.toFixed(2)}%)
`).join('\n')}

ACTIVE SIPs
===========
${data.sips.map((sip: any, i: number) => 
  `${i + 1}. ${sip.schemeName}
   SIP Amount: ₹${sip.sipAmount.toLocaleString()} | Frequency: ${sip.frequency}
   Status: ${sip.status} | Next Due: ${sip.nextDueDate || 'N/A'}
   Total Invested: ₹${sip.totalInvested.toLocaleString()}
   Current Value: ₹${sip.currentValue.toLocaleString()}
`).join('\n')}

RECENT TRANSACTIONS
==================
${data.transactions.slice(0, 5).map((txn: any, i: number) => 
  `${i + 1}. ${txn.schemeName}
   Date: ${txn.transactionDate} | Type: ${txn.transactionType}
   Amount: ₹${txn.amount.toLocaleString()} | Units: ${txn.units.toFixed(3)}
   NAV: ₹${txn.nav} | Order: ${txn.orderNumber}
`).join('\n')}

REWARDS & WALLET
===============
Total Earned: ₹${data.rewards.totalEarned.toLocaleString()}
Referral Bonus: ₹${data.rewards.referralBonus.toLocaleString()}
Loyalty Points: ${data.rewards.loyaltyPoints}
Cashback: ₹${data.rewards.cashback.toLocaleString()}

---
This statement is generated using live BSE STAR MF API data.
SIP Brewery - AMFI Registered Distributor | All transactions via BSE STAR MF
Mutual fund investments are subject to market risk. Please read scheme documents carefully.
`;
};

export const downloadStatementFile = (statementName: string, content: string): void => {
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
