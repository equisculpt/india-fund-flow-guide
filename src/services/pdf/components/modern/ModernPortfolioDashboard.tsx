import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { modernStyles } from '../../styles/modernPDFStyles';
import { StatementData } from '../../../statement/types';

interface ModernPortfolioDashboardProps {
  portfolio: StatementData['portfolio'];
}

export const ModernPortfolioDashboard: React.FC<ModernPortfolioDashboardProps> = ({ portfolio }) => {
  const totalInvested = portfolio.totalInvested || 0;
  const currentValue = portfolio.currentValue || 0;
  const totalReturns = portfolio.totalReturns || 0;
  const xirr = portfolio.xirr || 0;
  const returnsPercentage = portfolio.returnsPercentage || 0;

  return (
    <View style={modernStyles.portfolioDashboard} wrap={false}>
      <Text style={modernStyles.dashboardTitle}>Portfolio at a Glance</Text>
      
      <View style={modernStyles.dashboardCards}>
        {/* Total Invested Card */}
        <View style={[modernStyles.dashboardCard, modernStyles.cardPrimary]}>
          <Text style={modernStyles.cardIcon}>💰</Text>
          <Text style={modernStyles.cardValue}>
            ₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={modernStyles.cardLabel}>Total Invested</Text>
          <Text style={[modernStyles.cardSubtext, { color: '#6B7280' }]}>
            Principal Amount
          </Text>
        </View>
        
        {/* Current Value Card */}
        <View style={[modernStyles.dashboardCard, modernStyles.cardSuccess]}>
          <Text style={modernStyles.cardIcon}>📈</Text>
          <Text style={modernStyles.cardValue}>
            ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={modernStyles.cardLabel}>Current Value</Text>
          <Text style={[modernStyles.cardSubtext, { color: '#6B7280' }]}>
            Market Value
          </Text>
        </View>
        
        {/* Total Returns Card */}
        <View style={[modernStyles.dashboardCard, modernStyles.cardSuccess]}>
          <Text style={modernStyles.cardIcon}>{totalReturns >= 0 ? '🎉' : '📉'}</Text>
          <Text style={[
            modernStyles.cardValue,
            { color: totalReturns >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={modernStyles.cardLabel}>Total Returns</Text>
          <Text style={[
            modernStyles.cardSubtext,
            { color: totalReturns >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {returnsPercentage >= 0 ? '+' : ''}{returnsPercentage.toFixed(2)}%
          </Text>
        </View>
        
        {/* XIRR Card */}
        <View style={[modernStyles.dashboardCard, modernStyles.cardInfo]}>
          <Text style={modernStyles.cardIcon}>📊</Text>
          <Text style={[
            modernStyles.cardValue,
            { color: xirr >= 0 ? '#00B47B' : '#EF4444' }
          ]}>
            {xirr >= 0 ? '+' : ''}{xirr.toFixed(2)}%
          </Text>
          <Text style={modernStyles.cardLabel}>XIRR</Text>
          <Text style={[modernStyles.cardSubtext, { color: '#6B7280' }]}>
            Annualized Return
          </Text>
        </View>
      </View>
      
      {/* XIRR Explanation */}
      <View style={{
        backgroundColor: '#F0F9FF',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#2E7DFF',
      }}>
        <Text style={{ fontSize: 10, color: '#1E40AF', textAlign: 'center', fontStyle: 'italic' }}>
          💡 XIRR calculates your annualized return considering the timing and amount of each investment, 
          providing the most accurate measure of your portfolio performance.
        </Text>
      </View>
    </View>
  );
};