
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

const PreferencesTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Investment Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Risk Tolerance</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" size="sm">Conservative</Button>
                <Button size="sm">Moderate</Button>
                <Button variant="outline" size="sm">Aggressive</Button>
              </div>
            </div>
            
            <div>
              <Label>Investment Goals</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Wealth Creation</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Tax Saving</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Retirement Planning</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Child Education</span>
                </label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="monthlyBudget">Monthly Investment Budget</Label>
              <Input id="monthlyBudget" type="number" placeholder="Enter amount" className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Dark Mode</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Auto-invest Recommendations</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Data Saver Mode</span>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
