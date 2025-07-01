
import { StyleSheet } from '@react-pdf/renderer';

export const summaryStyles = StyleSheet.create({
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
