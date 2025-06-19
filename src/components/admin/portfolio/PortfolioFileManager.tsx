
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileSpreadsheet, FileText, Trash2, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AMCPortfolioParser } from '@/services/AMCPortfolioParser';

interface UploadedFile {
  id: string;
  file: File;
  amc_name: string;
  portfolio_date: string;
  file_type: string;
  upload_status: 'pending' | 'uploading' | 'success' | 'error';
  error_message?: string;
}

interface PortfolioFileManagerProps {
  files: UploadedFile[];
  onFilesUpdate: (files: UploadedFile[]) => void;
  onProcessFiles: () => Promise<void>;
  isProcessing: boolean;
}

const PortfolioFileManager = ({ files, onFilesUpdate, onProcessFiles, isProcessing }: PortfolioFileManagerProps) => {
  const { toast } = useToast();
  const supportedAMCs = AMCPortfolioParser.getSupportedAMCs();

  const updateFileDetails = (fileId: string, field: keyof UploadedFile, value: string) => {
    const updatedFiles = files.map(file => 
      file.id === fileId ? { ...file, [field]: value } : file
    );
    onFilesUpdate(updatedFiles);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    onFilesUpdate(updatedFiles);
    
    toast({
      title: "File Removed",
      description: "File has been removed from the upload queue",
      duration: 2000,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'uploading':
        return <Badge variant="secondary">Uploading</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>File Management ({files.length} files)</CardTitle>
          <Button 
            onClick={onProcessFiles} 
            disabled={isProcessing || files.some(f => !f.amc_name || !f.portfolio_date)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isProcessing ? "Processing..." : "Process All Files"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {file.file_type === 'PDF' ? (
                    <FileText className="h-5 w-5 text-red-600" />
                  ) : (
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  )}
                  <span className="font-medium">{file.file.name}</span>
                  {getStatusBadge(file.upload_status)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  disabled={file.upload_status === 'uploading'}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>AMC Name</Label>
                  <Select
                    value={file.amc_name}
                    onValueChange={(value) => updateFileDetails(file.id, 'amc_name', value)}
                    disabled={file.upload_status === 'uploading'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select AMC" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedAMCs.map((amc) => (
                        <SelectItem key={amc} value={amc}>
                          {amc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Portfolio Date</Label>
                  <Input
                    type="date"
                    value={file.portfolio_date}
                    onChange={(e) => updateFileDetails(file.id, 'portfolio_date', e.target.value)}
                    disabled={file.upload_status === 'uploading'}
                  />
                </div>
              </div>

              {file.error_message && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  Error: {file.error_message}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioFileManager;
