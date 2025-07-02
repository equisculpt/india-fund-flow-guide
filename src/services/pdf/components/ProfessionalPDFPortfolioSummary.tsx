import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { StatementData } from '../../statement/types';

// Professional PDF styles with proper font sizes and spacing
const professionalStyles = {
  // Main container
  portfolioSection: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: 8,
  },
  
  // Header section
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2px solid #2563EB',
  },
  
  sectionTitle: {
    fontSize: 24, // 24pt for main titles
    fontWeight: 'bold' as const,
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  
  aiBadge: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    padding: '6 12',
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 'bold' as const,
  },
  
  // Metrics grid
  metricsGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 15,
    marginBottom: 20,
  },
  
  metricCard: {
    flex: 1,
    padding: 15,
    borderRadius: 6,
    border: '1px solid #D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  
  metricCardPositive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#16A34A',
  },
  
  metricCardNegative: {
    backgroundColor: '#FEF2F2',
    borderColor: '#DC2626',
  },
  
  metricCardNeutral: {
    backgroundColor: '#F0F9FF',
    borderColor: '#0284C7',
  },
  
  metricLabel: {
    fontSize: 11, // 11pt for labels
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: 'normal' as const,
  },
  
  metricValue: {
    fontSize: 18, // 18pt for values
    fontWeight: 'bold' as const,
    color: '#1F2937',
    marginBottom: 2,
  },
  
  metricValuePositive: {
    color: '#16A34A',
  },
  
  metricValueNegative: {
    color: '#DC2626',
  },
  
  metricSubtext: {
    fontSize: 9, // 9pt for subtext
    color: '#9CA3AF',
  },
  
  // Performance indicators
  performanceIndicator: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  
  indicator: {
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  
  indicatorPositive: {
    color: '#16A34A',
  },
  
  indicatorNegative: {
    color: '#DC2626',
  },
  
  // Summary section
  summarySection: {
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 6,
    marginTop: 15,
    border: '1px solid #E2E8F0',
  },
  
  summaryTitle: {
    fontSize: 14, // 14pt for subsection titles
    fontWeight: 'bold' as const,
    color: '#374151',
    marginBottom: 8,
  },
  
  summaryText: {
    fontSize: 11, // 11pt for body text
    color: '#4B5563',
    lineHeight: 1.5,
  },
  
  // Goal progress
  goalSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FEF3C7',
    borderLeft: '4px solid #F59E0B',
    borderRadius: 4,
  },
  
  goalTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#92400E',
    marginBottom: 8,
  },
  
  goalProgress: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 5,
  },
  
  goalLabel: {
    fontSize: 10,
    color: '#78350F',
  },
  
  goalValue: {
    fontSize: 11,
    fontWeight: 'bold' as const,
    color: '#92400E',
  },
  
  // Footer note
  footerNote: {
    fontSize: 9, // 9pt for disclaimers
    color: '#6B7280',
    marginTop: 15,
    fontStyle: 'italic' as const,
    textAlign: 'center' as const,
  },
};

