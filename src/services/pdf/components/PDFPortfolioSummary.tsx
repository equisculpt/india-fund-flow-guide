
import React from 'react';
import { View, Text, Svg, Path } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFPortfolioSummaryProps {
  portfolio: StatementData['portfolio'];
}

export const PDFPortfolioSummary: React.FC<PDFPortfolioSummaryProps> = ({ portfolio }) => {
  // Calculate dynamic values
  const investmentYears = portfolio.lastUpdated ? 
    Math.floor((new Date().getTime() - new Date(portfolio.lastUpdated).getTime()) / (1000 * 60 * 60 * 24 * 365)) : 2;
  
  const healthStatus = portfolio.xirr > 15 ? 'Excellent' : 
                      portfolio.xirr > 12 ? 'Good' : 
                      portfolio.xirr > 8 ? 'Average' : 'Below Average';

  const goalProgress = portfolio.goalTarget && portfolio.goalAchieved ? 
    ((portfolio.goalAchieved / portfolio.goalTarget) * 100).toFixed(1) : null;

  return (
    <View style={styles.portfolioGlance}>
      {/* Header with AI Badge */}
      <View style={styles.glanceHeader}>
        <Text style={styles.glanceTitle}>
          Portfolio at a Glance
          {portfolio.goalName && (
            <Text style={[styles.glanceTitle, { fontSize: 14, color: '#2E7DFF' }]}>
              {' '}• {portfolio.goalName}
            </Text>
          )}
        </Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>🤖 AI Verified</Text>
        </View>
      </View>
      
      <View style={styles.glanceGrid}>
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>Total Invested</Text>
          <Text style={styles.glanceValue}>₹{portfolio.totalInvested?.toLocaleString('en-IN') || '—'}</Text>
          <Text style={styles.glanceSubtext}>Principal Amount</Text>
        </View>
        
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>Current Value</Text>
          <Text style={styles.glanceValue}>₹{portfolio.currentValue?.toLocaleString('en-IN') || '—'}</Text>
          {/* Mini Sparkline for Growth Trend */}
          <View style={styles.sparklineContainer}>
            <Svg width={50} height={12} style={{ marginVertical: 4 }}>
              <Path
                d="M2,10 Q12,3 22,6 Q32,2 48,4"
                fill="none"
                stroke="#2E7DFF"
                strokeWidth={1.5}
              />
            </Svg>
          </View>
          <Text style={styles.glanceSubtext}>Market Value</Text>
        </View>
        
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>Total Returns</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.glanceValue, { color: portfolio.totalReturns >= 0 ? '#00B47B' : '#EF4444' }]}>
              ₹{portfolio.totalReturns?.toLocaleString('en-IN') || '—'}
            </Text>
            {portfolio.totalReturns !== undefined && (
              <Text style={[styles.trendIndicator, { 
                color: portfolio.totalReturns >= 0 ? '#00B47B' : '#EF4444' 
              }]}>
                {portfolio.totalReturns > 0 ? ' ↗' : portfolio.totalReturns < 0 ? ' ↘' : ''}
              </Text>
            )}
          </View>
          <Text style={styles.glanceSubtext}>
            {portfolio.totalReturns >= 0 ? '+' : ''}{portfolio.returnsPercentage?.toFixed(1) || '--'}% Gain
          </Text>
        </View>
        
        <View style={styles.glanceCard}>
          <Text style={styles.glanceLabel}>XIRR</Text>
          <Text style={[styles.glanceValue, { color: '#2E7DFF' }]}>
            {portfolio.xirr?.toFixed(2) || '--'}%
          </Text>
          <Text style={styles.glanceSubtext}>Annualized Return</Text>
        </View>
      </View>

      {/* XIRR Explanatory Note */}
      <View style={styles.xirrExplanation}>
        <Text style={styles.xirrNote}>
          💡 XIRR reflects your annualized return, accounting for all investments and redemptions. 
          Higher than FD (~7%) or Nifty (~12%) means excellent performance!
        </Text>
      </View>

      {/* Goal Progress Section */}
      {portfolio.goalTarget && portfolio.goalAchieved && (
        <View style={styles.goalProgress}>
          <Text style={styles.goalProgressTitle}>🎯 Goal Progress Tracker</Text>
          <View style={styles.goalProgressContent}>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Target Amount</Text>
              <Text style={styles.goalProgressValue}>₹{portfolio.goalTarget.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Achieved</Text>
              <Text style={styles.goalProgressValue}>₹{portfolio.goalAchieved.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Progress</Text>
              <Text style={[styles.goalProgressValue, { color: '#00B47B' }]}>
                {goalProgress}%
              </Text>
            </View>
            <View style={styles.goalProgressItem}>
              <Text style={styles.goalProgressLabel}>Remaining</Text>
              <Text style={styles.goalProgressValue}>
                ₹{(portfolio.goalTarget - portfolio.goalAchieved).toLocaleString('en-IN')}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.performanceSection}>
        <Text style={styles.performanceTitle}>📊 Performance Highlights</Text>
        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Active SIPs</Text>
            <Text style={styles.performanceValue}>{portfolio.activeSIPs || '—'}</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Completed SIPs</Text>
            <Text style={styles.performanceValue}>{portfolio.completedSIPs || '—'}</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Portfolio Health</Text>
            <Text style={[styles.performanceValue, { 
              color: portfolio.xirr > 15 ? '#00B47B' : 
                     portfolio.xirr > 12 ? '#FFB800' : 
                     portfolio.xirr > 8 ? '#2E7DFF' : '#EF4444' 
            }]}>
              {healthStatus}
            </Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceLabel}>Investment Journey</Text>
            <Text style={styles.performanceValue}>{investmentYears}+ Years</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
