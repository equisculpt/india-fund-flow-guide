
import { StyleSheet } from '@react-pdf/renderer';

export const headerStyles = StyleSheet.create({
  // Professional Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 3,
    borderBottomColor: '#2E7DFF',
    backgroundColor: '#FAFBFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  
  logoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 2,
  },
  
  mainLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sipBreweryLogo: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  
  brandingText: {
    flexDirection: 'column',
  },
  
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 4,
    whiteSpace: 'nowrap', // Prevent breaking
  },
  
  tagline: {
    fontSize: 14,
    color: '#2E7DFF',
    fontStyle: 'italic',
    fontWeight: 'semibold',
    whiteSpace: 'nowrap', // Prevent breaking
  },
  
  trademarkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
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
    color: '#374151',
    fontWeight: 'bold',
  },
  
  headerInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
  },
  
  generatedDate: {
    fontSize: 12,
    color: '#374151',
    fontWeight: 'semibold',
    marginBottom: 8,
    textAlign: 'right',
  },
  
  regulatoryBadge: {
    backgroundColor: '#2E7DFF',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    maxWidth: 200,
  },
  
  regulatoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  
  // Enhanced Statement Title
  statementTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#FFFFFF',
    backgroundColor: '#2E7DFF',
    padding: 20,
    borderRadius: 12,
    letterSpacing: 0.5,
    whiteSpace: 'nowrap', // Prevent title breaking
  },
  
  // Fixed Watermark - Single Line, Subtle
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-25deg)',
    fontSize: 48,
    color: '#F8FAFF',
    fontWeight: 'bold',
    opacity: 0.08,
    zIndex: -1,
    whiteSpace: 'nowrap', // Critical: Never break watermark
    pointerEvents: 'none',
  },
  
  // Professional Statement Period
  statementPeriod: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
