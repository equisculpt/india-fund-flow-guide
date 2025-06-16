
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'customer' | 'agent';
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useEnhancedAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (requiredUserType && user?.type !== requiredUserType) {
      toast({
        title: "Access Denied",
        description: `${requiredUserType} access required for this page`,
        variant: "destructive",
      });
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate, toast, requiredUserType]);

  if (!isAuthenticated) {
    return null;
  }

  if (requiredUserType && user?.type !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
