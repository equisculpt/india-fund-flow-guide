
import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  // Disclaimer - Enhanced
  disclaimer: {
    marginTop: 30,
    padding: 18,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FECACA',
    borderLeftWidth: 5,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 10,
    color: '#7F1D1D',
    lineHeight: 1.5,
  },
  
  // Footer - Enhanced and Fixed (Single Instance)
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F8FAFF',
    padding: 18,
    borderRadius: 12,
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
    marginBottom: 5,
  },
  footerCompany: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 3,
  },
  footerTrademark: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 10,
    color: '#6B7280',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerPage: {
    fontSize: 10,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
