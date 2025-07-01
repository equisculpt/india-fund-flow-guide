
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => (
  <View style={styles.portfolioGlance}>
    <View style={styles.glanceHeader}>
      <Text style={styles.glanceTitle}>Portfolio at a Glance</Text>
      <View style={styles.aiBadge}>
        <Text style={styles.aiBadgeText}>AI POWERED</Text>
      </View>
    </View>

    <View style={styles.glanceGrid}>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Invested</Text>
        <Text style={styles.glanceValue}>₹{portfolio.totalInvested.toLocaleString('en-IN')}</Text>
        <Text style={styles.glanceSubtext}>Principal Amount</Text>
      </View>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Current Value</Text>
        <Text style={styles.glanceValue}>₹{portfolio.currentValue.toLocaleString('en-IN')}</Text>
        <Text style={styles.glanceSubtext}>Market Value</Text>
      </View>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>Total Returns</Text>
        <Text style={[
          styles.glanceValue, 
          { color: portfolio.totalReturns >= 0 ? '#00B47B' : '#EF4444' }
        ]}>
          {portfolio.totalReturns >= 0 ? '+' : ''}₹{portfolio.totalReturns.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.glanceSubtext}>
          {portfolio.returnsPercentage >= 0 ? '+' : ''}{portfolio.returnsPercentage.toFixed(2)}%
        </Text>
      </View>
      <View style={styles.glanceCard}>
        <Text style={styles.glanceLabel}>XIRR</Text>
        <Text style={[
          styles.glanceValue, 
          { color: portfolio.xirr >= 0 ? '#00B47B' : '#EF4444' }
        ]}>
          {portfolio.xirr >= 0 ? '+' : ''}{portfolio.xirr.toFixed(2)}%
        </Text>
        <Text style={styles.glanceSubtext}>Annualized Return</Text>
      </View>
    </View>

    <View style={styles.xirrExplanation}>
      <Text style={styles.xirrNote}>
        XIRR (Extended Internal Rate of Return) calculates your annualized return considering the timing and amount of each investment, 
        providing the most accurate measure of your portfolio performance.
      </Text>
    </View>

    {portfolio.goalName && (
      <View style={styles.goalProgress}>
        <Text style={styles.goalProgressTitle}>Goal Progress: {portfolio.goalName}</Text>
        <View style={styles.goalProgressContent}>
          <View style={styles.goalProgressItem}>
            <Text style={styles.goalProgressLabel}>Target Amount</Text>
            <Text style={styles.goalProgressValue}>₹{portfolio.goalTarget?.toLocaleString('en-IN') || 'Not Set'}</Text>
          </View>
          <View style={styles.goalProgressItem}>
            <Text style={styles.goalProgressLabel}>Goal Status</Text>
            <Text style={styles.goalProgressValue}>In Progress</Text>
          </View>
          <View style={styles.goalProgressItem}>
            <Text style={styles.goalProgressLabel}>Achievement</Text>
            <Text style={styles.goalProgressValue}>
              {portfolio.goalAchieved ? `₹${portfolio.goalAchieved.toLocaleString('en-IN')}` : '₹0'}
            </Text>
          </View>
        </View>
      </View>
    )}
  </View>
);
