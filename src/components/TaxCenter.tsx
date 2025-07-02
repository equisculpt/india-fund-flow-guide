
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ReportButtons } from '@/components/shared/ReportButtons';
import { 
  Receipt, 
  Download, 
  Calculator, 
  TrendingUp, 
  Calendar,
  FileText,
  PieChart,
  AlertCircle,
  CheckCircle,
  Clock,
  IndianRupee,
  Target
} from 'lucide-react';

const TaxCenter = () => {
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('2024-25');

  // Mock tax data
  const taxData = {
    currentYear: {
      totalInvestment: 150000,
      elssInvestment: 50000,
      taxSavingLimit: 150000,
      taxSaved: 15000,
      remainingLimit: 100000
    },
    capitalGains: {
      shortTerm: 25000,
      longTerm: 45000,
      exemptGains: 15000,
      taxableGains: 55000
    },
    transactions: [
      {
        id: 1,
        date: '2024-03-15',
        fundName: 'Axis Long Term Equity Fund',
        type: 'ELSS Investment',
        amount: 25000,
        taxBenefit: 7500,
        status: 'Eligible'
      },
      {
        id: 2,
        date: '2024-02-20',
        fundName: 'HDFC Tax Saver Fund',
        type: 'ELSS Investment',
        amount: 25000,
        taxBenefit: 7500,
        status: 'Eligible'
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tax Center</h2>
          <p className="text-gray-600 mt-1">Manage your tax planning and compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Tax Calculator
          </Button>
          <ReportButtons 
            reportName="tax-comprehensive" 
            category="tax" 
            variant="compact" 
          />
        </div>
      </div>

      {/* Tax Saving Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Tax Saved (FY {selectedFinancialYear})</p>
                <p className="text-3xl font-bold text-green-900">{formatCurrency(taxData.currentYear.taxSaved)}</p>
              </div>
              <Receipt className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">ELSS Invested</p>
                <p className="text-3xl font-bold text-blue-900">{formatCurrency(taxData.currentYear.elssInvestment)}</p>
              </div>
              <Target className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">Remaining 80C Limit</p>
                <p className="text-3xl font-bold text-orange-900">{formatCurrency(taxData.currentYear.remainingLimit)}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">Capital Gains Tax</p>
                <p className="text-3xl font-bold text-purple-900">{formatCurrency(taxData.capitalGains.taxableGains)}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tax-saving" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tax-saving">Tax Saving</TabsTrigger>
          <TabsTrigger value="capital-gains">Capital Gains</TabsTrigger>
          <TabsTrigger value="documents">Tax Documents</TabsTrigger>
          <TabsTrigger value="planning">Tax Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="tax-saving">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>80C Investment Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Total Investment Limit (80C)</span>
                    <span className="font-bold text-green-600">₹1,50,000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">ELSS Invested</span>
                    <span className="font-bold text-blue-600">{formatCurrency(taxData.currentYear.elssInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium">Remaining Limit</span>
                    <span className="font-bold text-orange-600">{formatCurrency(taxData.currentYear.remainingLimit)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Saving Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxData.transactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{transaction.fundName}</h4>
                          <p className="text-sm text-gray-600">{transaction.type} • {transaction.date}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <span className="text-sm text-gray-600">Investment Amount</span>
                          <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Tax Benefit</span>
                          <div className="font-semibold text-green-600">{formatCurrency(transaction.taxBenefit)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="capital-gains">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Capital Gains Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium">Short Term Capital Gains</span>
                    <span className="font-bold text-red-600">{formatCurrency(taxData.capitalGains.shortTerm)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Long Term Capital Gains</span>
                    <span className="font-bold text-blue-600">{formatCurrency(taxData.capitalGains.longTerm)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Exempt Gains</span>
                    <span className="font-bold text-green-600">{formatCurrency(taxData.capitalGains.exemptGains)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {formatCurrency(taxData.capitalGains.taxableGains)}
                  </div>
                  <div className="text-sm text-gray-600">Total Taxable Capital Gains</div>
                  <Button className="mt-4 w-full">
                    Calculate Tax Liability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents & Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📋 Form 16 (TDS Certificate)</h4>
                    <ReportButtons reportName="form-16" category="tax" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🎯 80C Investment Certificate</h4>
                    <ReportButtons reportName="80c-certificate" category="tax" variant="compact" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📊 Capital Gains Statement</h4>
                    <ReportButtons reportName="capital-gains" category="tax" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📄 Annual Investment Statement</h4>
                    <ReportButtons reportName="annual-investment" category="tax" variant="compact" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Tax-Specific Reports</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-700">🌱 ELSS Investment Report</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete ELSS holdings and tax benefits</p>
                    <ReportButtons reportName="elss" category="tax" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-red-700">📈 Short Term Capital Gains</h4>
                    <p className="text-sm text-gray-600 mb-3">STCG analysis and tax implications</p>
                    <ReportButtons reportName="stcg" category="tax" variant="compact" />
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-700">📉 Long Term Capital Gains</h4>
                    <p className="text-sm text-gray-600 mb-3">LTCG analysis and exemptions</p>
                    <ReportButtons reportName="ltcg" category="tax" variant="compact" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Tax Planning Recommendations</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• You can still invest ₹1,00,000 more in ELSS to maximize tax savings</p>
                      <p>• Consider investing before March 31st to claim deductions for this financial year</p>
                      <p>• Your long-term capital gains are below the exempt limit of ₹1 lakh</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended ELSS Funds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold">Axis Long Term Equity Fund</div>
                      <div className="text-sm text-gray-600">3Y Return: 18.5% | Rating: 4.5/5</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold">HDFC Tax Saver Fund</div>
                      <div className="text-sm text-gray-600">3Y Return: 16.8% | Rating: 4.2/5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-semibold">March 31, 2025</div>
                        <div className="text-sm text-gray-600">Last date for 80C investments</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">July 31, 2025</div>
                        <div className="text-sm text-gray-600">ITR filing deadline</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxCenter;
