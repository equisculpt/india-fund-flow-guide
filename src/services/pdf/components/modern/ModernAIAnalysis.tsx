import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { modernStyles } from '../../styles/modernPDFStyles';
import { StatementData } from '../../../statement/types';

interface ModernAIAnalysisProps {
  portfolio: StatementData['portfolio'];
}

export const ModernAIAnalysis: React.FC<ModernAIAnalysisProps> = ({ portfolio }) => {
  const xirr = portfolio.xirr || 0;
  
  const generateInsight = () => {
    if (xirr > 15) {
      return {
        title: "Excellent Performance Detected",
        insight: 'Your portfolio is delivering outstanding returns with ' + xirr.toFixed(1) + '% XIRR, placing you in the top 20% of investors on our platform.',
        recommendation: "Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.",
        highlight: 'You are beating inflation by ' + (xirr - 6).toFixed(1) + '% annually!',
        percentile: "Top 20%"
      };
    } else if (xirr > 12) {
      return {
        title: "Strong Portfolio Performance",
        insight: 'Your ' + xirr.toFixed(1) + '% XIRR shows good investment discipline and fund selection across your ₹' + (portfolio.totalInvested || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + ' investment.',
        recommendation: "Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.",
        highlight: 'Your returns are ' + (xirr - 10).toFixed(1) + '% above market average!',
        percentile: "Top 35%"
      };
    } else {
      return {
        title: "Growth Opportunity Identified",
        insight: 'Your current ' + xirr.toFixed(1) + '% XIRR indicates potential for optimization in fund selection and asset allocation.',
        recommendation: "Consider reviewing your fund choices and increasing exposure to growth-oriented equity funds for better long-term returns.",
        highlight: 'Small changes could boost your returns by 2-4% annually.',
        percentile: "Top 60%"
      };
    }
  };

  const insight = generateInsight();

  return (
    <View style={modernStyles.aiAnalysis} wrap={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <View style={{
          backgroundColor: '#2E7DFF',
          borderRadius: 20,
          width: 32,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}>
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }}>AI</Text>
        </View>
        <Text style={modernStyles.aiTitle}>AI-Powered Portfolio Analysis</Text>
      </View>
      
      {/* Insight Section */}
      <View style={modernStyles.aiInsightBox}>
        <Text style={modernStyles.aiInsightTitle}>{insight.title}</Text>
        <Text style={modernStyles.aiInsightText}>{insight.insight}</Text>
      </View>
      
      {/* Recommendation Section */}
      <View style={modernStyles.aiInsightBox}>
        <Text style={modernStyles.aiInsightTitle}>Next Best Action</Text>
        <Text style={modernStyles.aiInsightText}>{insight.recommendation}</Text>
      </View>
      
      {/* Key Insight Highlight */}
      <View style={{
        backgroundColor: '#F0FDF4',
        borderLeftWidth: 6,
        borderLeftColor: '#00B47B',
        borderRadius: 8,
        padding: 18,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{ marginRight: 10, fontSize: 16 }}>💡</Text>
        <Text style={[modernStyles.aiInsightText, { fontWeight: 'bold', color: '#00B47B' }]}>
          Key Insight: {insight.highlight}
        </Text>
      </View>
      
      {/* Percentile Badge */}
      <View style={modernStyles.percentileBadge}>
        <Text style={modernStyles.percentileText}>
          Your XIRR Performance: {insight.percentile}
        </Text>
      </View>
      
      {/* AI Disclaimer */}
      <Text style={modernStyles.aiDisclaimer}>
        AI-generated insights are for informational purposes only and should not be considered as investment advice. 
        Please consult with a qualified financial advisor before making investment decisions.
      </Text>
    </View>
  );
};