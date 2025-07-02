
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';
import { WebToPDFService } from '@/services/pdf/WebToPDFService';
import { DirectPDFService } from '@/services/pdf/DirectPDFService';
import { statementDataService } from '@/services/statement/statementDataService';

const PDFDebugger: React.FC = () => {
  const [testResults, setTestResults] = useState<any>({});
  const [isTestingData, setIsTestingData] = useState(false);
  const [isTestingPDF, setIsTestingPDF] = useState(false);
  const [isTestingDownload, setIsTestingDownload] = useState(false);
  const [isTestingWebPDF, setIsTestingWebPDF] = useState(false);
  const { toast } = useToast();
  const pdfDownloadService = new PDFDownloadService(toast);
  const directPDFService = new DirectPDFService(toast);
  const webToPDFService = new WebToPDFService(toast);

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
      console.log('🧪 Testing browser print-to-PDF generation...');
      await directPDFService.generateDirectPDF('comprehensive', 'TEST123', {});
      
      const result = {
        success: true,
        method: 'Browser Print-to-PDF',
        description: 'Uses browser native print dialog for text-selectable PDFs'
      };
      
      setTestResults(prev => ({ ...prev, pdfGeneration: result }));
      toast({ title: "PDF generation test passed ✅", description: "Browser print-to-PDF method works" });
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

  const testWebToPDF = async () => {
    setIsTestingWebPDF(true);
    try {
      console.log('🧪 Testing new Web-to-PDF system...');
      
      // This should open the beautiful statement preview, not generate legacy PDF
      await webToPDFService.generateStatementPDF('comprehensive', 'TEST123');
      
      const result = { 
        success: true, 
        message: 'Web-to-PDF completed - statement preview opened with new design',
        note: 'This opens the beautiful web statement, not the legacy PDF'
      };
      setTestResults(prev => ({ ...prev, webToPDF: result }));
    } catch (error) {
      const result = { success: false, error: error.message };
      setTestResults(prev => ({ ...prev, webToPDF: result }));
    }
    setIsTestingWebPDF(false);
  };

  const openStatementPreview = () => {
    const url = `/statement-preview?type=comprehensive&client=TEST123`;
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>PDF Generation Debugger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h4 className="font-medium text-primary">Legacy PDF System (@react-pdf/renderer)</h4>
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

          <div className="border-t pt-4">
            <h4 className="font-medium text-primary mb-4">🚀 DIRECT PDF DOWNLOAD (No Manual Steps!)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={openStatementPreview} 
                variant="outline"
              >
                🎨 Preview Beautiful Design
              </Button>
              
              <Button 
                onClick={testWebToPDF} 
                disabled={isTestingWebPDF}
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              >
                {isTestingWebPDF ? 'Capturing & Converting...' : '⚡ DIRECT PDF DOWNLOAD'}
              </Button>
              
              <Button 
                onClick={() => webToPDFService.openStatementPreview('comprehensive', 'TEST123')} 
                variant="outline"
              >
                📄 Manual Preview
              </Button>
            </div>
            <p className="text-sm text-green-600 font-medium mt-2">
              ✅ <strong>FULLY AUTOMATIC:</strong> Captures beautiful web statement → Downloads PDF directly!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              🎯 <strong>Zero manual steps:</strong> Beautiful design with emojis, charts, AI insights → Perfect PDF
            </p>
          </div>
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
            
            {testResults.webToPDF && (
              <div className={`p-4 rounded-lg ${testResults.webToPDF.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h4 className="font-medium">🆕 Web-to-PDF Test</h4>
                <pre className="text-sm mt-2 overflow-x-auto">
                  {JSON.stringify(testResults.webToPDF, null, 2)}
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
