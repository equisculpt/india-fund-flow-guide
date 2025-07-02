import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { StatementData } from '../../statement/types';

const tableStyles = {
  section: {
    marginBottom: 20,
  },
  
  sectionHeader: {
    backgroundColor: '#1F2937',
    padding: 15,
    marginBottom: 15,
    borderRadius: 6,
  },
  
  sectionTitle: {
    fontSize: 18, // 18pt for section titles
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
  
  tableContainer: {
    border: '1px solid #D1D5DB',
    borderRadius: 6,
    overflow: 'hidden' as const,
  },
  
  tableHeader: {
    flexDirection: 'row' as const,
    backgroundColor: '#F9FAFB',
    borderBottom: '2px solid #E5E7EB',
    padding: '10 0',
  },
  
  tableHeaderCell: {
    fontSize: 10, // 10pt for table headers
    fontWeight: 'bold' as const,
    color: '#374151',
    paddingHorizontal: 8,
    textAlign: 'center' as const,
  },
  
  tableRow: {
    flexDirection: 'row' as const,
    borderBottom: '1px solid #F3F4F6',
    padding: '8 0',
    minHeight: 35,
  },
  
  tableRowAlternate: {
    flexDirection: 'row' as const,
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #F3F4F6',
    padding: '8 0',
    minHeight: 35,
  },
  
  tableRowHighlight: {
    flexDirection: 'row' as const,
    backgroundColor: '#FEF3C7',
    borderBottom: '1px solid #F59E0B',
    padding: '8 0',
    minHeight: 35,
    borderLeft: '3px solid #F59E0B',
  },
  
  tableCell: {
    fontSize: 9, // 9pt for table cells
    color: '#4B5563',
    paddingHorizontal: 8,
    paddingVertical: 2,
    textAlign: 'left' as const,
  },
  
  tableCellBold: {
    fontSize: 10, // 10pt for important cells
    fontWeight: 'bold' as const,
    color: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  
  tableCellGreen: {
    fontSize: 9,
    color: '#16A34A',
    fontWeight: 'bold' as const,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  
  tableCellRed: {
    fontSize: 9,
    color: '#DC2626',
    fontWeight: 'bold' as const,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  
  fundNameContainer: {
    paddingHorizontal: 8,
  },
  
  fundName: {
    fontSize: 10,
    fontWeight: 'bold' as const,
    color: '#1F2937',
    marginBottom: 2,
  },
  
  fundDetails: {
    fontSize: 8, // 8pt for secondary info
    color: '#6B7280',
    lineHeight: 1.2,
  },
  
  elssIndicator: {
    fontSize: 7,
    color: '#7C3AED',
    fontWeight: 'bold' as const,
    backgroundColor: '#F3E8FF',
    padding: '1 4',
    borderRadius: 2,
    marginTop: 2,
  },
  
  lockInWarning: {
    fontSize: 7,
    color: '#DC2626',
    marginTop: 2,
  },
  
  largestHoldingIndicator: {
    fontSize: 8,
    color: '#F59E0B',
    fontWeight: 'bold' as const,
    marginBottom: 2,
  },
  
  // Summary cards at bottom
  summarySection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    border: '1px solid #E2E8F0',
  },
  
  summaryGrid: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: 10,
  },
  
  summaryCard: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    border: '1px solid #E5E7EB',
    alignItems: 'center' as const,
  },
  
  summaryCardTitle: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center' as const,
  },
  
  summaryCardValue: {
    fontSize: 12,
    fontWeight: 'bold' as const,
    color: '#1F2937',
    marginBottom: 2,
    textAlign: 'center' as const,
  },
  
  summaryCardSubtext: {
    fontSize: 7,
    color: '#9CA3AF',
    textAlign: 'center' as const,
  },
  
  performanceNote: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center' as const,
    marginTop: 10,
    fontStyle: 'italic' as const,
  },
};

