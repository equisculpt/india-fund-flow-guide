
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Copy, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AgentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  clientData: any;
  setClientData: (data: any) => void;
  onboardingLink: string;
  setOnboardingLink: (link: string) => void;
  agentId?: string;
}

const AgentTabs = ({ 
  activeTab, 
  setActiveTab, 
  clientData, 
  setClientData, 
  onboardingLink, 
  setOnboardingLink, 
  agentId 
}: AgentTabsProps) => {
  const { toast } = useToast();

  const generateOnboardingLink = () => {
    const link = `https://sipbrewery.com/onboard?agent=${agentId}&ref=${Math.random().toString(36).substr(2, 9)}`;
    setOnboardingLink(link);
    toast({
      title: "Link Generated",
      description: "Onboarding link has been generated successfully",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(onboardingLink);
    toast({
      title: "Copied",
      description: "Onboarding link copied to clipboard",
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="self-onboard">Client Self-Onboarding</TabsTrigger>
        <TabsTrigger value="agent-assist">Agent Assisted</TabsTrigger>
      </TabsList>

      <TabsContent value="self-onboard">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <Send className="h-5 w-5" />
              Send Onboarding Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name" className="text-center block">Client Name</Label>
                <Input
                  id="client-name"
                  placeholder="Enter client name"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({...clientData, fullName: e.target.value})}
                  className="text-center"
                />
              </div>
              <div>
                <Label htmlFor="client-phone" className="text-center block">Client Phone</Label>
                <Input
                  id="client-phone"
                  placeholder="Enter client phone"
                  value={clientData.phone}
                  onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                  className="text-center"
                />
              </div>
            </div>
            
            <Button onClick={generateOnboardingLink} className="w-full">
              Generate Onboarding Link
            </Button>

            {onboardingLink && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-center block">Onboarding Link</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input value={onboardingLink} readOnly className="text-center" />
                  <Button onClick={copyLink} size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="agent-assist">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
              <UserPlus className="h-5 w-5" />
              Agent Assisted Onboarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600">Agent assisted onboarding form will be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AgentTabs;
