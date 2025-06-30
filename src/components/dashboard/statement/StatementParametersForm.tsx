
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Download, Settings } from 'lucide-react';
import { StatementFormData, StatementType } from './types';

interface StatementParametersFormProps {
  selectedStatementData: StatementType | undefined;
  formData: StatementFormData;
  onFormDataChange: (field: keyof StatementFormData, value: any) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const StatementParametersForm: React.FC<StatementParametersFormProps> = ({
  selectedStatementData,
  formData,
  onFormDataChange,
  onGenerate,
  isGenerating
}) => {
  if (!selectedStatementData) return null;

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-600" />
          Statement Parameters - {selectedStatementData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <DatePicker
              selected={formData.startDate}
              onSelect={(date) => onFormDataChange('startDate', date)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="end-date">End Date</Label>
            <DatePicker
              selected={formData.endDate}
              onSelect={(date) => onFormDataChange('endDate', date)}
              className="w-full"
            />
          </div>
        </div>

        {/* Financial Year */}
        <div>
          <Label>Financial Year (For Tax Statements)</Label>
          <Select value={formData.financialYear} onValueChange={(value) => onFormDataChange('financialYear', value)}>
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
            <Select value={formData.language} onValueChange={(value) => onFormDataChange('language', value)}>
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
            <Select value={formData.downloadFormat} onValueChange={(value) => onFormDataChange('downloadFormat', value)}>
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
          onClick={onGenerate}
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
              Generate {selectedStatementData.name}
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
  );
};

export default StatementParametersForm;
