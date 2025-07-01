
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => (
  <View style={styles.portfolioGlance}>
    <Text style={styles.glanceTitle}>Portfolio at a Glance</Text>
    
    <View style={styles.glanceGrid}>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Invested</Text>
        <Text style={styles.glanceValue}>₹{portfolio.totalInvested.toLocaleString()}</Text>
        <Text style={styles.glanceSubtext}>Principal Amount</Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Current Value</Text>
        <Text style={styles.glanceValue}>₹{portfolio.currentValue.toLocaleString()}</Text>
        <Text style={styles.glanceSubtext}>Market Value</Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Returns</Text>
        <Text style={styles.glanceValue}>₹{portfolio.totalReturns.toLocaleString()}</Text>
        <Text style={styles.glanceSubtext}>{portfolio.returnsPercentage.toFixed(1)}% Gain</Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>XIRR</Text>
        <Text style={styles.glanceValue}>{portfolio.xirr.toFixed(2)}%</Text>
        <Text style={styles.glanceSubtext}>Annualized Return</Text>
      </View>
    </View>

    <View style={styles.performanceSection}>
      <Text style={styles.performanceTitle}>Performance Highlights</Text>
      <View style={styles.performanceGrid}>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Active SIPs</Text>
          <Text style={styles.performanceValue}>{portfolio.activeSIPs}</Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Investment Journey</Text>
          <Text style={styles.performanceValue}>2+ Years</Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Portfolio Health</Text>
          <Text style={styles.performanceValue}>Excellent</Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Goal Progress</Text>
          <Text style={styles.performanceValue}>78%</Text>
        </View>
      </View>
    </View>
  </View>
);
