
import { StyleSheet } from '@react-pdf/renderer';

export const avatarStyles = StyleSheet.create({
  // Avatar and Badge Styles - Premium Design
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2E7DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  verifiedBadge: {
    backgroundColor: '#00B47B',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginTop: 2,
  },
  verifiedBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
});
