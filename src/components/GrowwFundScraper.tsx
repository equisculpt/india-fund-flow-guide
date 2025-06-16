
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Badge } from "@/components/ui/badge";
import { Globe, Key, Search } from 'lucide-react';

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const GrowwFundScraper = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(FirecrawlService.getApiKey() || '');
  const [fundName, setFundName] = useState('Axis Midcap Fund');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Firecrawl API key",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    const isValid = await FirecrawlService.testApiKey(apiKey);
    
    if (isValid) {
      FirecrawlService.saveApiKey(apiKey);
      setIsApiKeyValid(true);
      toast({
        title: "Success",
        description: "Firecrawl API key saved and verified",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid Firecrawl API key. Please check and try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
    setIsLoading(false);
  };

  const handleScrapeFund = async () => {
    if (!fundName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a fund name to search",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      console.log('Starting fund scraping for:', fundName);
      const result = await FirecrawlService.scrapeMutualFundData(fundName);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Fund data scraped successfully from Groww",
          duration: 3000,
        });
        setCrawlResult(result.data);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to scrape fund data",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error scraping fund:', error);
      toast({
        title: "Error",
        description: "Failed to scrape fund data",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="space-y-6">
      {/* API Key Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            Firecrawl API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                Firecrawl API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Firecrawl API key"
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Get your API key from{' '}
                <a href="https://www.firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  firecrawl.dev
                </a>
              </p>
            </div>
            <Button onClick={handleSaveApiKey} disabled={isLoading || !apiKey.trim()}>
              {isLoading ? "Verifying..." : "Save & Verify API Key"}
            </Button>
            {isApiKeyValid && (
              <Badge className="bg-green-100 text-green-800">
                API Key Verified ✓
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Fund Scraping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Scrape Fund Data from Groww
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fundName" className="text-sm font-medium">
                Fund Name
              </label>
              <Input
                id="fundName"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder="Enter mutual fund name"
                className="w-full"
              />
            </div>
            {isLoading && (
              <Progress value={progress} className="w-full" />
            )}
            <Button
              onClick={handleScrapeFund}
              disabled={isLoading || !isApiKeyValid || !fundName.trim()}
              className="w-full"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Scraping Fund Data..." : "Scrape from Groww"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {crawlResult && (
        <Card>
          <CardHeader>
            <CardTitle>Scraping Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>Status: {crawlResult.status}</p>
              <p>Completed Pages: {crawlResult.completed}</p>
              <p>Total Pages: {crawlResult.total}</p>
              <p>Credits Used: {crawlResult.creditsUsed}</p>
              <p>Expires At: {new Date(crawlResult.expiresAt || '').toLocaleString()}</p>
              {crawlResult.data && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Scraped Fund Data:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-h-60 text-xs">
                    {JSON.stringify(crawlResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
