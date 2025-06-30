
import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { styles } from '../styles/pdfStyles';

interface PDFHeaderProps {
  generatedAt: Date;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({ generatedAt }) => (
  <View style={styles.header}>
    <View style={styles.logoSection}>
      <View style={styles.mainLogo}>
        <Image 
          src="/lovable-uploads/8099c86d-175f-43be-93ec-c6756cc0c0ed.png" 
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
            src="/lovable-uploads/8099c86d-175f-43be-93ec-c6756cc0c0ed.png" 
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
      <Text style={styles.regulatoryInfo}>
        AMFI Reg: ARN-XXXXX | BSE Member
      </Text>
    </View>
  </View>
);
