
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Building, Globe, Palette, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentOnboardingProps {
  onComplete: (data: any) => void;
}

const AgentOnboarding = ({ onComplete }: AgentOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    
    // Company Info
    companyName: "",
    companyType: "",
    address: "",
    gstNumber: "",
    
    // Branding
    logo: null as File | null,
    primaryColor: "#3B82F6",
    secondaryColor: "#F59E0B",
    customDomain: "",
    
    // Subscription
    plan: "basic",
    domainPreference: "subdomain"
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Onboarding Complete!",
      description: "Your agent account has been set up successfully.",
    });
    onComplete(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Agent Onboarding - Step {currentStep} of 4
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={`step${currentStep}`} className="w-full">
            {/* Step 1: Personal Information */}
            <TabsContent value="step1" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number *</Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    placeholder="AMFI Registration Number"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Years in financial advisory"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Step 2: Company Information */}
            <TabsContent value="step2" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="companyType">Company Type</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={formData.companyType}
                    onChange={(e) => handleInputChange("companyType", e.target.value)}
                  >
                    <option value="">Select company type</option>
                    <option value="sole-proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="private-limited">Private Limited</option>
                    <option value="llp">LLP</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Complete business address"
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                    placeholder="GST registration number"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Branding & Domain */}
            <TabsContent value="step3" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Company Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Upload your company logo (PNG, JPG, SVG)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange("logo", e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Domain Preference</Label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="subdomain"
                        checked={formData.domainPreference === "subdomain"}
                        onChange={(e) => handleInputChange("domainPreference", e.target.value)}
                      />
                      <span>Use subdomain (yourcompany.sipbrewery.com) - Free</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="custom"
                        checked={formData.domainPreference === "custom"}
                        onChange={(e) => handleInputChange("domainPreference", e.target.value)}
                      />
                      <span>Custom domain (yourcompany.com) - ₹2,000/year</span>
                    </label>
                  </div>
                  
                  {formData.domainPreference === "custom" && (
                    <Input
                      className="mt-2"
                      placeholder="Enter your desired domain"
                      value={formData.customDomain}
                      onChange={(e) => handleInputChange("customDomain", e.target.value)}
                    />
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Step 4: Subscription Plan */}
            <TabsContent value="step4" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`cursor-pointer ${formData.plan === "basic" ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => handleInputChange("plan", "basic")}>
                  <CardHeader>
                    <CardTitle>Basic Plan</CardTitle>
                    <div className="text-2xl font-bold">₹999/month</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Up to 100 clients</li>
                      <li>• Basic branding</li>
                      <li>• Email support</li>
                      <li>• Standard features</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer ${formData.plan === "professional" ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => handleInputChange("plan", "professional")}>
                  <CardHeader>
                    <CardTitle>Professional</CardTitle>
                    <div className="text-2xl font-bold">₹1,999/month</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Up to 500 clients</li>
                      <li>• Full branding</li>
                      <li>• Priority support</li>
                      <li>• Advanced analytics</li>
                      <li>• WhatsApp integration</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer ${formData.plan === "enterprise" ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => handleInputChange("plan", "enterprise")}>
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <div className="text-2xl font-bold">₹4,999/month</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Unlimited clients</li>
                      <li>• Custom development</li>
                      <li>• Dedicated support</li>
                      <li>• API access</li>
                      <li>• Custom integrations</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === 4 ? "Complete Onboarding" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentOnboarding;