interface ProfessionalPDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const ProfessionalPDFHoldingsTable: React.FC<ProfessionalPDFHoldingsTableProps> = ({ 
  holdings 
}) => {
  const validHoldings = Array.isArray(holdings) ? holdings : [];
  
  if (validHoldings.length === 0) {
    return (
      <View style={tableStyles.section}>
        <View style={tableStyles.sectionHeader}>
          <Text style={tableStyles.sectionTitle}>Portfolio Holdings Breakdown</Text>
        </View>
        <Text style={{ textAlign: 'center', margin: 30, color: '#6B7280', fontSize: 12 }}>
          No holdings data available for this statement period.
        </Text>
      </View>
    );
  }

  const totalPortfolioValue = validHoldings.reduce((sum, h) => sum + (h.marketValue || 0), 0);
  const largestHoldingValue = Math.max(...validHoldings.map(h => h.marketValue || 0));
  const totalInvested = validHoldings.reduce((sum, h) => sum + (h.marketValue || 0), 0); // Using marketValue as fallback
  const totalUnits = validHoldings.reduce((sum, h) => sum + (h.units || 0), 0);

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <View style={tableStyles.section} wrap={false}>
      {/* Section Header */}
      <View style={tableStyles.sectionHeader}>
        <Text style={tableStyles.sectionTitle}>Portfolio Holdings Breakdown</Text>
      </View>
      
      {/* Holdings Table */}
      <View style={tableStyles.tableContainer}>
        {/* Table Header */}
        <View style={tableStyles.tableHeader}>
          <Text style={[tableStyles.tableHeaderCell, { flex: 3 }]}>Fund Details</Text>
          <Text style={[tableStyles.tableHeaderCell, { flex: 1 }]}>Units</Text>
          <Text style={[tableStyles.tableHeaderCell, { flex: 1 }]}>NAV (₹)</Text>
          <Text style={[tableStyles.tableHeaderCell, { flex: 1.2 }]}>Market Value</Text>
          <Text style={[tableStyles.tableHeaderCell, { flex: 1 }]}>Returns (%)</Text>
          <Text style={[tableStyles.tableHeaderCell, { flex: 1 }]}>Portfolio %</Text>
        </View>

        {/* Table Rows */}
        {validHoldings.map((holding, index) => {
          const isAlternate = index % 2 === 1;
          const isLargest = (holding.marketValue || 0) === largestHoldingValue;
          const portfolioPercent = totalPortfolioValue > 0 ? 
            ((holding.marketValue || 0) / totalPortfolioValue) * 100 : 0;
          
          const rowStyle = isLargest ? tableStyles.tableRowHighlight : 
                          isAlternate ? tableStyles.tableRowAlternate : tableStyles.tableRow;
          
          const returnPercent = holding.pnlPercentage || 0;
          const isPositiveReturn = returnPercent >= 0;
          
          return (
            <View key={`holding-${index}`} style={rowStyle}>
              {/* Fund Details */}
              <View style={[tableStyles.fundNameContainer, { flex: 3 }]}>
                {isLargest && (
                  <Text style={tableStyles.largestHoldingIndicator}>
                    ★ LARGEST HOLDING
                  </Text>
                )}
                <Text style={tableStyles.fundName}>
                  {holding.schemeName || 'N/A'}
                </Text>
                <Text style={tableStyles.fundDetails}>
                  {holding.amcName || 'AMC'} • {holding.category || 'Equity'}
                  {holding.expenseRatio && ` • ER: ${holding.expenseRatio}%`}
                </Text>
                {holding.isELSS && (
                  <Text style={tableStyles.elssIndicator}>ELSS - TAX SAVER</Text>
                )}
                {holding.isELSS && holding.lockinEndDate && (
                  <Text style={tableStyles.lockInWarning}>
                    Lock-in until: {holding.lockinEndDate}
                  </Text>
                )}
              </View>

              {/* Units */}
              <Text style={[tableStyles.tableCell, { flex: 1, textAlign: 'right' }]}>
                {(holding.units || 0).toFixed(3)}
              </Text>

              {/* NAV */}
              <Text style={[tableStyles.tableCell, { flex: 1, textAlign: 'right' }]}>
                {(holding.currentNav || 0).toFixed(2)}
              </Text>

              {/* Market Value */}
              <Text style={[tableStyles.tableCellBold, { flex: 1.2, textAlign: 'right' }]}>
                {formatCurrency(holding.marketValue || 0)}
              </Text>

              {/* Returns */}
              <Text style={[
                isPositiveReturn ? tableStyles.tableCellGreen : tableStyles.tableCellRed, 
                { flex: 1, textAlign: 'right' }
              ]}>
                {isPositiveReturn ? '▲' : '▼'} {Math.abs(returnPercent).toFixed(1)}%
              </Text>

              {/* Portfolio Percentage */}
              <Text style={[
                tableStyles.tableCellBold, 
                { flex: 1, textAlign: 'right', color: isLargest ? '#F59E0B' : '#1F2937' }
              ]}>
                {portfolioPercent.toFixed(1)}%
              </Text>
            </View>
          );
        })}
      </View>

      {/* Performance Note */}
      <Text style={tableStyles.performanceNote}>
        Returns calculated based on current NAV vs average purchase price. 
        ▲ indicates positive returns, ▼ indicates negative returns.
      </Text>

      {/* Holdings Summary */}
      <View style={tableStyles.summarySection}>
        <View style={tableStyles.summaryGrid}>
          <View style={tableStyles.summaryCard}>
            <Text style={tableStyles.summaryCardTitle}>Total Holdings</Text>
            <Text style={tableStyles.summaryCardValue}>{validHoldings.length}</Text>
            <Text style={tableStyles.summaryCardSubtext}>Mutual Funds</Text>
          </View>
          
          <View style={tableStyles.summaryCard}>
            <Text style={tableStyles.summaryCardTitle}>Total Units</Text>
            <Text style={tableStyles.summaryCardValue}>{totalUnits.toFixed(3)}</Text>
            <Text style={tableStyles.summaryCardSubtext}>Accumulated</Text>
          </View>
          
          <View style={tableStyles.summaryCard}>
            <Text style={tableStyles.summaryCardTitle}>Largest Holding</Text>
            <Text style={tableStyles.summaryCardValue}>
              {formatCurrency(largestHoldingValue)}
            </Text>
            <Text style={tableStyles.summaryCardSubtext}>
              {totalPortfolioValue > 0 ? 
                `${((largestHoldingValue / totalPortfolioValue) * 100).toFixed(1)}% of portfolio` : 
                '0% of portfolio'
              }
            </Text>
          </View>
          
          <View style={tableStyles.summaryCard}>
            <Text style={tableStyles.summaryCardTitle}>ELSS Holdings</Text>
            <Text style={tableStyles.summaryCardValue}>
              {validHoldings.filter(h => h.isELSS).length}
            </Text>
            <Text style={tableStyles.summaryCardSubtext}>Tax Savers</Text>
          </View>
          
          <View style={tableStyles.summaryCard}>
            <Text style={tableStyles.summaryCardTitle}>Avg Expense Ratio</Text>
            <Text style={tableStyles.summaryCardValue}>
              {validHoldings.length > 0 ? 
                (validHoldings.reduce((sum, h) => sum + (h.expenseRatio || 0), 0) / validHoldings.length).toFixed(2) : 
                '0.00'
              }%
            </Text>
            <Text style={tableStyles.summaryCardSubtext}>Annual Fee</Text>
          </View>
        </View>
      </View>
    </View>
  );
};