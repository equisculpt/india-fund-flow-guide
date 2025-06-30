
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
      <Text style={[styles.tableCell, { flex: 3 }]}>Fund Name</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Units</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>NAV</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Value</Text>
    </View>

    {holdings.map((holding, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 3 }]}>{holding.fundName}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{holding.units.toFixed(3)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.nav.toFixed(2)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>₹{holding.currentValue.toLocaleString()}</Text>
      </View>
    ))}
  </View>
);
