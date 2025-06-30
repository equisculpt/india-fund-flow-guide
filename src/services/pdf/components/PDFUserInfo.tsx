
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';
import { StatementData } from '../../statement/types';

interface PDFUserInfoProps {
  userInfo: StatementData['userInfo'];
}

export const PDFUserInfo: React.FC<PDFUserInfoProps> = ({ userInfo }) => (
  <View style={styles.userInfo}>
    <Text style={styles.userInfoTitle}>CLIENT INFORMATION</Text>
    <View style={styles.userInfoRow}>
      <Text style={styles.userInfoLabel}>Name:</Text>
      <Text style={styles.userInfoValue}>{userInfo.name}</Text>
    </View>
    <View style={styles.userInfoRow}>
      <Text style={styles.userInfoLabel}>Client Code:</Text>
      <Text style={styles.userInfoValue}>{userInfo.clientCode}</Text>
    </View>
    <View style={styles.userInfoRow}>
      <Text style={styles.userInfoLabel}>PAN:</Text>
      <Text style={styles.userInfoValue}>{userInfo.panMasked}</Text>
    </View>
    <View style={styles.userInfoRow}>
      <Text style={styles.userInfoLabel}>Email:</Text>
      <Text style={styles.userInfoValue}>{userInfo.email}</Text>
    </View>
    <View style={styles.userInfoRow}>
      <Text style={styles.userInfoLabel}>SIP Brewery ID:</Text>
      <Text style={styles.userInfoValue}>{userInfo.sipBreweryId}</Text>
    </View>
  </View>
);
