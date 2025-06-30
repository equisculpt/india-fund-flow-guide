
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFUserInfoProps {
  userInfo: StatementData['userInfo'];
}

export const PDFUserInfo: React.FC<PDFUserInfoProps> = ({ userInfo }) => (
  <View style={styles.userInfo}>
    <Text style={styles.userInfoTitle}>👤 Investor Information</Text>
    
    <View style={styles.userInfoGrid}>
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Full Name</Text>
        <Text style={styles.userInfoValue}>{userInfo.name}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Client Code</Text>
        <Text style={styles.userInfoValue}>{userInfo.clientCode}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Email Address</Text>
        <Text style={styles.userInfoValue}>{userInfo.email}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Mobile Number</Text>
        <Text style={styles.userInfoValue}>{userInfo.mobile}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>PAN Number</Text>
        <Text style={styles.userInfoValue}>{userInfo.panMasked}</Text>
      </View>
      
      <View style={styles.userInfoItem}>
        <Text style={styles.userInfoLabel}>Statement Period</Text>
        <Text style={styles.userInfoValue}>01 Jan 2024 - Current</Text>
      </View>
    </View>
  </View>
);
