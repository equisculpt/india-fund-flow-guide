import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';
import { PDFDataSanitizer } from '../utils/dataSanitizer';

interface AIInsightSectionProps {
  portfolio: StatementData['portfolio'];
}

export const AIInsightSection: React.FC<AIInsightSectionProps> = ({ portfolio }) => {
  const generateInsight = () => {
    const xirr = portfolio?.xirr || 0;
    const totalInvested = portfolio?.totalInvested || 0;
    
    if (xirr > 15) {
      return {
        title: "Excellent Performance Detected",
        insight: 'Your portfolio is delivering outstanding returns with ' + xirr.toFixed(1) + '% XIRR, placing you in the top 20% of investors on our platform.',
        recommendation: "Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.",
        highlight: 'You are beating inflation by ' + (xirr - 6).toFixed(1) + '% annually!',
        percentile: "Top 20%",
        percentileValue: 80
      };
    } else if (xirr > 12) {
      return {
        title: "Strong Portfolio Performance",
        insight: 'Your ' + xirr.toFixed(1) + '% XIRR shows good investment discipline and fund selection across your Rs.' + totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 }) + ' investment.',
        recommendation: "Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.",
        highlight: 'Your returns are ' + (xirr - 10).toFixed(1) + '% above market average!',
        percentile: "Top 35%",
        percentileValue: 65
      };
    } else {
      return {
        title: "Growth Opportunity Identified",
        insight: 'Your current ' + xirr.toFixed(1) + '% XIRR indicates potential for optimization in fund selection and asset allocation.',
        recommendation: "Consider reviewing your fund choices and increasing exposure to growth-oriented equity funds for better long-term returns.",
        highlight: 'Small changes could boost your returns by 2-4% annually.',
        percentile: "Top 60%",
        percentileValue: 40
      };
    }
  };

  const insight = generateInsight();
  const sanitizedInsight = PDFDataSanitizer.sanitizeAIInsight(insight);

  return (
    <View style={styles.aiInsight}>
      <View style={styles.aiInsightHeader}>
        <View style={styles.aiInsightIcon}>
          <Text style={styles.aiInsightIconText}>AI</Text>
        </View>
        <Text style={styles.aiInsightTitle}>AI-Powered Portfolio Analysis</Text>
      </View>
      
      <View style={styles.aiInsightContent}>
        <Text style={{
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 20,
          color: '#1A1F36'
        }}>
          {sanitizedInsight.title}
        </Text>
        
        <Text style={styles.aiInsightText}>
          {sanitizedInsight.insight}
        </Text>
        
        <Text style={[styles.aiInsightText, { marginTop: 18 }]}>
          <Text style={{ fontWeight: 700 }}>Next Best Action: </Text>
          {sanitizedInsight.recommendation}
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
          <Text style={{ marginRight: 10, color: '#00B47B', fontSize: 16 }}>●</Text>
          <Text style={styles.aiInsightHighlight}>
            Key Insight: {sanitizedInsight.highlight}
          </Text>
        </View>
        
        <View style={styles.percentileBadge}>
          <Text style={styles.percentileBadgeText}>
            Your XIRR Performance: {sanitizedInsight.percentile}
          </Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: sanitizedInsight.percentileValue + '%' }]} />
          </View>
        </View>
      </View>
    </View>
  );
};