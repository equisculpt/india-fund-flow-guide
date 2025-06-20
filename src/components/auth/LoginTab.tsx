
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SocialAuthButtons from './SocialAuthButtons';
import AuthForm from './AuthForm';

interface LoginTabProps {
  onGoogleLogin: () => void;
  onLogin: (formData: any) => void;
  isLoading: boolean;
}

const LoginTab = ({ onGoogleLogin, onLogin, isLoading }: LoginTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialAuthButtons onGoogleLogin={onGoogleLogin} isLoading={isLoading} />
        <AuthForm type="login" onSubmit={onLogin} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default LoginTab;
