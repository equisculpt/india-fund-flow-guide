
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock } from 'lucide-react';

const FinancialDataProtection = ({ children }: { children: React.ReactNode }) => {
  const [isSecure, setIsSecure] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if connection is secure
    const checkSecurity = () => {
      const isHTTPS = window.location.protocol === 'https:';
      const isLocalhost = window.location.hostname === 'localhost';
      
      if (!isHTTPS && !isLocalhost) {
        setIsSecure(false);
        setShowWarning(true);
      }
    };

    checkSecurity();

    // Monitor for potential security issues
    const detectDevTools = () => {
      let devtools = {
        open: false,
        orientation: null as string | null
      };

      const threshold = 160;

      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devtools.open) {
            devtools.open = true;
            if (process.env.NODE_ENV === 'production') {
              console.clear();
              console.warn('Developer tools detected. Financial data access is monitored.');
            }
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    };

    if (process.env.NODE_ENV === 'production') {
      detectDevTools();
    }

    // Clear console periodically in production
    if (process.env.NODE_ENV === 'production') {
      const clearConsole = setInterval(() => {
        console.clear();
      }, 30000); // Clear every 30 seconds

      return () => clearInterval(clearConsole);
    }
  }, []);

  if (!isSecure && showWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <Alert className="max-w-md border-red-200 bg-red-50">
          <Shield className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <div className="space-y-2">
              <p className="font-semibold">Unsecure Connection Detected</p>
              <p className="text-sm">
                This financial platform requires a secure HTTPS connection to protect your sensitive data. 
                Please access the site via HTTPS or contact support.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Security indicator for financial data */}
      {process.env.NODE_ENV === 'production' && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-100 border border-green-300 rounded-lg p-2 shadow-sm">
            <div className="flex items-center gap-2 text-green-700 text-xs">
              <Lock className="w-3 h-3" />
              <span>Secure Financial Platform</span>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default FinancialDataProtection;
