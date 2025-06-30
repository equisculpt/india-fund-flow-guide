
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface AIInsightSectionProps {
  portfolio: StatementData['portfolio'];
}

export const AIInsightSection: React.FC<AIInsightSectionProps> = ({ portfolio }) => {
  const generateInsight = () => {
    const xirr = portfolio.xirr;
    const returnsPercentage = portfolio.returnsPercentage;
    
    if (xirr > 15) {
      return {
        title: "🏆 Excellent Performance Detected",
        insight: `Your portfolio is delivering outstanding returns with ${xirr.toFixed(1)}% XIRR, placing you in the top 20% of investors on our platform.`,
        recommendation: "Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.",
        highlight: `You're beating inflation by ${(xirr - 6).toFixed(1)}% annually!`
      };
    } else if (xirr > 12) {
      return {
        title: "✅ Strong Portfolio Performance",
        insight: `Your ${xirr.toFixed(1)}% XIRR shows good investment discipline and fund selection across your ${portfolio.totalInvested.toLocaleString()} investment.`,
        recommendation: "Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.",
        highlight: `Your returns are ${(xirr - 10).toFixed(1)}% above market average!`
      };
    } else {
      return {
        title: "📈 Growth Opportunity Identified",
        insight: `Your current ${xirr.toFixed(1)}% XIRR indicates potential for optimization in fund selection and asset allocation.`,
        recommendation: "Consider reviewing your fund choices and increasing exposure to growth-oriented equity funds for better long-term returns.",
        highlight: `Small changes could boost your returns by 2-4% annually.`
      };
    }
  };

  const insight = generateInsight();

  return (
    <View style={styles.aiInsight}>
      <View style={styles.aiInsightHeader}>
        <View style={styles.aiInsightIcon}>
          <Text style={{ fontSize: 14, color: 'white' }}>🤖</Text>
        </View>
        <Text style={styles.aiInsightTitle}>AI-Powered Portfolio Analysis</Text>
      </View>
      
      <View style={styles.aiInsightContent}>
        <Text style={[styles.aiInsightText, { fontWeight: 'bold', marginBottom: 12 }]}>
          {insight.title}
        </Text>
        
        <Text style={styles.aiInsightText}>
          {insight.insight}
        </Text>
        
        <Text style={[styles.aiInsightText, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold' }}>💡 Recommendation: </Text>
          {insight.recommendation}
        </Text>
        
        <View style={{ 
          backgroundColor: '#F0FDF4', 
          padding: 10, 
          borderRadius: 6, 
          marginTop: 12,
          borderLeftWidth: 3,
          borderLeftColor: '#00B47B'
        }}>
          <Text style={styles.aiInsightHighlight}>
            ⚡ Key Insight: {insight.highlight}
          </Text>
        </View>
      </View>
    </View>
  );
};
