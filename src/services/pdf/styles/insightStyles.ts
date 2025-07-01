
import { StyleSheet } from '@react-pdf/renderer';

export const insightStyles = StyleSheet.create({
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
    flex: 1,
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
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#00B47B',
    borderRadius: 5,
  },
});
