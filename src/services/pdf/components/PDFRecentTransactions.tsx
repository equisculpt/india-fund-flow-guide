import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFRecentTransactions = ({ transactions }: any) => (
  <View style={styles.transactionSection}>
    <Text style={styles.transactionTitle}>Recent Transactions (Last 5)</Text>
    {/* Table with 5 rows max, headers, rupee symbol, etc. */}
  </View>
);