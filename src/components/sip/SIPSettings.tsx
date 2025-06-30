
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface SIPSettingsProps {
  onDownload: (type: string) => void;
}

const SIPSettings: React.FC<SIPSettingsProps> = ({ onDownload }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Default SIP Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Default SIP Amount</label>
              <input 
                type="number" 
                className="w-full mt-1 p-2 border rounded-lg" 
                defaultValue={5000}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Preferred SIP Date</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>1st of every month</option>
                <option>15th of every month</option>
                <option>Last day of month</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Auto-increase SIP</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>Disabled</option>
                <option>10% annually</option>
                <option>15% annually</option>
                <option>20% annually</option>
              </select>
            </div>
            <Button className="w-full">Save Settings</Button>
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
              className="w-full" 
              onClick={() => onDownload('comprehensive')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Comprehensive Statement
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onDownload('tax')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Tax Statement
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onDownload('portfolio')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Portfolio Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPSettings;
