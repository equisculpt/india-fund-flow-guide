
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import FundAnalyticsChart from '@/components/FundAnalyticsChart';
import SIPAnalytics from '@/components/SIPAnalytics';

// Mock fund data - in real app, this would come from API
const fundData = {
  '1': {
    id: '1',
    name: 'HDFC Top 100 Fund',
    amc: 'HDFC Mutual Fund',
    category: 'Large Cap',
    nav: 856.32,
    returns1y: 24.8,
    returns3y: 18.5,
    returns5y: 15.2,
    riskLevel: 'Moderate',
    minSip: 500,
    minLumpsum: 5000,
    expenseRatio: 1.05
  }
};

const FundDetailsPage = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const fund = fundData[fundId as keyof typeof fundData];

  if (!fund) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Fund Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{fund.name}</h1>
          <p className="text-muted-foreground">{fund.amc} • {fund.category}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Current NAV</div>
            <div className="text-2xl font-bold">₹{fund.nav}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">1Y Returns</div>
            <div className="text-2xl font-bold text-green-600">+{fund.returns1y}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">3Y Returns</div>
            <div className="text-2xl font-bold text-green-600">+{fund.returns3y}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Risk Level</div>
            <div className="text-2xl font-bold">{fund.riskLevel}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="nav-chart" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            NAV Chart
          </TabsTrigger>
          <TabsTrigger value="sip-analytics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            SIP Analytics
          </TabsTrigger>
          <TabsTrigger value="invest">
            Invest
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{fund.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className="font-medium">{fund.riskLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min SIP</span>
                  <span className="font-medium">₹{fund.minSip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Lumpsum</span>
                  <span className="font-medium">₹{fund.minLumpsum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expense Ratio</span>
                  <span className="font-medium">{fund.expenseRatio}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Returns Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">1 Year</span>
                  <span className="font-medium text-green-600">+{fund.returns1y}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3 Years</span>
                  <span className="font-medium text-green-600">+{fund.returns3y}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">5 Years</span>
                  <span className="font-medium text-green-600">+{fund.returns5y}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nav-chart">
          <FundAnalyticsChart fundId={fund.id} fundName={fund.name} />
        </TabsContent>

        <TabsContent value="sip-analytics">
          <SIPAnalytics fundId={fund.id} fundName={fund.name} />
        </TabsContent>

        <TabsContent value="invest">
          <Card>
            <CardHeader>
              <CardTitle>Investment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Start SIP</h3>
                    <p className="text-muted-foreground mb-4">
                      Invest systematically with monthly SIP starting from ₹{fund.minSip}
                    </p>
                    <Button className="w-full">Start SIP</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Lumpsum Investment</h3>
                    <p className="text-muted-foreground mb-4">
                      Make a one-time investment starting from ₹{fund.minLumpsum}
                    </p>
                    <Button variant="outline" className="w-full">Invest Lumpsum</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundDetailsPage;
