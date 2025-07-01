
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const PDFHoldingsTable: React.FC<PDFHoldingsTableProps> = ({ holdings }) => {
  const totalPortfolioValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const largestHoldingValue = Math.max(...holdings.map(h => h.marketValue));

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📊 Portfolio Holdings Breakdown</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund Name & Category</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Units</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>NAV (₹)</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Current Value</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Returns</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>% of Portfolio</Text>
        </View>

        {holdings.map((holding, index) => {
          const isAlternate = index % 2 === 1;
          const isLargest = holding.marketValue === largestHoldingValue;
          const returns = ((holding.marketValue - (holding.units * 50)) / (holding.units * 50)) * 100;
          const portfolioPercent = (holding.marketValue / totalPortfolioValue) * 100;
          
          const rowStyle = isLargest ? styles.tableRowHighlight : 
                          isAlternate ? styles.tableRowAlternate : styles.tableRow;
          
          return (
            <View key={index} style={rowStyle}>
              <View style={{ flex: 3, paddingHorizontal: 12 }}>
                <Text style={styles.tableCellBold}>
                  {isLargest && '⭐ '}{holding.schemeName}
                </Text>
                <Text style={[styles.tableCell, { fontSize: 10, color: '#6B7280', marginTop: 4 }]}>
                  {holding.schemeName.includes('Direct') ? '🎯 Direct Plan' : '📊 Regular Plan'} • 
                  {holding.schemeName.includes('Growth') ? ' 📈 Growth' : ' 💰 Dividend'}
                </Text>
              </View>
              <Text style={[styles.tableCell, { flex: 1 }]}>{holding.units.toFixed(3)}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.currentNav.toFixed(2)}</Text>
              <Text style={[styles.tableCellBold, { flex: 1 }]}>₹{holding.marketValue.toLocaleString('en-IN')}</Text>
              <Text style={[returns >= 0 ? styles.tableCellGreen : styles.tableCellRed, { flex: 1 }]}>
                {returns >= 0 ? '+' : ''}{returns.toFixed(1)}%
              </Text>
              <Text style={[styles.tableCellBold, { flex: 1, color: isLargest ? '#FFB800' : '#1A1F36' }]}>
                {portfolioPercent.toFixed(1)}%
              </Text>
            </View>
          );
        })}
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.transactionSection}>
        <Text style={styles.transactionTitle}>📋 Recent Transactions (Last 5)</Text>
        <View style={styles.transactionTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Type</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Amount</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Units</Text>
          </View>
          {/* Sample recent transactions */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>15 Jun 2024</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>HDFC Small Cap Fund</Text>
            <Text style={[styles.tableCellGreen, { flex: 1 }]}>SIP</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>₹5,000</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>65.32</Text>
          </View>
          <View style={styles.tableRowAlternate}>
            <Text style={[styles.tableCell, { flex: 2 }]}>15 Jun 2024</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>SBI Large Cap Fund</Text>
            <Text style={[styles.tableCellGreen, { flex: 1 }]}>SIP</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>₹3,000</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>45.21</Text>
          </View>
        </View>
      </View>

      {/* Upcoming SIPs Section */}
      <View style={styles.upcomingSipSection}>
        <Text style={styles.upcomingSipTitle}>📅 Upcoming SIPs</Text>
        <View style={styles.transactionTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund Name</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Next SIP Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 3 }]}>HDFC Small Cap Fund - Direct Growth</Text>
            <Text style={[styles.tableCellBold, { flex: 2 }]}>15 Jul 2024</Text>
            <Text style={[styles.tableCellGreen, { flex: 1 }]}>₹5,000</Text>
          </View>
          <View style={styles.tableRowAlternate}>
            <Text style={[styles.tableCell, { flex: 3 }]}>SBI Large Cap Fund - Direct Growth</Text>
            <Text style={[styles.tableCellBold, { flex: 2 }]}>15 Jul 2024</Text>
            <Text style={[styles.tableCellGreen, { flex: 1 }]}>₹3,000</Text>
          </View>
        </View>
      </View>

      {/* Holdings Summary */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📈 Total Holdings</Text>
          <Text style={styles.summaryValue}>{holdings.length} Funds</Text>
          <Text style={styles.summarySubtext}>Well Diversified Portfolio</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>⭐ Largest Holding</Text>
          <Text style={styles.summaryValue}>
            ₹{largestHoldingValue.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>
            {((largestHoldingValue / totalPortfolioValue) * 100).toFixed(1)}% of total portfolio
          </Text>
        </View>
      </View>
    </View>
  );
};
