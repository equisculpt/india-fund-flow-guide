
import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFHeaderProps {
  generatedAt: Date;
  amfiReg?: string;
  bseMember?: string;
  sebiReg?: string;
}

// Subtle watermark that doesn't interfere with content
const Watermark = () => (
  <View
    style={{
      position: 'absolute',
      top: '35%',
      left: '15%',
      transform: 'rotate(-25deg)',
      zIndex: -1,
      width: '70%',
      textAlign: 'center',
    }}
    fixed
  >
    <Text style={{ 
      fontSize: 60, 
      color: '#F8FAFF', 
      fontWeight: 'bold', 
      letterSpacing: 8,
      opacity: 0.3
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
          <Image 
            src="/lovable-uploads/99e2a29d-6fe9-4d36-bd76-18218c48103e.png" 
            style={styles.sipBreweryLogo}
          />
          <View style={styles.brandingText}>
            <Text style={styles.companyName}>SIP Brewery</Text>
            <Text style={styles.tagline}>Brewing Wealth, One SIP at a Time</Text>
          </View>
        </View>
        <View style={styles.trademarkSection}>
          <Text style={styles.trademarkText}>A Trademark of</Text>
          <View style={styles.equisculptBrand}>
            <Image 
              src="/lovable-uploads/b16468ef-9745-48f9-a26e-c8c3869b2a13.png" 
              style={styles.equisculptLogo}
            />
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
            AMFI: {amfiReg} | BSE: {bseMember} | SEBI: {sebiReg}
          </Text>
        </View>
      </View>
    </View>
  </>
);
