
import { StyleSheet } from '@react-pdf/renderer';

export const headerStyles = StyleSheet.create({
  // Enhanced Header Section with Brand Colors
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#F8FAFF',
    padding: 20,
    borderRadius: 12,
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  sipBreweryLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
  },
  
  tagline: {
    fontSize: 14,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  
  trademarkText: {
    fontSize: 10,
    color: '#6B7280',
    marginRight: 8,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  
  equisculptText: {
    fontSize: 12,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 13,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  regulatoryInfo: {
    fontSize: 11,
    color: '#6B7280',
  },
  
  // Statement Title
  statementTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
});
