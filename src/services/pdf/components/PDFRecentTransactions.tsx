import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFRecentTransactions = ({ transactions }: any) => {
  const validTransactions = Array.isArray(transactions) ? transactions.slice(0, 5) : [];

  return (
    <View style={styles.transactionSection}>
      <Text style={styles.transactionTitle}>Recent Transactions (Last 5)</Text>
      {validTransactions.length === 0 ? (
        <Text style={{ textAlign: 'center', margin: 20, color: '#6B7280' }}>
          No recent transactions available.
        </Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Fund</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Type</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Amount</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Units</Text>
          </View>
          {validTransactions.map((transaction: any, index: number) => (
            <View 
              key={index} 
              style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {transaction.date || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {transaction.fundName || 'N/A'}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {transaction.type || 'N/A'}
              </Text>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>
                Rs.{(transaction.amount || 0).toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {(transaction.units || 0).toFixed(3)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};