
import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFFooterProps {
  generatedAt: Date;
}

export const PDFFooter: React.FC<PDFFooterProps> = ({ generatedAt }) => (
  <>
    <View style={styles.disclaimer}>
      <Text style={styles.disclaimerTitle}>⚠️ Important Disclaimer & Risk Information</Text>
      <Text style={styles.disclaimerText}>
        This statement is generated using live BSE STAR MF API data. SIP Brewery is an AMFI Registered Mutual Fund Distributor (ARN-XXXXX). 
        All transactions are executed via BSE STAR MF platform. Mutual fund investments are subject to market risks. 
        Past performance is not indicative of future returns. Please read all scheme related documents carefully before investing. 
        AI-generated insights are for informational purposes only and should not be considered as investment advice.
      </Text>
    </View>

    <View style={styles.footer} fixed>
      <View style={styles.footerContent}>
        <View style={styles.footerLeft}>
          <View style={styles.footerBranding}>
            <Text style={styles.footerCompany}>SIP Brewery - Brewing Wealth, One SIP at a Time</Text>
            <Text style={styles.footerTrademark}>A Trademark of Equisculpt Ventures</Text>
          </View>
          <Text style={styles.footerContact}>
            📧 support@sipbrewery.com | 📱 +91-9876543210 | 🌐 www.sipbrewery.com
          </Text>
          <Text style={[styles.footerContact, { marginTop: 2 }]}>
            AMFI Reg: ARN-XXXXX | BSE Member ID: XXXXX
          </Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerGenerated}>
            Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')}
          </Text>
          <Text style={styles.footerPage}>Page 1 of 1 | Confidential</Text>
        </View>
      </View>
    </View>
  </>
);
