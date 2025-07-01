
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
  
  // Currency - Using proper Unicode Rupee symbol
  rupeeText: {
    fontSize: 11,
    color: '#1A1F36',
  },
  rupeeSymbol: {
    fontSize: 11,
    color: '#1A1F36',
  },
  
  // Watermark - Enhanced and Subtle
  watermark: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    transform: 'rotate(-45deg)',
    fontSize: 60,
    color: '#2E7DFF',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    zIndex: -1,
  },
});
