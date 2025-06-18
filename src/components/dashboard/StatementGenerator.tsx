
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Download, FileText, Calculator, PieChart, Receipt } from 'lucide-react';
import { format } from 'date-fns';

interface StatementGeneratorProps {
  onGenerateStatement: (type: string, params: any) => void;
}

const StatementGenerator: React.FC<StatementGeneratorProps> = ({ onGenerateStatement }) => {
  const [selectedStatement, setSelectedStatement] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [financialYear, setFinancialYear] = useState('');

  const statementTypes = [
    { id: 'tax-saving', name: 'Tax Saving Statement', icon: Calculator, description: 'ELSS investments and tax benefits' },
    { id: 'sip-statement', name: 'SIP Statement', icon: Receipt, description: 'Systematic Investment Plan details' },
    { id: 'portfolio-report', name: 'Portfolio Report', icon: PieChart, description: 'Complete portfolio overview' },
    { id: 'transaction-statement', name: 'Transaction Statement', icon: FileText, description: 'All buy/sell transactions' },
    { id: 'capital-gains', name: 'Capital Gains Statement', icon: Calculator, description: 'For tax filing purposes' },
    { id: 'dividend-statement', name: 'Dividend Statement', icon: Receipt, description: 'Dividend income details' },
    { id: 'annual-report', name: 'Annual Portfolio Report', icon: PieChart, description: 'Yearly performance summary' }
  ];

  const handleGenerateStatement = () => {
    if (!selectedStatement) return;

    const params = {
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      financialYear
    };

    onGenerateStatement(selectedStatement, params);
  };

  const selectedStatementData = statementTypes.find(s => s.id === selectedStatement);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Statements & Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Statement Type Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Select Statement Type</label>
            <div className="grid md:grid-cols-2 gap-3">
              {statementTypes.map((statement) => {
                const Icon = statement.icon;
                return (
                  <Card 
                    key={statement.id}
                    className={`cursor-pointer transition-colors ${
                      selectedStatement === statement.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedStatement(statement.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <div className="font-medium">{statement.name}</div>
                          <div className="text-sm text-gray-600">{statement.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {selectedStatement && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Statement Parameters</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onSelect={setStartDate}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onSelect={setEndDate}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Financial Year</label>
                  <Select value={financialYear} onValueChange={setFinancialYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select FY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">FY 2024-25</SelectItem>
                      <SelectItem value="2023-24">FY 2023-24</SelectItem>
                      <SelectItem value="2022-23">FY 2022-23</SelectItem>
                      <SelectItem value="2021-22">FY 2021-22</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerateStatement}
                className="w-full"
                disabled={!selectedStatement}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate {selectedStatementData?.name}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementGenerator;
