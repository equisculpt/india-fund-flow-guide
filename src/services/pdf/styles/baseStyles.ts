
import { StyleSheet } from '@react-pdf/renderer';

export const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 10,
    position: 'relative',
  },
  
  // Brand Colors
  primaryBlue: {
    color: '#2E7DFF',
  },
  primaryGold: {
    color: '#FFB800',
  },
  primaryGreen: {
    color: '#00B47B',
  },
  
  // Typography
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 15,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 12,
  },
  heading3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 8,
  },
  
  // Spacing
  sectionSpacing: {
    marginBottom: 20,
  },
  
  // Currency
  rupeeSymbol: {
    fontSize: 10,
    color: '#1A1F36',
  },
});
