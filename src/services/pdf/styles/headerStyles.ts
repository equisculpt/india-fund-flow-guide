
import { StyleSheet } from '@react-pdf/renderer';

export const headerStyles = StyleSheet.create({
  // Enhanced Header Section with Larger Logo
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
    paddingBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 25,
    borderRadius: 15,
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sipBreweryLogo: {
    width: 65,
    height: 65,
    marginRight: 20,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 6,
  },
  
  tagline: {
    fontSize: 16,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  
  trademarkText: {
    fontSize: 11,
    color: '#6B7280',
    marginRight: 10,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  
  equisculptText: {
    fontSize: 13,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 14,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  
  regulatoryInfo: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  // Statement Title - Enhanced
  statementTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 22,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#2E7DFF',
  },
});
