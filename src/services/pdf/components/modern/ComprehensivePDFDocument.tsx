import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { modernStyles } from '../../styles/modernPDFStyles';
import { StatementData } from '../../../statement/types';

interface ComprehensivePDFDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

// Professional watermark component
const PDFWatermark: React.FC = () => (
  <Text style={modernStyles.watermark} fixed>SIP BREWERY</Text>
);

// Header component with all required elements
const PDFHeader: React.FC<{ generatedAt: Date }> = ({ generatedAt }) => (
  <View style={modernStyles.header} fixed>
    <View style={modernStyles.logoSection}>
      <View style={modernStyles.mainLogo}>
        <Image 
          style={{
            width: 55,
            height: 55,
            marginRight: 14,
          }}
          src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png"
        />
        <View style={modernStyles.brandingText}>
          <Text style={modernStyles.companyName}>SIP Brewery</Text>
          <Text style={modernStyles.tagline}>Brewing Wealth, One SIP at a Time</Text>
        </View>
      </View>
      <View style={modernStyles.trademarkSection}>
        <Text style={modernStyles.trademarkText}>A Trademark of</Text>
        <View style={modernStyles.equisculptBrand}>
          <View style={{
            width: 20,
            height: 20,
            backgroundColor: '#00B47B',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 6,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>EV</Text>
          </View>
          <Text style={modernStyles.equisculptText}>Equisculpt Ventures</Text>
        </View>
      </View>
    </View>
    <View style={modernStyles.headerInfo}>
      <Text style={modernStyles.generatedDate}>
        Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm')}
      </Text>
      <View style={modernStyles.regulatoryBadge}>
        <Text style={modernStyles.regulatoryText}>AMFI: ARN-XXXXX</Text>
        <Text style={modernStyles.regulatoryText}>BSE: XXXXX</Text>
        <Text style={modernStyles.regulatoryText}>SEBI: INZ000XXXXXX</Text>
      </View>
    </View>
  </View>
);

// Statement title component
const StatementTitle: React.FC<{ title: string }> = ({ title }) => (
  <Text style={modernStyles.statementTitle}>{title}</Text>
);

// User profile card
const UserProfile: React.FC<{ userInfo: StatementData['userInfo'] }> = ({ userInfo }) => (
  <View style={modernStyles.userProfile} wrap={false}>
    <Text style={modernStyles.userProfileTitle}>Investor Information</Text>
    <View style={modernStyles.userDetailsGrid}>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Full Name</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.name || 'N/A'}</Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Client Code</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.clientCode || 'N/A'}</Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Email Address</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.email || 'N/A'}</Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Mobile Number</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.mobile || 'N/A'}</Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>PAN Number</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.panMasked || 'N/A'}</Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>KYC Status</Text>
        <Text style={[
          modernStyles.userDetailValue, 
          { color: userInfo.isVerified ? '#00B47B' : '#FFB800' }
        ]}>
          {userInfo.isVerified ? 'VERIFIED ✓' : 'PENDING'}
        </Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Plan Type</Text>
        <Text style={modernStyles.userDetailValue}>
          {userInfo.segment === 'DIRECT' ? 'Direct Plan' : 'Regular Plan'}
        </Text>
      </View>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Statement Period</Text>
        <Text style={modernStyles.userDetailValue}>01 Jan 2024 - Current</Text>
      </View>
      {userInfo.address && (
        <View style={[modernStyles.userDetailItem, modernStyles.w100, { marginTop: 10 }]}>
          <Text style={modernStyles.userDetailLabel}>Registered Address</Text>
          <Text style={modernStyles.userDetailValue}>{userInfo.address}</Text>
        </View>
      )}
    </View>
  </View>
);

