
import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandConfig {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  agentId?: string;
}

interface BrandingContextType {
  brandConfig: BrandConfig;
  setBrandConfig: (config: BrandConfig) => void;
  isWhiteLabel: boolean;
}

const defaultBrandConfig: BrandConfig = {
  companyName: "SIP Brewery",
  logo: "/placeholder.svg",
  primaryColor: "#3B82F6",
  secondaryColor: "#F59E0B",
  domain: "sipbrewery.com",
  contactEmail: "support@sipbrewery.com",
  contactPhone: "+91-9876543210",
  address: "Mumbai, India"
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrandConfig);
  const [isWhiteLabel, setIsWhiteLabel] = useState(false);

  useEffect(() => {
    // Check URL parameters or subdomain for white-label configuration
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('agent');
    const subdomain = window.location.hostname.split('.')[0];
    
    if (agentId || subdomain !== 'localhost') {
      // Load agent's branding configuration
      loadAgentBranding(agentId || subdomain);
      setIsWhiteLabel(true);
    }
  }, []);

  const loadAgentBranding = async (agentId: string) => {
    try {
      // In a real implementation, this would fetch from Firebase/Supabase
      console.log('Loading branding for agent:', agentId);
      // For now, we'll use a demo configuration
    } catch (error) {
      console.error('Error loading agent branding:', error);
    }
  };

  return (
    <BrandingContext.Provider value={{ brandConfig, setBrandConfig, isWhiteLabel }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
