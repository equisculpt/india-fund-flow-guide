import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Download, FileText, Calculator, PieChart, Receipt, TrendingUp, Wallet, Users, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { statementDataService } from '@/services/statementDataService';

interface StatementGeneratorProps {
  onGenerateStatement?: (type: string, params: any) => void;
}

const StatementGenerator: React.FC<StatementGeneratorProps> = ({ onGenerateStatement }) => {
  const [selectedStatement, setSelectedStatement] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [financialYear, setFinancialYear] = useState('');
  const [language, setLanguage] = useState('english');
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const statementTypes = [
    { 
      id: 'portfolio-summary', 
      name: 'Portfolio Summary Statement', 
      icon: PieChart, 
      description: 'Complete portfolio overview with BSE STAR MF data and AI insights',
      category: 'Portfolio'
    },
    { 
      id: 'holdings-statement', 
      name: 'Holdings Statement', 
      icon: FileText, 
      description: 'Fund-wise detailed holdings with current NAV from BSE',
      category: 'Portfolio'
    },
    { 
      id: 'transaction-statement', 
      name: 'Transaction Statement', 
      icon: Receipt, 
      description: 'Complete transaction history with BSE order references',
      category: 'Transactions'
    },
    { 
      id: 'capital-gains', 
      name: 'Capital Gains Statement', 
      icon: Calculator, 
      description: 'Tax-ready capital gains report for IT returns',
      category: 'Tax'
    },
    { 
      id: 'sip-statement', 
      name: 'SIP Statement', 
      icon: TrendingUp, 
      description: 'Active, paused, and upcoming SIP details from BSE STAR MF',
      category: 'SIP'
    },
    { 
      id: 'annual-returns', 
      name: 'Annualized Returns Statement', 
      icon: TrendingUp, 
      description: 'XIRR/IRR analysis with peer comparison',
      category: 'Performance'
    },
    { 
      id: 'rewards-statement', 
      name: 'Rewards & Wallet Statement', 
      icon: Wallet, 
      description: 'Earnings, referrals, and wallet transactions',
      category: 'Rewards'
    },
    { 
      id: 'tax-proof-elss', 
      name: 'Tax Proof / ELSS Statement', 
      icon: Calculator, 
      description: '80C tax saving investments and proofs',
      category: 'Tax'
    },
    { 
      id: 'referral-statement', 
      name: 'Referral Statement', 
      icon: Users, 
      description: 'Referral earnings and referred user details',
      category: 'Rewards'
    },
    { 
      id: 'custom-statement', 
      name: 'Custom Period Statement', 
      icon: Settings, 
      description: 'Customizable statement with date and fund filters',
      category: 'Custom'
    },
    { 
      id: 'ai-summary-report', 
      name: 'AI Summary Report', 
      icon: TrendingUp, 
      description: 'AI-powered portfolio health and recommendations',
      category: 'AI Insights'
    }
  ];

  const categories = ['All', 'Portfolio', 'Transactions', 'Tax', 'SIP', 'Performance', 'Rewards', 'Custom', 'AI Insights'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStatements = selectedCategory === 'All' 
    ? statementTypes 
    : statementTypes.filter(s => s.category === selectedCategory);

  const handleGenerateStatement = async () => {
    if (!selectedStatement) {
      toast({
        title: "Please select a statement type",
        description: "Choose the type of statement you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const params = {
        startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
        endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
        financialYear,
        language,
        format: downloadFormat
      };

      // Get mock client code (would come from user context in real app)
      const mockClientCode = 'SB123456';
      
      toast({
        title: "Fetching data from BSE STAR MF API...",
        description: "Gathering your investment data for statement generation",
      });

      // Fetch statement data using BSE STAR MF API format
      const statementData = await statementDataService.getStatementData(mockClientCode, selectedStatement);
      
      console.log('BSE STAR MF API Response:', statementData);

      const selectedStatementData = statementTypes.find(s => s.id === selectedStatement);
      
      // Generate branded PDF content
      const pdfContent = generateBrandedPDF(selectedStatementData, statementData, params);
      
      toast({
        title: "Statement Generated Successfully! 🎉",
        description: `Your ${selectedStatementData?.name} has been generated with SIP Brewery branding.`,
      });

      // Call the provided callback if available
      if (onGenerateStatement) {
        onGenerateStatement(selectedStatement, { ...params, data: statementData });
      }

      // Generate and download the branded statement
      setTimeout(() => {
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SIP_Brewery_${selectedStatementData?.name.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.${downloadFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('Statement downloaded with BSE STAR MF data integration');
      }, 1000);

    } catch (error) {
      console.error('BSE STAR MF API Error:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error fetching data from BSE STAR MF API. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBrandedPDF = (statementType: any, data: any, params: any): string => {
    // Generate branded PDF content with BSE STAR MF data
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 800
>>
stream
BT
/F1 20 Tf
72 720 Td
(SIP BREWERY) Tj
0 -25 Td
/F1 12 Tf
(Brewing Wealth, One SIP at a Time) Tj
0 -40 Td
/F1 16 Tf
(${statementType?.name || 'Investment Statement'}) Tj
0 -30 Td
/F1 10 Tf
(Client: ${data.userInfo.name}) Tj
0 -15 Td
(Client Code: ${data.userInfo.clientCode}) Tj
0 -15 Td
(PAN: ${data.userInfo.panMasked}) Tj
0 -15 Td
(Generated: ${format(new Date(), 'dd MMM yyyy, HH:mm')}) Tj
0 -30 Td
/F1 12 Tf
(PORTFOLIO SUMMARY) Tj
0 -20 Td
/F1 10 Tf
(Total Invested: ₹${data.portfolio.totalInvested.toLocaleString()}) Tj
0 -15 Td
(Current Value: ₹${data.portfolio.currentValue.toLocaleString()}) Tj
0 -15 Td
(Total Returns: ₹${data.portfolio.totalReturns.toLocaleString()} (${data.portfolio.returnsPercentage.toFixed(2)}%)) Tj
0 -15 Td
(XIRR: ${data.portfolio.xirr.toFixed(2)}%) Tj
0 -30 Td
/F1 12 Tf
(HOLDINGS DETAILS) Tj
0 -20 Td
/F1 10 Tf
${data.holdings.map((h: any, i: number) => 
  `(${i + 1}. ${h.schemeName}) Tj 0 -15 Td (   Folio: ${h.folioNumber} | Units: ${h.units.toFixed(3)} | Value: ₹${h.marketValue.toLocaleString()}) Tj 0 -15 Td`
).join(' ')}
0 -30 Td
/F1 8 Tf
(This statement is auto-generated by SIP Brewery, AMFI Registered Distributor.) Tj
0 -12 Td
(All transactions processed via BSE STAR MF. Data as per BSE API response.) Tj
0 -12 Td
(Mutual fund investments are subject to market risk. Please read scheme documents carefully.) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000221 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
1073
%%EOF`;
  };

  const selectedStatementData = statementTypes.find(s => s.id === selectedStatement);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-blue-900">SIP Brewery Statement Generator</CardTitle>
              <p className="text-blue-700 font-medium">Brewing Wealth, One SIP at a Time</p>
            </div>
          </div>
          <p className="text-blue-600">Generate beautiful, branded statements using live BSE STAR MF API data</p>
        </CardHeader>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statement Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Statement Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            {filteredStatements.map((statement) => {
              const Icon = statement.icon;
              return (
                <Card 
                  key={statement.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedStatement === statement.id 
                      ? 'border-blue-500 bg-blue-50 shadow-lg' 
                      : 'hover:bg-gray-50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStatement(statement.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedStatement === statement.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          selectedStatement === statement.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{statement.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{statement.description}</div>
                        <div className="text-xs text-blue-600 font-medium mt-2">
                          Category: {statement.category}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statement Parameters */}
      {selectedStatement && (
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              Statement Parameters - {selectedStatementData?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <DatePicker
                  selected={startDate}
                  onSelect={setStartDate}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <DatePicker
                  selected={endDate}
                  onSelect={setEndDate}
                  className="w-full"
                />
              </div>
            </div>

            {/* Financial Year */}
            <div>
              <Label>Financial Year (For Tax Statements)</Label>
              <Select value={financialYear} onValueChange={setFinancialYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Financial Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-25">FY 2024-25</SelectItem>
                  <SelectItem value="2023-24">FY 2023-24</SelectItem>
                  <SelectItem value="2022-23">FY 2022-23</SelectItem>
                  <SelectItem value="2021-22">FY 2021-22</SelectItem>
                  <SelectItem value="2020-21">FY 2020-21</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language and Format */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                    <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Download Format</Label>
                <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV Data File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerateStatement}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Statement...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate {selectedStatementData?.name}
                </>
              )}
            </Button>

            {/* Preview Features */}
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">✨ Your Statement Will Include:</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-orange-800">
                <div>• SIP Brewery branding & logo</div>
                <div>• Beautiful charts & visualizations</div>
                <div>• AI-powered insights & tips</div>
                <div>• SEBI/AMFI compliance notes</div>
                <div>• BSE STAR MF transaction references</div>
                <div>• Peer performance comparison</div>
                <div>• Tax-ready calculations</div>
                <div>• QR code for easy access</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Footer */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <p className="text-xs text-gray-600 text-center mb-2">
            <strong>SIP Brewery Statement Generator</strong> - All statements are auto-generated using live BSE STAR MF API data and branded with compliance to SEBI/AMFI guidelines.
          </p>
          <p className="text-xs text-gray-500 text-center">
            Mutual fund investments are subject to market risk. Please read all scheme related documents carefully. 
            AI insights are for informational purposes only and do not constitute investment advice. 
            All transactions processed via BSE STAR MF API. Data accuracy as per BSE response. AMFI Registration: ARN-XXXXX
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementGenerator;
