
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupabaseAuthContext } from "@/contexts/SupabaseAuthContext";
import { useToast } from "@/hooks/use-toast";
import { signInWithGoogle, auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginTab from "./auth/LoginTab";
import SignupTab from "./auth/SignupTab";

interface EnhancedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedLoginModal = ({ isOpen, onClose }: EnhancedLoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { signIn, signUp } = useSupabaseAuthContext();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      if (user) {
        // Get the Firebase ID token and use it to sign in to Supabase
        const idToken = await user.getIdToken();
        
        // Create or update user profile in Supabase
        await signUp(user.email!, '', {
          full_name: user.displayName || '',
          phone: user.phoneNumber || '',
          user_type: 'customer'
        });

        toast({
          title: "Success",
          description: "Logged in with Google successfully!",
        });
        onClose();
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to login with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (formData: any) => {
    const { email, password } = formData;
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (formData: any) => {
    const { email, password, name, phone, userType } = formData;
    
    if (!email || !password || !name || !phone) {
      toast({
        title: "Error", 
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, {
        full_name: name,
        phone: phone,
        user_type: userType
      });
      
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to SIP Brewery</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginTab 
              onGoogleLogin={handleGoogleLogin}
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupTab 
              onGoogleLogin={handleGoogleLogin}
              onSignup={handleSignup}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedLoginModal;
