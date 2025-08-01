
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
    borderTopColor: '#2E7DFF',
    paddingVertical: 12,
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
  confidentialBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  footerConfidential: {
    color: '#1A1F36',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  footerPage: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 5,
  },

  // Enhanced Disclaimer Section - Fixed positioning
  disclaimer: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 6,
    textAlign: 'center',
  },
  disclaimerText: {
    fontSize: 8,
    color: '#7F1D1D',
    lineHeight: 1.2,
    textAlign: 'justify',
  },
});
