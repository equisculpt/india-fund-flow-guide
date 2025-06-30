
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
    position: 'relative',
  },
  
  // Enhanced Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 15,
    borderRadius: 8,
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  sipBreweryLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 2,
  },
  
  tagline: {
    fontSize: 12,
    color: '#2E7DFF',
    fontStyle: 'italic',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  
  trademarkText: {
    fontSize: 9,
    color: '#6B7280',
    marginRight: 5,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  
  equisculptText: {
    fontSize: 10,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 11,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  
  regulatoryInfo: {
    fontSize: 9,
    color: '#6B7280',
  },
  
  // Statement Title
  statementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 12,
    borderRadius: 6,
  },
  
  // User Info Card - Enhanced
  userInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
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
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  userInfoValue: {
    fontSize: 11,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  // Portfolio At a Glance Section - Enhanced
  portfolioGlance: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  glanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#1A1F36',
  },
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  glanceCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 8,
  },
  glanceLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  glanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
  },
  glanceSubtext: {
    fontSize: 8,
    color: '#00B47B',
    textAlign: 'center',
    marginTop: 2,
  },
  
  // Performance Section - Enhanced
  performanceSection: {
    backgroundColor: '#F0FDF4',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00B47B',
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 12,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    minWidth: '20%',
  },
  performanceLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 3,
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  
  // AI Insight Section - Enhanced
  aiInsight: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiInsightIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFB800',
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    flex: 1,
  },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  aiInsightText: {
    fontSize: 11,
    color: '#1A1F36',
    lineHeight: 1.5,
    marginBottom: 8,
  },
  aiInsightHighlight: {
    fontSize: 10,
    color: '#00B47B',
    fontWeight: 'bold',
  },
  
  // Holdings Table - Enhanced
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 10,
  },
  tableHeaderCell: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableCell: {
    fontSize: 9,
    color: '#1A1F36',
    paddingHorizontal: 6,
  },
  tableCellBold: {
    fontSize: 9,
    color: '#1A1F36',
    paddingHorizontal: 6,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 9,
    color: '#00B47B',
    paddingHorizontal: 6,
    fontWeight: 'bold',
  },
  
  // Summary Cards - Enhanced
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 3,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  summarySubtext: {
    fontSize: 9,
    color: '#00B47B',
    marginTop: 2,
  },
  
  // Disclaimer - Enhanced
  disclaimer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 6,
  },
  disclaimerText: {
    fontSize: 8,
    color: '#7F1D1D',
    lineHeight: 1.3,
  },
  
  // Footer - Enhanced and Fixed
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#F8FAFF',
    padding: 12,
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
    flex: 1,
  },
  footerBranding: {
    marginBottom: 3,
  },
  footerCompany: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 1,
  },
  footerTrademark: {
    fontSize: 8,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 8,
    color: '#6B7280',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 8,
    color: '#6B7280',
    marginBottom: 2,
  },
  footerPage: {
    fontSize: 8,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
