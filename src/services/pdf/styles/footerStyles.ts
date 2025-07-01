
import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  // Disclaimer - Enhanced but Single Instance
  disclaimer: {
    marginTop: 35,
    padding: 22,
    backgroundColor: '#FEF2F2',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FECACA',
    borderLeftWidth: 6,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#7F1D1D',
    lineHeight: 1.5,
  },
  
  // Footer - Single Instance Only, Enhanced Design
  footer: {
    marginTop: 25,
    backgroundColor: '#F8FAFF',
    padding: 22,
    borderRadius: 15,
    borderTopWidth: 4,
    borderTopColor: '#2E7DFF',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerLeft: {
    flexDirection: 'column',
    flex: 1,
  },
  footerBranding: {
    marginBottom: 8,
  },
  footerCompany: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
  },
  footerTrademark: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 3,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 5,
  },
  footerConfidential: {
    fontSize: 11,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
