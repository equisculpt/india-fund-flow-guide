
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
  isWhiteLabel: boolean;
}

interface BrandingContextType {
  brandConfig: BrandConfig;
  setBrandConfig: (config: BrandConfig) => void;
  isWhiteLabel: boolean;
  agentId?: string;
}

const defaultBrandConfig: BrandConfig = {
  companyName: "SIP Brewery",
  logo: "/placeholder.svg",
  primaryColor: "#3B82F6",
  secondaryColor: "#F59E0B",
  domain: "sipbrewery.com",
  contactEmail: "support@sipbrewery.com",
  contactPhone: "+91-9876543210",
  address: "Mumbai, India",
  isWhiteLabel: false
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider = ({ children }: { children: React.ReactNode }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(defaultBrandConfig);
  const [isWhiteLabel, setIsWhiteLabel] = useState(false);
  const [agentId, setAgentId] = useState<string | undefined>();

  useEffect(() => {
    // Check URL parameters or subdomain for white-label configuration
    const urlParams = new URLSearchParams(window.location.search);
    const urlAgentId = urlParams.get('agent');
    const subdomain = window.location.hostname.split('.')[0];
    
    if (urlAgentId || (subdomain !== 'localhost' && subdomain !== 'sipbrewery')) {
      const detectedAgentId = urlAgentId || subdomain;
      setAgentId(detectedAgentId);
      loadAgentBranding(detectedAgentId);
      setIsWhiteLabel(true);
    }
  }, []);

  const loadAgentBranding = async (agentId: string) => {
    try {
      console.log('Loading white-label branding for agent:', agentId);
      
      // In production, this would fetch from Firebase/database
      // For demo, using mock data based on agent ID
      const mockAgentBranding: Record<string, Partial<BrandConfig>> = {
        'demo-agent': {
          companyName: "WealthMax Financial",
          logo: "/placeholder.svg",
          primaryColor: "#059669",
          secondaryColor: "#DC2626",
          contactEmail: "support@wealthmax.com",
          contactPhone: "+91-9876543211",
          address: "Delhi, India",
          isWhiteLabel: true,
          agentId: 'demo-agent'
        }
      };

      const agentBranding = mockAgentBranding[agentId];
      if (agentBranding) {
        setBrandConfig(prev => ({
          ...prev,
          ...agentBranding,
          isWhiteLabel: true,
          agentId
        }));
      }
    } catch (error) {
      console.error('Error loading agent branding:', error);
    }
  };

  return (
    <BrandingContext.Provider value={{ 
      brandConfig, 
      setBrandConfig, 
      isWhiteLabel, 
      agentId 
    }}>
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
