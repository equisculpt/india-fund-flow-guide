import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFUpcomingSIPs = ({ sips }: any) => (
  <View style={styles.upcomingSipSection}>
    <Text style={styles.upcomingSipTitle}>Upcoming SIPs</Text>
    {/* Table as per prompt */}
  </View>
);