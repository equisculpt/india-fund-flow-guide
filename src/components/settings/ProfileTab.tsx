
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  CheckCircle,
  AlertCircle,
  Camera
} from 'lucide-react';
import { TEST_USER_DATA } from '@/services/testData';

const ProfileTab = () => {
  const { profile } = TEST_USER_DATA;

  return (
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
  );
};

export default ProfileTab;
