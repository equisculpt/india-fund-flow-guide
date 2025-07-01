
import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  // Disclaimer - Single Instance Only
  disclaimer: {
    marginTop: 40,
    padding: 25,
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    borderWidth: 4,
    borderColor: '#FECACA',
    borderLeftWidth: 8,
    borderLeftColor: '#EF4444',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#7F1D1D',
    lineHeight: 1.6,
  },
  
  // Footer - Single Instance Only, Premium Design
  footer: {
    marginTop: 30,
    backgroundColor: '#F8FAFF',
    padding: 25,
    borderRadius: 18,
    borderTopWidth: 5,
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
    marginBottom: 10,
  },
  footerCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 5,
  },
  footerTrademark: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  footerGenerated: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  footerConfidential: {
    fontSize: 12,
    color: '#2E7DFF',
    fontWeight: 'bold',
  },
});
