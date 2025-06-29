
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from './settings/ProfileTab';
import SecurityTab from './settings/SecurityTab';
import NotificationsTab from './settings/NotificationsTab';
import DocumentsTab from './settings/DocumentsTab';
import PreferencesTab from './settings/PreferencesTab';

const UserSettings = () => {
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
          <ProfileTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
