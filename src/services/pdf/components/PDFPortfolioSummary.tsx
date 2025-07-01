
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => {
  // Ensure all required numeric values have defaults
  const totalInvested = portfolio.totalInvested || 0;
  const currentValue = portfolio.currentValue || 0;
  const totalReturns = portfolio.totalReturns || 0;
  const returnsPercentage = portfolio.returnsPercentage || 0;
  const xirr = portfolio.xirr || 0;
  const goalTarget = portfolio.goalTarget || 0;
  const goalAchieved = portfolio.goalAchieved || 0;

  return (
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
          <Text style={styles.glanceValue}>₹{totalInvested.toLocaleString('en-IN')}</Text>
          <Text style={styles.glanceSubtext}>Principal Amount</Text>
        </View>
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>Current Value</Text>
          <Text style={styles.glanceValue}>₹{currentValue.toLocaleString('en-IN')}</Text>
          <Text style={styles.glanceSubtext}>Market Value</Text>
        </View>
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>Total Returns</Text>
          <Text style={[
            styles.glanceValue, 
            { color: totalReturns >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.glanceSubtext}>
            {returnsPercentage >= 0 ? '+' : ''}{returnsPercentage.toFixed(2)}%
          </Text>
        </View>
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>XIRR</Text>
          <Text style={[
            styles.glanceValue, 
            { color: xirr >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {xirr >= 0 ? '+' : ''}{xirr.toFixed(2)}%
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
              <Text style={styles.goalProgressValue}>
                {goalTarget > 0 ? `₹${goalTarget.toLocaleString('en-IN')}` : 'Not Set'}
              </Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Goal Status</Text>
              <Text style={styles.goalProgressValue}>In Progress</Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Achievement</Text>
              <Text style={styles.goalProgressValue}>
                ₹{goalAchieved.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
