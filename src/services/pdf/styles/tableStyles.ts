
import { StyleSheet } from '@react-pdf/renderer';

export const tableStyles = StyleSheet.create({
  // Holdings Table - Enhanced
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 15,
    borderRadius: 12,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  tableContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 15,
  },
  tableHeaderCell: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableCell: {
    fontSize: 11,
    color: '#1A1F36',
    paddingHorizontal: 10,
  },
  tableCellBold: {
    fontSize: 11,
    color: '#1A1F36',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 11,
    color: '#00B47B',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  tableCellRed: {
    fontSize: 11,
    color: '#EF4444',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});
