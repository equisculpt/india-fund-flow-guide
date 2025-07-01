
import { StyleSheet } from '@react-pdf/renderer';

export const tableStyles = StyleSheet.create({
  // Holdings Table - Enhanced
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
  tableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1A1F36',
    padding: 12,
  },
  tableHeaderCell: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableCell: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
  },
  tableCellBold: {
    fontSize: 10,
    color: '#1A1F36',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  tableCellGreen: {
    fontSize: 10,
    color: '#00B47B',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
});
