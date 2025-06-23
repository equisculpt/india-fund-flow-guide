
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FATCADeclarationProps {
  clientData: any;
  onFATCAComplete: (fatcaData: any) => void;
  onBack: () => void;
}

const FATCADeclaration = ({ clientData, onFATCAComplete, onBack }: FATCADeclarationProps) => {
  const [formData, setFormData] = useState({
    taxResidency: '',
    countryOfTaxResidency: '',
    taxIdentificationNumber: '',
    isUSPerson: false,
    birthPlace: '',
    confirmDeclaration: false,
    reasonForNoTIN: ''
  });
  const { toast } = useToast();

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Singapore', 'UAE', 'Germany', 'France', 'Netherlands', 'Other'
  ];

  const handleSubmit = () => {
    if (!formData.taxResidency || !formData.countryOfTaxResidency || !formData.confirmDeclaration) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields and confirm the declaration.",
        variant: "destructive",
      });
      return;
    }

    if (formData.taxResidency === 'foreign' && !formData.taxIdentificationNumber && !formData.reasonForNoTIN) {
      toast({
        title: "Missing TIN Information",
        description: "Please provide either Tax Identification Number or reason for not having one.",
        variant: "destructive",
      });
      return;
    }

    onFATCAComplete(formData);
    toast({
      title: "FATCA Declaration Completed",
      description: "Your tax residency information has been recorded successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          FATCA Declaration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>FATCA Compliance:</strong> As per regulatory requirements, we need to collect information about your tax residency status. This information is mandatory for account opening.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Are you a tax resident of India?</Label>
            <Select value={formData.taxResidency} onValueChange={(value) => setFormData({...formData, taxResidency: value})}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select tax residency status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indian">Yes, I am a tax resident of India only</SelectItem>
                <SelectItem value="foreign">No, I am a tax resident of another country</SelectItem>
                <SelectItem value="dual">I have dual tax residency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.taxResidency === 'foreign' || formData.taxResidency === 'dual') && (
            <>
              <div>
                <Label htmlFor="countryOf TaxResidency">Country/Jurisdiction of Tax Residency</Label>
                <Select value={formData.countryOfTaxResidency} onValueChange={(value) => setFormData({...formData, countryOfTaxResidency: value})}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                <Input
                  id="tin"
                  value={formData.taxIdentificationNumber}
                  onChange={(e) => setFormData({...formData, taxIdentificationNumber: e.target.value})}
                  placeholder="Enter your TIN"
                  className="mt-2"
                />
              </div>

              {!formData.taxIdentificationNumber && (
                <div>
                  <Label htmlFor="reasonForNoTIN">Reason for not providing TIN</Label>
                  <Select value={formData.reasonForNoTIN} onValueChange={(value) => setFormData({...formData, reasonForNoTIN: value})}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_required">Country does not issue TIN</SelectItem>
                      <SelectItem value="no_tin_required">No TIN required (domestic payee)</SelectItem>
                      <SelectItem value="applied">Applied for TIN but not yet received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="birthPlace">Place of Birth</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                  placeholder="Enter place of birth"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usPersonCheck"
                  checked={formData.isUSPerson}
                  onCheckedChange={(checked) => setFormData({...formData, isUSPerson: checked as boolean})}
                />
                <Label htmlFor="usPersonCheck" className="text-sm">
                  I am a US Person for tax purposes
                </Label>
              </div>
            </>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Declaration</h4>
          <p className="text-sm text-gray-700 mb-3">
            I declare that the information provided above is true, complete and accurate to the best of my knowledge and belief. 
            I undertake to inform you of any change in circumstances that affects the tax residency status of the account holders 
            identified in this form and to provide you with a suitably updated self-certification and documentation within 30 days 
            of such change in circumstances.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmDeclaration"
              checked={formData.confirmDeclaration}
              onCheckedChange={(checked) => setFormData({...formData, confirmDeclaration: checked as boolean})}
            />
            <Label htmlFor="confirmDeclaration" className="text-sm font-medium">
              I confirm and agree to the above declaration
            </Label>
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.confirmDeclaration}>
            Complete FATCA Declaration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FATCADeclaration;
