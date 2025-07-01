
import { StyleSheet } from '@react-pdf/renderer';

export const cardStyles = StyleSheet.create({
  // Enhanced User Information Section - Premium Design
  userInfo: {
    backgroundColor: '#F8FAFF',
    padding: 30,
    borderRadius: 18,
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 25,
    textAlign: 'center',
  },
  userInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userInfoItem: {
    flex: 1,
    minWidth: '30%',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  userInfoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 15,
    color: '#1A1F36',
    fontWeight: 'bold',
  },

  // Enhanced Portfolio Glance Section
  portfolioGlance: {
    backgroundColor: '#F0FDF4',
    padding: 35,
    borderRadius: 20,
    marginBottom: 40,
    borderWidth: 4,
    borderColor: '#00B47B',
  },
  glanceTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1F36',
    textAlign: 'center',
    marginBottom: 30,
  },
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  glanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  glanceLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  glanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 8,
    textAlign: 'center',
  },
  glanceSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Goal Progress Section
  goalProgress: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  goalProgressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
    textAlign: 'center',
  },
  goalProgressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalProgressItem: {
    flex: 1,
    alignItems: 'center',
  },
  goalProgressLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  goalProgressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
  },

  // Performance Section - Enhanced Design
  performanceSection: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
    textAlign: 'center',
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7DFF',
  },

  // AI Insights Section - Premium Design with Enhanced Visual Appeal
  aiInsight: {
    backgroundColor: '#F3F4F6',
    padding: 30,
    borderRadius: 20,
    marginBottom: 35,
    borderWidth: 4,
    borderColor: '#6366F1',
    borderLeftWidth: 8,
    borderLeftColor: '#4F46E5',
  },
  aiInsightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'center',
  },
  aiInsightIcon: {
    backgroundColor: '#6366F1',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  aiInsightIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiInsightTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  aiInsightContent: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  aiInsightText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 15,
  },
  aiInsightHighlight: {
    fontSize: 14,
    color: '#065F46',
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  percentileBadge: {
    backgroundColor: '#EBF8FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  percentileBadgeText: {
    fontSize: 13,
    color: '#1E40AF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Summary Cards - Enhanced with Better Visual Hierarchy
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 6,
    textAlign: 'center',
  },
  summarySubtext: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
