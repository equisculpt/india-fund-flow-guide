
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
            src="/lovable-uploads/d0cc5477-61a2-4b56-86ed-121ba801e938.png" 
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
            AMFI: {amfiReg}{'\n'}BSE: {bseMember}{'\n'}SEBI: {sebiReg}
          </Text>
        </View>
      </View>
    </View>
    
    {/* Statement Period - Professional Display */}
    <View style={styles.statementPeriod}>
      <Text>Statement Period: {format(generatedAt, 'MMMM yyyy')} | Generated on {format(generatedAt, 'dd MMM yyyy at HH:mm')}</Text>
    </View>
  </>
);
