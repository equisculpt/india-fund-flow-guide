
import { StyleSheet } from '@react-pdf/renderer';

export const userInfoStyles = StyleSheet.create({
  // Enhanced User Information Section - Premium Design
  userInfo: {
    backgroundColor: '#F8FAFF',
    padding: 30,
    borderRadius: 18,
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#2E7DFF',
  },
  userInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1F36',
    marginBottom: 25,
    textAlign: 'center',
  },
  userInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  userInfoItem: {
    flex: 1,
    minWidth: '30%',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  userInfoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  userInfoValue: {
    fontSize: 15,
    color: '#1A1F36',
    fontWeight: 'bold',
  },
});
