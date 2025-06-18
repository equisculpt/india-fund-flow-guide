
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Smartphone, Mail, MessageSquare, Settings } from 'lucide-react';

interface NotificationSetting {
  id: string;
  type: string;
  title: string;
  description: string;
  enabled: boolean;
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

const PushNotificationManager = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([]);
  const [masterNotifications, setMasterNotifications] = useState(true);

  useEffect(() => {
    loadNotificationSettings();
    requestNotificationPermission();
  }, []);

  const loadNotificationSettings = () => {
    const settings: NotificationSetting[] = [
      {
        id: '1',
        type: 'market_alerts',
        title: 'Market Alerts',
        description: 'AI-powered buy/sell recommendations and market timing alerts',
        enabled: true,
        channels: { push: true, email: true, sms: false }
      },
      {
        id: '2',
        type: 'price_alerts',
        title: 'Price Alerts',
        description: 'NAV changes, portfolio value updates, and target price alerts',
        enabled: true,
        channels: { push: true, email: false, sms: true }
      },
      {
        id: '3',
        type: 'portfolio_updates',
        title: 'Portfolio Updates',
        description: 'Daily portfolio summary, performance reports, and rebalancing alerts',
        enabled: true,
        channels: { push: true, email: true, sms: false }
      },
      {
        id: '4',
        type: 'news_insights',
        title: 'News & Insights',
        description: 'Market news, fund announcements, and AI-generated insights',
        enabled: false,
        channels: { push: false, email: true, sms: false }
      },
      {
        id: '5',
        type: 'tax_reminders',
        title: 'Tax Reminders',
        description: 'Tax harvesting opportunities, ELSS investment reminders',
        enabled: true,
        channels: { push: true, email: true, sms: false }
      },
      {
        id: '6',
        type: 'sip_reminders',
        title: 'SIP Reminders',
        description: 'SIP installment notifications, missed payments, increase reminders',
        enabled: true,
        channels: { push: true, email: false, sms: true }
      }
    ];
    setNotificationSettings(settings);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
    }
  };

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const toggleChannel = (id: string, channel: 'push' | 'email' | 'sms') => {
    setNotificationSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, channels: { ...setting.channels, [channel]: !setting.channels[channel] } }
        : setting
    ));
  };

  const sendTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('SIP Brewery - Test Notification', {
        body: 'Your notifications are working perfectly!',
        icon: '/favicon.ico'
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>Push Notification Settings</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">All Notifications</span>
              <Switch 
                checked={masterNotifications} 
                onCheckedChange={setMasterNotifications} 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">Notification Status</h4>
                <p className="text-sm text-blue-700">
                  {Notification?.permission === 'granted' 
                    ? 'Notifications enabled for this device'
                    : 'Click to enable browser notifications'
                  }
                </p>
              </div>
              <Button onClick={sendTestNotification} variant="outline" size="sm">
                Test Notification
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {notificationSettings.map((setting) => (
              <Card key={setting.id} className={`border ${!masterNotifications ? 'opacity-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{setting.title}</h4>
                        <Badge variant={setting.enabled ? "default" : "secondary"}>
                          {setting.enabled ? 'On' : 'Off'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <Switch 
                      checked={setting.enabled && masterNotifications} 
                      onCheckedChange={() => toggleNotification(setting.id)}
                      disabled={!masterNotifications}
                    />
                  </div>

                  {setting.enabled && masterNotifications && (
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-gray-700">Delivery Channels:</h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Push</span>
                          </div>
                          <Switch 
                            checked={setting.channels.push}
                            onCheckedChange={() => toggleChannel(setting.id, 'push')}
                            size="sm"
                          />
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Email</span>
                          </div>
                          <Switch 
                            checked={setting.channels.email}
                            onCheckedChange={() => toggleChannel(setting.id, 'email')}
                            size="sm"
                          />
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                            <span className="text-sm">SMS</span>
                          </div>
                          <Switch 
                            checked={setting.channels.sms}
                            onCheckedChange={() => toggleChannel(setting.id, 'sms')}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-800">Advanced Settings</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-700">Quiet Hours:</label>
                <p className="text-gray-600">10:00 PM - 8:00 AM</p>
              </div>
              <div>
                <label className="text-gray-700">Frequency Limit:</label>
                <p className="text-gray-600">Max 5 notifications per hour</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PushNotificationManager;
