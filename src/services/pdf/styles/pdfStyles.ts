
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  
  // Header Section with Modern Design
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F5F8FF',
    padding: 15,
    borderRadius: 8,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#2E7DFF',
    fontStyle: 'italic',
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  // Statement Title
  statementTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 12,
    borderRadius: 6,
  },
  
  // User Info Card
  userInfo: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1F36',
    textAlign: 'center',
  },
  userInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userInfoItem: {
    width: '48%',
    marginBottom: 8,
  },
  userInfoLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  userInfoValue: {
    fontSize: 12,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  // Portfolio At a Glance Section
  portfolioGlance: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#FFF6E7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  glanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1F36',
  },
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  glanceCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 10,
  },
  glanceLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 5,
    textAlign: 'center',
  },
  glanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
  },
  glanceSubtext: {
    fontSize: 9,
    color: '#00B47B',
    textAlign: 'center',
    marginTop: 2,
  },
  
  // AI Insight Section - Modern Card
  aiInsight: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#FFF6E7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB800',
    position: 'relative',
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  aiInsightIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FFB800',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    flex: 1,
  },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  aiInsightText: {
    fontSize: 12,
    color: '#1A1F36',
    lineHeight: 1.6,
    marginBottom: 10,
  },
  aiInsightHighlight: {
    fontSize: 11,
    color: '#00B47B',
    fontWeight: 'bold',
  },
  
  // Holdings Table - Modern Design
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 12,
  },
  tableHeaderCell: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableCell: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
  },
  tableCellBold: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 10,
    color: '#00B47B',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  
  // Summary Cards
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  summarySubtext: {
    fontSize: 10,
    color: '#00B47B',
    marginTop: 2,
  },
  
  // Performance Metrics
  performanceSection: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#00B47B',
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 15,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    minWidth: '20%',
  },
  performanceLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  
  // Modern Disclaimer
  disclaimer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 9,
    color: '#7F1D1D',
    lineHeight: 1.4,
  },
  
  // Modern Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F5F8FF',
    padding: 15,
    borderRadius: 8,
    borderTopWidth: 2,
    borderTopColor: '#2E7DFF',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'column',
  },
  footerCompany: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 2,
  },
  footerContact: {
    fontSize: 9,
    color: '#6B7280',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 2,
  },
  footerPage: {
    fontSize: 9,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
