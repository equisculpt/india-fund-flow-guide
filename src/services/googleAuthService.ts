
import { signInWithGoogle } from './firebase';

// Mock profiles storage for prototype
const mockProfiles: Record<string, any> = {};

export const handleGoogleSignup = async () => {
  try {
    // Sign in with Google using Firebase
    const result = await signInWithGoogle();
    const user = result.user;
    
    if (!user) {
      throw new Error('No user returned from Google auth');
    }

    // Store mock profile
    if (!mockProfiles[user.uid]) {
      mockProfiles[user.uid] = {
        id: user.uid,
        full_name: user.displayName || '',
        phone: user.phoneNumber || '',
        user_type: 'customer',
        kyc_status: 'pending'
      };
    }

    return { user, success: true };
  } catch (error) {
    console.error('Google signup error:', error);
    throw error;
  }
};

export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithGoogle();
    const user = result.user;
    
    if (!user) {
      throw new Error('No user returned from Google auth');
    }

    return { user, success: true };
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};
