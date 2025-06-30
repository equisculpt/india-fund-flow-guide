
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFHoldingsTableProps {
  holdings: StatementData['holdings'];
}

export const PDFHoldingsTable: React.FC<PDFHoldingsTableProps> = ({ holdings }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>HOLDINGS DETAILS</Text>
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Scheme Name</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Units</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>NAV</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Invested</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Current Value</Text>
        </View>
      </View>
      {holdings.slice(0, 10).map((holding, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{holding.schemeName}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{holding.units.toFixed(3)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₹{holding.currentNav.toFixed(2)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₹{holding.investedValue.toLocaleString()}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>₹{holding.marketValue.toLocaleString()}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);
