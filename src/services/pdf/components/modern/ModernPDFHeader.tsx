import React from 'react';
import { View, Text, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { modernStyles } from '../../styles/modernPDFStyles';

interface ModernPDFHeaderProps {
  generatedAt: Date;
  amfiReg?: string;
  bseMember?: string;
  sebiReg?: string;
}

export const ModernPDFHeader: React.FC<ModernPDFHeaderProps> = ({ 
  generatedAt,
  amfiReg = 'ARN-XXXXX',
  bseMember = 'XXXXX',
  sebiReg = 'INZ000XXXXXX'
}) => (
  <View style={modernStyles.header} fixed>
    <View style={modernStyles.logoSection}>
      <View style={modernStyles.mainLogo}>
        <Image 
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
          }}
          src="/lovable-uploads/884b7fa3-86c8-4d42-8abf-8bd2cc7fcddb.png"
        />
        <View>
          <Text style={modernStyles.companyName}>SIP Brewery</Text>
          <Text style={modernStyles.tagline}>Brewing Wealth, One SIP at a Time</Text>
        </View>
      </View>
      <View style={modernStyles.trademarkSection}>
        <Text style={modernStyles.trademarkText}>A Trademark of</Text>
        <View style={{
          width: 16,
          height: 16,
          backgroundColor: '#00B47B',
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 6,
        }}>
          <Text style={{ color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' }}>EV</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#374151', fontWeight: 'bold' }}>
          Equisculpt Ventures
        </Text>
      </View>
    </View>
    
    <View style={modernStyles.headerInfo}>
      <Text style={modernStyles.generatedDate}>
        Generated: {format(generatedAt, 'dd MMM yyyy, HH:mm')}
      </Text>
      <View style={modernStyles.regulatoryBadge}>
        <Text style={modernStyles.regulatoryText}>
          AMFI: {amfiReg}
        </Text>
        <Text style={modernStyles.regulatoryText}>
          BSE: {bseMember}
        </Text>
        <Text style={modernStyles.regulatoryText}>
          SEBI: {sebiReg}
        </Text>
      </View>
    </View>
  </View>
);