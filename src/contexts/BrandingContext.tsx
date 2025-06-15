
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
    // Check URL parameters for white-label configuration
    const urlParams = new URLSearchParams(window.location.search);
    const urlAgentId = urlParams.get('agent');
    const hostname = window.location.hostname;
    
    console.log('Checking white-label detection:', { urlAgentId, hostname });
    
    // Only trigger white-label mode if there's an explicit agent parameter
    // or if it's a genuine agent subdomain (not Lovable preview domains)
    if (urlAgentId) {
      console.log('White-label mode activated via URL parameter:', urlAgentId);
      setAgentId(urlAgentId);
      loadAgentBranding(urlAgentId);
      setIsWhiteLabel(true);
    } else {
      // Check for genuine agent subdomains (excluding Lovable preview domains)
      const subdomain = hostname.split('.')[0];
      const isLovablePreview = hostname.includes('lovable.app') || hostname.includes('preview');
      const isLocalhost = hostname === 'localhost' || hostname.startsWith('127.0.0.1');
      const isDirectDomain = subdomain === 'sipbrewery' || subdomain === 'www';
      
      if (!isLovablePreview && !isLocalhost && !isDirectDomain && subdomain && subdomain !== hostname) {
        console.log('White-label mode activated via subdomain:', subdomain);
        setAgentId(subdomain);
        loadAgentBranding(subdomain);
        setIsWhiteLabel(true);
      } else {
        console.log('Direct client mode - showing SIP Brewery branding');
        setIsWhiteLabel(false);
        setAgentId(undefined);
        setBrandConfig(defaultBrandConfig);
      }
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
