
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
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#2E7DFF',
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  verifiedBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
});
