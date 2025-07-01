
import { StyleSheet } from '@react-pdf/renderer';

export const baseStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 11,
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
  
  // Typography - Enhanced
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 20,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 15,
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 12,
  },
  
  // Enhanced Spacing
  sectionSpacing: {
    marginBottom: 35,
  },
  
  // Currency - Fixed to use proper Rupee symbol
  rupeeText: {
    fontSize: 11,
    color: '#1A1F36',
  },
  rupeeSymbol: {
    fontSize: 11,
    color: '#1A1F36',
  },
  
  // Watermark
  watermark: {
    position: 'absolute',
    top: 200,
    left: 100,
    right: 100,
    bottom: 200,
    opacity: 0.08,
    transform: 'rotate(-45deg)',
    fontSize: 48,
    color: '#2E7DFF',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    zIndex: -1,
  },
});
