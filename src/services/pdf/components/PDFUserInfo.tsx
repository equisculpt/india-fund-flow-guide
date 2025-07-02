
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { UserAvatar } from './UserAvatar';
import { StatementData } from '../../statement/types';

interface PDFUserInfoProps {
  userInfo: StatementData['userInfo'];
}

export const PDFUserInfo: React.FC<PDFUserInfoProps> = ({ userInfo }) => (
  <View style={styles.userInfo} wrap={false}>
    <Text style={styles.userInfoTitle}>Investor Information</Text>
    
    <View style={styles.userInfoGrid}>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Full Name</Text>
        <Text style={styles.userInfoValue}>{userInfo.name || 'N/A'}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Client Code</Text>
        <Text style={styles.userInfoValue}>{userInfo.clientCode || 'N/A'}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Email Address</Text>
        <Text style={styles.userInfoValue}>{userInfo.email || 'N/A'}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Mobile Number</Text>
        <Text style={styles.userInfoValue}>{userInfo.mobile || 'N/A'}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>PAN Number</Text>
        <Text style={styles.userInfoValue}>{userInfo.panMasked || 'N/A'}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>KYC Status</Text>
        <Text style={[styles.userInfoValue, { 
          color: (userInfo.kycStatus === 'VERIFIED' || userInfo.isVerified) ? '#00B47B' : 
                userInfo.kycStatus === 'PENDING' ? '#FFB800' : '#EF4444' 
        }]}>
          {userInfo.kycStatus || (userInfo.isVerified ? 'VERIFIED' : 'PENDING')}
        </Text>
      </View>

      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Investment Plan</Text>
        <Text style={styles.userInfoValue}>
          {userInfo.segment === 'DIRECT' ? 'Direct Plan' : 'Regular Plan'}
        </Text>
      </View>

      {userInfo.address && (
        <View style={[styles.userInfoItem, { flex: 2 }]}>
          <Text style={styles.userInfoLabel}>Registered Address</Text>
          <Text style={styles.userInfoValue}>{userInfo.address}</Text>
        </View>
      )}
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Statement Period</Text>
        <Text style={styles.userInfoValue}>01 Jan 2024 - Current</Text>
      </View>
    </View>
  </View>
);
