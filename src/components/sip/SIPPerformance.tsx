
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, TrendingUp, Award, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFDownloadService } from '@/services/pdf/PDFDownloadService';

interface SIPPerformanceProps {
  onDownload?: (type: string) => void;
}

const SIPPerformance: React.FC<SIPPerformanceProps> = ({ onDownload }) => {
  const { toast } = useToast();
  const pdfDownloadService = new PDFDownloadService(toast);

  const handlePerformanceDownload = async (type: string) => {
    try {
      console.log(`🎯 SIPPerformance: Downloading ${type} statement`);
      
      // Use the callback if provided, otherwise use PDF service directly
      if (onDownload) {
        await onDownload(type);
      } else {
        await pdfDownloadService.downloadPDFStatement(type);
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to generate the requested statement. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              SIP Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium">Average XIRR</span>
                <span className="font-bold text-green-600 text-xl">18.8%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium">Platform Percentile</span>
                <span className="font-bold text-blue-600 text-xl">76th</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <span className="font-medium">Consistency Score</span>
                <span className="font-bold text-purple-600 text-xl">95%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <span className="font-medium">Best Performing SIP</span>
                <span className="font-bold text-orange-600">HDFC Top 100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              SIP Streaks & Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="h-6 w-6 text-yellow-600" />
                <div>
                  <div className="font-semibold text-yellow-900">12-Month Streak</div>
                  <div className="text-sm text-yellow-700">Eligible for loyalty bonus</div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900 mb-1">₹500</div>
                <div className="text-sm text-blue-700">Consistency Reward Earned</div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <Target className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">Goal Achievement</div>
                  <div className="text-sm text-green-700">78% towards financial goals</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Actions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-900">Download Performance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
              onClick={() => handlePerformanceDownload('performance')}
            >
              <Download className="h-4 w-4 mr-2" />
              Detailed Performance Report
            </Button>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" 
              onClick={() => handlePerformanceDownload('annual-returns')}
            >
              <Download className="h-4 w-4 mr-2" />
              Annual Returns Statement
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              onClick={() => handlePerformanceDownload('ai-summary-report')}
            >
              <Download className="h-4 w-4 mr-2" />
              AI Performance Analysis
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
              onClick={() => handlePerformanceDownload('rewards-statement')}
            >
              <Download className="h-4 w-4 mr-2" />
              Rewards & Streak Report
            </Button>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-2">📊 What's Included in Performance Reports:</h4>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-indigo-700">
              <div>• XIRR/IRR calculations</div>
              <div>• Peer performance comparison</div>
              <div>• Fund-wise performance breakdown</div>
              <div>• SIP consistency analysis</div>
              <div>• Goal achievement tracking</div>
              <div>• AI-powered insights & recommendations</div>
              <div>• Tax implications summary</div>
              <div>• Reward earnings history</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SIPPerformance;
