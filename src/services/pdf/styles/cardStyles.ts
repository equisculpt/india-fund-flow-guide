
import { StyleSheet } from '@react-pdf/renderer';

export const cardStyles = StyleSheet.create({
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
    marginBottom: 12,
  },
  userInfoLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 13,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  // Portfolio At a Glance - Horizontal Numbers Bar
  portfolioGlance: {
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#FFF8E7',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFB800',
  },
  glanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
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
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  glanceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  glanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
  },
  glanceSubtext: {
    fontSize: 10,
    color: '#00B47B',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 'bold',
  },
  
  // Performance Section - Enhanced
  performanceSection: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#00B47B',
    marginTop: 15,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 18,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    minWidth: '22%',
    borderWidth: 1,
    borderColor: '#00B47B',
  },
  performanceLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  performanceValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  
  // AI Insight Section - Enhanced
  aiInsight: {
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#FFF8E7',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFB800',
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  aiInsightIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#FFB800',
    borderRadius: 14,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    flex: 1,
  },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#FFB800',
  },
  aiInsightText: {
    fontSize: 13,
    color: '#1A1F36',
    lineHeight: 1.6,
    marginBottom: 12,
  },
  aiInsightHighlight: {
    fontSize: 12,
    color: '#00B47B',
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
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  summarySubtext: {
    fontSize: 11,
    color: '#00B47B',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
