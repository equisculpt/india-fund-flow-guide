
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>PORTFOLIO SUMMARY</Text>
    
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={[styles.summaryCard, { marginRight: 10, flex: 1 }]}>
        <Text style={styles.summaryTitle}>Total Invested</Text>
        <Text style={styles.summaryValue}>
          ₹{portfolio.totalInvested.toLocaleString()}
        </Text>
      </View>
      <View style={[styles.summaryCard, { marginLeft: 10, flex: 1 }]}>
        <Text style={styles.summaryTitle}>Current Value</Text>
        <Text style={styles.summaryValue}>
          ₹{portfolio.currentValue.toLocaleString()}
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={[styles.summaryCard, { marginRight: 10, flex: 1 }]}>
        <Text style={styles.summaryTitle}>Total Returns</Text>
        <Text style={styles.summaryValue}>
          ₹{portfolio.totalReturns.toLocaleString()} 
          ({portfolio.returnsPercentage.toFixed(2)}%)
        </Text>
      </View>
      <View style={[styles.summaryCard, { marginLeft: 10, flex: 1 }]}>
        <Text style={styles.summaryTitle}>XIRR</Text>
        <Text style={styles.summaryValue}>
          {portfolio.xirr.toFixed(2)}%
        </Text>
      </View>
    </View>
  </View>
);
