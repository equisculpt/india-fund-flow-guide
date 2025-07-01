
import { StyleSheet } from '@react-pdf/renderer';

export const tableStyles = StyleSheet.create({
  // Holdings Table - Enhanced with Better Visual Hierarchy
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 20,
    borderRadius: 15,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#1E40AF',
  },
  tableContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#E5E7EB',
    marginBottom: 25,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 18,
  },
  tableHeaderCell: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowHighlight: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  tableCell: {
    fontSize: 12,
    color: '#1A1F36',
    paddingHorizontal: 12,
  },
  tableCellBold: {
    fontSize: 12,
    color: '#1A1F36',
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 12,
    color: '#00B47B',
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  tableCellRed: {
    fontSize: 12,
    color: '#EF4444',
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  
  // Recent Transactions Section
  transactionSection: {
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#F8FAFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionTable: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  // Upcoming SIPs Section
  upcomingSipSection: {
    marginBottom: 30,
    padding: 25,
    backgroundColor: '#F0FDF4',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00B47B',
  },
  upcomingSipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
    textAlign: 'center',
  },
});
