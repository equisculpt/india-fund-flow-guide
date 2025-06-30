
import { PieChart, FileText, Receipt, Calculator, TrendingUp, Wallet, Users, Settings } from 'lucide-react';
import { StatementType } from './types';

export const statementTypes: StatementType[] = [
  { 
    id: 'portfolio-summary', 
    name: 'Portfolio Summary Statement', 
    icon: PieChart, 
    description: 'Complete portfolio overview with BSE STAR MF data and AI insights',
    category: 'Portfolio'
  },
  { 
    id: 'holdings-statement', 
    name: 'Holdings Statement', 
    icon: FileText, 
    description: 'Fund-wise detailed holdings with current NAV from BSE',
    category: 'Portfolio'
  },
  { 
    id: 'transaction-statement', 
    name: 'Transaction Statement', 
    icon: Receipt, 
    description: 'Complete transaction history with BSE order references',
    category: 'Transactions'
  },
  { 
    id: 'capital-gains', 
    name: 'Capital Gains Statement', 
    icon: Calculator, 
    description: 'Tax-ready capital gains report for IT returns',
    category: 'Tax'
  },
  { 
    id: 'sip-statement', 
    name: 'SIP Statement', 
    icon: TrendingUp, 
    description: 'Active, paused, and upcoming SIP details from BSE STAR MF',
    category: 'SIP'
  },
  { 
    id: 'annual-returns', 
    name: 'Annualized Returns Statement', 
    icon: TrendingUp, 
    description: 'XIRR/IRR analysis with peer comparison',
    category: 'Performance'
  },
  { 
    id: 'rewards-statement', 
    name: 'Rewards & Wallet Statement', 
    icon: Wallet, 
    description: 'Earnings, referrals, and wallet transactions',
    category: 'Rewards'
  },
  { 
    id: 'tax-proof-elss', 
    name: 'Tax Proof / ELSS Statement', 
    icon: Calculator, 
    description: '80C tax saving investments and proofs',
    category: 'Tax'
  },
  { 
    id: 'referral-statement', 
    name: 'Referral Statement', 
    icon: Users, 
    description: 'Referral earnings and referred user details',
    category: 'Rewards'
  },
  { 
    id: 'custom-statement', 
    name: 'Custom Period Statement', 
    icon: Settings, 
    description: 'Customizable statement with date and fund filters',
    category: 'Custom'
  },
  { 
    id: 'ai-summary-report', 
    name: 'AI Summary Report', 
    icon: TrendingUp, 
    description: 'AI-powered portfolio health and recommendations',
    category: 'AI Insights'
  }
];

export const categories = ['All', 'Portfolio', 'Transactions', 'Tax', 'SIP', 'Performance', 'Rewards', 'Custom', 'AI Insights'];

export const statementTypesMap = statementTypes.reduce((acc, statement) => {
  acc[statement.id] = statement.name;
  return acc;
}, {} as Record<string, string>);