interface ProfessionalPDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const ProfessionalPDFPortfolioSummary: React.FC<ProfessionalPDFPortfolioSummaryProps> = ({ 
  portfolio 
}) => {
  // Safely extract values with defaults
  const totalInvested = portfolio?.totalInvested || 0;
  const currentValue = portfolio?.currentValue || 0;
  const totalReturns = portfolio?.totalReturns || 0;
  const returnsPercentage = portfolio?.returnsPercentage || 0;
  const xirr = portfolio?.xirr || 0;
  const goalTarget = portfolio?.goalTarget || 0;
  const goalAchieved = portfolio?.goalAchieved || 0;
  const goalName = portfolio?.goalName || '';

  // Determine performance indicators
  const isPositiveReturns = totalReturns >= 0;
  const isPositiveXIRR = xirr >= 0;
  const returnIndicator = isPositiveReturns ? '▲' : '▼';
  const xirrIndicator = isPositiveXIRR ? '▲' : '▼';

  // Format currency values
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  // Performance rating
  const getPerformanceRating = (xirr: number) => {
    if (xirr >= 15) return { text: 'Excellent', symbol: '★★★' };
    if (xirr >= 12) return { text: 'Good', symbol: '★★' };
    if (xirr >= 8) return { text: 'Average', symbol: '★' };
    return { text: 'Below Average', symbol: '-' };
  };

  const performanceRating = getPerformanceRating(xirr);

  return (
    <View style={professionalStyles.portfolioSection} wrap={false}>
      {/* Header */}
      <View style={professionalStyles.sectionHeader}>
        <Text style={professionalStyles.sectionTitle}>Portfolio Dashboard</Text>
        <Text style={professionalStyles.aiBadge}>AI POWERED</Text>
      </View>

      {/* Main Metrics Grid */}
      <View style={professionalStyles.metricsGrid}>
        {/* Total Invested */}
        <View style={[professionalStyles.metricCard, professionalStyles.metricCardNeutral]}>
          <Text style={professionalStyles.metricLabel}>Total Invested</Text>
          <Text style={professionalStyles.metricValue}>
            {formatCurrency(totalInvested)}
          </Text>
          <Text style={professionalStyles.metricSubtext}>Principal Amount</Text>
        </View>

        {/* Current Value */}
        <View style={[professionalStyles.metricCard, professionalStyles.metricCardNeutral]}>
          <Text style={professionalStyles.metricLabel}>Current Value</Text>
          <Text style={professionalStyles.metricValue}>
            {formatCurrency(currentValue)}
          </Text>
          <Text style={professionalStyles.metricSubtext}>Market Value</Text>
        </View>

        {/* Total Returns */}
        <View style={[
          professionalStyles.metricCard, 
          isPositiveReturns ? professionalStyles.metricCardPositive : professionalStyles.metricCardNegative
        ]}>
          <Text style={professionalStyles.metricLabel}>Total Returns</Text>
          <View style={professionalStyles.performanceIndicator}>
            <Text style={[
              professionalStyles.indicator,
              isPositiveReturns ? professionalStyles.indicatorPositive : professionalStyles.indicatorNegative
            ]}>
              {returnIndicator}
            </Text>
            <Text style={[
              professionalStyles.metricValue,
              isPositiveReturns ? professionalStyles.metricValuePositive : professionalStyles.metricValueNegative
            ]}>
              {formatCurrency(Math.abs(totalReturns))}
            </Text>
          </View>
          <Text style={[
            professionalStyles.metricSubtext,
            { color: isPositiveReturns ? '#16A34A' : '#DC2626', fontWeight: 'bold' }
          ]}>
            {isPositiveReturns ? '+' : ''}{returnsPercentage.toFixed(2)}%
          </Text>
        </View>

        {/* XIRR */}
        <View style={[
          professionalStyles.metricCard,
          isPositiveXIRR ? professionalStyles.metricCardPositive : professionalStyles.metricCardNegative
        ]}>
          <Text style={professionalStyles.metricLabel}>XIRR (Annualized)</Text>
          <View style={professionalStyles.performanceIndicator}>
            <Text style={[
              professionalStyles.indicator,
              isPositiveXIRR ? professionalStyles.indicatorPositive : professionalStyles.indicatorNegative
            ]}>
              {xirrIndicator}
            </Text>
            <Text style={[
              professionalStyles.metricValue,
              isPositiveXIRR ? professionalStyles.metricValuePositive : professionalStyles.metricValueNegative
            ]}>
              {Math.abs(xirr).toFixed(2)}%
            </Text>
          </View>
          <Text style={professionalStyles.metricSubtext}>
            {performanceRating.symbol} {performanceRating.text}
          </Text>
        </View>
      </View>

      {/* Performance Summary */}
      <View style={professionalStyles.summarySection}>
        <Text style={professionalStyles.summaryTitle}>Performance Analysis</Text>
        <Text style={professionalStyles.summaryText}>
          Your portfolio has generated {isPositiveReturns ? 'positive' : 'negative'} returns of{' '}
          {formatCurrency(Math.abs(totalReturns))} ({returnsPercentage >= 0 ? '+' : ''}{returnsPercentage.toFixed(2)}%) 
          on an investment of {formatCurrency(totalInvested)}. The annualized return (XIRR) of{' '}
          {xirr >= 0 ? '+' : ''}{xirr.toFixed(2)}% is rated as {performanceRating.text.toLowerCase()}{' '}
          based on market standards.
        </Text>
      </View>

      {/* Goal Progress (if applicable) */}
      {goalName && goalTarget > 0 && (
        <View style={professionalStyles.goalSection}>
          <Text style={professionalStyles.goalTitle}>Goal Progress: {goalName}</Text>
          
          <View style={professionalStyles.goalProgress}>
            <Text style={professionalStyles.goalLabel}>Target Amount:</Text>
            <Text style={professionalStyles.goalValue}>{formatCurrency(goalTarget)}</Text>
          </View>
          
          <View style={professionalStyles.goalProgress}>
            <Text style={professionalStyles.goalLabel}>Current Achievement:</Text>
            <Text style={professionalStyles.goalValue}>{formatCurrency(goalAchieved)}</Text>
          </View>
          
          <View style={professionalStyles.goalProgress}>
            <Text style={professionalStyles.goalLabel}>Progress Percentage:</Text>
            <Text style={professionalStyles.goalValue}>
              {((goalAchieved / goalTarget) * 100).toFixed(1)}% Complete
            </Text>
          </View>
        </View>
      )}

      {/* XIRR Explanation */}
      <Text style={professionalStyles.footerNote}>
        NOTE: XIRR (Extended Internal Rate of Return) calculates annualized return considering timing and amount of each investment.
        Performance ratings: Excellent (15%+), Good (12-15%), Average (8-12%), Below Average (&lt;8%).
      </Text>
    </View>
  );
};