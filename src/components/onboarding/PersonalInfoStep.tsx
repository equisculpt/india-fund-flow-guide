
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface PersonalInfoStepProps {
  clientData: {
    fullName: string;
    email: string;
    phone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  referralCode?: string;
  socialLoginUser?: any;
}

const PersonalInfoStep = ({ 
  clientData, 
  onInputChange, 
  onSubmit, 
  isLoading, 
  referralCode,
  socialLoginUser 
}: PersonalInfoStepProps) => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      {referralCode && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            ✅ Referral code applied successfully! Complete your onboarding to help your friend earn rewards.
          </p>
        </div>
      )}
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={clientData.fullName}
            onChange={onInputChange}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={clientData.email}
            onChange={onInputChange}
            placeholder="Enter your email address"
            readOnly={!!socialLoginUser?.email}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={clientData.phone}
            onChange={onInputChange}
            placeholder="Enter your phone number"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={() => navigate('/')} variant="outline">
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Next: Terms & Conditions'
          )}
        </Button>
      </div>
    </>
  );
};

export default PersonalInfoStep;
