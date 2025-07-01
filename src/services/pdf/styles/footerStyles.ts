
import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  // Disclaimer - Enhanced
  disclaimer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FECACA',
    borderLeftWidth: 5,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 9,
    color: '#7F1D1D',
    lineHeight: 1.4,
  },
  
  // Footer - Enhanced and Fixed
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F8FAFF',
    padding: 15,
    borderRadius: 10,
    borderTopWidth: 3,
    borderTopColor: '#2E7DFF',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'column',
    flex: 1,
  },
  footerBranding: {
    marginBottom: 4,
  },
  footerCompany: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 2,
  },
  footerTrademark: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 9,
    color: '#6B7280',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 3,
  },
  footerPage: {
    fontSize: 9,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
