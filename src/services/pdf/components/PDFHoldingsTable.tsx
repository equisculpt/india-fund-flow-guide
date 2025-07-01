
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const PDFHoldingsTable: React.FC<PDFHoldingsTableProps> = ({ holdings }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>💼 Portfolio Holdings Breakdown</Text>
    
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund Name & Category</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Units</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>NAV (₹)</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Current Value</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Returns</Text>
      </View>

      {holdings.map((holding, index) => {
        const isAlternate = index % 2 === 1;
        const returns = ((holding.marketValue - (holding.units * 50)) / (holding.units * 50)) * 100; // Mock calculation
        
        return (
          <View key={index} style={isAlternate ? styles.tableRowAlternate : styles.tableRow}>
            <View style={{ flex: 3, paddingHorizontal: 10 }}>
              <Text style={styles.tableCellBold}>{holding.schemeName}</Text>
              <Text style={[styles.tableCell, { fontSize: 9, color: '#6B7280', marginTop: 3 }]}>
                {holding.schemeName.includes('Direct') ? '🔹 Direct Plan' : '🔸 Regular Plan'} • 
                {holding.schemeName.includes('Growth') ? ' Growth Option' : ' Dividend Option'}
              </Text>
            </View>
            <Text style={[styles.tableCell, { flex: 1 }]}>{holding.units.toFixed(3)}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.currentNav.toFixed(2)}</Text>
            <Text style={[styles.tableCellBold, { flex: 1 }]}>₹{holding.marketValue.toLocaleString()}</Text>
            <Text style={[returns >= 0 ? styles.tableCellGreen : styles.tableCell, { flex: 1 }]}>
              {returns >= 0 ? '+' : ''}{returns.toFixed(1)}%
            </Text>
          </View>
        );
      })}
    </View>

    {/* Holdings Summary */}
    <View style={styles.summaryGrid}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Holdings</Text>
        <Text style={styles.summaryValue}>{holdings.length} Funds</Text>
        <Text style={styles.summarySubtext}>Diversified Portfolio</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Largest Holding</Text>
        <Text style={styles.summaryValue}>
          ₹{Math.max(...holdings.map(h => h.marketValue)).toLocaleString()}
        </Text>
        <Text style={styles.summarySubtext}>
          {((Math.max(...holdings.map(h => h.marketValue)) / holdings.reduce((sum, h) => sum + h.marketValue, 0)) * 100).toFixed(1)}% of portfolio
        </Text>
      </View>
    </View>
  </View>
);
