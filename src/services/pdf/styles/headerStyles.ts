
import { StyleSheet } from '@react-pdf/renderer';

export const headerStyles = StyleSheet.create({
  // Enhanced Header Section with Professional Layout
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    paddingBottom: 30,
    borderBottomWidth: 4,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 30,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  sipBreweryLogo: {
    width: 75,
    height: 75,
    marginRight: 25,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 8,
  },
  
  tagline: {
    fontSize: 18,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  
  trademarkText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 12,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  
  equisculptText: {
    fontSize: 14,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 16,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  regulatoryInfo: {
    fontSize: 13,
    color: '#6B7280',
  },
  
  // Statement Title - Professional Enhancement
  statementTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 25,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#1E40AF',
  },
});
