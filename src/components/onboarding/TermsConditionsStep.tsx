
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface TermsConditionsStepProps {
  tncAccepted: boolean;
  onTncChange: (checked: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const TermsConditionsStep = ({ 
  tncAccepted, 
  onTncChange, 
  onSubmit, 
  onBack, 
  isLoading 
}: TermsConditionsStepProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 h-[300px] overflow-y-auto">
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
          checked={tncAccepted}
          onCheckedChange={(checked) => onTncChange(checked === true)} 
        />
        <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I agree to the terms and conditions
        </Label>
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back: Personal Info
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
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
  );
};

export default TermsConditionsStep;
