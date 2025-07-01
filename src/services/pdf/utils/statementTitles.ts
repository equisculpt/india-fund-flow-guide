
export const getStatementTitle = (statementType: string): string => {
  const titleMap: Record<string, string> = {
    'comprehensive': 'Comprehensive Portfolio Statement',
    'holdings': 'Holdings & Portfolio Summary',
    'transactions': 'Transaction History Statement',
    'tax': 'Tax Summary & Capital Gains Report',
    'sip-statement': 'SIP Performance & Analysis Report',
    'performance': 'Portfolio Performance Analysis',
    'annual-returns': 'Annual Returns Statement',
    'portfolio': 'Portfolio Overview & Summary',
    'ai-summary-report': 'AI Portfolio Analysis Report',
    'rewards-statement': 'Rewards & Loyalty Statement'
  };
  
  return titleMap[statementType] || 'Investment Statement';
};
