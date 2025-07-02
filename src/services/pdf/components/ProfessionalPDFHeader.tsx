import React from 'react';
import { View, Text } from '@react-pdf/renderer';

const headerStyles = {
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottom: '3px solid #2563EB',
  },
  
  logoSection: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
  },
  
  logoText: {
    fontSize: 28, // 28pt for main logo
    fontWeight: 'bold' as const,
    color: '#2563EB',
    letterSpacing: 1,
  },
  
  tagline: {
    fontSize: 11, // 11pt for tagline
    color: '#6B7280',
    fontStyle: 'italic' as const,
  },
  
  metaSection: {
    alignItems: 'flex-end' as const,
  },
  
  documentTitle: {
    fontSize: 16, // 16pt for document title
    fontWeight: 'bold' as const,
    color: '#1F2937',
    marginBottom: 4,
  },
  
  generatedDate: {
    fontSize: 10, // 10pt for metadata
    color: '#6B7280',
    marginBottom: 2,
  },
  
  statementType: {
    fontSize: 9, // 9pt for type info
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    padding: '4 8',
    borderRadius: 3,
  },
};

interface ProfessionalPDFHeaderProps {
  generatedAt: string;
  statementType?: string;
  documentTitle?: string;
}

export const ProfessionalPDFHeader: React.FC<ProfessionalPDFHeaderProps> = ({ 
  generatedAt, 
  statementType = 'Comprehensive Portfolio Statement',
  documentTitle = 'Portfolio Statement'
}) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <View style={headerStyles.header} fixed>
      {/* Logo and Company Info */}
      <View style={headerStyles.logoSection}>
        <View>
          <Text style={headerStyles.logoText}>SIP BREWERY</Text>
          <Text style={headerStyles.tagline}>Smart Investing Made Simple</Text>
        </View>
      </View>

      {/* Document Meta Information */}
      <View style={headerStyles.metaSection}>
        <Text style={headerStyles.documentTitle}>{documentTitle}</Text>
        <Text style={headerStyles.generatedDate}>
          Generated: {formatDate(generatedAt)}
        </Text>
        <Text style={headerStyles.statementType}>{statementType}</Text>
      </View>
    </View>
  );
};