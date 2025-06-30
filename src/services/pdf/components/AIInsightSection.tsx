
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface AIInsightSectionProps {
  portfolio: StatementData['portfolio'];
}

export const AIInsightSection: React.FC<AIInsightSectionProps> = ({ portfolio }) => (
  <View style={styles.aiInsight}>
    <Text style={styles.aiInsightTitle}>🤖 AI PORTFOLIO INSIGHT</Text>
    <Text style={styles.aiInsightText}>
      Your portfolio is performing well with an XIRR of {portfolio.xirr.toFixed(2)}%. 
      You're in the top 25% of SIP Brewery investors! Keep up the consistent investing approach.
    </Text>
  </View>
);
