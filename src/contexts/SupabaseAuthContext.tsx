
import React, { createContext, useContext } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const SupabaseAuthContext = createContext<ReturnType<typeof useSupabaseAuth> | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useSupabaseAuth();
  
  return (
    <SupabaseAuthContext.Provider value={auth}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export const useSupabaseAuthContext = () => {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error('useSupabaseAuthContext must be used within a SupabaseAuthProvider');
  }
  return context;
};
