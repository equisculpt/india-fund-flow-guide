
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFFooterProps {
  generatedAt: Date;
}

export const PDFFooter: React.FC<PDFFooterProps> = ({ generatedAt }) => (
  <>
    <View style={styles.disclaimer}>
      <Text>
        IMPORTANT: This statement is generated using live BSE STAR MF API data. 
        SIP Brewery is an AMFI Registered Mutual Fund Distributor. All transactions are executed via BSE STAR MF platform. 
        Mutual fund investments are subject to market risks. Please read all scheme related documents carefully.
      </Text>
    </View>

    <View style={styles.footer}>
      <Text>
        SIP Brewery | support@sipbrewery.com | AMFI Registration: ARN-XXXXX | BSE Member ID: XXXXX
      </Text>
      <Text>Generated on {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')} | Page 1 of 1</Text>
    </View>
  </>
);
