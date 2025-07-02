import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { modernStyles } from '../../styles/modernPDFStyles';

export const ModernPDFWatermark: React.FC = () => (
  <View style={modernStyles.watermark} fixed>
    <Text>SIP BREWERY</Text>
  </View>
);