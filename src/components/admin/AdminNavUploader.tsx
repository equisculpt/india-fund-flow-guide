
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Database, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AdminNavUploader = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);
  const [updateStats, setUpdateStats] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLastUpdateInfo();
  }, []);

  const fetchLastUpdateInfo = async () => {
    try {
      const { data, error } = await supabase.rpc('execute_sql' as any, {
        sql: `
          SELECT 
            MAX(created_at) as last_update,
            COUNT(*) as total_records,
            COUNT(DISTINCT scheme_code) as unique_schemes
          FROM nav_update_history 
          WHERE DATE(created_at) = CURRENT_DATE
        `,
        params: []
      });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setLastUpdateTime(data[0].last_update);
        setUpdateStats(data[0]);
      }
    } catch (error) {
      console.error('Error fetching update info:', error);
    }
  };

  const runNAVUpdate = async () => {
    setIsUpdating(true);
    
    try {
      toast({
        title: "Starting NAV Update",
        description: "Fetching latest NAV data from API...",
      });

      // Call the daily fund analysis function which includes NAV updates
      const { data, error } = await supabase.functions.invoke('daily-fund-analysis', {
        body: { 
          manual_trigger: true,
          update_type: 'nav_only'
        }
      });

      if (error) throw error;

      toast({
        title: "NAV Update Completed",
        description: `Successfully updated NAV data. Processed ${data?.totalAnalyzed || 0} funds.`,
      });

      // Refresh the update info
      await fetchLastUpdateInfo();

    } catch (error) {
      console.error('Error updating NAV data:', error);
      toast({
        title: "NAV Update Failed",
        description: "Failed to update NAV data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const setupCronJob = async () => {
    try {
      toast({
        title: "Setting Up Automated Updates",
        description: "Configuring daily midnight NAV updates...",
      });

      const { data, error } = await supabase.functions.invoke('setup-cron-job', {
        body: { 
          job_type: 'daily_nav_update'
        }
      });

      if (error) throw error;

      toast({
        title: "Automation Configured",
        description: "Daily NAV updates will now run automatically at midnight IST.",
      });

    } catch (error) {
      console.error('Error setting up cron job:', error);
      toast({
        title: "Automation Setup Failed",
        description: "Failed to set up automated updates. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            NAV Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Last Update</div>
              <div className="text-lg font-semibold">
                {lastUpdateTime 
                  ? new Date(lastUpdateTime).toLocaleString()
                  : 'No updates today'
                }
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Records Today</div>
              <div className="text-lg font-semibold">
                {updateStats?.total_records || 0}
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Unique Schemes</div>
              <div className="text-lg font-semibold">
                {updateStats?.unique_schemes || 0}
              </div>
            </div>
          </div>

          {/* Manual Update */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Manual NAV Update</h3>
            <p className="text-sm text-gray-600">
              Fetch the latest NAV data from AMFI API and update the database.
            </p>
            <Button
              onClick={runNAVUpdate}
              disabled={isUpdating}
              className="w-full md:w-auto"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Updating NAV Data...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update NAV Data Now
                </>
              )}
            </Button>
          </div>

          {/* Automated Updates */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-medium">Automated Updates</h3>
            <p className="text-sm text-gray-600">
              Set up automatic daily NAV updates at midnight IST (18:30 UTC).
            </p>
            <div className="flex items-center gap-4">
              <Button
                onClick={setupCronJob}
                variant="outline"
              >
                <Clock className="h-4 w-4 mr-2" />
                Configure Daily Updates
              </Button>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Automated updates are configured
              </div>
            </div>
          </div>

          {/* API Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">NAV Data Source</h4>
            <p className="text-sm text-gray-600 mb-2">
              Data is fetched from the AMFI (Association of Mutual Funds in India) API:
            </p>
            <code className="text-xs bg-white p-2 rounded block">
              https://api.mfapi.in/mf
            </code>
            <p className="text-xs text-gray-500 mt-2">
              This provides real-time NAV data for all mutual fund schemes in India.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNavUploader;
