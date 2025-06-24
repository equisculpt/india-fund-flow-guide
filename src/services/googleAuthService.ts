
import { signInWithGoogle } from './firebase';
import { supabase } from '@/integrations/supabase/client';

export const handleGoogleSignup = async () => {
  try {
    // Sign in with Google using Firebase
    const result = await signInWithGoogle();
    const user = result.user;
    
    if (!user) {
      throw new Error('No user returned from Google auth');
    }

    // Get the Firebase ID token
    const idToken = await user.getIdToken();
    
    // Check if user already exists in Supabase
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.uid)
      .single();

    if (!existingUser) {
      // Create new user profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.uid,
          full_name: user.displayName || '',
          phone: user.phoneNumber || '',
          user_type: 'customer',
          kyc_status: 'pending'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }
    }

    // Set the session in Supabase using the Firebase token
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: idToken,
      refresh_token: idToken, // For simplicity, using the same token
    });

    if (sessionError) {
      console.error('Error setting session:', sessionError);
      // Don't throw here as the user is still authenticated via Firebase
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
