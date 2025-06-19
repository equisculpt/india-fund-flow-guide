
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, Play, RefreshCw, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminPortfolioUploader from './AdminPortfolioUploader';
import { AMCPortfolioParser } from '@/services/AMCPortfolioParser';

interface UploadedFile {
  id: string;
  amc_name: string;
  portfolio_date: string;
  file_name: string;
  file_type: string;
  upload_status: string;
  error_message?: string;
  created_at: string;
}

const PortfolioManagementTab = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('amc_portfolio_files')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setUploadedFiles(data || []);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAllFiles = async () => {
    setProcessing(true);
    try {
      const results = await AMCPortfolioParser.processAllUploadedFiles();
      
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      toast({
        title: "Processing Complete",
        description: `Successfully processed ${successCount} files. ${errorCount} errors.`,
        duration: 3000,
      });
      
      await fetchUploadedFiles();
    } catch (error) {
      console.error('Error processing files:', error);
      toast({
        title: "Error",
        description: "Failed to process files",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge variant="secondary">Uploaded</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      case 'processed':
        return <Badge variant="default">Processed</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const viewFileDetails = (file: UploadedFile) => {
    // Implementation for viewing file details
    console.log('View file details:', file);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <AdminPortfolioUploader />
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Uploaded Portfolio Files
            </CardTitle>
            <div className="space-x-2">
              <Button 
                onClick={fetchUploadedFiles} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button 
                onClick={processAllFiles} 
                disabled={processing}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {processing ? "Processing..." : "Process All"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No files uploaded yet
            </div>
          ) : (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{file.file_name}</span>
                        {getStatusBadge(file.upload_status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{file.amc_name}</span> • 
                        Portfolio Date: {new Date(file.portfolio_date).toLocaleDateString()} • 
                        Uploaded: {new Date(file.created_at).toLocaleDateString()}
                      </div>
                      {file.error_message && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded mt-2">
                          Error: {file.error_message}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewFileDetails(file)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManagementTab;
