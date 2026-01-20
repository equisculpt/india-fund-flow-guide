
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Activity, Users, Clock, Eye, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityEvent {
  id: string;
  event_type: string;
  user_email: string;
  ip_address: string;
  success: boolean;
  created_at: string;
  details: any;
}

interface SecurityStats {
  totalEvents: number;
  failedLogins: number;
  successfulLogins: number;
  activeAdmins: number;
}

// Mock security events for prototype
const mockSecurityEvents: SecurityEvent[] = [
  {
    id: 'event-001',
    event_type: 'LOGIN_SUCCESS',
    user_email: 'admin@sipbrewery.com',
    ip_address: '192.168.1.100',
    success: true,
    created_at: new Date().toISOString(),
    details: { browser: 'Chrome', os: 'Windows' }
  },
  {
    id: 'event-002',
    event_type: 'LOGIN_FAILED',
    user_email: 'unknown@test.com',
    ip_address: '10.0.0.50',
    success: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    details: { reason: 'Invalid credentials' }
  },
  {
    id: 'event-003',
    event_type: 'SESSION_CREATED',
    user_email: 'amit.patel@agent.com',
    ip_address: '192.168.1.105',
    success: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    details: { session_duration: '2h' }
  }
];

const SecurityDashboard = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [stats, setStats] = useState<SecurityStats>({
    totalEvents: 0,
    failedLogins: 0,
    successfulLogins: 0,
    activeAdmins: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    setLoading(true);
    
    // Use mock data for prototype
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSecurityEvents(mockSecurityEvents);
    
    const totalEvents = mockSecurityEvents.length;
    const failedLogins = mockSecurityEvents.filter(e => 
      e.event_type.includes('LOGIN') && !e.success
    ).length;
    const successfulLogins = mockSecurityEvents.filter(e => 
      e.event_type === 'LOGIN_SUCCESS'
    ).length;

    setStats({
      totalEvents,
      failedLogins,
      successfulLogins,
      activeAdmins: 3
    });
    
    setLoading(false);
  };

  const cleanupSessions = async () => {
    // Mock cleanup for prototype
    toast({
      title: "Success",
      description: "Expired sessions cleaned up",
    });
    fetchSecurityData();
  };

  const getEventBadgeColor = (eventType: string, success: boolean) => {
    if (!success) return 'destructive';
    if (eventType === 'LOGIN_SUCCESS') return 'default';
    if (eventType.includes('LOGIN')) return 'secondary';
    return 'outline';
  };

  const formatEventDetails = (details: any) => {
    if (!details) return '';
    try {
      const parsed = typeof details === 'string' ? JSON.parse(details) : details;
      return Object.entries(parsed)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    } catch {
      return String(details);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Loading security data...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
          <p className="text-muted-foreground">Monitor admin access and security events</p>
        </div>
        <Button onClick={fetchSecurityData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Last 50 events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failedLogins}</div>
            <p className="text-xs text-muted-foreground">Security alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Logins</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successfulLogins}</div>
            <p className="text-xs text-muted-foreground">Authorized access</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeAdmins}</div>
            <p className="text-xs text-muted-foreground">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={cleanupSessions}
                className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
              >
                Cleanup expired
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Recent Security Events
          </CardTitle>
          <CardDescription>
            Latest authentication and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No security events recorded yet
              </p>
            ) : (
              securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={getEventBadgeColor(event.event_type, event.success)}>
                      {event.event_type.replace(/_/g, ' ')}
                    </Badge>
                    <div className="text-sm">
                      <div className="font-medium">
                        {event.user_email || 'System'}
                      </div>
                      <div className="text-muted-foreground">
                        IP: {event.ip_address || 'Unknown'}
                      </div>
                      {event.details && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatEventDetails(event.details)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {new Date(event.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
