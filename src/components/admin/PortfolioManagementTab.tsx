
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, RefreshCw, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AMCPortfolioParser } from '@/services/AMCPortfolioParser';
import PortfolioFileUploader from './portfolio/PortfolioFileUploader';
import PortfolioFileManager from './portfolio/PortfolioFileManager';

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

interface PendingFile {
  id: string;
  file: File;
  amc_name: string;
  portfolio_date: string;
  file_type: string;
  upload_status: 'pending' | 'uploading' | 'success' | 'error';
  error_message?: string;
}

const PortfolioManagementTab = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
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

  const handleFilesAdded = (files: PendingFile[]) => {
    setPen

dingFiles(prev => [...prev, ...files]);
  };

  const handleProcessFiles = async () => {
    const validFiles = pendingFiles.filter(file => 
      file.amc_name && file.portfolio_date && file.upload_status === 'pending'
    );

    if (validFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please add files and fill in all required details",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Upload files to database
      for (const file of validFiles) {
        setPendingFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, upload_status: 'uploading' } : f
        ));

        try {
          const fileReader = new FileReader();
          const fileData = await new Promise<string>((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.onerror = reject;
            fileReader.readAsDataURL(file.file);
          });

          const { error } = await supabase
            .from('amc_portfolio_files')
            .insert({
              amc_name: file.amc_name,
              portfolio_date: file.portfolio_date,
              file_name: file.file.name,
              file_type: file.file_type,
              file_size: file.file.size,
              file_data: fileData,
              upload_status: 'uploaded'
            });

          if (error) throw error;

          setPendingFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, upload_status: 'success' } : f
          ));

        } catch (error) {
          console.error('Error uploading file:', error);
          setPendingFiles(prev => prev.map(f => 
            f.id === file.id ? { 
              ...f, 
              upload_status: 'error',
              error_message: error instanceof Error ? error.message : 'Upload failed'
            } : f
          ));
        }
      }

      // Process uploaded files
      const results = await AMCPortfolioParser.processAllUploadedFiles();
      
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      toast({
        title: "Processing Complete",
        description: `Successfully processed ${successCount} files. ${errorCount} errors.`,
        duration: 3000,
      });
      
      await fetchUploadedFiles();
      setPendingFiles([]);

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

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <PortfolioFileUploader onFilesAdded={handleFilesAdded} />
      
      <PortfolioFileManager 
        files={pendingFiles}
        onFilesUpdate={setPendingFiles}
        onProcessFiles={handleProcessFiles}
        isProcessing={processing}
      />
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              Processed Portfolio Files
            </CardTitle>
            <Button 
              onClick={fetchUploadedFiles} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No files processed yet
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
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
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
