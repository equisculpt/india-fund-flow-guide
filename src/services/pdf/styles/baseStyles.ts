
import { StyleSheet } from '@react-pdf/renderer';

export const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 25,
    paddingBottom: 150, // More space for disclaimer + footer
    fontFamily: 'Helvetica',
    fontSize: 12,
    position: 'relative',
    lineHeight: 1.5,
  },
  
  // Enhanced Brand Colors with HSL values
  primaryBlue: { color: '#2E7DFF' },
  primaryGold: { color: '#FFB800' },
  primaryGreen: { color: '#00B47B' },
  primaryRed: { color: '#EF4444' },
  textPrimary: { color: '#1A1F36' },
  textSecondary: { color: '#6B7280' },
  textMuted: { color: '#9CA3AF' },
  
  // Typography - Modern Scale
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
  },
  subText: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  
  // Currency & Numbers - Enhanced with proper formatting
  currencyLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  currencyMedium: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  currencySmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1F36',
  },
  percentagePositive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00B47B',
  },
  percentageNegative: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  
  // Enhanced Spacing System
  spacingXS: { marginBottom: 8 },
  spacingSM: { marginBottom: 16 },
  spacingMD: { marginBottom: 24 },
  spacingLG: { marginBottom: 32 },
  spacingXL: { marginBottom: 40 },
  
  // Professional Card System
  cardBase: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    marginBottom: 24,
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 28,
    marginBottom: 28,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardPrimary: {
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2E7DFF',
    borderLeftWidth: 6,
    borderLeftColor: '#2E7DFF',
    padding: 28,
    marginBottom: 28,
  },
  
  // Status Indicators
  statusSuccess: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    borderColor: '#16A34A',
  },
  statusWarning: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    borderColor: '#D97706',
  },
  statusError: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
    borderColor: '#DC2626',
  },
  statusInfo: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    borderColor: '#3B82F6',
  },
});
