
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuthContext } from '@/contexts/SupabaseAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading } = useSupabaseAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/', { replace: true });
        return;
      }
      
      if (requireAdmin && user.email !== 'admin@sipbrewery.com') {
        navigate('/', { replace: true });
        return;
      }
    }
  }, [user, loading, navigate, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || (requireAdmin && user.email !== 'admin@sipbrewery.com')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
