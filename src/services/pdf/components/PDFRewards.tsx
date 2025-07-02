import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFRewards = ({ rewards }: any) => (
  <View style={styles.rewardsSection}>
    <Text style={styles.rewardsTitle}>Rewards Summary</Text>
    {/* Cards for total, bonus, etc. and transaction list */}
  </View>
);