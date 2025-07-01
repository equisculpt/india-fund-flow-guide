
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
  <Text
    render={({ pageNumber, totalPages }) => (
      <>
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

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <View style={styles.footerBranding}>
                <Text style={styles.footerCompany}>SIP Brewery - Brewing Wealth, One SIP at a Time</Text>
                <Text style={styles.footerTrademark}>A Trademark of Equisculpt Ventures</Text>
              </View>
              <Text style={styles.footerContact}>
                <Text style={{ fontWeight: 'bold' }}>Email:</Text> support@sipbrewery.com | <Text style={{ fontWeight: 'bold' }}>Mobile:</Text> +91-9876543210
              </Text>
              <Text style={styles.footerContact}>
                <Text style={{ fontWeight: 'bold' }}>Web:</Text> www.sipbrewery.com | <Text style={{ fontWeight: 'bold' }}>WhatsApp:</Text> +91-9876543210
              </Text>
              <Text style={[styles.footerContact, { marginTop: 5 }]}>
                <Text style={{ fontWeight: 'bold' }}>AMFI Reg:</Text> {amfiReg} | <Text style={{ fontWeight: 'bold' }}>BSE Member:</Text> {bseMember} | <Text style={{ fontWeight: 'bold' }}>SEBI Reg:</Text> {sebiReg}
              </Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.footerGenerated}>
                Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')}
              </Text>
              <View style={styles.confidentialBadge}>
                <Text style={styles.footerConfidential}>Confidential Document</Text>
              </View>
              <Text style={[styles.footerGenerated, { marginTop: 5, fontSize: 10 }]}>
                Page {pageNumber} of {totalPages}
              </Text>
            </View>
          </View>
        </View>
      </>
    )}
    fixed
  />
);