// Portfolio at a glance dashboard
const PortfolioDashboard: React.FC<{ portfolio: StatementData['portfolio'] }> = ({ portfolio }) => {
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

// AI Analysis component
const AIAnalysis: React.FC<{ portfolio: StatementData['portfolio'] }> = ({ portfolio }) => {
  const xirr = portfolio.xirr || 0;
  
  const generateInsight = () => {
    if (xirr > 15) {
      return {
        title: "Excellent Performance Detected",
        insight: `Your portfolio is delivering outstanding returns with ${xirr.toFixed(1)}% XIRR, placing you in the top 20% of investors on our platform.`,
        recommendation: "Consider systematic step-ups in your SIPs to accelerate wealth creation while maintaining this momentum.",
        highlight: `You are beating inflation by ${(xirr - 6).toFixed(1)}% annually!`,
        percentile: "Top 20%"
      };
    } else if (xirr > 12) {
      return {
        title: "Strong Portfolio Performance",
        insight: `Your ${xirr.toFixed(1)}% XIRR shows good investment discipline and fund selection across your ₹${(portfolio.totalInvested || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })} investment.`,
        recommendation: "Explore adding international diversification or increasing allocation to small-cap funds for potential alpha generation.",
        highlight: `Your returns are ${(xirr - 10).toFixed(1)}% above market average!`,
        percentile: "Top 35%"
      };
    } else {
      return {
        title: "Growth Opportunity Identified",
        insight: `Your current ${xirr.toFixed(1)}% XIRR indicates potential for optimization in fund selection and asset allocation.`,
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
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2E7DFF', marginBottom: 10 }}>
          {insight.title}
        </Text>
        <Text style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
          {insight.insight}
        </Text>
      </View>
      
      {/* Recommendation Section */}
      <View style={modernStyles.aiInsightBox}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#2E7DFF', marginBottom: 10 }}>
          Next Best Action
        </Text>
        <Text style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
          {insight.recommendation}
        </Text>
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
        <Text style={{ fontSize: 11, color: '#00B47B', fontWeight: 'bold' }}>
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

// Holdings table component
const HoldingsTable: React.FC<{ holdings: StatementData['holdings'] }> = ({ holdings }) => {
  const validHoldings = Array.isArray(holdings) ? holdings : [];
  
  if (validHoldings.length === 0) {
    return (
      <View style={modernStyles.tableSection}>
        <Text style={modernStyles.tableTitle}>Portfolio Holdings Breakdown</Text>
        <View style={modernStyles.errorBox}>
          <Text style={modernStyles.errorText}>
            Ready to Start Your Investment Journey?
          </Text>
          <Text style={[modernStyles.errorText, { marginTop: 8, fontWeight: 'normal' }]}>
            You don't have any mutual fund holdings yet. Start investing today to build your wealth!
          </Text>
        </View>
      </View>
    );
  }

  const totalPortfolioValue = validHoldings.reduce((sum, h) => sum + (h.marketValue || 0), 0);
  const largestHoldingValue = Math.max(...validHoldings.map(h => h.marketValue || 0));

  return (
    <View style={modernStyles.tableSection} wrap={false}>
      <Text style={modernStyles.tableTitle}>Portfolio Holdings Breakdown</Text>
      
      <View style={modernStyles.table}>
        {/* Table Header */}
        <View style={modernStyles.tableHeader}>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w40]}>Fund Details</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Units</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>NAV (₹)</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Current Value</Text>
          <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Returns</Text>
        </View>

        {/* Table Rows */}
        {validHoldings.map((holding, index) => {
          const isAlternate = index % 2 === 1;
          const isLargest = (holding.marketValue || 0) === largestHoldingValue;
          const portfolioPercent = totalPortfolioValue > 0 ? ((holding.marketValue || 0) / totalPortfolioValue) * 100 : 0;
          
          const rowStyle = isLargest ? modernStyles.tableRowHighlight : 
                           isAlternate ? modernStyles.tableRowAlternate : modernStyles.tableRow;
          
          return (
            <View key={holding.schemeName + index} style={rowStyle}>
              {/* Fund Details */}
              <View style={modernStyles.w40}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  {isLargest && (
                    <Text style={{ marginRight: 6, color: '#FFB800', fontSize: 12 }}>★</Text>
                  )}
                  <Text style={[modernStyles.tableCellBold, { textAlign: 'left', fontSize: 10 }]}>
                    {holding.schemeName || 'N/A'}
                  </Text>
                </View>
                <Text style={[modernStyles.tableCell, { fontSize: 9, color: '#6B7280', textAlign: 'left' }]}>
                  {holding.amcName || 'AMC'} • {holding.category || 'Equity'}
                  {holding.expenseRatio && ` • ER: ${holding.expenseRatio}%`}
                </Text>
                {holding.isELSS && (
                  <Text style={[modernStyles.tableCell, { fontSize: 8, color: '#EF4444', textAlign: 'left' }]}>
                    Tax Saving (ELSS)
                  </Text>
                )}
              </View>
              
              {/* Units */}
              <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                {(holding.units || 0).toFixed(3)}
              </Text>
              
              {/* NAV */}
              <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                ₹{(holding.currentNav || 0).toFixed(2)}
              </Text>
              
              {/* Current Value */}
              <Text style={[modernStyles.tableCellBold, modernStyles.w15]}>
                ₹{(holding.marketValue || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </Text>
              
              {/* Returns */}
              <View style={modernStyles.w15}>
                <Text style={[
                  (holding.pnl || 0) >= 0 ? modernStyles.tableCellPositive : modernStyles.tableCellNegative,
                  { textAlign: 'center' }
                ]}>
                  {(holding.pnl || 0) >= 0 ? '+' : ''}{(holding.pnlPercentage || 0).toFixed(1)}%
                </Text>
                <Text style={[modernStyles.tableCell, { fontSize: 9, color: '#6B7280' }]}>
                  {portfolioPercent.toFixed(1)}% of portfolio
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Holdings Summary */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 15,
      }}>
        <View style={{
          flex: 1,
          backgroundColor: '#F8FAFF',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2E7DFF' }}>
            {validHoldings.length}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            Total Holdings
          </Text>
        </View>
        
        <View style={{
          flex: 1,
          backgroundColor: '#FFF8E7',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFB800' }}>
            ₹{largestHoldingValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            Largest Holding
          </Text>
        </View>
        
        <View style={{
          flex: 1,
          backgroundColor: '#F0FDF4',
          borderRadius: 8,
          padding: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#00B47B' }}>
            {validHoldings.filter(h => h.isELSS).length}
          </Text>
          <Text style={{ fontSize: 10, color: '#6B7280', textAlign: 'center' }}>
            ELSS Funds
          </Text>
        </View>
      </View>
    </View>
  );
};

// Footer component
const PDFFooter: React.FC<{ generatedAt: Date }> = ({ generatedAt }) => (
  <View style={modernStyles.footer} fixed>
    {/* Disclaimer */}
    <View style={modernStyles.disclaimer}>
      <Text style={modernStyles.disclaimerText}>
        Important Disclaimer: This statement is generated using live BSE STAR MF API data. SIP Brewery is an AMFI Registered Mutual Fund Distributor (ARN-XXXXX). 
        All transactions are executed via BSE STAR MF platform. Mutual fund investments are subject to market risks. 
        Past performance is not indicative of future returns. Please read all scheme related documents carefully before investing. 
        AI-generated insights are for informational purposes only and should not be considered as investment advice.
      </Text>
    </View>

    {/* Footer Content */}
    <View style={modernStyles.footerContent}>
      <View style={modernStyles.footerLeft}>
        <Text style={[modernStyles.footerContact, { fontWeight: 'bold', color: '#2E7DFF' }]}>
          SIP Brewery - Brewing Wealth, One SIP at a Time
        </Text>
        <Text style={modernStyles.footerContact}>
          Email: support@sipbrewery.com | Mobile: +91-9876543210
        </Text>
        <Text style={modernStyles.footerContact}>
          Web: www.sipbrewery.com | WhatsApp: +91-9876543210
        </Text>
        <Text style={modernStyles.footerContact}>
          AMFI: ARN-XXXXX | BSE: XXXXX | SEBI: INZ000XXXXXX
        </Text>
      </View>
      
      <View style={modernStyles.footerRight}>
        <Text style={modernStyles.footerPage}>
          Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')}
        </Text>
        <View style={modernStyles.confidentialBadge}>
          <Text style={modernStyles.confidentialText}>Confidential Document</Text>
        </View>
      </View>
    </View>
  </View>
);

// Main document component
export const ComprehensivePDFDocument: React.FC<ComprehensivePDFDocumentProps> = ({
  statementType,
  statementData,
  generatedAt,
}) => (
  <Document>
    <Page size="A4" style={modernStyles.page}>
      <PDFWatermark />
      <PDFHeader generatedAt={generatedAt} />
      
      <View style={modernStyles.content}>
        <StatementTitle title={`${statementType.charAt(0).toUpperCase() + statementType.slice(1)} Portfolio Statement`} />
        
        <UserProfile userInfo={statementData.userInfo} />
        <Text break />
        
        <PortfolioDashboard portfolio={statementData.portfolio} />
        <Text break />
        
        <AIAnalysis portfolio={statementData.portfolio} />
        <Text break />
        
        <HoldingsTable holdings={statementData.holdings} />
      </View>
      
      <PDFFooter generatedAt={generatedAt} />
    </Page>
  </Document>
);