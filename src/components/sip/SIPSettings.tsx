import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SIPSettingsProps {
  onDownload: (type: string) => void;
}

const SIPSettings: React.FC<SIPSettingsProps> = ({ onDownload }) => {
  const [defaultAmount, setDefaultAmount] = useState('5000');
  const [preferredDate, setPreferredDate] = useState('1');
  const [autoIncrease, setAutoIncrease] = useState('disabled');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings Saved Successfully! ✅",
        description: "Your SIP preferences have been updated and will apply to future SIPs.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickDownload = async (type: string) => {
    try {
      await onDownload(type);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            Default SIP Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="default-amount">Default SIP Amount (₹)</Label>
              <Input 
                id="default-amount"
                type="number" 
                value={defaultAmount}
                onChange={(e) => setDefaultAmount(e.target.value)}
                min="500"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: ₹500</p>
            </div>
            
            <div>
              <Label>Preferred SIP Date</Label>
              <Select value={preferredDate} onValueChange={setPreferredDate}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st of every month</SelectItem>
                  <SelectItem value="5">5th of every month</SelectItem>
                  <SelectItem value="10">10th of every month</SelectItem>
                  <SelectItem value="15">15th of every month</SelectItem>
                  <SelectItem value="20">20th of every month</SelectItem>
                  <SelectItem value="25">25th of every month</SelectItem>
                  <SelectItem value="last">Last day of month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Auto-increase SIP</Label>
              <Select value={autoIncrease} onValueChange={setAutoIncrease}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="10">10% annually</SelectItem>
                  <SelectItem value="15">15% annually</SelectItem>
                  <SelectItem value="20">20% annually</SelectItem>
                  <SelectItem value="25">25% annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleSaveSettings}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
              onClick={() => handleQuickDownload('comprehensive')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Comprehensive Statement
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
              onClick={() => handleQuickDownload('tax')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Tax Statement
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => handleQuickDownload('portfolio')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Portfolio Summary
            </Button>

            <Button 
              variant="outline" 
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
              onClick={() => handleQuickDownload('sip-statement')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download SIP Statement
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-blue-700">
              All statements are generated with beautiful SIP Brewery branding and include AI-powered insights 
              to help you make better investment decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPSettings;
