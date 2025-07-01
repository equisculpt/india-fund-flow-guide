
import { StyleSheet } from '@react-pdf/renderer';

export const cardStyles = StyleSheet.create({
  // User Info Card - Enhanced with Better Typography
  userInfo: {
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#F8FAFF',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
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
    marginBottom: 15,
  },
  userInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 14,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  // Portfolio At a Glance - Enhanced Numbers Bar
  portfolioGlance: {
    marginBottom: 35,
    padding: 30,
    backgroundColor: '#FFF8E7',
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#FFB800',
  },
  glanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1A1F36',
  },
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  glanceCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  glanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  glanceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
  },
  glanceSubtext: {
    fontSize: 11,
    color: '#00B47B',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: 'bold',
  },
  
  // Performance Section - Enhanced
  performanceSection: {
    backgroundColor: '#F0FDF4',
    padding: 25,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#00B47B',
    marginTop: 20,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 22,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    minWidth: '22%',
    borderWidth: 2,
    borderColor: '#00B47B',
  },
  performanceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  performanceValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  
  // AI Insight Section - Major Enhancement
  aiInsight: {
    marginBottom: 35,
    padding: 30,
    backgroundColor: '#FFF8E7',
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#FFB800',
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  aiInsightIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFB800',
    borderRadius: 16,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightIconText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  aiInsightTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    flex: 1,
  },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
    borderLeftWidth: 6,
    borderLeftColor: '#FFB800',
  },
  aiInsightText: {
    fontSize: 14,
    color: '#1A1F36',
    lineHeight: 1.7,
    marginBottom: 15,
  },
  aiInsightHighlight: {
    fontSize: 13,
    color: '#00B47B',
    fontWeight: 'bold',
  },
  percentileBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  percentileBadgeText: {
    color: '#1A1F36',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Summary Cards - Enhanced
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 25,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#E5E7EB',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  summaryTitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  summarySubtext: {
    fontSize: 12,
    color: '#00B47B',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
