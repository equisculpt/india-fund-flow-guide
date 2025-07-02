import { StyleSheet } from '@react-pdf/renderer';

// Modern PDF Styles Following SIP Brewery Design System
export const modernStyles = StyleSheet.create({
  // ========== PAGE STRUCTURE ==========
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 11,
    position: 'relative',
    lineHeight: 1.4,
  },

  // ========== FIXED HEADER ==========
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8FAFF',
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    borderRadius: 12,
    padding: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },

  logoSection: {
    flexDirection: 'column',
    flex: 2,
  },

  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  companyName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
  },

  tagline: {
    fontSize: 14,
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
    fontSize: 10,
    color: '#6B7280',
    marginRight: 8,
  },

  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
  },

  generatedDate: {
    fontSize: 11,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  regulatoryBadge: {
    backgroundColor: '#2E7DFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  regulatoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ========== WATERMARK ==========
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-25deg)',
    fontSize: 60,
    color: '#2E7DFF',
    fontWeight: 'bold',
    opacity: 0.07,
    zIndex: -1,
  },

  // ========== CONTENT AREA ==========
  content: {
    marginTop: 140, // Space for fixed header
    marginBottom: 100, // Space for fixed footer
    paddingHorizontal: 30,
  },

  // ========== USER PROFILE CARD ==========
  userProfile: {
    backgroundColor: '#F8FAFF',
    borderWidth: 3,
    borderColor: '#2E7DFF',
    borderLeftWidth: 8,
    borderLeftColor: '#FFB800',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
  },

  userProfileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 20,
  },

  userDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  userDetailItem: {
    width: '48%',
    marginBottom: 12,
  },

  userDetailLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  userDetailValue: {
    fontSize: 15,
    color: '#1A1F36',
    fontWeight: 'bold',
  },

  // ========== PORTFOLIO DASHBOARD ==========
  portfolioDashboard: {
    backgroundColor: '#FFF8E7',
    borderWidth: 3,
    borderColor: '#FFB800',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
  },

  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 20,
  },

  dashboardCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  dashboardCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
  },

  cardPrimary: {
    borderColor: '#FFB800',
  },

  cardSuccess: {
    borderColor: '#00B47B',
  },

  cardInfo: {
    borderColor: '#2E7DFF',
  },

  cardIcon: {
    fontSize: 20,
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
  },

  cardLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cardSubtext: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },

  // ========== AI ANALYSIS CARD ==========
  aiAnalysis: {
    backgroundColor: '#FFF8E7',
    borderWidth: 3,
    borderColor: '#FFB800',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
  },

  aiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 20,
  },

  aiInsightBox: {
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 6,
    borderLeftColor: '#00B47B',
    borderRadius: 8,
    padding: 18,
    marginBottom: 15,
  },

  aiInsightTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7DFF',
    marginBottom: 10,
  },

  aiInsightText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 1.5,
  },

  percentileBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginTop: 15,
  },

  percentileText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  aiDisclaimer: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },

  // ========== TABLES ==========
  tableSection: {
    marginBottom: 30,
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 15,
    borderRadius: 12,
    textAlign: 'center',
    marginBottom: 15,
  },

  table: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E7DFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  tableHeaderCell: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },

  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },

  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
    alignItems: 'center',
  },

  tableCell: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  tableCellBold: {
    fontSize: 11,
    color: '#1A1F36',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  tableCellPositive: {
    fontSize: 11,
    color: '#00B47B',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  tableCellNegative: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  // ========== REWARDS SECTION ==========
  rewardsSection: {
    backgroundColor: '#F0FDF4',
    borderWidth: 3,
    borderColor: '#00B47B',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
  },

  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 20,
  },

  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  rewardCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00B47B',
  },

  rewardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00B47B',
    marginBottom: 4,
  },

  rewardLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ========== ERROR/PLACEHOLDER ==========
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#EF4444',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 15,
  },

  errorText: {
    fontSize: 13,
    color: '#991B1B',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // ========== FIXED FOOTER ==========
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8FAFF',
    borderTopWidth: 2,
    borderTopColor: '#2E7DFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  disclaimer: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },

  disclaimerText: {
    fontSize: 9,
    color: '#7F1D1D',
    textAlign: 'center',
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerLeft: {
    flex: 2,
  },

  footerContact: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },

  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },

  footerPage: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },

  confidentialBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },

  confidentialText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1A1F36',
  },

  // ========== UTILITY CLASSES ==========
  pageBreak: {
    marginBottom: 30,
  },

  sectionBreak: {
    height: 20,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  textLeft: {
    textAlign: 'left',
  },

  bold: {
    fontWeight: 'bold',
  },

  italic: {
    fontStyle: 'italic',
  },

  // ========== RESPONSIVE WIDTHS ==========
  w10: { width: '10%' },
  w15: { width: '15%' },
  w20: { width: '20%' },
  w25: { width: '25%' },
  w30: { width: '30%' },
  w35: { width: '35%' },
  w40: { width: '40%' },
  w45: { width: '45%' },
  w50: { width: '50%' },
  w60: { width: '60%' },
  w70: { width: '70%' },
  w80: { width: '80%' },
  w90: { width: '90%' },
  w100: { width: '100%' },
});