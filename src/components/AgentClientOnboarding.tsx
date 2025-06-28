
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DigioKYCVerification from './onboarding/DigioKYCVerification';

interface AgentClientOnboardingProps {
  agentId?: string;
  socialLoginUser?: any;
  referralCode?: string;
}

interface ClientData {
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;
  aadhaarNumber: string;
  nominee: string;
}

const AgentClientOnboarding = ({ agentId, socialLoginUser, referralCode }: AgentClientOnboardingProps) => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState<ClientData>({
    fullName: '',
    email: '',
    phone: '',
    panNumber: '',
    aadhaarNumber: '',
    nominee: ''
  });
  const [tncAccepted, setTncAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingSource, setOnboardingSource] = useState<'direct' | 'agent' | 'referral'>('direct');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (socialLoginUser) {
      setClientData({
        fullName: socialLoginUser.user_metadata?.full_name || socialLoginUser.user_metadata?.name || '',
        email: socialLoginUser.email || '',
        phone: socialLoginUser.user_metadata?.phone || '',
        panNumber: '',
        aadhaarNumber: '',
        nominee: ''
      });

      // Set onboarding source based on context
      if (agentId) {
        setOnboardingSource('agent');
      } else if (referralCode) {
        setOnboardingSource('referral');
      } else {
        setOnboardingSource('direct');
      }
    }
  }, [socialLoginUser, agentId, referralCode]);

  // Handle referral code processing
  useEffect(() => {
    const processReferralCode = async () => {
      if (referralCode && socialLoginUser) {
        try {
          // Find the referrer by referral code
          const { data: referrer, error } = await supabase
            .from('profiles')
            .select('id, full_name')
            .eq('referral_code', referralCode)
            .single();

          if (error) {
            console.error('Invalid referral code:', error);
            toast({
              title: "Invalid Referral Code",
              description: "The referral code you used is not valid.",
              variant: "destructive"
            });
            return;
          }

          if (referrer) {
            // Update user profile with referrer information
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                referred_by: referrer.id,
                onboarding_source: 'referral',
                is_direct_customer: true // Referral users are still direct customers
              })
              .eq('id', socialLoginUser.id);

            if (updateError) {
              console.error('Error updating referral info:', updateError);
            } else {
              toast({
                title: "Referral Applied!",
                description: `You've been successfully referred by ${referrer.full_name}`,
              });
            }
          }
        } catch (error) {
          console.error('Error processing referral:', error);
        }
      }
    };

    processReferralCode();
  }, [referralCode, socialLoginUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (step === 1 && (!clientData.fullName || !clientData.email || !clientData.phone)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && !tncAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (socialLoginUser) {
      setIsLoading(true);
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: clientData.fullName,
            phone: clientData.phone,
            onboarding_source: onboardingSource,
            is_direct_customer: onboardingSource === 'direct'
          })
          .eq('id', socialLoginUser.id);

        if (error) {
          console.error('Error updating profile:', error);
          toast({
            title: "Error",
            description: "Failed to update profile. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
        setStep(step + 1);
      } catch (error) {
        console.error('Update profile error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleKYCComplete = () => {
    toast({
      title: "KYC Completed",
      description: "Your KYC verification has been completed successfully!",
    });
    navigate('/dashboard');
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
        <p className="text-gray-600">
          {step === 1
            ? 'Tell us a bit about yourself to get started.'
            : step === 2
              ? 'Please review and accept our terms and conditions.'
              : 'Verify your identity to unlock all features.'}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-gray-500">
          <span className={`step ${step > 1 ? 'completed' : 'active'}`}>
            1. Personal Info
          </span>
          <span className={`step ${step > 2 ? 'completed' : step === 2 ? 'active' : ''}`}>
            2. Terms & Conditions
          </span>
          <span className={`step ${step > 3 ? 'completed' : step === 3 ? 'active' : ''}`}>
            3. KYC Verification
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(step - 1) * 50}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {step === 1 && (
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button onClick={() => navigate('/')} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
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
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 h-[300px] overflow-y-auto">
              {/* Replace with actual terms and conditions content */}
              <p className="text-gray-700 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, urna eu tincidunt consectetur, nisi nunc ultricies
                nisi, eu aliquam nunc nisl eu nunc. Sed euismod, urna eu
                tincidunt consectetur, nisi nunc ultricies nisi, eu aliquam
                nunc nisl eu nunc. Sed euismod, urna eu tincidunt consectetur.
                Sed euismod, urna eu tincidunt consectetur, nisi nunc ultricies
                nisi, eu aliquam nunc nisl eu nunc. Sed euismod, urna eu
                tincidunt consectetur, nisi nunc ultricies nisi, eu aliquam
                nunc nisl eu nunc. Sed euismod, urna eu tincidunt consectetur.
                nisi, eu aliquam nunc nisl eu nunc. Sed euismod, urna eu
                tincidunt consectetur, nisi nunc ultricies nisi, eu aliquam
                nunc nisl eu nunc. Sed euismod, urna eu tincidunt consectetur.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                onCheckedChange={(checked) => setTncAccepted(checked === true)} 
              />
              <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the terms and conditions
              </Label>
            </div>
            <div className="mt-6 flex justify-between">
              <Button onClick={handleBack} variant="outline">
                Back: Personal Info
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Next: KYC Verification'
                )}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <DigioKYCVerification clientData={clientData} onKYCComplete={handleKYCComplete} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default AgentClientOnboarding;
