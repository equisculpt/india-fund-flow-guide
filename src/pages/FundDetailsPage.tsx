
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { GrowwFundScraper } from '@/components/GrowwFundScraper';
import { AMCPortfolioUploader } from '@/components/AMCPortfolioUploader';
import PortfolioHoldings from '@/components/charts/PortfolioHoldings';

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
  const navigate = useNavigate();
  const { fundId } = useParams();
  const [fundName, setFundName] = useState<string>('');
  const [schemeCode, setSchemeCode] = useState<string | null>(null);

  useEffect(() => {
    // Set fund name based on fundId
    if (fundId === '120503') {
      setFundName('Axis Midcap Fund - Direct Growth');
      setSchemeCode('120503');
    } else if (fundId === '100016') {
      setFundName('SBI Bluechip Fund - Direct Growth');
      setSchemeCode('100016');
    } else if (fundId === '101206') {
      setFundName('HDFC Top 100 Fund - Direct Growth');
      setSchemeCode('101206');
    } else if (fundId === '120601') {
      setFundName('SBI Small Cap Fund - Regular Plan - Growth');
      setSchemeCode('120601');
    } else {
      setFundName('Unknown Fund');
      setSchemeCode(fundId || null);
    }
  }, [fundId]);

  const mockFundData = {
    schemeCode: schemeCode || fundId,
    schemeName: fundName,
    amc: 'Sample AMC',
    category: 'Equity',
    nav: 100.50
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="mt-4">
          <h2 className="text-3xl font-bold">{fundName}</h2>
          <p className="text-gray-500">Fund ID: {fundId}</p>
        </div>

        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="groww-scraper">Groww Scraper</TabsTrigger>
            <TabsTrigger value="portfolio-uploader">Upload Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <PortfolioHoldings fundData={mockFundData} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Analytics will be implemented here</p>
              </CardContent>
            </Card>
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
