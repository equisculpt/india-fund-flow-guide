import React from 'react';
import { View, Image, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

export const PDFCharts = ({ chartsData }: any) => {
  if (!chartsData) {
    return (
      <View style={styles.chartsSection}>
        <Text style={styles.chartsTitle}>Portfolio Visuals</Text>
        <Text style={{ textAlign: 'center', margin: 20, color: '#6B7280' }}>
          Chart data not available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.chartsSection}>
      <Text style={styles.chartsTitle}>Portfolio Visuals</Text>
      
      {chartsData.allocationPie && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, marginBottom: 10, textAlign: 'center' }}>
            Asset Allocation
          </Text>
          <Image src={chartsData.allocationPie} style={styles.chartImage} />
        </View>
      )}
      
      {chartsData.returnsBarChart && (
        <View>
          <Text style={{ fontSize: 12, marginBottom: 10, textAlign: 'center' }}>
            Monthly Returns
          </Text>
          <Image src={chartsData.returnsBarChart} style={styles.chartImage} />
        </View>
      )}
    </View>
  );
};