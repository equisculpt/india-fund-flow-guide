import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFRewards = ({ rewards }: any) => {
  const rewardsData = rewards || {};
  const totalEarned = rewardsData.totalEarned || 0;
  const referralBonus = rewardsData.referralBonus || 0;
  const loyaltyPoints = rewardsData.loyaltyPoints || 0;
  const cashback = rewardsData.cashback || 0;

  return (
    <View style={styles.rewardsSection}>
      <Text style={styles.rewardsTitle}>Rewards Summary</Text>
      
      <View style={styles.glanceGrid}>
        <View style={[styles.glanceCard, styles.glanceCardSuccess]}>
          <Text style={styles.glanceIcon}>Rs</Text>
          <Text style={styles.glanceLabel}>Total Earned</Text>
          <Text style={styles.glanceValue}>
            Rs.{totalEarned.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.glanceSubtext}>All Time</Text>
        </View>
        
        <View style={[styles.glanceCard, styles.glanceCardPrimary]}>
          <Text style={styles.glanceIcon}>REF</Text>
          <Text style={styles.glanceLabel}>Referral Bonus</Text>
          <Text style={styles.glanceValue}>
            Rs.{referralBonus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.glanceSubtext}>From Referrals</Text>
        </View>
        
        <View style={[styles.glanceCard, styles.glanceCardInfo]}>
          <Text style={styles.glanceIcon}>PTS</Text>
          <Text style={styles.glanceLabel}>Loyalty Points</Text>
          <Text style={styles.glanceValue}>{loyaltyPoints}</Text>
          <Text style={styles.glanceSubtext}>Points Balance</Text>
        </View>
        
        <View style={[styles.glanceCard, styles.glanceCardSuccess]}>
          <Text style={styles.glanceIcon}>CB</Text>
          <Text style={styles.glanceLabel}>Cashback</Text>
          <Text style={styles.glanceValue}>
            Rs.{cashback.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={styles.glanceSubtext}>This Month</Text>
        </View>
      </View>
    </View>
  );
};