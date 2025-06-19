
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, FileText } from 'lucide-react';
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

interface PortfolioFileUploaderProps {
  onFilesAdded: (files: UploadedFile[]) => void;
}

const PortfolioFileUploader = ({ onFilesAdded }: PortfolioFileUploaderProps) => {
  const { toast } = useToast();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedFiles: UploadedFile[] = Array.from(files).map(file => {
      const fileType = file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'XLSX';
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        amc_name: '',
        portfolio_date: new Date().toISOString().split('T')[0],
        file_type: fileType,
        upload_status: 'pending'
      };
    });

    onFilesAdded(uploadedFiles);
    event.target.value = '';

    toast({
      title: "Files Added",
      description: `Added ${uploadedFiles.length} files for processing`,
      duration: 2000,
    });
  }, [onFilesAdded, toast]);

  const supportedAMCs = AMCPortfolioParser.getSupportedAMCs();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-600" />
          Portfolio File Upload
          <span className="text-sm text-gray-500 font-normal">
            ({supportedAMCs.length} AMCs supported)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept=".xlsx,.xls,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="portfolio-file-upload"
          />
          <label htmlFor="portfolio-file-upload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900">
              Upload AMC Portfolio Files
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Excel (.xlsx) and PDF files supported
            </p>
            <p className="text-xs text-gray-400">
              Smart parser handles multiple tabs and different AMC formats
            </p>
          </label>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">Supported AMCs:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {supportedAMCs.map(amc => (
              <span key={amc} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {amc}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioFileUploader;
