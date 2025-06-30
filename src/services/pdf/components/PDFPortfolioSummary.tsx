
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => (
  <View style={styles.portfolioGlance}>
    <Text style={styles.glanceTitle}>📊 Portfolio At a Glance</Text>
    
    <View style={styles.glanceGrid}>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Invested</Text>
        <Text style={styles.glanceValue}>
          ₹{portfolio.totalInvested.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Current Value</Text>
        <Text style={styles.glanceValue}>
          ₹{portfolio.currentValue.toLocaleString()}
        </Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Returns</Text>
        <Text style={styles.glanceValue}>
          ₹{portfolio.totalReturns.toLocaleString()}
        </Text>
        <Text style={styles.glanceSubtext}>
          +{portfolio.returnsPercentage.toFixed(2)}%
        </Text>
      </View>
      
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Portfolio XIRR</Text>
        <Text style={styles.glanceValue}>
          {portfolio.xirr.toFixed(2)}%
        </Text>
        <Text style={styles.glanceSubtext}>
          Annualized
        </Text>
      </View>
    </View>

    {/* Performance Section */}
    <View style={styles.performanceSection}>
      <Text style={styles.performanceTitle}>🎯 Performance Highlights</Text>
      <View style={styles.performanceGrid}>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Absolute Return</Text>
          <Text style={styles.performanceValue}>
            +{portfolio.returnsPercentage.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Annualized Return</Text>
          <Text style={styles.performanceValue}>
            {portfolio.xirr.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Portfolio Health</Text>
          <Text style={styles.performanceValue}>
            {portfolio.xirr > 15 ? 'Excellent' : portfolio.xirr > 12 ? 'Good' : 'Average'}
          </Text>
        </View>
        <View style={styles.performanceItem}>
          <Text style={styles.performanceLabel}>Risk Level</Text>
          <Text style={styles.performanceValue}>
            {portfolio.xirr > 18 ? 'High' : portfolio.xirr > 12 ? 'Moderate' : 'Low'}
          </Text>
        </View>
      </View>
    </View>
  </View>
);
