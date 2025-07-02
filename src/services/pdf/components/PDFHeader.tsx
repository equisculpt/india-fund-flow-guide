import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFHeaderProps {
  generatedAt: Date;
  amfiReg?: string;
  bseMember?: string;
  sebiReg?: string;
}

// Professional watermark - single line, never breaks
const Watermark = () => (
  <View
    style={{
      position: 'absolute',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(-20deg)',
      zIndex: -1,
    }}
    fixed
  >
    <Text style={{ 
      fontSize: 42, 
      color: '#F8FAFF', 
      fontWeight: 'bold', 
      letterSpacing: 6,
      opacity: 0.08,
    }}>
      SIP BREWERY
    </Text>
  </View>
);

export const PDFHeader: React.FC<PDFHeaderProps> = ({ 
  generatedAt,
  amfiReg = 'ARN-XXXXX',
  bseMember = 'XXXXX',
  sebiReg = 'INZ000XXXXXX'
}) => (
  <>
    <Watermark />
    
    <View style={styles.header}>
      <View style={styles.logoSection}>
        <View style={styles.mainLogo}>
          <View style={[styles.sipBreweryLogo, { backgroundColor: '#FFB800', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>SB</Text>
          </View>
          <View style={styles.brandingText}>
            <Text style={styles.companyName}>SIP Brewery</Text>
            <Text style={styles.tagline}>Brewing Wealth, One SIP at a Time</Text>
          </View>
        </View>
        <View style={styles.trademarkSection}>
          <Text style={styles.trademarkText}>A Trademark of</Text>
          <View style={styles.equisculptBrand}>
            <View style={[styles.equisculptLogo, { backgroundColor: '#00B47B', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>EV</Text>
            </View>
            <Text style={styles.equisculptText}>Equisculpt Ventures</Text>
          </View>
        </View>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.generatedDate}>
          Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm')}
        </Text>
        <View style={styles.regulatoryBadge}>
          <Text style={styles.regulatoryBadgeText}>
            AMFI: {amfiReg}
            {'\n'}BSE: {bseMember}
            {'\n'}SEBI: {sebiReg}
          </Text>
        </View>
      </View>
    </View>
    
    <View style={styles.statementPeriod}>
      <Text>Statement Period: {format(generatedAt, 'MMMM yyyy')} | Generated on {format(generatedAt, 'dd MMM yyyy at HH:mm')}</Text>
    </View>
  </>
);