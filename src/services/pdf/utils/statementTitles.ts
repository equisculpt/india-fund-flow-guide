
export function getStatementTitle(statementType: string): string {
  const titles: Record<string, string> = {
    'portfolio-summary': 'Portfolio Summary Statement',
    'holdings-statement': 'Holdings Statement',
    'transaction-statement': 'Transaction History Statement',
    'sip-statement': 'SIP Details Statement',
    'tax': 'Tax Statement',
    'capital-gains': 'Capital Gains Statement',
    'rewards-statement': 'Rewards & Referral Statement',
    'comprehensive': 'Comprehensive Investment Statement',
    'performance': 'Performance Analysis Report',
    'annual-returns': 'Annual Returns Statement',
  };
  
  return titles[statementType] || 'Investment Statement';
}
