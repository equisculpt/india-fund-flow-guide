
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { StatementData } from '../statement/types';

// Define styles matching SIP Brewery branding
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7DFF',
  },
  logoContainer: {
    flex: 1,
  },
  companyInfo: {
    flex: 2,
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 12,
    color: '#2E7DFF',
    fontStyle: 'italic',
  },
  statementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginVertical: 20,
    backgroundColor: '#F5F8FF',
    padding: 10,
  },
  userInfo: {
    backgroundColor: '#F5F8FF',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  userInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 10,
  },
  userInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  userInfoLabel: {
    fontSize: 10,
    color: '#666666',
    width: 100,
  },
  userInfoValue: {
    fontSize: 10,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 10,
    backgroundColor: '#FFF6E7',
    padding: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#2E7DFF',
    padding: 8,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tableCell: {
    fontSize: 9,
    color: '#1A1F36',
  },
  summaryCard: {
    backgroundColor: '#F0F9FF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#00B47B',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  disclaimer: {
    fontSize: 8,
    color: '#666666',
    textAlign: 'justify',
    marginBottom: 10,
    backgroundColor: '#FFFBEB',
    padding: 10,
  },
  aiInsight: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  aiInsightTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 5,
  },
  aiInsightText: {
    fontSize: 9,
    color: '#4C1D95',
  },
});

interface PDFStatementDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

export const PDFStatementDocument: React.FC<PDFStatementDocumentProps> = ({
  statementType,
  statementData,
  generatedAt,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.companyName}>SIP BREWERY</Text>
          <Text style={styles.tagline}>Brewing Wealth, One SIP at a Time</Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={{ fontSize: 10, color: '#666666' }}>
            Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm')}
          </Text>
          <Text style={{ fontSize: 8, color: '#666666' }}>
            AMFI Registered Distributor
          </Text>
        </View>
      </View>

      {/* Statement Title */}
      <Text style={styles.statementTitle}>
        {getStatementTitle(statementType)}
      </Text>

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text style={styles.userInfoTitle}>CLIENT INFORMATION</Text>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoValue}>{statementData.userInfo.name}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Client Code:</Text>
          <Text style={styles.userInfoValue}>{statementData.userInfo.clientCode}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>PAN:</Text>
          <Text style={styles.userInfoValue}>{statementData.userInfo.panMasked}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoValue}>{statementData.userInfo.email}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>SIP Brewery ID:</Text>
          <Text style={styles.userInfoValue}>{statementData.userInfo.sipBreweryId}</Text>
        </View>
      </View>

      {/* Portfolio Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PORTFOLIO SUMMARY</Text>
        
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <View style={[styles.summaryCard, { marginRight: 10, flex: 1 }]}>
            <Text style={styles.summaryTitle}>Total Invested</Text>
            <Text style={styles.summaryValue}>
              ₹{statementData.portfolio.totalInvested.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.summaryCard, { marginLeft: 10, flex: 1 }]}>
            <Text style={styles.summaryTitle}>Current Value</Text>
            <Text style={styles.summaryValue}>
              ₹{statementData.portfolio.currentValue.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <View style={[styles.summaryCard, { marginRight: 10, flex: 1 }]}>
            <Text style={styles.summaryTitle}>Total Returns</Text>
            <Text style={styles.summaryValue}>
              ₹{statementData.portfolio.totalReturns.toLocaleString()} 
              ({statementData.portfolio.returnsPercentage.toFixed(2)}%)
            </Text>
          </View>
          <View style={[styles.summaryCard, { marginLeft: 10, flex: 1 }]}>
            <Text style={styles.summaryTitle}>XIRR</Text>
            <Text style={styles.summaryValue}>
              {statementData.portfolio.xirr.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {/* AI Insight */}
      <View style={styles.aiInsight}>
        <Text style={styles.aiInsightTitle}>🤖 AI PORTFOLIO INSIGHT</Text>
        <Text style={styles.aiInsightText}>
          Your portfolio is performing well with an XIRR of {statementData.portfolio.xirr.toFixed(2)}%. 
          You're in the top 25% of SIP Brewery investors! Keep up the consistent investing approach.
        </Text>
      </View>

      {/* Holdings Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HOLDINGS DETAILS</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Scheme Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Units</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>NAV</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Invested</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Current Value</Text>
            </View>
          </View>
          {statementData.holdings.slice(0, 10).map((holding, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{holding.schemeName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{holding.units.toFixed(3)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>₹{holding.currentNav.toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>₹{holding.investedValue.toLocaleString()}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>₹{holding.marketValue.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Compliance Footer */}
      <View style={styles.disclaimer}>
        <Text>
          IMPORTANT: This statement is generated using live BSE STAR MF API data. 
          SIP Brewery is an AMFI Registered Mutual Fund Distributor. All transactions are executed via BSE STAR MF platform. 
          Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          SIP Brewery | support@sipbrewery.com | AMFI Registration: ARN-XXXXX | BSE Member ID: XXXXX
        </Text>
        <Text>Generated on {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')} | Page 1 of 1</Text>
      </View>
    </Page>
  </Document>
);

function getStatementTitle(statementType: string): string {
  const titles: Record<string, string> = {
    'portfolio-summary': 'Portfolio Summary Statement',
    'holdings-statement': 'Holdings Statement',
    'transaction-statement': 'Transaction History Statement',
    'sip-statement': 'SIP Details Statement',
    'tax': 'Tax Statement',
    'capital-gains': 'Capital Gains Statement',
    'rewards-statement': 'Rewards & Referral Statement',
    'comprehensive': 'Comprehensive Investment Statement',
    'performance': 'Performance Analysis Report',
    'annual-returns': 'Annual Returns Statement',
  };
  
  return titles[statementType] || 'Investment Statement';
}
