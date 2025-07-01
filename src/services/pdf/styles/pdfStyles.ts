
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
  
  // Enhanced Header Section with Brand Colors
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 20,
    borderRadius: 12,
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  sipBreweryLogo: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 3,
  },
  
  tagline: {
    fontSize: 13,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  
  trademarkText: {
    fontSize: 9,
    color: '#6B7280',
    marginRight: 6,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  
  equisculptText: {
    fontSize: 11,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 12,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  regulatoryInfo: {
    fontSize: 10,
    color: '#6B7280',
  },
  
  // Statement Title
  statementTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  
  // User Info Card - Enhanced
  userInfo: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#F8FAFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 18,
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
    marginBottom: 10,
  },
  userInfoLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 12,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  // Portfolio At a Glance - Horizontal Cards
  portfolioGlance: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#FFF8E7',
    borderRadius: 15,
    borderWidth: 3,
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
    marginBottom: 20,
  },
  glanceCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 10,
  },
  glanceLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginTop: 3,
    fontWeight: 'bold',
  },
  
  // Performance Section - Enhanced
  performanceSection: {
    backgroundColor: '#F0FDF4',
    padding: 18,
    borderRadius: 12,
    borderWidth: 3,
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
    minWidth: '22%',
    borderWidth: 1,
    borderColor: '#00B47B',
  },
  performanceLabel: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  performanceValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  
  // AI Insight Section - Enhanced
  aiInsight: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#FFF8E7',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFB800',
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
    borderRadius: 10,
    borderLeftWidth: 5,
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
  
  // Holdings Table - Enhanced
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
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  tableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 15,
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
  
  // Summary Cards - Enhanced
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  summarySubtext: {
    fontSize: 10,
    color: '#00B47B',
    marginTop: 3,
    fontWeight: 'bold',
  },
  
  // Disclaimer - Enhanced
  disclaimer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FECACA',
    borderLeftWidth: 5,
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
  
  // Footer - Enhanced and Fixed
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F8FAFF',
    padding: 15,
    borderRadius: 10,
    borderTopWidth: 3,
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
    marginBottom: 4,
  },
  footerCompany: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 2,
  },
  footerTrademark: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
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
    marginBottom: 3,
  },
  footerPage: {
    fontSize: 9,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
