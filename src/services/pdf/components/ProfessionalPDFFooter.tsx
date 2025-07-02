import React from 'react';
import { View, Text } from '@react-pdf/renderer';

const footerStyles = {
  footer: {
    position: 'absolute' as const,
    bottom: 20,
    left: 20,
    right: 20,
    paddingTop: 15,
    borderTop: '1px solid #E5E7EB',
  },
  
  footerContent: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  
  leftSection: {
    flex: 1,
  },
  
  centerSection: {
    flex: 2,
    alignItems: 'center' as const,
  },
  
  rightSection: {
    flex: 1,
    alignItems: 'flex-end' as const,
  },
  
  companyInfo: {
    fontSize: 9, // 9pt for footer info
    color: '#6B7280',
    lineHeight: 1.3,
  },
  
  regulatoryInfo: {
    fontSize: 8, // 8pt for regulatory info
    color: '#9CA3AF',
    textAlign: 'center' as const,
    lineHeight: 1.2,
  },
  
  pageInfo: {
    fontSize: 9,
    color: '#6B7280',
  },
  
  disclaimer: {
    marginTop: 8,
    fontSize: 7, // 7pt for disclaimers
    color: '#9CA3AF',
    textAlign: 'center' as const,
    lineHeight: 1.2,
  },
  
  warningText: {
    fontSize: 8,
    color: '#DC2626',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginTop: 5,
  },
};

interface ProfessionalPDFFooterProps {
  generatedAt: string;
  pageNumber?: number;
  totalPages?: number;
}

export const ProfessionalPDFFooter: React.FC<ProfessionalPDFFooterProps> = ({ 
  generatedAt, 
  pageNumber = 1, 
  totalPages = 1 
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={footerStyles.footer} fixed>
      {/* Main Footer Content */}
      <View style={footerStyles.footerContent}>
        {/* Left: Company Info */}
        <View style={footerStyles.leftSection}>
          <Text style={footerStyles.companyInfo}>
            SIP Brewery Pvt. Ltd.
          </Text>
          <Text style={footerStyles.companyInfo}>
            www.sipbrewery.com
          </Text>
        </View>

        {/* Center: Regulatory Info */}
        <View style={footerStyles.centerSection}>
          <Text style={footerStyles.regulatoryInfo}>
            AMFI Registered Mutual Fund Distributor | ARN-XXXXXX
          </Text>
          <Text style={footerStyles.regulatoryInfo}>
            Registered with BSE & NSE | SEBI Registered Investment Advisor
          </Text>
        </View>

        {/* Right: Page Info */}
        <View style={footerStyles.rightSection}>
          <Text style={footerStyles.pageInfo}>
            Page {pageNumber} of {totalPages}
          </Text>
          <Text style={footerStyles.pageInfo}>
            {new Date(generatedAt).toLocaleDateString('en-IN')}
          </Text>
        </View>
      </View>

      {/* Disclaimer Section */}
      <Text style={footerStyles.disclaimer}>
        This statement is computer generated and does not require signature. 
        Past performance is not indicative of future results. 
        Mutual fund investments are subject to market risks, read all scheme related documents carefully. 
        For any queries, please contact your relationship manager or visit our website.
      </Text>

      {/* Important Warning */}
      <Text style={footerStyles.warningText}>
        MUTUAL FUNDS INVESTMENTS ARE SUBJECT TO MARKET RISKS
      </Text>

      {/* Copyright */}
      <Text style={[footerStyles.disclaimer, { marginTop: 3 }]}>
        Copyright {currentYear} SIP Brewery Pvt. Ltd. All rights reserved. 
        This document is confidential and intended solely for the addressee.
      </Text>
    </View>
  );
};