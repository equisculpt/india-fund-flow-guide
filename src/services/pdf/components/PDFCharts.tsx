import React from 'react';
import { View, Image, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFCharts = ({ chartsData }: any) => (
  <View style={styles.chartsSection}>
    <Text style={styles.chartsTitle}>Portfolio Visuals</Text>
    {/* If SVG/base64 pie/bar chart is available, display here */}
    {chartsData?.allocationPie && (
      <Image src={chartsData.allocationPie} style={styles.chartImage} />
    )}
    {chartsData?.returnsBarChart && (
      <Image src={chartsData.returnsBarChart} style={styles.chartImage} />
    )}
  </View>
);