
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, loginType);
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome back! You're logged in as ${loginType}.`,
        });
        onClose();
        setEmail("");
        setPassword("");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
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
            Welcome to SIP Brewery
          </DialogTitle>
          <p className="text-gray-600">Choose your login type to continue</p>
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

          <form onSubmit={handleLogin} className="space-y-4">
            <TabsContent value="customer" className="space-y-4 mt-0">
              <div className="space-y-4">
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
              </div>
            </TabsContent>

            <TabsContent value="agent" className="space-y-4 mt-0">
              <div className="space-y-4">
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
              </div>
            </TabsContent>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : `Login as ${loginType === "customer" ? "Customer" : "Agent"}`}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="text-amber-600 hover:text-amber-700 font-medium">
                Sign up here
              </button>
            </p>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
