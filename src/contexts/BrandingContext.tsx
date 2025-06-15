
import React, { createContext, useContext, useState } from 'react';

interface BrandConfig {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

interface BrandingContextType {
  brandConfig: BrandConfig;
  setBrandConfig: (config: BrandConfig) => void;
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

  return (
    <BrandingContext.Provider value={{ 
      brandConfig, 
      setBrandConfig
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
