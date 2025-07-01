
import { StyleSheet } from '@react-pdf/renderer';

export const portfolioStyles = StyleSheet.create({
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
});
