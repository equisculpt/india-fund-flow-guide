
import { StyleSheet } from '@react-pdf/renderer';

export const headerStyles = StyleSheet.create({
  // Enhanced Header Section with Brand Colors
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
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
    marginBottom: 8,
  },
  
  sipBreweryLogo: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 3,
  },
  
  tagline: {
    fontSize: 13,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  
  trademarkText: {
    fontSize: 9,
    color: '#6B7280',
    marginRight: 6,
  },
  
  equisculptBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  equisculptLogo: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  
  equisculptText: {
    fontSize: 11,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  
  generatedDate: {
    fontSize: 12,
    color: '#1A1F36',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  regulatoryInfo: {
    fontSize: 10,
    color: '#6B7280',
  },
  
  // Statement Title
  statementTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1A1F36',
    backgroundColor: '#F5F8FF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2E7DFF',
  },
});
