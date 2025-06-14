import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Mail } from "lucide-react";
import BreweryLogo from "./BreweryLogo";
import { useEnhancedAuth } from "@/contexts/EnhancedAuthContext";
import { useToast } from "@/hooks/use-toast";

interface EnhancedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedLoginModal = ({ isOpen, onClose }: EnhancedLoginModalProps) => {
  const [loginType, setLoginType] = useState<"customer" | "agent">("customer");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, loginWithFacebook } = useEnhancedAuth();
  const { toast } = useToast();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLoginMode) {
        const success = await login(email, password, loginType);
        if (success) {
          toast({
            title: "Login Successful",
            description: `Welcome back! You're logged in as ${loginType}.`,
          });
          onClose();
          resetForm();
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid credentials. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        // Signup validation
        if (password !== confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (password.length < 6) {
          toast({
            title: "Password Too Short",
            description: "Password must be at least 6 characters long.",
            variant: "destructive",
          });
          return;
        }

        // Simulate signup success
        toast({
          title: "Account Created Successfully",
          description: `Welcome to SIP Brewery! Your ${loginType} account has been created.`,
        });
        
        const success = await login(email, password, loginType);
        if (success) {
          onClose();
          resetForm();
        }
      }
    } catch (error) {
      toast({
        title: isLoginMode ? "Login Error" : "Signup Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        onClose();
        resetForm();
      }
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithFacebook();
      if (success) {
        onClose();
        resetForm();
      }
    } catch (error) {
      // Error handling is done in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BreweryLogo size="lg" showText={false} />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {isLoginMode ? "Welcome Back" : "Join SIP Brewery"}
          </DialogTitle>
          <p className="text-gray-600">
            {isLoginMode ? "Choose your login type to continue" : "Create your account to get started"}
          </p>
        </DialogHeader>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleFacebookLogin}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
          </div>
        </div>

        <Tabs value={loginType} onValueChange={(value) => setLoginType(value as "customer" | "agent")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer
            </TabsTrigger>
            <TabsTrigger value="agent" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agent
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <TabsContent value="customer" className="space-y-4 mt-0">
              <div className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="customer-name">Full Name</Label>
                    <Input
                      id="customer-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLoginMode}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="customer-email">Email Address</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customer-password">Password</Label>
                  <Input
                    id="customer-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="customer-confirm-password">Confirm Password</Label>
                    <Input
                      id="customer-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="agent" className="space-y-4 mt-0">
              <div className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="agent-name">Full Name</Label>
                    <Input
                      id="agent-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLoginMode}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="agent-email">Agent Email</Label>
                  <Input
                    id="agent-email"
                    type="email"
                    placeholder="Enter your agent email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="agent-password">Agent Password</Label>
                  <Input
                    id="agent-password"
                    type="password"
                    placeholder="Enter your agent password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {!isLoginMode && (
                  <div>
                    <Label htmlFor="agent-confirm-password">Confirm Password</Label>
                    <Input
                      id="agent-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              disabled={isLoading}
            >
              {isLoading 
                ? (isLoginMode ? "Logging in..." : "Creating Account...")
                : (isLoginMode 
                    ? `Login as ${loginType === "customer" ? "Customer" : "Agent"}`
                    : `Create ${loginType === "customer" ? "Customer" : "Agent"} Account`
                  )
              }
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  resetForm();
                }}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                {isLoginMode ? "Sign up here" : "Login here"}
              </button>
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedLoginModal;
