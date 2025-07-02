import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { modernStyles } from '../../styles/modernPDFStyles';
import { StatementData } from '../../../statement/types';

interface ModernUserProfileProps {
  userInfo: StatementData['userInfo'];
}

export const ModernUserProfile: React.FC<ModernUserProfileProps> = ({ userInfo }) => (
  <View style={modernStyles.userProfile} wrap={false}>
    <Text style={modernStyles.userProfileTitle}>Investor Information</Text>
    
    <View style={modernStyles.userDetailsGrid}>
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Full Name</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.name || 'N/A'}</Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Client Code</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.clientCode || 'N/A'}</Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Email Address</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.email || 'N/A'}</Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Mobile Number</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.mobile || 'N/A'}</Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>PAN Number</Text>
        <Text style={modernStyles.userDetailValue}>{userInfo.panMasked || 'N/A'}</Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>KYC Status</Text>
        <Text style={[
          modernStyles.userDetailValue, 
          { color: userInfo.isVerified ? '#00B47B' : '#FFB800' }
        ]}>
          {userInfo.isVerified ? 'VERIFIED ✓' : 'PENDING'}
        </Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Plan Type</Text>
        <Text style={modernStyles.userDetailValue}>
          {userInfo.segment === 'DIRECT' ? 'Direct Plan' : 'Regular Plan'}
        </Text>
      </View>
      
      <View style={modernStyles.userDetailItem}>
        <Text style={modernStyles.userDetailLabel}>Statement Period</Text>
        <Text style={modernStyles.userDetailValue}>01 Jan 2024 - Current</Text>
      </View>
      
      {userInfo.address && (
        <View style={[modernStyles.userDetailItem, modernStyles.w100, { marginTop: 10 }]}>
          <Text style={modernStyles.userDetailLabel}>Registered Address</Text>
          <Text style={modernStyles.userDetailValue}>{userInfo.address}</Text>
        </View>
      )}
    </View>
  </View>
);