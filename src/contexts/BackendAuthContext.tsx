import * as React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  riskProfile: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskProfile: string;
  investmentGoals: string[];
  timeHorizon: string;
  kycStatus: string;
  isActive: boolean;
  createdAt: string;
}

interface BackendAuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isKYCRequired: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (userData: any) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateKYCStatus: (status: 'PENDING' | 'APPROVED' | 'REJECTED') => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Create a default context value
const defaultContextValue: BackendAuthContextType = {
  user: null,
  profile: null,
  loading: false,
  isKYCRequired: false,
  isAuthenticated: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  updateKYCStatus: async () => {},
  refreshProfile: async () => {},
};

const BackendAuthContext = React.createContext<BackendAuthContextType>(defaultContextValue);

export const BackendAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // For now, just return the default context to get the app loading
  return (
    <BackendAuthContext.Provider value={defaultContextValue}>
      {children}
    </BackendAuthContext.Provider>
  );
};

export const useBackendAuth = () => {
  const context = React.useContext(BackendAuthContext);
  return context;
};