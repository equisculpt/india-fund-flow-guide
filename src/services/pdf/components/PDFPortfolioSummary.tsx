
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
        <Text style={styles.glanceTitle}>Portfolio Dashboard</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>AI POWERED</Text>
        </View>
      </View>

      {/* Horizontal Dashboard Cards */}
      <View style={styles.glanceGrid}>
        <View style={[styles.glanceCard, styles.glanceCardPrimary]}>
          <Text style={styles.glanceLabel}>Total Invested</Text>
          <Text style={styles.glanceValue}>Rs.{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
          <Text style={styles.glanceSubtext}>Principal Amount</Text>
        </View>
        
        <View style={[styles.glanceCard, styles.glanceCardSuccess]}>
          <Text style={styles.glanceLabel}>Current Value</Text>
          <Text style={styles.glanceValue}>Rs.{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</Text>
          <Text style={styles.glanceSubtext}>Market Value</Text>
        </View>
        
        <View style={[styles.glanceCard, totalReturns >= 0 ? styles.glanceCardSuccess : styles.glanceCardWarning]}>
          <Text style={styles.glanceLabel}>Total Returns</Text>
          <Text style={[
            styles.glanceValue, 
            { color: totalReturns >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {totalReturns >= 0 ? '+' : ''}Rs.{totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={[
            styles.glanceSubtext,
            { color: totalReturns >= 0 ? '#00B47B' : '#EF4444', fontWeight: 'bold' }
          ]}>
            {returnsPercentage >= 0 ? '+' : ''}{returnsPercentage.toFixed(2)}%
          </Text>
        </View>
        
        <View style={[styles.glanceCard, xirr >= 0 ? styles.glanceCardSuccess : styles.glanceCardWarning]}>
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

      {/* Enhanced XIRR Explanation */}
      <View style={styles.xirrExplanation}>
        <Text style={styles.xirrNote}>
          NOTE: XIRR (Extended Internal Rate of Return) calculates your annualized return considering the timing and amount of each investment, 
          providing the most accurate measure of your portfolio performance.
        </Text>
      </View>

      {/* Goal Progress Section - Enhanced */}
      {portfolio.goalName && (
        <View style={styles.goalProgress}>
          <Text style={styles.goalProgressTitle}>Goal Progress: {portfolio.goalName}</Text>
          <View style={styles.goalProgressContent}>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Target Amount</Text>
              <Text style={styles.goalProgressValue}>
                 {goalTarget > 0 ? 'Rs.' + goalTarget.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : 'Not Set'}
              </Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Current Achievement</Text>
              <Text style={styles.goalProgressValue}>
                Rs.{goalAchieved.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Progress</Text>
              <Text style={[styles.goalProgressValue, { color: '#00B47B' }]}>
                {goalTarget > 0 ? `${((goalAchieved / goalTarget) * 100).toFixed(1)}%` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
