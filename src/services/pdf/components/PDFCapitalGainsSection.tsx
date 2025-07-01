
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFCapitalGainsSectionProps {
  capitalGains: StatementData['capitalGains'];
}

export const PDFCapitalGainsSection: React.FC<PDFCapitalGainsSectionProps> = ({ capitalGains }) => {
  const totalShortTermGains = capitalGains.shortTerm.reduce((sum, gain) => sum + gain.gain, 0);
  const totalLongTermGains = capitalGains.longTerm.reduce((sum, gain) => sum + gain.gain, 0);
  const totalGains = totalShortTermGains + totalLongTermGains;

  if (capitalGains.shortTerm.length === 0 && capitalGains.longTerm.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Capital Gains Summary - Tax Year 2024-25</Text>
      
      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Short Term Gains</Text>
          <Text style={[styles.summaryValue, { color: totalShortTermGains >= 0 ? '#00B47B' : '#EF4444' }]}>
            ₹{totalShortTermGains.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Tax Rate: 30%</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Long Term Gains</Text>
          <Text style={[styles.summaryValue, { color: totalLongTermGains >= 0 ? '#00B47B' : '#EF4444' }]}>
            ₹{totalLongTermGains.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Tax Rate: 10%</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Gains</Text>
          <Text style={[styles.summaryValue, { color: totalGains >= 0 ? '#00B47B' : '#EF4444' }]}>
            ₹{totalGains.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Taxable Amount</Text>
        </View>
      </View>

      {/* Short Term Gains Table */}
      {capitalGains.shortTerm.length > 0 && (
        <View style={[styles.tableContainer, { marginTop: 30 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 15 }]}>
            Short Term Capital Gains (Holding Period ≤ 12 months)
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Scheme Name</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Value</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Value</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Gain/Loss</Text>
          </View>
          {capitalGains.shortTerm.map((gain, index) => (
            <View key={index} style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{gain.schemeName}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{gain.purchaseDate}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{gain.saleDate}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>₹{gain.purchaseValue.toLocaleString('en-IN')}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>₹{gain.saleValue.toLocaleString('en-IN')}</Text>
              <Text style={[gain.gain >= 0 ? styles.tableCellGreen : styles.tableCellRed, { flex: 1 }]}>
                ₹{gain.gain.toLocaleString('en-IN')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Long Term Gains Table */}
      {capitalGains.longTerm.length > 0 && (
        <View style={[styles.tableContainer, { marginTop: 30 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 15 }]}>
            Long Term Capital Gains (Holding Period {'>'} 12 months)
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Scheme Name</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Value</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Value</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Gain/Loss</Text>
          </View>
          {capitalGains.longTerm.map((gain, index) => (
            <View key={index} style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{gain.schemeName}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{gain.purchaseDate}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{gain.saleDate}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>₹{gain.purchaseValue.toLocaleString('en-IN')}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>₹{gain.saleValue.toLocaleString('en-IN')}</Text>
              <Text style={[gain.gain >= 0 ? styles.tableCellGreen : styles.tableCellRed, { flex: 1 }]}>
                ₹{gain.gain.toLocaleString('en-IN')}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
