
import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles/pdfStyles';

interface UserAvatarProps {
  name: string;
  isVerified?: boolean;
}

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, isVerified }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
    </View>
    <Text style={[styles.userInfoValue, { fontSize: 16 }]}>{name}</Text>
    {isVerified && (
      <View style={styles.verifiedBadge}>
        <Text style={styles.verifiedBadgeText}>VERIFIED</Text>
      </View>
    )}
  </View>
);
