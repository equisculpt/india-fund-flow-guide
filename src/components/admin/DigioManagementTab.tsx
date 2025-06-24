import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Shield, Settings, Users, Download, RefreshCw } from 'lucide-react';
import { digioService } from '@/services/digioService';
import { supabase } from '@/lib/supabase';

const DigioManagementTab = () => {
  const [config, setConfig] = useState({
    environment: 'sandbox' as 'sandbox' | 'production',
    autoKycEnabled: true,
    webhookEnabled: true,
    webhookUrl: ''
  });
  const [kycRequests, setKycRequests] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    completedRequests: 0,
    pendingRequests: 0,
    failedRequests: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDigioSettings();
    loadKycStats();
  }, []);

  const loadDigioSettings = async () => {
    // Load saved configuration (excluding API keys which are stored securely)
    const savedConfig = localStorage.getItem('digio_config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
    }
  };

  const loadKycStats = async () => {
    // Mock KYC data - in real app, this would come from your database
    setKycRequests([
      {
        id: '1',
        referenceId: 'SB_123456_abc',
        customerName: 'John Doe',
        email: 'john@example.com',
        status: 'completed',
        createdAt: '2024-01-15T10:30:00Z',
        completedAt: '2024-01-15T10:35:00Z'
      },
      {
        id: '2',
        referenceId: 'SB_123457_def',
        customerName: 'Jane Smith',
        email: 'jane@example.com',
        status: 'pending',
        createdAt: '2024-01-15T11:00:00Z',
        completedAt: null
      }
    ]);

    setStats({
      totalRequests: 25,
      completedRequests: 20,
      pendingRequests: 3,
      failedRequests: 2
    });
  };

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      // Save configuration (excluding API keys)
      localStorage.setItem('digio_config', JSON.stringify(config));

      toast({
        title: "Settings Saved",
        description: "Digio configuration has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save Digio configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      // Test connection by calling our edge function
      const { data, error } = await supabase.functions.invoke('digio-kyc', {
        body: { 
          action: 'get_status', 
          data: { referenceId: 'TEST_CONNECTION' } 
        }
      });

      if (error) {
        throw new Error('Connection test failed');
      }

      toast({
        title: "Connection Successful",
        description: "Successfully connected to Digio API using secure credentials.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Digio API. Please check your credentials in Supabase secrets.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshKycStatus = async (referenceId: string) => {
    try {
      const status = await digioService.getKYCStatus(referenceId);
      toast({
        title: "Status Updated",
        description: `KYC status: ${status.status}`,
      });
      loadKycStats(); // Reload the data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh KYC status.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default', label: 'Completed' },
      pending: { variant: 'secondary', label: 'Pending' },
      failed: { variant: 'destructive', label: 'Failed' },
      in_progress: { variant: 'outline', label: 'In Progress' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Digio Configuration
          </CardTitle>
          <CardDescription>
            Configure Digio settings for KYC verification and document processing. 
            API credentials are securely stored in Supabase secrets.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="environment">Environment</Label>
              <select
                id="environment"
                value={config.environment}
                onChange={(e) => setConfig({ ...config, environment: e.target.value as 'sandbox' | 'production' })}
                className="w-full p-2 border rounded-md"
              >
                <option value="sandbox">Sandbox</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto KYC Processing</Label>
                <p className="text-sm text-gray-600">Automatically process KYC requests</p>
              </div>
              <Switch
                checked={config.autoKycEnabled}
                onCheckedChange={(checked) => setConfig({ ...config, autoKycEnabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Webhook Notifications</Label>
                <p className="text-sm text-gray-600">Receive status updates via webhooks</p>
              </div>
              <Switch
                checked={config.webhookEnabled}
                onCheckedChange={(checked) => setConfig({ ...config, webhookEnabled: checked })}
              />
            </div>

            {config.webhookEnabled && (
              <div>
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={config.webhookUrl}
                  onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  placeholder="https://your-domain.com/webhooks/digio"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSaveConfig} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
            <Button onClick={handleTestConnection} variant="outline" disabled={isLoading}>
              Test Connection
            </Button>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Note:</strong> API credentials are securely stored in Supabase secrets 
              and accessed only by authorized edge functions. Your credentials are never exposed in the frontend code.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Statistics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            KYC Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalRequests}</div>
              <div className="text-sm text-blue-700">Total Requests</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.completedRequests}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.failedRequests}</div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent KYC Requests</CardTitle>
          <CardDescription>Monitor and manage KYC verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-mono text-sm">{request.referenceId}</TableCell>
                  <TableCell>{request.customerName}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => refreshKycStatus(request.referenceId)}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigioManagementTab;
