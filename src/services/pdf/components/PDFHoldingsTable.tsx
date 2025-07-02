
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const PDFHoldingsTable: React.FC<PDFHoldingsTableProps> = ({ holdings }) => {
  // Ensure holdings is a valid array
  const validHoldings = Array.isArray(holdings) ? holdings : [];
  
  if (validHoldings.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio Holdings Breakdown</Text>
        <Text style={{ textAlign: 'center', margin: 30, color: '#6B7280' }}>
          No holdings data available.
        </Text>
      </View>
    );
  }

  const totalPortfolioValue = validHoldings.reduce((sum, h) => sum + (h.marketValue || 0), 0);
  const largestHoldingValue = Math.max(...validHoldings.map(h => h.marketValue || 0));

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Portfolio Holdings Breakdown</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund Details</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Units</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>NAV (Rs.)</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Current Value</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Returns</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>% Portfolio</Text>
        </View>

        {validHoldings.map((holding, index) => {
          const isAlternate = index % 2 === 1;
          const isLargest = (holding.marketValue || 0) === largestHoldingValue;
          const portfolioPercent = totalPortfolioValue > 0 ? ((holding.marketValue || 0) / totalPortfolioValue) * 100 : 0;
          
          const rowStyle = isLargest ? styles.tableRowHighlight : 
                          isAlternate ? styles.tableRowAlternate : styles.tableRow;
          
          return (
            <View key={`holding-${index}`} style={rowStyle}>
              <View style={{ flex: 3, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.tableCellBold}>
                    {holding.schemeName || 'N/A'}
                    {holding.isELSS && ' (ELSS)'}
                    {holding.isLiquid && ' (Liquid)'}
                    {isLargest && ' [Largest]'}
                  </Text>
                </View>
                <Text style={[styles.tableCell, { fontSize: 10, color: '#6B7280', marginTop: 3 }]}>
                  {holding.amcName || 'AMC'} • {holding.category || 'Equity'} • 
                  {holding.expenseRatio && ` ER: ${holding.expenseRatio}%`}
                </Text>
                {holding.isELSS && holding.lockinEndDate && (
                  <Text style={[styles.tableCell, { fontSize: 9, color: '#EF4444', marginTop: 2 }]}>
                    Lock-in till: {holding.lockinEndDate}
                  </Text>
                )}
              </View>
              <Text style={[styles.tableCell, { flex: 1 }]}>{(holding.units || 0).toFixed(3)}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Rs.{(holding.currentNav || 0).toFixed(2)}</Text>
              <Text style={[styles.tableCellBold, { flex: 1 }]}>Rs.{(holding.marketValue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
              <Text style={[(holding.pnl || 0) >= 0 ? styles.tableCellGreen : styles.tableCellRed, { flex: 1 }]}>
                {(holding.pnl || 0) >= 0 ? '+' : ''}{(holding.pnlPercentage || 0).toFixed(1)}%
              </Text>
              <Text style={[styles.tableCellBold, { flex: 1, color: isLargest ? '#FFB800' : '#1A1F36' }]}>
                {portfolioPercent.toFixed(1)}%
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={{ fontSize: 9, color: '#6B7280', marginVertical: 8, textAlign: 'center' }}>
        Returns calculated based on current market value vs invested amount
      </Text>

      {/* Holdings Summary */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Holdings</Text>
          <Text style={styles.summaryValue}>{validHoldings.length} Funds</Text>
          <Text style={styles.summarySubtext}>Well Diversified Portfolio</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Largest Holding</Text>
          <Text style={styles.summaryValue}>
            Rs.{largestHoldingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.summarySubtext}>
            {totalPortfolioValue > 0 ? ((largestHoldingValue / totalPortfolioValue) * 100).toFixed(1) : '0'}% of total portfolio
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>ELSS Holdings</Text>
          <Text style={styles.summaryValue}>
            {validHoldings.filter(h => h.isELSS).length} Funds
          </Text>
          <Text style={styles.summarySubtext}>Tax Saving Investments</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Average Expense Ratio</Text>
          <Text style={styles.summaryValue}>
            {validHoldings.length > 0 ? 
              (validHoldings.reduce((sum, h) => sum + (h.expenseRatio || 0), 0) / validHoldings.length).toFixed(2) : 
              '0.00'
            }%
          </Text>
          <Text style={styles.summarySubtext}>Cost Efficiency</Text>
        </View>
      </View>
    </View>
  );
};
