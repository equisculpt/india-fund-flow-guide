import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { StatementData } from '../../../statement/types';
import { modernStyles } from '../../styles/modernPDFStyles';
import { getStatementTitle } from '../../utils/statementTitles';
import { ModernPDFHeader } from './ModernPDFHeader';
import { ModernPDFWatermark } from './ModernPDFWatermark';
import { ModernUserProfile } from './ModernUserProfile';
import { ModernPortfolioDashboard } from './ModernPortfolioDashboard';
import { ModernAIAnalysis } from './ModernAIAnalysis';
import { ModernHoldingsTable } from './ModernHoldingsTable';
import { ModernFooter } from './ModernFooter';

interface ModernPDFDocumentProps {
  statementType: string;
  statementData: StatementData;
  generatedAt: Date;
}

export const ModernPDFDocument: React.FC<ModernPDFDocumentProps> = ({
  statementType,
  statementData,
  generatedAt,
}) => {
  // Validate required data
  if (!statementData || typeof statementData !== 'object') {
    return (
      <Document>
        <Page size="A4" style={modernStyles.page}>
          <ModernPDFWatermark />
          <ModernPDFHeader generatedAt={generatedAt} />
          <View style={modernStyles.content}>
            <View style={modernStyles.errorBox}>
              <Text style={modernStyles.errorText}>Error: Invalid Statement Data</Text>
              <Text style={[modernStyles.errorText, { marginTop: 8, fontWeight: 'normal' }]}>
                Please contact support with error code: INVALID_DATA
              </Text>
            </View>
          </View>
          <ModernFooter generatedAt={generatedAt} />
        </Page>
      </Document>
    );
  }

  if (!statementData.userInfo || !statementData.portfolio) {
    return (
      <Document>
        <Page size="A4" style={modernStyles.page}>
          <ModernPDFWatermark />
          <ModernPDFHeader generatedAt={generatedAt} />
          <View style={modernStyles.content}>
            <View style={modernStyles.errorBox}>
              <Text style={modernStyles.errorText}>Error: Missing Required Information</Text>
              <Text style={[modernStyles.errorText, { marginTop: 8, fontWeight: 'normal' }]}>
                Please contact support with error code: MISSING_DATA
              </Text>
            </View>
          </View>
          <ModernFooter generatedAt={generatedAt} />
        </Page>
      </Document>
    );
  }

  const safeHoldings = Array.isArray(statementData.holdings) ? statementData.holdings : [];

  return (
    <Document>
      <Page size="A4" style={modernStyles.page}>
        {/* Fixed Elements */}
        <ModernPDFWatermark />
        <ModernPDFHeader generatedAt={generatedAt} />
        
        {/* Content Area */}
        <View style={modernStyles.content}>
          {/* Statement Title */}
          <View style={{
            backgroundColor: '#2E7DFF',
            borderRadius: 12,
            padding: 20,
            marginBottom: 30,
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: 0.5,
            }}>
              {getStatementTitle(statementType)}
            </Text>
          </View>

          {/* User Profile Section */}
          <ModernUserProfile userInfo={statementData.userInfo} />
          
          {/* Page Break */}
          <View style={modernStyles.pageBreak} break />

          {/* Portfolio Dashboard */}
          <ModernPortfolioDashboard portfolio={statementData.portfolio} />
          
          {/* Page Break */}
          <View style={modernStyles.pageBreak} break />

          {/* AI Analysis */}
          <ModernAIAnalysis portfolio={statementData.portfolio} />
          
          {/* Page Break */}
          <View style={modernStyles.pageBreak} break />

          {/* Holdings Table */}
          <ModernHoldingsTable holdings={safeHoldings} />
          
          {/* Transactions Section (if type includes transactions) */}
          {(statementType.includes('transaction') || statementType === 'comprehensive') && 
           statementData.transactions && Array.isArray(statementData.transactions) && 
           statementData.transactions.length > 0 && (
            <>
              <View style={modernStyles.pageBreak} break />
              <View style={modernStyles.tableSection}>
                <Text style={modernStyles.tableTitle}>Recent Transactions (Last 5)</Text>
                <View style={modernStyles.table}>
                  <View style={modernStyles.tableHeader}>
                    <Text style={[modernStyles.tableHeaderCell, modernStyles.w20]}>Date</Text>
                    <Text style={[modernStyles.tableHeaderCell, modernStyles.w30]}>Fund Name</Text>
                    <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Type</Text>
                    <Text style={[modernStyles.tableHeaderCell, modernStyles.w20]}>Amount</Text>
                    <Text style={[modernStyles.tableHeaderCell, modernStyles.w15]}>Units</Text>
                  </View>
                  
                  {statementData.transactions.slice(0, 5).map((transaction, index) => (
                    <View key={'transaction-' + index} style={
                      index % 2 === 1 ? modernStyles.tableRowAlternate : modernStyles.tableRow
                    }>
                      <Text style={[modernStyles.tableCell, modernStyles.w20]}>
                        {transaction.transactionDate || 'N/A'}
                      </Text>
                      <Text style={[modernStyles.tableCellBold, modernStyles.w30, { textAlign: 'left' }]}>
                        {transaction.schemeName || 'N/A'}
                      </Text>
                      <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                        {transaction.transactionType || 'N/A'}
                      </Text>
                      <Text style={[modernStyles.tableCellBold, modernStyles.w20]}>
                        ₹{(transaction.amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </Text>
                      <Text style={[modernStyles.tableCell, modernStyles.w15]}>
                        {(transaction.units || 0).toFixed(3)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Rewards Section (if type includes rewards) */}
          {(statementType.includes('reward') || statementType === 'comprehensive') && 
           statementData.rewards && (
            <>
              <View style={modernStyles.pageBreak} break />
              <View style={modernStyles.rewardsSection}>
                <Text style={modernStyles.rewardsTitle}>Rewards & Loyalty Summary</Text>
                
                <View style={modernStyles.rewardsGrid}>
                  <View style={modernStyles.rewardCard}>
                    <Text style={modernStyles.rewardValue}>
                      ₹{(statementData.rewards.totalEarned || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </Text>
                    <Text style={modernStyles.rewardLabel}>Total Earned</Text>
                  </View>
                  
                  <View style={modernStyles.rewardCard}>
                    <Text style={modernStyles.rewardValue}>
                      ₹{(statementData.rewards.referralBonus || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </Text>
                    <Text style={modernStyles.rewardLabel}>Referral Bonus</Text>
                  </View>
                  
                  <View style={modernStyles.rewardCard}>
                    <Text style={modernStyles.rewardValue}>
                      {(statementData.rewards.loyaltyPoints || 0).toLocaleString('en-IN')}
                    </Text>
                    <Text style={modernStyles.rewardLabel}>Loyalty Points</Text>
                  </View>
                  
                  <View style={modernStyles.rewardCard}>
                    <Text style={modernStyles.rewardValue}>
                      ₹{(statementData.rewards.cashback || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </Text>
                    <Text style={modernStyles.rewardLabel}>Cashback</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Fixed Footer */}
        <ModernFooter generatedAt={generatedAt} pageNumber={1} totalPages={1} />
      </Page>
    </Document>
  );
};