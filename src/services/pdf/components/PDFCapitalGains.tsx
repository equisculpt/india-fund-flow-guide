import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFCapitalGains = ({ capitalGains }: any) => {
  const shortTermGains = capitalGains?.shortTerm || [];
  const longTermGains = capitalGains?.longTerm || [];
  
  if (shortTermGains.length === 0 && longTermGains.length === 0) {
    return (
      <View style={styles.capitalGainsSection}>
        <Text style={styles.capitalGainsTitle}>Capital Gains Statement</Text>
        <Text style={{ textAlign: 'center', margin: 20, color: '#6B7280' }}>
          No capital gains transactions available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.capitalGainsSection}>
      <Text style={styles.capitalGainsTitle}>Capital Gains Statement</Text>
      
      {shortTermGains.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 10 }]}>
            Short Term Capital Gains (STCG)
          </Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Scheme Name</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Date</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Date</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Value</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Value</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Gain</Text>
            </View>
            {shortTermGains.map((gain: any, index: number) => (
              <View 
                key={index} 
                style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}
              >
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {gain.schemeName || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {gain.purchaseDate || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {gain.saleDate || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  Rs.{(gain.purchaseValue || 0).toLocaleString('en-IN')}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  Rs.{(gain.saleValue || 0).toLocaleString('en-IN')}
                </Text>
                <Text style={[
                  (gain.gain || 0) >= 0 ? styles.tableCellGreen : styles.tableCellRed, 
                  { flex: 1 }
                ]}>
                  Rs.{(gain.gain || 0).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {longTermGains.length > 0 && (
        <View>
          <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 10 }]}>
            Long Term Capital Gains (LTCG)
          </Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Scheme Name</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Date</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Date</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Purchase Value</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Sale Value</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Gain</Text>
            </View>
            {longTermGains.map((gain: any, index: number) => (
              <View 
                key={index} 
                style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}
              >
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {gain.schemeName || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {gain.purchaseDate || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  {gain.saleDate || 'N/A'}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  Rs.{(gain.purchaseValue || 0).toLocaleString('en-IN')}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>
                  Rs.{(gain.saleValue || 0).toLocaleString('en-IN')}
                </Text>
                <Text style={[
                  (gain.gain || 0) >= 0 ? styles.tableCellGreen : styles.tableCellRed, 
                  { flex: 1 }
                ]}>
                  Rs.{(gain.gain || 0).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};