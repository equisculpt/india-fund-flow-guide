import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { modernStyles } from '../../styles/modernPDFStyles';

interface ModernFooterProps {
  generatedAt: Date;
  amfiReg?: string;
  bseMember?: string;
  sebiReg?: string;
  pageNumber?: number;
  totalPages?: number;
}

export const ModernFooter: React.FC<ModernFooterProps> = ({ 
  generatedAt,
  amfiReg = 'ARN-XXXXX',
  bseMember = 'XXXXX',
  sebiReg = 'INZ000XXXXXX',
  pageNumber = 1,
  totalPages = 1
}) => (
  <View style={modernStyles.footer} fixed>
    {/* Disclaimer */}
    <View style={modernStyles.disclaimer}>
      <Text style={modernStyles.disclaimerText}>
        Important Disclaimer: This statement is generated using live BSE STAR MF API data. SIP Brewery is an AMFI Registered Mutual Fund Distributor ({amfiReg}). 
        All transactions are executed via BSE STAR MF platform. Mutual fund investments are subject to market risks. 
        Past performance is not indicative of future returns. Please read all scheme related documents carefully before investing. 
        AI-generated insights are for informational purposes only and should not be considered as investment advice.
      </Text>
    </View>

    {/* Footer Content */}
    <View style={modernStyles.footerContent}>
      <View style={modernStyles.footerLeft}>
        <Text style={[modernStyles.footerContact, { fontWeight: 'bold', color: '#2E7DFF' }]}>
          SIP Brewery - Brewing Wealth, One SIP at a Time
        </Text>
        <Text style={modernStyles.footerContact}>
          Email: support@sipbrewery.com | Mobile: +91-9876543210
        </Text>
        <Text style={modernStyles.footerContact}>
          Web: www.sipbrewery.com | WhatsApp: +91-9876543210
        </Text>
        <Text style={modernStyles.footerContact}>
          AMFI: {amfiReg} | BSE: {bseMember} | SEBI: {sebiReg}
        </Text>
      </View>
      
      <View style={modernStyles.footerRight}>
        <Text style={modernStyles.footerPage}>
          Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm:ss')}
        </Text>
        <Text style={modernStyles.footerPage}>
          Page {pageNumber} of {totalPages}
        </Text>
        <View style={modernStyles.confidentialBadge}>
          <Text style={modernStyles.confidentialText}>Confidential Document</Text>
        </View>
      </View>
    </View>
  </View>
);