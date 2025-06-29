import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Mail, 
  Lock,
  Settings,
  FileText,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Camera
} from 'lucide-react';
import { TEST_USER_DATA } from '@/services/testData';

const UserSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    sipReminders: true,
    performanceAlerts: true,
    marketUpdates: false,
    referralUpdates: true,
    emailDigest: true,
    smsAlerts: false
  });

  const { profile } = TEST_USER_DATA;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={profile.full_name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={profile.phone} />
                    </div>
                    <div>
                      <Label htmlFor="pan">PAN Number</Label>
                      <Input id="pan" defaultValue={profile.pan_number} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                    
                    <div>
                      <Label>KYC Status</Label>
                      <div className="mt-2">
                        <Badge className={
                          profile.kyc_status === 'verified' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {profile.kyc_status === 'verified' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {profile.kyc_status !== 'verified' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {profile.kyc_status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Account Type</Label>
                      <div className="mt-2">
                        <Badge variant="outline">{profile.user_type}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
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
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">SIP Reminders</div>
                      <div className="text-sm text-gray-600">Get notified before SIP deductions</div>
                    </div>
                    <Switch 
                      checked={notifications.sipReminders}
                      onCheckedChange={(checked) => setNotifications({...notifications, sipReminders: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Performance Alerts</div>
                      <div className="text-sm text-gray-600">Updates on portfolio performance</div>
                    </div>
                    <Switch 
                      checked={notifications.performanceAlerts}
                      onCheckedChange={(checked) => setNotifications({...notifications, performanceAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Market Updates</div>
                      <div className="text-sm text-gray-600">Daily market news and insights</div>
                    </div>
                    <Switch 
                      checked={notifications.marketUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Referral Updates</div>
                      <div className="text-sm text-gray-600">Updates on referral rewards</div>
                    </div>
                    <Switch 
                      checked={notifications.referralUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, referralUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">Email Digest</div>
                      <div className="text-sm text-gray-600">Weekly summary emails</div>
                    </div>
                    <Switch 
                      checked={notifications.emailDigest}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailDigest: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">SMS Alerts</div>
                      <div className="text-sm text-gray-600">Important alerts via SMS</div>
                    </div>
                    <Switch 
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({...notifications, smsAlerts: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  KYC Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">PAN Card</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">ABCDE1234F</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Re-upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Aadhaar Card</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">****-****-1234</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Re-upload
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Bank Statement</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Required for verification</p>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Now
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Income Proof</span>
                      <Badge className="bg-gray-100 text-gray-800">
                        Optional
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">For higher investment limits</p>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
