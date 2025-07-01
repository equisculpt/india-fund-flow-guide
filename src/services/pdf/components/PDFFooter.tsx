
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFFooterProps {
  generatedAt: Date;
  amfiReg?: string;
  bseMember?: string;
  sebiReg?: string;
}

export const PDFFooter: React.FC<PDFFooterProps> = ({ 
  generatedAt,
  amfiReg = 'ARN-XXXXX',
  bseMember = 'XXXXX',
  sebiReg = 'INZ000XXXXXX'
}) => (
  <View fixed style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    {/* Single disclaimer at the bottom */}
    <View style={styles.disclaimer}>
      <Text style={styles.disclaimerTitle}>Important Disclaimer & Risk Information</Text>
      <Text style={styles.disclaimerText}>
        This statement is generated using live BSE STAR MF API data. SIP Brewery is an AMFI Registered Mutual Fund Distributor ({amfiReg}). 
        All transactions are executed via BSE STAR MF platform. Mutual fund investments are subject to market risks. 
        Past performance is not indicative of future returns. Please read all scheme related documents carefully before investing. 
        AI-generated insights are for informational purposes only and should not be considered as investment advice. 
        Please consult with a qualified financial advisor before making investment decisions.
      </Text>
    </View>

    {/* Footer with contact info - appears only once per page */}
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerLeft}>
          <View style={styles.footerBranding}>
            <Text style={styles.footerCompany}>SIP Brewery - Brewing Wealth, One SIP at a Time</Text>
            <Text style={styles.footerTrademark}>A Trademark of Equisculpt Ventures</Text>
          </View>
          <Text style={styles.footerContact}>
            Email: support@sipbrewery.com | Mobile: +91-9876543210
          </Text>
          <Text style={styles.footerContact}>
            Web: www.sipbrewery.com | WhatsApp: +91-9876543210
          </Text>
          <Text style={[styles.footerContact, { marginTop: 5 }]}>
            AMFI Reg: {amfiReg} | BSE Member: {bseMember} | SEBI Reg: {sebiReg}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerGenerated}>
            Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')}
          </Text>
          <View style={styles.confidentialBadge}>
            <Text style={styles.footerConfidential}>Confidential Document</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);
