
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";
import BreweryLogo from "./BreweryLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [loginType, setLoginType] = useState<"customer" | "agent">("customer");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
        // Login logic
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
        // Signup logic
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
        
        // Auto-login after successful signup
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

export default LoginModal;
