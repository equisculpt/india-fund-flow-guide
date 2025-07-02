import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFCapitalGains = ({ capitalGains }: any) => (
  <View style={styles.capitalGainsSection}>
    <Text style={styles.capitalGainsTitle}>Capital Gains Statement</Text>
    {/* Two tables: Short Term & Long Term */}
  </View>
);