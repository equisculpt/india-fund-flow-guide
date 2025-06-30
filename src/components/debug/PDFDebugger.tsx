
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';
import { statementDataService } from '@/services/statement/statementDataService';
import { pdfStatementGenerator } from '@/services/pdf/PDFStatementGenerator';

const PDFDebugger: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({});
  const [isTestingData, setIsTestingData] = useState(false);
  const [isTestingPDF, setIsTestingPDF] = useState(false);
  const [isTestingDownload, setIsTestingDownload] = useState(false);
  const { toast } = useToast();
  const pdfDownloadService = new PDFDownloadService(toast);

  const testDataFetch = async () => {
    setIsTestingData(true);
    try {
      console.log('🧪 Testing data fetch...');
      const statementData = await statementDataService.getStatementData('TEST123', 'comprehensive');
      
      const result = {
        success: true,
        hasUserInfo: !!statementData.userInfo,
        hasPortfolio: !!statementData.portfolio,
        holdingsCount: statementData.holdings?.length || 0,
        userName: statementData.userInfo?.name,
        portfolioValue: statementData.portfolio?.currentValue
      };
      
      setTestResults(prev => ({ ...prev, dataFetch: result }));
      toast({ title: "Data fetch test passed ✅", description: "Statement data retrieved successfully" });
    } catch (error) {
      const result = { success: false, error: error.message };
      setTestResults(prev => ({ ...prev, dataFetch: result }));
      toast({ title: "Data fetch test failed ❌", description: error.message, variant: "destructive" });
    }
    setIsTestingData(false);
  };

  const testPDFGeneration = async () => {
    setIsTestingPDF(true);
    try {
      console.log('🧪 Testing PDF generation...');
      const statementData = await statementDataService.getStatementData('TEST123', 'comprehensive');
      const pdfBlob = await pdfStatementGenerator.generatePDF('comprehensive', statementData);
      
      const result = {
        success: true,
        blobSize: pdfBlob.size,
        blobType: pdfBlob.type,
        sizeInKB: Math.round(pdfBlob.size / 1024),
        isValidBlob: pdfBlob instanceof Blob
      };
      
      setTestResults(prev => ({ ...prev, pdfGeneration: result }));
      toast({ title: "PDF generation test passed ✅", description: `Generated ${result.sizeInKB}KB PDF` });
    } catch (error) {
      const result = { success: false, error: error.message };
      setTestResults(prev => ({ ...prev, pdfGeneration: result }));
      toast({ title: "PDF generation test failed ❌", description: error.message, variant: "destructive" });
    }
    setIsTestingPDF(false);
  };

  const testFullDownload = async () => {
    setIsTestingDownload(true);
    try {
      console.log('🧪 Testing full download process...');
      await pdfDownloadService.downloadPDFStatement('comprehensive');
      
      const result = { success: true, message: 'Download completed successfully' };
      setTestResults(prev => ({ ...prev, fullDownload: result }));
    } catch (error) {
      const result = { success: false, error: error.message };
      setTestResults(prev => ({ ...prev, fullDownload: result }));
    }
    setIsTestingDownload(false);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>PDF Generation Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={testDataFetch} 
            disabled={isTestingData}
            variant="outline"
          >
            {isTestingData ? 'Testing...' : 'Test Data Fetch'}
          </Button>
          
          <Button 
            onClick={testPDFGeneration} 
            disabled={isTestingPDF}
            variant="outline"
          >
            {isTestingPDF ? 'Testing...' : 'Test PDF Generation'}
          </Button>
          
          <Button 
            onClick={testFullDownload} 
            disabled={isTestingDownload}
            variant="outline"
          >
            {isTestingDownload ? 'Testing...' : 'Test Full Download'}
          </Button>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">Test Results:</h3>
            
            {testResults.dataFetch && (
              <div className={`p-4 rounded-lg ${testResults.dataFetch.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className="font-medium">Data Fetch Test</h4>
                <pre className="text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(testResults.dataFetch, null, 2)}
                </pre>
              </div>
            )}
            
            {testResults.pdfGeneration && (
              <div className={`p-4 rounded-lg ${testResults.pdfGeneration.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className="font-medium">PDF Generation Test</h4>
                <pre className="text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(testResults.pdfGeneration, null, 2)}
                </pre>
              </div>
            )}
            
            {testResults.fullDownload && (
              <div className={`p-4 rounded-lg ${testResults.fullDownload.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className="font-medium">Full Download Test</h4>
                <pre className="text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(testResults.fullDownload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFDebugger;
