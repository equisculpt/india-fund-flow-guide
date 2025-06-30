
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const PDFHoldingsTable: React.FC<PDFHoldingsTableProps> = ({ holdings }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>PORTFOLIO HOLDINGS</Text>
    
    <View style={styles.tableHeader}>
      <Text style={[styles.tableCell, { flex: 3, color: '#FFFFFF' }]}>Fund Name</Text>
      <Text style={[styles.tableCell, { flex: 1, color: '#FFFFFF' }]}>Units</Text>
      <Text style={[styles.tableCell, { flex: 1, color: '#FFFFFF' }]}>NAV</Text>
      <Text style={[styles.tableCell, { flex: 1, color: '#FFFFFF' }]}>Value</Text>
    </View>

    {holdings.map((holding, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 3 }]}>{holding.schemeName}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{holding.units.toFixed(3)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.currentNav.toFixed(2)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.marketValue.toLocaleString()}</Text>
      </View>
    ))}
  </View>
);
