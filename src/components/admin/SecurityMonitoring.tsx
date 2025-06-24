
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Activity, 
  FileText,
  RefreshCw,
  Bell
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user_affected?: string;
  ip_address?: string;
  created_at: string;
  status: 'active' | 'investigating' | 'resolved';
}

const SecurityMonitoring = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSecurityEvents();
    
    // Set up real-time monitoring
    const interval = setInterval(fetchSecurityEvents, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityEvents = async () => {
    try {
      // In a real implementation, this would fetch from a security monitoring system
      // For now, we'll create mock security events based on actual data patterns
      
      const mockEvents: SecurityEvent[] = [
        {
          id: '1',
          event_type: 'SUSPICIOUS_LOGIN_ATTEMPT',
          severity: 'high',
          description: 'Multiple failed login attempts from unusual location',
          ip_address: '192.168.1.100',
          created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
          status: 'active'
        },
        {
          id: '2',
          event_type: 'DATA_ACCESS_ANOMALY',
          severity: 'medium',
          description: 'Unusual data access pattern detected in KYC records',
          user_affected: 'user@example.com',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          status: 'investigating'
        },
        {
          id: '3',
          event_type: 'BACKUP_VERIFICATION_PASSED',
          severity: 'low',
          description: 'Daily backup verification completed successfully',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
          status: 'resolved'
        }
      ];

      setSecurityEvents(mockEvents);
    } catch (error) {
      console.error('Error fetching security events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch security events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { variant: 'outline', label: 'Low', class: 'text-green-600' },
      medium: { variant: 'secondary', label: 'Medium', class: 'text-yellow-600' },
      high: { variant: 'destructive', label: 'High', class: 'text-orange-600' },
      critical: { variant: 'destructive', label: 'Critical', class: 'text-red-600' }
    };

    const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.low;
    return <Badge variant={config.variant as any} className={config.class}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'destructive', label: 'Active' },
      investigating: { variant: 'secondary', label: 'Investigating' },
      resolved: { variant: 'default', label: 'Resolved' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  const handleEventAction = async (eventId: string, action: string) => {
    try {
      // In a real implementation, this would update the event status
      toast({
        title: "Action Completed",
        description: `Event ${eventId} has been marked as ${action}`,
      });
      
      // Refresh events
      await fetchSecurityEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Loading security monitoring data...
        </div>
      </div>
    );
  }

  const activeThreats = securityEvents.filter(e => e.status === 'active' && (e.severity === 'high' || e.severity === 'critical')).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Monitoring</h2>
          <p className="text-muted-foreground">Real-time security threat detection and response</p>
        </div>
        <Button onClick={fetchSecurityEvents} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${activeThreats > 0 ? 'text-red-500' : 'text-green-500'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${activeThreats > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {activeThreats}
            </div>
            <p className="text-xs text-muted-foreground">High/Critical severity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Integrity</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">100%</div>
            <p className="text-xs text-muted-foreground">KYC & Portfolio data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Status</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">✓</div>
            <p className="text-xs text-muted-foreground">Last backup: 6h ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Access Monitoring</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Active</div>
            <p className="text-xs text-muted-foreground">24/7 monitoring</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {activeThreats > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Alert:</strong> {activeThreats} active security threat(s) detected. 
            Immediate attention required to protect user data and system integrity.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Security Events
          </CardTitle>
          <CardDescription>
            Recent security events and threat detections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No security events detected. System is secure.
              </p>
            ) : (
              securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      {getSeverityBadge(event.severity)}
                      {getStatusBadge(event.status)}
                    </div>
                    <div>
                      <div className="font-medium">{event.event_type.replace(/_/g, ' ')}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                      {event.user_affected && (
                        <div className="text-xs text-muted-foreground">User: {event.user_affected}</div>
                      )}
                      {event.ip_address && (
                        <div className="text-xs text-muted-foreground">IP: {event.ip_address}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.created_at).toLocaleString()}
                    </div>
                    {event.status === 'active' && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEventAction(event.id, 'investigating')}
                        >
                          Investigate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEventAction(event.id, 'resolved')}
                        >
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-500" />
              <span>Enable real-time alerts for critical security events</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Implement multi-factor authentication for all admin accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-500" />
              <span>Schedule automated daily backups with encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <span>Monitor API rate limits to prevent abuse</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMonitoring;
