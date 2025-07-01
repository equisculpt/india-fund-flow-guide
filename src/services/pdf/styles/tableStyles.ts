
import { StyleSheet } from '@react-pdf/renderer';

export const tableStyles = StyleSheet.create({
  // Holdings Table - Premium Design
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 25,
    borderRadius: 18,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: '#1E40AF',
  },
  tableContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#E5E7EB',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 20,
  },
  tableHeaderCell: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 6,
    borderLeftColor: '#FFB800',
  },
  tableCell: {
    fontSize: 13,
    color: '#1A1F36',
    paddingHorizontal: 15,
  },
  tableCellBold: {
    fontSize: 13,
    color: '#1A1F36',
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 13,
    color: '#00B47B',
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  tableCellRed: {
    fontSize: 13,
    color: '#EF4444',
    paddingHorizontal: 15,
    fontWeight: 'bold',
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
