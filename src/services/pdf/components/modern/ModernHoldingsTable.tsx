import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { modernStyles } from '../../styles/modernPDFStyles';
import { StatementData } from '../../../statement/types';

interface ModernHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const ModernHoldingsTable: React.FC<ModernHoldingsTableProps> = ({ holdings }) => {
  const validHoldings = Array.isArray(holdings) ? holdings : [];
  
  if (validHoldings.length === 0) {
    return (
      <View style={modernStyles.tableSection}>
        <Text style={modernStyles.tableTitle}>Portfolio Holdings Breakdown</Text>
        <View style={modernStyles.errorBox}>
          <Text style={modernStyles.errorText}>
            Ready to Start Your Investment Journey?
          </Text>
          <Text style={[modernStyles.errorText, { marginTop: 8, fontWeight: 'normal' }]}>
            You don't have any mutual fund holdings yet. Start investing today to build your wealth!
          </Text>
        </View>
      </View>
    );
  }

  const totalPortfolioValue = validHoldings.reduce((sum, h) => sum + (h.marketValue || 0), 0);
  const largestHoldingValue = Math.max(...validHoldings.map(h => h.marketValue || 0));

  return (
    <View style={modernStyles.tableSection} wrap={false}>
      <Text style={modernStyles.tableTitle}>Portfolio Holdings Breakdown</Text>
      
      <View style={modernStyles.table}>
        {/* Table Header */}
        <View style={modernStyles.tableHeader}>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w40]}>Fund Details</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Units</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>NAV (₹)</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Current Value</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Returns</Text>
        </View>

        {/* Table Rows */}
        {validHoldings.map((holding, index) => {
          const isAlternate = index % 2 === 1;
          const isLargest = (holding.marketValue || 0) === largestHoldingValue;
          const portfolioPercent = totalPortfolioValue > 0 ? ((holding.marketValue || 0) / totalPortfolioValue) * 100 : 0;
          
          const rowStyle = isLargest ? modernStyles.tableRowHighlight : 
                           isAlternate ? modernStyles.tableRowAlternate : modernStyles.tableRow;
          
          return (
            <View key={holding.schemeName + index} style={rowStyle}>
              {/* Fund Details */}
              <View style={modernStyles.w40}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  {isLargest && (
                    <Text style={{ marginRight: 6, color: '#FFB800', fontSize: 12 }}>★</Text>
                  )}
                  <Text style={[modernStyles.tableCellBold, { textAlign: 'left', fontSize: 10 }]}>
                    {holding.schemeName || 'N/A'}
                  </Text>
                </View>
                <Text style={[modernStyles.tableCell, { fontSize: 9, color: '#6B7280', textAlign: 'left' }]}>
                  {holding.amcName || 'AMC'} • {holding.category || 'Equity'}
                  {holding.expenseRatio && ' • ER: ' + holding.expenseRatio + '%'}
                </Text>
                {holding.isELSS && (
                  <Text style={[modernStyles.tableCell, { fontSize: 8, color: '#EF4444', textAlign: 'left' }]}>
                    Tax Saving (ELSS)
                  </Text>
                )}
              </View>
              
              {/* Units */}
              <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                {(holding.units || 0).toFixed(3)}
              </Text>
              
              {/* NAV */}
              <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                ₹{(holding.currentNav || 0).toFixed(2)}
              </Text>
              
              {/* Current Value */}
              <Text style={[modernStyles.tableCellBold, modernStyles.w15]}>
                ₹{(holding.marketValue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </Text>
              
              {/* Returns */}
              <View style={modernStyles.w15}>
                <Text style={[
                  (holding.pnl || 0) >= 0 ? modernStyles.tableCellPositive : modernStyles.tableCellNegative,
                  { textAlign: 'center' }
                ]}>
                  {(holding.pnl || 0) >= 0 ? '+' : ''}{(holding.pnlPercentage || 0).toFixed(1)}%
                </Text>
                <Text style={[modernStyles.tableCell, { fontSize: 9, color: '#6B7280' }]}>
                  {portfolioPercent.toFixed(1)}% of portfolio
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Holdings Summary */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 15,
      }}>
        <View style={{
          flex: 1,
          backgroundColor: '#F8FAFF',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2E7DFF' }}>
            {validHoldings.length}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            Total Holdings
          </Text>
        </View>
        
        <View style={{
          flex: 1,
          backgroundColor: '#FFF8E7',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFB800' }}>
            ₹{largestHoldingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            Largest Holding
          </Text>
        </View>
        
        <View style={{
          flex: 1,
          backgroundColor: '#F0FDF4',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#00B47B' }}>
            {validHoldings.filter(h => h.isELSS).length}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            ELSS Funds
          </Text>
        </View>
      </View>
    </View>
  );
};