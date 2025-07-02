import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFUpcomingSIPs = ({ sips }: any) => {
  const validSips = Array.isArray(sips) ? sips : [];

  return (
    <View style={styles.upcomingSipSection}>
      <Text style={styles.upcomingSipTitle}>Upcoming SIPs</Text>
      {validSips.length === 0 ? (
        <Text style={{ textAlign: 'center', margin: 20, color: '#6B7280' }}>
          No upcoming SIPs scheduled.
        </Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund Name</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Next SIP Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Amount</Text>
          </View>
          {validSips.map((sip: any, index: number) => (
            <View 
              key={index} 
              style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}
            >
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {sip.fundName || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {sip.nextDate || 'N/A'}
              </Text>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>
                Rs.{(sip.amount || 0).toLocaleString('en-IN')}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};