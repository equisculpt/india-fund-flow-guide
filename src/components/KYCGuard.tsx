
import { useEffect } from 'react';
import { useBackendAuth } from '@/contexts/BackendAuthContext';
import { useNavigate } from 'react-router-dom';

interface KYCGuardProps {
  children: React.ReactNode;
  requireKYC?: boolean;
}

const KYCGuard = ({ children, requireKYC = true }: KYCGuardProps) => {
  const { user, profile, loading, isKYCRequired } = useBackendAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If no user, redirect to home
      if (!user) {
        navigate('/', { replace: true });
        return;
      }
      
      // If KYC is required and this component requires KYC, redirect to onboarding
      if (requireKYC && isKYCRequired) {
        navigate('/onboarding', { replace: true });
        return;
      }
    }
  }, [user, profile, loading, isKYCRequired, navigate, requireKYC]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  // If KYC is required and this component requires KYC, don't render anything (redirect will happen)
  if (requireKYC && isKYCRequired) {
    return null;
  }

  return <>{children}</>;
};

export default KYCGuard;
