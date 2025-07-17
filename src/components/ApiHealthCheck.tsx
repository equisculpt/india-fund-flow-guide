import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { HealthCheckService } from '@/services/api/healthCheckService';
import { useToast } from '@/hooks/use-toast';

interface HealthStatus {
  isConnected: boolean;
  responseTime: number;
  status: string;
  error?: string;
  lastChecked?: Date;
}

export const ApiHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const result = await HealthCheckService.checkConnectivity();
      setHealthStatus({
        ...result,
        lastChecked: new Date(),
      });
      
      if (result.isConnected) {
        toast({
          title: "API Connected",
          description: `Health check successful (${result.responseTime}ms)`,
        });
      } else {
        toast({
          title: "API Connection Failed",
          description: result.error || "Unknown error",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus({
        isConnected: false,
        responseTime: 0,
        status: 'error',
        error: 'Health check failed',
        lastChecked: new Date(),
      });
      
      toast({
        title: "Health Check Failed",
        description: "Unable to perform health check",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusColor = (): "default" | "destructive" | "secondary" | "outline" => {
    if (!healthStatus) return 'secondary';
    return healthStatus.isConnected ? 'default' : 'destructive';
  };

  const getStatusIcon = () => {
    if (isLoading) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (!healthStatus) return <Clock className="h-4 w-4" />;
    return healthStatus.isConnected ? 
      <CheckCircle className="h-4 w-4" /> : 
      <XCircle className="h-4 w-4" />;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Health Status
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Base URL:</span>
          <code className="text-xs bg-muted px-2 py-1 rounded">
            https://api.sipbrewery.com/api
          </code>
        </div>
        
        {healthStatus && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={getStatusColor()}>
                {healthStatus.isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Response Time:</span>
              <span className="text-sm font-medium">{healthStatus.responseTime}ms</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API Status:</span>
              <span className="text-sm font-medium">{healthStatus.status}</span>
            </div>
            
            {healthStatus.error && (
              <div className="p-2 bg-destructive/10 border border-destructive/20 rounded">
                <p className="text-xs text-destructive">{healthStatus.error}</p>
              </div>
            )}
            
            {healthStatus.lastChecked && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Checked:</span>
                <span className="text-xs text-muted-foreground">
                  {healthStatus.lastChecked.toLocaleTimeString()}
                </span>
              </div>
            )}
          </>
        )}
        
        <Button 
          onClick={checkHealth} 
          disabled={isLoading}
          className="w-full"
          variant="outline"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Test Connection
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};