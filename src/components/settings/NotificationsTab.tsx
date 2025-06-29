
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    sipReminders: true,
    performanceAlerts: true,
    marketUpdates: false,
    referralUpdates: true,
    emailDigest: true,
    smsAlerts: false
  });

  return (
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
  );
};

export default NotificationsTab;
