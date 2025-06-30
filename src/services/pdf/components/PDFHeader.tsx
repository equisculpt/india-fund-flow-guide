
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFHeaderProps {
  generatedAt: Date;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({ generatedAt }) => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Text style={styles.companyName}>SIP Brewery</Text>
      <Text style={styles.tagline}>Brewing Wealth, One SIP at a Time</Text>
    </View>
    <View style={styles.companyInfo}>
      <Text style={{ fontSize: 11, color: '#1A1F36', fontWeight: 'bold' }}>
        Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm')}
      </Text>
      <Text style={{ fontSize: 9, color: '#6B7280', marginTop: 2 }}>
        AMFI Reg: ARN-XXXXX | BSE Member
      </Text>
    </View>
  </View>
);
