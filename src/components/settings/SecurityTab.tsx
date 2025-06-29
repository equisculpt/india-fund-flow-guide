
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Lock,
  Shield, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail
} from 'lucide-react';

const SecurityTab = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter current password"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold">SMS Authentication</div>
                  <div className="text-sm text-gray-600">Receive codes via SMS</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold">Email Authentication</div>
                  <div className="text-sm text-gray-600">Receive codes via email</div>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
