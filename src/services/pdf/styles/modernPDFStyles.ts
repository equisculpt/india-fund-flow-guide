import { StyleSheet } from '@react-pdf/renderer';

export const modernStyles = StyleSheet.create({
  // ---------- PAGE ----------
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 28,
    fontFamily: 'Helvetica',
    fontSize: 11,
    position: 'relative',
    minHeight: '100%',
  },

  // ---------- WATERMARK ----------
  watermark: {
    position: 'absolute',
    top: '38%',
    left: 0,
    right: 0,
    textAlign: 'center',
    opacity: 0.055,
    fontSize: 80,
    color: '#2E7DFF',
    fontWeight: 'bold',
    zIndex: -1,
  },

  // ---------- HEADER ----------
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 34,
    paddingBottom: 22,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 22,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
  },
  logoSection: { flexDirection: 'column', alignItems: 'flex-start' },
  mainLogo: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  sipBreweryLogo: { width: 55, height: 55, marginRight: 14 },
  brandingText: { flexDirection: 'column' },
  companyName: { fontSize: 32, fontWeight: 'bold', color: '#1A1F36', marginBottom: 3 },
  tagline: { fontSize: 13, color: '#2E7DFF', fontStyle: 'italic', fontWeight: 'bold' },
  trademarkSection: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  trademarkText: { fontSize: 10, color: '#6B7280', marginRight: 7 },
  equisculptBrand: { flexDirection: 'row', alignItems: 'center' },
  equisculptLogo: { width: 20, height: 20, marginRight: 6 },
  equisculptText: { fontSize: 12, color: '#1A1F36', fontWeight: 'bold' },
  headerInfo: { flexDirection: 'column', alignItems: 'flex-end' },
  generatedDate: { fontSize: 12, color: '#1A1F36', fontWeight: 'bold', marginBottom: 3 },
  regulatoryInfo: { fontSize: 10.5, color: '#6B7280' },
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

  // ---------- TITLES & SECTION HEADERS ----------
  statementTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 26,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 13,
    borderRadius: 9,
    borderWidth: 2.5,
    borderColor: '#1E40AF',
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 12,
    borderRadius: 9,
    textAlign: 'center',
    borderWidth: 2.5,
    borderColor: '#1E40AF',
  },

  // ---------- USER INFO CARD ----------
  userInfo: {
    marginBottom: 24,
    padding: 17,
    backgroundColor: '#F8FAFF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2E7DFF',
    borderLeftWidth: 6,
    borderLeftColor: '#FFB800',
    breakInside: 'avoid',
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1F36',
    textAlign: 'center',
    letterSpacing: 0.18,
  },
  userInfoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  userInfoItem: { width: '48%', marginBottom: 12 },
  userInfoLabel: { fontSize: 10.5, color: '#6B7280', marginBottom: 3, fontWeight: 'bold' },
  userInfoValue: { fontSize: 12.3, color: '#1A1F36', fontWeight: 'bold' },

  // ---------- PORTFOLIO AT A GLANCE ----------
  portfolioGlance: {
    marginBottom: 26,
    padding: 21,
    backgroundColor: '#FFF8E7',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFB800',
    breakInside: 'avoid',
  },
  glanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 17,
    color: '#1A1F36',
    letterSpacing: 0.2,
  },
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  glanceCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 11,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2.5,
  },
  glanceLabel: {
    fontSize: 10.5,
    color: '#6B7280',
    marginBottom: 4,
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

  // ---------- AI INSIGHT ----------
  aiAnalysis: {
    marginBottom: 22,
    padding: 19,
    backgroundColor: '#FFF8E7',
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#FFB800',
    breakInside: 'avoid',
  },
  aiInsight: {
    marginBottom: 22,
    padding: 19,
    backgroundColor: '#FFF8E7',
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#FFB800',
    breakInside: 'avoid',
  },
  aiInsightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aiInsightIcon: {
    width: 22,
    height: 22,
    backgroundColor: '#FFB800',
    borderRadius: 11,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightIconText: { fontSize: 12, color: 'white', fontWeight: 'bold' },
  aiInsightTitle: { fontSize: 13.5, fontWeight: 'bold', color: '#1A1F36', flex: 1 },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 9,
    borderLeftWidth: 5,
    borderLeftColor: '#FFB800',
  },
  aiInsightText: { fontSize: 11.5, color: '#1A1F36', lineHeight: 1.45, marginBottom: 6 },
  aiInsightHighlight: { fontSize: 11, color: '#00B47B', fontWeight: 'bold' },
  percentileBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 7,
  },
  percentileBadgeText: { color: '#1A1F36', fontWeight: 'bold', fontSize: 10.5 },

  // ---------- HOLDINGS TABLE ----------
  section: { marginBottom: 18, breakInside: 'avoid' },
  tableContainer: {
    borderRadius: 9,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  tableHeader: { flexDirection: 'row', backgroundColor: '#1A1F36', padding: 10 },
  tableHeaderCell: { fontSize: 10.3, color: '#FFFFFF', fontWeight: 'bold', paddingHorizontal: 7 },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    breakInside: 'avoid',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    breakInside: 'avoid',
  },
  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 5,
    borderLeftColor: '#FFB800',
    breakInside: 'avoid',
  },
  tableCell: { fontSize: 9.7, color: '#1A1F36', paddingHorizontal: 7 },
  tableCellBold: { fontSize: 9.7, color: '#1A1F36', paddingHorizontal: 7, fontWeight: 'bold' },
  tableCellGreen: { fontSize: 9.7, color: '#00B47B', paddingHorizontal: 7, fontWeight: 'bold' },
  tableCellRed: { fontSize: 9.7, color: '#EF4444', paddingHorizontal: 7, fontWeight: 'bold' },

  // ---------- TRANSACTION/UPCOMING SIP/REWARDS ----------
  transactionSection: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F8FAFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E7DFF',
    breakInside: 'avoid',
  },
  transactionTitle: {
    fontSize: 12.7,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 7,
    textAlign: 'center',
  },
  transactionTable: { borderRadius: 7, overflow: 'hidden', borderWidth: 1.2, borderColor: '#E5E7EB' },
  upcomingSipSection: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00B47B',
    breakInside: 'avoid',
  },
  upcomingSipTitle: {
    fontSize: 12.7,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 7,
    textAlign: 'center',
  },

  // ---------- REWARDS & CAPITAL GAINS ----------
  rewardsSection: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00B47B',
    breakInside: 'avoid',
  },
  rewardsTitle: { fontSize: 12.7, fontWeight: 'bold', color: '#1A1F36', marginBottom: 7 },
  capitalGainsSection: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F8FAFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E7DFF',
    breakInside: 'avoid',
  },
  capitalGainsTitle: { fontSize: 12.7, fontWeight: 'bold', color: '#1A1F36', marginBottom: 7 },

  // ---------- CHARTS ----------
  chartsSection: { marginBottom: 20, breakInside: 'avoid' },
  chartsTitle: { fontSize: 12.7, fontWeight: 'bold', color: '#1A1F36', marginBottom: 7 },
  chartImage: { width: 350, height: 120, margin: 'auto', marginBottom: 12 },

  // ---------- FOOTER & DISCLAIMER ----------
  disclaimer: {
    marginTop: 24,
    padding: 13,
    backgroundColor: '#FEF2F2',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#FECACA',
    borderLeftWidth: 5,
    borderLeftColor: '#EF4444',
    fontSize: 9.5,
    color: '#7F1D1D',
    lineHeight: 1.33,
  },
  footer: {
    marginTop: 18,
    backgroundColor: '#F8FAFF',
    padding: 15,
    borderRadius: 9,
    borderTopWidth: 3,
    borderTopColor: '#2E7DFF',
    fontSize: 10,
  },
  footerRow: { flexDirection: 'column', alignItems: 'flex-start' },
  footerContact: { fontSize: 10, color: '#6B7280', marginBottom: 2.5 },
  footerRegInfo: { fontSize: 10, color: '#6B7280', marginBottom: 2.5 },
  footerConfidential: { fontSize: 10.2, color: '#2E7DFF', fontWeight: 'bold' },
  footerPage: { fontSize: 10, color: '#6B7280', fontWeight: 'bold', textAlign: 'right', marginTop: 2 },

  // ---------- BRAND COLORS ----------
  primaryBlue: { color: '#2E7DFF' },
  primaryGold: { color: '#FFB800' },
  primaryGreen: { color: '#00B47B' },

  // ---------- MISSING STYLES ----------
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

  disclaimerText: {
    fontSize: 9,
    color: '#7F1D1D',
    textAlign: 'center',
    lineHeight: 1.4,
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerLeft: {
    flex: 2,
  },

  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },

  confidentialBadge: {
    backgroundColor: '#2E7DFF',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },

  confidentialText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  tableSection: {
    marginBottom: 30,
    breakInside: 'avoid',
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

  content: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  // Portfolio dashboard specific styles
  portfolioDashboard: {
    backgroundColor: '#FFF8E7',
    borderWidth: 3,
    borderColor: '#FFB800',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
    breakInside: 'avoid',
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

  // User profile specific styles
  userProfile: {
    backgroundColor: '#F8FAFF',
    borderWidth: 3,
    borderColor: '#2E7DFF',
    borderLeftWidth: 8,
    borderLeftColor: '#FFB800',
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
    breakInside: 'avoid',
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

  // Page break styles
  pageBreak: {
    marginTop: 20,
    marginBottom: 20,
  },

  // Rewards specific styles
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

  // Helper styles
  w40: { width: '40%' },
  w15: { width: '15%' },
  w20: { width: '20%' },
  w30: { width: '30%' },
  w100: { width: '100%' },
});