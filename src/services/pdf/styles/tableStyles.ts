
import { StyleSheet } from '@react-pdf/renderer';

export const tableStyles = StyleSheet.create({
  // Professional Table Section
  section: {
    marginBottom: 25,
    breakInside: 'avoid',
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 16,
    borderRadius: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  // Enhanced Table Container
  tableContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    breakInside: 'avoid',
  },
  
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7DFF',
  },
  
  tableHeaderCell: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  
  // Enhanced Table Rows
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  
  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
    alignItems: 'center',
  },
  
  // Professional Table Cells
  tableCell: {
    fontSize: 10,
    color: '#374151',
    paddingHorizontal: 8,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  
  tableCellBold: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  
  tableCellGreen: {
    fontSize: 10,
    color: '#00B47B',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  
  tableCellRed: {
    fontSize: 10,
    color: '#EF4444',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  
  // Fund Name Cell (Left Aligned)
  tableCellFund: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 1.3,
  },
  
  // Recent Transactions Section - Enhanced
  transactionSection: {
    marginBottom: 35,
    padding: 30,
    backgroundColor: '#F8FAFF',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#2E7DFF',
  },
  transactionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 25,
    textAlign: 'center',
  },
  transactionTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  
  // Upcoming SIPs Section - Enhanced
  upcomingSipSection: {
    marginBottom: 35,
    padding: 30,
    backgroundColor: '#F0FDF4',
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#00B47B',
  },
  upcomingSipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 25,
    textAlign: 'center',
  },
});
