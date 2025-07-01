
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFRewardsSectionProps {
  rewards: StatementData['rewards'];
}

export const PDFRewardsSection: React.FC<PDFRewardsSectionProps> = ({ rewards }) => {
  if (!rewards) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Rewards & Loyalty Summary
        {rewards.tier && (
          <Text style={[styles.sectionTitle, { fontSize: 16, color: '#FFB800' }]}>
            {' '}• {rewards.tier} Tier
          </Text>
        )}
      </Text>
      
      {/* Rewards Summary Cards */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Earned</Text>
          <Text style={[styles.summaryValue, { color: '#00B47B' }]}>
            ₹{(rewards.totalEarned || 0).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Lifetime Rewards</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Referral Bonus</Text>
          <Text style={[styles.summaryValue, { color: '#2E7DFF' }]}>
            ₹{(rewards.referralBonus || 0).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Friend Referrals</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Loyalty Points</Text>
          <Text style={[styles.summaryValue, { color: '#FFB800' }]}>
            {(rewards.loyaltyPoints || 0).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Points Earned</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cashback</Text>
          <Text style={[styles.summaryValue, { color: '#00B47B' }]}>
            ₹{(rewards.cashback || 0).toLocaleString('en-IN')}
          </Text>
          <Text style={styles.summarySubtext}>Investment Cashback</Text>
        </View>
      </View>

      {/* Pending Payouts */}
      {rewards.pendingPayouts && rewards.pendingPayouts > 0 && (
        <View style={[styles.glanceCard, { marginTop: 25, backgroundColor: '#FEF3C7', borderColor: '#FFB800' }]}>
          <Text style={styles.glanceLabel}>Pending Payouts</Text>
          <Text style={[styles.glanceValue, { color: '#FFB800' }]}>
            ₹{rewards.pendingPayouts.toLocaleString('en-IN')}
          </Text>
          <Text style={styles.glanceSubtext}>Will be credited soon</Text>
        </View>
      )}

      {/* Recent Transactions */}
      {rewards.recentTransactions && Array.isArray(rewards.recentTransactions) && rewards.recentTransactions.length > 0 && (
        <View style={[styles.tableContainer, { marginTop: 30 }]}>
          <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 15 }]}>
            Recent Reward Transactions
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Date</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Type</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Amount</Text>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Description</Text>
          </View>
          {rewards.recentTransactions.map((transaction, index) => (
            <View key={`transaction-${index}`} style={index % 2 === 1 ? styles.tableRowAlternate : styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>{transaction.date || 'N/A'}</Text>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>{transaction.type || 'N/A'}</Text>
              <Text style={[styles.tableCellGreen, { flex: 1 }]}>
                +₹{(transaction.amount || 0).toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>{transaction.description || 'N/A'}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Last Credited Info */}
      {rewards.lastCreditedDate && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={[styles.tableCell, { color: '#6B7280' }]}>
            Last reward credited on: {rewards.lastCreditedDate}
          </Text>
        </View>
      )}
    </View>
  );
};
