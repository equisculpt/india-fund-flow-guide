import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface ApiEndpoint {
  service: string;
  baseUrl: string;
  status: 'configured' | 'legacy' | 'external';
  description: string;
}

export const ApiConfigurationSummary = () => {
  const apiEndpoints: ApiEndpoint[] = [
    {
      service: 'BaseApiService (Main)',
      baseUrl: 'https://api.sipbrewery.com/api',
      status: 'configured',
      description: 'Global API service - Health check, SIP calculations, analytics'
    },
    {
      service: 'BSE Investment Service',
      baseUrl: '/api/bsestar',
      status: 'legacy',
      description: 'BSE Star MF API integration (relative path)'
    },
    {
      service: 'Digio KYC Service',
      baseUrl: '/api/digio/kyc',
      status: 'legacy',
      description: 'KYC verification service (relative path)'
    },
    {
      service: 'Fund API Service',
      baseUrl: 'https://api.mfapi.in/mf',
      status: 'external',
      description: 'External mutual fund data API'
    },
    {
      service: 'NAV Service',
      baseUrl: 'https://api.mfapi.in/mf',
      status: 'external',
      description: 'External NAV data service'
    },
    {
      service: 'NAV Data Service',
      baseUrl: 'AMFI API',
      status: 'external',
      description: 'AMFI scheme data service'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'configured':
        return <Badge variant="default" className="bg-green-100 text-green-800">✓ Configured</Badge>;
      case 'legacy':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">⚠ Legacy</Badge>;
      case 'external':
        return <Badge variant="secondary">🌐 External</Badge>;
      default:
        return <Badge variant="destructive">❌ Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'legacy':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'external':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const configuredCount = apiEndpoints.filter(ep => ep.status === 'configured').length;
  const totalCount = apiEndpoints.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          API Configuration Summary
          <Badge variant="outline">
            {configuredCount}/{totalCount} using global base URL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {apiEndpoints.map((endpoint, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(endpoint.status)}
                <div>
                  <div className="font-medium text-sm">{endpoint.service}</div>
                  <div className="text-xs text-muted-foreground">{endpoint.description}</div>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(endpoint.status)}
                <div className="text-xs text-muted-foreground mt-1 max-w-48 truncate">
                  {endpoint.baseUrl}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Configuration Status:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✅ <strong>Configured:</strong> Using global API base URL (https://api.sipbrewery.com/api)</li>
            <li>⚠️ <strong>Legacy:</strong> Using relative paths (may need backend proxy)</li>
            <li>🌐 <strong>External:</strong> Third-party APIs (independent configuration)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};