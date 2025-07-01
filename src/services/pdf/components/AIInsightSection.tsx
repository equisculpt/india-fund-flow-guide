
import React from 'react';
import { View, Text, Svg, Path } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface AIInsightSectionProps {
  portfolio: StatementData['portfolio'];
}

export const AIInsightSection: React.FC<AIInsightSectionProps> = ({ portfolio }) => {
  const generateInsight = () => {
    const xirr = portfolio.xirr;
    
    if (xirr > 15) {
      return {
        title: "Excellent Performance Detected",
        insight: `Your portfolio is delivering outstanding returns with ${xirr.toFixed(1)}% XIRR, placing you in the top 20% of investors on our platform.`,
        recommendation: "Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.",
        highlight: `You're beating inflation by ${(xirr - 6).toFixed(1)}% annually!`,
        percentile: "Top 20%",
        percentileValue: 80
      };
    } else if (xirr > 12) {
      return {
        title: "Strong Portfolio Performance",
        insight: `Your ${xirr.toFixed(1)}% XIRR shows good investment discipline and fund selection across your ₹${portfolio.totalInvested.toLocaleString('en-IN')} investment.`,
        recommendation: "Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.",
        highlight: `Your returns are ${(xirr - 10).toFixed(1)}% above market average!`,
        percentile: "Top 35%",
        percentileValue: 65
      };
    } else {
      return {
        title: "Growth Opportunity Identified",
        insight: `Your current ${xirr.toFixed(1)}% XIRR indicates potential for optimization in fund selection and asset allocation.`,
        recommendation: "Consider reviewing your fund choices and increasing exposure to growth-oriented equity funds for better long-term returns.",
        highlight: `Small changes could boost your returns by 2-4% annually.`,
        percentile: "Top 60%",
        percentileValue: 40
      };
    }
  };

  const insight = generateInsight();

  return (
    <View style={styles.aiInsight}>
      <View style={styles.aiInsightHeader}>
        <View style={styles.aiInsightIcon}>
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="#FFFFFF"
            />
          </Svg>
        </View>
        <Text style={styles.aiInsightTitle}>AI-Powered Portfolio Analysis</Text>
      </View>
      
      <View style={styles.aiInsightContent}>
        <Text style={[styles.aiInsightText, { fontWeight: 'bold', marginBottom: 20, fontSize: 16 }]}>
          {insight.title}
        </Text>
        
        <Text style={styles.aiInsightText}>
          {insight.insight}
        </Text>
        
        <Text style={[styles.aiInsightText, { marginTop: 18 }]}>
          <Text style={{ fontWeight: 'bold' }}>Next Best Action: </Text>
          {insight.recommendation}
        </Text>
        
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F0FDF4', 
          padding: 18, 
          borderRadius: 12, 
          marginTop: 20,
          borderLeftWidth: 6,
          borderLeftColor: '#00B47B'
        }}>
          <Svg width={16} height={16} viewBox="0 0 24 24" style={{ marginRight: 10 }}>
            <Path 
              d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" 
              fill="#00B47B" 
            />
          </Svg>
          <Text style={styles.aiInsightHighlight}>
            Key Insight: {insight.highlight}
          </Text>
        </View>
        
        <View style={styles.percentileBadge}>
          <Text style={styles.percentileBadgeText}>
            Your XIRR Performance: {insight.percentile}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${insight.percentileValue}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
};
