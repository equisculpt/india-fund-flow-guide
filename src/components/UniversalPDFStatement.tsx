import React from 'react';
import { StandardPDFGenerator, StandardPDFData } from '../services/pdf/StandardPDFGenerator';
import { Button } from './ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UniversalPDFStatementProps {
  data?: Partial<StandardPDFData>;
  statementType?: string;
  variant?: 'button' | 'card';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Universal PDF Statement component that uses the standardized beautiful PDF generation
 * Can be used anywhere in the app to generate consistent, styled PDF statements
 */
export const UniversalPDFStatement: React.FC<UniversalPDFStatementProps> = ({
  data = {},
  statementType = 'Portfolio Statement',
  variant = 'button',
  className = '',
  children
}) => {
  const { toast } = useToast();

  const generateStandardizedPDF = async () => {
    try {
      toast({
        title: "Generating Beautiful PDF...",
        description: "Creating your statement with consistent styling and charts.",
      });

      // Prepare standardized data with defaults
      const standardizedData: StandardPDFData = {
        name: data.name || 'Valued Investor',
        clientCode: data.clientCode || 'SB' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        totalInvested: data.totalInvested || 1250000,
        currentValue: data.currentValue || 1675000,
        returnsPercentage: data.returnsPercentage || 34,
        xirr: data.xirr || 22.5,
        months: data.months || ['Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024'],
        values: data.values || [250000, 375000, 520000, 680000, 825000, 950000, 1025000, 1150000, 1280000, 1420000, 1550000, 1675000],
        holdings: data.holdings || getDefaultHoldings(),
        insights: data.insights || getDefaultInsights(data.xirr || 22.5),
      };

      // Use the standardized PDF generator
      await StandardPDFGenerator.generatePDF(standardizedData);

      toast({
        title: "PDF Generated Successfully!",
        description: `Your beautiful ${statementType.toLowerCase()} has been downloaded with consistent styling.`,
      });

    } catch (error) {
      console.error('Universal PDF generation error:', error);
      
      toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  if (variant === 'card') {
    return (
      <div className={`bg-card border rounded-lg p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Generate PDF Statement</h3>
            <p className="text-sm text-muted-foreground">Download your beautiful portfolio statement</p>
          </div>
        </div>
        
        {children}
        
        <Button onClick={generateStandardizedPDF} className="w-full mt-4">
          <Download className="h-4 w-4 mr-2" />
          Download Beautiful PDF Statement
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={generateStandardizedPDF} className={className}>
      <Download className="h-4 w-4 mr-2" />
      {children || 'Download PDF Statement'}
    </Button>
  );
};

// Default holdings for demonstration
function getDefaultHoldings() {
  return [
    {
      schemeName: 'HDFC Top 100 Fund - Direct Growth',
      amcName: 'HDFC Mutual Fund',
      category: 'Large Cap',
      units: 1234.56,
      currentNav: 856.32,
      marketValue: 485673,
      investedAmount: 350000,
      pnlPercentage: 38.8,
      investmentType: 'SIP' as const
    },
    {
      schemeName: 'Axis Small Cap Fund - Direct Growth',
      amcName: 'Axis Mutual Fund',
      category: 'Small Cap',
      units: 876.23,
      currentNav: 612.45,
      marketValue: 336789,
      investedAmount: 250000,
      pnlPercentage: 34.7,
      investmentType: 'SIP' as const
    },
    {
      schemeName: 'Mirae Asset Large Cap Fund - Direct',
      amcName: 'Mirae Asset',
      category: 'Large Cap',
      units: 2156.78,
      currentNav: 298.67,
      marketValue: 644234,
      investedAmount: 500000,
      pnlPercentage: 28.8,
      investmentType: 'Lumpsum' as const
    },
    {
      schemeName: 'SBI Blue Chip Fund - Direct Growth',
      amcName: 'SBI Mutual Fund',
      category: 'Large Cap',
      units: 934.12,
      currentNav: 445.89,
      marketValue: 416567,
      investedAmount: 300000,
      pnlPercentage: 38.9,
      investmentType: 'SIP' as const
    }
  ];
}

// Default insights based on performance
function getDefaultInsights(xirr: number) {
  if (xirr > 15) {
    return [{
      title: 'Excellent Performance',
      message: 'Your portfolio is performing exceptionally well with strong returns.',
      priority: 'high' as const,
      icon: '🚀'
    }];
  } else if (xirr > 10) {
    return [{
      title: 'Solid Growth',
      message: 'Your portfolio shows steady growth with consistent performance.',
      priority: 'medium' as const,
      icon: '📈'
    }];
  } else {
    return [{
      title: 'Improvement Scope',
      message: 'Consider reviewing your investment strategy for better returns.',
      priority: 'low' as const,
      icon: '🧐'
    }];
  }
}

export default UniversalPDFStatement;