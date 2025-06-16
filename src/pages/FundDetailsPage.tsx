import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MutualFundPerformance } from '@/components/MutualFundPerformance';
import { MutualFundHoldings } from '@/components/MutualFundHoldings';
import SIPAnalytics from '@/components/SIPAnalytics';
import SIPCalculator from '@/components/SIPCalculator';
import { GrowwFundScraper } from '@/components/GrowwFundScraper';
import { AMFIPortfolioService } from '@/services/AMFIPortfolioScraper';
import { AMCPortfolioUploader } from '@/components/AMCPortfolioUploader';

interface FundDetailsPageProps {
  // Add any props you need here
}

const Header = () => {
  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold">SIP Brewery</h1>
      </div>
    </div>
  );
};

const FundDetailsPage: React.FC<FundDetailsPageProps> = () => {
  const router = useRouter();
  const { fundId, fundName } = router.query;
  const [schemeCode, setSchemeCode] = useState<string | null>(null);

  useEffect(() => {
    // Fetch scheme code based on fundId/fundName
    // Replace this with your actual data fetching logic
    if (fundId === '120503') {
      setSchemeCode('120503');
    } else if (fundId === '100016') {
      setSchemeCode('100016');
    } else if (fundId === '101206') {
      setSchemeCode('101206');
    } else {
      setSchemeCode(null);
    }
  }, [fundId, fundName]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="mt-4">
          <h2 className="text-3xl font-bold">{fundName}</h2>
          <p className="text-gray-500">Fund ID: {fundId}</p>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="groww-scraper">Groww Scraper</TabsTrigger>
            <TabsTrigger value="portfolio-uploader">Upload Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <MutualFundPerformance fundId={fundId as string} fundName={fundName as string} />
          </TabsContent>

          <TabsContent value="holdings">
            <MutualFundHoldings fundId={fundId as string} fundName={fundName as string} />
          </TabsContent>

          <TabsContent value="analytics">
            <SIPAnalytics fundId={fundId as string} fundName={fundName as string} />
          </TabsContent>

          <TabsContent value="calculator">
            <SIPCalculator />
          </TabsContent>

          <TabsContent value="groww-scraper">
            <GrowwFundScraper />
          </TabsContent>

          <TabsContent value="portfolio-uploader">
            <AMCPortfolioUploader />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FundDetailsPage;
