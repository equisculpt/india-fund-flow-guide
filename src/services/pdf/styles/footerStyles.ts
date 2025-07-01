
import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  // Enhanced Footer with Page Numbers
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerLeft: {
    flex: 2,
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerBranding: {
    marginBottom: 8,
  },
  footerCompany: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7DFF',
    marginBottom: 3,
  },
  footerTrademark: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  footerContact: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 2,
  },
  footerGenerated: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'right',
  },
  footerConfidential: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#EF4444',
    textAlign: 'right',
    marginTop: 3,
  },
  footerPage: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 5,
  },

  // Enhanced Disclaimer Section
  disclaimer: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB800',
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 12,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 10,
    color: '#92400E',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
});
