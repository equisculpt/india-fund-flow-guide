
import { StyleSheet } from '@react-pdf/renderer';

export const portfolioStyles = StyleSheet.create({
  // Portfolio Dashboard - Horizontal Layout
  portfolioGlance: {
    backgroundColor: '#FAFBFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#2E7DFF',
    borderTopWidth: 4,
    borderTopColor: '#2E7DFF',
  },
  
  glanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  glanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    letterSpacing: 0.3,
  },
  
  aiBadge: {
    backgroundColor: '#2E7DFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  
  aiBadgeIcon: {
    marginRight: 6,
    color: '#FFFFFF',
    fontSize: 12,
  },
  
  // Horizontal Dashboard Cards
  glanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  
  glanceCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  
  glanceCardPrimary: {
    backgroundColor: '#F0F9FF',
    borderColor: '#2E7DFF',
    borderLeftWidth: 4,
    borderLeftColor: '#2E7DFF',
  },
  
  glanceCardSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#00B47B',
    borderLeftWidth: 4,
    borderLeftColor: '#00B47B',
  },
  
  glanceCardWarning: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFB800',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  
  glanceLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  glanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  trendIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  sparklineContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  glanceSubtext: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  glanceIcon: {
    fontSize: 14,
    marginBottom: 8,
  },
  
  // Enhanced XIRR Explanation
  xirrExplanation: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7DFF',
  },
  
  xirrNote: {
    fontSize: 10,
    color: '#1E40AF',
    lineHeight: 1.4,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Goal Progress Section
  goalProgress: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderTopWidth: 4,
    borderTopColor: '#00B47B',
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
    textTransform: 'uppercase',
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
    borderTopWidth: 4,
    borderTopColor: '#FFB800',
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
    textTransform: 'uppercase',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7DFF',
  },
});
