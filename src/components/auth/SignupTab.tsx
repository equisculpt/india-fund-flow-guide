
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SocialAuthButtons from './SocialAuthButtons';
import UserTypeSelector from './UserTypeSelector';
import AuthForm from './AuthForm';

interface SignupTabProps {
  onGoogleLogin: () => void;
  onSignup: (formData: any) => void;
  isLoading: boolean;
}

const SignupTab = ({ onGoogleLogin, onSignup, isLoading }: SignupTabProps) => {
  const [userType, setUserType] = useState<"client" | "agent">("client");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join SIP Brewery and start your investment journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialAuthButtons onGoogleLogin={onGoogleLogin} isLoading={isLoading} />
        <UserTypeSelector userType={userType} onUserTypeChange={setUserType} />
        <AuthForm type="signup" onSubmit={onSignup} isLoading={isLoading} userType={userType} />
      </CardContent>
    </Card>
  );
};

export default SignupTab;
